import useListarAlunos from "../hooks/listarAlunos";

export default function AlunosPage() {
  const { data, isLoading, error } = useListarAlunos();

  if (isLoading) return <p>Carregando alunos...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;

  return (
    <ul>
      {data?.map((aluno: any) => (
        <li key={aluno.id}>{aluno.nome}</li>
      ))}
    </ul>
  );
}
