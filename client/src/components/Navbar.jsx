import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <span className="font-bold text-xl text-slate-900 tracking-tight">AI Resume Analyzer</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Home</Link>
                        <Link to="/analyzer" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Analyzer</Link>
                        <Link to="/history" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">History</Link>
                        <Link to="/analyzer" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
