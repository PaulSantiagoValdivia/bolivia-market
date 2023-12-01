import styles from './catalog.module.css';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import ModalCompany from '../modal-company/ModalCompany';

export default function CatalogProducts({ wsp, catalogs, images }) {
  const [imageUrl, setImageUrl] = useState();
  const [showModal, setShowModal] = useState(false);
  const [catalog, setCatalog] = useState(null);
  const [imageSelected, setImageSelected] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la categoría seleccionada


  const handleConsultClick = (catalog) => {
    if (imageUrl) {
      const imageOnlineUrl = `https://jzmtmllsdrqaenisuxbj.supabase.co/storage/v1/object/public/img2/${catalog.company_id}/${catalog.image}`;
      const whatsappMessage = `¡Hola! Me interesa comprar el producto ${catalog.name}.\n\n${catalog.description}\n\nPrecio: ${catalog.price}${catalog.currency_type}$. \n\nImagen: ${imageOnlineUrl}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `${wsp}&text=${encodedMessage}`;
      window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    } else {
      alert('Por favor espera a que la imagen se cargue antes de consultar.');
    }
  };

  const sortedCatalogs = [...catalogs].sort((a, b) => b.price - a.price);

  // Filtrar por categoría seleccionada o mostrar los tres más caros si no hay selección
  const filteredCatalogs = selectedCategory
    ? sortedCatalogs.filter((catalog) => catalog.categoria.toLowerCase() === selectedCategory.toLowerCase())
    : sortedCatalogs.slice(0, 20);

  const handleClick = (catalog, imageUrl) => {
    setShowModal(true);
    setCatalog(catalog);
    setImageSelected(imageUrl);
    console.log(catalogs);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <div className={styles.searchContainer}>
        <select
          className={styles.searchInput}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          placeholder="Filtrar por categoría"
        >
          <option value="">Todos</option>
          <option value="maquinas">Máquinas</option>
          <option value="repuestos">Repuestos</option>
        </select>
      </div>
    <div className={styles.container}>
      {filteredCatalogs.map((catalog) => (
        <div className={styles.containerProducts} key={catalog.id}>
          <Image
            onClick={() => handleClick(catalog, images[catalog.image])}
            className={styles.imgProducts}
            src={images[catalog.image]}
            alt={catalog.name}
            width={173}
            height={173}
            loading="lazy"
            onLoad={() => setImageUrl(images[catalog.image])}
          />
          <h3 className={styles.nameProducts}>{catalog.name}</h3>
          <p className={styles.descriptionProducts}>{catalog.description}</p>
          <p className={styles.categoryProducts}>
            {catalog.price} {catalog.currency_type}
          </p>
          {wsp && (
            <button className={styles.wspButton} onClick={() => handleConsultClick(catalog)}>
              <FaWhatsapp />
              Consultar
            </button>
          )}
        </div>
      ))}
    </div>
    {showModal && (
      <ModalCompany
        wsp={wsp}
        imageUrl={imageSelected}
        catalog={catalog}
        onClose={handleCloseModal}
        handleWsp={handleConsultClick}
      />
    )}
  </div>
    );
}
