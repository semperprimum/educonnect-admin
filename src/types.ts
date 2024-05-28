import type { DefineComponent } from "vue";

export interface Group {
	id: number;
	literals: string;
	number_of_students: number;
	curator: string;
	accentColor: string;
}

export interface DropdownOption {
	name: string,
	value: string | number
}

export interface ElipsisMenuOption {
	name: string,
	action: () => void
}

export type Modals = {
	[key: string]: DefineComponent<any, any, any>
}

export interface User {
	name: string;
	role: string;
	group: string | null;
}
