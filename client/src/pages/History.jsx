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

    const getScorePillClass = (score) => {
        if (score >= 80) return 'pill-green';
        if (score >= 60) return 'pill-yellow';
        return 'pill-red';
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner-lg"></div>
            </div>
        );
    }

    return (
        <div className="history-page">
            <h1 className="history-heading">Analysis History</h1>
            
            {error && <div className="alert-error">{error}</div>}
            
            {history.length === 0 ? (
                <div className="empty-state">
                    <FileText className="empty-state-icon" />
                    <h3 className="empty-state-title">No history found</h3>
                    <p className="empty-state-sub">You haven't analyzed any resumes yet.</p>
                    <Link to="/analyzer" className="empty-state-link">
                        Go to Analyzer &rarr;
                    </Link>
                </div>
            ) : (
                <div className="history-grid">
                    {history.map((item) => (
                        <div key={item._id} className="history-card">
                            <div className="history-card-header">
                                <div className="history-card-meta">
                                    <div className={`history-score-pill ${getScorePillClass(item.atsScore)}`}>
                                        {item.atsScore}
                                    </div>
                                    <div>
                                        <h3 className="history-file-title" title={item.filename}>
                                            {item.filename}
                                        </h3>
                                        <div className="history-date-row">
                                            <Calendar size={13} style={{ marginRight: '4px' }} />
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDelete(item._id)} 
                                    className="btn-icon-delete"
                                    title="Delete analysis"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <p className="history-summary-text">
                                {item.summary}
                            </p>
                            <Link to="/analyzer" className="history-details-btn" style={{ textDecoration: 'none' }}>
                                Analyze Another <ChevronRight size={16} />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
