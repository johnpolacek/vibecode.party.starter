import fs from 'fs'
import path from 'path'

// Function to get all route paths from the app directory
function getRoutePaths(dir: string, basePath: string = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const paths: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const routePath = path.join(basePath, entry.name)

    if (entry.isDirectory()) {
      // Skip private folders (starting with _) and api routes
      if (entry.name.startsWith('_') || entry.name === 'api') {
        continue
      }

      // Handle dynamic routes
      const routeName = entry.name.startsWith('[') ? entry.name : null
      if (routeName) {
        // Add the dynamic route pattern
        paths.push(path.join(basePath, '*'))
      } else {
        // Recursively get routes from subdirectories
        paths.push(...getRoutePaths(fullPath, routePath))
      }
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      // Add the route path for page files
      paths.push(basePath)
    }
  }

  return paths
}

// Generate the routes file
function generateRoutesFile() {
  const appDir = path.join(process.cwd(), 'app')
  const routePaths = getRoutePaths(appDir)
  
  // Format the paths
  const formattedPaths = routePaths
    .map(p => p.replace(/\\/g, '/')) // Convert Windows paths to forward slashes
    .map(p => p || '/') // Convert empty string to root path
    .sort()

  // Generate the file content
  const fileContent = `// This file is auto-generated. DO NOT EDIT IT MANUALLY.
// It is used to generate the validRoutes for tracking user visits.
// To regenerate, run: pnpm generate:routes

export const validRoutes = new Set([
  ${formattedPaths.map(p => `'${p}'`).join(',\n  ')}
])
`

  // Write the file
  const outputPath = path.join(process.cwd(), 'lib', 'generated', 'routes.ts')
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, fileContent)

  console.log('✅ Generated routes file')
}

generateRoutesFile() 