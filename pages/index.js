import Footer from "@/components/footer/Footer";
import Loading from "@/components/loading/Loading";
import CatalogCompanies from "@/components/main-la-constru/CatalogCompanies";
import NavBar from "@/components/navl-la-constru/NavBar"
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
export default function LaConstru() {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase.from('companies').select('*');
      if (error) {
        console.error(error);
        return;
      }

      setCompanies(data);
      setLoading(false)
    };

    fetchCompanies();
  }, []);
  return (
    <>
      {loading ? ( // Mostrar pantalla de carga si loading es true
        <Loading />
      ) : (
        <>
          <NavBar />
          <CatalogCompanies companies={companies}/>
          <Footer />
        </>

      )}

    </>
  )
} 