# MidClan-WebApi

## Git WorkFlow

### Base branch: `master`

### Work branch: `develop`

To work on a new chore/feature/bug

- checkout to master
- pull from master remote
- checkout to new feature/fix/chore branch (git checkout -b feature/xxx-xxx or git checkout -b chore/setup)
- do your magic
- merge and commit changes on that branch (git add . && git commit -m "finished feature xxx")
- push branch to remote (git push origin feature/xxx-xxx)
- checkout to `develop` branch (git checkout develop)
- pull from develop remote (git pull origin develop)
- merge in new feature/fix/chore branch into `develop` (git merge feature/xxx-xxx)
- push `develop` to remote (git push origin develop)
- then, create pull request from `develop` to `master`
