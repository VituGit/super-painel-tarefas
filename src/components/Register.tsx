import { useState } from "react";
import api from "../services/api";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      const response = await api.post("/users", {
        username,
        password,
        email,
      });
      alert(response.data);
      alert("Usuário registrado com sucesso!");
      console.log("Usuário criado:", response.data);
      setUsername("");
      setPassword("");
      setEmail("");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert("Erro ao registrar. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Registrar</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-2"
      />
      <button
        onClick={handleRegister}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Registrar
      </button>
    </div>
  );
};

export default Register;
