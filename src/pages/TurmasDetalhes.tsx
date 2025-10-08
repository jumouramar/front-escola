import { useParams } from "react-router-dom";
import useRecuperarTurmaPorId from "../hooks/recuperarTurmaPorId";

export default function TurmaDetalhePage() {
  const { id } = useParams();
  const { data, isLoading, error } = useRecuperarTurmaPorId(id);

  if (isLoading) return <p>Carregando turma...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;

  return (
    <div>
      <h2>Turma {data?.nome}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
