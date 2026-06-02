import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/authenticationApi';
import { Messages } from '../../../shared/configs/messages';
import "./login.css";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setApiError('');
        try {
            const response = await loginUser(data);
            
            if (response && response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            
            console.log('Login successful', response);
            
            window.dispatchEvent(new Event('authChange'));
            navigate('/');
        } catch (error) {
            setApiError(error.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="login-form-container d-flex justify-content-center align-items-center">
            <form className="container-fluid login-form d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
                <p className="form-title">Sign in to your account</p>
                
                {apiError && <div className="alert alert-danger">{apiError}</div>}

                <div className="input-group-custom d-flex flex-column">
                    <label className='form-label'>Email <span className="text-danger">*</span></label>
                    <div className="input-container position-relative d-flex align-items-center">
                        <input 
                            className={`input-field ${errors.email ? 'is-invalid' : ''}`} 
                            placeholder="Enter email" 
                            type="email" 
                            {...register("email", { 
                                required: Messages.auth.ERR_EMAIL_REQUIRED,
                                maxLength: { value: 254, message: Messages.auth.ERR_EMAIL_MAXLENGTH },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: Messages.auth.ERR_EMAIL_INVALID
                                }
                            })} 
                        />
                    </div>
                    {errors.email && <span className="error-text">{errors.email.message}</span>}
                </div>

                <div className="input-group-custom d-flex flex-column">
                    <label className='form-label'>Password <span className="text-danger">*</span></label>
                    <div className="input-container">
                        <input 
                            className={`input-field ${errors.password ? 'is-invalid' : ''}`} 
                            placeholder="Enter password" 
                            type="password" 
                            {...register("password", { 
                                required: Messages.auth.ERR_PASSWORD_REQUIRED 
                            })} 
                        />
                    </div>
                    {errors.password && <span className="error-text">{errors.password.message}</span>}
                </div>

                <button className="submit border-0" type="submit">
                    Sign in
                </button>
                <p className="signup-link">
                    No account?
                    <Link className='link text-decoration-none' to="/register">Sign up</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
