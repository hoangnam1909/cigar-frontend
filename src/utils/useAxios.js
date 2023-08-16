import { useEffect } from "react";
import { useState } from "react";
import API from "~/api/API";

export default ({ url, method, data, options }) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setError("");

    (async () => {
      let response = null;

      if (method.toLowerCase() === "get".toLowerCase()) {
        response = await API()[method](url, options);
      } else {
        response = await API()[method](url, data, options);
      }

      setIsLoading(false);

      if (response.status === 200) {
        setIsSuccess(true);
        setIsError(false);
        setError("");
        setResult(response.data);
      } else {
        setIsSuccess(false);
        setIsError(true);
        setError(response.error.message);
        setResult(null);
      }
    })();
  }, []);

  return [result, { isLoading, isSuccess, isError, error }];
};
