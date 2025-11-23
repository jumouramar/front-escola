import { useQuery } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Student";

export function useAlunosNaoInscritos(turmaId: number | null) {
  return useQuery<Aluno[]>({
    queryKey: ["alunos-nao-inscritos", turmaId],
    enabled: !!turmaId,
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8080/turmas/${turmaId}/alunos-nao-inscritos`
      );

      if (!response.ok) {
        console.error(
          "Erro HTTP ao buscar alunos não inscritos:",
          response.status
        );
        const text = await response.text();
        console.error("Corpo do erro:", text);
        throw new Error(
          `Erro ao buscar alunos não inscritos (status ${response.status})`
        );
      }

      const data = await response.json();
      return data;
    },
  });
}
