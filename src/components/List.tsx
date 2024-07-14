import type React from "react";
import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {toggleTodo} from "../redux/slices/todoSlice";
import {ListProps, PriorityLevels, Todo, TodoGroup} from "../types/types";
import {ItemType, ThemeStyles} from "../types/types";
import {Edit} from "./Edit";
import {Delete} from "./Delete";

export const List: React.FC<ListProps> = ({list, itemsType}) => {
    const theme = useAppSelector((state) => state.global.theme);
    const shadow = theme === ThemeStyles.light ? "shadow-light" : "shadow-dark";
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const editRef = useRef<HTMLDivElement>(null);
    const deleteRef = useRef<HTMLDivElement>(null);

    const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>, itemId: string) => {
        if (editRef.current?.contains(e.target as Node) || deleteRef.current?.contains(e.target as Node) || disabled) {
            e.preventDefault();
            return;
        }
        navigate(`/group/${itemId}`);
    };

    const renderItem = (item: Todo | TodoGroup) => {
        if (itemsType === ItemType.todo) {
            const todoItem = item as Todo;
            return (
                <div
                    key={todoItem.id}
                    className={`flex mx-3 rounded  md:min-w-96 flex-col ${todoItem.completed && "bg-purple text-white"} ${theme} ${shadow} ${theme === "dark" && "border border-purple"}`}
                >
                    <div className={`flex flex-row items-center gap-3.5 p-2 justify-end font-bold`}>
                        {
                            todoItem.priority.value === PriorityLevels.low.value ?
                                <p className="text-xs text-green">Low</p> :
                                todoItem.priority.value === PriorityLevels.medium.value ?
                                    <p className="text-xs text-yellow">Medium</p> :
                                    <p className="text-xs text-red">High</p>
                        }
                    </div>
                    <div className="flex flex-row items-center gap-4 px-4 pb-4">
                        <input
                            className="form-checkbox h-5 w-5 text-purple-600 flex-shrink-0 accent-purple"
                            onChange={() => dispatch(toggleTodo(todoItem.id))}
                            type="checkbox"
                            checked={todoItem.completed}
                        />
                        <div className="flex flex-col break-words break-all whitespace-normal">
                            <h3 className={`text-lg font-semibold ${todoItem.completed && "line-through"}`}>{todoItem.title}</h3>
                            <p className="text-sm break-words whitespace-normal">{todoItem.description}</p>
                        </div>
                        <div className="ml-auto flex flex-row gap-2">
                            <Edit id={todoItem.id} itemType={ItemType.todo}/>
                            <Delete id={todoItem.id} itemType={ItemType.todo}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            const groupItem = item as TodoGroup;
            return (
                <div
                    onClick={(e) => handleLinkClick(e, groupItem.id)}
                    key={groupItem.id}
                    className={`flex rounded flex-row items-center gap-4 p-4 cursor-pointer ${theme} ${shadow}`}
                >
                    <h3 className="text-lg font-semibold">{groupItem.title}</h3>
                    <p>{groupItem.count}</p>
                    <div className="ml-auto flex flex-row gap-2">
                        <div ref={editRef}>
                            <Edit setDisabled={setDisabled} id={groupItem.id} itemType={ItemType.group}/>
                        </div>
                        <div ref={deleteRef}>
                            <Delete id={groupItem.id} itemType={ItemType.group}/>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return list.length ? (
        <div className="w-full grid grid-cols-1 gap-4 max-w-md m-auto">
            {list.map(renderItem)}
        </div>
    ) : (
        <div className="flex flex-col items-center gap-4">
            <h1 className={`text-2xl font-semibold ${theme}`}>No {itemsType === ItemType.todo ? "todos" : "groups"} found</h1>
            <img
                className="w-full h-full"
                src={theme === ThemeStyles.light ? "/assets/detective-light.svg" : "/assets/detective-dark.svg"}
                alt="empty"
            />
        </div>
    );
};