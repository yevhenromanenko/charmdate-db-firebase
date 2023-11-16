import React from "react";
import {FaVideo} from "react-icons/fa";

const Checkbox = ({ checkCamshareInvite, onCamshareInviteChange }) => {
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
                    Розсилати <FaVideo style={{color: '#ececf1' }} className="video-icon" /> Camshare інвайти
                </span>
            </label>
        </div>
    );
};
export default Checkbox;
