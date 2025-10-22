import { useMemo, useState } from "react";
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

export default function TurmasSearchPage() {
  const { data, isLoading, error } = useListarTurmas();

  const [texto, setTexto] = useState<string>(""); // hook de estado do componente

  const turmasFiltradas = useMemo(() => {
    // hook que guarda o calculo / só recalcula o resultado quando data ou texto mudarem
    if (!texto) return [];
    return data.filter((turma: Turma) => String(turma.id).includes(texto));
  }, [data, texto]);

  if (isLoading) return <p>Carregando turmas...</p>;
  if (error) return <p>Erro: {(error as Error).message}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 15 }}>Buscar</h3>

      <div style={{ marginBottom: 12 }}>
        <input
          className="search-box"
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite o ID da turma"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 4fr", gap: 16 }}>
        <div>
          <h4>Turmas</h4>

          {texto.length == 0 ? (
            <p>
              Digite o código na barra de pesquisa para encontrar uma turma.
            </p>
          ) : turmasFiltradas.length == 0 ? (
            <p>Nenhuma turma encontrada.</p>
          ) : (
            <table className="default-table">
              <tbody>
                {turmasFiltradas.map((turma: Turma) => (
                  <tr key={turma.id} style={{ cursor: "pointer" }}>
                    <td>{turma.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
