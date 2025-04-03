import React, { JSX, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IProjectInterface } from "../../../interfaces/IProjectInterface";

interface IProjectFormComponentProps {
  updateProjects: (project: IProjectInterface) => void;
  firstName: string;
}

const ProjectFormComponent: React.FC<IProjectFormComponentProps> = (
  props
): JSX.Element => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const { updateProjects, firstName } = props;
  console.log(firstName);
  return (
    <>
      <div>
        <form>
          <h2>Add New Project</h2>
          <label>Project Name:</label>
          <input
            type="text"
            value={name}
            onChange={(el) => {
              setName(el.target.value);
            }}
          />
          <label>Project Description:</label>
          <input
            type="text"
            value={description}
            onChange={(el) => {
              setDescription(el.target.value);
            }}
          />
          <label>Project Deadline:</label>
          <input
            type="date"
            value={deadline}
            onChange={(el) => {
              setDeadline(el.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              const NewProjectData: IProjectInterface = {
                name,
                description,
                deadline,
                id: uuidv4(),
                completed: false,
              };
              updateProjects(NewProjectData);
            }}
          >
            {" "}
            Add project
          </button>
        </form>
      </div>
    </>
  );
};

export default ProjectFormComponent;
