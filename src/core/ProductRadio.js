import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";

const FormControlLabelCustom = styled(FormControlLabel)(() => ({
  paddingLeft: "10px",
}));

export default function ProductRadio({ prices, handleFilters }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  const priceRadio = () => {
    return prices.map((price, i) => {
      return (
        <FormControlLabelCustom
          value={price._id}
          control={<Radio />}
          label={price.name}
        />
      );
    });
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        {priceRadio()}
      </RadioGroup>
    </FormControl>
  );
}
