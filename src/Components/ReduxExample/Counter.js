import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../Store/Reducer/CounterReducer";

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const incrementCounterHandler = () => {
    dispatch(counterActions.increment());
  };
  const decrementCounterHandler = () => {
    dispatch(counterActions.decrement());
  };
  const incrementHandler = () => {
    dispatch(counterActions.incrementByDynamicData(5));
  };
  return (
    <main>
      <h1>Redux Counter</h1>
      <div>{counter.counter}</div>
      <div>
        <button onClick={incrementCounterHandler}>Increment</button>
        <button onClick={decrementCounterHandler}>Decrement</button>
        <button onClick={incrementHandler}>increment by 5</button>
      </div>
    </main>
  );
};

export default Counter;
