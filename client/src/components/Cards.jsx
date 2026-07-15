import { CheckCircle, XCircle } from 'lucide-react';

export const StrengthCard = ({ strengths }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Strengths
        </h3>
        <ul className="space-y-3">
            {strengths?.map((item, index) => (
                <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span className="text-slate-700 text-sm">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const WeaknessCard = ({ weaknesses }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-2" /> Weaknesses
        </h3>
        <ul className="space-y-3">
            {weaknesses?.map((item, index) => (
                <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span className="text-slate-700 text-sm">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);
