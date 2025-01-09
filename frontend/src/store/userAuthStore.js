import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const userAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.reponse.data.message);
      console.log("Error in useAuthStore");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      if (res && res.data) {
        set({ authUser: res.data });
        toast.success("Logged in successfully");
      } else {
        console.error("Unexpected response format:", res);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        // API responded with an error (status code 4xx or 5xx)
        console.error("API Error:", error.response.data);
        toast.error(error.response.data.message || "Login failed. Please check your credentials.");
      } else if (error.request) {
        // Request was made, but no response was received
        console.error("Network Error:", error.request);
        toast.error("Network error. Please check your connection and try again.");
      } else {
        // Something else caused the error
        console.error("Unexpected Error:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!!");
    } catch (error) {
      toast.error(error.reponse.data.message);
    }
  },
}));
