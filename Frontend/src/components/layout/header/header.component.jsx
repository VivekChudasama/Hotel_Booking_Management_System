import "./header.component.css"

const header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="#"><img src="" className="nav-logo" loading="eager"></img>
                </a>
                <div>
                    <ul className="navbar-items">
                        <li className="nav-item">
                            <a href="">HOME</a>
                        </li>
                        <li className="nav-item">
                            <a href="">HOTELS</a>
                        </li>
                        <li className="nav-item">
                            <a href="">BOOKINGS</a>
                        </li>
                    </ul>
                </div>
                <button>Register</button>
                <button>Sign in</button>
            </nav>
        </header>
    )
}

export default header