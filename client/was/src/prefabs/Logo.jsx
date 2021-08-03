import React from "react";

export default function Logo() {
  return (
    <div className="logo__wrapper">
      <div className="logo__wrapper--left">
        <img alt="" src="./icons/logo.png" className="logo__image" />
      </div>
      <div className="logo__wrapper--right">
        <h2 className="logo__title">Write and Share</h2>
        <span className="logo__phrase">Пиши и делись!</span>
      </div>
    </div>
  );
}
