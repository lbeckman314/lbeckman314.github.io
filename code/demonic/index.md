---
title: demonic
---

<script src="/assets/js/demonic-docs.bundle.js"></script>
<script>
    DemonicDocs.run({
        mode: 'jekyll',
        run: false,
        url: 'ws://demonic.liambeckman.com',
    });
</script>

{% include code.html name='demonic' desc='A suite of programs designed to execute commands in a sandboxed environment.' %}

# Give it a Spin!

Demonic runs commands in a remote sandbox allowing users to quickly try out a given program or script. Click on any of the example programs below to give them a spin.

{% include demonic.html command='prime 10101' %}

Run any of the code samples below by clicking on the ▶ button:

For more languages see the [demonic-docs](docs) page.

## Python

{: .run}
```python
def greet():
    name = input('Enter your name: ')
    print('Hello', name)

if __name__ == '__main__':
    greet()
```

## C

{: .run}
```c
#include <stdio.h>

int main(int argc, char** argv) {
    fprintf(stderr, "%s", "Enter your name: ");
    char name[100];
    scanf("%s", name);

    fprintf(stderr, "Hello %s!\n", name);
    return 0;
}
```

# Installation

<h2>0. Prerequisites</h2>

[`node.js`](https://nodejs.org/en/) :: for running the server.

[`npm`](https://www.npmjs.com/) :: for installing the dependencies.

[`firejail`](https://firejail.wordpress.com/) :: for running programs in a sandboxed chroot environment.

[`git`](https://git-scm.com/) :: for a quick git clone.

If you are running Windows, the above utilities will be packaged in any of the following: [babun](https://babun.github.io/), [cmder](http://cmder.net/), or [Linux Subsystem for Windows](https://docs.microsoft.com/en-us/windows/wsl/install-win10). Take your pick! : )

The above utilities should be installed (or readily available) if you are running a Unix derivative (such as Linux, macOS, or any of the BSD's).

<h2>1. Quickstart</h2>

```shell
# clone the git repo
git clone https://github.com/lbeckman314/demonic

# enter directory
cd demonic

# install dependencies
npm install

# copy example config
cp config-example.js config.js

# edit key, certificate, and passphrase information
nano config.js

# run server (if no port number is provided, 12345 in this example, the server will default to port 8181)
node server.js 12345

# edit server information
nano demonic.js

# then you can connect to the server from a client (e.g. client-example.html)
```

<br />

# Uninstallation

<h2>0. Delete the directory/folder.</h2>

```shell
# remove this directory
rm -rfI demonic
```
