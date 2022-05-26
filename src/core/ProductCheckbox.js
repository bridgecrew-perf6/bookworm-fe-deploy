import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { styled } from "@mui/material/styles";

const ListItemButtonCustom = styled(ListItemButton)(() => ({
  paddingLeft: "10px",
  paddingTop: "0px",
}));

function ProductCheckbox({ categories, handleFilters }) {
  const [checked, setChecked] = useState([]);

  const handleToggle = (category) => () => {
    // Return the firs index or -1(if not exist)
    const currentCategoryIndex = checked.indexOf(category);
    const newChecked = [...checked];

    // Kalau ga exist maka di push
    if (currentCategoryIndex === -1) {
      newChecked.push(category);
    } else {
      // Kalau sudah exist, maka dihapus
      newChecked.splice(currentCategoryIndex, 1);
    }

    setChecked(newChecked);
    handleFilters(newChecked);
  };

  // console.log(checked);

  const categoriesCheckbox = () => {
    return categories.map((category, i) => {
      const labelId = `checkbox-list-label-${category.name}`;

      return (
        <ListItem key={i} disablePadding>
          <ListItemButtonCustom
            role={undefined}
            onClick={handleToggle(category)}
            dense
          >
            <Checkbox
              edge="start"
              // untuk mengecek apa yang di tick
              // kalau input biasa pakenya:
              // <input value={checked.indexOf(category) !== -1}/>
              checked={checked.indexOf(category) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": labelId }}
            />
            <ListItemText id={labelId} primary={category.name} />
          </ListItemButtonCustom>
        </ListItem>
      );
    });
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {categoriesCheckbox()}
    </List>
  );
}

export default ProductCheckbox;
