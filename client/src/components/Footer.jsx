const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div>
                    <div className="footer-brand">AI Resume Analyzer</div>
                    <p className="footer-desc">
                        Land your dream job with AI-powered resume analysis. Get actionable feedback and improve your ATS score in seconds.
                    </p>
                </div>
                <div className="footer-copy">
                    &copy; {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
