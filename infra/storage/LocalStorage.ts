import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'

export class LocalStorage {
  public async getContents(path: string) {
    const fullPath = Application.tmpPath(path)
    const stat = await fs.promises.stat(fullPath).catch(() => undefined)
    if (!stat) return undefined

    return fs.promises.readFile(fullPath)
  }

  public getContentsSync(path: string) {
    const fullPath = Application.tmpPath(path)
    try {
      fs.statSync(fullPath)
      return fs.readFileSync(fullPath)
    } catch (err) {
      return undefined
    }
  }

  public setContentsSync(path: string, contents: string) {
    const fullPath = Application.tmpPath(path)
    return fs.writeFileSync(fullPath, contents)
  }

  public async setContents(path: string, contents: string) {
    return fs.promises.writeFile(Application.tmpPath(path), contents)
  }
}
