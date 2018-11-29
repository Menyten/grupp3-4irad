# team2retro
Our collaborative effort as a team. We're bringing retro back with this cool application where you can read some history of the breakout game but of course also play it! Can you get into the top 10? Good luck and enjoy!


STEPS TO GET SET UP IN A JIFFY:
Pull this repo and..

#1 - Get sass'in
Setup your SASS compiler! Output "style.css" as this is a dependency in the index.html.
Set output path: [www/assets/css/style.css].

Set your compiler to listen for changes in "style.scss" in the root sass folder. Settings: Autocompile, Sourcemap, Autoprefix <- True!

ALL overrides on the bootstrap !default values can be done in "_bootstrap-overrides.scss" which of course is imported in the main custom sass file mentioned above.

To style your own components, make your own partial and import it in the style.scss file.

#2 - Install express etc..
NPM install (Get all depenencies (see package.json))

#3 - Run the application
node app to kick things off!


That's it! 
