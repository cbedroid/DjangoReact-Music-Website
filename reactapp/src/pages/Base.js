import React from "react";

const Base = (props) => {
  return (
    <section id="main-content" className="pt-20 ">
      {props.children}
    </section>
  )
};

export default Base;
