export const ATSScoreCard = ({ score }) => {
    const getScoreClass = (s) => {
        if (s >= 80) return 'score-green';
        if (s >= 60) return 'score-yellow';
        return 'score-red';
    };

    return (
        <div className="card">
            <div className="score-card-content">
                <h3 className="card-title">ATS Match Score</h3>
                <div className={`score-display-number ${getScoreClass(score)}`}>
                    {score}%
                </div>
                <p className="score-feedback-text">
                    {score >= 80 ? 'Excellent match! You are highly likely to pass the ATS.' : 
                     score >= 60 ? 'Good match. Consider adding more targeted keywords.' : 
                     'Low match. Significant improvements needed to pass the ATS.'}
                </p>
            </div>
        </div>
    );
};
