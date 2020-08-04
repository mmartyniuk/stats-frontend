import React from 'react';
import { pick } from 'lodash';
import { axiosInstance } from '../config/axios-instance';
import { AGES, GENDERS, EDUCATIONS, ENGLISH_LEVELS, POSITIONS } from '../constants';
import { Form, Col, Button } from 'react-bootstrap';

const renderSelectOptions = (data) => data.map(({value, text}) => (<option key={value} value={value}>{text}</option>));

class Person extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            age: "18-29",
            gender: "male",
            experience: 2,
            education: "high",  
            englishLevel: "advanced",
            position: "web-developer",
            salary: 100
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        
        axiosInstance({
            method: 'post',
            url: '/people',
            data: pick(this.state, ['name', 'age', 'gender', 'experience', 'education', 'englishLevel', 'position', 'salary'])
        }).then((response) => {
            this.setState({
                name: '',
                age: '18-29',
                gender: 'male',
                experience: 2,
                education: 'high',
                englishLevel: 'advanced',
                position: 'web-developer',
                salary: 100
            })
        })
    }

    handleInputChange(event) {
        const {type, name, value} = event.target;

        this.setState({
            [name]: type === 'number' ? parseInt(value) : value
        })
    }

    render() {
        const {name, age, gender, experience, education, englishLevel, position, salary} = this.state;

        return (
            <div className="container-fluid w-50">
                <h2>Person page</h2>

                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={name} placeholder="Enter name" onChange={this.handleInputChange.bind(this)} />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Age</Form.Label>
                            <Form.Control as="select" name="age" value={age} onChange={this.handleInputChange.bind(this)} >
                                {renderSelectOptions(AGES)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" name="gender" value={gender} onChange={this.handleInputChange.bind(this)} >
                                {renderSelectOptions(GENDERS)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Experience</Form.Label>
                            <Form.Control type="number" name="experience" value={experience} onChange={this.handleInputChange.bind(this)} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="number" name="salary" value={salary} onChange={this.handleInputChange.bind(this)} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Education</Form.Label>
                            <Form.Control as="select" name="education" value={education} onChange={this.handleInputChange.bind(this)} >
                                {renderSelectOptions(EDUCATIONS)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>English level</Form.Label>
                            <Form.Control as="select" name="englishLevel" value={englishLevel} onChange={this.handleInputChange.bind(this)} >
                                {renderSelectOptions(ENGLISH_LEVELS)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Position</Form.Label>
                            <Form.Control as="select" name="position" value={position} onChange={this.handleInputChange.bind(this)} >
                                {renderSelectOptions(POSITIONS)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit" value="Submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Person;