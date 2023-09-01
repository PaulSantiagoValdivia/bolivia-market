import { useState } from 'react';
import styles from './modal.module.css';
import { CgClose } from 'react-icons/cg';

export default function BannerModal({ isOpen, onClose, onConfirm, currentValue }) {
  const [inputValue, setInputValue] = useState(currentValue);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const imageSelect = (event) => {
    const selectedFile = event.target.files[0];
    
    setInputValue(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <CgClose />
        </button>
        <h3 className={styles.textForm}>agregar banner del catalogo</h3>
        <p className={styles.p}>agregar imagen</p>
        <label className={styles.labelImage}>
          <input className={styles.inputImage} type="file" onChange={imageSelect} />
          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="Preview"
              className={styles.imagePreview}
            />
          )}
          {inputValue ? '' : 'Seleccionar imagen'}
        </label>
        <button className={styles.submitButton} onClick={() => onConfirm(inputValue)}>
  {currentValue ? "Editar" : "Agregar"}
</button>
      </div>
    </div>
  );
}
