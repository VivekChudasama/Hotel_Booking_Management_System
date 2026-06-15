import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getHotelDetails } from '../../services/hotelService';
import './hotelDetailsPage.css'

const HotelDetailsPage = () => {

  const { hotelId } = useParams();
  const [hotelData, setHotelData] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelData = await getHotelDetails(hotelId);
        setHotelData(hotelData);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    fetchHotelDetails();
  }, [hotelId])


  const getHoteldata = (hotelData) => {
    if (!hotelData) {
      return <p>Loading hotel details...</p>;
    }


    return (
      <div className='hotel-details'>
        <h2>{hotelData.name}</h2>
        <p>{hotelData.description}</p>
        <p>Location: {hotelData.location}</p>
        <p>Price per night: ${hotelData.pricePerNight}</p>
      </div>
    );
  }

}

export default HotelDetailsPage