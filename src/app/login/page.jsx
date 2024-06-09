"use client";
import Image from 'next/image'
import Link from 'next/link'

import styles from "./page.module.css";
import { useApi } from '../hooks/useApi';
import Loader from '../components/Loader/Loader';

export default function Login() {
  const { apiFetch, loading } = useApi();

  const handleLogin = async (e) => {
    e.preventDefault();
    const next = '/home';
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    const route = 'users/login';
    try {
      const data = await apiFetch(true, 'POST', route, formData, next );
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.user._id);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {loading ? <Loader /> : null}
    <main className={styles.login}>
      <div>
        <Image src="https://res.cloudinary.com/dbnmjx6vr/image/upload/v1709246885/Logo_SDA_reytxe.webp" alt="Logo" width={120} height={120} />
        <h2>Bienvenid@</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" required placeholder="Email" />
          <input type="password" name="password" required placeholder="Password" />
          <button type="submit">Entrar</button>
          <hr />
          <Link href="/register">
            <button type="button">Registra tu carnet</button>
          </Link>
        </form>
      </div>
    </main>
    </>
  );
}