import React from "react";
import './LogInvites.scss'

const Log = ({log}) => {

    return (
        <div className="log-container">
            <div className={`log-list ${log.length > 3 ? 'scrollable' : ''}`}>
                {log.map((message, index) => (
                    <div className="log-item" key={index}>{message}</div>
                )).reverse()}
            </div>
        </div>
    )
}

export default Log;
