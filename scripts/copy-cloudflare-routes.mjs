import { mkdir, copyFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const source = resolve('public/_routes.json')
const target = resolve('dist/client/_routes.json')

await mkdir(dirname(target), { recursive: true })
await copyFile(source, target)
