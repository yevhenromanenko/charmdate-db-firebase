import React from "react";
import '../log/LogInvites.scss'

const LogInvites = ({randomPersonalInvite, userExists, randomInvite, randomUser}) => {
    const photoDeda = randomUser.photo === '' ? null : randomUser.photo;
    const nullPhoto = 'https://e7.pngegg.com/pngimages/987/270/png-clipart-computer-icons-old-age-woman-grandparent-others-logo-head.png'
    const srcPhotoDeda = photoDeda === null ? nullPhoto : photoDeda;
    const profileLink = `https://www.charmdate.com/livechat/lady/history/profile.php?manid=${randomUser.id}`;
    const invite = randomInvite.msg;
    const firstChar = invite[0];

    return (
        <>
            <div className="img_in_log">
                <img src={srcPhotoDeda} className="ava_in_log" alt="" />
            </div>
            <div className="msg_in_log">
                <div className="invite_text_in_log">{userExists ? randomPersonalInvite : firstChar.match(/[a-z]/) ? `${randomUser.name},${invite}` : `${invite}`}</div>
                <div className="invite_info_in_log">
                    {randomUser.name} -{' '}
                    <a
                        style={{color: 'peru', display: 'inline'}}
                        href={profileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ded_id_in_log"
                    >
                        {randomUser.id}
                    </a>
                    <span style={{display: 'inline'}} className="country_in_log"> {randomUser.country}</span>
                </div>
            </div>
        </>
    );
};

export default LogInvites;
