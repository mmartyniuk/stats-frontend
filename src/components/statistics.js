import React from 'react';
import { merge, random, range } from "lodash";
import { VictoryPie, VictoryChart, VictoryHistogram } from 'victory';
import { axiosInstance } from '../config/axios-instance';

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getData = ({ length = 100, min = 0, max = 10, dates = false } = {}) => {
    const randomDataFunc = dates ? randomDate : random;
    return range(length).map(() => ({
        x: randomDataFunc(min, max)
    }));
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
        return this.state.data.map(item => <div key={item._id}>{item.salary}</div>)
    }

    render() {
        const ages = new Set();

        this.state.data.forEach(item => {
            ages.add(item.age);
        });

        // expected [ { x: value, y: value }, ... ]
        const data = [...ages].map(age => {
            return {
                x: age,
                y: this.state.data.filter(i => i.age === age).length
            }
        });
        const data1 = this.state.data.map(i => ({ x: this.state.data.filter(item => item.age === i.age).length }));

        return (
            <div>
                Statistics page
                <div>{this.renderData()}</div>
                <div style={{ width: 500 }}>
                    <VictoryPie data={data}/>
                    <VictoryChart
                        domainPadding={10}
                    >
                        <VictoryHistogram
                            style={{
                                data: { stroke: "#f67280", strokeWidth: 3, fill: "#355c7d" }
                            }}
                            data={data1}
                        />
                    </VictoryChart>
                </div>

            </div>
        )
    }
}

export default Statistics;