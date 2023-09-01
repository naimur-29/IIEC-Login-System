import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:9990/auth";

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const action = async (formData, tailUrl) => {
    setIsLoading(true);

    try {
      const res = await axios.post(BASE_URL + tailUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.message) {
        setResponse(res.data.message);
        setIsLoading(false);
        return true;
      } else setError("Unexpected error!");
    } catch (error) {
      setError(error.response.data.message);
    }

    setIsLoading(false);
  };

  return { action, isLoading, response, setResponse, error, setError };
}
