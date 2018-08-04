import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => (
    /* eslint-disable */
    <div className="Print" className="loader-wrapper">
        <div className="loader">
            <div className="roller"></div>
            <div className="roller"></div>
        </div>

        <div id="loader2" className="loader">
            <div className="roller"></div>
            <div className="roller"></div>
        </div>

        <div id="loader3" className="loader">
            <div className="roller"></div>
            <div className="roller"></div>
        </div>
    </div>
);

export default LoadingSpinner;