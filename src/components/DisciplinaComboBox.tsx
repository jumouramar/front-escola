import { useInscricaoStore } from "../store/EnrollmentStore";
import useDisciplinas from "../hooks/useDisciplinas";

export function DisciplinaComboBox() {
  const { disciplinaIdSelecionada, setDisciplinaIdSelecionada } =
    useInscricaoStore();

  const { data: disciplinas, isLoading, error } = useDisciplinas();

  if (isLoading) return <div>Carregando disciplinas...</div>;
  if (error) return <div>Erro ao carregar disciplinas.</div>;

  return (
    <select
      className="select-box2"
      value={disciplinaIdSelecionada ?? ""}
      onChange={(e) =>
        setDisciplinaIdSelecionada(
          e.target.value ? Number(e.target.value) : null
        )
      }
    >
      <option value="">Selecione uma disciplina</option>
      {disciplinas?.map((d) => (
        <option key={d.id} value={d.id}>
          {d.nome}
        </option>
      ))}
    </select>
  );
}
