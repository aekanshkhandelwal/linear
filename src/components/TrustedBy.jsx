import React from 'react';
import './TrustedBy.css';

const TrustedBy = () => {
    const logos = [
        "OpenAI", "Cash App", "scale", "ramp", "Vercel", "COINBASE", "BOOM", "CURSOR"
    ];

    return (
        <section className="trusted-section">
            <div className="container">
                <h2 className="trusted-title">
                    Powering the world's best product teams.<br />
                    From next-gen startups to established enterprises.
                </h2>

                <div className="logo-wall">
                    {logos.map((logo, idx) => (
                        <div className={`logo-item logo-${idx}`} key={idx}>
                            {logo}
                        </div>
                    ))}
                    <button className="meet-customers-btn">
                        Meet our customers
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
