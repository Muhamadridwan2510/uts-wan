"use client";
import React, { useState, useEffect } from "react";

export default function CommentSection() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [commentsPerPage] = useState(5); // Jumlah komentar per halaman

  // Fungsi untuk menghitung rata-rata rating   
  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce(
      (acc, comment) => acc + comment.rating,
      0
    );
    return (totalRating / comments.length).toFixed(1);
  };

  // Fungsi untuk menampilkan paginasi
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  // Ambil komentar dari API
  useEffect(() => {
    fetchComments();
  }, [page]);

  const fetchComments = async () => {
    setLoading(true);
    const res = await fetch(`/api/comment?page=${page}`);
    const data = await res.json();
    setComments((prevComments) => [...prevComments, ...(data.comments || [])]);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    // Validasi panjang komentar
    if (comment.length < 10) {
      setMessage("Komentar harus minimal 10 karakter.");
      setSubmitting(false);
      return;
    }

    const res = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ name, comment, rating }),
    });

    const data = await res.json();

    if (res.ok) {
      setName("");
      setComment("");
      setRating(5);
      setMessage("Thank you for your comment!");
      fetchComments(); // Refresh comments setelah submit
    } else {
      setMessage(data.error || "Failed to submit");
    }

    setSubmitting(false);
  };

  // Proteksi spam dengan pengecekan waktu
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const handleSpamProtection = () => {
    const now = Date.now();
    if (now - lastSubmitTime < 3000) {
      setMessage("Tunggu beberapa detik sebelum mengirim komentar lagi.");
      return true;
    }
    setLastSubmitTime(now);
    return false;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Leave a Comment
      </h2>

      <form
        onSubmit={(e) => {
          if (handleSpamProtection()) return;
          handleSubmit(e);
        }}
        className="space-y-4 mb-8"
      >
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Your Comment"
          className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Rating
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {message && (
          <p className="text-sm mt-2 text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
      </form>

      {/* Tampilkan rata-rata rating */}
      <div className="mb-4">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Average Rating: ⭐ {calculateAverageRating()} from {comments.length}{" "}
          reviews
        </h3>
      </div>

      <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">
        Comments
      </h3>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li
              key={c.id}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex justify-between">
                <strong className="text-gray-900 dark:text-white">
                  {c.name}
                </strong>
                <span className="text-yellow-500 font-bold">{c.rating}⭐</span>
              </div>
              <p className="text-gray-800 dark:text-gray-300">{c.comment}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Tombol Load More */}
      {comments.length > 0 && !loading && (
        <button
          onClick={handleLoadMore}
          className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Load More
        </button>
      )}
    </div>
  );
}
