import { useState } from "react";
import css from "./styles.scss";

const Breadcrumbs = ({ ancestry, sector, above, below, current, setSubject }) => {
  const attributes = ancestry.attributes;

  const visitHome = () => setSubject({ type: "group", id: 1 });

  const handleClick = (node) => {
    return () => {
      setSubject({ type: node.type.toLowerCase(), id: node.id });
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

  const topLevel = (
    <span className={css.breadcrumb}>
      <a onClick={visitHome}>Home</a>{divider}
      <a onClick={visitHome}>{sector}</a>{divider}
      {above && <>
        <a onClick={handleClick(above)}>{above.name}</a>{divider}
      </>}
    </span>
  );

  const bottomLevel = (
    <span className={css.breadcrumb}>
      {below && <>
        <a onClick={handleClick(below)}>{below.name}</a>{divider}
      </>}
      <span className={css.current}>{current}</span>
    </span>
  );

  const breadcrumbs = (path, index) => (
    <div key={index} className={css.breadcrumbs}>
      {topLevel}
      {path.map(breadcrumb)}
      {bottomLevel}
    </div>
  );

  // We still want to render the Home > Mining > ESG breadcrumbs when there are
  // no ancestors (i.e. we are at the top level).
  const p = paths(ancestry.ancestors);
  if (p.length === 0) {
    return (
      <div className={css.breadcrumbs_collection}>
        <div className={css.breadcrumbs}>
          {topLevel}
          {bottomLevel}
        </div>
      </div>
    );
  }

  return (
    <div className={css.breadcrumbs_collection}>
      {p.map(breadcrumbs)}
    </div>
  );
};

export default Breadcrumbs;
