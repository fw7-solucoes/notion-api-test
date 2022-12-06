require('dotenv').config()
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })
const databaseId = '01cfec67c07848c9a2f105cbfb21fec3'

const run = async () => {
  const response = await notion.databases.query({
    database_id: databaseId
  })

  const normalizedRecords = response.results.map(record => {
    const tags = record.properties.Tags.multi_select
    const title = record.properties.Name.title[0].plain_text

    return { title, tags }
  })

  console.log(JSON.stringify(normalizedRecords, null, 2))
}

run()
