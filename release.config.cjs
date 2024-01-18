function isDryRun() {
  return process.argv.includes('--dry-run');
}

const configDryRun = [
  '@semantic-release/commit-analyzer',
  '@semantic-release/release-notes-generator',
  ["@semantic-release/exec", {
    "verifyReleaseCmd": "echo ${nextRelease.version} > .version",
  }],
];

const configProduction = [
  "@semantic-release/commit-analyzer",
  "@semantic-release/release-notes-generator",
  ["@semantic-release/npm", { "npmPublish": false }],
  ["@semantic-release/git", {
    "assets": [".version", "package.json"],
    "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
  }],
];

module.exports = {
  "branches": [
    "main",
    { "name": "develop", "prerelease": true },
    { "name": "next", "prerelease": true },
  ],
  "plugins": isDryRun() ? configDryRun : configProduction,
}
