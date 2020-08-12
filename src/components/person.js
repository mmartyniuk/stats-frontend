import React from 'react';
import { pick } from 'lodash';
import { axiosInstance } from '../config/axios-instance';
import { AGES, GENDERS, EDUCATIONS, ENGLISH_LEVELS, POSITIONS } from '../constants';
import { Col, Button, Form as Form1 } from 'react-bootstrap';
import { Form, Field } from 'react-final-form';

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
            <Form 
                onSubmit={this.handleSubmit.bind(this)}
                render={({ handleSubmit, form, submitting, pristine }) => (
                    <form className="w-50 m-auto" onSubmit={handleSubmit}>
                        <div className="row mb-3" component={Form1.Row}>
                            <div className="col" component={Form1.Group} as={Col} >
                                <label component={Form1.Label}>Name</label>
                                <Field name="name">
                                    {props => (
                                        <Form1.Control
                                            name={props.input.name}
                                            value={props.input.value}
                                            onChange={this.handleInputChange.bind(this)}
                                        />
                                    )}
                                </Field>
                            </div>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>Age</label>
                                <Field name="age">
                                    {props => (
                                        <Form1.Control
                                            as="select"
                                            name={props.input.name}
                                            value={props.input.value}
                                            onChange={this.handleInputChange.bind(this)}
                                        >
                                            {renderSelectOptions(AGES)}
                                        </Form1.Control>
                                    )}
                                </Field>
                            </div>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>Gender</label>
                                <Field name="gender">
                                    {props => (
                                        <Form1.Control
                                            as="select"
                                            name={props.input.name}
                                            value={props.input.value}
                                            onChange={this.handleInputChange.bind(this)}
                                        >
                                            {renderSelectOptions(GENDERS)}
                                        </Form1.Control>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="row mb-3" component={Form.Row}>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>Experience</label>
                                <Field name="experience">
                                    {props => (
                                        <Form1.Control
                                            name={props.input.name}
                                            value={props.input.value}
                                            onChange={this.handleInputChange.bind(this)}
                                        />
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="row mb-3" component={Form.Row}>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>Salary</label>
                                <Field name="salary">
                                    {props => (
                                        <Form1.Control
                                            name={props.input.name}
                                            value={props.input.value}
                                            onChange={this.handleInputChange.bind(this)}
                                        />
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="row mb-3    " component={Form.Row}>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>Education</label>
                                <Field name="education">
                                    {props => (
                                        <Form1.Control
                                            as="select"
                                            name={props.input.name}
                                            value={props.input.value}
                                            onChange={this.handleInputChange.bind(this)}
                                        >
                                            {renderSelectOptions(EDUCATIONS)}
                                        </Form1.Control>
                                    )}
                                </Field>
                            </div>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>English level</label>
                                <Field name="englishLevel">
                                    {props => (
                                        <Form1.Control
                                            as="select"
                                            name={props.input.name}
                                            value={props.input.value}
                                            onChange={this.handleInputChange.bind(this)}
                                        >
                                            {renderSelectOptions(ENGLISH_LEVELS)}
                                        </Form1.Control>
                                    )}
                                </Field>
                            </div>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>Position</label>
                                <Field name="position">
                                    {props => (
                                        <Form1.Control
                                            as="select"
                                            name={props.input.name}
                                            value={props.input.value}
                                            onChange={this.handleInputChange.bind(this)}
                                        >
                                            {renderSelectOptions(POSITIONS)}
                                        </Form1.Control>
                                    )}
                                </Field>
                            </div>
                        </div> 
                        <button compponent={Button} 
                            disabled={submitting || pristine} 
                            onClick={form.reset} 
                            variant="primary" 
                            type="submit" 
                            value="Submit"
                        >
                            Submit
                        </button>
                    </form>
                )} 
            />
        )
    }
}

export default Person;