# JSON Viewer

### Autocompletion

You can use the `tab` key to browse the JSON properties on the fly and autofill long names. 
In order to enable this feature, you should append the autocompletion function to your `.bashrc`, `.bash_profile`, `.zshrc`. You can do using the build-in flag:

```bash
json --completion >> ~/.bash_profile
```

Alternatively, you can fetch the script file:

```bash
curl https://raw.githubusercontent.com/mjurczyk/json-viewer/master/bin/json-complete -o ~/.json-autocomplete
```

And enable it by appending the following lines to your `.bash_profile`:

```bash
# / JSON Autocompletion
if [ -f ~/.json-autocomplete ]; then
  . ~/.json-autocomplete
fi
# / JSON Autocompletion
```