import React, { JSX, useState } from "react";
import UserContainerComponent from "./components/UserContainerComponent/UserContainerComponent";
const App: React.FC = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  console.log(count);
  const increment = () => {
    setCount(count + 1);
    //   setCount((prevState) => {
    //   console.log(prevState);
    //   return prevState + 1;
    // });
  };
  return (
    // <div>
    //   <p>count: {count}</p>
    //   <button onClick={increment}>Increment</button>
    // </div>
    <UserContainerComponent></UserContainerComponent>
  );
};

export default App;
