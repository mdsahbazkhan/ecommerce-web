import Lottie from "lottie-react";
import { FiCheck, FiX } from "react-icons/fi";
import successAnimation from "../assets/congratulation.json";

const ActionModal = ({
  open,
  type = "success", // "success" | "error"
  title,
  message,
  buttonText = "Back to main menu",
  onClose,
}) => {
  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center">
        {isSuccess && (
        <div className="absolute inset-0 pointer-events-none">
          <Lottie
            animationData={successAnimation}
            loop={false}
            className="w-full h-full"
          />
        </div>
      )}
        {/* ICON */}
        <div
          className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isSuccess ? "bg-purple-200" : "bg-red-200"
          }`}
        >
          {isSuccess ? (
            <FiCheck className="text-4xl text-purple-700" />
          ) : (
            <FiX className="text-4xl text-red-700" />
          )}
        </div>

        {/* TITLE */}
        <h2
          className={`text-2xl font-bold mb-2 ${
            isSuccess ? "text-purple-700" : "text-red-700"
          }`}
        >
          {title}
        </h2>

        {/* MESSAGE */}
        <p className="text-gray-500 mb-6">{message}</p>

        {/* BUTTON */}
        <button
          onClick={onClose}
          className="bg-purple-600 hover:bg-purple-700 transition
                     text-white px-6 py-2 rounded-lg font-medium"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ActionModal;

