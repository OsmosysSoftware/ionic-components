angular.module('factories')
  .service('PushNotificationFactory', PushNotificationFactory);

function PushNotificationFactory($rootScope, $q, SocialConstants) {

  function register() {
    var q = $q.defer();
    try {
      document.addEventListener("deviceready", function () {
        $rootScope.push = PushNotification.init({
          "android": {
            // Here we need to specify GCM sender ID which we get from Firebase
            "senderID": SocialConstants.GCM_SENDER_ID, 
            "forceShow": true,
            "payload": {
              "content-available": "1"
            }
          },
          "IOS": {
            "badge": true,
            "sound": true,
            "alert": false
          }
        });

        $rootScope.push.on('registration', function (data) {
          var id = data.registrationId;
          q.resolve(id);
        });

        $rootScope.push.on('notification', function (data) {
          redirectToScreen(data);
        });

        $rootScope.push.on('error', function (e) {
          console.log(e);
        });

      }, false);

    } catch (e) {
      q.reject(e);
    }
    return q.promise;
  }

  function unregister() {
    var q = $q.defer();
    if ($rootScope.push) {
      $rootScope.push.unregister(function (success) {
        q.resolve(success);
      }, function (error) {
        q.reject(error);
      });
    } else {
      q.reject("NULL REFERENCE");
    }
    return q.promise;
  }

  function redirectToScreen(data) {
    var message = data.message;
    var title = data.title;
    var additionalData = data.additionalData;
    console.log(additionalData);
    var isForground = additionalData.foreground;
    // Implement your code to redirect to the screen that you want.
  }

  return {
    register: register,
    unregister: unregister,
    redirectToScreen: redirectToScreen
  };
}
