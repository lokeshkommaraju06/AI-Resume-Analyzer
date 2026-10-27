import { Link } from 'react-router-dom';
import { Zap, Shield, Target } from 'lucide-react';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container-narrow">
                    <h1 className="hero-title">
                        Beat the ATS with <span className="hero-highlight">AI Precision</span>
                    </h1>
                    <p className="hero-subtitle">
                        Upload your resume, paste a job description, and get instant, AI-driven feedback to optimize your application and land more interviews.
                    </p>
                    <div>
                        <Link to="/analyzer" className="btn-hero">
                            Analyze My Resume
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why use AI Resume Analyzer?</h2>
                    <div className="features-grid">
                        <div className="feature-box">
                            <div className="feature-icon-wrapper icon-blue">
                                <Target size={30} />
                            </div>
                            <h3 className="feature-title">Targeted Feedback</h3>
                            <p className="feature-description">Compare your resume directly against the job description to find missing keywords and skills.</p>
                        </div>
                        <div className="feature-box">
                            <div className="feature-icon-wrapper icon-indigo">
                                <Zap size={30} />
                            </div>
                            <h3 className="feature-title">Instant AI Analysis</h3>
                            <p className="feature-description">Get an ATS score and comprehensive improvement suggestions in seconds using advanced AI models.</p>
                        </div>
                        <div className="feature-box">
                            <div className="feature-icon-wrapper icon-green">
                                <Shield size={30} />
                            </div>
                            <h3 className="feature-title">Privacy First</h3>
                            <p className="feature-description">Your data is safe. We extract the text, analyze it, and immediately delete your PDF file.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
