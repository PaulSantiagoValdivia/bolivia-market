import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import AddProduct from '@/components/add-products/AddProduct';
import styles from '@/styles/dashboard.module.css';
import Logo from '@/components/atoms/Logo';
import NavCompany from '@/components/nav-dashboard/NavCompany';
import Items from '@/components/items/Items';

const Dashboard = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    id: 0,
    name: '',
    // agregar cualquier otra información que necesites de la empresa
  });
  const [showCatalogs, setShowCatalogs] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (authListener && authListener.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchCompanyId = async () => {
      const { data: companiesData, error: companiesError } = await supabase
        .from('companies')
        .select('id, name')
        .eq('email', user.email)
        .single();

      if (companiesError) {
        console.error(companiesError);
        return;
      }

      setCompanyInfo(companiesData);
    };

    fetchCompanyId();
  }, [user]);
  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase
        .from('catalogs')
        .select('*')
        .eq('company_id', companyInfo.id);

      if (error) {
        console.error(error);
        alert('Error fetching items');
      } else {
        setItems(data);
      }
    }
    fetchItems();
  }, [companyInfo.id]);

  const handleOpenCatalogs = () => {
    setShowCatalogs(true);
  };

  const handleCloseCatalogs = () => {
    setShowCatalogs(false);
  };
  const updateItems = async () => {
    const { data, error } = await supabase
      .from('catalogs')
      .select('*')
      .eq('company_id', companyInfo.id);

    if (error) {
      console.error(error);
      alert('Error fetching items');
    } else {
      setItems(data);
    }
  };
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      router.push('/login'); // Redirige a la página de inicio de sesión
    }
  }

  return (
    <div className={styles.main} blurContent={showCatalogs} modalOpen={showModal}>
    <div className={styles.dashboardContainer}>
      <NavCompany companyName={companyInfo.name}/>
      <div className={styles.companyInfoContainer}>
        <h1 className={styles.welcomeText} >Hola, Mario!</h1>
        <p className={styles.info}>Aqui podras agregar, remover o editar los productos de {companyInfo.name} de este mes.</p>
      </div>
      <button className={styles.button} onClick={handleOpenCatalogs}>Agregar Producto</button>
      <button className={styles.button}  onClick={signOut}>signOut</button>
      {showCatalogs && <AddProduct companyId={companyInfo.id} onClose={handleCloseCatalogs} updateItems={updateItems} auth={user.id} />}
    <Items
      items={items} 
      setItems={setItems} 
      onEditProduct={() => setShowCatalogs(true)} 
      updateItems={updateItems} 
      showModal={showModal}
      setShowModal={setShowModal}
      companyId={companyInfo.id}
      onClose={() => setShowCatalogs(false)} />
    </div>
  </div>
  );
};

export default Dashboard;