import React from 'react';
import { axiosInstance } from '../config/axios-instance';

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
        return (
            <div>
                Statistics page
                <div>{this.renderData()}</div>
            </div>
        )
    }
}

export default Statistics;