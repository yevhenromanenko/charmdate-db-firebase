import React, {useEffect, useState} from "react";
import axios from "axios";
const InfoUserInLetter = ({user, replyId}) => {

    console.log(replyId, 'replyId')

    const [ladyId, setLadyId] = useState(null)
    const [sign, setSign] = useState(null)


    useEffect(() => {
        const fetch = async () => {
            try {
                if (replyId) {
                    const response = await axios.get(`https://www.charmdate.com/clagt/mw_emf_agt.php?messageid=${replyId}`);
                    const data = response.data;

                    var parser = new DOMParser();
                    var doc = parser.parseFromString(data, 'text/html');

                    var aElement = doc.querySelector('a[href*="history/index.php?"]');
                    var hrefAttribute = aElement.getAttribute('href');

                    var womanidMatch = hrefAttribute.match(/womanid=([^&]+)/);
                    var signMatch = hrefAttribute.match(/sign=([^'"]+)/);

                    var womanid = womanidMatch ? womanidMatch[1] : null;
                    var sign = signMatch ? signMatch[1] : null;

                    setLadyId(womanid)
                    setSign(sign);
                } else {
                    setLadyId(null)
                    setSign(null);
                }

            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        }
        fetch();
    }, [ladyId, replyId]);

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
                                    {replyId && (
                                        <>
                                            {' '}-{' '}
                                            <a
                                                style={{ color: 'peru' }}
                                                href={`https://www.charmdate.com/clagt/history/index.php?womanid=${ladyId}&manid=${item.id}&sign=${sign}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ded_id_in_log"
                                            >
                                                історія
                                            </a>
                                        </>
                                    )}

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
