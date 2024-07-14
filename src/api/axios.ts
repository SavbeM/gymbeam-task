import axios from 'axios';
import type {Todo, TodoUpdate} from "../types/types";


const api = axios.create({
    baseURL: 'https://6691467126c2a69f6e8f315b.mockapi.io/todo',
    timeout: 1000,
});

export const addData = async (data: Todo) => {
    try {
        const response = await api.post('/items', {...data})
        return response.data
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while adding new item.';
        throw new Error(errorMessage);
    }
}

export const fetchData = async () => {
    try {

        const response = await api.get('/items')
        return response.data
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching data.';
        throw new Error(errorMessage);
    }
}

export const deleteData = async (id: string) => {
    try {
        const response = await api.delete(`/items/${id}`)
        return response.data
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while deleting item.';
        throw new Error(errorMessage);
    }
}

export const editData = async (id: string, data: TodoUpdate) => {
    try {
        const response = await api.put(`/items/${id}`, {...data})
        return response.data
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while editing item.';
        throw new Error(errorMessage);
    }
}

export const fetchDataGroup = async () => {
    try {
        const response = await api.get('/groups')
        return response.data
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching groups.';
        throw new Error(errorMessage);
    }
}

export const addDataGroup = async (data: { title: string }) => {
    try {
        const response = await api.post('/groups', {...data})
        return response.data
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while adding new group.';
        throw new Error(errorMessage);
    }
}

export const deleteDataGroup = async (id: string) => {
    try {
        const response = await api.delete(`/groups/${id}`)
        return response.data
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while deleting group.';
        throw new Error(errorMessage);
    }
}

export const editDataGroup = async (id: string, data: {title: string}) => {
    try {
        const response = await api.put(`/groups/${id}`, {...data})
        return response.data
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while editing group.';
        throw new Error(errorMessage);
    }
}