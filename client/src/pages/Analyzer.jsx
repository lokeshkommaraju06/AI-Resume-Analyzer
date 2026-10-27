import { useState } from 'react';
import { UploadCloud, File, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeResume } from '../services/api';
import { ATSScoreCard } from '../components/ATSScoreCard';
import { StrengthCard, WeaknessCard } from '../components/Cards';

const Analyzer = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                setError('Please upload a valid PDF file.');
                setFile(null);
            } else if (selectedFile.size > 5 * 1024 * 1024) {
                setError('File size exceeds 5MB limit.');
                setFile(null);
            } else {
                setError('');
                setFile(selectedFile);
            }
        }
    };

    const handleAnalyze = async () => {
        if (!file) {
            setError('Please upload a resume first.');
            return;
        }
        if (!jobDescription.trim()) {
            setError('Please provide a job description.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobDescription', jobDescription);

        try {
            setLoading(true);
            setError('');
            const response = await analyzeResume(formData);
            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during analysis. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="analyzer-page">
            {!result ? (
                <div className="container-narrow">
                    <h1 className="page-header-title">Analyze Your Resume</h1>
                    
                    {error && (
                        <div className="alert-error">
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="card">
                        <h2 className="card-title">1. Upload Resume (PDF)</h2>
                        <div className="dropzone">
                            <input 
                                type="file" 
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="dropzone-file-input"
                            />
                            {!file ? (
                                <div>
                                    <UploadCloud className="dropzone-icon" />
                                    <p className="dropzone-primary-text">Click or drag and drop your PDF here</p>
                                    <p className="dropzone-sub-text">Maximum file size: 5MB</p>
                                </div>
                            ) : (
                                <div className="file-selected-box">
                                    <div className="file-icon-badge">
                                        <File size={36} />
                                    </div>
                                    <p className="file-name-text">{file.name}</p>
                                    <p className="file-size-text">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <p className="file-change-text">Click to change file</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="card-title">2. Job Description</h2>
                        <textarea 
                            className="textarea-job"
                            placeholder="Paste the job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>

                    <div className="btn-submit-container">
                        <button 
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="btn-analyze"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="spinner" size={20} />
                                    <span>Analyzing Resume...</span>
                                </>
                            ) : 'Analyze Resume'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="results-header-bar">
                        <h2 className="results-heading">Analysis Results</h2>
                        <button 
                            onClick={() => setResult(null)}
                            className="btn-new-analysis"
                        >
                            &larr; New Analysis
                        </button>
                    </div>

                    <div className="card">
                        <h3 className="card-title">Summary</h3>
                        <p style={{ color: 'var(--text-sub)', lineHeight: '1.6' }}>{result.summary}</p>
                    </div>

                    <div className="grid-cards-3">
                        <ATSScoreCard score={result.atsScore} />
                        <StrengthCard strengths={result.strengths} />
                        <WeaknessCard weaknesses={result.weaknesses} />
                    </div>

                    <div className="grid-cards-2">
                        <div className="card">
                            <h3 className="card-title">Missing Keywords</h3>
                            <div className="tag-container">
                                {result.missingKeywords?.map((kw, i) => (
                                    <span key={i} className="tag-badge tag-red">
                                        {kw}
                                    </span>
                                ))}
                                {!result.missingKeywords?.length && <span style={{ color: 'var(--text-muted)' }}>None detected.</span>}
                            </div>
                        </div>
                        <div className="card">
                            <h3 className="card-title">Missing Skills</h3>
                            <div className="tag-container">
                                {result.missingSkills?.map((skill, i) => (
                                    <span key={i} className="tag-badge tag-yellow">
                                        {skill}
                                    </span>
                                ))}
                                {!result.missingSkills?.length && <span style={{ color: 'var(--text-muted)' }}>None detected.</span>}
                            </div>
                        </div>
                    </div>

                    <div className="improvements-box">
                        <h3 className="improvements-title">Improvement Suggestions</h3>
                        <div>
                            {result.improvements?.map((imp, i) => (
                                <div key={i} className="improvement-item">
                                    <div className="improvement-badge">{i + 1}</div>
                                    <div className="improvement-text">{imp}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="card-title">Overall Feedback</h3>
                        <p className="feedback-quote">"{result.overallFeedback}"</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analyzer;
