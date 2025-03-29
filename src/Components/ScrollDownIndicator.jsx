import React from 'react';

const ScrollDownIndicator = ({ targetRef }) => {
    const scrollToTarget = () => {
        if (targetRef && targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center my-4 cursor-pointer group"
            onClick={scrollToTarget}
        >
            <div className="text-slate-400 text-sm font-light mb-2 group-hover:text-white transition-colors duration-300">
                Aşağıya doğru kaydırın
            </div>
            <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center group-hover:border-white transition-colors duration-300">
                <div className="w-1.5 h-3 bg-slate-400 rounded-full mt-2 animate-bounce group-hover:bg-white transition-colors duration-300"></div>
            </div>
        </div>
    );
};

export default ScrollDownIndicator;
