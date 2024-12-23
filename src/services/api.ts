import axios from "axios";

const api = axios.create({
  baseURL: "https://6766bc15410f8499965871a9.mockapi.io/spt",
});

export const registerUser = async (username: string, password: string, email: string) => {
  try {
    const response = await api.post("/users", { username, password, email });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao registrar usuário.");
  }
};
export default api;


