export default (date) => {
  const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gm;
  const [_, month, day] = date.split("-").map(Number);
  const regexIsValid = regex.test(date);
  if (month === 2 && day > 28 && regexIsValid) {
    return false;
  }
  return regexIsValid;
};
