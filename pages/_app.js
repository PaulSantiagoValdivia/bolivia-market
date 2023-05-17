import { supabase } from '../lib/supabaseClient';
function MyApp({ Component, pageProps }) {
return (
  <>
   {supabase && (
      <Component {...pageProps} supabase={supabase} />
    )}
  </>
)
}

export default MyApp