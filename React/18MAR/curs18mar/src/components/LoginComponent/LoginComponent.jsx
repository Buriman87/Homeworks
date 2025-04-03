import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { countries } from "../../util";
import { useState } from "react";

export const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  //My functions

  function SavingToLocalStorage() {
    const loggedUser = {
      user: username,
      pass: password,
      location: location,
    };
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
  }

  return (
    <>
      <Autocomplete
        id="country-select-demo"
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select your location"
            slotProps={{
              htmlInput: {
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              },
            }}
          />
        )}
        onInputChange={(event, newInputValue) => {
          setLocation(newInputValue);
        }}
      />
      <TextField
        id="filled-basic"
        label="Username"
        variant="filled"
        required
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        id="filled-basic"
        label="Password"
        variant="filled"
        required
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br></br>
      <Button onClick={SavingToLocalStorage} variant="contained">
        Login
      </Button>
    </>
  );
};
