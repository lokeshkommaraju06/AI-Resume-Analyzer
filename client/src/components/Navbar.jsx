import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <FileText className="navbar-logo-icon" />
                    <span>AI Resume Analyzer</span>
                </Link>
                <div className="navbar-menu">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/analyzer" className="nav-link">Analyzer</Link>
                    <Link to="/history" className="nav-link">History</Link>
                    <Link to="/analyzer" className="nav-btn">Get Started</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
