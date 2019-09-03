import { useEffect, useRef } from "react";
import css from "./styles.scss";

if (typeof window !== "undefined") {
  window.onmousemove = (event) => {
    const tooltips = document.getElementsByClassName(css.tooltip);

    const distanceToEdge = window.innerWidth - event.clientX;
    const mouseOnRightOfScreen = distanceToEdge < 300;

    for (let i = 0; i < tooltips.length; i += 1) {
      const tooltip = tooltips[i];

      let x;

      if (mouseOnRightOfScreen) {
        x = event.clientX - tooltip.clientWidth - 10;
      } else {
        x = event.clientX + 10;
      }

      const y = event.clientY - tooltip.clientHeight - 10;

      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    };
  }
}

const Tooltip = ({ content }) => {
  const tooltip = useRef(null);

  return <>
    {content && <div ref={tooltip} className={css.tooltip}>
      {content}
    </div>}
  </>;
};

export default Tooltip;
