import React, { JSX } from "react";

interface IDataComponentProps {
  userid: number;
  id: number;
  body: string;
  title: string;
}

const DataComponent: React.FC<IDataComponentProps> = ({
  userid,
  id,
  body,
  title,
}): JSX.Element => {
  return (
    <>
      <ul>
        <li>{userid}</li>
        <li>{id}</li>
        <li>{body}</li>
        <li>{title}</li>
      </ul>
    </>
  );
};

export default DataComponent;
