import { danger, message } from "danger"
import { readFileSync } from "fs"

export default () => {
  // Print out a message to the PR
  const deployURL = process.env.PR_DEPLOY_URL_ROOT
  message(`Deployed to [a PR branch](${deployURL})`)
  
  const contextText = readFileSync("built/public/pr.json", "utf8")
  console.log(contextText)
  const context = JSON.parse(contextText) as typeof import("./public/build/pr.json")

  const repo = { owner: context.pull_request.base.repo.owner.login, repo: context.pull_request.base.repo.name }
  const prNumber = context.pull_request.number
  console.log(repo)

  console.log(process.env.PR_DEPLOY_URL_ROOT)

  const changedFiles = getChangedFiles(prNumber)
  console.log(changedFiles)
}

const getChangedFiles = async (prNumber: number) => {
  const repo = { owner: "microsoft", name: "TypeScript-website" }

  // https://developer.github.com/v3/pulls/#list-pull-requests-files
  const options = danger.github.api.pulls.listFiles.endpoint.merge({ ...repo, pull_number: prNumber })

  /** @type { import("@octokit/rest").PullsListFilesResponseItem[]} */
  const files = await danger.github.api.paginate(options)
  const fileStrings = files.map(f => `/${f.filename}`)
  return fileStrings
}
