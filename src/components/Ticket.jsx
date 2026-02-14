/**
 * Ticket.jsx
 * ----------
 * React functional component — pixel-perfect replica of the
 * TechTantra 1.0 HTML ticket.
 *
 * USAGE:
 *   import Ticket from './Ticket';
 *
 *   <Ticket
 *     venue="SVERI's COE (Polytechnic), Pandharpur"
 *     date="20th - 21st February 2026"
 *     track="Innovation & Technology"
 *     tokenNo="TT20260158"
 *     teamName="Code Warriors"
 *     teamLeader="Sanskruti Yadav"
 *     email="leader@email.com"
 *   />
 *
 * ASSETS:
 *   Requires `logo.jpeg` in the public/ folder (already present).
 *
 * FONTS:
 *   Requires Google Fonts (Orbitron + Poppins).
 *   The <link> is loaded in index.html or via the useEffect below.
 */

import { useEffect } from 'react';
import './Ticket.css';

const GOOGLE_FONTS_HREF =
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=Poppins:wght@300;400;600;700&display=swap';

export default function Ticket({
    venue = "SVERI's COE (Polytechnic), Pandharpur",
    date = '20th - 21st February 2026',
    track = 'Innovation & Technology',
    tokenNo = 'TT20260158',
    teamName = 'Code Warriors',
    teamLeader = 'Sanskruti Yadav',
    email = 'leader@email.com',
}) {
    /* Load Google Fonts once (idempotent) */
    useEffect(() => {
        if (!document.querySelector(`link[href="${GOOGLE_FONTS_HREF}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = GOOGLE_FONTS_HREF;
            document.head.appendChild(link);
        }
    }, []);

    return (
        <div className="ticket-page">
            <div className="ticket">
                {/* HEADER */}
                <div className="header">
                    <div className="title-wrapper">
                        <img src="/logo.jpeg" alt="TechTantra Logo" className="logo" />
                        <div>
                            <div className="event-title">TECHTANTRA 1.0</div>
                            <div className="subtitle">Hack The Future</div>
                        </div>
                    </div>
                </div>

                {/* CONTENT GRID */}
                <div className="content">
                    {/* LEFT */}
                    <div className="left">
                        <div className="info">
                            <span className="label">Venue:</span> {venue}
                        </div>
                        <div className="info">
                            <span className="label">Date:</span> {date}
                        </div>
                        <div className="info">
                            <span className="label">Track:</span> {track}
                        </div>

                        <div className="token">TOKEN NO : {tokenNo}</div>
                    </div>

                    {/* RIGHT */}
                    <div className="right">
                        <div className="field">
                            <label>Team Name</label>
                            <span>{teamName}</span>
                        </div>

                        <div className="field">
                            <label>Team Leader</label>
                            <span>{teamLeader}</span>
                        </div>

                        <div className="field">
                            <label>Email</label>
                            <span>{email}</span>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="footer">
                    Your registration is confirmed. We look forward to your innovation!
                </div>
            </div>
        </div>
    );
}
