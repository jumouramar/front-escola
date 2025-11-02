import { useState } from "react";
import useListarTurmas from "../hooks/listarTurmas";

type Professor = {
  id: string | number;
  nome: string;
  email: string;
};

type Disciplina = {
  id: string | number;
  nome: string;
  cargaHoraria: number;
};

type Turma = {
  id: string | number;
  ano: number;
  periodo: string;
  professor: Professor;
  disciplina: Disciplina;
};

export default function ClassManagePage() {
  const [turmaSelecionada, setTurmaSelecionada] = useState<string>("");

  const { data: turmas, isLoading, error } = useListarTurmas();

  if (isLoading) return <p>Carregando turmas...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <h3 style={{ margin: "0 0 0 0" }}>Turma</h3>

        <select
          className="select-box"
          value={turmaSelecionada}
          onChange={(e) => setTurmaSelecionada(e.target.value)}
          style={{ padding: 8, minWidth: 280 }}
        >
          <option value="">Selecione uma turma</option>
          {turmas?.map((turma: Turma) => (
            <option value={turma.id}>
              {turma.id} — {turma.disciplina?.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
