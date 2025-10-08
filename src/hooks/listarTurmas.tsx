import { useQuery } from "@tanstack/react-query";

const listarTurmas = async () => {
  const resp = await fetch("http://localhost:8080/turmas");
  if (!resp.ok) {
    throw new Error("Erro ao listar turmas. Status: " + resp.status);
  }
  return await resp.json();
};

const useListarTurmas = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["turmas"],
    queryFn: listarTurmas,
    enabled,
  });
};

export default useListarTurmas;
