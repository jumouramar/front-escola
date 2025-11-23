import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import type { Aluno } from "../interfaces/Student";

const cadastrarAluno = async (aluno: Aluno) => {
  const response = await fetch("http://localhost:8080/alunos", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(aluno),
  });

  if (!response.ok) {
    throw new Error(
      "Ocorreu um erro ao cadastrar um aluno. Status code: " + response.status
    );
  }

  return (await response.json()) as Aluno;
};

export default function useCadastrarAluno() {
  return useMutation({
    mutationFn: (aluno: Aluno) => cadastrarAluno(aluno),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alunos"],
        exact: false,
      });
    },
  });
}
