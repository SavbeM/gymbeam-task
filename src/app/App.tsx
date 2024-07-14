import React from "react"
import {useAppSelector, useWindowSize} from "../hooks"
import {MobileHeader} from "../components/MobileHeader"
import {TodoGroups} from "../components/TodoGroups";
import {TodosContainer} from "../components/TodosContainer";
import {Route, Routes} from "react-router-dom";


const App = () => {
    const theme = useAppSelector(state => state.global.theme)
    const windowSize = useWindowSize()

    const mobile = windowSize.width <= 640;

    return (
        <div className={`flex flex-col items-center md:pb-32 min-h-screen w-full  ${theme}`}>
            {mobile ? <>
                    <MobileHeader/>
                    <hr className={`w-full h-[2px] ${theme === "dark" ? "text-purple" : "text-transparent"}`}/>
                </> :
                <h1 className=" text-[26px] font-semibold font-kanit-medium mt-[40px]">TODO LIST</h1>}
            <Routes>
                <Route path="/" element={<TodoGroups />} />
                <Route path="/group/:id" element={<TodosContainer />} />
            </Routes>
        </div>
    )
}

export default App
