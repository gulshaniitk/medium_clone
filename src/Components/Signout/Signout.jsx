import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signout = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    props.setUser("");
    navigate("/");
  });
};

export default Signout;