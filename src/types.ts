import type { DefineComponent } from "vue";

export interface Group {
  id: number;
  title: string;
  students_count: number;
  curator: string;
  color: string;
}

export interface DropdownOption {
  name: string;
  value: string | number;
}

export interface ElipsisMenuOption {
  name: string;
  action: () => void;
}

export type Modals = {
  [key: string]: DefineComponent<any, any, any>;
};

export interface User {
  name: string;
  role: string;
  group: string | null;
}

export interface Subject {
  id?: number;
  groupId?: number;
  subjectId?: number;
  subgroup?: string;
  number: number;
  dayWeek?: number;
  auditorium?: number;
}

export interface SubstitutionRequest {
  id: number;
  groupId: number;
  date: string;
  subjectId: number;
  number: number;
  subgroup: string;
  reason: string;
  subject: SubstitutionSubject;
  group: SubstitutionGroup;
}

export interface SubstitutionSubject {
  id: number;
  userTeacherId: number;
  subjectId: number;
  teacherSubjectId: number;
  teacher_subject: SubstitutionTeacherSubject;
}

export interface SubstitutionTeacherSubject {
  id: number;
  userTeacherId: number;
  subjectId: number;
  teacher: SubstitutionTeacher;
}

export interface SubstitutionTeacher {
  id: number;
  fio: string;
  auditoriaId: number;
  auditorium: {
    id: number;
    number: number;
  };
}

export interface SubstitutionGroup {
  id: number;
  title: string;
  departmentId: number;
  userTeacherId: number;
  color: string;
}

export interface FormattedSubstitutionRequests {
  [key: string]: {
    [key: string]: SubstitutionRequest[];
  };
}
