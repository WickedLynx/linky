# Linky

Linky is a tag-based bookmark manager written in Node/React and uses MongoDB for persistence.

[Screenshot]()

[Live demo](https://harshad.nl/linky)

Note: The demo runs Linky without a user and hence you cannot add or remove links!

## Installation

### Pre-requisites
	- Node `>= 8.0`
	- MongoDB `>= v3.2.11` up and running

### Configuration
__Backend:__

The available configuration options are specified in `linky-api/config.js.example`. Copy this file to `linky-api/config.js` and change the parameters as per your needs.
Since Linky was designed to be used as a personal tool, signing up new users is currently not implemented. When you first deploy Linky, a new user is created using the username/password provided in `config.js`.

__Frontend:__

The frontend configuration options are specified in `linky-website/config.js.example`. Copy this file to `linky-api/config.js` and change the `apiURL` to point to your backend installation. 

If you intend to run Linky in a sub-path rather than at the server root (`https://mydomain.com/linky` instead of `https://mydomain.com`):

	>    echo "BASE_PATH=https://mydomain.com/linky" > ./linky-website/.env
	
The frontend is a browser-rendered React app created using [create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-stylesheet). You can refer to its README for any further customisations.

### Building and running
__Backend:__

Ensure you have MongoDB up and running. And then:

>		cd linky-api
>		npm install
>		node app.js

__Frontend:__

>		cd linky-website
>		npm install
>		npm run build
>		node server.js

You can edit `linky-website/server.js` to change the server port or do any other custom actions.
