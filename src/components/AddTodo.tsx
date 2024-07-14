import { useAppDispatch, useAppSelector } from "../hooks"
import { useState } from "react"
import { addTodoAsync } from "../redux/slices/todoSlice"
import { TodoFormModal } from "./TodoFormModal"
import type {Priority} from "../types/types";
import { PriorityLevels, ThemeStyles} from "../types/types";
import {useParams} from "react-router-dom";

export const AddTodo = () => {
  const theme = useAppSelector(state => state.global.theme)
  const shadow = theme === ThemeStyles.light ? "shadow-light" : "shadow-dark"
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState<Priority>(PriorityLevels.medium)
  const { id } = useParams<{ id: string }>();

  const handleAddTodo = () => {
    if (!title || !title.trim()) return alert("Title is required")
    try {
      id &&
      dispatch(addTodoAsync(
          {
            title,
            description,
            priority,
            listId: id
          })
      )
    }
    catch (e) {
      console.error(e)
    }
    setIsOpen(false)
  }

  const priorityStyles = {
    low: ["bg-green shadow-low border-green", "bg-gray", "bg-gray"],
    medium: ["bg-yellow shadow-medium border-yellow", "bg-yellow shadow-medium border-yellow", "bg-gray"],
    high: ["bg-red shadow-high border-red", "bg-red  shadow-high border-red", "bg-red  shadow-high border-red"]
  }
  return (
    <>
      <button onClick={() => setIsOpen(true)}
              className={`p-2 h-10 w-10 rounded-full bg-purple hover:bg-dark-purple ${shadow}`}>
        <img className="h-[24px] w-[24px] m-auto" src="/assets/add.svg" alt="add" />
      </button>
      <TodoFormModal isOpen={isOpen} setIsOpen={setIsOpen} title="Add TODO" handleAction={handleAddTodo}>
        <input defaultValue={title} onChange={(e) => setTitle(e.target.value)}
               className={`pl-8 w-full h-9 rounded ${theme} ${theme === "light" ? "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-40 border border-purple" :
                   "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 border border-white"}`}
               type="text" placeholder="Title"/>
        <input onChange={(e) => setDescription(e.target.value)}
               className={`pl-8 w-full h-9 rounded ${theme} ${theme === "light" ? "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-40 border border-purple" :
                   "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 border border-white"}`}
               type="text" placeholder="Description"/>
        <div className="flex w-full justify-between">
          <div
              className={`w-10 h-10 border rounded cursor-pointer ${priorityStyles[priority.title][0]}`}
              onClick={() => setPriority(PriorityLevels.low)}
          />
          <div
              className={`w-10 h-10 border rounded cursor-pointer ${priorityStyles[priority.title][1]}`}
              onClick={() => setPriority(PriorityLevels.medium)}
          />
          <div
              className={`w-10 h-10 border rounded cursor-pointer ${priorityStyles[priority.title][2]}`}
              onClick={() => setPriority(PriorityLevels.high)}
          />
        </div>
      </TodoFormModal>

    </>
  )
}