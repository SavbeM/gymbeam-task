import {Search} from "./Search";
import {SwitchTheme} from "./SwitchTheme";
import {List} from "./List";
import {AddTodo} from "./AddTodo";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector, useWindowSize} from "../hooks";
import type {Todo, TodoGroup} from "../types/types";
import {ItemType} from "../types/types";
import {SearchKeys} from "../types/types";
import {fetchTodosAsync} from "../redux/slices/todoSlice";
import {Link, useParams} from "react-router-dom";
import {Filtration} from "./Filtration";


export const TodosContainer = () => {
    const windowSize = useWindowSize();
    const todoItems = useAppSelector(state => state.todos.items);
    const [filteredTodos, setFilteredTodos] = useState<Todo[] | TodoGroup[]>(todoItems);
    const mobile = windowSize.width <= 640;
    const pending = useAppSelector(state => state.todos.pending);
    const error = useAppSelector(state => state.todos.error);
    const {id} = useParams();
    const dispatch = useAppDispatch();


    useEffect(() => {
        id &&
        dispatch(fetchTodosAsync(id));
    }, []);

    useEffect(() => {
        setFilteredTodos(todoItems)
    }, [todoItems]);
    return (

        <div>
            <div className="flex flex-col items-center sm:max-w-2xl">
                <Link className="w-full p-2 " to={"/"}>
                    <button className="w-full  transition ease-in-out rounded bg-purple text-white hover:bg-dark-purple py-2 px-4 md:w-24 md:absolute md:top-[40px] md:ml-2.5">Back</button>
                </Link>
                <div
                    className={` p-2 sm:mt-[18px] w-full max-w-[440px] sm:max-w-2xl grid grid-cols-3 grid-rows-1 gap-4 items-center`}>
                    <div className="col-span-2">
                        <Search setter={setFilteredTodos} list={todoItems}
                                keys={[SearchKeys.description, SearchKeys.title]}/>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-row gap-8 ">
                            <Filtration items={todoItems} onFilter={setFilteredTodos} filterKeys={["title", "priority", "createdAt"]}/>
                            {!mobile &&
                                <div className="col-span-1">
                                    <SwitchTheme/>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {pending && <p>Loading...</p>}
                {error && <p>Error occurred, try to restart app</p>}
                {!pending && !error &&
                    <>
                <div className="mt-12">
                    <List list={filteredTodos} itemsType={ItemType.todo}/>
                </div>
                <div className="m-10 sticky bottom-10 ">
                    <AddTodo/>
                </div>
                </>
                }
            </div>


        </div>
    )
}