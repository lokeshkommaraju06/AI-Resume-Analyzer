import { useState } from 'react';
import { UploadCloud, File, AlertCircle } from 'lucide-react';
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {!result ? (
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Analyze Your Resume</h1>
                    
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {error}
                        </div>
                    )}

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Upload Resume (PDF)</h2>
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer relative">
                            <input 
                                type="file" 
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {!file ? (
                                <div className="flex flex-col items-center">
                                    <UploadCloud className="w-12 h-12 text-slate-400 mb-4" />
                                    <p className="text-slate-600 font-medium">Click or drag and drop your PDF here</p>
                                    <p className="text-slate-400 text-sm mt-2">Maximum file size: 5MB</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="bg-blue-50 p-4 rounded-full mb-4">
                                        <File className="w-10 h-10 text-blue-600" />
                                    </div>
                                    <p className="text-slate-900 font-medium">{file.name}</p>
                                    <p className="text-slate-500 text-sm mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <p className="text-blue-600 text-sm mt-4 font-medium hover:underline">Click to change file</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Job Description</h2>
                        <textarea 
                            className="w-full border border-slate-300 rounded-xl p-4 h-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                            placeholder="Paste the job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>

                    <div className="text-center">
                        <button 
                            onClick={handleAnalyze}
                            disabled={loading}
                            className={`px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all w-full md:w-auto ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyzing Resume...
                                </span>
                            ) : 'Analyze Resume'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-8 animate-fade-in-up">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">Analysis Results</h2>
                        <button 
                            onClick={() => setResult(null)}
                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                            &larr; New Analysis
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Summary</h3>
                        <p className="text-slate-600 leading-relaxed">{result.summary}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ATSScoreCard score={result.atsScore} />
                        <StrengthCard strengths={result.strengths} />
                        <WeaknessCard weaknesses={result.weaknesses} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Missing Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {result.missingKeywords?.map((kw, i) => (
                                    <span key={i} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium border border-red-100">
                                        {kw}
                                    </span>
                                ))}
                                {!result.missingKeywords?.length && <span className="text-slate-500">None detected.</span>}
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Missing Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {result.missingSkills?.map((skill, i) => (
                                    <span key={i} className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium border border-yellow-100">
                                        {skill}
                                    </span>
                                ))}
                                {!result.missingSkills?.length && <span className="text-slate-500">None detected.</span>}
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                        <h3 className="text-xl font-semibold text-slate-900 mb-4">Improvement Suggestions</h3>
                        <ul className="space-y-4">
                            {result.improvements?.map((imp, i) => (
                                <li key={i} className="flex items-start">
                                    <div className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 shrink-0 mt-0.5">{i + 1}</div>
                                    <span className="text-slate-700">{imp}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Overall Feedback</h3>
                        <p className="text-slate-600 leading-relaxed italic">"{result.overallFeedback}"</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analyzer;
