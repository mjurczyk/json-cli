# JSON Viewer

### Pretty JSON viewer for the terminal

___

![jsonviewer2](https://cloud.githubusercontent.com/assets/9549760/13748907/3e4b4060-e9ff-11e5-9aa6-6997685a3609.gif)

> After only so many times I was trying to recall a script or a dependency from the package.json, having my IDE closed and terminal opened.

Preview your JSON files, like `package.json` or database logs, in a readable form, and reach inside the structure of your file to fetch only the data that you really care to see.

### Installation

You will need any recent node environment installed on your machine. To install `json-viewer` use `npm` preinstalled with node:

```bash
npm install -g json-viewer
```

This will install the node package, as well as the `json` terminal utility.

### Usage

Using the viewer is as simple as using `cat`:

```bash
json package.json dependencies.gulp
```

Will output the `dependencies.gulp` parameter value from the package.json structure.

If you you would like to have the output properly colored, for readability, you can use either the `-c` flag, or set it permanently by using `--always-color` once.

```bash
json --always-color
json package.json scripts.compile
json myJsonFile.json user.friends._ids
```

If the parameter you ask for doesn't exist, viewer will return the last valid parent and inform you about the problem.
