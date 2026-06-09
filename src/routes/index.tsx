import { createFileRoute } from "@tanstack/react-router";
import { App } from "@/components/game/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Corpo Bem Cuidado — Atividade EF01CI03" },
      {
        name: "description",
        content:
          "Jogo de tabuleiro digital sobre hábitos de higiene e saúde para o 1º ano do Ensino Fundamental, alinhado à BNCC EF01CI03.",
      },
      { property: "og:title", content: "Corpo Bem Cuidado" },
      {
        property: "og:description",
        content:
          "Ajude Nina a cuidar do corpo durante o dia em um jogo de tabuleiro educativo.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <App />;
}
