angular.module('service.engagements', [])
    .service('engagementService', function () {
        //check if user has already engaged with this item
        var get = function(data){
          if(data.userId && !data.itemId){
            data.itemId = data.userId;
          }
          var arr = [data.type, data.category, data.categoryId, data.itemId];
          var db = firebase.database();
          //check type
          var refId = arr.join('/');
          return db.ref(refId).once('value').then(function (snapshot) {
              var currentObj = snapshot.val();
              //console.log({currentObj: currentObj, refId: refId});
              if (currentObj){
                return currentObj;
              }
              return null;
        });
      };

        var engaged = function (data) {
          if(data.userId && !data.itemId){
            data.itemId = data.userId;
          }
        //type, category, categoryId, itemId
            var arr = [data.type, data.category, data.categoryId, data.itemId];
            var db = firebase.database();
            //check type
            var refId = arr.slice(0, 1).join('');
            return db.ref(refId).once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    //check type/category
                    var refId = arr.slice(0, 2).join('/');
                    return db.ref(refId).once('value').then(function (snapshot) {
                        var currentObj = snapshot.val();
                        if (currentObj) {
                            //check type/category/categoryId
                            var refId = arr.slice(0, 3).join('/');
                            return db.ref(refId).once('value').then(function (snapshot) {
                                var currentObj = snapshot.val();
                                if (currentObj) {
                                    //check type/category/categoryId/itemId
                                    var refId = arr.slice(0, 4).join('/');
                                    return db.ref(refId).once('value').then(function (snapshot) {
                                        var currentObj = snapshot.val();
                                        if (currentObj) {
                                            return true;
                                        }
                                        //type/category/categoryId exists
                                        return arr.slice(0, 3);
                                    });
                                }
                                //type/category/ exists
                                return arr.slice(0, 2);
                            });
                        }
                        //type exists
                        return arr.slice(0, 1);
                    });
                }
                //nothing exists
                return false;
            });
        };

        //returns true when engagement successfully registers in db, returns false otherwise.
        var updateEngagement = function (data) {
          if(data.userId && !data.itemId){
            data.itemId = data.userId;
          }
            //check if there has been this type of engagement on this item
            //if not create this item for the first time
            //type, category, categoryId, itemId, userId, comment, active, visible, actionable
            console.log(data);
            return engaged(data).then(function (exists) {
                if (exists instanceof Array || exists === false || (data.userId && typeof (data.comment) === 'string')) {
                    var len = exists instanceof Array ? exists.length : 0;
                    var final = {};
                    var obj = {
                        "created": firebase.database.ServerValue.TIMESTAMP,
                        "lastModified": firebase.database.ServerValue.TIMESTAMP,
                        "state": {
                            "actionable": typeof(data.actionable) !== 'undefined'? (data.actionable) : true,
                            "visible": typeof(data.visible) !== 'undefined'? (data.visible) : true,
                            "active": typeof (data.active) !== 'undefined' ? (data.active) : true
                        }
                    };
                    if(data.extras){
                      angular.extend(obj, data.extras);
                      delete data.extras;
                    }
                    var ref;

                    //comment type
                    if (typeof (data.comment) === 'string' && len < 4) {
                        obj.comment = data.comment;
                        if (data.userId) {
                            obj.userId = data.userId;
                        }
                        refId = (len > 1) ? exists.join('/') : null;
                        refId = (len === 1) ? exists.join('') : refId;

                        if (exists === true || len === 3) {
                            refId = [data.type, data.category, data.categoryId].join('/');
                            return firebase.database().ref(refId).push(obj).key;
                        } else if (len === 0) {
                            //push
                            final[data.type] = {};
                            final[data.type][data.category] = {};
                            final[data.type][data.category][data.categoryId] = { 'fakedata': 1 };
                        } else if (len == 1) {
                            //update
                            final[data.category] = {};
                            final[data.category][data.categoryId] = { 'fakedata': 1 };
                        } else if (len == 2) {
                            //update
                            final[data.categoryId] = {
                                'fakedata': 1
                            };
                        }


                        var db = (typeof (exists) === 'boolean' || len === 0) ? firebase.database().ref() : firebase.database().ref(refId);
                        return db.update(final).then(function () {
                            //successfully saved
                            if (len < 3) {
                                var refId = [data.type, data.category, data.categoryId].join('/');
                                return firebase.database().ref(refId).push(obj).key;
                            }

                            return true;

                        }, function () {
                            //failed
                            return false;
                        });

                    } else {
                        if (len === 0) {
                            final[data.type] = {};
                            final[data.type][data.category] = {};
                            final[data.type][data.category][data.categoryId] = {};
                            final[data.type][data.category][data.categoryId][data.itemId] = obj;
                        } else if (len == 1) {
                            final[data.category] = {};
                            final[data.category][data.categoryId] = {};
                            final[data.category][data.categoryId][data.itemId] = obj;
                        } else if (len == 2) {
                            final[data.categoryId] = {};
                            final[data.categoryId][data.itemId] = obj;
                        } else if (len == 3) {
                            final[data.itemId] = obj;
                        } else if (len == 4) {
                            final = obj;
                        }
                    }

                    //set location to firebase record
                    refId = (len > 1) ? exists.join('/') : null;
                    refId = (len === 1) ? exists.join('') : refId;

                    var db = (typeof (exists) === 'boolean' || len === 0) ? firebase.database().ref() : firebase.database().ref(refId);
                    return db.update(final).then(function () {
                        //successfully saved
                        return true;
                    }, function () {
                        //failed
                        return false;
                    });
                }

                //if there is engagement just do an update
                refId = data.type;
                refId += data.category ? '/' + data.category : '';
                refId += data.categoryId ? '/' + data.categoryId : '';


                var db = firebase.database().ref(refId);
                return db.once('value').then(function (snapshot) {
                    var prev = snapshot.val();
                    if (prev && data.itemId in prev) {
                        prev = prev[data.itemId];
                    }
                    var final = {};
                    final[data.itemId] = {};

                    if(data.extras){
                      angular.extend(final[data.itemId], prev, data.extras);
                      delete data.extras;
                    }else if(prev){
                      angular.extend(final[data.itemId], prev);
                    }

                    final[data.itemId].created = prev.created;
                    final[data.itemId].lastModified = firebase.database.ServerValue.TIMESTAMP;
                    final[data.itemId].state = {};
                    final[data.itemId].state.actionable = typeof(data.actionable)!== 'undefined' ? data.actionable : prev.state.actionable;
                    final[data.itemId].state.visible = typeof(data.visible) !== 'undefined'? data.visible : prev.state.visible;
                    final[data.itemId].state.active = typeof (data.active) !== 'undefined' ? data.active : !prev.state.active;

                    //comment type
                    if (prev.comment && typeof (data.comment) === 'string') {
                        final[data.itemId].comment = typeof (data.comment) === 'string' ? data.comment : prev.comment;
                    }

                    if (data.userId && prev.userId) {
                        final[data.itemId].userId = data.userId ? data.userId : prev.userId;
                    }

                    return db.update(final).then(function () {
                        //successfully saved
                        return true;
                    }, function () {
                        //failed
                        return false;
                    });
                });
            });
        };


        this.createComment = function (data) {
            data.type = 'engagementComments';
            //check if engagement item is already in hash
            return updateEngagement(data);
        };

        this.create = function (data) {
            data.type = 'engagementComments';
            //check if engagement item is already in hash
            return updateEngagement(data);
        };

        this.addAppointment = function (data){
          data.extras= {
            "notes": data.notes,
            "startAt": data.startAt,
            "allDay": data.allDay,
            "title": data.title,
            "phone": data.phone,
            "endAt": data.endAt,
            "location": data.location
          };
          data.type = "appointment";
          data.active = true;
          return updateEngagement(data);
        };

        this.removeAppointment = function (data){
          data.type = "appointment";
          data.active = false;
          return updateEngagement(data);
        };

        this.engagedActivities = function (data) {
            data.type = 'engagedActivities';
            data.active = true;
            console.log('engagedActivities called');
            //check if engagement item is already in hash
            return updateEngagement(data);
        };

        this.disEngagedActivities = function (data) {
            data.type = 'engagedActivities';
            data.active = false;
            console.log('disEngagedActivities called');
            //check if engagement item is already in hash
            return updateEngagement(data);
        };

        this.trainerActivities = function (data) {
            data.type = 'trainerActivities';
            data.active = true;
            console.log('trainerActivities called');
            //check if engagement item is already in hash
            return updateEngagement(data);
        };
        this.removeTrainerActivities = function (data) {
            data.type = 'removeTrainerActivities';
            data.active = false;
            console.log('removeTrainerActivities called');
            //check if engagement item is already in hash
            return updateEngagement(data);
        };

        this.updateComment = function (data) {
            data.type = 'engagementComments';
            //check if engagement item is already in hash
            return updateEngagement(data);
        };

        this.deleteComment = function (data) {
            data.type = 'engagementComments';
            data.actionable = false;
            data.active = false;
            data.visible = false;
            data.comment = undefined;
            //check if engagement item is already in hash
            return updateEngagement(data);
        };

        this.getComments = function (data) {
            data.type = 'engagementComments';
            var refId = data.type;
            //get all comments in category
            refId += (data.category) ? '/' + data.category : '';
            //get all comments for category Id
            refId += (data.categoryId) ? '/' + data.categoryId : '';
            //get all comments for itemId
            refId += (data.itemId) ? '/' + data.itemId : '';

            var comments = firebase.database().ref(refId);
            return comments.once('value').then(function (snapshot) {
                var currentObj = snapshot.val();
                if (currentObj) {
                    return currentObj;
                }
                return undefined;
            });
        };

        this.getCommentsDynamic = function (data, func) {
            data.type = 'engagementComments';
            var refId = data.type;
            //get all comments in category
            refId += (data.category) ? '/' + data.category : '';
            //get all comments for category Id
            refId += (data.categoryId) ? '/' + data.categoryId : '';

            var comments = firebase.database().ref(refId);
            return comments.on('child_changed', func);
        };

        this.totalComments = function(data){
          return this.getComments(data.category, data.categoryId).then(function(result){
            var count = 0;
            if(result){
              for(var key in result){
                ++count;
              }
            }
            return count;
          });
        };

        this.liked = function (data) {
            data.type = 'engagementLikes';
            var data = get(data);
            //check if engagement item is already in hash
            return data.then(function(result){
              if('state' in result){
                return ((typeof(result.state.active)!=='undefined'))?result.state.active: false;
              }else if(data.userId in result){
                return ((typeof(result[data.userId].state.active)!=='undefined'))?result[data.userId].state.active: false;
              }

            });
        };


        this.likes = function(data){
          data.type = 'engagementLikes';
          var data = get(data);
          //check if engagement item is already in hash
          return data.then(function(result){
              return result;
          });
        };

        this.totalLikes = function(data){
          return this.likes(data).then(function(result){
            var count = 0;
            if(result){
              for(var key in result){
                ++count;
              }
            }
            return count;
          });
        };

        this.like = function (data) {
            data.type = 'engagementLikes';
            data.active = true;
            //check if engagement item is already in hash
            return updateEngagement(data);
        };

        this.unlike = function (data) {
            data.type = 'engagementLikes';
            data.active = false;
            console.log('unlike called');
            //check if engagement item is already in hash
            return updateEngagement(data);
        };

        this.commit = function (data) {
            data.type = 'engagementCommits';
            data.active = true;
            console.log('commit called');
            //check if engagement item is already in hash
            return updateEngagement(data);
        };

        this.committed = function (data) {
            data.type = 'engagementCommits';
            var data = get(data);
            //check if engagement item is already in hash
            return data.then(function(result){
              return (typeof(result.state.active)!=='undefined')?result.state.active: false;
            });
        };

        this.commits = function(data){
          data.type = 'engagementLikes';
          var data = get(data);
          //check if engagement item is already in hash
          return data.then(function(result){
              return result;
          });
        };

        this.totalCommits = function(data){
          return this.commits(data).then(function(result){
            var count = 0;
            if(result){
              for(var key in result){
                ++count;
              }
            }
            return count;
          });
        };

        this.decommit = function (data) {
            data.type = 'engagementCommits';
            data.active = false;
            console.log('uncommit called');
            //check if engagement item is already in hash
            return updateEngagement(data);
        };

    });
