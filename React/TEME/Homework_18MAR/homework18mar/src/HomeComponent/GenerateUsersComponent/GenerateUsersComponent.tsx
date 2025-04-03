import React, { JSX, useState } from "react";
import Button from "@mui/material/Button";

interface User {
  name: string;
  password: string;
}

interface LocationData {
  [locationName: string]: User[];
}

const locationData: LocationData = {
  Bucuresti: [
    { name: "Gogu", password: "abcd1234" },
    { name: "Mitica", password: "abcd1234" },
    { name: "Dorel", password: "abcd1234" },
  ],
  "Cluj-Napoca": [
    { name: "Gogu", password: "abcd1234" },
    { name: "Mitica", password: "abcd1234" },
    { name: "Dorel", password: "abcd1234" },
  ],
  Timisoara: [
    { name: "Gogu", password: "abcd1234" },
    { name: "Mitica", password: "abcd1234" },
    { name: "Dorel", password: "abcd1234" },
  ],
  Brasov: [
    { name: "Gogu", password: "abcd1234" },
    { name: "Mitica", password: "abcd1234" },
    { name: "Dorel", password: "abcd1234" },
  ],
  Constanta: [
    { name: "Gogu", password: "abcd1234" },
    { name: "Mitica", password: "abcd1234" },
    { name: "Dorel", password: "abcd1234" },
  ],
};

const GenerateUsersComponent: React.FC = (): JSX.Element => {
  const handleGenerateUsers = () => {
    localStorage.setItem("locations", JSON.stringify(locationData));
    if (displayBut) {
      setDisplayBut(false);
    } else {
      setDisplayBut(true);
    }
  };
  const [displayBut, setDisplayBut] = useState(true);
  return (
    <>
      {displayBut ? (
        <div className="flex flex-col items-center mt-10">
          <Button variant="contained" onClick={handleGenerateUsers}>
            Generate Users
          </Button>
        </div>
      ) : (
        <div>haha</div>
      )}
    </>
  );
};

export default GenerateUsersComponent;
