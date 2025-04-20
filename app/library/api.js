// app/api/comments/route.js
import { comments } from '../library/db';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// GET - Mengambil semua komentar
export async function GET() {
  return NextResponse.json({ comments });
}

// POST - Menambahkan komentar baru
export async function POST(request) {
  const body = await request.json();
  
  // Validasi data yang dimasukkan
  const { name, email, content, role } = body;
  
  if (!name || !email || !content) {
    return NextResponse.json(
      { error: 'Name, email, and content are required' },
      { status: 400 }
    );
  }
  
  // Buat komentar baru
  const newComment = {
    id: uuidv4(),
    name,
    email,
    content,
    role: role || 'user',
    timestamp: new Date().toISOString()
  };
  
  // Tambahkan ke database
  comments.unshift(newComment);
  
  return NextResponse.json({ comment: newComment }, { status: 201 });
}