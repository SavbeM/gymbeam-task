import type {Dispatch, SetStateAction} from "react";
import type React from "react"
import type { CSSProperties } from 'react';
import type { ControlProps, MenuProps, OptionProps, SingleValueProps } from 'react-select';

export interface CustomStyles {
    menu: (provided: CSSProperties, state: MenuProps<any, any, any>) => CSSProperties;
    control: (provided: CSSProperties, state: ControlProps<any, any, any>) => CSSProperties;
    singleValue: (provided: CSSProperties, state: SingleValueProps<any>) => CSSProperties;
}

export interface DropdownStyles {
    option: (provided: CSSProperties, state: OptionProps<any, any, any>) => CSSProperties;
}


export const PriorityLevels = {
    low: {
        title: "low",
        value: 1,
    },
    medium: {
        title: "medium",
        value: 2
    },
    high: {
        title: "high",
        value: 3
    },
} as const;


export const SearchKeys = {
    title: "title",
    description: "description"
} as const;

export type SearchKey = typeof SearchKeys[keyof typeof SearchKeys];

export type Priority = typeof PriorityLevels[keyof typeof PriorityLevels];

export interface TodoSliceState  {
    items: Todo[],
    pending: boolean,
    error: string | null,
}

export interface Todo {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    priority: Priority;
    completed: boolean;
    listId: string;
}

export interface TodoGroup  {
    title: string;
    id: string;
    createdAt: string;
    count?: number;
}

export type SearchProps  = {
    keys: SearchKey[];
    list: Todo[] | TodoGroup[];
    setter?: Dispatch<SetStateAction<Todo[] | TodoGroup[]>>;
}

export type ListProps = {
    list: (Todo | TodoGroup)[];
    itemsType: ItemTypes;
}

export interface TodoGroupState {
    groups: TodoGroup[];
    pending: boolean;
    error: string | null;
}

export type TodoUpdate = Partial<Todo>;

export interface AddTodoProps {
    title: string;
    description?: string;
    priority: Priority;
    listId: string;
}

export const ThemeStyles = {
    light: "light",
    dark: "dark",
} as const;


export type Theme = typeof ThemeStyles[keyof typeof ThemeStyles];

export interface GlobalState {
    theme: Theme;
}

export interface FiltrationProps {
    items: Todo[] | TodoGroup[];
    onFilter: (filteredItems: Todo[] | TodoGroup[]) => void;
    filterKeys: string[];
}

export interface FilterProps {
    setFilteredTodos: Dispatch<SetStateAction<Todo[]>>;
}

export interface EditProps {
    id: string;
    itemType: ItemTypes;
    setDisabled?: Dispatch<SetStateAction<boolean>>;
}

export const ItemType = {
    group: "group",
    todo: "todo",
} as const;

type ItemTypes = typeof ItemType[keyof typeof ItemType];

export interface DeleteProps {
    id: string;
    itemType: ItemTypes;
}

export interface TodoFormModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: string;
    handleAction: () => void;
    children: React.ReactNode;
    id?: string;
}

