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

export interface ScheduleDay {
  dayOfWeek: string;
  date: string;
  subjects: Subject[];
}

export interface Subject {
  number: number;
  subgroup?: string;
  subject?: string;
  teacher?: string;
  auditorium?: number;
}
