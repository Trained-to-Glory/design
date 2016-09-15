angular.module('service.interest', ['firebase'])
 .service('interestService',function() {

   this.createInterestList = function(userId){
	    var data = {
	           "displayName": "Baseball"
	    };


	    var ref = firebase.database().ref('interest');

	    var key;

	    var interests = ['Baseball', 'Basketball','Climbing','Cycling','Dance','Football','Golf','Jumping', 'Lacrosee',
	              'Paintball','Running','Skate','Soccer', 'Swimming','Tennis', 'Ultimate Frisbee','Weight Lifting', 'Yoga'];

      var backgroundImg = ['img/baseball.png', 'img/boxing.png', 'img/basketball.png', 'img/climbing.png', 'img/bicycle_cycling.jpg', 'img/dance.png', 'img/Arian_Foster_fumble.jpg',
      'img/golf.png', 'img/crazy.png', 'img/Face-off.jpg', 'img/paintball.png', 'img/running.png', 'img/skatepark.png', 'img/soccer.png', 'img/swimming.png', 'img/tennis.png', 'img/ultimate_frisbee.jpg', 'img/lifting.png',
        'img/Acro_Yoga.jpg'];

      var icon = ['img/swing.png', 'img/sneaks.png', 'img/uphill.png', 'img/bike_rider.png', 'img/dance_thing.png','img/goalpost.png','img/tee.png', 'img/flight.png','img/lacrosse.png','img/mask.png',
    'img/sprint.png','img/ramp.png', 'img/kick.png','img/phelps.png','img/raquet.png', 'img/frisbee.png','img/strength.png','img/pose.png'];

      for(var i = 0; i < interests.length; i++){
  	      data = {
  	           "displayName": interests[i],
               "images": {
                 "backgroundImg": backgroundImg[i],
                 "icon": icon[i]
               }
  	      };
  	      key = ref.push().key;
  	      ref.child(key).set(data);
      }
	    return;
	  };

    this.createTrainersList = function(userId){
 	    var data = {
 	           "displayName": "Baseball"
 	    };

 	    var ref = firebase.database().ref('trainersInterest');
 	    var key;

 	    var interests = ['Baseball', 'Basketball','Dance','Fight Sports', 'Football','Golf','Lifting', 'Nutrition',
        'Running', 'Soccer', 'Swimming','Tennis', 'Weight Loss', 'Yoga'];

       var backgroundImg = ['img/yogi.png', 'img/basketballCoach.png', 'img/danceClass.png', 'img/boxing.png', 'img/gridiron.png',
       'img/golfCoach.png', 'img/weightCoach.png', 'img/doctor.jpg', 'img/track.png','img/swimmingCoach.png','img/tennisCoach.png','img/weightLoss.png','img/zenMaster.png'];

       var icon = ['img/swing.png', 'img/sneaks.png', 'img/uphill.png', 'img/bike_rider.png', 'img/dance_thing.png','img/goalpost.png','img/tee.png', 'img/flight.png','img/lacrosse.png','img/mask.png',
     'img/sprint.png','img/ramp.png', 'img/kick.png','img/phelps.png','img/raquet.png', 'img/frisbee.png','img/strength.png','img/pose.png'];

       for(var i = 0; i < interests.length; i++){
   	      data = {
   	           "displayName": interests[i],
                "images": {
                  "backgroundImg": backgroundImg[i],
                  "icon": icon[i]
                }
   	      };
   	      key = ref.push().key;
   	      ref.child(key).set(data);
       }
 	    return;
 	  };


	  this.get = function(id){
      console.log('in interest.get');
      var intresets = (id) ? firebase.database().ref('interest/' + id) : firebase.database().ref('interest');
      return intresets.once('value').then(function (snapshot) {
          var currentObj = snapshot.val();
          if (currentObj) {
              return currentObj;
          }
          return undefined;
      });
    };

 });
