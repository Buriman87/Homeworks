import { JSX } from "@emotion/react/jsx-runtime";
import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

interface IUser {
  id: string;
  email: string;
}
export const HomePageComponent: React.FC = (): JSX.Element => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const getData = async () => {
    const query = await getDocs(collection(db, "users"));
    const userList: IUser[] = query.docs.map(
      (el) =>
        ({
          id: el.id,
          ...el.data(),
        } as IUser)
    );
    console.log(userList);
  };
  useEffect(() => {
    getData();
  }, []);
  return <>HomePageComponent</>;
};
