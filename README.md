# vh-semantic-release-cli
[![Dependency Status](https://david-dm.org/voorhoede/vh-semantic-release-cli/master.svg)](https://david-dm.org/voorhoede/vh-semantic-release-cli/master) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

**This is a fork from [semantic-release](https://github.com/semantic-release/cli).**


## Install

```bash
npm install -g vh-semantic-release-cli

cd your-module
semantic-release-cli setup
```

## Options

	Usage:
	  semantic-release-cli setup [options]

	Options:
	  -h --help           Show this screen.
	  -v --version        Show version.
	  --[no-]keychain     Use keychain to get passwords [default: true].
	  --ask-for-passwords Ask for the passwords even if passwords are stored [default: false].
	  --tag=<String>      npm tag to install [default: 'latest'].

	Aliases:
	  init                 setup

## What it Does
__semantic-release-cli performs the following steps:__

1. Asks for the information it needs. You will need to provide it with:
	* Whether your GitHub repository is public or private
	* Which NPM registry you want to use (Default: https://registry.npmjs.org/)
	* Your NPM username (unless passwords were previously saved to keychain)
	* Your NPM email
	* Your NPM password
	* Your GitHub username
	* Your GitHub password (unless passwords were previously saved to keychain)
	* Which continuous integration system you want to use. (Options: Travis CI / Pro / Enterprise, or Other)
	* Whether you want to test a single node.js version (e.g. - 0.12) or multiple node.js versions (e.g. - 0.10, 0.12, etc.)
1. Save your passwords to your local OS's keychain using [keytar](https://www.npmjs.com/package/keytar) for future use (unless `--no-keychain` was specified)
1. NPM Add User
	* Runs `npm adduser` with the npm information provided to generate a `.npmrc`
	* Parses the NPM token from the `.npmrc` for future use
1. Create GitHub Personal Token
	* Logs into GitHub using the username and password provided
	* Creates a [GitHub Personal Access Token](https://github.com/settings/tokens) and saves it for future use
1. Overwrite your .travis.yml file (if Travis CI was selected)
	* `before_install: npm i -g npm@^2.0.0`: install NPM 2
	* `before_script: curl -Lo travis_after_all.py https://git.io/vLSON`: install [travis-after-all](https://github.com/travis-ci/travis-ci/issues/929) script to enable running `semantic-release` after ALL build succeed
	* `after_success: python travis_after_all.py` and `npm run semantic-release`: run `semantic-release` exactly once after all builds pass
	* Set other sane defaults: `sudo: false`, `cache: directories: node_modules`, `notifications: email: false`, `before_script: npm prune`
1. Update your package.json
	* Remove `version` field (you don't need it anymore -- `semantic-release` will set the version for you automatically)
	* Add a `semantic-release` script: `"semantic-release": "semantic-release pre && npm publish && semantic-release post"`
	* Add `semantic-release` as a `devDependency`
	* Add or overwrite the [`repository` field](https://docs.npmjs.com/files/package.json#repository)
1. Login to Travis CI to configure the package
	* Enable builds of your repo
	* Add GH_TOKEN and NPM_TOKEN environment variables in the settings

## License

MIT License
2016 © De Voorhode, Christoph Witzko and [contributors](https://github.com/semantic-release/cli/graphs/contributors)
