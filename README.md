To run the app you need to do a:

1. sudo npm install
2. bower install (select versions: 1 then 8, respectively)

If you face throw err run then run bower install:

1. sudo chown -R $USER:$GROUP ~/.npm
2. sudo chown -R $USER:$GROUP ~/.config

In order to serve the app you must go to the cloned folder and run (you must have node in your path):

1. npm install -g cordova ionic
2. ionic serve 

To test plugins run:

1. ionic platform add ios
2. ionic build ios
3. ionic emulate ios

This link is the updated docs for Firebase: https://firebase.google.com/docs/reference/js/.

This is how you refeernce the firebase database (this is referencing the accounts branch). Firebase has a few keywords to allow you to determine how you want to communicate (push,set,update,and transaction are a few).  

1. var ref = firebase.database().ref('accounts');


