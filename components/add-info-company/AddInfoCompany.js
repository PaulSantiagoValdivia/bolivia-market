import { supabase } from "@/lib/supabaseClient";
import ModalImg from "../modal-form/ModalImg";
import { useState } from "react";
import styles from "./addInfo.module.css";
export default function AddInfoCompany() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [formData, setFormData] = useState({
    imagen_portada: '',
    titulo_catalogo: '',
    descripcion: '',
    banner: '',
  });

  const handleButtonClick = (field) => {
    setModalOpen(true);
    setActiveField(field);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveField('');
  };

  const handleFormSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .update({ [activeField]: formData[activeField] })
        .single();

      if (error) {
        throw new Error(error.message);
      }

      console.log('Datos actualizados en Supabase:', data);
      closeModal();
    } catch (error) {
      console.error('Error al actualizar datos en Supabase:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>INFORMACION DEL MES PARA TU CATALOGO</h2>

      <div className={styles.field}>
        <h3 className={styles.subtitle}>Imagen para portada</h3>
        <p className={styles.description}>
          Es la imagen que verán todos en la página principal.
          El tamaño es 228 de altura y 170 de ancho en pixeles.
        </p>
        <button className={styles.button} onClick={() => handleButtonClick('imagen_portada')}>
          {formData.imagen_portada ? 'Editar' : 'Agregar'}
        </button>
      </div>

      <div className={styles.field}>
        <h3 className={styles.subtitle}>Título del catálogo</h3>
        <p className={styles.description}>
          Es el titulo que tendra tu catalogo, por ejemplo:
          “Agosto es el mes del interiorismo”
        </p>
        <button className={styles.button} onClick={() => handleButtonClick('titulo_catalogo')}>
          {formData.titulo_catalogo ? 'Editar' : 'Agregar'}
        </button>
      </div>

      <div className={styles.field}>
        <h3 className={styles.subtitle}>Descripción</h3>
        <p className={styles.description}>
        Es la descripcion que tendra tu catalogo, por ejemplo:
“En agosto te presentamos un nuevo catalogo de sofas y sillas a tu disposicion, manteniendo el estilo y clase que nos corresponde.”
        </p>
        <button className={styles.button} onClick={() => handleButtonClick('descripcion')}>
          {formData.descripcion ? 'Editar' : 'Agregar'}
        </button>
      </div>

      <div className={styles.field}>
        <h3 className={styles.subtitle}>Banner</h3>
        <p className={styles.description}>
        Es la imagen que veran todos en tu catalogo. El tamaño es 520 de altura y 1510 de ancho en pixeles.
        </p>
        <button className={styles.button} onClick={() => handleButtonClick('banner')}>
          {formData.banner ? 'Editar' : 'Agregar'}
        </button>
      </div>

      {modalOpen && (
        <ModalImg
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          title="Editar información"
          field={activeField}
          value={formData[activeField]}
          onChange={handleInputChange}
        />
      )}
    </div>
  )
};
