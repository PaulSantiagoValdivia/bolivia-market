import { useRouter } from 'next/router';
import styles from './catalog.module.css';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
export default function CatalogProducts({ wsp, catalogs, images }) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState();
  const handleConsultClick = (catalog) => {
    // Obtén el enlace de la imagen
   setImageUrl(`https://jzmtmllsdrqaenisuxbj.supabase.co/storage/v1/object/public/img2/19/${catalog.image}`);

    // Codifica el mensaje de WhatsApp
    const whatsappMessage = `¡Hola Vaporwave! Me interesa comprar el producto ${catalog.name}.\n\n${catalog.description}\n\nPrecio: ${catalog.price}${catalog.currency_type}$. \n\nImagen: ${imageUrl}`;

    // Codifica el mensaje y la imagen para usarlo en un enlace
    const encodedMessage = encodeURIComponent(whatsappMessage);
  
    // Crea el enlace de WhatsApp con la imagen adjunta
    const whatsappURL = `${wsp}&text=${encodedMessage}`;

    // Abre WhatsApp en una nueva ventana o pestaña
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
  };

  const handleClick = (catalog) => () => {
    router.push(`https://jzmtmllsdrqaenisuxbj.supabase.co/storage/v1/object/public/img2/19/${catalog.image}`);
  };
  return (
    <div className={styles.container}>
      {catalogs.map((catalog) => (
        <div className={styles.containerProducts} key={catalog.id}>
          <Image
          onClick={handleClick(catalog)}
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
              <FaWhatsapp />
              Consultar
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
