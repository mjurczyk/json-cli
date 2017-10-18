# JSON Viewer

### Pretty JSON viewer for your terminal

![jsonviewer2](https://cloud.githubusercontent.com/assets/9549760/13748907/3e4b4060-e9ff-11e5-9aa6-6997685a3609.gif)

___

🚀 master ▶︎ 
[![npm version](https://badge.fury.io/js/json-viewer.svg)](https://badge.fury.io/js/json-viewer)
[![CircleCI](https://circleci.com/gh/mjurczyk/json-viewer/tree/master.svg?style=svg)](https://circleci.com/gh/mjurczyk/json-viewer/tree/master)
[![codecov](https://codecov.io/gh/mjurczyk/json-viewer/branch/master/graph/badge.svg)](https://codecov.io/gh/mjurczyk/json-viewer)

🛠 develop ▶︎ 
[![GitHub version](https://badge.fury.io/gh/mjurczyk%2Fjson-viewer.svg)](https://badge.fury.io/gh/mjurczyk%2Fjson-viewer)
[![CircleCI](https://circleci.com/gh/mjurczyk/json-viewer/tree/develop.svg?style=svg)](https://circleci.com/gh/mjurczyk/json-viewer/tree/develop)
[![codecov](https://codecov.io/gh/mjurczyk/json-viewer/branch/develop/graph/badge.svg)](https://codecov.io/gh/mjurczyk/json-viewer)
[![maintainer](https://img.shields.io/badge/maintainer-%40mjurczyk-brightgreen.svg)](https://github.com/mjurczyk)

📚 dependencies ▶︎ 
[![dependencies Status](https://david-dm.org/mjurczyk/json-viewer/status.svg)](https://david-dm.org/mjurczyk/json-viewer)
[![devDependencies Status](https://david-dm.org/mjurczyk/json-viewer/dev-status.svg)](https://david-dm.org/mjurczyk/json-viewer?type=dev)

👀 code climate ▶︎ 
[![Code Climate](https://codeclimate.com/github/mjurczyk/json-viewer/badges/gpa.svg)](https://codeclimate.com/github/mjurczyk/json-viewer)
[![Issue Count](https://codeclimate.com/github/mjurczyk/json-viewer/badges/issue_count.svg)](https://codeclimate.com/github/mjurczyk/json-viewer)

___

> After only so many times of trying to recall a package script or dependency.

`json-viewer` allows you to preview your JSON files quickly, showing you only the parts you care to see in a beautiful and readable form.

### Table of Contents

* [Installation](#installation)
* [Usage](#usage-basic)
	* [Basic](#usage-basic)
	* [Colors](#usage-colors)
	* [Piping & Redirection](#usage-piping-&-redirection)
	* [Always Color](#usage-always-color)
	* [Autocompletion](#usage-autocompletion)
* [Contributing](#contributing)
* [License](#license)

### Installation

To use `json-viewer` you will need `node` environment installed on your system. With that ready, simply run:

```bash
npm install --global json-viewer
```

Yarn user? Not an issue:

```bash
yarn global add json-viewer
```

With that done, you are ready to go - `json-viewer` just became available to you as a `json` command!

### Usage: Basic

There are several ways to use `json-viewer` depending on your preferences. The most basic use case would be:

```bash
json package.json version # -> "2.0.0"
```

In the first argument choose which file you would like to browse, and then specify which part of it you would like to see. It also works perfectly with arrays and objects!

```bash
json package.json keywords # -> [ "json", "viewer", "cli" ]
```

### Usage: Colors

To add more readability, you can add `-c` or `--color` flag to the command:

```bash
json --color package.json dependencies
json -c package.json dependencies
```

This will add some styling to the output depending on its content.

### Usage: Piping & Redirection

Have a chain of UNIX commands that generate some JSON output and you would really like to see it in a human-readable form? Look no further:

```bash
cat package.json | json -c
```

Want to *go deeper*? We say **no** to compromise:

```bash
cat package.json | json -c version
```

*Note*: If you use `json-viewer` in a pipe, the only argument you should specify is the part of the JSON you would like to see. If you put another file as an argument, `json-viewer` will assume it to be a property name inside the piped JSON.

### Usage: Always Color

Using `-c` can be tiring if you do it quite often, so `json-viewer` offers you a shortcut. To set a permanent `--color` flag for `json-viewer`, simply use:

```bash
json --always-color
```

After that, `json-viewer` will remember your setting automatically every time you call it!

### Usage: Autocompletion

*Note*: To use autocompletion see the installation instructions below! 

`json-viewer` uses an amazing `yargs` library to offer some helpful autocompletion to you. How does it work? Let us see:

* Hitting `tab` key twice will list you all of the files in the current directory

```bash
json # tab-tab!
> package.json    index.js    src/    ...
```

* Hitting `tab` once will automatically finish the name of any fitting file in the current directory

```bash
json pa # tab!
json package.json
```

* With a specified file, hitting tab twice will list you JSON properties in the file (Works great for nested properties as well!)

```bash
json package.json # tab-tab!
> name    keywords    scripts    dependencies    ...
```

* With a specified file, hitting tab once will automatically finish the name of the property

```bash
json package.json dep # tab!
json package.json dependencies
```

You can now traverse around your JSON structure in no time!

#### Autocompletion Installation

You should be warned though - autocompletion does not come with `json-viewer` out of the box (not explicitly at least). To enable it, first use:

```bash
json completion
```

This will print you a complete script that has to be put into `.bash_profile` or `.bashrc` of your system / terminal. If you trust this `README.md` like you should, all you need to do is simply:

```bash
json completion >> ~/.bashrc
# or (depending on your system):
json completion >> ~/.bash_profile
```

This will append the necessary script to the necessary file. If you are feeling less confident about using **some script someone on the internet told you to use**™️, simply find `.bash_profile` or `.bashrc` using the terminal and add the completion script manually.

Save, reopen terminal, you are ready to go!


### Contributing

Want to get your hands dirty on some fancy ES6 code, gain valuable experience, be able to place some significant achievements into your resume? Oh, are you in a right place and time!

Enlist today and contribute to `json-viewer`. The source code it up there, the ideas in your head, so fear not and put them into the code and create a pull request! How can you build, debug, test your code? Well, there we go with some helper scripts:

```bash
npm run build # build the /src directory and put the results into /lib

npm run start # build and run the latest /src

npm run test:live # this one tricky - build, locally pack and install the latest /src as json-viewer in the system. Great if you want to test the final product as a `json` command
```

Testing?

```bash
npm run test # run tests once

npm run test:watch # run tests everytime anything in /src changes

npm run lint # test if your code looks nice and is consistent with the rest of the codebase

npm run coverage # see how much code is tested and how much is not

npm run coverage:html # generate HTML coverage report in /coverage/index.html
```

There are no strict rules or assumptions for what can be done, although please consider **coverage 100%** your personal goal and achievement. Plus, of course, `npm run test` and `npm run lint` must pass!

Knowing all that, grab your pen, tear that sheet of paper out, and sketch new functionality today! Feel free to reach out via GitHub or email for any aid or explanations!


# License 
MIT :octocat:
