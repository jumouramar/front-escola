import { useInscricaoStore } from "../store/EnrollmentStore";
import { useTurmasPorDisciplina } from "../hooks/useTurmasPorDisciplina";

export function TurmaComboBox() {
  const { disciplinaIdSelecionada, turmaIdSelecionada, setTurmaIdSelecionada } =
    useInscricaoStore();

  const {
    data: turmas,
    isLoading,
    error,
  } = useTurmasPorDisciplina(disciplinaIdSelecionada);

  if (!disciplinaIdSelecionada) {
    return <div>Selecione uma disciplina primeiro.</div>;
  }

  if (isLoading) return <div>Carregando turmas...</div>;
  if (error) return <div>Erro ao carregar turmas.</div>;

  return (
    <select
      className="select-box2"
      value={turmaIdSelecionada ?? ""}
      onChange={(e) =>
        setTurmaIdSelecionada(e.target.value ? Number(e.target.value) : null)
      }
    >
      <option value="">Selecione uma turma</option>
      {turmas?.map((t) => (
        <option key={t.id} value={t.id}>
          {t.id} - {t.periodo} - {t.professor?.nome}
        </option>
      ))}
    </select>
  );
}
