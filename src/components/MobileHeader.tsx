import { SwitchTheme } from "./SwitchTheme"
import React from "react"
import { useAppSelector } from "../hooks"

export const MobileHeader = () => {
  const theme = useAppSelector(state => state.global.theme);
  const shadow = theme === 'light' ? 'shadow-light' : 'shadow-dark';

  return (
    <div className={` h-20 w-full flex flex-row justify-center items-center ${shadow}`}>
      <img className={`m-auto w-14 h-14 rounded ${theme} ${shadow}`} src="/assets/appIcon.svg"
           alt="logo" />
      <h1 className={`m-auto font-kanit-medium text-3xl ${theme}`}>Todo List</h1>
      <SwitchTheme />
    </div>)
}