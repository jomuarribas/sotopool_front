"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useRouter } from 'next/navigation';

export default function Home() {
  const actualDate = new Date()
  const [user, setUser] = useState({});
  const [code, setCode] = useState("");
  const [verification, setVerification] = useState(false);
  const formatDate = actualDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  const router = useRouter();
  const {apiFetch} = useApi();

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      router.push("/login");
    }
  }, [router]);

  const confirmUser = async () => {
    const id = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const route = `users/confirmuser/${id}/${token}`;
    try {
      const data = await apiFetch(false, 'POST', route, null, null);
      if (data === undefined) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push("/login");
      }
      setUser(data.user);
      setCode(data.code);
      setVerification(true);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    confirmUser();
  }, []);
  
  return (
    <>
    {verification && (
    <main className={styles.home}>
      <h1>CDV SOTO DE ALCOLEA</h1>
      <div>
        <div>
          <Image src={user.img} alt="Logo" width={250} height={250} />
        </div>
      </div>
      <div>
        <h2>{user.name} <strong>{user.surnames}</strong></h2>
        <h3><strong>Socio: </strong>{user.member}</h3>
      </div>
      <div>
        <h2>Código de entrada para el:</h2>
        <p><strong>{formatDate}</strong></p>
        <h3>{code}</h3>
      </div>
</main>
    )}
</>
  )
}