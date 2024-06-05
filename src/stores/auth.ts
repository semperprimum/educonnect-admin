import axios from "axios";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = defineStore("auth", () => {
  const token: Ref<string | null> = ref(
    localStorage.getItem("auth-token") || null,
  );
  const error: Ref<string | null> = ref(null);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("auth-token", newToken);
      token.value = newToken;
    } else {
      localStorage.removeItem("auth-token");
      token.value = null;
    }
  };

  const login = async (credentials: { login: string; password: string }) => {
    error.value = null;
    try {
      const response = await axios.post(
        `${baseUrl}/adminPanel/signin`,
        credentials,
      );

      if (response.status === 200) {
        setToken(response.data.token);
      } else {
        throw new Error("Login failed");
      }
    } catch (e: any) {
      error.value = e.response?.data?.message || e.message;
    }
  };

  const logout = async () => {
    error.value = null;
    try {
      const response = await axios.post(
        `${baseUrl}/adminPanel/signout`,
        {},
        { headers: { Authorization: `Bearer ${token.value}` } },
      );

      if (response.status === 200) {
        setToken(null);
      } else {
        throw new Error("Logout failed");
      }
    } catch (e: any) {
      error.value = e.response?.data?.message || e.message;
    }
  };

  return { token, error, login, logout };
});
