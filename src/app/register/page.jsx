"use client";
import Image from 'next/image'
import ReCAPTCHA from 'react-google-recaptcha'

import styles from "./page.module.css";
import { useRef, useState } from 'react';
import Link from 'next/link';
import { useApi } from '../hooks/useApi';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader/Loader';

export default function Register() {
  const [fileName, setFileName] = useState('');
  const [fileName2, setFileName2] = useState('');
  const formRef = useRef(null);
  const { apiFetch, loading } = useApi();
  const router = useRouter();
  const recaptcha = useRef();

  console.log('loading', loading);

  const handleFileChange = (e) => {
    setFileName(e.target.files[0].name);
  };

  const handleFileChange2 = (e) => {
    setFileName2(e.target.files[0].name);
  };

  function handleClick() {
    window.scrollTo(0, 0,);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      return;
    }
    const formData = new FormData();
    const next = '/welcome';
    formData.append('name', e.target.name.value);
    formData.append('surnames', e.target.surnames.value);
    formData.append('member', e.target.member.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.password.value);
    formData.append('img', e.target.img.files[0]);
    formData.append('license', e.target.license.files[0]);
    const route = 'users/register';
    try {
      const data = await apiFetch(true, 'POST', route, formData, null, 'multipart/form-data');
      if (data && data.ok) {
        router.push(next);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
    <main className={styles.register}>
      <div>
        <Image src="https://res.cloudinary.com/dbnmjx6vr/image/upload/v1709246885/Logo_SDA_reytxe.webp" alt="Logo" width={70} height={70} />
        <h2>Registro</h2>
        <form ref={formRef} onSubmit={handleRegister}>
          <input type="text" name="name" required placeholder="Nombre" />
          <input type="text" name="surnames" required placeholder="Apellidos" />
          <input type="text" name="member" required placeholder="Socio - Ejemplo: 219" />
          <input type="email" name="email" required placeholder="Email" />
          <input type="password" name="password" required placeholder="Password" />
          <p>Selecciona o hazte una foto en la cual se vea bien tu cara.</p>
          <p>IMPORTANTE!! La foto que elijas ya no se podrá cambiar una vez estés registrado.</p>
          <label htmlFor="img" className={styles.customFileUpload}>
            Subir foto de perfil
          </label>
          <input type="file" id='img' name="img" onChange={handleFileChange} />
          <p className={styles.filename}>{fileName}</p>
          <hr />
          <p>Haz una foto a tu carnet de la piscina para que podamos verificar tu identidad.</p>
          <label htmlFor="license" className={styles.customFileUpload}>
            Subir foto del carnet
          </label>
          <input type="file" id='license' name="license" required onChange={handleFileChange2} />
          <p className={styles.filename}>{fileName2}</p>
          <ReCAPTCHA
            className={styles.reCaptcha}
            sitekey="6LdqnPQpAAAAAPSZw_-IQEfu0zDDR8hFvnwbCk1X"
            ref={recaptcha}
          />
          <button type="submit" onClick={handleClick}>Registrar</button>
          <hr />
          <Link href="/login">
            <button type="button">Volver a Login</button>
          </Link>
        </form>
      </div>
    </main>
    </>
  );
}