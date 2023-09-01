import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:9990/users";

export default function useFetchUser(urlTail = "") {
  // states:
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // functions:
  const getData = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(BASE_URL + urlTail);
      setData(res.data);
    } catch (error) {
      setError(error.response.data.message);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [urlTail]);

  // useEffects:
  useEffect(() => {
    getData();
  }, [getData]);

  return { data, reload: getData, error, setError, isLoading };
}
