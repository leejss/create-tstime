import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectName = process.argv[2];

  if (!projectName) {
    console.error("Project name is required");
    process.exit(1);
  }

  const projectPath = path.resolve(process.cwd(), projectName);

  // validate project path

  if (fs.existsSync(projectPath)) {
    console.error(`The project ${projectName} already exists`);
    process.exit(1);
  }

  // mkdir project and copy template files
  fs.mkdirSync(projectPath);
  const templateDir = path.join(__dirname, "..", "template");

  // cp
  fs.cpSync(templateDir, projectPath, {
    recursive: true,
  });

  // Print success message
  console.log(`Project ${projectName} created at ${projectPath}`);
}
main();
