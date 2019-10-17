import { useState } from "react";
import css from "./styles.scss";

const DrillDown = ({ ancestry, setSubject }) => {
  const attributes = ancestry.attributes;

  const handleClick = (node) => {
    return () => {
      setSubject({ type: node.type.toLowerCase(), id: node.id });
    };
  }

  const children = ancestry.children.map(({ type, id }) => {
    const attr = attributes[type][id];
    const name = attr.name;

    return { type, id, name };
  });

  const link = (child, index) => (
    <a key={index} className={css.link} onClick={handleClick(child)}>
      {child.name}
    </a>
  );

  return (
    <div className={css.drill_down}>
      {children.map(link)}
    </div>
  );
};

export default DrillDown;
