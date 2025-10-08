import { useQuery } from "@tanstack/react-query";

const listarAlunos = async () => {
  const resp = await fetch("http://localhost:8080/alunos");
  if (!resp.ok) {
    throw new Error("Erro ao listar alunos. Status: " + resp.status);
  }
  return await resp.json();
};

const useListarAlunos = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["alunos"],
    queryFn: listarAlunos,
    enabled,
  });
};

export default useListarAlunos;
