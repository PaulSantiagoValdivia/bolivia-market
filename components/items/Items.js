import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';
import AddProduct from '../add-products/AddProduct';
import { CgTrashEmpty } from "react-icons/cg";
import styles from './items.module.css'
import Modal from '../modal/Modal';
const Items = ({ items, setItems, onEditProduct, onClose, updateItems, showModal, setShowModal, companyId }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);


  const handleEditClick = (itemId) => {
    setSelectedItemId(itemId);
    setEditing(true);
    setShowModal(false); // Cerrar el modal al abrir el formulario de edición
    onEditProduct();
  };


  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    const { error } = await supabase.from('catalogs').delete().eq('id', itemToDelete.id);
    if (error) {
      console.error(error);
      console.log('Error deleting item');
    } else {
      console.log('Item deleted successfully!');
      setItems(items.filter((item) => item.id !== itemToDelete.id));
    }
    setShowModal(false);
  };

  const handleDeleteCancel = () => {
    setItemToDelete(null);
    setShowModal(false);
  };

  return (
    <>
      <h2 className={styles.h2}>Lista de productos</h2>
      {editing && <AddProduct
        itemId={selectedItemId}
        companyId={companyId}
        onClose={() => {
          setEditing(false); // Terminar la edición cuando se cierra el formulario
          setShowModal(false); // Cerrar el modal cuando se cierra el formulario
          onClose();
          updateItems();
        }}
      />}
      <div className={styles.itemList} >
        {items.map((item) => (
          <div className={styles.item } key={item.id}>
            <h3 className={styles.nameItem} >{item.name}</h3>
            <div className={styles.buttonContainer}>
              <button className={styles.edit} onClick={() => handleEditClick(item.id)} >editar</button>
              <button className={styles.delate}  onClick={() => handleDeleteClick(item)}><CgTrashEmpty /></button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
      )}
    </>
  );
};

export default Items;
