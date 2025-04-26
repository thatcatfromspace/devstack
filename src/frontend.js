import { spinner } from "@clack/prompts";
import { $ } from "execa";
import { installCommands, installPackageJson } from "./constants";
import { copyFile } from "fs/promises";
import { fileURLToPath } from "url";

import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function viteReact(projectName, packageManager) {
  const s = spinner();
  const install = installCommands[packageManager];
  const installGlobal = installPackageJson[packageManager];

  s.start("Scaffolding React project");
  await $`npm create vite@latest ${projectName} -- --template react`;
  process.chdir(projectName);
  await $`${installGlobal}`;
  s.stop("React boilerplate set up!");

  s.start("Installing Tailwind");
  await $`${install} tailwindcss @tailwindcss/vite`;
  s.stop("Tailwind installed!");

  s.start("Configuring Tailwind");
  const srcAppCss = path.join(__dirname, "../lib/react-vite/App.css");
  const destAppCss = path.join(process.cwd(), "src", "App.css");

  const srcViteConfig = path.join(
    __dirname,
    "../lib/react-vite/vite.config.js"
  );
  const destViteConfig = path.join(process.cwd(), "vite.config.js");

  const srcIndexCss = path.join(__dirname, "../lib/react-vite/index.css");
  const destIndexCss = path.join(process.cwd(), "src", "index.css");

  const srcAppJsx = path.join(__dirname, "../lib/react-vite/App.jsx");
  const destAppJsx = path.join(process.cwd(), "src", "App.jsx");

  await copyFile(srcAppCss, destAppCss);
  await copyFile(srcViteConfig, destViteConfig);
  await copyFile(srcIndexCss, destIndexCss);
  await copyFile(srcAppJsx, destAppJsx);

  s.stop("Tailwind configured!");
}
