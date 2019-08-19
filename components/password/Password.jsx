import { useState, useEffect, useRef } from "react";
import css from "./styles.scss";

const Password = ({ onPassword }) => {
  const input = useRef(null);

  const handleSubmit = () => {
    onPassword(input.current.value);
    return false;
  };

  useEffect(() => {
    input.current && input.current.focus();
  }, [input]);

  return (
    <div className={css.password}>
      <p>Please enter your password to access TrueFootprint Tracker:</p>

      <form onSubmit={handleSubmit}>
        <input type="submit" value="Enter" />
        <input type="password" ref={input} />
      </form>
    </div>
  );
};

export default Password;
