import React from 'react';
import "../styles/droneList.css";

function DotList() {
    return (
        <div>
            <ull>
                <lii className="red">
                    <div className="onHover">Available</div>
                </lii>
                <lii className="green">
                    <div className="onHover">Available</div>
                </lii>
                <lii className="orange">
                    <div className="onHover">Available</div>
                </lii>
                <lii className="dark">
                    <div className="onHover">Unavailable</div>
                </lii>
                <lii className="dark">
                    <div className="onHover">Unavailable</div>
                </lii>
            </ull>
        </div>
    );
}

export default DotList;