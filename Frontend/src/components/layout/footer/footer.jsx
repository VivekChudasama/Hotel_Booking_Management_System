import './footer.css'
import logo from '../../../assets/images/Logo.svg';
import facebookIcon from '../../../assets/images/footer/Facebook.svg'
import linkdinIcon from '../../../assets/images/footer/linkedin.svg'
import twitterIcon from '../../../assets/images/footer/twitter.svg'
import whatsappIcon from '../../../assets/images/footer/whatsapp.svg'
import { Container, Row, Col, Stack, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <Container fluid className='footer-container'>
            <Row className="w-100 m-0">
                <Col lg={3} md={12} className="mb-4 mb-lg-0">
                    <Stack>
                        <img className='footer-logo' src={logo} alt='logo' loading='lazy' height={40} width={220} />
                    </Stack>
                </Col>

                <Col lg={9} md={12}>
                    <Row>
                        <Col lg={2} md={4} sm={6} xs={6} className="mb-4 footer-col ">
                            <Nav className="flex-column">
                                <p className='footer-title text-white'>About Us</p>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Company Overview</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Our Mission & Values</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Careers</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Blog</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Press Releases</NavLink>
                            </Nav>
                        </Col>

                        <Col lg={2} md={4} sm={6} xs={6} className="mb-4 footer-col-2 footer-col">
                            <Nav className="flex-column">
                                <p className='footer-title text-white'>Customer Service</p>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Contact Us</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>FAQs</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Live Chat</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Cancellation Policy</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Booking Policies</NavLink>
                            </Nav>
                        </Col>

                        <Col lg={2} md={4} sm={6} xs={6} className="mb-4 footer-col">
                            <Nav className="flex-column text-white">
                                <p className='footer-title'>Explore</p>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Destinations</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Special Offers</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Last-Minute Deals</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Travel Guides</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Blog & Travel Tips</NavLink>
                            </Nav>
                        </Col>

                        <Col lg={2} md={4} sm={6} xs={6} className="mb-4 footer-col-4 footer-col">
                            <Nav className="flex-column">
                                <p className='footer-title text-white'>Support</p>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Privacy Policy</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Terms & Conditions</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Accessibillity</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Feedback & Suggestions</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Sitemap</NavLink>
                            </Nav>
                        </Col>

                        <Col lg={2} md={4} sm={6} xs={6} className="mb-4 footer-col">
                            <Nav className="flex-column">
                                <p className='footer-title text-white'>Membership</p>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Loyalty Program</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Unlock Exclusive Offers</NavLink>
                                <NavLink className="footer-link text-decoration-none text-white" to='#'>Rewards & Benefits</NavLink>
                            </Nav>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <hr className='footer-line-break'></hr>
            <Row className="w-100 m-0">
                <Col className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <p className='footer-description mb-3 mb-md-0 text-white'>
                        © 2024 Ascenda. All rights reserved.
                    </p>
                    <div className="d-flex align-items-center">
                        <img className='footer-icon' src={twitterIcon} alt="Twitter" />
                        <img className='footer-icon' src={linkdinIcon} alt="LinkedIn" />
                        <img className='footer-icon' src={whatsappIcon} alt="WhatsApp" />
                        <img className='footer-icon' src={facebookIcon} alt="Facebook" />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer