import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login.css'; // Import the CSS file

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res = await axios.post('/api/login', { email, password });
            localStorage.setItem('auth_token', res.data.token); 
            navigate('/quiz');
        } catch (error) {
            if (error.response) {
                
                setErrors(error.response.data);
                
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {errors && (
                <div className="errors">
                            {console.log(errors)}
                        <p >{errors.message}</p>
                    
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
