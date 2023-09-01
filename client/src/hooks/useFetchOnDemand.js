import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:9990/records";

export default function useFetchOnDemand() {
  // states:
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState(BASE_URL);

  // functions:
  const getData = async (urlTail) => {
    setIsLoading(true);

    try {
      const res = await axios.get(BASE_URL + urlTail);
      setData(res.data);

      if (res.data) {
        setUrl((prev) => prev + urlTail);
      }
    } catch (error) {
      setError(error.response.data.message);
    }

    setIsLoading(false);
  };

  return { data, setData, action: getData, error, setError, isLoading, url };
}
