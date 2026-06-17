import { Messages } from '../../../components/shared/configs/messages';
import { Validation } from '../../../components/shared/configs/validation';
import './booking.css'
import { Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';


const Booking = () => {
    const [apiError, setApiError] = useState('');

    const onSubmit = async (data) => {
        setApiError('');
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <main className='booking-form-container'>
            <div className="mt-4">
                <p className='booking-title'>Confirm Booking</p>
            </div>
            <Col lg={8} md={8} sm={12} xs={12} className='left-side-container'>
                <Row className='user-details-form-container bg-white'>
                    <form className='user-details-form d-flex flex-column' onSubmit={handleSubmit(onSubmit)} noValidate>
                        <p className='user-detail-form-title text-black'>Your details</p>

                        <div className="form-row d-flex">
                            <div className="input-group-custom d-flex flex-column ">
                                <label className='form-label'>Full Name <span className="text-danger">*</span></label>
                                <div className="form-input-container position-relative d-flex align-items-center">
                                    <input
                                        className={`form-input-field border-0  ${errors.name ? 'is-invalid' : ''}`}
                                        placeholder='Enter your full name'
                                        type='text'
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
                                {errors.name && <span className='error-text'>{errors.name.message}</span>}
                            </div>

                            <div className="input-group-custom d-flex flex-column form-gap">
                                <label className='form-label'>Phone Number <span className="text-danger">*</span></label>
                                <div className="form-input-container position-relative d-flex align-items-center">
                                    <input
                                        className={`form-input-field border-0 ${errors.phone_number ? 'is-invalid' : ''}`}
                                        placeholder="Enter your phone number"
                                        type="number"
                                        {...register("phone_number", {
                                            required: Messages.register.ERR_MOBILE_NUMBER_REQUIRED,
                                            minLength: {
                                                value: 10,
                                                message: Messages.register.ERR_USER_PHONE_NUMBER_LENGTH
                                            },
                                            maxLength: {
                                                value: 10,
                                                message: Messages.register.ERR_USER_PHONE_NUMBER_LENGTH
                                            }
                                        })}
                                    />
                                </div>
                                {errors.phone_number && <span className="error-text">{errors.phone_number.message}</span>}
                            </div>
                        </div>
                        <div className="input-group-custom d-flex flex-column">
                            <label className='form-label email-form-label'>Email <span className="text-danger">*</span></label>
                            <div className="form-input-container position-relative d-flex align-items-center">
                                <input
                                    className={`form-input-field border-0 ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Enter your email"
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
                    </form>
                </Row>
                <Row className='payment-details-form-container bg-white mt-4'>
                    <form className='payment-detail-form d-flex flex-column' onSubmit={handleSubmit(onSubmit)} noValidate>
                        <p className='payment-detail-form-title text-black'>Payment Information</p>
                        <div className='input-group-custom'>
                            <label className='form-label'>Payment Method <span className="text-danger">*</span></label>
                            <div className='input-container position-relative d-flex align-items-center'>
                                <select className='custom-select border-0'
                                    {...register('payment_method', {
                                        required: Messages.payment.PAYMENT_METHOD_REQUIRED
                                    })}>
                                    <option className='payment-form-option' value="">Select Payment Method</option>
                                    <option className='payment-form-option' value="Rajkot">Card Payment</option>
                                    <option className='payment-form-option' value="Surat">Digital Payment</option>
                                    <option className='payment-form-option' value="Ahmedabad">Cash Payment</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </Row>
                <button className='booking-form-btn border-0 text-white'>
                    Confirm & Proceed
                </button>

            </Col>
            <Col lg={4} md={4} sm={12} xs={12} className='right-side-container'>
                <Row className='hotel-detail-container bg-white'>

                </Row>
                <Row className='booking-detail-container bg-white'></Row>
                <Row className='price-detail-container bg-white'></Row>
            </Col>
        </main>
    )
}

export default Booking