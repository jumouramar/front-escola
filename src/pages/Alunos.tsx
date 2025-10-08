import useListarAlunos from "../hooks/listarAlunos";

type Aluno = {
  id: string;
  nome: string;
  email: string;
};

export default function AlunosPage() {
  const { data, isLoading, error } = useListarAlunos();

  if (isLoading) return <p>Carregando alunos...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 15 }}>Alunos</h3>
      <table className="default-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((aluno: Aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
