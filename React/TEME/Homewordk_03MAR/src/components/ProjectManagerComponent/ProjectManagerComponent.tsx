import React, { JSX, useState } from "react";
import ProjectFormComponent from "./ProjectFormComponent/ProjectFormComponent";
import ProjectListComponent from "./ProjectListComponent/ProjectListComponent";
import { IProjectInterface } from "../../interfaces/IProjectInterface";

interface IProjectManagerComponentProps {
  parent: string;
}

const ProjectManagerComponent: React.FC<IProjectManagerComponentProps> = (
  props
): JSX.Element => {
  const { parent } = props;

  console.log(parent);
  const firstName = "nume";
  const lastName = "prenume";
  const [projects, setProjects] = useState<IProjectInterface[]>([]);
  const updateProjects = (project: IProjectInterface) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };
  const toggleStatus = (id: string) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === id) {
          return { ...project, completed: !project.completed };
        }
        return project;
      });
    });
  };
  return (
    <>
      <ProjectFormComponent
        updateProjects={updateProjects}
        firstName={firstName}
      />
      <ProjectListComponent
        projects={projects}
        toggleStatus={toggleStatus}
        lastName={lastName}
      />
    </>
  );
};

export default ProjectManagerComponent;
