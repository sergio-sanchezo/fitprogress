import { getIdToken } from "../services/firebase";

export const getHeaders = async () => {
  const token = await getIdToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const handleResponse = async (response: Response) => {
  const text = await response.text();

  // If there's no content, return null (or you could return {} if that fits your use case)
  if (!text) {
    if (!response.ok) {
      throw new Error("Empty response and status code indicates error");
    }
    return null;
  }

  try {
    const result = JSON.parse(text);
    if (!response.ok) {
      throw new Error(result.message || "An error occurred");
    }
    return result;
  } catch (error) {
    console.error("JSON Parse error. Response was not JSON.", error);
    throw new Error("Failed to parse response as JSON");
  }
};
