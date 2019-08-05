import { useState } from "react";

const DrillDown = ({ ancestry, setMember }) => {
  const attributes = ancestry.attributes;

  const handleClick = (node) => {
    return () => {
      setMember({ type: node.type.toLowerCase(), id: node.id });
    };
  }

  const children = ancestry.children.map(({ type, id }) => {
    const attr = attributes[type][id];
    const name = attr.name;

    return { type, id, name };
  });

  const link = (child, index) => (
    <a key={index} className="link" onClick={handleClick(child)}>
      {child.name}
    </a>
  );

  return (
    <div className="drill_down">
      {children.map(link)}
    </div>
  );
};

export default DrillDown;
