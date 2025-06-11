#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Récupérer le nom du projet depuis les arguments
const projectName = process.argv[2] || "my-rubaine-project";

try {
  console.log(`Creating project: ${projectName}...`);

  // 1. Cloner le template
  execSync(
    `npx degit Rubaine/vite-react-typescript-template/template ${projectName}`,
    { stdio: "inherit" }
  );

  // 2. Télécharger le template.json
  console.log("Setting up package.json...");
  execSync(
    `npx degit Rubaine/vite-react-typescript-template/template.json ${projectName}/template.json`,
    { stdio: "inherit" }
  );

  // 3. Lire et traiter le template.json
  const templateJsonPath = path.join(projectName, "template.json");
  const packageJsonPath = path.join(projectName, "package.json");

  if (fs.existsSync(templateJsonPath)) {
    const templateData = JSON.parse(fs.readFileSync(templateJsonPath, "utf8"));

    // 4. Créer le package.json avec le nom du projet
    const packageJson = {
      ...templateData.package,
      name: projectName,
    };

    // 5. Écrire le package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // 6. Supprimer le template.json temporaire
    fs.unlinkSync(templateJsonPath);
  }

  console.log(`\nProject created successfully!`);
  console.log(`\nNext steps:`);
  console.log(`  cd ${projectName}`);
  console.log(`  npm install`);
  console.log(`  cp .env.example .env`);
  console.log(`  npm run dev`);
} catch (error) {
  console.error("Error creating project:", error.message);
  process.exit(1);
}
