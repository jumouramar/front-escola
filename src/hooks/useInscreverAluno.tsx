import { useMutation, useQueryClient } from "@tanstack/react-query";

type Payload = {
  turmaId: number;
  alunoId: number;
};

export function useInscreverAluno() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ turmaId, alunoId }: Payload) => {
      const response = await fetch(`http://localhost:8080/inscricoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          turma: { id: turmaId },
          aluno: { id: alunoId },
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao inscrever aluno");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (_data, { turmaId }) => {
      queryClient.invalidateQueries({
        queryKey: ["alunos-inscritos", turmaId],
      });

      queryClient.invalidateQueries({
        queryKey: ["alunos-nao-inscritos", turmaId],
      });
    },
  });
}
