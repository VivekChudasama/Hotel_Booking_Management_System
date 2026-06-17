import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { getHotelDetails } from '../../services/hotelService';
import { getRoomList } from '../../services/roomService';
import HotelFilterBar from '../../shared/components/hotelFilterBar/hotelFilterBar';
import locationIcon from '../../../assets/images/icons/location.svg';
import locationGreenIcon from '../../../assets/images/icons/amenityicons/hotelDetailsPage/location.svg'
import staffsServiceIcon from '../../../assets/images/icons/amenityicons/hotelDetailsPage/staffs-service.svg'
import wellnessIcons from '../../../assets/images/icons/amenityicons/hotelDetailsPage/wellness.svg'
import wifiIcons from '../../../assets/images/icons/amenityicons/hotelDetailsPage/wifi.svg'
import amenitiesMapper from '../../../helpers/amenitiesIconsMapper';
import './hotelDetailsPage.css';

// get all amenity icons
const getAmenityIcon = (amenityName) => {
  if (!amenityName) return null;
  const key = amenityName.toLowerCase().trim().replace(/\s+/g, '-');

  const path = amenitiesMapper.amenityIcons[key];
  if (!path) return null;

  const filename = path.split('/').pop();

  try {
    return new URL(`../../../assets/images/icons/amenityicons/hotelDetailsPage/${filename}`, import.meta.url).href;
  } catch (err) {
    console.error('Error loading amenity icon:', err);
    return null;
  }
};

