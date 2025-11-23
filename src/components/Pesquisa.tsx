import { useInscricaoStore } from "../store/EnrollmentStore";

export function Pesquisa() {
  const { filtroPesquisa, setFiltroPesquisa } = useInscricaoStore();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 15,
        marginBottom: 20,
      }}
    >
      <h4 style={{ margin: 0 }}>Pesquisa</h4>
      <input
        className="select-box"
        type="text"
        placeholder="Informe o nome do aluno..."
        value={filtroPesquisa}
        onChange={(e) => setFiltroPesquisa(e.target.value)}
      />
    </div>
  );
}
