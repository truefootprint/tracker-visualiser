const round = (number) => {
  let precision;

  if (number < 1) {
    precision = 100;
  } else if (number < 100) {
    precision = 10;
  } else {
    precision = 1;
  }

  return Math.round(number * precision) / precision;
};

export default round;
