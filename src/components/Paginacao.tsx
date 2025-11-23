import { useInscricaoStore } from "../store/EnrollmentStore";
import { useAlunosInscritos } from "../hooks/useAlunosInscritos";

export function Paginacao() {
  const {
    turmaIdSelecionada,
    filtroPesquisa,
    paginaAtual,
    tamanhoPagina,
    setPaginaAtual,
  } = useInscricaoStore();

  const { data: alunosInscritos } = useAlunosInscritos(turmaIdSelecionada);

  const filtrados =
    alunosInscritos?.filter((a) =>
      a.nome.toLowerCase().includes(filtroPesquisa.toLowerCase())
    ) ?? [];

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / tamanhoPagina));

  const podeVoltar = paginaAtual > 1;
  const podeAvancar = paginaAtual < totalPaginas;

  if (!turmaIdSelecionada) {
    return <></>;
  }

  return (
    <div style={{ marginTop: 8 }}>
      <button
        disabled={!podeVoltar}
        onClick={() => setPaginaAtual(paginaAtual - 1)}
      >
        Anterior
      </button>
      <span style={{ margin: "0 8px" }}>
        {paginaAtual} de {totalPaginas}
      </span>
      <button
        disabled={!podeAvancar}
        onClick={() => setPaginaAtual(paginaAtual + 1)}
      >
        Próxima
      </button>
    </div>
  );
}
