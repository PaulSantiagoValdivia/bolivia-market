// No se realizaron cambios en este archivo
import { useState } from 'react';
import styles from './modal.module.css';
import { CgClose } from "react-icons/cg";
export default function TituloCatalogoModal({ isOpen, onClose, onConfirm }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.overlay} >
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <CgClose />
        </button>
        <h3 className={styles.textForm}>agregar imagen de Portada</h3>
        <p className={styles.p}>agregar titulo</p>
        <textarea  className={styles.labelImage}  type="text" value={inputValue} onChange={handleChange} />
        <button className={styles.submitButton} onClick={() => onConfirm(inputValue)}>aceptar</button>
      </div>
    </div>
  );
}