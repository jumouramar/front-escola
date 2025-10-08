import { Link } from "react-router-dom";
import useListarTurmas from "../hooks/listarTurmas";

export default function TurmasPage() {
  const { data, isLoading, error } = useListarTurmas();

  if (isLoading) return <p>Carregando turmas...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;

  return (
    <ul>
      {data?.map((turma: any) => (
        <li key={turma.id}>
          {turma.id} — <Link to={`/turmas/${turma.id}`}>ver detalhes</Link>
        </li>
      ))}
    </ul>
  );
}
