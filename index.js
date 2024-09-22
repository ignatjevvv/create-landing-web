#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Определяем текущую версию вашего пакета и описание
program
  .version('1.0.0')
  .description('CLI для создания лендингов с готовым конфигом Vite');

program
  .argument('<project-name>', 'Название нового проекта')
  .action(async projectName => {
    const templateDir = path.join(__dirname, 'template');
    const projectDir = path.join(process.cwd(), projectName);

    try {
      console.log(chalk.blue('Создание проекта...'));
      await fs.copy(templateDir, projectDir);

      console.log(chalk.green(`Проект ${projectName} создан!`));
      console.log(chalk.yellow(`Перейдите в папку проекта: cd ${projectName}`));
    } catch (err) {
      console.error(chalk.red('Ошибка создания проекта:', err));
    }
  });

program.parse(process.argv);
