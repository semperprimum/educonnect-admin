import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useGroupStore = defineStore("group", () => {
  const authStore = useAuthStore();

  const getGroups = async () => {
    try {
      const response = await axios.get(`${baseUrl}/adminPanel/groupList`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Group fetch failed");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { getGroups };
});
