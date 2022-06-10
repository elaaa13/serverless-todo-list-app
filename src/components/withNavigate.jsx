import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const withNavigate = (Component) => (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return <Component {...props} navigate={navigate} id={id} />;
};

export default withNavigate;
