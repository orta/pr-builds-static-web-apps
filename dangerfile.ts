import { message, danger } from "danger"

export default async () => {
  // Print out a message to the PR
  const deployURL = process.env.PR_DEPLOY_URL_ROOT
  message(`Deployed to [a PR branch](${deployURL}) :tada:`)

  const changed = danger.github.utils.fileLinks(danger.git.modified_files)
  message(`Changed files: ${changed}`)
}
