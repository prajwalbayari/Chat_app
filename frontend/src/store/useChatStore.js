import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data.userList });
    } catch (error) {
      toast.error(error.reponse.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.res.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      console.log(res.data);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.reponse.data.message);
      console.log("Error in userAuthStore", error.reponse.message.data);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
