#!/usr/bin/env node
import { intro, outro, select, isCancel, cancel, text } from "@clack/prompts";
import color from "picocolors";
import { viteReact } from "./frontend";

intro(`${color.cyan("⚡ devstack")} — fullstack project wizard`);

const framework = await select({
  message: "Choose a frontend framework",
  options: [
    { label: "React + Vite", value: "react-vite" },
    { label: "Next.js", value: "next" },
    // { label: "Quit", value: null },
  ],
});

const packageManager = await select({
  message: "Which package manager would you like to use?",
  options: [
    { label: "npm", value: "npm" },
    { label: "yarn", value: "yarn" },
    { label: "pnpm", value: "pnpm" },
  ],
});

const projectName = await text({
  message: "What is your project named?",
  placeholder: "my-app",
  validate: (val) => (val.length ? undefined : "Please enter a name"),
});

switch (framework) {
  case "react-vite":
    viteReact(projectName, packageManager);
    break;

  default:
    break;
}

// if (isCancel(framework)) {
//   cancel("Operation cancelled.");
//   process.exit(0);
// }
