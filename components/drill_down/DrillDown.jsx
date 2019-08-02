import { useState } from "react";
import axios from "axios";

const DrillDown = () => {
  const [links, setLinks] = useState([]);

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

  axios.get(`http://localhost:3000/ancestry/${type}/${id}`)
    .then(function (response) {
      const d = response.data;


      const bar = d.children.map(({ type, id }) => {
        const name = d.attributes[type][id].name;
        const href = `?sector=${sector}&year=${year}&type=${type.toLowerCase()}&id=${id}`;

        return { name, href };
      });


      setLinks(bar);
    })

  return <nav>
    {links.map((l, i) => <div key={i}><a href={l.href}>{l.name}</a></div>)}
  </nav>;
};

export default DrillDown;
