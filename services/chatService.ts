// services/chatService.ts
export async function sendChatQuery(
  query: string,
  token: string
): Promise<any> {
  // Read the API URL from an environment variable
  const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";
  const response = await fetch(`${apiUrl}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch chat response");
  }

  return response.json();
}

export const clearChatHistory = async (token: string) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";
  const response = await fetch(`${apiUrl}/chat/clear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to clear chat history");
  }
};
