import React from 'react';
import { useAppSelector } from "../hooks"
import type { TodoFormModalProps} from "../types/types";
import {ThemeStyles} from "../types/types"



export const TodoFormModal = ({ isOpen, setIsOpen, title, handleAction, children, id } : TodoFormModalProps) => {
  const theme = useAppSelector(state => state.global.theme);
  const shadow = theme === ThemeStyles.light ? 'shadow-light' : 'shadow-dark';

  return (
    <>
      {isOpen && (
        <div className={`p-8 fixed inset-0  z-50 bg-opacity-80 flex items-center justify-center bg-black`}>
          <div className={`p-16 flex flex-col gap-12 w-96 items-center justify-center rounded-xl ${theme} ${theme === "light" ? {shadow} : "border border-white"}`}>
            <h1 className={`font-kanit-regular text-2xl ${theme}`}>
              {title}
            </h1>
            {children}
            <div className="w-full flex flex-row justify-between">
              <button className={`flex justify-center items-center w-18 md:w-24 p-[6px] font-kanit-medium rounded text-purple bg-none border border-purple text-[15px] hover:text-white hover:bg-purple ${theme} `} onClick={() => setIsOpen(false)}>Undo</button>
              <button className={`flex justify-center items-center w-18 md:w-24 p-[6px] font-kanit-medium rounded text-white bg-purple text-[15px] hover:bg-dark-purple ${theme} `} onClick={handleAction}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};