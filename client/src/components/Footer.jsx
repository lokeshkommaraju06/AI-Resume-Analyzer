const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <span className="text-white font-bold text-xl tracking-tight flex items-center space-x-2">
                        <span>AI Resume Analyzer</span>
                    </span>
                    <p className="mt-2 text-sm max-w-sm">
                        Land your dream job with AI-powered resume analysis. Get actionable feedback and improve your ATS score in seconds.
                    </p>
                </div>
                <div className="text-sm">
                    &copy; {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
