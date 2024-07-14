import type { PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {Todo, TodoGroup, TodoGroupState} from "../../types/types";
import {addDataGroup, deleteData, deleteDataGroup, editDataGroup, fetchData, fetchDataGroup} from "../../api/axios";
import {v4 as uuidv4} from 'uuid';

export const fetchGroupsAsync = createAsyncThunk(
    'todoGroup/fetchGroups',
    async (_, { rejectWithValue }) => {
        try {
            const groups = await fetchDataGroup();
            const todos = await fetchData(); // Fetch all todos
            const groupsWithCount = groups.map((group: TodoGroup) => {
                const count = todos.filter((todo: Todo) => todo.listId === group.id).length;
                return { ...group, count }; // Add count to each group
            });
            return groupsWithCount;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : `An error occurred while fetching group.`;
            return rejectWithValue(errorMessage);
        }
    }
);

export const addGroupAsync = createAsyncThunk(
    'todoGroup/addGroup',
    async (groupName: string, { rejectWithValue }) => {
        try {
            const newGroup = {
                title: groupName,
                createdAt: new Date().toISOString(),
                id: `${uuidv4()}LIST`,
                count: 0,
            }
            return  await addDataGroup(newGroup);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : `An error occurred while adding new group.`;
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateGroupAsync = createAsyncThunk(
    'todoGroup/updateGroup',
    async ({ id, title }: {id: string, title: string}, { rejectWithValue }) => {
        try {

            return await editDataGroup(id, {title});
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : `An error occurred while updating group with id ${id}.`;
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteGroupAsync = createAsyncThunk(
    'todoGroup/deleteGroup',
    async (id: string, { rejectWithValue }) => {
        try {
            const allItems = await fetchData();
            const itemsToDelete = allItems.filter((item: Todo) => item.listId === id);
            await Promise.all(itemsToDelete.map((item: Todo) => deleteData(item.id)));
            return await deleteDataGroup(id);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : `An error occurred while deleting group with id ${id}.`;
            return rejectWithValue(errorMessage);
        }
    }
);



const initialState: TodoGroupState = {
    groups: [],
    pending: false,
    error: null,
};

export const todoGroupSlice = createSlice({
    name: 'todoGroup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroupsAsync.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchGroupsAsync.fulfilled, (state, action: PayloadAction<TodoGroup[]>) => {
                state.groups = action.payload;
                state.pending = false;
            })
            .addCase(fetchGroupsAsync.rejected, (state, action) => {
                state.error = action.payload as string;
                state.pending = false;
            })

            .addCase(addGroupAsync.fulfilled, (state, action) => {
                state.groups.push(action.payload);
            })
            .addCase(addGroupAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(updateGroupAsync.fulfilled, (state, action) => {
                const groupIndex = state.groups.findIndex(group => group.id === action.payload.id);
                if (groupIndex !== -1) {
                    const currentCount = state.groups[groupIndex].count;
                    state.groups[groupIndex] = { ...action.payload, count: currentCount };
                }
            })
            .addCase(updateGroupAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(deleteGroupAsync.fulfilled, (state, action: PayloadAction<TodoGroup>) => {
                state.groups = state.groups.filter(group => group.id !== action.payload.id);
            })
            .addCase(deleteGroupAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            });

    },
});


