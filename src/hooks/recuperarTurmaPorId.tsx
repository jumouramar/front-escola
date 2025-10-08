import { useQuery } from "@tanstack/react-query";

const recuperarTurmaPorId = async (id: number | string) => {
  const resp = await fetch(`http://localhost:8080/turmas/${id}`);
  if (!resp.ok) {
    throw new Error(
      `Erro ao recuperar a turma com id = ${id}. Status: ${resp.status}`
    );
  }
  return await resp.json();
};

const useRecuperarTurmaPorId = (
  id?: number | string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["turmas", id],
    queryFn: () => recuperarTurmaPorId(id as number | string),
    enabled: enabled && id !== undefined && id !== null && id !== "",
  });
};

export default useRecuperarTurmaPorId;
