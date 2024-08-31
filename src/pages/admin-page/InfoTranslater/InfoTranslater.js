import React, {useEffect, useState} from "react";
import '../AdminPage.css'
import {FaRegSave, FaRegWindowClose} from "react-icons/fa";

const InfoTranslater = ({ladyId, hidden, toggleHiddenStatus}) => {

    const [editing, setEditing] = useState(false);
    const [inputName, setInputName] = useState('');
    const [comment, setComment] = useState('');
    const [storedName, setStoredName] = useState('');
    const [storedComment, setStoredComment] = useState('');
    const [showFullComment, setShowFullComment] = useState(false);

    useEffect(() => {
        // Загрузка сохраненного имени и комментария из локального хранилища
        const storedName = localStorage.getItem(`profileName-${ladyId}`) || 'no name';
        const storedComment = localStorage.getItem(`profileComment-${ladyId}`) || '';
        setStoredName(storedName);
        setStoredComment(storedComment);
    }, [ladyId]);

    const handleEditClick = () => {
        setInputName(storedName);
        setComment(storedComment);

        setEditing(true);
    };

    const handleSaveClick = () => {
        // Сохранение имени и комментария в локальное хранилище
        localStorage.setItem(`profileName-${ladyId}`, inputName);
        localStorage.setItem(`profileComment-${ladyId}`, comment);
        setStoredName(inputName);
        setStoredComment(comment);
        setEditing(false);
    };

    const handleInputChange = (e) => {
        setInputName(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCancelClick = () => {
        setEditing(false);
    };

    const toggleFullComment = () => {
        setShowFullComment(!showFullComment);
    };

    return (
        <div>
            <div>
                {editing ? (
                    <div>
                        <input className={'input-name'} type="text" value={inputName} onChange={handleInputChange} />
                        <br/>
                        <textarea className={'input-comment'} value={comment} onChange={handleCommentChange} />
                        <br/>
                        <label>
                            <input
                                type="checkbox"
                                checked={hidden}
                                onChange={() => toggleHiddenStatus(ladyId)}
                            />
                            Сховати профайл
                        </label>
                        <br/>
                        <button className={'show-hide-button'} onClick={handleSaveClick}><FaRegSave /></button>
                        <button style={{marginLeft: '3px'}} className={'show-hide-button'} onClick={handleCancelClick}><FaRegWindowClose /></button>
                    </div>
                ) : (
                    <>
                        <div className={'info-translater'} onClick={handleEditClick}>
                        <strong style={{fontSize: '14px'}}>{storedName}</strong>
                        <br />
                        {storedComment.length > 30 ? (
                            <>
                                <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                    {showFullComment ? storedComment : `${storedComment.substring(0, 30)}`}
                                    <a onClick={toggleFullComment}>
                                        {showFullComment ? '..⬅' : '...'}
                                    </a>
                                </div>
                            </>
                        ) : (
                            `${storedComment}`
                        )}
                        {/*<button style={{marginLeft: '5px', marginTop: '0'}} className={'show-hide-button'} onClick={handleEditClick}>Редагувати</button>*/}
                        </div>
                    </>
                )}
            </div>
        </div>
    );

}

export default InfoTranslater;
