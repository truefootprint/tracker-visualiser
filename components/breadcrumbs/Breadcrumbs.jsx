const Breadcrumbs = ({ links }) => {
  const last = links.length - 1;

  return (
    <div>
      {links.map((l, i) => (
        <span key={i}>
          <a href={l.href}>{l.name}</a>
          {i < last && <span> &gt; </span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
