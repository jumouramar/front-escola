import { useQuery } from "@tanstack/react-query";
import type { Turma } from "../interfaces/Class";

export function useTurmasPorDisciplina(disciplinaId: number | null) {
  return useQuery<Turma[]>({
    queryKey: ["turmas", disciplinaId],
    enabled: !!disciplinaId,
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8080/turmas?disciplinaId=${disciplinaId}`
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar turmas da disciplina.`);
      }

      const data = await response.json();
      return data as Turma[];
    },
  });
}
