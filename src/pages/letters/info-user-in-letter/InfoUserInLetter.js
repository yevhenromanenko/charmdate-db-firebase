import React from "react";
const InfoUserInLetter = ({user}) => {
    return (
        <>
            {user.length > 0 ? (
                user.map((item) => (
                    <>
                        <div style={{ display: 'inline-flex' }}>
                            <div className="img_in_log">
                                <img
                                    src={item.photo === '' ? 'https://e7.pngegg.com/pngimages/987/270/png-clipart-computer-icons-old-age-woman-grandparent-others-logo-head.png' : item.photo}
                                    className="ava_in_log"
                                    alt=""
                                />
                            </div>
                            <div className="msg_in_log">
                                <div>
                                    {item.name} -{' '}
                                    <a
                                        style={{ color: 'peru' }}
                                        href={`https://www.charmdate.com/clagt/admire/men_profile.php?manid=${item.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ded_id_in_log"
                                    >
                                        {item.id}
                                    </a>
                                </div>
                                <div className="country_in_log">з {item.country} - {item.age} років</div>
                            </div>
                        </div>
                    </>
                ))
            ) : null}
        </>
    )
}

export default InfoUserInLetter;
