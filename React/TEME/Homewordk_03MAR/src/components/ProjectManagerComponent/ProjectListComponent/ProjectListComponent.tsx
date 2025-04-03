import React, { JSX } from "react";
import { IProjectInterface } from "../../../interfaces/IProjectInterface";

interface IProjectListComponentProps {
  projects: IProjectInterface[];
  toggleStatus: (id: string) => void;
  lastName: string;
}

const ProjectListComponent: React.FC<IProjectListComponentProps> = (
  props
): JSX.Element => {
  const { projects = [], toggleStatus, lastName } = props;
  console.log(projects);
  console.log(lastName);

  return (
    <div>
      {projects.map((project) => {
        const { name, description, deadline, completed, id } = project;
        return (
          <div>
            <p>Project Name: {name}</p>
            <p>Project Description: {description}</p>
            <p>Deadline: {deadline}</p>
            <p>Name: {lastName}</p>
            <div>
              <p>Is completed? {completed ? "Yes" : "No"}</p>
              <button onClick={() => toggleStatus(id)}>Toggle complete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectListComponent;
