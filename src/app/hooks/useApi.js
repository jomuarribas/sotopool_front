"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const useApi = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const showAlert = (message, isError, isWarning) => {
    Swal.fire({
      title: isError ? "Error!" : isWarning ? "Importante!" : "Genial!",
      text: message,
      icon: isError ? "error" : isWarning ? "warning" : "success",
      showConfirmButton: isError || isWarning ? true : false,
      timer: isError || isWarning ? "" : 1500,
      width: '300px',
      confirmButtonColor: '#3085d6'
    });
  };

  const apiFetch = async (alert, method, route, formData, next, headersContent = 'application/json') => {
    try {
      setLoading(true);
      const headers = {};
      let formDataToSend = formData;

      if (formData !== null) {
        if (formData instanceof FormData) {
          formDataToSend = formData;
        } else if (headersContent === 'application/json') {
          headers['Content-Type'] = headersContent;
          formDataToSend = JSON.stringify(formData);
        }
      }

      headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

      const requestOptions = {
        method: method,
        headers: headers
      };

      if (formDataToSend !== null) {
        requestOptions.body = formDataToSend;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${route}`, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        if (alert) {
          showAlert(data.error || data.warning, data.error ? true : false, data.warning ? true : false);
        }
        return;
      }
      setLoading(false);
      if (next) {
        router.push(next);
      }
      if (alert && data.message) {
        showAlert(data.message, false, false);
      }

      return data;
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return { apiFetch, loading };
};
