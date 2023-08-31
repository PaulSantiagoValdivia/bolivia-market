import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  const { companyName } = req.query;

  if (!companyName) {
    res.status(400).json({ error: 'Missing company name' });
    return;
  }

  try {
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .select('id, name, descripcion, titulo_catalogo, banner')
      .eq('name', companyName)
      .single();

    if (companyError) {
      throw companyError;
    }

    const { data: catalogsData, error: catalogsError } = await supabase
      .from('catalogs')
      .select('*')
      .eq('company_id', companyData.id);

    if (catalogsError) {
      throw catalogsError;
    }

    const bannerImageName = companyData.banner;

    if (!bannerImageName) {
      throw new Error('No se encontró el nombre de la imagen de banner');
    }
    res.status(200).json({
      company: companyData,
      catalogs: catalogsData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
