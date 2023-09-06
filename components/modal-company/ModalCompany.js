import React from 'react';
import styles from './modal.module.css'; // Create a CSS file for your modal styles
import { FaWhatsapp } from 'react-icons/fa';
const ModalCompany = ({ imageUrl, onClose, catalog, handleWsp, wsp }) => {

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <div>
          <div className={styles.imgContainer}>
            <img src={imageUrl} alt="Catalog Image" />
          </div>
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>
            {catalog.name}
          </h1>
          <h3 className={styles.description}>
            {catalog.description}
          </h3>
          <h3 className={styles.price}>
            {catalog.price} {catalog.currency_type}
          </h3>
          {wsp && (
            <button className={styles.wspButton} onClick={() => handleWsp(catalog)} target="_blank">
              <FaWhatsapp />
              Consultar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalCompany;
