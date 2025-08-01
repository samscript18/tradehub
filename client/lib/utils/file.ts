import axios from 'axios';
import { toastError } from './toast';
import { AxiosErrorShape, errorHandler } from '../config/axios-error';
import { CLOUDINARY_CLOUDNAME } from '../constants/env';

export async function uploadFile(file: File): Promise<string> {
  try {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'edssistance');

    const response = await axios.post<{ secure_url: string }>(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDNAME}/upload`,
      form
    );

    return response?.data?.secure_url;
  } catch (error) {
    toastError('unable to upload file')
    return errorHandler(error as string | AxiosErrorShape);
  }
}


export const convertUrl = async (url: string) => {
  const file: File = await fetch(url).then(async (response) => {
    const contentType = response.headers.get('content-type');
    const blob = await response.blob();
    return new File([blob], 'image', { type: contentType! });
  });
  return file;
};

export const convertBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};  

export async function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function urlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}