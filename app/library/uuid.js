// config/uuid.js
import { v4 as uuidv4 } from 'uuid';

/**
 * Fungsi untuk menghasilkan UUID v4 unik
 * @returns {string} UUID v4 string
 */
export const generateUUID = () => {
  return uuidv4();
};

/**
 * Fungsi untuk memvalidasi format UUID
 * @param {string} uuid - String UUID yang akan divalidasi
 * @returns {boolean} true jika valid, false jika tidak
 */
export const validateUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Fungsi untuk menghasilkan UUID berbasis waktu (untuk pengurutan)
 * @returns {string} UUID v4 dengan timestamp
 */
export const generateTimeBasedUUID = () => {
  // Mendapatkan timestamp saat ini
  const timestamp = new Date().getTime();
  
  // Generate UUID dasar
  const uuid = uuidv4();
  
  // Return kombinasi timestamp dan UUID
  return `${timestamp}-${uuid}`;
};

/**
 * Mengekstrak timestamp dari UUID berbasis waktu
 * @param {string} timeBasedUUID - UUID berbasis waktu yang dihasilkan
 * @returns {number} timestamp dalam milisecond
 */
export const extractTimestampFromUUID = (timeBasedUUID) => {
  const parts = timeBasedUUID.split('-');
  return parseInt(parts[0], 10);
};