import './booking.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Messages } from '../../shared/configs/messages';
import { Validation } from '../../shared/configs/validation';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Booking = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const navigate = useNavigate()

    return (
        <main className='booking-form-container'>
            <Col>
                <Row></Row>
                <Row></Row>
            </Col>
            <Col>
                <Row></Row>
                <Row></Row>
                <Row></Row>
            </Col>
        </main>
    )
}