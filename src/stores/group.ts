import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { ref, type Ref } from "vue";
import type { Group } from "@/types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useGroupStore = defineStore("group", () => {
  const authStore = useAuthStore();
  const headers = { Authorization: `Bearer ${authStore.token}` };
  const groups: Ref<Group[]> = ref([]);
  const group: Ref<GroupInfo | null> = ref(null);

  const getGroups = async () => {
    try {
      const response = await axios.get(`${baseUrl}/adminPanel/groupList`, {
        headers,
      });

      if (response.status === 200) {
        groups.value = response.data;
      } else {
        throw new Error("Group fetch failed");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getGroupInfoById = async (id: number) => {
    try {
      const [infoResponse, studentsResponse, subjectsResponse] =
        await Promise.all([
          axios.get(`${baseUrl}/adminPanel/group/${id}/getInfo`, { headers }),
          axios.get(`${baseUrl}/adminPanel/group/${id}/students/list`, {
            headers,
          }),
          axios.get(`${baseUrl}/adminPanel/group/1/subjects/list`, { headers }),
        ]);

      group.value = infoResponse.data;
      if (group.value) group.value.students = studentsResponse.data;
      if (group.value) group.value.subjects = subjectsResponse.data.subjects;
    } catch (e) {
      console.error(e);
    }
  };

  const updateSpecializationById = async (
    groupId: number,
    departmentId: number,
  ) => {
    try {
      const response = await axios.put(
        `${baseUrl}/adminPanel/group/${groupId}/updateSpecialization`,
        { departmentId },
        { headers },
      );

      return response.status;
    } catch (e) {
      console.error(e);
    }
  };

  const updateCuratorById = async (groupId: number, teacherId: number) => {
    try {
      const response = await axios.put(
        `${baseUrl}/adminPanel/group/${groupId}/updateTeacher`,
        { userTeacherId: teacherId },
        { headers },
      );

      return response.status;
    } catch (e) {
      console.error(e);
    }
  };

  const updateStudentSubgroup = async (
    groupId: number,
    studentId: number,
    subgroup: string,
  ) => {
    try {
      const response = await axios.post(
        `${baseUrl}/adminPanel/group/${groupId}/students/changeSubgroup/${studentId}`,
        { subgroup },
        { headers },
      );

      return response.status;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    getGroups,
    getGroupInfoById,
    groups,
    group,
    updateSpecializationById,
    updateCuratorById,
    updateStudentSubgroup,
  };
});

export interface GroupInfo {
  id: number;
  title: string;
  specialization: Specialization;
  curator: Curator;
  students: Student[];
  subjects: Subject[];
}

interface Specialization {
  id: number;
  title: string;
}

interface Curator {
  id: number;
  fio: string;
}

interface Subject {
  id: number;
  subject: {
    id: number;
    title: string;
  };
  teacher: {
    id: number;
    fio: string;
  };
}

interface Student {
  id: number;
  fio: string;
  subgroup: string;
}
