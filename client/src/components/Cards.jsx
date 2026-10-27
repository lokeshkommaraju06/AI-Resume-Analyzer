import { CheckCircle, XCircle } from 'lucide-react';

export const StrengthCard = ({ strengths }) => (
    <div className="card">
        <h3 className="card-title">
            <CheckCircle size={20} color="#16a34a" /> Strengths
        </h3>
        <ul className="checklist">
            {strengths?.map((item, index) => (
                <li key={index} className="checklist-item">
                    <span className="bullet-green">•</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const WeaknessCard = ({ weaknesses }) => (
    <div className="card">
        <h3 className="card-title">
            <XCircle size={20} color="#dc2626" /> Weaknesses
        </h3>
        <ul className="checklist">
            {weaknesses?.map((item, index) => (
                <li key={index} className="checklist-item">
                    <span className="bullet-red">•</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);
