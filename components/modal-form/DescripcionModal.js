import { useState, useEffect } from 'react';
import styles from './modal.module.css';
import { CgClose } from 'react-icons/cg';

export default function DescripcionModal({ isOpen, onClose, onConfirm, currentValue }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Cuando el modal se abre en modo de edición, inicializa el estado con el valor actual
    if (isOpen && currentValue) {
      setInputValue(currentValue);
    } else {
      setInputValue(''); // Si no está en modo de edición o no hay valor actual, deja el textarea en blanco
    }
  }, [isOpen, currentValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <CgClose />
        </button>
        <h3 className={styles.textForm}>agregar descripción del catálogo</h3>
        <p className={styles.p}>agregar descripción</p>
        <textarea className={styles.labelImage} type="text" value={inputValue} onChange={handleChange} />
        <button className={styles.submitButton} onClick={() => onConfirm(inputValue)}>
          {currentValue ? 'Editar' : 'Agregar'}
        </button>
      </div>
    </div>
  );
}
