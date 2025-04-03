import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const UpdateUserComponent = () => {
  const [data, setData] = useState<DocumentData | null>(null);
  const [newData, setNewData] = useState<string>("");
  async function updateData() {
    try {
      await updateDoc(docReg, { lastName: newData });
      setData((prev) =>
        prev ? { ...prev, test: newData } : { test: newData }
      );
    } catch (error) {
      console.log(error);
    }
  }
  function deleteData() {}
  useEffect(() => {
    async function getData() {
      const docSnap = await getDoc(docReg);
      if (docSnap.exists()) {
        setData(docSnap.data());
        console.log(data);
      }
    }
    getData();
  }, []);
  const docReg = doc(db, "Users", "fOLstAo8M3VYZKf6fBXouAbmQqy1");

  return (
    <div>
      <input
        type="text"
        value={newData}
        onChange={(e) => setNewData(e.target.value)}
      ></input>
      <button onClick={updateData}>Set</button>
      <button onClick={deleteData}>Delete</button>
    </div>
  );
};

export default UpdateUserComponent;
