// src/pages/SignupPage.tsx
import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAddUserMutation } from "../../services";
import { IUser } from "../../types";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [addUser, { isLoading, error }] = useAddUserMutation();

  const [formData, setFormData] = useState<Partial<IUser>>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await addUser(formData).unwrap();
      if (res && res._id) {
        navigate("/taskPage");
      }
    } catch (err: any) {
      if (err?.data?.message?.includes("already exists")) {
        navigate("/taskPage");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
          {error && <p className="text-red-500 text-center">Signup failed</p>}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
