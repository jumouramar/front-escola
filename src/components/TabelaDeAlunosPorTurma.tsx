import { useInscricaoStore } from "../store/EnrollmentStore";
import { useAlunosInscritos } from "../hooks/useAlunosInscritos";

export function TabelaDeAlunosPorTurma() {
  const { turmaIdSelecionada, filtroPesquisa, paginaAtual, tamanhoPagina } =
    useInscricaoStore();

  const {
    data: alunosInscritos,
    isLoading,
    error,
  } = useAlunosInscritos(turmaIdSelecionada);

  if (!turmaIdSelecionada) {
    return <div>Nenhuma turma selecionada.</div>;
  }

  if (isLoading) return <div>Carregando alunos inscritos...</div>;
  if (error) return <div>Erro ao carregar alunos inscritos.</div>;

  const filtrados =
    alunosInscritos?.filter((a) =>
      a.nome.toLowerCase().includes(filtroPesquisa.toLowerCase())
    ) ?? [];

  const inicio = (paginaAtual - 1) * tamanhoPagina;
  const fim = inicio + tamanhoPagina;
  const pagina = filtrados.slice(inicio, fim);

  return (
    <>
      <table className="default-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {pagina.length === 0 ? (
            <tr>
              <td colSpan={2}>Nenhum aluno encontrado.</td>
            </tr>
          ) : (
            pagina.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.nome}</td>
                <td>{a.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
