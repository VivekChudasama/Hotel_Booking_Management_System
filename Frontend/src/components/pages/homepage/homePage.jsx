import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Spinner from 'react-bootstrap/Spinner';
import { getHotelList } from '../../services/hotelService';
import homeImage from '../../../assets/images/home/homeImage.png';
import calender from '../../../assets/images/icons/calendar.svg';
import person from '../../../assets/images/icons/person.svg';
import location from '../../../assets/images/icons/location.svg';
import { Messages } from '../../shared/configs/messages';
import './homePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            city: '',
            checkIn: '',
            checkOut: '',
            rooms: 1,
            adults: 1,
            children: 0
        }
    });

    const checkInDate = watch('checkIn');

    const onSubmit = (data) => {

        const queryParams = new URLSearchParams();
        if (data.city) queryParams.append('city', data.city);
        if (data.checkIn) queryParams.append('checkIn', data.checkIn);
        if (data.checkOut) queryParams.append('checkOut', data.checkOut);
        if (data.rooms !== null && data.rooms !== '') queryParams.append('rooms', data.rooms);
        if (data.adults !== null && data.adults !== '') queryParams.append('adults', data.adults);
        if (data.children !== null && data.children !== '') queryParams.append('children', data.children);

        navigate(`/hotels?${queryParams.toString()}`);
    };

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const data = await getHotelList();
                setHotels(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch hotels');
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    return (
        <main>
            <div className="hero-section position-relative">
                <img className='image w-100' src={homeImage} loading='eager' alt='home page image'></img>
                <div className='hero-text-container position-absolute text'>
                    <p className='text-line-1 text-white m-0'>Chase elegance. Reserve your <br /> dream stay now.</p>
                    <p className='text-line-3 text-white '>Discover the finest hotels from all over the world.</p>
                </div>
            </div>
            <div className='filter-bar position-relative'>
                <form onSubmit={handleSubmit(onSubmit)}><Row className='filter-bar-content align-items-center m-0'>
                    <Col lg={3} md={6} className="mb-3 mb-lg-0 border-end border-light">
                        <div className="d-flex mb-1 align-items-center">
                            <img src={location} className='filter-bar-icon' alt='location icon'></img>
                            <div className='filter-bar-title'>Where are you headed?</div>
                        </div>
                        <div className="filter-bar-input">
                            <select className="form-select border-0 bg-transparent shadow-none p-0 filter-input-text" {...register('city', { required: Messages.booking.ERR_CITY_NAME_REQUIRED })}>
                                <option className='form-option' value="">Select City</option>
                                <option className='form-option' value="Rajkot">Rajkot</option>
                                <option className='form-option' value="Surat">Surat</option>
                                <option className='form-option' value="Ahmedabad">Ahmedabad</option>
                                <option className='form-option' value="Mumbai">Mumbai</option>
                                <option className='form-option' value="Delhi">Delhi</option>
                            </select>
                        </div>
                        {errors.city && <div className="text-danger small mt-1">{errors.city.message}</div>}
                    </Col>
                    <Col lg={2} md={6} className="mb-3 mb-lg-0 border-end border-light">
                        <div className="d-flex mb-1 align-items-center">
                            <img src={calender} className='filter-bar-icon' alt='calender icon'></img>
                            <div className='filter-bar-title'>Check in</div>
                        </div>
                        <div className="filter-bar-input">
                            <input type="date" className="form-control custom-input-icon border-0 bg-transparent shadow-none p-0 filter-input-text custom-date-input" {...register('checkIn', { validate: value => { if (!value) return true; const selectedDate = new Date(value); const maxDate = new Date(); maxDate.setMonth(maxDate.getMonth() + 6); if (selectedDate > maxDate) return Messages.booking.MAX_BOOKING_DATE || 'Cannot book a room more than 6 months in advance.'; return true; } })} min={new Date().toISOString().split('T')[0]} />
                        </div>
                        {errors.checkIn && <div className="text-danger small mt-1">{errors.checkIn.message}</div>}
                    </Col>
                    <Col lg={2} md={6} className="mb-3 mb-lg-0 border-end border-light">
                        <div className="d-flex mb-1 align-items-center">
                            <img src={calender} className='filter-bar-icon' alt='calender icon'></img>
                            <div className='filter-bar-title'>Check out</div>
                        </div>
                        <div className="filter-bar-input">
                            <input type="date" className="form-control custom-input-icon border-0 bg-transparent shadow-none p-0 filter-input-text custom-date-input"
                                {...register('checkOut',
                                    {
                                        validate: value => {
                                            if (!value) return true;
                                            if (checkInDate && new Date(checkInDate) >= new Date(value)) return Messages.booking.MIN_CHECK_IN_DATE;
                                            if (checkInDate) {
                                                const diffDays = Math.ceil(Math.abs(new Date(value) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
                                                if (diffDays > 60) return Messages.booking.MAX_BOOKING_DURATION
                                            } return true;
                                        }
                                    })} min={checkInDate || new Date().toISOString().split('T')[0]} />
                        </div>
                        {errors.checkOut && <div className="text-danger small mt-1">{errors.checkOut.message}</div>}
                    </Col>
                    <Col lg={3} md={6} className="mb-3 mb-lg-0">
                        <div className="d-flex mb-1 align-items-center">
                            <img src={person} className='filter-bar-icon' alt='person icon'></img>
                            <div className='filter-bar-title' >Rooms | Adults, Children</div>
                        </div>
                        <div className="d-flex align-items-center filter-bar-input filter-people-input">
                            <input type="number" className="form-control border-0 bg-transparent shadow-none p-0 filter-input-text text-center filter-input" placeholder="1" {...register('rooms', { min: { value: 1, message: Messages.booking.ERR_ROOM_COUNT } })} min="1" title="Rooms" />
                            <span className="filter-input-text">|</span>
                            <input type="number" className="form-control border-0 bg-transparent shadow-none p-0 filter-input-text text-center filter-input" placeholder="1" {...register('adults', { min: { value: 1, message: Messages.booking.ERR_ADULT_COUNT } })} min="1" title="Adults" />
                            <span className="filter-input-text">,</span>
                            <input type="number" className="form-control border-0 bg-transparent shadow-none p-0 filter-input-text text-center filter-input" placeholder="0" {...register('children', { min: { value: 0, message: Messages.booking.ERR_CHILD_COUNT } })} min="0" title="Children" />
                        </div>
                        {(errors.rooms || errors.adults || errors.children) && (
                            <div className="text-danger small mt-1">
                                {errors.rooms && <div>{errors.rooms.message}</div>}
                                {errors.adults && <div>{errors.adults.message}</div>}
                                {errors.children && <div>{errors.children.message}</div>}
                            </div>
                        )}
                    </Col>
                    <Col lg={2} className="mt-3 mt-lg-0">
                        <button type="submit" className='filter-bar-button border-0'>
                            Book Now
                        </button>
                    </Col>
                </Row></form></div>
            <Container fluid className="homepage-container">
                <section className="mb-5 ">
                    <h2 className="hotel-title position-relative d-inline-block">Hotels</h2>

                    {loading && (
                        <div className="d-flex justify-content-center align-items-center w-100 loading-spinner-container">
                            <Spinner animation="border" variant="secondary" />
                        </div>
                    )}

                    {error && <p className="text-danger">{error}</p>}

                    {!loading && !error && hotels.length === 0 && (
                        <p>No hotels found.</p>
                    )}
                    {!loading && !error && hotels.length > 0 && (
                        <Row className="row-cols-1 row-cols-sm-auto row-cols-md-2 row-cols-lg-auto row-cols-xl-auto hotel-container">
                            {hotels.map((hotel) => (
                                <Col key={`${hotel._id}`} className="mb-4">
                                    <div className="hotel-card border-0 bg-transparent d-flex flex-column h-100 w-100" onClick={() => navigate(`/hotel/${hotel._id}`)}>
                                        <div className="hotel-image-container mb-3">
                                            {hotel.images && hotel.images.length > 0 ? (
                                                <img src={hotel.images[0]} alt={hotel.name} className="hotel-card-image img-fluid" loading="lazy" />
                                            ) : (
                                                <div className="hotel-card-image-placeholder bg-light rounded"></div>
                                            )}
                                        </div>
                                        <div className="hotel-info">
                                            <h5 className="hotel-name">{hotel.name}</h5>
                                            <p className="hotel-address">
                                                {`${hotel.address}, ${hotel.city}`}
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    )}
                </section>
            </Container>
        </main>
    )
}

export default HomePage;
