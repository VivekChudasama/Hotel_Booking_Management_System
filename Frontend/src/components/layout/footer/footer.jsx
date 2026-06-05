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
            <Row>
                <Col>
                    <Stack>
                        <img className='footer-logo' src={logo} alt='logo' loading="lazy">
                        </img>
                    </Stack>
                </Col>

                <Col>
                    <Nav className="flex-column">
                        <p className='footer-title text-white'>About Us</p>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Company Overview</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Our Mission & Values</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Careers</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Blog</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Press Releases</NavLink>
                    </Nav>
                </Col>

                <Col>
                    <Nav className="flex-column">
                        <p className='footer-title text-white'>Customer Service</p>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Contact Us</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>FAQs</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Live Chat</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Cancellation Policy</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Booking Policies</NavLink>
                    </Nav>
                </Col>

                <Col>
                    <Nav className="flex-column">
                        <p className='footer-title text-white'>Explore</p>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Destinations</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Special Offers</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Last-Minute Deals</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Travel Guides</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Blog & Travel Tips</NavLink>
                    </Nav>
                </Col>

                <Col>
                    <Nav className="flex-column">
                        <p className='footer-title text-white'>Support</p>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Privacy Policy</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Terms & Conditions</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Accessibillity</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Feedback & Suggestions</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Sitemap</NavLink>
                    </Nav>
                </Col>

                <Col>
                    <Nav className="flex-column">
                        <p className='footer-title text-white'>Membership</p>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Loyalty Program</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Unlock Exclusive Offers</NavLink>
                        <NavLink className="footer-link text-white text-decoration-none" to='#'>Rewards & Benefits</NavLink>
                    </Nav>
                </Col>
            </Row>
            <hr className='footer-line-break'></hr>
            <Row>
                <Col className="d-flex justify-content-between">
                    <p className='footer-description text-white'>
                        © 2024 Ascenda. All rights reserved.
                    </p>
                    <div>
                        <img className='footer-icon' src={twitterIcon}></img>
                        <img className='footer-icon' src={linkdinIcon}></img>
                        <img className='footer-icon' src={whatsappIcon}></img>
                        <img className='footer-icon' src={facebookIcon}></img>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer