// No se realizaron cambios en este archivo
import { useState } from 'react';
import styles from './modal.module.css';
import { CgClose } from "react-icons/cg";
export default function BannerModal({ isOpen, onClose, onConfirm }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    const file = e.target.files[0];
    setInputValue(file);
  };

  return (
    <div className={styles.overlay} >
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <CgClose />
        </button>
        <h3 className={styles.textForm}>agregar banner del catalogo</h3>
        <p className={styles.p}>agregar imagen</p>
        <label className={styles.labelImage} >
          <input className={styles.inputImage} type="file"  onChange={handleChange} />
          {inputValue ? inputValue.name : 'Seleccionar imagen'}
        </label>
        <button className={styles.submitButton} onClick={() => onConfirm(inputValue)}>aceptar</button>
      </div>
    </div>
  );
}