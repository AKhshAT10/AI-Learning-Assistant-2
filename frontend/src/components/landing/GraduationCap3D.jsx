import React from 'react';
import './cap.css';

/**
 * A pure-CSS 3D graduation cap. Renders a real preserve-3d scene that
 * floats, sways so the perspective shifts, and swings its tassel.
 */
const GraduationCap3D = () => {
    return (
        <div className='cap-scene' aria-hidden='true'>
            <div className='cap-shadow' />
            <div className='cap-bob'>
                <div className='cap-tilt'>
                    <div className='cap-sway'>
                        <div className='cap-base' />
                        <div className='cap-board'>
                            <div className='cap-board__depth' />
                            <div className='cap-board__face' />
                        </div>
                        <div className='cap-button' />
                        <div className='cap-tassel'>
                            <div className='cap-tassel__cord' />
                            <div className='cap-tassel__bell' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraduationCap3D;
