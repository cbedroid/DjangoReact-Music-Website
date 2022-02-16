import React from "react";

const Base = (props) => {
  return (
    <section id="main-section">
      <section id="main-content">
        {props.children}
      </section>
    </section>
  )
};

export default Base;
