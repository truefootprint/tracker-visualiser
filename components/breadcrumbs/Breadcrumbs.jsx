import { useState } from "react";
import css from "./styles.scss";

const Breadcrumbs = ({ ancestry, sector, current, setMember }) => {
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

  const divider = <span className={css.divider}> &gt; </span>;

  const breadcrumb = (node, index) => (
    <span key={index} className={css.breadcrumb}>
      <a onClick={handleClick(node)}>{node.name}</a>{divider}
    </span>
  );

  const topLevel = <>
    <span className={css.breadcrumb}>
      <a>Home</a>{divider}
      <a>{sector}</a>{divider}
    </span>
  </>;

  const bottomLevel = (
    <span className={css.current}>{current}</span>
  );

  const breadcrumbs = (path, index) => (
    <div key={index} className={css.breadcrumbs}>
      {topLevel}
      {path.map(breadcrumb)}
      {bottomLevel}
    </div>
  );

  return (
    <div className={css.breadcrumbs_collection}>
      {paths(ancestry.ancestors).map(breadcrumbs)}
    </div>
  );
};

export default Breadcrumbs;
