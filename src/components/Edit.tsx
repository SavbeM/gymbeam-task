import { useAppDispatch, useAppSelector } from "../hooks";
import type {EditProps} from "../types/types";
import { ItemType} from "../types/types";
import { editTodoAsync } from "../redux/slices/todoSlice";
import { MouseEvent, useEffect, useState} from "react";
import {TodoFormModal} from "./TodoFormModal";
import {updateGroupAsync} from "../redux/slices/todoGroupsSlice";
import type React from "react";

export const Edit = ({id, itemType, setDisabled}: EditProps) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.todos.items.find(todo => todo.id === id));
  const currentGroup = useAppSelector(state => state.todoGroup.groups.find(group => group.id === id));
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const theme = useAppSelector(state => state.global.theme);


  const handleEdit = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    if (setDisabled) {
      setDisabled(true);
    }
    setIsOpen(true);
  };

  const handleApply = () => {
    if (!title || !title.trim()) return alert("Title is required");
    if (currentTodo && itemType === ItemType.todo) {
      dispatch(editTodoAsync({
        id,
        todoUpdateData: { title, description }
      }));
    } else {
      dispatch(updateGroupAsync({
        id,
        title
      }));
    }
    if (setDisabled) {
      setDisabled(false);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (currentTodo) {
      setTitle(currentTodo.title || "");
      setDescription(currentTodo.description || "");
    } else if (currentGroup) {
      setTitle(currentGroup.title || "");
    }
  }, [currentTodo, currentGroup]);

  return (
    <>
      <svg onClick={(e) => handleEdit(e)} role="edit" className="text-[#CDCDCD] cursor-pointer hover:text-black"
           stroke="currentColor"
           width="15" height="14"
           viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.67272 3.49106L1 10.1637V13.5H4.33636L11.0091 6.82736M7.67272 3.49106L10.0654 1.09837L10.0669 1.09695C10.3962 0.767585 10.5612 0.602613 10.7514 0.540824C10.9189 0.486392 11.0993 0.486392 11.2669 0.540824C11.4569 0.602571 11.6217 0.767352 11.9506 1.09625L13.4018 2.54738C13.7321 2.87769 13.8973 3.04292 13.9592 3.23337C14.0136 3.40088 14.0136 3.58133 13.9592 3.74885C13.8974 3.93916 13.7324 4.10414 13.4025 4.43398L13.4018 4.43468L11.0091 6.82736M7.67272 3.49106L11.0091 6.82736"
        />
      </svg>
      <TodoFormModal isOpen={isOpen} setIsOpen={setIsOpen} title={currentTodo && itemType === ItemType.todo ? "Edit TODO" : "Edit Group"} handleAction={handleApply}>
        <input maxLength={20} defaultValue={title} onChange={(e) => setTitle(e.target.value)}
               className={`pl-8 w-full h-9 rounded ${theme} ${theme === "light" ? "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-40 border border-purple" :
                 "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 border border-white"}`}
               type="text" placeholder="Title" />
        {currentTodo && itemType === ItemType.todo && (
          <input defaultValue={description} onChange={(e) => setDescription(e.target.value)}
                 className={`pl-8 w-full h-9 rounded ${theme} ${theme === "light" ? "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-40 border border-purple" :
                   "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 border border-white"}`}
                 type="text" placeholder="Description" />
        )}
      </TodoFormModal>
    </>
  );
};