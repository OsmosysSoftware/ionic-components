# Push notifications in Ionic with Amazon SNS.
This helps in registering and recieving push notifications in Ionic.

## What is this?
This consists of a piece of code that handles the push notifications in an Ionic app.

## Requirements
* [Phonegap push notifications plugin.](https://github.com/phonegap/phonegap-plugin-push#phonegap-plugin-push-)
* [GCM sender ID](https://developers.google.com/cloud-messaging/gcm)

## Usage
The PushNotificationFactory.js file should be included in index.html file as given below:

```html
<script src="PATH OF THE PushNotificationFactory.js FILE" type="text/javascript"></script>
```

Use the factory methods in your controller for registering to / recieving the push notifications. A sample piece of code is given below:

### Register
Initializes the plugin on the native side. This method adds listeners for the following events:
* push.on('registration', callback)
* push.on('notification', callback)
* push.on('error', callback)
```javascript
PushNotificationFactory.register().then (function (success) {
   // Success call back
}, function (error) {
   // Error callback
})
```

### Unregister
The unregister method is used when the application no longer wants to receive push notifications.
```javascript
PushNotificationFactory.unregister().then (function ( success ) {
   // Success call back
}, function (error) {
   // Error callback
})
```
