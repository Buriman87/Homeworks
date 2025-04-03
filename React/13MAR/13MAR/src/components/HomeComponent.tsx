import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import React from "react";
import { blue } from "@mui/material/colors";

const HomeComponent = () => {
  //   const navigate = useNavigate();
  //   const [searchParams] = useSearchParams();
  //   const query = searchParams.get("id");
  //   const query2 = searchParams.get("nume");

  const [selected, setSelected] = React.useState(false);
  console.log(blue);
  return (
    <>
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => setSelected((prevSelected) => !prevSelected)}
      >
        <CheckIcon sx={{ color: blue[700] }} />
      </ToggleButton>
      Home Component
      {/* <ul>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul> */}
      {/* <button onClick={() => navigate("/chjasbdjhasbj")}>Pagina aiurea</button> */}
      {/* {query}
      {query2} */}
    </>
  );
};

export default HomeComponent;
