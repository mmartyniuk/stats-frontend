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
        console.log(value)
        this.setState({
            [name]: type === 'number' ? parseInt(value) : value
        })
    }

    render() {
        const {name, age, gender, experience, education, englishLevel, position, salary} = this.state;

        return (
            <Form 
                onSubmit={this.handleSubmit.bind(this)}
                validate={values => {
                    const errors = {}
                    if (!values.name) {
                        errors.name = 'Required'
                    }
                    if (!values.age) {
                        errors.age = 'Required'
                    }
                    if (!values.gender) {
                        errors.gender = 'Required'
                    }
                    if (!values.experience) {
                        errors.experience = 'Required'
                    }
                    if (!values.salary) {
                        errors.salary = 'Required'
                    }
                    if (!values.education) {
                        errors.education = 'Required'
                    }
                    if (!values.englishLevel) {
                        errors.englishLevel = 'Required'
                    }
                    if (!values.position) {
                        errors.position = 'Required'
                    } 
                    else if (values.confirm !== values.password) {
                        errors.confirm = 'Must match'
                    }
                    return errors
                }}
                render={({ handleSubmit, form, submitting, pristine }) => (
                    <form className="w-50 m-auto" onSubmit={handleSubmit}>
                        <div className="row mb-3" component={Form1.Row}>
                            <div className="col" component={Form1.Group} as={Col} >
                                <label component={Form1.Label}>Name</label>
                                <Field name="name">
                                    {props => ( 
                                        <div>
                                            <Form1.Control
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={this.handleInputChange.bind(this)}
                                            />
                                            {props.meta.error && props.meta.touched && <span>{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>Age</label>
                                <Field name="age">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                as="select"
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={this.handleInputChange.bind(this)}
                                            >
                                                {renderSelectOptions(AGES)}
                                            </Form1.Control>
                                            {props.meta.error && props.meta.touched && <span>{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>Gender</label>
                                <Field name="gender">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                as="select"
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={this.handleInputChange.bind(this)}
                                            >
                                                {renderSelectOptions(GENDERS)}
                                            </Form1.Control>
                                            {props.meta.error && props.meta.touched && <span>{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="row mb-3" component={Form.Row}>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>Experience</label>
                                <Field name="experience">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={this.handleInputChange.bind(this)}
                                            />
                                            {props.meta.error && props.meta.touched && <span>{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="row mb-3" component={Form.Row}>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>Salary</label>
                                <Field name="salary">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={this.handleInputChange.bind(this)}
                                            />
                                            {props.meta.error && props.meta.touched && <span>{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="row mb-3" component={Form.Row}>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>Education</label>
                                <Field name="education">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                as="select"
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={this.handleInputChange.bind(this)}
                                            >
                                                {renderSelectOptions(EDUCATIONS)}
                                            </Form1.Control>
                                            {props.meta.error && props.meta.touched && <span>{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>English level</label>
                                <Field name="englishLevel">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                as="select"
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={this.handleInputChange.bind(this)}
                                            >
                                                {renderSelectOptions(ENGLISH_LEVELS)}
                                            </Form1.Control>
                                            {props.meta.error && props.meta.touched && <span>{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="col" component={Form.Group} as={Col} >
                                <label component={Form.Label}>Position</label>
                                <Field name="position">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                as="select"
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={this.handleInputChange.bind(this)}
                                            >
                                                {renderSelectOptions(POSITIONS)}
                                            </Form1.Control>
                                            {props.meta.error && props.meta.touched && <span>{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                        </div> 
                        <button compponent={Button} 
                            disabled={submitting || pristine} 
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