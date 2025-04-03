import React, { JSX, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { IFlat } from "../Interfaces/Interfaces";
import TableComponent from "./TableComponent";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UpdateUserComponent from "./UpdateUserComponent";

interface IHomePageComponentProps {
  text: string;
  textDoi: string;
  addNumber: (a: number, b: number) => number;
}

const HomePageComponent: React.FC<IHomePageComponentProps> = (
  props
): JSX.Element => {
  console.log(props);
  const navigate = useNavigate();
  const [flats, setFlats] = useState<IFlat[]>([]);
  console.log(props.addNumber(1, 3));
  useEffect(() => {
    const getFlats = async () => {
      const querySnapshot = await getDocs(collection(db, "flats"));
      const data: IFlat[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as IFlat),
      }));
      setFlats(data);
    };
    getFlats();
  }, []);

  if (flats?.length < 1) {
    
    return <UpdateUserComponent/>;
  }

  console.log(flats);

  return (
    <>
      <TableComponent flats={flats} />
      <br />
      <Button onClick={() => navigate("/addflat")}>Add Flat</Button>
    </>
  );
};

export default HomePageComponent;
