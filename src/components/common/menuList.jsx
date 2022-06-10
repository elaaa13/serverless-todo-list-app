import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const MenuList = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sxList = {
    py: 30 / 8,
    pl: 35 / 8,
    pr: 1,
  };

  const sxListItemButton = {
    px: 0,
    py: 0.5,
  };

  return (
    <List sx={sxList}>
      {data.map((item) => (
        <ListItemButton
          selected={location.pathname === item.path}
          key={item._id}
          onClick={() => {
            navigate(item.path);
            navigate(0);
          }}
          sx={sxListItemButton}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default MenuList;
