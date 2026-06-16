import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import calender from '../../../../assets/images/icons/calendar.svg';
import person from '../../../../assets/images/icons/person.svg';
import locationIcon from '../../../../assets/images/icons/location.svg';
import { Messages } from '../../configs/messages';
import GuestDropdown from '../guestDropdown/guestDropdown';
import './hotelFilterBar.css';

const HotelFilterBar = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm({
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

    const { pathname } = useLocation();

    return (
        <main>
            <div className={`hotel-search-back-div ${pathname === '/hotels' ? "hotel-search-back-div" : "hotel-details-page-back-div" }`}></div>
            <div className="hotel-search-container w-100">
                <div className={` position-relative ${pathname === '/hotels' ? "search-filter-bar" : "hotel-details-page-filter-bar" }`}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Row className='search-filter-bar-content align-items-center m-0'>
                            <Col lg={2} md={6} sm={6} className="mb-3 mb-lg-0 border-end border-light position-relative">
                                <div className="d-flex align-items-center h-100 search-filter-bar-input">
                                    <img src={locationIcon} className='search-filter-bar-icon me-2' alt='location icon'></img>
                                    <select className="form-select border-0 bg-transparent shadow-none p-0 search-filter-input-text fw-bold" {...register('city', { required: Messages.hotel.ERR_CITY_NAME_REQUIRED })}>
                                        <option className='form-option' value="">Select City</option>
                                        <option className='form-option' value="Rajkot">Rajkot</option>
                                        <option className='form-option' value="Surat">Surat</option>
                                        <option className='form-option' value="Ahmedabad">Ahmedabad</option>
                                        <option className='form-option' value="Mumbai">Mumbai</option>
                                        <option className='form-option' value="Delhi">Delhi</option>
                                    </select>
                                </div>
                                {errors.city && <div className="search-filter-error-message text-danger small position-absolute">{errors.city.message}</div>}
                            </Col>
                            <Col lg={2} md={6} sm={6} className="mb-3 mb-lg-0 border-end border-light position-relative">
                                <div className="d-flex align-items-center h-100 search-filter-bar-input">
                                    <img src={calender} className='search-filter-bar-icon me-2' alt='calender icon'></img>
                                    <input type="date" className="form-control search-custom-input-icon border-0 bg-transparent shadow-none p-0 search-filter-input-text search-custom-date-input position-relative fw-bold" {...register('checkIn', { validate: value => { if (!value) return true; const selectedDate = new Date(value); const maxDate = new Date(); maxDate.setMonth(maxDate.getMonth() + 6); if (selectedDate > maxDate) return Messages.booking.MAX_BOOKING_DATE || 'Cannot book a room more than 6 months in advance.'; return true; } })} min={new Date().toISOString().split('T')[0]} />
                                </div>
                                {errors.checkIn && <div className="search-filter-error-message text-danger small position-absolute">{errors.checkIn.message}</div>}
                            </Col>
                            <Col lg={2} md={6} sm={6} className="mb-3 mb-lg-0 border-end border-light position-relative">
                                <div className="d-flex align-items-center h-100 search-filter-bar-input">
                                    <img src={calender} className='search-filter-bar-icon me-2 ms-lg-2' alt='calender icon'></img>
                                    <input type="date" className="form-control search-custom-input-icon border-0 bg-transparent shadow-none p-0 search-filter-input-text search-custom-date-input position-relative fw-bold" {...register('checkOut', { validate: value => { if (!value) return true; if (checkInDate && new Date(checkInDate) >= new Date(value)) return Messages.booking.MIN_CHECK_IN_DATE || 'Check out date must be after check in date.'; if (checkInDate) { const diffDays = Math.ceil(Math.abs(new Date(value) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)); if (diffDays > 60) return Messages.booking.MAX_BOOKING_DURATION || 'Cannot book a room for more than 60 days.'; } return true; } })} min={checkInDate || new Date().toISOString().split('T')[0]} />
                                </div>
                                {errors.checkOut && <div className="search-filter-error-message text-danger small position-absolute">{errors.checkOut.message}</div>}
                            </Col>
                            <Col lg={3} md={6} sm={6} className="mb-3 mb-lg-0 position-relative">
                                <div className="d-flex align-items-center h-100 search-filter-bar-input search-filter-people-input">
                                    <img src={person} className='search-filter-bar-icon me-2 ms-lg-2' alt='person icon'></img>
                                    <div className="d-flex align-items-center w-100">
                                        <GuestDropdown
                                            isSearchPage={true}
                                            rooms={watch('rooms')}
                                            adults={watch('adults')}
                                            children={watch('children')}
                                            onRoomsChange={(val) => setValue('rooms', val, { shouldValidate: true })}
                                            onAdultsChange={(val) => setValue('adults', val, { shouldValidate: true })}
                                            onChildrenChange={(val) => setValue('children', val, { shouldValidate: true })}
                                        />
                                        <input type="number" className="d-none" {...register('rooms', { min: { value: 1, message: Messages.booking.ERR_ROOM_COUNT } })} />
                                        <input type="number" className="d-none" {...register('adults', { min: { value: 1, message: Messages.booking.ERR_ADULT_COUNT }, max: { value: 10, message: Messages.booking.ERR_ADULT_COUNT } })} />
                                        <input type="number" className="d-none" {...register('children', { min: { value: 0, message: Messages.booking.ERR_CHILD_COUNT }, max: { value: 10, message: Messages.booking.ERR_CHILD_COUNT } })} />
                                    </div>
                                </div>
                                {(errors.rooms || errors.adults || errors.children) && (
                                    <div className="search-filter-error-message text-danger small position-absolute">
                                        {errors.rooms && <div>{errors.rooms.message}</div>}
                                        {errors.adults && <div>{errors.adults.message}</div>}
                                        {errors.children && <div>{errors.children.message}</div>}
                                    </div>
                                )}
                            </Col>
                            <Col lg={3} className="mt-3 mt-lg-0">
                                <button type="submit" className='search-filter-bar-button border-0'>
                                    Search Again
                                </button>
                            </Col>
                        </Row>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default HotelFilterBar;
