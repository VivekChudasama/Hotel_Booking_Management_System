import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getHotelList } from '../../services/hotelService';
import { getRoomList } from '../../services/roomService';
import calender from '../../../assets/images/icons/calendar.svg';
import person from '../../../assets/images/icons/person.svg';
import locationIcon from '../../../assets/images/icons/location.svg';
import searchIcon from '../../../assets/images/icons/search.svg';
import { Messages } from '../../shared/configs/messages';
import GuestDropdown from '../../shared/components/guestDropdown/GuestDropdown';
import './hotelsSearchPage.css';

const HotelsPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [hotels, setHotels] = useState([]);
    const [hotelPrices, setHotelPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');

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

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            setError(null);
            try {
                const query = {};
                searchParams.forEach((value, key) => {
                    query[key] = value;
                });
                const data = await getHotelList(query);
                setHotels(data);

                // Fetch room prices if a token exists
                const token = localStorage.getItem('token');
                if (token && data.length > 0) {
                    const prices = {};
                    await Promise.all(data.map(async (hotel) => {
                        try {
                            const rooms = await getRoomList(hotel._id);
                            if (rooms && rooms.length > 0) {
                                const minPrice = Math.min(...rooms.map(r => r.price_per_night));
                                prices[hotel._id] = minPrice;
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }));
                    setHotelPrices(prices);
                }
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

    // Filter hotels by Name.
    const filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getHotelPrice = (hotel) => {
        if (hotelPrices[hotel._id]) {
            return hotelPrices[hotel._id];
        }
    };

    const city = searchParams.get('city') || '';

    return (
        <main className="searchpage-container">
            <div className='hotel-search-back-div'></div>
            <div className="hotel-search-container w-100">
                <div className='search-filter-bar position-relative'>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Row className='search-filter-bar-content align-items-center m-0'>
                            <Col lg={2} md={6} sm={6} className="mb-3 mb-lg-0 border-end border-light position-relative">
                                <div className="d-flex align-items-center  h-100 search-filter-bar-input">
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
                                <div className="d-flex align-items-center  h-100 search-filter-bar-input">
                                    <img src={calender} className='search-filter-bar-icon me-2' alt='calender icon'></img>
                                    <input type="date" className="form-control search-custom-input-icon border-0 bg-transparent shadow-none p-0 search-filter-input-text search-custom-date-input position-relative fw-bold" {...register('checkIn', { validate: value => { if (!value) return true; const selectedDate = new Date(value); const maxDate = new Date(); maxDate.setMonth(maxDate.getMonth() + 6); if (selectedDate > maxDate) return Messages.booking.MAX_BOOKING_DATE || 'Cannot book a room more than 6 months in advance.'; return true; } })} min={new Date().toISOString().split('T')[0]} />
                                </div>
                                {errors.checkIn && <div className="search-filter-error-message text-danger small position-absolute">{errors.checkIn.message}</div>}
                            </Col>
                            <Col lg={2} md={6} sm={6} className="mb-3 mb-lg-0 border-end border-light position-relative">
                                <div className="d-flex align-items-center h-100 search-filter-bar-input">
                                    <img src={calender} className='search-filter-bar-icon me-2' alt='calender icon'></img>
                                    <input type="date" className="form-control search-custom-input-icon border-0 bg-transparent shadow-none p-0 search-filter-input-text search-custom-date-input position-relative fw-bold" {...register('checkOut', { validate: value => { if (!value) return true; if (checkInDate && new Date(checkInDate) >= new Date(value)) return Messages.booking.MIN_CHECK_IN_DATE || 'Check out date must be after check in date.'; if (checkInDate) { const diffDays = Math.ceil(Math.abs(new Date(value) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)); if (diffDays > 60) return Messages.booking.MAX_BOOKING_DURATION || 'Cannot book a room for more than 60 days.'; } return true; } })} min={checkInDate || new Date().toISOString().split('T')[0]} />
                                </div>
                                {errors.checkOut && <div className="search-filter-error-message text-danger small position-absolute">{errors.checkOut.message}</div>}
                            </Col>
                            <Col lg={3} md={6} sm={6} className="mb-3 mb-lg-0 position-relative">
                                <div className="d-flex align-items-center h-100 search-filter-bar-input search-filter-people-input">
                                    <img src={person} className='search-filter-bar-icon me-2' alt='person icon'></img>
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

            <Container fluid className="hotel-results-layout-container">
                {error && <div className="alert alert-danger mx-3">{error}</div>}

                {loading ? (
                    <div className="d-flex justify-content-center align-items-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <Row className="g-4 hotel-search-result-container">
                        {/* Left Sidebar Columns */}
                        <Col lg={3} md={4} sm={12} className="mb-lg-4">
                            {/* Search by Hotel Name Card */}
                            <div className="sidebar-card overflow-hidden">
                                <div className="sidebar-card-header text-white border-0">Search by hotel name</div>
                                <div className="sidebar-card-body border-0">
                                    <div className="search-input-wrapper position-relative d-flex align-items-center">
                                        <img src={searchIcon} className="search-icon position-absolute" alt="search" />
                                        <input
                                            type="text"
                                            placeholder="eg. The Fullerton Hotel"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-card overflow-hidden">
                                <div className="sidebar-card-header text-white border-0">Price Range</div>
                                <div className=" border-0">
                                    <div className=" sidebar-price-card-body position-relative d-flex align-items-center">
                                        <Form>
                                                <div  className="mb-3">
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        label={`$0 - $200`}
                                                    />
                                                </div>
                                                 <div  className="mb-3">
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        label={`$200 - $500`}
                                                    />
                                                </div>
                                                 <div  className="mb-3">
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        label={`$500 - $1,000`}
                                                    />
                                                </div>
                                                 <div  className="mb-3">
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        label={`$1,000 - $2,000`}
                                                    />
                                                </div>
                                                 <div  className="mb-3">
                                                    <Form.Check
                                                        type={'checkbox'}
                                                        label={`$2,000 - $5,000`}
                                                    />
                                                </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Right Results Column */}
                        <Col lg={9} md={4} sm={12}>
                            <h3 className="search-results-title mb-4">
                                {city ? `${city}: ` : ''}{filteredHotels.length} {filteredHotels.length === 1 ? 'result' : 'results'} found
                            </h3>

                            {/* {filteredHotels.length === 0 ? (
                                <div className="text-center py-5 border rounded bg-white">
                                    <h5 className="text-muted">No hotels found matching "{searchTerm}"</h5>
                                    <p className="text-muted small mb-0">Try searching for another hotel name or city.</p>
                                </div>
                            ) : (
                                    <div className="d-flex flex-column gap-4">
                                        {filteredHotels.map((hotel) => {
                                            const price = getHotelPrice(hotel);
                                            const imageUrl = hotel.images && hotel.images[0]
                                                ? hotel.images[0]
                                                : "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80";

                                            return (
                                                <div key={`${hotel._id}`} className="hotel-result-card d-flex flex-column flex-md-row">
                                                    <div className="hotel-result-image-wrapper">
                                                        <img src={imageUrl} alt={hotel.name} className="hotel-result-image" />
                                                    </div>
                                                    <div className="hotel-result-info-wrapper d-flex flex-column flex-grow-1 p-3">
                                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                                            <div className="pe-2">
                                                                <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                                                                    <h4 className="hotel-result-name m-0">{hotel.name}</h4>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <p className="hotel-result-description text-secondary small mb-3">
                                                            {hotel.description.length > 220
                                                                ? `${hotel.description.substring(0, 220)}... more`
                                                                : hotel.description
                                                            }
                                                        </p>

                                                        <div className="d-flex justify-content-between align-items-end mt-auto pt-2 border-top border-light">
                                                            <div>
                                                                <div className="hotel-location d-flex align-items-center mb-3">
                                                                    <img src={locationIcon} className="location-pin-icon me-1" alt="location" />
                                                                    <span className="small text-secondary">{hotel.address}, {hotel.city}</span>
                                                                </div>
                                                                <button
                                                                    onClick={() => navigate(`/hotel/${hotel._id}`)}
                                                                    className="hotel-select-btn border-0"
                                                                >
                                                                    Select
                                                                </button>
                                                            </div>

                                                            <div className="text-end hotel-price-section">
                                                                <div className="hotel-price-duration text-secondary">1 room 1 night</div>
                                                                <div className="hotel-price-value">${price}</div>
                                                                <div className="hotel-price-tax text-secondary">Taxes incl.</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )} */}
                        </Col>
                    </Row>
                )}
            </Container>
        </main>
    );
};

export default HotelsPage;