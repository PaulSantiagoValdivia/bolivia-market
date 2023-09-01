import { useRouter } from 'next/router';
import styles from './catalog.module.css';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

export default function CatalogProducts({ wsp, catalogs, images }) {
  const handleConsultClick = async (catalog) => {
    // Obtén el enlace de la imagen
    const imageUrl = `https://jzmtmllsdrqaenisuxbj.supabase.co/storage/v1/object/public/img2/19/${catalog.image}`;

    // Carga la imagen y la convierte en base64
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const imageBase64 = reader.result.split(',')[1];

      // Crea el mensaje de WhatsApp con la imagen en formato base64
      const whatsappMessage = `¡Hola Vaporwave! Me interesa comprar el producto ${catalog.name}.\n\n${catalog.description}\n\nPrecio: ${catalog.price}${catalog.currency_type}\n\n![Imagen](data:image/jpeg;base64,${imageBase64})`;

      // Codifica el mensaje para usarlo en un enlace
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Crea el enlace de WhatsApp
      const whatsappURL = `${wsp}&text=${encodedMessage}`;

      // Abre WhatsApp en una nueva ventana o pestaña
      window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    };
  };
  return (
    <div className={styles.container}>
      {catalogs.map((catalog) => (
        <div className={styles.containerProducts} key={catalog.id}>
          <Image
            className={styles.imgProducts}
            src={images[catalog.image]}
            alt={catalog.name}
            width={173}
            height={173}
            loading="lazy"
          />
          <h3 className={styles.nameProducts}>{catalog.name}</h3>
          <p className={styles.descriptionProducts}>{catalog.description}</p>
          <p className={styles.categoryProducts}>
            {catalog.price} {catalog.currency_type}
          </p>
          {wsp && (
            <button className={styles.wspButton} onClick={() => handleConsultClick(catalog)} target="_blank">
              <span className={styles.wspIcon}>
                <FaWhatsapp />
              </span>
              Consultar
            </button>        
          )}
        </div>
      ))}
    </div>
  );
}
