#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

// Récupérer le nom du projet depuis les arguments
const projectName = process.argv[2] || "my-rubaine-project";

// Utiliser degit pour cloner le template
try {
  console.log(`Creating project: ${projectName}...`);
  execSync(
    `npx degit Rubaine/vite-react-typescript-template/template ${projectName}`,
    { stdio: "inherit" }
  );

  console.log(`\nProject created successfully!`);
  console.log(`\nNext steps:`);
  console.log(`  cd ${projectName}`);
  console.log(`  npm install`);
  console.log(`  npm run dev`);
} catch (error) {
  console.error("Error creating project:", error.message);
  process.exit(1);
}
