import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { ref, type Ref } from "vue";
import type { Group, ScheduleDay } from "@/types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useGroupStore = defineStore("group", () => {
  const authStore = useAuthStore();
  const headers = { Authorization: `Bearer ${authStore.token}` };
  const groups: Ref<Group[]> = ref([]);
  const group: Ref<GroupInfo | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);
  const schedule: Ref<ScheduleDay[]> = ref([]);

  const getGroups = async () => {
    try {
      isLoading.value = true;
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
    } finally {
      isLoading.value = false;
    }
  };

  const getGroupInfoById = async (id: number) => {
    try {
      isLoading.value = true;
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
    } finally {
      isLoading.value = false;
    }
  };

  const createGroup = async (
    title: string,
    teacherId: number,
    departmentId: number,
    color: string,
  ) => {
    try {
      const response = await axios.post(
        `${baseUrl}/adminPanel/group/create`,
        {
          title,
          departmentId,
          userTeacherId: teacherId,
          color,
        },
        { headers },
      );

      if (response.status !== 201) {
        throw new Error("Error creating group");
      }

      getGroups();

      return response;
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

  const addStudent = async (groupId: number, studentId: number) => {
    try {
      const response = await axios.post(
        `${baseUrl}/adminPanel/group/${groupId}/students/add/${studentId}`,
        {},
        { headers },
      );

      if (response.status !== 200) {
        throw new Error("Error adding student");
      } else {
        await getGroupInfoById(groupId);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeStudent = async (groupId: number, studentId: number) => {
    try {
      const response = await axios.post(
        `${baseUrl}/adminPanel/group/${groupId}/students/remove/${studentId}`,
        {},
        { headers },
      );

      if (response.status !== 200) {
        throw new Error("Error adding student");
      } else {
        await getGroupInfoById(groupId);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const checkNameAvailability = async (name: string) => {
    try {
      const response = await axios.get(
        `${baseUrl}/adminPanel/group/checkName`,
        {
          params: {
            name,
          },
          headers,
        },
      );

      if (response.status === 200 || response.status === 409) {
        if (response.data.message === "Name not available") return false;
        else return true;
      } else {
        throw new Error("Error checking group name availability");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addTeacherSubject = async (
    groupId: number,
    teacherSubjectId: number,
  ) => {
    try {
      const response = await axios.post(
        `${baseUrl}/adminPanel/group/${groupId}/subjects/add`,
        { teacherSubjectId },
        { headers },
      );

      if (response.status !== 201) {
        throw new Error("Error adding teacher subject to group");
      } else {
        await getGroupInfoById(groupId);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeSubject = async (groupId: number, teacherSubjectId: number) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/adminPanel/group/${groupId}/subjects/remove/${teacherSubjectId}/`,
        { headers },
      );

      if (response.status !== 200) {
        throw new Error("Error removing teacher subject from group");
      } else {
        await getGroupInfoById(groupId);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getGroupSchedule = async (groupId: number) => {
    try {
      const response = await axios.get(
        `${baseUrl}/adminPanel/group/${groupId}/schedule/list`,
        {
          headers,
        },
      );

      if (response.status !== 200) {
        throw new Error("Error fetching group schedule");
      } else {
        schedule.value = response.data.schedule;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeSchedule = async (
    groupId: number,
    date: string,
    number: number,
    subjectId: number,
  ) => {
    try {
      const response = await axios.post(
        `${baseUrl}/adminPanel/group/${groupId}/schedule/change`,
        { date, number, subjectId },
        { headers },
      );

      if (response.status !== 200) {
        throw new Error("Error changing schedule");
      } else {
        await getGroupInfoById(groupId);
        await getGroupSchedule(groupId);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    groups,
    group,
    isLoading,
    schedule,
    getGroups,
    getGroupInfoById,
    createGroup,
    updateSpecializationById,
    updateCuratorById,
    updateStudentSubgroup,
    addStudent,
    removeStudent,
    checkNameAvailability,
    addTeacherSubject,
    removeSubject,
    getGroupSchedule,
    changeSchedule,
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

export interface Subject {
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
