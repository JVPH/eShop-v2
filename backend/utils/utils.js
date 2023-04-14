import path from 'path'
import { fileURLToPath } from 'url'

const  getFilename = (metaUrl) => {
  const __filename = fileURLToPath(metaUrl)

  return __filename
}

const getDirname = (metaUrl) => {
  const __dirname = path.dirname(getFilename(metaUrl))

  return __dirname
}

export { getFilename, getDirname }