// db.js
import { generateUUID } from '../library/uuid';

export const comments = [
  {
    id: generateUUID(),
    name: 'Dr. Smith',
    email: 'dr.smith@university.edu',
    content: 'Proyek ini sangat menarik. Silahkan tambahkan lebih banyak detail tentang metodologi.',
    timestamp: '2025-04-10T14:30:00Z',
    role: 'dosen'
  },
  {
    id: generateUUID(),
    name: 'Jane Doe',
    email: 'jane.doe@student.edu',
    content: 'Terima kasih atas feedback-nya, Dr. Smith. Saya akan menambahkan detail tersebut.',
    timestamp: '2025-04-11T09:15:00Z',
    role: 'mahasiswa'
  },
];