import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { CgClose } from "react-icons/cg";
import styles from './addproducts.module.css'
const AddProduct = ({ companyId, itemId, onClose, updateItems }) => {
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    currency_type: '',
    image: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const currencyOptions = ['USD', 'BS'];

  useEffect(() => {
    const fetchItem = async () => {
      if (!itemId) return;

      let { data: items, error } = await supabase.from('catalogs').select('*').eq('id', itemId).limit(1);
      if (error) {
        console.error(error);
        alert('Error fetching item');
        return;
      }
      if (items.length > 0) {
        setFormState(items[0]);
      }
    };
    fetchItem();
  }, [itemId]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormState({ ...formState, name: value });
    setFormErrors({ ...formErrors, name: '' });
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setFormState({ ...formState, description: value });
    setFormErrors({ ...formErrors, description: '' });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setFormState({ ...formState, price: value });
    setFormErrors({ ...formErrors, price: '' });
  };

  const handleCurrencyTypeChange = (e) => {
    const value = e.target.value;
    setFormState({ ...formState, currency_type: value });
    setFormErrors({ ...formErrors, currency_type: '' });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setFormState({ ...formState, image: file.name });
    setFormErrors({ ...formErrors, image: '' });
  };


  const validateForm = () => {
    const errors = {};
  
    if (!formState.name) {
      errors.name = 'Completa este campo';
    } else if (!formState.description) {
      errors.description = 'Completa este campo';
    } else if (!formState.price) {
      errors.price = 'Completa este campo';
    } else if (!formState.currency_type) {
      errors.currency_type = 'Completa este campo';
    } else if (!formState.image && !selectedImage) {
      errors.image = 'Completa este campo';
    }
  
    setFormErrors(errors);
  
    return Object.keys(errors).length === 0;
  };
  


const handleSubmit = async (e) => {
  e.preventDefault();

  const isValid = validateForm();

  if (!isValid) {
    return;
  }
  setFormErrors({}); // Limpiar los errores existentes
  if (!selectedImage) {
    setFormErrors({ ...formErrors, image: 'Completa este campo' });
  }
    if (!selectedImage) return;

    try {
      const { data, error } = await supabase.storage.from('img2').upload(`${companyId}/${selectedImage.name}`, selectedImage)

      if (error) {
        throw error
      }

      console.log('Image uploaded successfully:', data)
      setSelectedImage(null)
    } catch (error) {
      console.error('Error uploading image:', error.message)
    }

    if (itemId) {
      // Update existing item
      let { data: items, error } = await supabase.from('catalogs').select('*').eq('id', itemId).limit(1);

      if (error) {
        console.error(error);
        alert('Error fetching item');
        return;
      }
      if (items.length > 0) {
        const { error: updateError } = await supabase.from('catalogs').update({
          name: formState.name,
          description: formState.description,
          price: formState.price,
          currency_type: formState.currency_type,
          image: formState.image,
        }).eq('id', itemId);
        if (updateError) {
          console.error(updateError);
          return;
        }
      } else {
        alert('Item not found');
      }

    } else {
      // Insert new item
      const { error: insertError } = await supabase.from('catalogs').insert([{ company_id: companyId, name: formState.name, description: formState.description, price: formState.price, currency_type: formState.currency_type, image: formState.image }]);

      if (insertError) {
        console.error(insertError);
        return;
      }

      updateItems();
    }

    onClose();
    setFormState({ name: '', description: '', price: '', currency_type: '', image: '' });
  };

  return (
    <div className={styles.container} >
      <button className={styles.exit} onClick={onClose}> <CgClose /></button>
      <h1 className={styles.nameProduct} > {itemId ? formState.name : 'Agregar Producto'}  </h1>
      <h2 className={styles.h2} H2>Agrega, actualiza o elimina este producto</h2>
      <form className={styles.form} onSubmit={handleSubmit}  >
        <p className={styles.textForm} >nombre del producto </p>
        <input className={styles.inputName} InputName type="text" name="name" placeholder="ingresa el nombre del producto" value={formState.name}  maxLength={25} onChange={handleNameChange} />
        {formErrors.name && (
          <div className={styles.errorBox}>
            {formErrors.name}
          </div>
        )}
          <p className={styles.textForm} >descripción del producto </p>
          <input className={styles.inputDescription} name="description" placeholder="ingresa una descripcion" value={formState.description} maxLength={25} onChange={handleDescriptionChange} />
        {formErrors.description && (
          <div className={styles.errorBoxDescription}>
            {formErrors.description}
          </div >
        )}
        <div className={styles.div}>
          <div className={styles.divPrice}  >
          <p className={styles.textForm} >precio</p>
          <input className={styles.inputPrice}type="number" name="price" placeholder="precio" value={formState.price} onChange={handlePriceChange} />
            {formErrors.price && (
              <div className={styles.errorBoxPrice} >
                {formErrors.price}
              </div>
            )}
          </div>
          <div className={styles.divPrice}  >
          <p className={styles.textForm} >moneda</p>
            <select className={styles.select}  name="currency_type" value={formState.currency_type} onChange={handleCurrencyTypeChange}>
              {currencyOptions.map((option) => (
                <option className={styles.option} key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {formErrors.currency_type && (
              <div className={styles.errorBoxCurrency}>
                {formErrors.currency_type}
              </div>
            )}
          </div>
        </div>
        <p className={styles.textForm} >agregar imagen</p>
        <label className={styles.labelImage} >
        <input className={styles.inputImage} type="file"   onChange={handleImageChange} />
        {selectedImage ? selectedImage.name : 'Seleccionar imagen'}
        </label>
        {formErrors.image && (
          <div className={styles.errorBoxImage}>
            {formErrors.image}
          </div>
        )}
        <button className={styles.button}  type="submit">Aceptar</button>
      </form>
    </div>
  );
};

export default AddProduct;
