import { useEffect, useState } from 'react'
import { getBookingHistory } from '../../services/bookingService'
import './bookingHistory.css'
import { useParams } from 'react-router-dom'

const BookingHistory = () => {
    const { userId } = useParams
    const [bookingData, setBookingData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const featchBookingDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getBookingHistory(userId)
                set
            }
        }
    })

    return (
        <main className='booking-history-container'>

        </main>
    )
}

export default BookingHistory