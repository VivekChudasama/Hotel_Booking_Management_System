import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getHotelList } from '../../services/hotelService';
import calender from '../../../assets/images/icons/calendar.svg';
import person from '../../../assets/images/icons/person.svg';
import location from '../../../assets/images/icons/location.svg';
import { Messages } from '../../shared/configs/messages';
import './hotelsSearchPage.css';
 
const HotelsPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        defaultValues: {
            city: searchParams.get('city') || '',
            checkIn: searchParams.get('checkIn') || '',
            checkOut: searchParams.get('checkOut') || '',
            rooms: searchParams.get('rooms') || 1,
            adults: searchParams.get('adults') || 1,
            children: searchParams.get('children') || 0
        }
    });

    const checkInDate = watch('checkIn');

    useEffect(() => {
        reset({
            city: searchParams.get('city') || '',
            checkIn: searchParams.get('checkIn') || '',
            checkOut: searchParams.get('checkOut') || '',
            rooms: searchParams.get('rooms') || 1,
            adults: searchParams.get('adults') || 1,
            children: searchParams.get('children') || 0
        });
    }, [searchParams, reset]);

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const query = {};
                searchParams.forEach((value, key) => {
                    query[key] = value;
                });
                const data = await getHotelList(query);
                setHotels(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch hotels');
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [searchParams]);

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

    return (
        <main>
            <div className='hotel-search-back-div'></div>
            <Container fluid className="hotel-search-container">
                <div className='filter-bar position-relative' style={{ margin: '0 auto 40px auto' }}>
                    <form onSubmit={handleSubmit(onSubmit)}><Row className='filter-bar-content align-items-center m-0'>
                        <Col lg={2} md={6} className="mb-3 mb-lg-0 border-end border-light">
                            <div className="d-flex align-items-center justify-content-center h-100 filter-bar-input">
                                <img src={location} className='filter-bar-icon me-2' alt='location icon'></img>
                                <select className="form-select border-0 bg-transparent shadow-none p-0 filter-input-text fw-bold" {...register('city', { required: Messages.booking.ERR_CITY_NAME_REQUIRED || 'City Name is required' })}>
                                    <option className='form-option' value="">Select City</option>
                                    <option className='form-option' value="Rajkot">Rajkot</option>
                                    <option className='form-option' value="Surat">Surat</option>
                                    <option className='form-option' value="Ahmedabad">Ahmedabad</option>
                                    <option className='form-option' value="Mumbai">Mumbai</option>
                                    <option className='form-option' value="Delhi">Delhi</option>
                                </select>
                            </div>
                            {errors.city && <div className="text-danger small mt-1 text-center">{errors.city.message}</div>}
                        </Col>
                        <Col lg={2} md={6} sm={6} className="mb-3 mb-lg-0 border-end border-light">
                            <div className="d-flex align-items-center justify-content-center h-100 filter-bar-input">
                                <img src={calender} className='filter-bar-icon me-2' alt='calender icon'></img>
                                <input type="date" className="form-control custom-input-icon border-0 bg-transparent shadow-none p-0 filter-input-text custom-date-input fw-bold" {...register('checkIn', { validate: value => { if(!value) return true; const selectedDate = new Date(value); const maxDate = new Date(); maxDate.setMonth(maxDate.getMonth() + 6); if (selectedDate > maxDate) return Messages.booking.MAX_BOOKING_DATE || 'Cannot book a room more than 6 months in advance.'; return true; } })} min={new Date().toISOString().split('T')[0]} />
                            </div>
                            {errors.checkIn && <div className="text-danger small mt-1 text-center">{errors.checkIn.message}</div>}
                        </Col>
                        <Col lg={2} md={6} sm={6} className="mb-3 mb-lg-0 border-end border-light">
                            <div className="d-flex align-items-center justify-content-center h-100 filter-bar-input">
                                <img src={calender} className='filter-bar-icon me-2' alt='calender icon'></img>
                                <input type="date" className="form-control custom-input-icon border-0 bg-transparent shadow-none p-0 filter-input-text custom-date-input fw-bold" {...register('checkOut', { validate: value => { if(!value) return true; if (checkInDate && new Date(checkInDate) >= new Date(value)) return Messages.booking.MIN_CHECK_IN_DATE || 'Check out date must be after check in date.'; if (checkInDate) { const diffDays = Math.ceil(Math.abs(new Date(value) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)); if (diffDays > 60) return Messages.booking.MAX_BOOKING_DURATION || 'Cannot book a room for more than 60 days.'; } return true; } })} min={checkInDate || new Date().toISOString().split('T')[0]} />
                            </div>
                            {errors.checkOut && <div className="text-danger small mt-1 text-center">{errors.checkOut.message}</div>}
                        </Col>
                        <Col lg={3} md={6} className="mb-3 mb-lg-0">
                            <div className="d-flex align-items-center justify-content-center h-100 filter-bar-input filter-people-input">
                                <img src={person} className='filter-bar-icon me-2' alt='person icon'></img>
                                <div className="d-flex align-items-center">
                                    <input type="number" className="form-control border-0 bg-transparent shadow-none p-0 filter-input-text text-center filter-input fw-bold" placeholder="1" {...register('rooms', { min: { value: 1, message: Messages.booking.ERR_ROOM_COUNT || 'Invalid rooms' } })} min="1" title="Rooms" />
                                    <span className="filter-input-text fw-bold mx-1">Room | </span>
                                    <input type="number" className="form-control border-0 bg-transparent shadow-none p-0 filter-input-text text-center filter-input fw-bold" placeholder="1" {...register('adults', { min: { value: 1, message: Messages.booking.ERR_ADULT_COUNT || 'Invalid adults' } })} min="1" title="Adults" />
                                    <span className="filter-input-text fw-bold mx-1">Adults</span>
                                    <input type="number" className="d-none" placeholder="0" {...register('children', { min: { value: 0, message: Messages.booking.ERR_CHILD_COUNT || 'Invalid children' } })} min="0" title="Children" />
                                </div>
                            </div>
                            {(errors.rooms || errors.adults || errors.children) && (
                                <div className="text-danger small mt-1 text-center">
                                    {errors.rooms && <div>{errors.rooms.message}</div>}
                                    {errors.adults && <div>{errors.adults.message}</div>}
                                    {errors.children && <div>{errors.children.message}</div>}
                                </div>
                            )}
                        </Col>
                        <Col lg={3} className="mt-3 mt-lg-0">
                            <button type="submit" className='filter-bar-button border-0 w-100'>
                                Search Again
                            </button>
                        </Col>
                    </Row></form>
                </div>
            </Container>
        </main>
    )
}

export default HotelsPage