import { useMutation } from "@tanstack/react-query";

type NovoUsuario = {
  nome: string;
  email: string;
  senha: string;
};

const cadastrarUsuario = async (usuario: NovoUsuario) => {
  const resp = await fetch("http://localhost:8080/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  if (!resp.ok) {
    throw new Error("Erro ao cadastrar usuário. Status: " + resp.status);
  }

  return await resp.json();
};

const useRegisterUser = () => {
  return useMutation({
    mutationFn: (usuario: NovoUsuario) => cadastrarUsuario(usuario),
  });
};

export default useRegisterUser;
