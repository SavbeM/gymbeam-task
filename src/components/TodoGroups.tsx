import React, {useEffect, useState} from "react";
import {List} from "./List";
import {useAppDispatch, useAppSelector, useWindowSize} from "../hooks";
import {addGroupAsync, fetchGroupsAsync} from "../redux/slices/todoGroupsSlice";
import {Search} from "./Search";
import type {Todo, TodoGroup} from "../types/types";
import {ItemType} from "../types/types";
import {SearchKeys} from "../types/types";
import {TodoFormModal} from "./TodoFormModal";
import {SwitchTheme} from "./SwitchTheme";
import {Filtration} from "./Filtration";


export const TodoGroups = () => {
    const dispatch = useAppDispatch();
    const todoGroups = useAppSelector(state => state.todoGroup.groups);
    const pending = useAppSelector(state => state.todoGroup.pending);
    const error = useAppSelector(state => state.todoGroup.error);
    const [filteredGroups, setFilteredGroups] = useState<TodoGroup[] | Todo[]>(todoGroups);
    const windowSize = useWindowSize();
    const mobile = windowSize.width <= 640;
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");


    useEffect(() => {
        dispatch(fetchGroupsAsync());
    }, []);

    useEffect(() => {
        setFilteredGroups(todoGroups);
    }, [todoGroups]);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleAddGroup = () => {
        if (!title || !title.trim()) return alert("Title is required");
        try {
            dispatch(addGroupAsync(title));
        } catch (e) {
            console.error(e);
        }
        setIsOpen(false);
    }


    return (
        <div className="w-full flex flex-col items-center justify-center p-4">
            <div className="w-full flex flex-col items-center justify-center max-w-3xl space-y-4">
                <div className="flex w-full  justify-between items-center gap-3.5">
                    <Search keys={[SearchKeys.title]} list={todoGroups} setter={setFilteredGroups}/>
                    <Filtration items={todoGroups} filterKeys={["count", "createdAt", "title"]} onFilter={setFilteredGroups}/>
                    {!mobile && <SwitchTheme/>}
                </div>
                {pending && <p>Loading...</p>}
                {error && <p>Error occurred, try to restart app</p>}
                {!pending && !error && (
                    <>
                        <List list={filteredGroups} itemsType={ItemType.group}/>
                        <button className="mt-4 w-full max-w-md rounded bg-purple text-white hover:bg-dark-purple p-2 transition duration-150 ease-in-out" onClick={handleOpen}>
                            Add Group
                        </button>
                        <TodoFormModal isOpen={isOpen} setIsOpen={setIsOpen} title={"Add new group"} handleAction={handleAddGroup}>
                            <input value={title} onChange={(e) => setTitle(e.target.value)}
                                   className="w-full h-10 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                   type="text" placeholder="Title"/>
                        </TodoFormModal>
                    </>
                )}
            </div>
        </div>
    );

}