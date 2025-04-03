import { Button, TextField } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React, { JSX, useState } from "react";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";



const AddFlat: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [flatData, setFlatData] = useState<{ [key: string]: string }>({
    city: "",
    street: "",
    number: "",
    price: "",
    areasize: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlatData({
      ...flatData,
      [e.target.name]: e.target.value,
    });
  };

  const addFlat = async () => {
    try {
      await setDoc(doc(db, "flats", uuidv4()), flatData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TextField
        id="filled-basic"
        name="city"
        type="text"
        label="City"
        variant="filled"
        onChange={handleInput}
      />
      <TextField
        id="filled-basic"
        name="street"
        type="text"
        label="Street"
        variant="filled"
        onChange={handleInput}
      />
      <TextField
        id="filled-basic"
        name="number"
        type="text"
        label="Number"
        variant="filled"
        onChange={handleInput}
      />
      <TextField
        id="filled-basic"
        name="price"
        type="text"
        label="Price"
        variant="filled"
        onChange={handleInput}
      />
      <TextField
        id="filled-basic"
        name="areasize"
        type="text"
        label="Area size"
        variant="filled"
        onChange={handleInput}
      />
      <br />
      <Button onClick={addFlat}>Add Flat</Button>
    </>
  );
};

export default AddFlat;
