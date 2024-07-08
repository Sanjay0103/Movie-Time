import { getAuth } from "firebase/auth";
import React, { useState } from "react";

const ChangePassword = ({ onClose, onUpdatePassword }) => {
  const user = getAuth;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    onUpdatePassword(currentPassword, newPassword);
    onClose();
  };

  return (
    <div className="bg-black/50 fixed h-full top-0 left-0 w-screen flex justify-center z-[1000] backdrop-blur-lg">
      <div className="bg-black/50 z-[2000] backdrop-blur-3xl p-6 rounded-lg shadow-md border border-white my-2 max-w-2xl mx-auto h-fit mt-36">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-y-4 gap-x-2"
        >
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Change Password
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
