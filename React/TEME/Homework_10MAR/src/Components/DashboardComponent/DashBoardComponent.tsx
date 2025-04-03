import React, { JSX } from "react";
import { useParams } from "react-router-dom";

const DashBoardComponent: React.FC = (): JSX.Element => {
  const { id } = useParams();
  console.log(id);
  return <div>DashBoardComponent {id}</div>;
};

export default DashBoardComponent;
