#!/usr/bin/env node
import { resolve, join } from 'node:path';
import { existsSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';
import kleur from 'kleur';

// --- Helpers ---
const __dirname = fileURLToPath(new URL('.', import.meta.url));

function copyDir(src: string, dest: string, projectName: string): void {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath, projectName);
    } else {
      // En package.json del template, reemplazamos el placeholder del nombre
      if (entry === '_package.json') {
        const content = readFileSync(srcPath, 'utf-8').replace(/\{\{PROJECT_NAME\}\}/g, projectName);
        writeFileSync(join(dest, 'package.json'), content, 'utf-8');
      } else if (entry === '_gitignore') {
        copyFileSync(srcPath, join(dest, '.gitignore'));
      } else {
        copyFileSync(srcPath, destPath);
      }
    }
  }
}

function isEmptyDir(dir: string): boolean {
  if (!existsSync(dir)) return true;
  const files = readdirSync(dir).filter(f => f !== '.git');
  return files.length === 0;
}

function printSuccess(projectName: string, targetDir: string): void {
  const isCurrentDir = targetDir === '.';
  console.log('');
  console.log(kleur.green().bold('  ✔ Proyecto YDOM creado exitosamente!'));
  console.log('');
  console.log(kleur.white('  Próximos pasos:'));
  console.log('');
  if (!isCurrentDir) {
    console.log(kleur.cyan(`    cd ${projectName}`));
  }
  console.log(kleur.cyan('    npm install'));
  console.log(kleur.cyan('    npm run dev'));
  console.log('');
  console.log(kleur.dim('  Documentación: https://github.com/Joguel96/ydom-core'));
  console.log('');
}

// --- Main ---
async function main(): Promise<void> {
  console.log('');
  console.log(kleur.bold().yellow('  ◈ create-ydom') + kleur.dim(' — Scaffold a new YDOM project'));
  console.log('');

  // Argumento posicional: npx create-ydom [project-name]
  let targetArg = process.argv[2]?.trim();

  let projectName: string;
  let targetDir: string;

  if (targetArg) {
    projectName = targetArg === '.' ? resolve('.').split(/[\\/]/).pop()! : targetArg;
    targetDir = targetArg;
  } else {
    const response = await prompts(
      {
        type: 'text',
        name: 'projectName',
        message: 'Nombre del proyecto:',
        initial: 'mi-app-ydom',
        validate: (v: string) =>
          /^[a-z0-9][a-z0-9-_.]*$/.test(v.trim()) || 'Usa solo letras minúsculas, números, guiones o puntos.',
      },
      {
        onCancel: () => {
          console.log(kleur.red('\n  ✖ Operación cancelada.\n'));
          process.exit(1);
        },
      }
    );
    projectName = response.projectName.trim();
    targetDir = projectName;
  }

  const targetPath = resolve(targetDir);

  if (!isEmptyDir(targetPath)) {
    const { overwrite } = await prompts(
      {
        type: 'confirm',
        name: 'overwrite',
        message: `El directorio "${targetDir}" no está vacío. ¿Continuar de todas formas?`,
        initial: false,
      },
      {
        onCancel: () => {
          console.log(kleur.red('\n  ✖ Operación cancelada.\n'));
          process.exit(1);
        },
      }
    );
    if (!overwrite) {
      console.log(kleur.red('\n  ✖ Operación cancelada.\n'));
      process.exit(1);
    }
  }

  const templateDir = join(__dirname, '..', 'template');
  console.log('');
  console.log(kleur.dim(`  Generando proyecto en ${targetPath}...`));
  copyDir(templateDir, targetPath, projectName);

  printSuccess(projectName, targetDir);
}

main().catch((err) => {
  console.error(kleur.red('\n  Error inesperado:'), err);
  process.exit(1);
});
