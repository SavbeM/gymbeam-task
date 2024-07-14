// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import {useDispatch, useSelector} from "react-redux"
import type {AppDispatch, RootState} from "./redux/store"
import {useEffect, useMemo, useState} from "react"
import type {FuseResult} from "fuse.js";
import Fuse from "fuse.js";
import type {SearchKey} from "./types/types";
import {debounce} from "lodash"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()




// export const useFilter = (filter: "all" | "completed" | "uncompleted") => {
//     const todos = useAppSelector(state => state.todos.todos);
//     const [filteredTodos, setFilteredTodos] = useState(todos);
//
//     useEffect(() => {
//         let newTodos = todos.filter(todo =>
//             filter === "all" ||
//             (filter === "completed" && todo.completed) ||
//             (filter === "uncompleted" && !todo.completed)
//         );
//         setFilteredTodos(newTodos);
//
//     }, [todos, filter])
//
//     return filteredTodos;
// }

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<{ width: number, height: number }>({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight});
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}