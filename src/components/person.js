import React from 'react';
import { AGES, GENDERS, EDUCATIONS, ENGLISH_LEVELS, POSITIONS } from '../constants';

const renderSelectOptions = (data) => data.map(({value, text}) => (<option key={value} value={value}>{text}</option>));

class Person extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            age: "18-29",
            gender: "male",
            experience: 2,
            education: "hight",
            englishLevel: "advanced",
            position: "web-developer",
            salary: 100
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state)
    }

    handleInputChange(event) {
        const {type, name, value} = event.target;

        this.setState({
            [name]: type === "number" ? parseInt(value) : value
        })
    }

    render() {
        const {name, age, gender, experience, education, englishLevel, position, salary} = this.state;

        return (
            <div>
                <h2>Person page</h2>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" value={name} onChange={this.handleInputChange.bind(this)} />
                    </div>
                    <div>
                        <label>Age</label>
                        <select name="age" value={age} onChange={this.handleInputChange.bind(this)}>
                            {renderSelectOptions(AGES)}
                        </select>
                    </div>
                    <div>
                        <label>Gender</label>
                        <select name="gender" value={gender} onChange={this.handleInputChange.bind(this)}>
                            {renderSelectOptions(GENDERS)}
                        </select>
                    </div>
                    <div>
                        <label>Experience</label>
                        <input type="number" name="experience" value={experience} onChange={this.handleInputChange.bind(this)} />
                    </div>
                    <div>
                        <label>Education</label>
                        <select name="education" value={education} onChange={this.handleInputChange.bind(this)}>
                            {renderSelectOptions(EDUCATIONS)}
                        </select>
                    </div>
                    <div>
                        <label>English level</label>
                        <select name="englishLevel" value={englishLevel} onChange={this.handleInputChange.bind(this)}>
                            {renderSelectOptions(ENGLISH_LEVELS)}
                        </select>
                    </div>
                    <div>
                        <label>Position</label>
                        <select name="position" value={position} onChange={this.handleInputChange.bind(this)}>
                            {renderSelectOptions(POSITIONS)}
                        </select>
                    </div>
                    <div>
                        <label>Salary</label>
                        <input type="number" name="salary" value={salary} onChange={this.handleInputChange.bind(this)} />
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            
        )
    }
}

export default Person;