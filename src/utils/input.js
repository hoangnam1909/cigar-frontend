export const numberInputOnly = (value) => {
  const re = /^[0-9]*$/;
  if (value === "" || re.test(value)) {
    return true;
  }
  return false;
};

export const nameNormalization = (str) => {
  let arr = str.trim().replace(/\s\s+/g, " ").split(" ");

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  console.log(str2);
  return str2;
};