const HotelDetailsPage = () => {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 576);
  const [visibleRoomsCount, setVisibleRoomsCount] = useState(2);

  // featch the data by the hotel_id
  useEffect(() => {
    const fetchDetailsAndRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getHotelDetails(hotelId);
        setHotelData(data);
        try {
          const roomList = await getRoomList(hotelId);
          setRooms(roomList || []);
        } catch (roomErr) {
          console.error('Error fetching room list:', roomErr);
          setRooms([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailsAndRooms();
  }, [hotelId]);

  // function for readmore description
  const ReadMore = ({ children }) => {
    const text = children || '';
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    if (text.length <= 400) {
      return <span>{text}</span>;
    }

    return (
      <span>
        {isReadMore ? `${text.slice(0, 400)}...` : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "View more" : "View less"}
        </span>
      </span>
    );
  };

  // handle the screen size 
  const handleResize = () => {
    const width = window.innerWidth;
    setIsMobile(width < 1024);
    setIsMobileScreen(width < 576);
  };

  // event listener for window resize
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // fuction for the scroll to section for the hotel details section
  const scrollToSection = (id, tabName) => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // function to check the user is login or not before booking
  const handleSelectRoom = (room) => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (!token || !userStr) {
      navigate('/login');
    } else {
      console.log('Room selected:', room);
    }
  };

  if (loading) {
    return (
      <main className="hotel-details-page-section">
        <HotelFilterBar />
        <div className="d-flex justify-content-center align-items-center py-5 my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading hotel details...</span>
          </div>
        </div>
      </main>
    );
  }

  if (error || !hotelData) {
    return (
      <main className="hotel-details-page-section">
        <HotelFilterBar />
        <Container className="my-5 py-5 text-center">
          <div className="alert alert-danger max-width-600 mx-auto">
            {'Hotel details are currently unavailable.'}
          </div>
        </Container>
      </main>
    );
  }

  // Get all amenities from the database
  const amenitiesList = Array.from(
    new Set(rooms.flatMap((room) => room.amenities || []))
  );

  const galleryImages = hotelData.images && hotelData.images.length > 0 ? hotelData.images : [];

  return (
    <main className="hotel-details-page-section">
      <HotelFilterBar />
      {/* Gallery Section */}
      <Container fluid className="hotel-gallery-container">
        {isMobileScreen ? (
          <div className="image-gallery position-relative">
            <img src={galleryImages[0]} alt={hotelData.name} className="gallery-main-img rounded w-100" />
            {galleryImages.length > 1 && (
              <div
                className="gallery-more-images-mobile position-absolute bottom-0 end-0 m-3 px-3 py-2 rounded d-flex align-items-center justify-content-center cursor-pointer"
                onClick={() => setShowModal(true)}>
                <span className="gallery-more-text">View all photos ({galleryImages.length})</span>
              </div>
            )}
          </div>
        ) : galleryImages.length === 1 ? (
          <div className="image-gallery">
            <img src={galleryImages[0]} alt={hotelData.name} className="gallery-main-img rounded" />
          </div>
        ) : (
          <Row className="hotel-gallery-grid g-3 position-relative">
            <Col md={8} sm={12} className="gallery-left-col">
              <div className="gallery-large-section position-relative">
                <img src={galleryImages[0]} alt={hotelData.name} className="gallery-main-img rounded" />
              </div>
            </Col>
            <Col md={4} sm={12} className="gallery-right-col d-flex flex-column gap-3">
              <Row lg={12} md={12} sm={12}>
                <div className="gallery-small-section top-img-section flex-grow-1">
                  <img src={galleryImages[1]} alt={hotelData.name} className="gallery-sub-img rounded" />
                </div>
              </Row>
              <Row lg={12} md={12} sm={12}>
                <div className="gallery-small-section bottom-img-section flex-grow-1 position-relative">
                  <img src={galleryImages[2] || galleryImages[0]} alt={hotelData.name} className="gallery-sub-img rounded" />
                  {galleryImages.length > 3 && (
                    <div className="gallery-more-images position-absolute top-0 start-0 rounded d-flex align-items-center justify-content-center cursor-pointer" onClick={() => setShowModal(true)}>
                      <span className="gallery-more-text">+{galleryImages.length - 3} More Photos</span>
                    </div>
                  )}
                </div>
              </Row>
            </Col>
            {galleryImages.length > 1 && (
              <div className="gallery-more-btn-tablet position-absolute bottom-0 end-0 m-4 px-3 py-2 rounded d-flex align-items-center justify-content-center cursor-pointer"
                onClick={() => setShowModal(true)}>
                <span className="gallery-more-text">View all photos ({galleryImages.length})</span>
              </div>
            )}
          </Row>
        )}
      </Container>

      {/* Sub-Navigation */}
      <div className=" position-sticky sticky-top-subnav">
        <Container fluid className='details-nav'>
          <div className="d-flex gap-4 py-2 justify-content-start align-items-center">
            <button
              onClick={() => scrollToSection('overview-section', 'overview')}
              className={`nav-tab-btn text-decoration-none border-0 ${activeTab === 'overview' ? 'active-tab' : ''}`}>
              Overview
            </button>
            <button
              onClick={() => scrollToSection('amenities-section', 'amenities')}
              className={`nav-tab-btn text-decoration-none border-0 ${activeTab === 'amenities' ? 'active-tab' : ''}`}>
              Amenities
            </button>
            <button
              onClick={() => scrollToSection('rooms-section', 'rooms')}
              className={`nav-tab-btn text-decoration-none border-0 ${activeTab === 'rooms' ? 'active-tab' : ''}`}>
              Rooms
            </button>
          </div>
        </Container>
      </div>

      <Container fluid className="hotel-details-container ">
        <Row className="mb-4">
          <Col md={8} sm={6} xs={12} className="hotel-title-block">
            <h1 className="hotel-title-name font-weight-bold m-0">{hotelData.name}</h1>
            <div className="hotel-address d-flex align-items-center mt-2">
              <img src={locationIcon} className="address-pin me-2" alt="pin icon" />
              <span className="address-text">
                {hotelData.address}, {hotelData.city}
              </span>
            </div>
          </Col>

          <Col md={4} sm={6} xs={12} className="text-md-end mt-3 mt-md-0 ">
            <button
              onClick={() => scrollToSection('rooms-section', 'rooms')}
              className="see-rooms-btn border-0">
              See Room Availability
            </button>
          </Col>
        </Row>

        {/* Overview Section */}
        <Row >
          <div id="overview-section" >
            <h2 className="section-heading mb-3 text-black">Overview</h2>
            <Row>
              <Col className='overview-left-section' xxl={8} lg={8} md={8} sm={12}>
                <p className="overview-paragraph text-black">
                  {isMobile ? (
                    <ReadMore>{hotelData.description}</ReadMore>
                  ) : (
                    hotelData.description
                  )}
                </p>
              </Col>

              <Col className='overview-right-section' xxl={4} lg={4} md={4} sm={12}>
                <div className="bg-white overview-right-section-content">
                  <p className='text-black overview-heading'>Highlights</p>
                  <div className="d-flex">
                    <div>
                      <img src={locationGreenIcon} height={26} width={21} alt='location icon' className='highlights-location-icons' />
                    </div>
                    <div>
                      <p className='highlight-description text-black'>The location of this hotel has a rating score of 96!</p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div>
                      <img src={wellnessIcons} height={20} width={20} alt='wellness icon' className='highlights-icons' />
                    </div>
                    <div>
                      <p className='highlight-description text-black'>This hotel has a wellness rating score of 95!</p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div>
                      <img src={wifiIcons} height={17} width={17} alt='wifi icon' className='highlights-wifi-icons' />
                    </div>
                    <div>
                      <p className='highlight-description text-black'>The WiFi service this hotel provides has a rating score of 87!</p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div>
                      <img src={staffsServiceIcon} height={20} width={20} alt='staff service icon' className='highlights-staff-service-icons' />
                    </div>
                    <div>
                      <p className='highlight-description text-black'>The staff’s service has an overall rating of 91!</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Amenities Section */}
          <div id="amenities-section">
            <h2 className="section-heading mb-3 font-weight-bold text-black">Amenities</h2>
            <div className="amenities-grid d-flex flex-wrap">
              {amenitiesList.length === 0 ? (
                <p className="text-muted m-0">No amenities listed.</p>
              ) : (
                amenitiesList.map((amenity, index) => {
                  const iconUrl = getAmenityIcon(amenity);
                  return (
                    <div key={index} className="amenity-chip d-flex align-items-center justify-content-center bg-white">
                      {iconUrl && (
                        <img
                          src={iconUrl}
                          alt={`${amenity} icon`}
                          className="amenity-icon"
                        />
                      )}
                      <span>{amenity}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </Row>

        {/* Rooms Section */}
        <h2 className="section-heading mb-4 font-weight-bold text-black mt-4">Rooms</h2>

        <div className="bg-white rooms-section">
          <div className="mb-5 mt-4 room-section-container">
            <div className="rooms-list-container d-flex flex-column gap-4">
              {rooms.length === 0 ? (
                <p className="text-muted text-center py-4">No rooms currently listed for this hotel.</p>
              ) : (
                rooms.slice(0, visibleRoomsCount).map((room) => {
                  const adultCount = room.room_capacity?.adult_count;
                  const childCount = room.room_capacity?.children_count;

                  return (
                    <div key={room._id} className="room-result-card d-flex flex-column flex-md-row">
                      {/* Room Image Container */}
                      <div className="room-image-section overflow-hidden">
                        {room.room_images && room.room_images[0] ? (
                          <img src={room.room_images[0]} alt={room.room_type} className="room-img" />
                        ) : (
                          <div className="room-img-placeholder d-flex align-items-center justify-content-center">
                            <span className="placeholder-txt">No Image Available</span>
                          </div>
                        )}
                      </div>

                      {/* Room Details Content */}
                      <div className="room-info-section d-flex flex-column flex-grow-1 justify-content-between">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h4 className="room-type-title font-weight-bold mb-2">{room.room_type}</h4>
                            <p className="room-description text-secondary small mb-3">
                              {room.room_description}
                            </p>
                          </div>

                          <div>
                            <button
                              onClick={() => handleSelectRoom(room)}
                              className="btn btn-primary select-room-btn border-0 font-weight-600 px-4 py-2">
                              Select
                            </button>
                          </div>
                        </div>

                        <div className="room-footer-row d-flex justify-content-between pt-3">
                          <div className="room-benefits-tags mb-3">
                            <span className="benefit-badge free-cancel">Free Cancellation, Breakfast included</span>
                            <p className='free-cancle-before'>Before {searchParams.get('checkIn')}</p>
                          </div>

                          <div className="room-pricing-meta d-flex flex-column align-items-end">
                            <span className="guests-count text-black small">
                              1 Room | {adultCount} Adults , {childCount} Children
                            </span>
                            <div className="room-price-val font-weight-bold text-yellow mt-1">
                              ${room.price_per_night}
                            </div>
                            <span className="taxes-notice">Taxes incl.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* See More Rooms Toggle */}
            <div className="see-more-rooms-block text-center mt-lg-5 mt-3 d-flex justify-content-center gap-4">
              {rooms.length > visibleRoomsCount && (
                <button
                  onClick={() => setVisibleRoomsCount((prev) => prev + 2)}
                  className="see-more-rooms-btn bg-transparent border-0 d-inline-flex flex-column align-items-center gap-2 text-secondary"
                >
                  <div className="see-more-icon-circle d-flex align-items-center justify-content-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--secondary-dark-blue)" strokeWidth="2" />
                      <path d="M8 11L12 15L16 11" stroke="var(--secondary-dark-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-weight-600 see-more-txt">See More Rooms</span>
                </button>
              )}

              {visibleRoomsCount > 2 && (
                <button
                  onClick={() => setVisibleRoomsCount(2)}
                  className="see-more-rooms-btn bg-transparent border-0 d-inline-flex flex-column align-items-center gap-2 text-secondary"
                >
                  <div className="see-more-icon-circle d-flex align-items-center justify-content-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--secondary-dark-blue)" strokeWidth="2" />
                      <path d="M8 11L12 15L16 11" stroke="var(--secondary-dark-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-weight-600 see-more-txt">See Less Rooms</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </Container>

      {/* Gallery Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered className="gallery-modal">
        <Modal.Header className='gallery-modal-header' closeButton>
          <Modal.Title className="text-white">{hotelData.name} - All Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 gallery-modal-body">
          <Row className="g-4">
            {galleryImages.map((img, id) => (
              <Col md={6} sm={12} xs={12} key={id}>
                <div className="modal-gallery-img-section">
                  <img src={img} alt={`Hotel ${id + 1}`} className="w-100 rounded modal-gallery-img" onClick={() => window.open(img, '_blank')} style={{ cursor: 'pointer' }} />
                </div>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default HotelDetailsPage;