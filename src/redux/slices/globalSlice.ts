import { createSlice } from "@reduxjs/toolkit"
import { ThemeStyles} from "../../types/types";
import type {GlobalState, Theme} from "../../types/types"


const initialState: GlobalState = {theme: localStorage.getItem("theme") as Theme || ThemeStyles.light}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
})

export const { setTheme } = globalSlice.actions