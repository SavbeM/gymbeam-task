import { setTheme } from "../redux/slices/globalSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import React from "react"
import {ThemeStyles} from "../types/types";

export const SwitchTheme = () => {
  const theme = useAppSelector(state => state.global.theme);
  const shadow = theme === 'light' ? 'shadow-light' : 'shadow-dark';
  const dispatch = useAppDispatch();

  const handleThemeChange = () => {
    dispatch(setTheme(theme === ThemeStyles.light ? ThemeStyles.dark : ThemeStyles.light));
  }

  return (
    <button onClick={handleThemeChange} className={`m-auto p-2 w-12  bg-purple md:hover:bg-dark-purple rounded-xl  transition duration-150 ease-in-out ${theme} ${shadow}`}>
      {theme === ThemeStyles.light ? <img className="m-auto" src="/assets/darkMode.svg" alt="dark" /> :
        <img className="m-auto" src="/assets/lightMode.svg" alt="light" />}
    </button>
  )

}