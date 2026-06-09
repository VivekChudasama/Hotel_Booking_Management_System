import './hotelsSearchPage.css'
import { Row, Col } from 'react-bootstrap';
import calender from '../../../assets/images/icons/calendar.svg';
import person from '../../../assets/images/icons/person.svg';
import location from '../../../assets/images/icons/location.svg';

const HotelsPage = () => {
    return (
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
                <Col lg={2} md={6} sm={6} className="mb-3 mb-lg-0 border-end border-light">
                    <div className="d-flex mb-1 align-items-center">
                        <img src={calender} className='filter-bar-icon' alt='calender icon'></img>
                        <div className='filter-bar-title'>Check in</div>
                    </div>
                    <div className="filter-bar-input">
                        <input type="date" className="form-control custom-input-icon border-0 bg-transparent shadow-none p-0 filter-input-text custom-date-input" value={checkIn} onChange={(e) => { setCheckIn(e.target.value); setErrors({ ...errors, checkIn: null }); }} min={new Date().toISOString().split('T')[0]} />
                    </div>
                    {errors.checkIn && <div className="text-danger small mt-1">{errors.checkIn}</div>}
                </Col>
                <Col lg={2} md={6} sm={6} className="mb-3 mb-lg-0 border-end border-light">
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
    )
}

export default HotelsPage