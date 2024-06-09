import Image from 'next/image'

import styles from "./page.module.css";
import Link from 'next/link';

export default function Welcome() {

  return (
    <main className={styles.welcome}>
      <div>
        <Image src="https://res.cloudinary.com/dbnmjx6vr/image/upload/v1709246885/Logo_SDA_reytxe.webp" alt="Logo" width={70} height={70} />
        <h2>¡Gracias por registrarte!</h2>
        <p>Ahora revisaremos los datos para verificar tu identidad</p>
        <p>Te informaremos por email cuando la verificación sea correcta y puedas acceder a tu carnet digital.</p>
        <p><em>¡IMPORTANTE! si no te llega el mail de verificación revisa tu carpeta de spam o correo no deseado.</em></p>
        <Link href="/login">
          <button type="button">Volver a Login</button>
        </Link>
      </div>
    </main>
  );
}