import { useState } from "react";

import "./App.css";
import { RegisterPageComponent } from "./components/RegisterPageComponent/RegisterPageComponent";
import { SignInPageComponent } from "./components/SignInComponentPage/SignInComponentPage";
import { AppRoute } from "./Routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppRoute />
    </>
  );
}

export default App;
