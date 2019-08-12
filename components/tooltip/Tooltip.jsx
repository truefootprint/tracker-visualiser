import { useEffect, useRef } from "react";
import css from "./styles.scss";

const Tooltip = ({ content }) => {
  const tooltip = useRef(null);

  useEffect(() => {
    window.onmousemove = (event) => {
      if (!tooltip.current || !tooltip.current.clientHeight) {
        return;
      }

      const x = event.clientX + 10;
      const y = event.clientY - tooltip.current.clientHeight - 10;

      tooltip.current.style.left = `${x}px`;
      tooltip.current.style.top = `${y}px`;
    }
  }, []);

  return <>
    {content && <div ref={tooltip} className={css.tooltip}>
      {content}
    </div>}
  </>;
};

export default Tooltip;
