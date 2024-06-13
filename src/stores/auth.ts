import { computed, type ComputedRef } from "@vue/reactivity";
import axios from "axios";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getPrivileges = (user: AdminAuth) => {
  const result: string[] = [];

  user.user.privileges.forEach((privilege) => {
    result.push(privilege.privilege);
  });

  return result;
};

export const useAuthStore = defineStore("auth", () => {
  const token: Ref<string | null> = ref(
    localStorage.getItem("auth-token") || null,
  );
  const privileges: Ref<string[] | null> = ref(
    JSON.parse(localStorage.getItem("privileges")) || null,
  );
  const error: Ref<string | null> = ref(null);
  const headers: ComputedRef<{ Authorization: string }> = computed(() => {
    return { Authorization: `Bearer ${token.value}` };
  });
  const router = useRouter();
  const isLoading: Ref<boolean> = ref(false);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("auth-token", newToken);
      token.value = newToken;
    } else {
      localStorage.removeItem("auth-token");
      token.value = null;
    }
  };

  const setPrivileges = (privilegesArr: string[] | null) => {
    if (privilegesArr) {
      localStorage.setItem("privileges", JSON.stringify(privilegesArr));
      privileges.value = privilegesArr;
    } else {
      localStorage.removeItem("privileges");
      privileges.value = null;
    }
  };

  const login = async (credentials: { login: string; password: string }) => {
    error.value = null;
    isLoading.value = true;
    try {
      const response = await axios.post(
        `${baseUrl}/adminPanel/signin`,
        credentials,
      );

      setToken(response.data.token);
      setPrivileges(getPrivileges(response.data));
    } catch (e: any) {
      error.value = e.response?.data?.message || e.message;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    error.value = null;
    try {
      await axios.post(
        `${baseUrl}/adminPanel/signout`,
        {},
        { headers: headers.value },
      );

      setToken(null);
    } catch (e: any) {
      error.value = e.response?.data?.message || e.message;
    }
  };

  const checkAuth = async () => {
    if (!token) return;

    await axios
      .get(`${baseUrl}/adminPanel/groupList`, {
        headers: headers.value,
      })
      .catch(async (error) => {
        if (error.response.status === 401) {
          setToken(null);
          router.replace("/login");
        }
      });
  };

  const checkPrivilege = (p: string) => {
    if (privileges.value?.includes("SuperAdmin")) return true;
    return privileges.value?.includes(p);
  };

  return {
    token,
    error,
    privileges,
    isLoading,
    login,
    logout,
    checkAuth,
    checkPrivilege,
  };
});

interface AdminAuth {
  token: string;
  user: {
    id: number;
    login: string;
    privileges: {
      id: number;
      userAdminId: number;
      privilege: string;
    }[];
  };
}
