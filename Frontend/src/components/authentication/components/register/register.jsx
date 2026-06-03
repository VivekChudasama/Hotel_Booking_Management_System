import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/authenticationApi';
import { Messages } from '../../../shared/configs/messages';
import { Validation } from '../../../shared/configs/validation';
import "./register.css";

const RegisterForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const password = watch("password");

    const onSubmit = async (data) => {
        setApiError('');
        try {
            const { confirmPassword, ...userData } = data;

            const response = await registerUser(userData);
            console.log('Registration successful', response);
            navigate('/login');
        } catch (error) {
            setApiError(error.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-form-conatiner d-flex justify-content-center align-items-center">
            <form className="register-form d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
                <p className="form-title">Register</p>

                {apiError && <div className="alert alert-danger">{apiError}</div>}

                <div className="form-row d-flex">
                    <div className="input-group-custom d-flex flex-column">
                        <label className='form-label'>Full Name <span className="text-danger">*</span></label>
                        <div className="input-container position-relative d-flex align-items-center">
                            <input
                                className={`input-field ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Enter full name"
                                type="text"
                                {...register("name", {
                                    required: Messages.register.ERR_NAME_REQUIRED,
                                    minLength: { value: 3, message: Messages.register.VALID_NAME_LENGTH },
                                    maxLength: { value: 70, message: Messages.register.VALID_NAME_LENGTH },
                                    pattern: {
                                        value: Validation.REGEX.USER_NAME_VALIDATION_REGEX,
                                        message: Messages.register.VALID_NAME_FORMAT
                                    }
                                })}
                            />
                        </div>
                        {errors.name && <span className="error-text">{errors.name.message}</span>}
                    </div>

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
                                        value: Validation.REGEX.EMAIL_VALIDATION_REGEX,
                                        message: Messages.auth.ERR_EMAIL_INVALID
                                    }
                                })}
                            />
                        </div>
                        {errors.email && <span className="error-text">{errors.email.message}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group-custom d-flex flex-column">
                        <label className='form-label'>Phone Number <span className="text-danger">*</span></label>
                        <div className="input-container position-relative d-flex align-items-center">
                            <input
                                className={`input-field ${errors.phone_number ? 'is-invalid' : ''}`}
                                placeholder="Enter phone number"
                                type="number"
                                {...register("phone_number", {
                                    required: Messages.register.ERR_MOBILE_NUMBER_REQUIRED,
                                    maxLength: {
                                        value: 10,
                                        message: Messages.register.ERR_USER_PHONE_NUMBER_LENGTH
                                    }
                                })}
                            />
                        </div>
                        {errors.phone_number && <span className="error-text">{errors.phone_number.message}</span>}
                    </div>

                    <div className="input-group-custom d-flex flex-column">
                        <label className='form-label'>Password <span className="text-danger">*</span></label>
                        <div className="input-container position-relative d-flex align-items-center">
                            <input
                                className={`input-field ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Enter password"
                                type="password"
                                {...register("password", {
                                    required: Messages.register.ERR_PASSWORD_REQUIRED,
                                    pattern: {
                                        value: Validation.REGEX.PASSWORD_VALIDATION_REGEX,
                                        message: Messages.register.VALID_PASSWORD_REQUIRED
                                    }
                                })}
                            />
                        </div>
                        {errors.password && <span className="error-text">{errors.password.message}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group-custom d-flex flex-column">
                        <label className='form-label'>Confirm Password <span className="text-danger">*</span></label>
                        <div className="input-container position-relative d-flex align-items-center">
                            <input
                                className={`input-field ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                placeholder="Confirm password"
                                type="password"
                                {...register("confirmPassword", {
                                    required: Messages.auth.ERR_CONFIRM_PASSWORD_REQUIRED,
                                    validate: value => value === password || "Passwords do not match"
                                })}
                            />
                        </div>
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword.message}</span>}
                    </div>

                    <div className="input-group-custom d-flex flex-column">
                        <label className='form-label'>Profile Image URL (Optional)</label>
                        <div className="input-container position-relative d-flex align-items-center">
                            <input
                                className={`input-field ${errors.profile_image ? 'is-invalid' : ''}`}
                                placeholder="Add profile image url"
                                type="url"
                                {...register("profile_image", {
                                    pattern: {
                                        value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
                                        message: Messages.register.ERR_IMAGE_URL
                                    }
                                })}
                            />
                        </div>
                        {errors.profile_image && <span className="error-text">{errors.profile_image.message}</span>}
                    </div>
                </div>

                <input type="hidden" value="customer" {...register("role")} />

                <button className="submit border-0" type="submit">
                    Register
                </button>
                <p className="signin-link">
                    Already Register?
                    <Link className='link text-decoration-none' to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;