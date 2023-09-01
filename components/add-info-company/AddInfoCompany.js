import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import styles from "./addInfo.module.css";
import PortadaModal from "../modal-form/PortadaModal";
import TituloCatalogoModal from "../modal-form/TituloCatalogoModal";
import DescripcionModal from "../modal-form/DescripcionModal";
import BannerModal from "../modal-form/BannerModal";

export default function AddInfoCompany({ companyId }) {
  const [formData, setFormData] = useState({
    imagen_portada: "",
    titulo_catalogo: "",
    descripcion: "",
    banner: ""
  });

  const [portadaModalOpen, setPortadaModalOpen] = useState(false);
  const [tituloCatalogoModalOpen, setTituloCatalogoModalOpen] = useState(false);
  const [descripcionModalOpen, setDescripcionModalOpen] = useState(false);
  const [bannerModalOpen, setBannerModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const { data, error } = await supabase
          .from("companies")
          .select()
          .eq("id", companyId)
          .single();
        if (error) {
          throw error;
        }
        if (data) {
          setFormData(data);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la compañía:", error.message);
      }
    };
    fetchCompanyInfo();
  }, [companyId]);

  const handlePortadaModalConfirm = async (selectedImage) => {
    try {
      const nameImage = `${Date.now()}${selectedImage.name}`; 
      
      // Cargar la imagen de portada al bucket de Supabase
      const { data, error } = await supabase.storage
        .from("comp")
        .upload(`${companyId}/${nameImage}`, selectedImage);
      if (error) {
        throw error;
      }
      console.log("Portada image uploaded successfully:", data);
      // Actualizar el campo de imagen de portada en Supabase
      await supabase
        .from("companies")
        .update({ imagen_portada: nameImage })
        .eq("id", companyId);
      // Cerrar el modal de portada
      setPortadaModalOpen(false);
    } catch (error) {
      console.error("Error uploading portada image:", error.message);
    }
  };

  const handleTituloCatalogoModalConfirm = async (titulo) => {
    try {
      await supabase
        .from("companies")
        .update({ titulo_catalogo: titulo })
        .eq("id", companyId);
      setTituloCatalogoModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el título del catálogo:", error.message);
    }
  };

  const handleDescripcionModalConfirm = async (descripcion) => {
    try {
      await supabase
        .from("companies")
        .update({ descripcion: descripcion })
        .eq("id", companyId);
      setDescripcionModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar la descripción:", error.message);
    }
  };

  const handleBannerModalConfirm = async (selectedImage) => {
    try {
      // Cargar la imagen del banner al bucket de Supabase
      const nameImage = `${Date.now()}${selectedImage.name}`; 
      const { data, error } = await supabase.storage
        .from("comp")
        .upload(`${companyId}/${nameImage}`, selectedImage);
      if (error) {
        throw error;
      }
      console.log("Banner image uploaded successfully:", data);
      // Actualizar el campo de banner en Supabase
      await supabase
        .from("companies")
        .update({ banner: nameImage })
        .eq("id", companyId);
      // Cerrar el modal de banner
      setBannerModalOpen(false);
    } catch (error) {
      console.error("Error uploading banner image:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>

        <div className={styles.field}>
          <h3 className={styles.subtitle}>Imagen para portada</h3>
          <p className={styles.description}>
            Es la imagen que verán todos en la página principal.
            El tamaño es 228 de altura y 170 de ancho en pixeles.
          </p>
          <button
            className={styles.button}
            onClick={() => setPortadaModalOpen(true)}
          >
            {formData.imagen_portada ? "Editar" : "Agregar"}
          </button>
          {portadaModalOpen && (
            <PortadaModal
              isOpen={portadaModalOpen}
              onClose={() => setPortadaModalOpen(false)}
              onConfirm={handlePortadaModalConfirm}
              currentValue={formData.imagen_portada}
            />
          )}
        </div>
        <div className={styles.field}>
          <h3 className={styles.subtitle}>Título del catálogo</h3>
          <p className={styles.description}>
            Es el titulo que tendrá tu catálogo, por ejemplo:
            “Agosto es el mes del interiorismo”
          </p>
          <button
            className={styles.button}
            onClick={() => setTituloCatalogoModalOpen(true)}
          >
            {formData.titulo_catalogo ? "Editar" : "Agregar"}
          </button>
          {tituloCatalogoModalOpen && (
            <TituloCatalogoModal
              isOpen={tituloCatalogoModalOpen}
              onClose={() => setTituloCatalogoModalOpen(false)}
              onConfirm={handleTituloCatalogoModalConfirm}
              currentValue={formData.titulo_catalogo}
            />
          )}
        </div>

        <div className={styles.field}>
          <h3 className={styles.subtitle}>Descripción</h3>
          <p className={styles.description}>
            Es la descripción que tendrá tu catálogo, por ejemplo:
            “En agosto te presentamos un nuevo catálogo de sofás y sillas a tu disposición, manteniendo el estilo y clase que nos corresponde.”
          </p>
          <button
            className={styles.button}
            onClick={() => setDescripcionModalOpen(true)}
          >
            {formData.descripcion ? "Editar" : "Agregar"}
          </button>
          {descripcionModalOpen && (
            <DescripcionModal
              isOpen={descripcionModalOpen}
              onClose={() => setDescripcionModalOpen(false)}
              onConfirm={handleDescripcionModalConfirm}
              currentValue={formData.descripcion}
            />
          )}
        </div>
        <div className={styles.field}>
          <h3 className={styles.subtitle}>Imagen de banner</h3>
          <p className={styles.description}>
            Es la imagen que verán todos en tu catálogo. El tamaño es 520 de altura y 1510 de ancho en pixeles.
          </p>
          <button
            className={styles.button}
            onClick={() => setBannerModalOpen(true)}
          >
            {formData.banner ? "Editar" : "Agregar"}
          </button>
          {bannerModalOpen && (

            <BannerModal
              isOpen={bannerModalOpen}
              onClose={() => setBannerModalOpen(false)}
              onConfirm={handleBannerModalConfirm}
              currentValue={formData.banner}
            />
          )}
        </div>
      </div>
    </div>
  );
}