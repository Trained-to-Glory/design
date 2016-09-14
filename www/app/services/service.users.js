angular.module('service.users', [])
 .service('usersService', function(){
   var table = 'accounts';
   this.get = function (userId) {
     console.log('user hit');
       var user = (userId) ? firebase.database().ref(table + '/' + userId) : firebase.database().ref(table);
       return user.once('value').then(function (snapshot) {
             var currentObj = snapshot.val();
             if (currentObj) {
                 return currentObj;
             }
             return undefined;
         });
   };


});
