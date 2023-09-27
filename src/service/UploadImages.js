import axios from "axios";

export const uploadImages = (files) => {
  let images = [];

  const uploaders = Array.from(files).map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", `codeinfuse, medium, gist`);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append("timestamp", (Date.now() / 1000) | 0);

    return axios
      .post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
      .then((response) => {
        const data = response.data;
        const imageURL = data.secure_url;
        images.push(imageURL);
      });
  });

  axios.all(uploaders);

  if (images.length == files.length) return images;
};
