import { useEffect } from "react";

let loaded = false;

const History = ({ sector, year, subject, setSector, setYear, setSubject }) => {
  const deepLink = () => {
    const anchor = window.location.hash;

    if (!anchor) {
      return;
    }

    const parts = anchor.substr(1).split("-");
    const [sector, year, type, ...id] = parts;

    setSector(sector);
    setYear(year);
    setSubject({ type, id: id.join("-") });
  };

  if (!loaded) {
    deepLink();
    loaded = true;
  }

  useEffect(() => {
    const anchor = `#${sector}-${year}-${subject.type}-${subject.id}`;

    if (anchor !== history.state.anchor) {
      history.pushState({ sector, year, subject, anchor }, null, anchor);
    }
  }, [sector, year, subject])

  useEffect(() => {
    window.onhashchange = deepLink;
  }, []);

  return null;
};

export default History;
