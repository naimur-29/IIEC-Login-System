import { useState, useEffect, useCallback } from "react";

const BASE_URL = "http://127.0.0.1:9990/users";

const useGetManyUsers = (urlTail = "") => {
  // states:
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // functions:
  const getData = useCallback(async () => {
    setIsLoading(true);

    try {
      let res = await fetch(BASE_URL + urlTail);
      res = await res.json();
      setData(res);
    } catch (error) {
      setError(error.message);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [urlTail]);

  // useEffects:
  useEffect(() => {
    getData();
  }, [getData]);

  return { data, reload: getData, error, isLoading };
};

export default useGetManyUsers;
