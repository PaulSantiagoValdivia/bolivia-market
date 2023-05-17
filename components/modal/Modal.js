import styles from './modal.modules.css'
const Modal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modalContainer} >
      <h2 className={styles.modalTitle}>
        ESTAS SEGURO QUE <br />DESEAS ELIMINAR EL PRODUCTO?
      </h2>
      <p className={styles.p}>se borrara para siempre </p>
      <button className={styles.confirmButton} onClick={onConfirm}>confirmar</button>
      <button className={styles.cancelButton} onClick={onCancel}>cancelar</button>
    </div>
  );
};

export default Modal;