# Finance Data Library

## Token and NPM / Github setup
Set the below in the user specific `~/.npmrc` file:

//npm.pkg.github.com/:_authToken=token_goes_here
@github_username:registry=https://npm.pkg.github.com/

## Making changes

When the code changes are complete; make sure you commit and push them then run
`export VERSION=0.1.1 && deno task build:deploy` where the env variable is the new version number.