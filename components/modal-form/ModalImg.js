import React, { useState } from 'react';
import styles from './modal.module.css';

const ModalImg = ({ onClose, onSubmit, title, field, value, onChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedImage);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.textForm} >imagen de portada</p>
        <form onSubmit={handleSubmit}>
          <p className={styles.p}>agregar imagen</p>
        <label className={styles.labelImage} >
        <input className={styles.inputImage} type="file"   onChange={handleImageChange} />
        {selectedImage ? selectedImage.name : 'dale click para agregar'}
        </label>
        </form>
        <button className={styles.closeButton} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalImg;

