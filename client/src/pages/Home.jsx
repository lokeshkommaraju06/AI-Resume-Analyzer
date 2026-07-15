import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield, Target } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8 text-center flex-grow flex flex-col justify-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Beat the ATS with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI Precision</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                        Upload your resume, paste a job description, and get instant, AI-driven feedback to optimize your application and land more interviews.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/analyzer" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-1">
                            Analyze My Resume
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Why use AI Resume Analyzer?</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Target className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Targeted Feedback</h3>
                            <p className="text-slate-600">Compare your resume directly against the job description to find missing keywords and skills.</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Zap className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Instant AI Analysis</h3>
                            <p className="text-slate-600">Get an ATS score and comprehensive improvement suggestions in seconds using advanced AI models.</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Shield className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Privacy First</h3>
                            <p className="text-slate-600">Your data is safe. We extract the text, analyze it, and immediately delete your PDF file.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
