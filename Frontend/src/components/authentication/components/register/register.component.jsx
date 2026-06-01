import "./register.component.css"

const registerForm = () => {
    return (
        <form className="register-form">
            <p className="form-title">Register</p>
            <div className="input-container">
                <input className="input-field" placeholder="Enter full name" type="text"></input>
            </div>
            <div className="input-container">
                <input className="input-field" placeholder="Enter email" type="email"></input>
            </div>
            <div className="input-container">
                <input className="input-field" placeholder="Enter phone_number" type="number"></input>
            </div>
            <div className="input-container">
                <input className="input-field" placeholder="Enter password" type="password"></input>
                <span>
                    <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                </span>
            </div>
            <div className="input-container">
                <input className="input-field" placeholder="Confirm password" type="password"></input>
                <span>
                    <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                </span>
            </div>
            <div className="input-container">
                <input type="hidden" value="customer"></input>
            </div>
            <div className="input-container">
                <input className="input-field" placeholder="Add profile image url" type="url"></input>
            </div>
            <button className="submit" type="submit">
                Register
            </button>
            <p className="signin-link">
                Already Register?
                <a href="">Sign in</a>
            </p>
        </form>
    )
}

export default registerForm