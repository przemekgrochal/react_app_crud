import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { allActions } from "./Redux/actions/index";

const App = () => {
    const counter = useSelector<any>((state) => state.counter);
    const isLogged = useSelector<any>((state) => state.isLogged);
    const dispatch = useDispatch();

    return (
        <div className="App">
            <button onClick={() => dispatch(allActions.signIn())}>
                {/* User is logged: {isLogged.toString()} */}
            </button>
            <button onClick={() => dispatch(allActions.increment())}>+</button>
            <button onClick={() => dispatch(allActions.decrement())}>-</button>
            <div>{counter as any}</div>
        </div>
    );
};

export default App;
