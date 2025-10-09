import { useQuery } from "@tanstack/react-query";

const listarInscricoes = async () => {
  const resp = await fetch("http://localhost:8080/inscricoes");
  if (!resp.ok) {
    throw new Error("Erro ao listar inscricoes. Status: " + resp.status);
  }
  return await resp.json();
};

const useListarInscricoes = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["inscricoes"],
    queryFn: listarInscricoes,
    enabled,
  });
};

export default useListarInscricoes;
