// components/Comments.js
"use client";

import { useState, useEffect } from "react";
import { UserCircle, Clock, Send } from "lucide-react";
import React from "react";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
    role: "user", // default role
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    message: "",
  });

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/library");
      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();
      setComments(data.comments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi dasar
    if (!formData.name || !formData.email || !formData.content) {
      setFormStatus({
        submitting: false,
        success: false,
        message: "Silakan isi semua kolom yang wajib diisi.",
      });
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitting: false,
        success: false,
        message: "Silakan masukkan alamat email yang valid.",
      });
      return;
    }

    try {
      setFormStatus({
        submitting: true,
        success: false,
        message: "",
      });

      const response = await fetch("/library", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit comment");

      // Refresh comments list
      await fetchComments();

      // Reset form
      setFormData({
        name: "",
        email: "",
        content: "",
        role: "user",
      });

      setFormStatus({
        submitting: false,
        success: true,
        message: "Komentar berhasil ditambahkan!",
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, success: false, message: "" }));
      }, 3000);
    } catch (err) {
      setFormStatus({
        submitting: false,
        success: false,
        message: err.message || "Terjadi kesalahan. Silakan coba lagi nanti.",
      });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Komentar dan Diskusi
      </h2>

      {/* Form komentar */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">
          Tambahkan Komentar
        </h3>

        {formStatus.message && (
          <div
            className={`p-4 mb-4 rounded-lg ${
              formStatus.success
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
            }`}
          >
            {formStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-gray-700 dark:text-gray-300 mb-1"
            >
              Peran
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">Pengguna</option>
              <option value="mahasiswa">Mahasiswa</option>
              <option value="dosen">Dosen</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-gray-700 dark:text-gray-300 mb-1"
            >
              Komentar <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              rows="4"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={formStatus.submitting}
            className="flex items-center justify-center px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {formStatus.submitting ? (
              "Memproses..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Kirim Komentar
              </>
            )}
          </button>
        </form>
      </div>

      {/* Daftar komentar */}
      <div>
        <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">
          {comments.length} Komentar
        </h3>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Memuat komentar...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg">
            {error}
          </div>
        ) : comments.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            Belum ada komentar. Jadilah yang pertama memberikan komentar!
          </p>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <UserCircle
                      className={`w-10 h-10 ${
                        comment.role === "dosen"
                          ? "text-purple-500 dark:text-purple-400"
                          : comment.role === "admin"
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {comment.name}
                          {comment.role && (
                            <span
                              className={`ml-2 text-xs px-2 py-1 rounded ${
                                comment.role === "dosen"
                                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                                  : comment.role === "admin"
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                                  : comment.role === "mahasiswa"
                                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                              }`}
                            >
                              {comment.role.charAt(0).toUpperCase() +
                                comment.role.slice(1)}
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {comment.email}
                        </p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDate(comment.timestamp)}
                      </div>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
