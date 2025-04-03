import { useEffect, useState } from "react";

// function App() {
//   const [count, setCount] = useState<number>(0);
//   useEffect(() => {
//     setInterval(() => {
//       setCount(count + 1);
//     }, 1000);
//   }, [count]);
//   console.log(count);
//   return (
//     <>
//       <div>{count}</div>
//     </>
//   );
// }

function App() {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  console.log(count);
  return (
    <>
      <div>{count}</div>
    </>
  );
}

export default App;
