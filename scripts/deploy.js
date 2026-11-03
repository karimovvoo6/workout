import { execSync } from 'child_process';
import { rmSync, cpSync, existsSync } from 'fs';
import { join, resolve } from 'path';

console.log('🚀 1. Сборка проекта...');
execSync('npm run build', { stdio: 'inherit' });

console.log('📦 2. Подготовка публикации в GitHub Pages (ветка main)...');
const rootDir = process.cwd();
const deployDir = resolve(rootDir, '..', 'workout-deploy-temp');

try {
  if (existsSync(deployDir)) {
    try {
      execSync(`git worktree remove "${deployDir}" --force`, { stdio: 'ignore' });
    } catch {}
  }

  execSync(`git worktree add "${deployDir}" origin/main`, { stdio: 'inherit' });
  
  // Очистка старых файлов сборки
  const oldAssets = join(deployDir, 'assets');
  if (existsSync(oldAssets)) rmSync(oldAssets, { recursive: true, force: true });
  for (const file of ['favicon.svg', 'icons.svg', 'index.html']) {
    const fPath = join(deployDir, file);
    if (existsSync(fPath)) rmSync(fPath, { force: true });
  }

  // Копирование свежей сборки
  cpSync(join(rootDir, 'dist'), deployDir, { recursive: true });

  // Коммит и пуш
  execSync(`git -C "${deployDir}" add -A`, { stdio: 'inherit' });
  
  const status = execSync(`git -C "${deployDir}" status --porcelain`).toString().trim();
  if (status) {
    execSync(`git -C "${deployDir}" commit -m "Deploy: update build artifacts for GitHub Pages"`, { stdio: 'inherit' });
    execSync(`git -C "${deployDir}" push origin HEAD:main`, { stdio: 'inherit' });
    console.log('✅ Проект успешно опубликован на GitHub Pages!');
  } else {
    console.log('ℹ️ Нет новых изменений для публикации.');
  }
} catch (err) {
  console.error('❌ Ошибка при публикации:', err.message);
  process.exit(1);
} finally {
  try {
    if (existsSync(deployDir)) {
      execSync(`git worktree remove "${deployDir}" --force`, { stdio: 'ignore' });
    }
  } catch {}
}
