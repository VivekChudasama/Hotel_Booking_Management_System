import { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getHotelList } from '../../services/hotelService';
import { getRoomList } from '../../services/roomService';
import locationIcon from '../../../assets/images/icons/location.svg';
import searchIcon from '../../../assets/images/icons/search.svg';
import HotelFilterBar from '../../shared/components/hotelFilterBar/hotelFilterBar';
import './hotelsSearchPage.css';

const HotelsPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [hotels, setHotels] = useState([]);
    const [hotelPrices, setHotelPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

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

                // Fetch room prices
                if (data.length > 0) {
                    const prices = {};
                    await Promise.all(data.map(async (hotel) => {
                        try {
                            const rooms = await getRoomList(hotel._id);
                            if (rooms && rooms.length > 0) {
                                const minPrice = Math.min(...rooms.map(r => r.price_per_night));
                                prices[hotel._id] = minPrice;
                            }
                        } catch (err) {
                            console.log('Error fetching room list for hotel', hotel._id, err);
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

    const getHotelPrice = (hotel) => {
        if (hotelPrices[hotel._id]) {
            return hotelPrices[hotel._id];
        }
    };

    const filteredHotels = hotels.filter(hotel => {
        // Search filter
        if (!hotel.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }

        // Price filter
        if (selectedPriceRanges.length > 0) {
            const price = getHotelPrice(hotel);
            if (price === undefined) return false;

            let matchesPrice = false;
            if (selectedPriceRanges.includes('0-200') && price >= 0 && price <= 200) matchesPrice = true;
            if (selectedPriceRanges.includes('200-500') && price > 200 && price <= 500) matchesPrice = true;
            if (selectedPriceRanges.includes('500-1000') && price > 500 && price <= 1000) matchesPrice = true;
            if (selectedPriceRanges.includes('1000-2000') && price > 1000 && price <= 2000) matchesPrice = true;
            if (selectedPriceRanges.includes('2000-5000') && price > 2000 && price <= 5000) matchesPrice = true;

            if (!matchesPrice) return false;
        }

        return true;
    });

    const priceCounts = {
        '0-200': 0,
        '200-500': 0,
        '500-1000': 0,
        '1000-2000': 0,
        '2000-5000': 0
    };

    hotels.forEach(hotel => {
        const price = getHotelPrice(hotel);
        if (price !== undefined) {
            if (price >= 0 && price <= 200) priceCounts['0-200']++;
            else if (price > 200 && price <= 500) priceCounts['200-500']++;
            else if (price > 500 && price <= 1000) priceCounts['500-1000']++;
            else if (price > 1000 && price <= 2000) priceCounts['1000-2000']++;
            else if (price > 2000 && price <= 5000) priceCounts['2000-5000']++;
        }
    });

    const handlePriceRangeChange = (range) => {
        setSelectedPriceRanges(prev => {
            if (prev.includes(range)) {
                return prev.filter(r => r !== range);
            } else {
                return [...prev, range];
            }
        });
    };

    const city = searchParams.get('city') || '';

    return (
        <main className="searchpage-container">
            <HotelFilterBar />

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
                        <Col xxl={3} lg={3} md={4} sm={12} className="hotel-search-left-container">
                            {/* Search by Hotel Name Card */}
                            <div className="sidebar-card overflow-hidden">
                                <div className="sidebar-card-header text-white border-0">Search by hotel name</div>
                                <div className="sidebar-card-body border-0">
                                    <div className="search-input-section position-relative d-flex align-items-center">
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
                            <h6 className=" fw-bold hotel-search-title">Filter results</h6>
                            <div className="sidebar-card overflow-hidden">
                                <div className="sidebar-card-price-filter-header text-white border-0">Price Range</div>
                                <div className=" border-0">
                                    <div className=" sidebar-price-card-body position-relative d-flex align-items-center">
                                        <Form className="w-100">
                                            <div className="price-row d-flex justify-content-between align-items-center">
                                                <Form.Check
                                                    type={'checkbox'}
                                                    label={`$ 0 - $ 200`}
                                                    checked={selectedPriceRanges.includes('0-200')}
                                                    onChange={() => handlePriceRangeChange('0-200')}
                                                />
                                                <span className="price-count">{priceCounts['0-200']}</span>
                                            </div>
                                            <div className="price-row d-flex justify-content-between align-items-center">
                                                <Form.Check
                                                    type={'checkbox'}
                                                    label={`$ 200 - $ 500`}
                                                    checked={selectedPriceRanges.includes('200-500')}
                                                    onChange={() => handlePriceRangeChange('200-500')}
                                                />
                                                <span className="price-count">{priceCounts['200-500']}</span>
                                            </div>
                                            <div className="price-row d-flex justify-content-between align-items-center">
                                                <Form.Check
                                                    type={'checkbox'}
                                                    label={`$ 500 - $ 1,000`}
                                                    checked={selectedPriceRanges.includes('500-1000')}
                                                    onChange={() => handlePriceRangeChange('500-1000')}
                                                />
                                                <span className="price-count">{priceCounts['500-1000']}</span>
                                            </div>
                                            <div className="price-row d-flex justify-content-between align-items-center">
                                                <Form.Check
                                                    type={'checkbox'}
                                                    label={`$ 1,000 - $ 2,000`}
                                                    checked={selectedPriceRanges.includes('1000-2000')}
                                                    onChange={() => handlePriceRangeChange('1000-2000')}
                                                />
                                                <span className="price-count">{priceCounts['1000-2000']}</span>
                                            </div>
                                            <div className="price-row d-flex justify-content-between align-items-center">
                                                <Form.Check
                                                    type={'checkbox'}
                                                    label={`$ 2,000 - $ 5,000`}
                                                    checked={selectedPriceRanges.includes('2000-5000')}
                                                    onChange={() => handlePriceRangeChange('2000-5000')}
                                                />
                                                <span className="price-count">{priceCounts['2000-5000']}</span>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Right Results Column */}
                        <Col xxl={8} lg={9} md={8} sm={12} className='hotel-search-right-container'>
                            <h3 className="search-results-title mb-4">
                                {city ? `${city}: ` : ''}{filteredHotels.length} {filteredHotels.length === 1 ? 'result' : 'results'} found
                            </h3>

                            {filteredHotels.length === 0 ? (
                                <div className="text-center py-5 border rounded bg-white">
                                    <h5 className="text-muted">No hotels found</h5>
                                </div>
                            ) : (
                                <div className="d-flex flex-column gap-4">
                                    {filteredHotels.map((hotel) => {
                                        const price = getHotelPrice(hotel);
                                        const imageUrl = hotel.images && hotel.images[0]
                                            ? hotel.images[0]
                                            : " ";

                                        return (
                                            <div key={`${hotel._id}`} className="hotel-result-card d-flex flex-column flex-md-row">
                                                <div className="hotel-result-image-section">
                                                    <img src={imageUrl} alt={hotel.name} className="hotel-result-image" />
                                                </div>
                                                <div className="hotel-result-info-section d-flex flex-column flex-grow-1 px-lg-3 px-md-3 px-sm-0 ">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <div className="pe-2">
                                                            <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                                                                <h4 className="hotel-result-name m-0">{hotel.name}</h4>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="hotel-result-description text-secondary small mb-3">
                                                        {hotel.description && hotel.description.length > 265
                                                            ? `${hotel.description.substring(0, 265)}... more`
                                                            : hotel.description
                                                        }
                                                    </p>

                                                    <div className="hotel-result-footer d-flex justify-content-between align-items-end flex-wrap mt-auto pt-2 border-top border-light">
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
                                                            {price ? (
                                                                <>
                                                                    <div className="hotel-price-duration text-secondary">1 room 1 night</div>
                                                                    <div className="hotel-price-value">${price}</div>
                                                                    <div className="hotel-price-tax text-secondary">Taxes incl.</div>
                                                                </>
                                                            ) : (
                                                                <div className="hotel-price-unavailable-value text-muted">Price Unavailable</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </Col>
                    </Row>
                )}
            </Container>
        </main>
    );
};

export default HotelsPage;