import React from 'react';
import { VictoryPie, VictoryBar, VictoryTheme, VictoryChart } from 'victory';
import { axiosInstance } from '../config/axios-instance';
import { ENGLISH_LEVELS } from '../constants';
const getFormattedItem = ({
                              _id,
                              name,
                              age,
                              gender,
                              experience,
                              education,
                              englishLevel,
                              position,
                              salary
                          }) => {
    return (
        <tr key={_id}>
            <td>{name}</td>
            <td>{age} years</td>
            <td>{gender}</td>
            <td>{experience} years</td>
            <td>{education}</td>
            <td>{englishLevel}</td>
            <td>{position}</td>
            <td>${salary}</td>
        </tr>

    );
};

const CHART_CONTAINER_STYLE = {
    backgroundColor: "#f7f7f7",
    border: "1px solid #ccc",
    margin: "2%",
    maxWidth: "40%"
};

const CHART_STYLE = {
    parent: CHART_CONTAINER_STYLE,
    labels: {
        fontSize: 10,
        paintOrder: "stroke",
        stroke: "#ffffff",
        strokeWidth: 3,
        strokeLinecap: "butt",
        strokeLinejoin: "miter"
    }
};

class Statistics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axiosInstance({
            method: 'get',
            url: '/people'
        }).then((response) => {
            this.setState({
                data: response.data
            })
        })
    }

    renderData() {
        return this.state.data.map(item => getFormattedItem(item));
    }

    render() {
        const englishLevelsData = ENGLISH_LEVELS
            .map(englishLevel => {
                return {
                    x: englishLevel.value,
                    y: this.state.data.filter(i => i.englishLevel === englishLevel.value).length
                }
            })
            .filter(({ y }) => !!y);

        const educationsData = this.state.data.map(i => ({ y: this.state.data.filter(item => item.education === i.education).length, x: i.education}));

        return (
            <div>
                <h2>Persons stored</h2>
                <table className="table col-8 offset-2">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Experience</th>
                            <th>Education</th>
                            <th>English level</th>
                            <th>Position</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderData()}
                    </tbody>
                </table>
                <div style={
                    {
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center"
                    }
                }>
                    <br />
                    <h2>English levels, pie chart</h2>
                    <VictoryPie
                        style={CHART_STYLE}
                        width={500}
                        data={englishLevelsData}
                        colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                    />
                    {educationsData.length &&
                    <>
                        <h2>Educations, bar chart</h2>
                        <VictoryChart
                            style={CHART_STYLE}
                            theme={VictoryTheme.material}>
                            <VictoryBar
                                data={educationsData}
                                colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                            />
                        </VictoryChart>
                    </>
                    }
                </div>

            </div>
        )
    }
}

export default Statistics;