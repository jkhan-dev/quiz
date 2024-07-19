import axios from '../axiosConfig';
import React, { useState } from 'react';
import './QuizForm.css'; // Import the CSS file
// Define questions
const questions = [
    {  type: 'text', question: 'Name', name: 'name' },
    {  type: 'select', question: 'Profile Type', name: 'profileType', options: ['Individual', 'Business'],
        dependQuestion : [
            { type: 'text', question: 'Username', name: 'username' },
            { type: 'text', question: 'Business Name', name: 'businessName'},
        ]
     },
    {  type: 'checkbox', question: 'Languages Known', name: 'languages', options: ['English', 'Punjabi', 'Hindi', 'Tamil', 'French'] },
    
];
let  questionState = [];
// Component for the quiz form
const QuizPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        profileType: '',
        username: '',
        businessName: '',
        languages: [],
       
    });

    const [currentStep, setCurrentStep] = useState(0);
   

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
       
        if(type == 'select-one'){
            
            let optionId = parseInt(e.target.options[e.target.selectedIndex].getAttribute('id'));
            let depQuestion = questions[currentStep].dependQuestion[optionId];
             
                let index = currentStep+1;                
                if(questionState[currentStep] != undefined &&
                    questions[index].name == questionState[currentStep]['optionName']){
                        questions.splice(index,1);
                } 
                questionState[currentStep] = {
                optionName :  depQuestion.name
            }
               
                    questions.splice(index, 0, depQuestion);
               
                
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox'
                ? checked
                    ? [...prevState[name], value]
                    : prevState[name].filter(v => v !== value)
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentStep === questions.length - 1) {
            // Handle final submission here
            let formDataPost = Object.keys(formData).reduce((acc, key) => {
                const value = formData[key];
                // Check if the value is not empty and not null
                if (value !== null && value !== '') {
                    acc[key] = value;
                }
                return acc;
            }, {});
            try {
                const response = await axios.post('http://localhost:8000/api/submit-quiz', formDataPost);
                setCurrentStep(0);
                setFormData({
                    name: '',
                    profileType: '',
                    username: '',
                    businessName: '',
                    languages: [],
                    favFruit: '',
                    education: '',
                    designation: ''
                });
                console.log('Data posted successfully:', response.data);
            } catch (error) {
                console.error('Failed to post data:', error);
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const currentQuestion = questions[currentStep];

    return (
        <div className="quiz-form-container">
            <h1>Quiz Form</h1>
            <form onSubmit={handleSubmit}>
                <p>{currentQuestion.question}</p>
                {currentQuestion.type === 'text' && (
                    <input
                        type="text"
                        name={currentQuestion.name}
                        value={formData[currentQuestion.name]}
                        onChange={handleChange}
                        placeholder={currentQuestion.question}
                    />
                )}
                {currentQuestion.type === 'select' && (
                    <select
                        name={currentQuestion.name}
                        value={formData[currentQuestion.name]}
                        onChange={handleChange}
                    >
                        <option value="">Select an option</option>
                        {currentQuestion.options.map((option,item) => (
                            <option key={option} id={item} value={option}>{option}</option>
                        ))}
                    </select>
                )}
                {currentQuestion.type === 'checkbox' && (
                    <div>
                        {currentQuestion.options.map(option => (
                            <label key={option}>
                                <input
                                    type="checkbox"
                                    name={currentQuestion.name}
                                    value={option}
                                    checked={formData[currentQuestion.name].includes(option)}
                                    onChange={handleChange}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                )}
                <div>
                    {currentStep > 0 && (
                        <button type="button" onClick={handlePrevious}>Previous</button>
                    )}
                    <button type="submit">
                        {currentStep === questions.length - 1 ? 'Submit' : 'Next'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuizPage;
