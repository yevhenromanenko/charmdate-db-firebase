import React from "react";

const CheckboxAllPhoto = ({ checkAllPrivatePhoto, onPrivatePhotoChange }) => {
    return (
        <div style={{color: '#ececf1'}} className="checkbox-wrapper">
            <label>
                <input
                    className={'checkbox-all-photo-invite'}
                    type="checkbox"
                    id="indeterminate-all-photo-checkbox"
                    checked={checkAllPrivatePhoto}
                    onChange={onPrivatePhotoChange}
                />
                <span className={'check-all-photo'}>
                    Обрати всі фото для масової розсилки - програма обере ті приватні фото, які ви ще не відправляли чоловіку!
                </span>
            </label>
        </div>
    );
};
export default CheckboxAllPhoto;
