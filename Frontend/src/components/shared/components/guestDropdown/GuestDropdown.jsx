import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './GuestDropdown.css';

const GuestDropdown = ({ rooms, adults, children, onRoomsChange, onAdultsChange, onChildrenChange, isSearchPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleIncrement = (type) => {
        if (type === 'rooms') onRoomsChange(parseInt(rooms || 1) + 1);
        if (type === 'adults') onAdultsChange(parseInt(adults || 1) + 1);
        if (type === 'children') onChildrenChange(parseInt(children || 0) + 1);
    };

    const handleDecrement = (type) => {
        if (type === 'rooms' && rooms > 1) onRoomsChange(parseInt(rooms) - 1);
        if (type === 'adults' && adults > 1) onAdultsChange(parseInt(adults) - 1);
        if (type === 'children' && children > 0) onChildrenChange(parseInt(children) - 1);
    };

    const { pathname } = useLocation();

    return (
        <div className="guest-dropdown-container position-relative" ref={dropdownRef}>
            <div className={`d-flex align-items-center justify-content-between guest-dropdown-trigger  ${isSearchPage ? 'search-filter-input-text fw-bold' : 'filter-input-text'}`} onClick={() => setIsOpen(!isOpen)}>
                <span className="text-truncate">
                    {rooms} Room | {adults} Adult {pathname === '/' ? <span>, {children} Child</span> : ''}
                </span>
            </div>
            {isOpen && (
                <div className="guest-dropdown-menu position-absolute bg-white shadow">
                    <div className="guest-dropdown-item d-flex justify-content-between align-items-center">
                        <span>Rooms</span>
                        <div className="guest-dropdown-controls d-flex align-items-center">
                            <button type="button" className="guest-btn d-flex justify-content-center align-items-center bg-white" onClick={() => handleDecrement('rooms')} disabled={rooms <= 1}>-</button>
                            <span className="guest-val">{rooms}</span>
                            <button type="button" className="guest-btn d-flex justify-content-center align-items-center bg-white" onClick={() => handleIncrement('rooms')}>+</button>
                        </div>
                    </div>
                    <div className="guest-dropdown-item d-flex justify-content-between align-items-center">
                        <span>Adults</span>
                        <div className="guest-dropdown-controls d-flex align-items-center">
                            <button type="button" className="guest-btn d-flex justify-content-center align-items-center bg-white" onClick={() => handleDecrement('adults')} disabled={adults <= 1}>-</button>
                            <span className="guest-val">{adults}</span>
                            <button type="button" className="guest-btn d-flex justify-content-center align-items-center bg-white" onClick={() => handleIncrement('adults')}>+</button>
                        </div>
                    </div>
                    <div className="guest-dropdown-item d-flex justify-content-between align-items-center">
                        <span>Children</span>
                        <div className="guest-dropdown-controls d-flex align-items-center">
                            <button type="button" className="guest-btn d-flex justify-content-center align-items-center bg-white" onClick={() => handleDecrement('children')} disabled={children <= 0}>-</button>
                            <span className="guest-val">{children}</span>
                            <button type="button" className="guest-btn d-flex justify-content-center align-items-center bg-white" onClick={() => handleIncrement('children')}>+</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuestDropdown;
