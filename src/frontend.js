import { spinner } from "@clack/prompts";
import { $ } from "execa";
import { installCommands } from "./constants";

export async function viteReact(projectName, packageManager) {
  const s = spinner();
  const install = installCommands[packageManager];

  s.start("Scaffolding React project... ");
  await $`npm create vite@latest ${projectName} -- --template react`;
  process.chdir(projectName);
//   await $`${install}`;
  s.stop("React boilerplate set up 🪄");

  s.start("Installing TailwindCSS...");
  await $`${install} tailwindcss @tailwindcss/vite`;
  s.stop("Tailwind installed 🪄");
}
