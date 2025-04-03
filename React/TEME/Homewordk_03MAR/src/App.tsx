import ProjectManagerComponent from "./components/ProjectManagerComponent/ProjectManagerComponent";

function App() {
  const parent = "IamTheParent";
  return (
    <>
      <ProjectManagerComponent parent={parent} />
    </>
  );
}

export default App;
