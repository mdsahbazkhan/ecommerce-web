import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import {
  HiOutlineMail,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";
import { toast } from "sonner";

const Messages = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);

        const res = await axios.get(backendUrl + "/api/contact/list", {
          headers: { token },
        });

        setMessages(res.data.message || []);
      } catch (error) {
        console.log("Error fetching messages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(backendUrl + `/api/contact/${id}`, {
        headers: { token },
      });
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      console.log("Error deleting message", error);
    }
  };
  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      setSending(true);

      const res = await axios.post(
        backendUrl + "/api/contact/reply",
        {
          email: selectedMessage.email,
          message: replyText,
        },
        { headers: { token } },
      );

      if (res.data.success) {
        toast.success("Reply sent successfully");
        setReplyText("");
        setSelectedMessage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  // Skeleton
  const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
      <td className="p-3 sm:p-4">
        <div className="h-4 bg-gray-200 animate-pulse rounded w-24"></div>
      </td>
      <td className="p-3 sm:p-4">
        <div className="h-4 bg-gray-200 animate-pulse rounded w-32"></div>
      </td>
      <td className="p-3 sm:p-4">
        <div className="h-4 bg-gray-200 animate-pulse rounded w-28"></div>
      </td>
      <td className="p-3 sm:p-4">
        <div className="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
      </td>
      <td className="p-3 sm:p-4">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-16"></div>
      </td>
    </tr>
  );

  return (
    <div className="p-3 sm:p-4 md:p-6 w-full bg-gray-50 ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8 gap-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <HiOutlineMail className="text-white text-lg sm:text-xl" />
          </div>
          Contact Messages
        </h2>
        <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg shadow-md text-xs sm:text-sm font-medium">
          Total: {messages.length} messages
        </div>
      </div>

      {/* Messages Table Card */}
      <div className="bg-white shadow-lg rounded-xl   p-4 sm:p-5 md:p-6">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 sm:p-4 text-left text-gray-600 font-semibold whitespace-nowrap">
                    Name
                  </th>
                  <th className="p-3 sm:p-4 text-left text-gray-600 font-semibold whitespace-nowrap">
                    Email
                  </th>
                  <th className="p-3 sm:p-4 text-left text-gray-600 font-semibold whitespace-nowrap">
                    Subject
                  </th>
                  <th className="p-3 sm:p-4 text-left text-gray-600 font-semibold whitespace-nowrap">
                    Message
                  </th>
                  <th className="p-3 sm:p-4 text-left text-gray-600 font-semibold whitespace-nowrap">
                    Date
                  </th>
                  <th className="p-3 sm:p-4 text-left text-gray-600 font-semibold whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => <SkeletonRow key={i} />)
                ) : messages.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <HiOutlineMail className="text-gray-400 text-2xl" />
                        </div>
                        <p className="text-gray-500 font-medium">
                          No messages found
                        </p>
                        <p className="text-gray-400 text-xs">
                          Contact messages will appear here
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr
                      key={msg._id}
                      className="border-b border-gray-100 hover:bg-purple-50/50 transition"
                    >
                      <td className="p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {msg.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <span className="font-medium text-gray-700">
                            {msg.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 sm:p-4 text-gray-600">
                        <a
                          href={`mailto:${msg.email}`}
                          className="hover:text-purple-600 transition"
                        >
                          {msg.email}
                        </a>
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">
                          {msg.subject}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 max-w-xs">
                        <p className="truncate text-gray-600">{msg.message}</p>
                      </td>
                      <td className="p-3 sm:p-4 text-gray-500">
                        <div className="flex items-center gap-1 text-xs">
                          <HiOutlineCalendar className="text-gray-400" />
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedMessage(msg)}
                            className="p-1.5 sm:p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition"
                            title="View Message"
                          >
                            <HiOutlineEye className="text-base sm:text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(msg._id)}
                            className="p-1.5 sm:p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                            title="Delete Message"
                          >
                            <HiOutlineTrash className="text-base sm:text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <HiOutlineUser className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {selectedMessage.name}
                    </h3>
                    <p className="text-purple-100 text-sm">
                      {selectedMessage.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-white/80 hover:text-white text-2xl leading-none"
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Subject
                </span>
                <p className="mt-1 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium">
                  {selectedMessage.subject}
                </p>
              </div>
              <div className="mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Message
                </span>
                <p className="mt-1 p-3 bg-gray-50 text-gray-700 rounded-lg text-sm leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  Received:{" "}
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
               
              </div>
              <div className="mt-4">
                <textarea
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm"
                  rows="3"
                />

                <button
                  onClick={handleReply}
                  disabled={sending}
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
                >
                  {sending ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
