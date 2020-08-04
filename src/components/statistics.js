import React from 'react';
import { merge, random, range } from "lodash";
import { VictoryPie, VictoryChart, VictoryHistogram, VictoryStack, VictoryArea } from 'victory';
import { axiosInstance } from '../config/axios-instance';
import { findByLabelText } from '@testing-library/react';

// const randomDate = (start, end) => {
//     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// };

// const getData = ({ length = 100, min = 0, max = 10, dates = false } = {}) => {
//     const randomDataFunc = dates ? randomDate : random;
//     return range(length).map(() => ({
//         x: randomDataFunc(min, max)
//     }));
// };

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
        return this.state.data.map(item => <div key={item._id}>{item.salary}</div>)
    }

    render() {
        const ages = new Set();
        const englishLevels = new Set();
        const genders = new Set();

        this.state.data.forEach(item => {
            ages.add(item.age);
        });
        this.state.data.forEach(item => {
            englishLevels.add(item.englishLevel);
        });

        this.state.data.forEach(item => {
            genders.add(item.gender);
        });

        // expected [ { x: value, y: value }, ... ]
        const agesData = [...ages].map(age => {
            return {
                x: age,
                y: this.state.data.filter(i => i.age === age).length
            }
        });
        const englishLevelsData = [...englishLevels].map(englishLevel => {
            return {
                x: englishLevel,
                y: this.state.data.filter(i => i.englishLevel === englishLevel).length
            }
        });

        const gendersData = [...genders].map(gender => {
            return {
                x: gender,
                y: this.state.data.filter(i => i.gender === gender).length
            }
        });

        const educationsData = this.state.data.map(i => ({ x: this.state.data.filter(item => item.education === i.education).length }));
        
        return (
            <div>
                Statistics page
                {/* <div>{this.renderData()}</div> */}
                <div style={{ width: 500, margin: 'auto'}}>
                    <VictoryPie data={englishLevelsData}/>
                    <VictoryChart domainPadding={10}>
                        <VictoryHistogram
                        
                            style={{
                                data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
                            }}
                            data={educationsData}
                        />
                    </VictoryChart>
                    <VictoryChart>
                        <VictoryArea style={{ data: { fill: "#c43a31" } }} data={gendersData} />
                        <VictoryArea style={{ data: { fill: "#f67280" } }} data={agesData} />
                    </VictoryChart>
                </div>
            </div>
        )
    }
}

export default Statistics;