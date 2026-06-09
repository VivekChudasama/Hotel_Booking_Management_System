import { Link } from 'react-router-dom';
import './error404.css'

const ErrorRoute = () => {
    return (
        <div className="PageNotFound d-flex flex-column justify-content-center align-items-center">
            <p>Page Not Found </p>
            <button className='pageNotFound-button'>Home
                <Link to="/" className="text-decoration-none " />
            </button>
        </div>
    );
}

export default ErrorRoute