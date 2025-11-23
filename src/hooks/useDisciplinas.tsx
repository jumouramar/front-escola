import { useQuery } from "@tanstack/react-query";
import type { Disciplina } from "../interfaces/Subject";

const getSubjects = async (): Promise<Disciplina[]> => {
  const resp = await fetch("http://localhost:8080/disciplinas");
  if (!resp.ok) {
    throw new Error("Erro ao listar disciplinas. Status: " + resp.status);
  }
  return (await resp.json()) as Disciplina[];
};

export default function useDisciplinas(enabled: boolean = true) {
  return useQuery<Disciplina[]>({
    queryKey: ["disciplinas"],
    queryFn: getSubjects,
    enabled,
  });
}
