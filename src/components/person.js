import React from 'react';
import {axiosInstance} from '../config/axios-instance';
import {AGES, GENDERS, EDUCATIONS, ENGLISH_LEVELS, POSITIONS} from '../constants';
import {Col, Form as Form1} from 'react-bootstrap';
import {Form, Field} from 'react-final-form';

const renderSelectOptions = (data) => data.map(({value, text}) => (<option key={value} value={value}>{text}</option>));

const getInitialFormValues = () => ({
    name: null,
    age: '18-29',
    gender: 'male',
    experience: null,
    education: 'high',
    englishLevel: 'advanced',
    position: 'web-developer',
    salary: null
});

const FORM_KEYS = Object.keys(getInitialFormValues());

const validate = values => {
    const errors = {};

    FORM_KEYS.forEach(key => {
        if (!values[key]) {
            errors[key] = 'Required field.'
        }
    });

    return errors;
};

class Person extends React.Component {
    handleSubmit(data, form) {
        axiosInstance({
            method: 'post',
            url: '/people',
            data
        }).then(form.reset)
    }

    render() {
        const initialValues = getInitialFormValues();

        return (
            <Form
                onSubmit={this.handleSubmit.bind(this)}
                initialValues={initialValues}
                validate={validate}
                render={({handleSubmit, form, submitting, pristine}) => (
                    <form className="w-50 m-auto" onSubmit={handleSubmit}>
                        <div className="row mb-3" component={Form1.Row}>
                            <div className="col" component={Form1.Group} as={Col}>
                                <label component={Form1.Label}>Name</label>
                                <Field name="name">
                                    {props => {
                                        return (
                                            <div>
                                                <Form1.Control
                                                    name={props.input.name}
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                />
                                                {props.meta.error && props.meta.touched &&
                                                <span className="text-danger">{props.meta.error}</span>}
                                            </div>
                                        )
                                    }}
                                </Field>
                            </div>
                            <div className="col" component={Form.Group} as={Col}>
                                <label component={Form.Label}>Age</label>
                                <Field name="age">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                as="select"
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={props.input.onChange}
                                            >
                                                {renderSelectOptions(AGES)}
                                            </Form1.Control>
                                            {props.meta.error && props.meta.touched &&
                                            <span className="text-danger">{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="col" component={Form.Group} as={Col}>
                                <label component={Form.Label}>Gender</label>
                                <Field name="gender">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                as="select"
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={props.input.onChange}
                                            >
                                                {renderSelectOptions(GENDERS)}
                                            </Form1.Control>
                                            {props.meta.error && props.meta.touched &&
                                            <span className="text-danger">{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="row mb-3" component={Form.Row}>
                            <div className="col" component={Form.Group} as={Col}>
                                <label component={Form.Label}>Experience</label>
                                <Field name="experience">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                name={props.input.name}
                                                type="number"
                                                value={props.input.value}
                                                onChange={props.input.onChange}
                                            />
                                            {props.meta.error && props.meta.touched &&
                                            <span className="text-danger">{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="row mb-3" component={Form.Row}>
                            <div className="col" component={Form.Group} as={Col}>
                                <label component={Form.Label}>Salary</label>
                                <Field name="salary">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                name={props.input.name}
                                                type="number"
                                                value={props.input.value}
                                                onChange={props.input.onChange}
                                            />
                                            {props.meta.error && props.meta.touched &&
                                            <span className="text-danger">{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="row mb-3" component={Form.Row}>
                            <div className="col" component={Form.Group} as={Col}>
                                <label component={Form.Label}>Education</label>
                                <Field name="education">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                as="select"
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={props.input.onChange}
                                            >
                                                {renderSelectOptions(EDUCATIONS)}
                                            </Form1.Control>
                                            {props.meta.error && props.meta.touched &&
                                            <span className="text-danger">{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="col" component={Form.Group} as={Col}>
                                <label component={Form.Label}>English level</label>
                                <Field name="englishLevel">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                as="select"
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={props.input.onChange}
                                            >
                                                {renderSelectOptions(ENGLISH_LEVELS)}
                                            </Form1.Control>
                                            {props.meta.error && props.meta.touched &&
                                            <span className="text-danger">{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="col" component={Form.Group} as={Col}>
                                <label component={Form.Label}>Position</label>
                                <Field name="position">
                                    {props => (
                                        <div>
                                            <Form1.Control
                                                as="select"
                                                name={props.input.name}
                                                value={props.input.value}
                                                onChange={props.input.onChange}
                                            >
                                                {renderSelectOptions(POSITIONS)}
                                            </Form1.Control>
                                            {props.meta.error && props.meta.touched &&
                                            <span className="text-danger">{props.meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <button
                            disabled={submitting}
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