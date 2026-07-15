export const ATSScoreCard = ({ score }) => {
    const getColor = (s) => {
        if (s >= 80) return 'text-green-600';
        if (s >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center h-full">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">ATS Match Score</h3>
            <div className={`text-6xl font-extrabold ${getColor(score)}`}>
                {score}%
            </div>
            <p className="text-slate-500 mt-4 text-center text-sm">
                {score >= 80 ? 'Excellent match! You are highly likely to pass the ATS.' : 
                 score >= 60 ? 'Good match. Consider adding more targeted keywords.' : 
                 'Low match. Significant improvements needed to pass the ATS.'}
            </p>
        </div>
    );
};
