angular.module('service.interest', ['firebase'])
 .service('interestService',function() {

   this.createInterestList = function(userId){
	    var data = {
	           "displayName": "Baseball"
	    };


      //var storageRef = firebase.storage.ref("Activities/baseball.png");

	    var ref = firebase.database().ref('interest');
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var baseballRef = storageRef.child('Activities/baseball.png');

      baseballRef.getDownloadURL().then(function(url) {
          // Insert url into an <img> tag to "download"
        }).catch(function(error) {
          switch (error.code) {
            case 'storage/object_not_found':
              // File doesn't exist
              break;

            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
          }
        });
      var baseball = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/baseball.png?alt=media&token=372b0f5a-8bc8-4b7d-af26-8d1e2b051487';
      var basketball = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/basketball.png?alt=media&token=db542d6d-dea6-4af2-bb39-14592079eedb';
      var climbing = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/climbing.png?alt=media&token=f1f5a758-f114-4896-949a-1ce91412151e';
      var cycling = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/bicycle_cycling.jpg?alt=media&token=42ece242-13b7-464f-b2b6-89e8e7b3895a';
      var dance = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/dance.png?alt=media&token=23a03203-ade6-4a62-bcb5-bfabc7741afd';
      var football = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/obamaPass.png?alt=media&token=bd227e32-557e-4f67-9144-ca753c963782';
      var golf = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/golf.png?alt=media&token=1a97df7f-e28a-458c-bbdc-b2dd0c78169d';
      var jumping = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/crazy.png?alt=media&token=f3faae58-b0dd-48c5-b272-e8f1e58a85ec';
      var lacrosse = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/Face-off.jpg?alt=media&token=9de877d4-cf6c-40b0-b62d-5e44bfc7ddfd';
      var paintball = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/paintball.png?alt=media&token=2ad4af4f-bcba-4fd6-947b-f649b490ad1b';
      var running = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/running.png?alt=media&token=3b1e145d-bf8f-4532-bb55-c4488a20e81f';
      var skate = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/skatepark.png?alt=media&token=62f9d960-5504-4f48-866d-df3f9d869fa0';
      var soccer = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/soccer.png?alt=media&token=8180b27e-333c-496c-8bca-5c3788ad7576';
      var swimming = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/swimming.png?alt=media&token=fc83a141-eaf3-4588-ba09-99621fa536a1';
      var tennis = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/tennis.png?alt=media&token=34fbd901-319e-4326-90b5-79bf1a6b301e';
      var ultimate_frisbee = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/ultimate_frisbee.jpg?alt=media&token=30beee46-796b-4bd8-8dde-d1172e15e36e';
      var lifting = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/lifting.png?alt=media&token=169bd52a-e9ae-4980-ac2f-6bef1151372e';
      var yoga = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/Acro_Yoga.jpg?alt=media&token=367bd61f-190d-41bd-a2a7-f6111408b43b';

      var baseballIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/swing.png?alt=media&token=5334379e-68c0-446d-b40d-cb77449311ac';
      var basketballIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/sneaks.png?alt=media&token=5b4fd347-616f-4dca-8a3c-e2b6004de465';
      var climbingIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/uphill.png?alt=media&token=887b283a-c143-487e-987c-16e9cf410df3';
      var cyclingIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/bike_rider.png?alt=media&token=b8e90e5d-582e-4615-871f-caef9f2681bf';
      var danceIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/dance_thing.png?alt=media&token=ce32fcf8-0493-45a9-a86b-a624b715ddb4';
      var footballIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/goalpost.png?alt=media&token=c593b1e7-a8c9-4008-850d-3a82bd8bdc4f';
      var golfIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/tee.png?alt=media&token=aabcd18a-992e-467b-8031-45ddb6934d3b';
      var jumpingIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/flight.png?alt=media&token=58322e6c-3f8b-42b3-9154-29c47558b999';
      var lacrosseIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/lacrosse.png?alt=media&token=6f5bc0d5-52d8-4a38-99b3-57db266434cf';
      var paintballIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/mask.png?alt=media&token=5ca4a5f4-4f86-4f74-ad75-dcd5a3c2dda6';
      var runningIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/sprint.png?alt=media&token=43e60d4c-3709-44e1-b2e0-68273bf90643';
      var skateIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/ramp.png?alt=media&token=e30f8d67-e485-48ca-8fe7-de525526e3cd';
      var soccerIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/kick.png?alt=media&token=c1c0eb76-585f-4bba-8521-d52b7a0f44ef';
      var swimmingIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/phelps.png?alt=media&token=cd86ef0d-5f9a-4eb0-ba9e-c78eebb92be3';
      var tennisIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/raquet.png?alt=media&token=38b67c2f-91e2-4327-8898-c8f9559bc492';
      var ultimate_frisbeeIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/frisbee.png?alt=media&token=9cc610b3-b6c8-45df-b6c9-a5979a52a685';
      var liftingIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/strength.png?alt=media&token=8a47bbf8-39cc-4e89-bfa2-87b29ad625cf';
      var yogaIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/pose.png?alt=media&token=5290eaa6-a721-489c-b2fe-3f8632187367';
      var key;

	    var interests = ['Baseball', 'Basketball','Climbing','Cycling','Dance','Football','Golf','Jumping', 'Lacrosee',
	              'Paintball','Running','Skate','Soccer', 'Swimming','Tennis', 'Ultimate Frisbee','Weight Lifting', 'Yoga'];

      var backgroundImg = [baseball,basketball,climbing,cycling,dance,football,golf,jumping,lacrosse,paintball,running,skate,
            soccer,swimming,tennis,ultimate_frisbee,lifting,yoga];

      var icon = [baseballIcon,basketballIcon,climbingIcon,cyclingIcon,danceIcon,footballIcon,golfIcon,jumpingIcon,lacrosseIcon,paintballIcon,
        runningIcon,skateIcon,soccerIcon,swimmingIcon,tennisIcon,ultimate_frisbeeIcon,liftingIcon,yogaIcon];

      for(var i = 0; i < interests.length; i++){
  	      data = {
  	           "displayName": interests[i],
                 "backgroundImg": backgroundImg[i],
                 "icon": icon[i]
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
      var baseball = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/yogi.png?alt=media&token=2009ba75-3e11-4770-a2ae-23941f7dcaae';
      var basketball = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/basketballCoach.png?alt=media&token=4bad93ce-46c6-47fe-8d07-0592ca1af0e1';
      var dance = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/danceClass.png?alt=media&token=d4dd163f-a829-43c2-99b1-4a70aae20370';
      var fight = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/boxing.png?alt=media&token=21d93159-1674-4cd1-a069-beac8aa9a887';
      var football = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/gridiron.png?alt=media&token=bcf81568-306b-4e9a-94ae-d6c7bf1580c8';
      var golf = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/golfCoach.png?alt=media&token=3facf4ca-a344-4778-b754-00b37d84320a';
      var lifting = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/weightCoach.png?alt=media&token=9491f492-f066-4e0d-b4eb-7d18f668dd97';
      var nutrition = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/doctor.jpg?alt=media&token=49895698-f7ce-425b-9b1f-32876de14890';
      var running = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/track.png?alt=media&token=b7cd1ed4-47e6-4de4-b566-683081962a8d';
      var soccer = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/soccerCoach.png?alt=media&token=56a574b5-d85b-4662-9edf-60c2683041cc';
      var swimming = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/swimmingCoach.png?alt=media&token=77efd26a-4046-4612-92de-34b8f13ca408';
      var tennis = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/tennisCoach.png?alt=media&token=c9705272-2713-4ade-8d29-51768f344aa4';
      var weightLoss = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/weightLoss.png?alt=media&token=e9481925-79ec-49f6-8386-387efc930394';
      var yoga = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/zenMaster.png?alt=media&token=f9afb666-6eec-453f-9603-d44ee2e5496d';

      var baseballIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/swing.png?alt=media&token=5334379e-68c0-446d-b40d-cb77449311ac';
      var basketballIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/sneaks.png?alt=media&token=5b4fd347-616f-4dca-8a3c-e2b6004de465';
      var climbingIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/uphill.png?alt=media&token=887b283a-c143-487e-987c-16e9cf410df3';
      var cyclingIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/bike_rider.png?alt=media&token=b8e90e5d-582e-4615-871f-caef9f2681bf';
      var danceIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/dance_thing.png?alt=media&token=ce32fcf8-0493-45a9-a86b-a624b715ddb4';
      var footballIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/goalpost.png?alt=media&token=c593b1e7-a8c9-4008-850d-3a82bd8bdc4f';
      var golfIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/tee.png?alt=media&token=aabcd18a-992e-467b-8031-45ddb6934d3b';
      var jumpingIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/flight.png?alt=media&token=58322e6c-3f8b-42b3-9154-29c47558b999';
      var lacrosseIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/lacrosse.png?alt=media&token=6f5bc0d5-52d8-4a38-99b3-57db266434cf';
      var paintballIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/mask.png?alt=media&token=5ca4a5f4-4f86-4f74-ad75-dcd5a3c2dda6';
      var runningIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/sprint.png?alt=media&token=43e60d4c-3709-44e1-b2e0-68273bf90643';
      var skateIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/ramp.png?alt=media&token=e30f8d67-e485-48ca-8fe7-de525526e3cd';
      var soccerIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/kick.png?alt=media&token=c1c0eb76-585f-4bba-8521-d52b7a0f44ef';
      var swimmingIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/phelps.png?alt=media&token=cd86ef0d-5f9a-4eb0-ba9e-c78eebb92be3';
      var tennisIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/raquet.png?alt=media&token=38b67c2f-91e2-4327-8898-c8f9559bc492';
      var fightIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/champ.png?alt=media&token=bc523e85-b755-4ff9-b1bb-8988a3a86146';
      var liftingIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/strength.png?alt=media&token=8a47bbf8-39cc-4e89-bfa2-87b29ad625cf';
      var yogaIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/pose.png?alt=media&token=5290eaa6-a721-489c-b2fe-3f8632187367';
      var nutritionIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/grapes.png?alt=media&token=5e6132d2-aa9c-4e4d-aa19-37ec2cbaa73a';
      var weightLossIcon = 'https://firebasestorage.googleapis.com/v0/b/trained-to-glory.appspot.com/o/scale.png?alt=media&token=f434cf33-e58b-421b-9829-22c0bb57da6f';
      var key;

 	    var interests = ['Baseball', 'Basketball','Dance','Fight Sports', 'Football','Golf','Lifting', 'Nutrition',
        'Running', 'Soccer', 'Swimming','Tennis', 'Weight Loss', 'Yoga'];

       var backgroundImg = [baseball,basketball,dance,fight,football,golf,lifting,nutrition,running,soccer,swimming,tennis,weightLoss,yoga];

       var icon = [baseballIcon,basketballIcon,danceIcon,fightIcon,footballIcon,golfIcon,liftingIcon,nutritionIcon,
         runningIcon,soccerIcon,swimmingIcon,tennisIcon,weightLossIcon,yogaIcon];

       for(var i = 0; i < interests.length; i++){
   	      data = {
   	           "displayName": interests[i],
                  "backgroundImg": backgroundImg[i],
                  "icon": icon[i]
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

    this.getImage = function(id){
      console.log('in interest.get');
      var table = 'activities';
      var refId = (id)?[table, '/', id].join(): table;
      var interests = firebase.database().ref(refId);
      console.log(refId);
      return interests.once('value').then(function (snapshot) {
          var currentObj = snapshot.val();
          if (currentObj) {
            debugger;
              return currentObj;
          }
          return undefined;
      });
    };

 });
