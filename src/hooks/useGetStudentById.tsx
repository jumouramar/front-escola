import { useQuery } from "@tanstack/react-query";
import type { Aluno } from "../interfaces/Student";

const getStudent = async (id: string): Promise<Aluno> => {
  const response = await fetch(`http://localhost:8080/alunos/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar aluno. Status code: " + response.status);
  }
  return (await response.json()) as Aluno;
};

export default function useGetStudent(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["alunos", id],
    queryFn: () => getStudent(id),
    enabled,
  });
}
