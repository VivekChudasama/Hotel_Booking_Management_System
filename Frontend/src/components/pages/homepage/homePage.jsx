import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { getHotelsList } from '../../services/hotelApi';
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

    // Filter states
    const [city, setCity] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    // Validation error states
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const data = await getHotelsList();
                setHotels(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch hotels');
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    const handleBookNow = () => {
        const newErrors = {};

        // validation of the filter
        if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
            newErrors.checkOut = Messages.booking.MIN_CHECK_IN_DATE;
        }
        if (rooms < 1) {
            newErrors.rooms = Messages.booking.ERR_ROOM_COUNT;
        }

        if (adults < 1) {
            newErrors.adults = Messages.booking.ERR_ADULT_COUNT;
        }
        
        if (children < 0) {
            newErrors.children = Messages.booking.ERR_CHILD_COUNT;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const queryParams = new URLSearchParams();
        if (city) queryParams.append('city', city);
        if (checkIn) queryParams.append('checkIn', checkIn);
        if (checkOut) queryParams.append('checkOut', checkOut);
        if (rooms !== null) queryParams.append('rooms', rooms);
        if (adults !== null) queryParams.append('adults', adults);
        if (children !== null) queryParams.append('children', children);

        navigate(`/hotels?${queryParams.toString()}`);
    };

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
                <Row className='filter-bar-content align-items-center m-0'>
                    <Col lg={3} md={6} className="mb-3 mb-lg-0 border-end border-light">
                        <div className="d-flex mb-1 align-items-center">
                            <img src={location} className='filter-bar-icon' alt='location icon'></img>
                            <div className='filter-bar-title'>Where are you headed?</div>
                        </div>
                        <div className="filter-bar-input">
                            <select className="form-select border-0 bg-transparent shadow-none p-0 filter-input-text" value={city} onChange={(e) => { setCity(e.target.value); setErrors({ ...errors, city: null }); }}>
                                <option className='form-option' value="">Select City</option>
                                <option className='form-option' value="Rajkot">Rajkot</option>
                                <option className='form-option' value="Surat">Surat</option>
                                <option className='form-option' value="Ahmedabad">Ahmedabad</option>
                                <option className='form-option' value="Mumbai">Mumbai</option>
                                <option className='form-option' value="Delhi">Delhi</option>
                            </select>
                        </div>
                        {errors.city && <div className="text-danger small mt-1">{errors.city}</div>}
                    </Col>
                    <Col lg={2} md={6} className="mb-3 mb-lg-0 border-end border-light">
                        <div className="d-flex mb-1 align-items-center">
                            <img src={calender} className='filter-bar-icon' alt='calender icon'></img>
                            <div className='filter-bar-title'>Check in</div>
                        </div>
                        <div className="filter-bar-input">
                            <input type="date" className="form-control custom-input-icon border-0 bg-transparent shadow-none p-0 filter-input-text custom-date-input" value={checkIn} onChange={(e) => { setCheckIn(e.target.value); setErrors({ ...errors, checkIn: null }); }} min={new Date().toISOString().split('T')[0]} />
                        </div>
                        {errors.checkIn && <div className="text-danger small mt-1">{errors.checkIn}</div>}
                    </Col>
                    <Col lg={2} md={6} className="mb-3 mb-lg-0 border-end border-light">
                        <div className="d-flex mb-1 align-items-center">
                            <img src={calender} className='filter-bar-icon' alt='calender icon'></img>
                            <div className='filter-bar-title'>Check out</div>
                        </div>
                        <div className="filter-bar-input">
                            <input type="date" className="form-control custom-input-icon border-0 bg-transparent shadow-none p-0 filter-input-text custom-date-input" value={checkOut} onChange={(e) => { setCheckOut(e.target.value); setErrors({ ...errors, checkOut: null }); }} min={checkIn || new Date().toISOString().split('T')[0]} />
                        </div>
                        {errors.checkOut && <div className="text-danger small mt-1">{errors.checkOut}</div>}
                    </Col>
                    <Col lg={3} md={6} className="mb-3 mb-lg-0">
                        <div className="d-flex mb-1 align-items-center">
                            <img src={person} className='filter-bar-icon' alt='person icon'></img>
                            <div className='filter-bar-title' >Rooms | Adults, Children</div>
                        </div>
                        <div className="d-flex align-items-center filter-bar-input filter-people-input">
                            <input type="number" className="form-control border-0 bg-transparent shadow-none p-0 filter-input-text text-center filter-input" placeholder="1" value={rooms} onChange={(e) => { setRooms(e.target.value); setErrors({ ...errors, rooms: null }); }} min="1" title="Rooms" />
                            <span className="filter-input-text">|</span>
                            <input type="number" className="form-control border-0 bg-transparent shadow-none p-0 filter-input-text text-center filter-input" placeholder="1" value={adults} onChange={(e) => { setAdults(e.target.value); setErrors({ ...errors, adults: null }); }} min="1" title="Adults" />
                            <span className="filter-input-text">,</span>
                            <input type="number" className="form-control border-0 bg-transparent shadow-none p-0 filter-input-text text-center filter-input" placeholder="0" value={children} onChange={(e) => { setChildren(e.target.value); setErrors({ ...errors, children: null }); }} min="0" title="Children" />
                        </div>
                        {(errors.rooms || errors.adults || errors.children) && (
                            <div className="text-danger small mt-1">
                                {errors.rooms && <div>{errors.rooms}</div>}
                                {errors.adults && <div>{errors.adults}</div>}
                                {errors.children && <div>{errors.children}</div>}
                            </div>
                        )}
                    </Col>
                    <Col lg={2} className="mt-3 mt-lg-0">
                        <button type="button" className='filter-bar-button border-0' onClick={handleBookNow}>
                            Book Now
                        </button>
                    </Col>
                </Row>
            </div>
            <Container fluid className="homepage-container">
                <section className="mb-5">
                    <h2 className="hotel-title position-relative d-inline-block">Hotels</h2>

                    {loading && <Spinner animation="border" variant="secondary" />}

                    {error && <p className="text-danger">{error}</p>}

                    {!loading && !error && hotels.length === 0 && (
                        <p>No hotels found.</p>
                    )}
                    {!loading && !error && hotels.length > 0 && (
                        <Row className="d-flex flex-nowrap overflow-auto pb-3 hotel-container">
                            {hotels.map((hotel) => (
                                <Col key={`${hotel._id}`} xs={10} sm={6} md={4} lg={2} className="mb-4 me-5">
                                    <div className="hotel-card border-0 bg-transparent d-flex flex-column h-100" onClick={() => navigate(`/hotel/${hotel._id}`)}>
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
