"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { initializeApp } from "firebase/app";
import Komen from "../components/Komen";
import React from "react";
import {
  getFirestore,
  collection,
  addDoc, // Fixed the typo here: getDoct → getDocs
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

// Initialize Firebase outside the component to avoid re-initialization on each render
// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Contact() {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

  // Set up real-time listener for comments on component mount
  useEffect(() => {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, orderBy("timestamp", "desc"));

    // Create a real-time listener for comments
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const commentsData = [];
        querySnapshot.forEach((doc) => {
          commentsData.push({ id: doc.id, ...doc.data() });
        });
        setComments(commentsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error getting comments: ", error);
        setLoading(false);
      }
    );

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentInput.trim() || !userName.trim()) {
      setSubmitStatus({
        show: true,
        success: false,
        message: "Please enter your name and comment",
      });
      setTimeout(
        () => setSubmitStatus({ show: false, success: false, message: "" }),
        3000
      );
      return;
    }

    setSubmitting(true);

    try {
      // Add comment to Firebase with a local timestamp for immediate display
      const newComment = {
        name: userName,
        comment: commentInput,
        timestamp: serverTimestamp(),
        localTimestamp: new Date().toISOString(),
      };

      await addDoc(collection(db, "comments"), newComment);

      // Clear input but keep the name for convenience
      setCommentInput("");
      setSubmitting(false);
      setSubmitStatus({
        show: true,
        success: true,
        message: "Your comment has been posted successfully!",
      });

      // Hide success message after 3 seconds
      setTimeout(
        () => setSubmitStatus({ show: false, success: false, message: "" }),
        3000
      );
    } catch (error) {
      console.error("Error adding comment: ", error);
      setSubmitting(false);
      setSubmitStatus({
        show: true,
        success: false,
        message: "Error posting comment. Please try again.",
      });
      setTimeout(
        () => setSubmitStatus({ show: false, success: false, message: "" }),
        3000
      );
    }
  };

  // Helper function to format date
  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";

    let date;
    if (timestamp.toDate) {
      // Firebase Timestamp
      date = timestamp.toDate();
    } else if (timestamp.seconds) {
      // Firebase Timestamp as plain object
      date = new Date(timestamp.seconds * 1000);
    } else if (typeof timestamp === "string") {
      // ISO string
      date = new Date(timestamp);
    } else {
      return "Just now";
    }

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Get In Touch
      </h1>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Contact Information */}
        <div className="md:w-full">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Email
                  </p>
                  <a
                    href="mailto:john.doe@example.com"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    john.doe@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Phone
                  </p>
                  <a
                    href="tel:+12345678901"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    +1 (234) 567-8901
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Location
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    New York, NY, United States
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-medium mt-8 mb-4 text-gray-900 dark:text-white">
              Connect With Me
            </h3>

            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section with Firebase */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Comments
        </h2>

        {/* Add new comment form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="commentInput"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="commentInput"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
              required
            ></textarea>
          </div>

          {submitStatus.show && (
            <div
              className={`p-4 mb-4 rounded-lg ${
                submitStatus.success
                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                  : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-300 ${
              submitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>

        {/* Display comments */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-gray-600 dark:text-gray-400">
              Loading comments...
            </p>
          ) : comments.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {comment.name}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(comment.timestamp || comment.localTimestamp)}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {comment.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <Komen />
    </div>
  );
}
