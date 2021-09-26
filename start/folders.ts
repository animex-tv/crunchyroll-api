import fs from 'fs'
import Application from '@ioc:Adonis/Core/Application'
import Logger from '@ioc:Adonis/Core/Logger'

const folders = ['cache/requests', 'screenshots']

const run = async () => {
  for (const folder of folders) {
    await fs.promises.mkdir(Application.tmpPath(folder), { recursive: true })
  }

  Logger.info(`Folders Created`)
}

run()
