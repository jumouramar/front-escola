import { useMutation, useQueryClient } from "@tanstack/react-query";
import useTokenStore from "../store/TokenStore";

const useRemoverAluno = () => {
  const queryClient = useQueryClient();
  const token = useTokenStore((s) => s.tokenResponse.token);

  const removerAluno = async (id: string | number) => {
    const resp = await fetch(`http://localhost:8080/alunos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      throw new Error("Erro ao remover aluno. Status: " + resp.status);
    }
  };

  return useMutation({
    mutationFn: (id: string | number) => removerAluno(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
    },
  });
};

export default useRemoverAluno;
