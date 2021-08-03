import React from "react";

import { Link, useRouteMatch } from "react-router-dom";
export default function AsideLink(props) {
  let isActive = (useRouteMatch(props.to)) ? "col__link__active" : "";

  return (
    <Link className={"col__link " + isActive} to={props.to}>
      <img alt="" src={props.icon} className="col__link__image" />
      <span className="col__link__text">{props.text}</span>
    </Link>
  );
}
