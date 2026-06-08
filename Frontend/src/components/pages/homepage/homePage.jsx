import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getHotelsList } from '../../services/hotelApi';
import homeImage from '../../../assets/images/home/homeImage.png';
import calender from '../../../assets/images/icons/calendar.svg';
import person from '../../../assets/images/icons/person.svg';
import location from '../../../assets/images/icons/location.svg';
import './homePage.css';

const HomePage = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const data = await getHotelsList();
                setHotels(data.data || data || []);
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
            <div>
                <img className='image  w-100' src={homeImage} height={500} width={1921} loading='eager' alt='home page image'></img>
            </div>
            <div className='text position-absolute'>
                <p className='text-line-1 text-white'>Chase elegance. Reserve your </p>
                <p className='text-line-2 text-white'>dream stay now.</p>
                <p className='text-line-3 text-white'>Discover the finest hotels from all over the world.</p>
            </div>
            <div className='filter-bar '>
                <Row className='filter-bar-content'>
                    <Col lg={3}>
                        <div className="d-flex">
                            <div>
                                <img src={location} height={17} width={14} className='filter-bar-icon' alt='location icon'></img>
                            </div>
                            <div className='filter-bar-title'>Where are you headed?</div>
                        </div>
                        <div></div>
                    </Col>
                    <Col lg={2}>
                        <div className="d-flex">
                            <div>
                                <img src={calender} height={17} width={14} className='filter-bar-icon' alt='calender icon'></img>
                            </div>
                            <div className='filter-bar-title'>Check in</div>
                        </div>
                        <div>
                        </div>
                    </Col>
                    <Col lg={2}>
                        <div className="d-flex">
                            <div>
                                <img src={calender} height={17} width={14} className='filter-bar-icon' alt='calender icon'></img>
                            </div>
                            <div className='filter-bar-title'>Check out</div>
                        </div>
                        <div></div>
                    </Col>
                    <Col lg={3}>
                        <div className="d-flex">
                            <div>
                                <img src={person} height={17} width={14} className='filter-bar-icon' alt='person icon'></img>
                            </div>
                            <div className='filter-bar-title' >Rooms | Adults, Children</div>
                        </div>
                        <div></div>
                    </Col>
                    <Col lg={2}>
                        <button type="submit" className='filter-bar-button border-0'>
                            Book Now
                        </button>
                    </Col>
                </Row>
            </div>
            <Container fluid className="homepage-container">
                <section className="mt-5 mb-5">
                    <h2 className="hotel-title mb-4 position-relative d-inline-block">Hotels</h2>

                    {loading && <p>Loading hotels...</p>}

                    {error && <p className="text-danger">{error}</p>}

                    {!loading && !error && hotels.length === 0 && (
                        <p>No hotels found.</p>
                    )}

                    {!loading && !error && hotels.length > 0 && (
                        <Row className="flex-nowrap overflow-auto pb-3 hotel-container">
                            {hotels.map((hotel, index) => (
                                <Col key={hotel.hotel_id || index} xs={10} sm={6} md={4} lg={3} className="mb-4">
                                    <div className="hotel-card border-0 bg-transparent d-flex flex-column h-100">
                                        <div className="hotel-image-container mb-3">
                                            {hotel.images && hotel.images.length > 0 ? (
                                                <img src={hotel.images[0]} alt={hotel.name} className="hotel-card-image img-fluid" loading="lazy" />
                                            ) : (
                                                <div className="hotel-card-image-placeholder bg-transparent"></div>
                                            )}
                                        </div>
                                        <div className="hotel-info">
                                            <h5 className="hotel-name">{hotel.name}</h5>
                                            <p className="hotel-address text-muted">
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

// function hotelList (){
//     const [showMoreData, setShowMoreData] = useState(1)
// }

export default HomePage;
