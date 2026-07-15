import { useState, useEffect } from 'react';
import { getHistory, deleteHistoryById } from '../services/api';
import { Trash2, FileText, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const data = await getHistory();
            setHistory(data);
        } catch (err) {
            setError('Failed to load history.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this analysis?')) return;
        try {
            await deleteHistoryById(id);
            setHistory(history.filter(item => item._id !== id));
        } catch (err) {
            alert('Failed to delete.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Analysis History</h1>
            
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}
            
            {history.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <FileText className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900">No history found</h3>
                    <p className="text-slate-500 mt-2">You haven't analyzed any resumes yet.</p>
                    <Link to="/analyzer" className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium">
                        Go to Analyzer &rarr;
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {history.map((item) => (
                        <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow relative group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                                        item.atsScore >= 80 ? 'bg-green-100 text-green-700' :
                                        item.atsScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        {item.atsScore}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 truncate w-40" title={item.filename}>
                                            {item.filename}
                                        </h3>
                                        <div className="flex items-center text-xs text-slate-500 mt-1">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(item._id)} className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                                {item.summary}
                            </p>
                            {/* Note: In a complete app, this could link to a detailed view of the history item */}
                            <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-blue-600 font-medium rounded-lg text-sm flex items-center justify-center transition-colors">
                                View Details <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
