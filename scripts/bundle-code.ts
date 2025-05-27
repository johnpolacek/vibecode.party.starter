#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import ignore from 'ignore';
import type { Dirent } from 'fs'; // Import Dirent type

// --- Configuration ---

// Directories to exclude entirely
const EXCLUDED_DIRS: Set<string> = new Set([
    'node_modules',
    '.git',
    '.next',
    'dist',
    'build',
    'out',
    'coverage',
    '.vscode',
    '.idea',
    'public', // Often contains large assets, adjust if needed
    // Add any other directories you want to skip
]);

// Specific files or patterns to exclude
const EXCLUDED_FILES_PATTERNS: string[] = [
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '.DS_Store',
    // Add any specific files or patterns
];

// File extensions or specific filenames to include (add more as needed)
const INCLUDED_EXTENSIONS: Set<string> = new Set([
    // Extensions
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.mjs',
    '.cjs',
    '.css',
    '.scss',
    '.sass',
    '.less',
    '.html',
    '.md',
    '.json',
    '.yaml',
    '.yml',
    '.sh',
    '.env',
    '.env.local',
    '.env.development',
    '.env.production',
    '.env.example', // Often useful for context
    '.gitignore', // Useful for context
    '.npmrc',
    // Specific filenames (often config files)
    'next.config.js',
    'next.config.mjs',
    'postcss.config.js',
    'tailwind.config.js',
    'tailwind.config.ts',
    'tsconfig.json',
    'jsconfig.json',
    '.eslintrc.json',
    '.prettierrc',
    'Dockerfile',
    // Add specific filenames relevant to your project
]);

// Initialize gitignore
let ig = ignore();

async function loadGitignore(projectRoot: string): Promise<void> {
    try {
        const gitignorePath = path.join(projectRoot, '.gitignore');
        const gitignoreContent = await fs.readFile(gitignorePath, 'utf-8');
        ig = ignore().add(gitignoreContent);
    } catch (err: unknown) {
        if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
            console.log('No .gitignore file found, continuing without it');
        } else if (err instanceof Error) {
            console.error('Error reading .gitignore:', err.message);
        }
    }
}

// --- Helper Functions ---

function isExcluded(entryPath: string, entryName: string, isDirectory: boolean): boolean {
    // Check gitignore patterns first
    const relativePath = entryPath.replace(/\\/g, '/'); // Normalize path separators
    if (ig.ignores(relativePath)) {
        return true;
    }

    // Then check our manual exclusions
    if (isDirectory && EXCLUDED_DIRS.has(entryName)) {
        return true;
    }
    if (!isDirectory && EXCLUDED_FILES_PATTERNS.some(pattern => entryName === pattern)) {
        // Add more complex pattern matching here if needed (e.g., regex)
        return true;
    }
     // Check if the path contains an excluded directory component
    const pathParts = entryPath.split(path.sep);
    if (pathParts.some(part => EXCLUDED_DIRS.has(part))) {
       return true;
    }
    return false;
}

function isIncluded(entryName: string): boolean {
    const ext = path.extname(entryName).toLowerCase();
    // Check by specific name first, then by extension
    return INCLUDED_EXTENSIONS.has(entryName) || (ext !== '' && INCLUDED_EXTENSIONS.has(ext));
}

async function walkDir(dir: string, projectRoot: string, allContents: string[]): Promise<void> {
    let entries: Dirent[];
    try {
        entries = await fs.readdir(dir, { withFileTypes: true });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error reading directory ${dir}: ${err.message}`);
        }
        return; // Skip directories we can't read
    }

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(projectRoot, fullPath);

        if (isExcluded(relativePath, entry.name, entry.isDirectory())) {
            console.log(`(-) Excluding: ${relativePath}`);
            continue;
        }

        if (entry.isDirectory()) {
            await walkDir(fullPath, projectRoot, allContents);
        } else if (entry.isFile() && isIncluded(entry.name)) {
            try {
                console.log(`(+) Including: ${relativePath}`);
                const content = await fs.readFile(fullPath, 'utf-8');
                // Normalize line endings to prevent excessive diffs if files have mixed endings
                const normalizedContent = content.replace(/\r\n/g, '\n');
                // Directory structure (relative, split by path.sep, joined by /)
                const dirStructure = path.dirname(relativePath).split(path.sep).filter(Boolean).join('/');
                // Reference comment block
                const referenceBlock = `/*\n  File: ${relativePath}\n  Absolute: ${fullPath}\n  Directory: ${dirStructure || '.'}\n*/\n`;
                allContents.push(`${referenceBlock}\n--- File: ${relativePath} ---\n\n${normalizedContent}\n\n`);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error(`Error reading file ${fullPath}: ${err.message}`);
                    // Directory structure for error case
                    const dirStructure = path.dirname(relativePath).split(path.sep).filter(Boolean).join('/');
                    const referenceBlock = `/*\n  File: ${relativePath}\n  Absolute: ${fullPath}\n  Directory: ${dirStructure || '.'}\n*/\n`;
                    allContents.push(`${referenceBlock}\n--- File: ${relativePath} ---\n\n!!! Error reading file: ${err.message} !!!\n\n`);
                }
            }
        } else {
             // Optional: Log files that are neither excluded nor included
             // console.log(`(?) Skipping (not included): ${relativePath}`);
        }
    }
}

// --- Main Execution ---

async function main(): Promise<void> {
    // Basic argument parsing: tsx scripts/bundle-code.ts [targetDir] [outputFile]
    const args: string[] = process.argv.slice(2);
    const targetDirArg: string | undefined = args[0];
    const outputFileArg: string | undefined = args[1];

    const targetDir: string = path.resolve(targetDirArg || '.'); // Default to current directory
    const outputFilePath: string | null = outputFileArg ? path.resolve(outputFileArg) : null; // Default to console output

    // Load .gitignore before processing
    await loadGitignore(targetDir);

    console.log(`Scanning directory: ${targetDir}`);
    if (outputFilePath) {
        console.log(`Output will be written to: ${outputFilePath}`);
    } else {
        console.log(`Output will be printed to console.`);
    }

    const allContents: string[] = [];
    try {
        // Check if target directory exists
        const stats = await fs.stat(targetDir);
        if (!stats.isDirectory()) {
            throw new Error(`Target path is not a directory: ${targetDir}`);
        }

        await walkDir(targetDir, targetDir, allContents);

        const combinedOutput: string = allContents.join('');

        if (outputFilePath) {
            await fs.writeFile(outputFilePath, combinedOutput);
            console.log(`\n✅ Successfully wrote bundled code to ${outputFilePath}`);
        } else {
            console.log("\n--- BUNDLED CODE OUTPUT ---");
            console.log(combinedOutput);
            console.log("--- END BUNDLED CODE OUTPUT ---");
            console.log(`\n✅ Successfully generated bundled code.`);
        }

    } catch (err: unknown) {
        if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
            console.error(`\n❌ Error: Target directory not found: ${targetDir}`);
        } else if (err instanceof Error) {
            console.error(`\n❌ An error occurred: ${err.message}`);
            console.error(err.stack); // Print stack trace for debugging
        }
        process.exit(1); // Exit with error code
    }
}

main();