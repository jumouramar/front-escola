import { useInscricaoStore } from "../store/EnrollmentStore";
import { useAlunosNaoInscritos } from "../hooks/useAlunosNaoInscritos";

export function AlunoComboBox() {
  const { turmaIdSelecionada, alunoIdSelecionado, setAlunoIdSelecionado } =
    useInscricaoStore();

  const {
    data: alunos,
    isLoading,
    error,
  } = useAlunosNaoInscritos(turmaIdSelecionada);

  if (!turmaIdSelecionada) {
    return <div>Selecione uma turma primeiro.</div>;
  }

  if (isLoading) return <div>Carregando alunos...</div>;
  if (error) return <div>Erro ao carregar alunos.</div>;

  return (
    <select
      className="select-box2"
      value={alunoIdSelecionado ?? ""}
      onChange={(e) =>
        setAlunoIdSelecionado(e.target.value ? Number(e.target.value) : null)
      }
    >
      <option value="">Selecione um aluno</option>
      {alunos?.map((a) => (
        <option key={a.id} value={a.id}>
          {a.nome}
        </option>
      ))}
    </select>
  );
}
