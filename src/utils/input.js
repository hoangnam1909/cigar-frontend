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
  return str2;
};

export const removeVietnameseAccent = (vietnameseString) => {
  let str = vietnameseString;

  str = str.replaceAll(/á|à|ả|ã|ạ|â|ấ|ầ|ẫ|ẩ|ậ|ă|ắ|ằ|ẳ|ẵ|ặ/g, "a");
  str = str.replaceAll(/đ/g, "d");
  str = str.replaceAll(/é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/g, "e");
  str = str.replaceAll(/í|ì|ỉ|ĩ|ị/g, "i");
  str = str.replaceAll(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u");
  str = str.replaceAll(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/g, "o");
  str = str.replaceAll(/ý|ỳ|ỷ|ỹ|ỵ/g, "y");

  return str;
};

export const rewriteUrl = (str) => {
  let url = removeVietnameseAccent(str);
  url = url.toLowerCase().replaceAll(" ", "-");
  return url;
};

export const getIdInRewriteUrl = (rewriteUrl) => {
  return rewriteUrl.substr(rewriteUrl.lastIndexOf("-") + 1);
};
