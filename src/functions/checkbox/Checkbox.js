import React from "react";
// import {FaVideo} from "react-icons/fa";

const Checkbox = ({ checkCamshareInvite, onCamshareInviteChange, text }) => {
    return (
        <div style={{display: 'inline'}} className="checkbox-wrapper">
            <label>
                <input
                    className={'checkbox-camshare-invite'}
                    type="checkbox"
                    id="indeterminate-camshare-checkbox"
                    checked={checkCamshareInvite}
                    onChange={onCamshareInviteChange}
                />
                <span className={'check-camshare'}>
                      {text}
                </span>
            </label>
        </div>
    );
};
export default Checkbox;
