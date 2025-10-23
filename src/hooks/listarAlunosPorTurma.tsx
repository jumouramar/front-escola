import { useQuery } from "@tanstack/react-query";

const listarAlunosPorTurma = async (turmaId: string | number) => {
  const resp = await fetch(
    `http://localhost:8080/alunos?turmaId=${String(turmaId)}`
  );

  if (!resp.ok) {
    throw new Error("Erro ao listar alunos por turma. Status: " + resp.status);
  }

  return await resp.json();
};

const useListarAlunosPorTurma = (
  turmaId: string | number | null | undefined,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["alunos", "turma", turmaId],
    queryFn: () => listarAlunosPorTurma(turmaId as string | number),
    enabled:
      enabled &&
      turmaId !== null &&
      turmaId !== undefined &&
      String(turmaId).trim() !== "",
  });
};

export default useListarAlunosPorTurma;
