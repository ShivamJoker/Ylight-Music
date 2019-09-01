import React, { useContext } from "react";
import {
  Container,
  FormControl,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Box,
  Typography
} from "@material-ui/core";

import { GlobalContext } from "../GlobalState";

const SettingsPage = () => {
  const { themeSelectValue, setThemeSelectValue } = useContext(GlobalContext);

  const selectComp = (
    <Box m={1}>
      <Select
        value={themeSelectValue}
        onChange={e => setThemeSelectValue(e.target.value)}
        displayEmpty
        name="age"
      >
        <MenuItem value="Default">Default</MenuItem>
        <MenuItem value="Dark">Dark</MenuItem>
        <MenuItem value="Auto">Auto</MenuItem>
      </Select>
    </Box>
  );
  return (
    <Container>
      <br />
      <Typography variant="h5" align="center" gutterBottom>
        Settings
      </Typography>
      <FormControl component="fieldset">
        <FormGroup row>
          <FormControlLabel
            labelPlacement="start"
            label="Select Theme "
            value="top"
            control={selectComp}
          />
        </FormGroup>
      </FormControl>
    </Container>
  );
};
export default SettingsPage;
