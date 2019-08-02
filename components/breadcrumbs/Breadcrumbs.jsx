import { useState } from "react";
import axios from "axios";

const Breadcrumbs = () => {
  const [links, setLinks] = useState([]);
  const last = links.length - 1;

  let sector = 'Mining';
  let year = 2018;
  let type = 'group';
  let id = 3;

  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);

    sector = urlParams.get('sector');
    year = urlParams.get('year');
    type = urlParams.get('type');
    id = urlParams.get('id');
  }

  const f = (ancestors, attributes) => {
    const first = ancestors[0];

    if (first) {
      const type = first.type;
      const id = first.id;

      const name = attributes[type][id].name;
      const href = `?sector=${sector}&year=${year}&type=${type.toLowerCase()}&id=${id}`;

      return f(first.ancestors, attributes).concat({ name, href });
    } else {
      return [];
    }
  };

  axios.get(`http://localhost:3000/ancestry/${type}/${id}`)
    .then(function (response) {
      const d = response.data;
      const bar = f(d.ancestors, d.attributes);

      setLinks(bar);
    })

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
