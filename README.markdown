This is an example of a small but non-trivial app created with
[NodeJS][] and [Express][].  It is a very simple RSS client.

[NodeJS]: http://nodejs.org/
[Express]: http://expressjs.com/

## Installing and Running

Install NodeJS and its package manager, npm, if you have not done so
already.  Joyent provides instructions for installing on [Mac][],
[Windows][], and [Linux][].

[Mac]: https://github.com/joyent/node/wiki/Installation#installing-on-mac
[Windows]: https://github.com/joyent/node/wiki/Installation#installing-on-windows
[Linux]: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

Grab the app code using this terminal command:

    git clone https://github.com/hallettj/rss-example.git && cd rss-example

Install the app dependencies (dependencies are installed inside the app
directory):

    npm install

Run the app:

    PORT=3000 npm start

Add RSS feeds using curl:

    curl -X POST http://localhost:3000/feeds -d 'url=http://www.reddit.com/.rss'

Curl is installed by default on Mac.  If you do not have it on Linux you
can probably get it by installing a package called 'curl'.

View your feeds in a web browser by navigating to
[http://localhost:3000/read][read].

[read]: http://localhost:3000/read
