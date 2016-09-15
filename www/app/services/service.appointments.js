angular.module('service.appointments', [])
 .service('appointmentsService', function($localStorage){
   var table = 'appointments';
        var get = function (id) {
            var refId = (id) ? [table, id].join('/'): table;
            var db = firebase.database().ref(refId);
            return db.once('value').then(function (snapshot) {
                  var currentObj = snapshot.val();
                  if (currentObj) {
                      return currentObj;
                  }
                  return undefined;
              });
        };

        var create = function (data) {
            //create a location in the table
            var obj = {
                "notes": data.notes,
                "startAt": data.startAt,
                "allDay": data.allDay,
                "title": data.title,
                "phone": data.phone,
                "endAt": data.endAt,
                "location": data.location,
                "type": data.type,
                "created": firebase.database.ServerValue.TIMESTAMP,
                "createdBy": $localStorage.account.userId,
                "state": {
                    "actionable": true,
                    "visible": true,
                    "active": true
                }
            };
            console.log(obj);
            var db = firebase.database().ref(table);
            var key = db.push(obj).key;
            return key;
        };

        var update = function (data) {
            //reference to data record
            var refId = [table, data.id].join('/');
            //firebase db promise to top level data object.
            var db = firebase.database().ref(refId);
            //
            return db.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                  var obj = {
                      "notes": data.notes ? data.notes : currentObj.notes,
                      "startAt": data.startAt ? data.startAt : currentObj.startAt,
                      "type": data.type ? data.type : currentObj.type,
                      "allDay": data.allDay ? data.allDay : currentObj.allDay,
                      "title": data.title ? data.title : currentObj.title,
                      "phone": data.phone ? data.phone : currentObj.phone,
                      "endAt": data.endAt ? data.endAt : currentObj.endAt,
                      "location": data.location ? data.location : currentObj.location,
                      "created": firebase.database.ServerValue.TIMESTAMP ? data.notes : currentObj.notes,
                      "lastModified": firebase.database.ServerValue.TIMESTAMP,
                      "createdBy": data.createdBy ? data.createdBy : currentObj.createdBy,
                      "state": {
                        "actionable": actionable ? actionable : currentObj.actionable,
                        "visible": visible ? visible : currentObj.visible,
                        "active": active ? active : currentObj.active
                      }
                  };
                    return db.update(obj);
                }
                return null;
            });
        };

        var remove = function (id) {
            //firebase refID
            var refId = [table, id, 'state'].join('/');
            //reference to firebase db
            var db = firebase.database().ref(refId);
            return db.once('value').then(function (snapshot) {
                //current data. this ensures that this record exists before we attempt to remove
                var currentObj = snapshot.val();
                if (currentObj) {
                    var obj = {
                            "actionable": false,
                            "visible": false,
                            "active": false
                    };
                    return db.update(obj);
                }
                return null;
            });
        };

        //public services
        this.create = create;
        this.update = update;
        this.remove = remove;
        this.get = get;

});
