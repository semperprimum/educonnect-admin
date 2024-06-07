import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { ref, type Ref } from "vue";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();
  const headers = { Authorization: `Bearer ${authStore.token}` };
  const users: Ref<User[] | null> = ref(null);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/adminPanel/users/list`, {
        headers,
      });

      if (response.status !== 200) {
        throw new Error("Error fetching all users");
      } else {
        users.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createStudent = async (firstName: string, lastName: string) => {
    const fio = `${lastName} ${firstName}`;

    try {
      const response = await axios.post(
        `${baseUrl}/adminPanel/students/create`,
        { fio },
        { headers },
      );

      if (response.status !== 201) {
        throw new Error("Error creating student");
      } else {
        fetchAllUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createTeacher = async (
    firstName: string,
    lastName: string,
    patronymic: string,
    subjects?: number[],
  ) => {
    const fio = `${lastName} ${firstName} ${patronymic}`;

    try {
      const response = await axios.post(
        `${baseUrl}/adminPanel/teachers/create`,
        { fio, subjects },
        { headers },
      );

      console.log(response);

      if (response.status !== 201) {
        throw new Error("Error creating teacher");
      } else {
        fetchAllUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addSubjectToTeacher = async (teacherId: number, subjectId: number) => {
    try {
      const response = await axios.post(
        `${baseUrl}/adminPanel/teachers/${teacherId}/subjects/add`,
        { subjectId },
        { headers },
      );

      if (response.status !== 200) {
        throw new Error("Error adding subject to teacher");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/adminPanel/users/${id}/removeStudent`,
        { headers },
      );

      if (response.status !== 200) {
        throw new Error("Error deleting user");
      } else {
        fetchAllUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTeacher = async (id: number) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/adminPanel/users/${id}/removeTeacher`,
        { headers },
      );

      if (response.status !== 200) {
        throw new Error("Error deleting teacher");
      } else {
        fetchAllUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFreeStudents = async (groupId: number) => {
    try {
      const response = await axios.get(
        `${baseUrl}/adminPanel/group/${groupId}/students/freeList`,
        { headers },
      );

      if (response.status !== 200) {
        throw new Error("Error fetching free students");
      } else {
        return response.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    fetchAllUsers,
    fetchFreeStudents,
    createStudent,
    createTeacher,
    addSubjectToTeacher,
    deleteStudent,
    deleteTeacher,
    users,
  };
});

interface User {
  id: number;
  fio: string;
  role: string;
  privilages: string[];
}
