This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
# Github Gist Search

Single page application to Search on Github Gist Api.

---
## Requirements

For development, you will need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## App installation 

    $ git clone https://github.com/sa3dwi/github-gist
    $ cd github-gist
    $ yarn install

## App Configuration

Open `github-gist/src/config.json` then edit it with your settings:

- min search characters
- max search characters
- localstorage key 

## Teasting 

    $ cd github-gist
    $ yarn test

----
## Assumptions

- pagination is not required 
- use global state like redux or Mobx is not required 
- use only Reactjs or Angularjs other libraries like Jquery or Bootstrap are not allowed 


## Some Screen Preview  


![Home](https://github.com/sa3dwi/github-gist/blob/master/docs/screen_01.png?raw=true)
&nbsp;&nbsp;&nbsp;&nbsp;
![Loading](https://github.com/sa3dwi/github-gist/blob/master/docs/screen_02.png?raw=true)
&nbsp;&nbsp;&nbsp;&nbsp;
![search Results](https://github.com/sa3dwi/github-gist/blob/master/docs/screen_03.png?raw=true)
&nbsp;&nbsp;&nbsp;&nbsp;
![search Results](https://github.com/sa3dwi/github-gist/blob/master/docs/screen_04.png?raw=true)
