import type {PayloadAction} from "@reduxjs/toolkit";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import type {AddTodoProps, Todo,TodoSliceState, TodoUpdate} from "../../types/types"
import {addData, deleteData, editData, fetchData} from "../../api/axios";
import { v4 as uuidv4 } from 'uuid';

const initialState: TodoSliceState = {
    items: [],
    pending: false,
    error: null,
};

export const fetchTodosAsync = createAsyncThunk(
    'todos/fetchTodos',
    async (listId: string, {rejectWithValue}) => {
      try {
        const response = await fetchData();
        const filteredData = response.filter((item: { listId: string }) => item.listId === listId);
        return filteredData
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching todos.';
        return rejectWithValue(errorMessage);
      }
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (addTodoProps: AddTodoProps, {rejectWithValue}) => {
        try {

            const todoData: Todo = {
                title: addTodoProps.title,
                description: addTodoProps.description ?? "",
                priority: addTodoProps.priority,
                completed: false,
                listId: addTodoProps.listId,
                createdAt: new Date().toISOString(),
                id: uuidv4(),
            }
            return  await addData({...todoData})

        }
        catch (error: unknown){
                const errorMessage = error instanceof Error ? error.message : 'An error occurred while adding new item.';
                return rejectWithValue(errorMessage);
        }
    }
);

export const editTodoAsync = createAsyncThunk(
    'todos/editTodo',
    async ({id, todoUpdateData}: { id: string, todoUpdateData: TodoUpdate }, {rejectWithValue}) => {
        try {
            return await editData(id, todoUpdateData)

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : `An error occurred while editing item with id ${id}.`;
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodo',
    async (id: string, {rejectWithValue}) => {
        try {
            return await deleteData(id)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : `An error occurred while deleting item with id ${id}.`;
            return rejectWithValue(errorMessage);
        }
    }
);

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        toggleTodo: (state: TodoSliceState, action: PayloadAction<string>) => {
            const todo = state.items.find(todo => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosAsync.pending, (state) => {
              state.pending = true;
            })
            .addCase(fetchTodosAsync.fulfilled, (state, action) => {
              state.items = action.payload;
              state.pending = false;
            })
            .addCase(fetchTodosAsync.rejected, (state, action) => {
              state.error = action.payload as string;
              state.pending = false;
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(editTodoAsync.fulfilled, (state, action) => {
                state.items = state.items.map(todo => {
                    if (todo.id === action.payload.id) {
                        return action.payload
                    }
                    return todo
                })
            })
            .addCase(editTodoAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(todo => todo.id !== action.payload.id)
            })
    }
})

export const {toggleTodo} = todoSlice.actions