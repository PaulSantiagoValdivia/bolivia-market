import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import styles from './email.module.css'
const EmailInput = () => {
  const [status, setStatus] = useState('pending')
  const [email, setEmail] = useState('')
  const handleLogin = async () => {
    // Verificar si el correo electrónico ingresado está autorizado
    const { data, error } = await supabase
      .from('companies')
      .select('email')
      .eq('email', email)
      .single()
  
    if (error) {
      setStatus('error')
      return
    }
  
    if (!data) {
      setStatus('unauthorized')
      return
    };
  
    const { error: otpError } = await supabase.auth.signInWithOtp({ email: email
    ,
  options:{
    emailRedirectTo: 'http://localhost:3000/dashboard'
  }, });
  
    if (otpError) {
      setStatus('error')
      return
    }
  
    setStatus('success')
  }

  return (
    <>
      <div className={styles.loginContainer}>
        {status === 'pending' && (
          <label className={styles.labelLogin}>
            INICIA SESION
            <h2 className={styles.textLogin}>Utiliza el correo con el que te registraste</h2>
            <input className={styles.inputLogin} type="email" value={email} placeholder="ingresa el e-mail" onChange={(e) => setEmail(e.target.value)} />
            <button className={styles.buttonLogin}  onClick={handleLogin}>ingresar</button>
          </label>
        )}
        {status === 'success' && (
              <label className={styles.labelLogin}>
            REVISA TU CORREO ELECTRÓNICO
            <h2 className={styles.textLogin}>Te acabamos de mandar un link a tu correo</h2>
            <button className={styles.buttonLogin} onClick={() => setStatus('pending')}>Ingresar otra cuenta</button>
          </label>
        )}
        {status === 'unauthorized' && (
          <label className={styles.labelLogin}>
            NO ESTAS AUTORIZADO
            <h2 className={styles.textLogin}>El correo electrónico ingresado no está autorizado</h2>
            <button className={styles.buttonLogin}onClick={() => setStatus('pending')}>Ingresar otra cuenta</button>
          </label >
        )}
        {status === 'error' && (
          <label className={styles.labelLogin}>
            ERROR
            <h2 className={styles.textLogin}>Hubo un error al ingresar</h2>
            <button className={styles.buttonLogin} onClick={() => setStatus('pending')}>Ingresar otra cuenta</button>
          </label>
        )}
    </div>
    </>
  )
}
export default EmailInput

