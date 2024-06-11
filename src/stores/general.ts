import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { ref, type Ref } from "vue";

export const useGeneralStore = defineStore("general", () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const authStore = useAuthStore();
  const headers = { Authorization: `Bearer ${authStore.token}` };

  const specializations: Ref<Specialization[]> = ref([]);
  const teachers: Ref<Teacher[]> = ref([]);
  const subjects: Ref<Subject[]> = ref([]);
  const teacherSubjects: Ref<TeacherSubject[]> = ref([]);

  const fetchSpecializations = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/adminPanel/specializationsList`,
        {
          headers,
        },
      );

      if (response.status !== 200) {
        throw new Error("Specialization fetch failed");
      } else {
        specializations.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/adminPanel/teachers/getList`,
        {
          headers,
        },
      );

      if (response.status !== 200) {
        throw new Error("Teacher fetch failed");
      } else {
        teachers.value = response.data.teachers;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/adminPanel/subjects/getList`,
        {
          headers,
        },
      );

      if (response.status !== 200) {
        throw new Error("Subjects fetch failed");
      } else {
        subjects.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTeacherSubjects = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/adminPanel/subjects/getTeacherSubjectList`,
        {
          headers,
        },
      );

      if (response.status !== 200) {
        throw new Error("Teacher subject fetch failed");
      } else {
        teacherSubjects.value = response.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    fetchSpecializations,
    fetchTeachers,
    fetchSubjects,
    fetchTeacherSubjects,
    specializations,
    teachers,
    subjects,
    teacherSubjects,
  };
});

interface Specialization {
  id: number;
  title: string;
}

interface Teacher {
  id: number;
  fio: string;
}

interface Subject {
  id: number;
  title: string;
}

interface TeacherSubject {
  id: number;
  userTeacherId: number;
  teacher: Teacher;
  subject: Subject;
}
