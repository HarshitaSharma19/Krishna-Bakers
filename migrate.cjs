const fs = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');

const sourceDir = __dirname;
const targetDir = path.join(__dirname, 'creamy-craft-market-js');

const excludeDirs = ['node_modules', '.git', 'creamy-craft-market-js', '.lovable'];

async function processFile(sourcePath, targetPath) {
    const ext = path.extname(sourcePath);
    
    if (ext === '.ts' || ext === '.tsx') {
        const isTSX = ext === '.tsx';
        const content = await fs.readFile(sourcePath, 'utf8');
        
        try {
            const result = babel.transformSync(content, {
                presets: [
                    ['@babel/preset-typescript', { isTSX, allExtensions: true }]
                ],
                filename: sourcePath,
                retainLines: true, // Keep line numbers similar
            });
            
            const newExt = isTSX ? '.jsx' : '.js';
            const newTargetPath = targetPath.replace(new RegExp(ext + '$'), newExt);
            
            await fs.writeFile(newTargetPath, result.code);
            console.log(`Transpiled: ${path.relative(sourceDir, sourcePath)} -> ${path.relative(targetDir, newTargetPath)}`);
        } catch (e) {
            console.error(`Failed to transpile ${sourcePath}:`, e.message);
            // Fallback to direct copy if babel fails
            await fs.copy(sourcePath, targetPath);
        }
    } else {
        await fs.copy(sourcePath, targetPath);
    }
}

async function walk(dir) {
    const files = await fs.readdir(dir);
    for (const file of files) {
        if (excludeDirs.includes(file)) continue;
        
        const fullPath = path.join(dir, file);
        const relativePath = path.relative(sourceDir, fullPath);
        const targetPath = path.join(targetDir, relativePath);
        
        const stat = await fs.stat(fullPath);
        
        if (stat.isDirectory()) {
            await fs.ensureDir(targetPath);
            await walk(fullPath);
        } else {
            if (file === 'migrate.js') continue;
            
            // For package.json, we might want to keep it but rename the name, maybe?
            // We just copy it for now, user wants "exactly same project"
            await processFile(fullPath, targetPath);
        }
    }
}

async function main() {
    console.log('Starting migration...');
    // We already have targetDir from create-vite, let's merge or overwrite
    await fs.ensureDir(targetDir);
    await walk(sourceDir);
    
    // Some fixups in creamy-craft-market-js:
    // Change package.json to remove typescript dependencies
    const pkgPath = path.join(targetDir, 'package.json');
    if (await fs.pathExists(pkgPath)) {
        const pkg = await fs.readJson(pkgPath);
        pkg.name = pkg.name + "-js";
        
        if (pkg.devDependencies) {
            delete pkg.devDependencies['typescript'];
            delete pkg.devDependencies['@types/react'];
            delete pkg.devDependencies['@types/react-dom'];
            delete pkg.devDependencies['@types/node'];
            delete pkg.devDependencies['typescript-eslint'];
        }
        
        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
        console.log('Updated package.json');
    }
    
    // Fix any imports inside .js/.jsx files that import .ts/.tsx extensions (if any, though rare)
    // Actually vite handles imports without extensions usually.
    
    // We also need to fix tsconfig.json -> jsconfig.json
    const tsconfigPath = path.join(targetDir, 'tsconfig.json');
    if (await fs.pathExists(tsconfigPath)) {
        await fs.move(tsconfigPath, path.join(targetDir, 'jsconfig.json'), { overwrite: true });
        console.log('Renamed tsconfig.json to jsconfig.json');
    }
    
    console.log('Migration complete!');
}

main().catch(console.error);
