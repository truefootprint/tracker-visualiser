import { useState } from "react";

const Breadcrumbs = ({ ancestry, setMember }) => {
  const attributes = ancestry.attributes;

  const handleClick = (node) => {
    return () => {
      setMember({ type: node.type.toLowerCase(), id: node.id });
    };
  };

  const paths = (ancestors) => (
    ancestors.map(({ type, id, ancestors }) => {
      const attr = attributes[type][id];
      const name = attr.name;
      const node = { type, id, name };

      if (ancestors.length === 0) {
        return [node];
      } else {
        return paths(ancestors).flatMap(p => [...p, node]);
      }
    })
  );

  const divider = <span className="divider"> &gt; </span>;

  const breadcrumb = (node, index, array) => {
    const showDivider = index < array.length - 1;

    return (
      <span key={index} className="breadcrumb">
        <a onClick={handleClick(node)}>{node.name}</a>
        {showDivider && divider}
      </span>
    );
  };

  const breadcrumbs = (path, index) => (
    <div key={index} className="breadcrumbs">
      {path.map(breadcrumb)}
    </div>
  );

  return (
    <div className="breadcrumbs_collection">
      {paths(ancestry.ancestors).map(breadcrumbs)}
    </div>
  );
};

export default Breadcrumbs;
