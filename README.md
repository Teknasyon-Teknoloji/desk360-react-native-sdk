
# Desk360 React Native SDK


* This package gives wrapper methods for Desk360 sdks. [iOS](https://github.com/Teknasyon-Teknoloji/desk360-ios-sdk) - [Android](https://github.com/Teknasyon-Teknoloji/desk360-android-sdk)
* Before implementing, fetch SDK App Key from Desk360 dashboard.
  

---


## Getting started

  

`$ npm install Teknasyon-Teknoloji/desk360-react-native-sdk#1.1.0 --save`

  

**React Native 0.59 and below**

  

Run `$ react-native link react-native-desk360rn` to link the library.

  
  

### Installation Notes

-  **IOS**

- Set ios version to 10.0 or higher in `ios/Podfile` like: `platform :ios, '10.0'`

- Remove `flipper` from `ios/Podfile` if exists.

- Add `use_frameworks!`for your target

- Run `$ cd ios && pod install`

  

-  **ANDROID**

- Set `minSdkVersion` to 21 or higher in `android/build.gradle`

- Add `maven { url 'https://jitpack.io/' }` into `android/build.gradle` (Add into repositories under allprojects)

- Make sure your min gradle version is "3.6.4" or higher in `android/build.gradle`. (Check troubleshooting section to see example)

  
  

Add Data and View Binding enable script

  

```

apply plugin: 'kotlin-kapt'

  

android {

buildFeatures {

dataBinding true

}

}

```

---

  

## Usage

  

### Let's start

  

- On application start you need to initialize sdk with api key and environment. Start Desk360 with appId -and an optinal deviceId, an optional language-

  

> Note: If no deviceId is provided, Desk360 will use device's [UUID](https://developer.apple.com/documentation/foundation/uuid), which might cause your app to lose tickets when the application is deleted. If use environment type .production, Desk360 will look at prod url. If no application language is provided, Desk360 will use device's language.

  

```javascript

import  RNDesk360, { Desk360Platform, Desk360Environment } from  'react-native-desk360rn';

RNDesk360.getInstance().initialize({
	"appID":  "APP KEY",
	"deviceID":  "DEVICE ID",
	"appVersion":  "1.0.0",
	"languageCode":  'en',
	"environment":  Desk360Environment.SANDBOX,
	"platform":  Desk360Platform.GOOGLE,
	"countryCode":  'tr',
	"bypassCreateTicketIntro":true,
	"name":  "Username (ticket ownner)",
	"jsonInfo":{
		"key":"value"
	}
});

RNDesk360.getInstance().start(); // shows Desk360

```


### Important footnot

  

You must add your info.plist file.

```

<key>NSPhotoLibraryUsageDescription</key>

<string>Allow the app to access your photos.</string>

```

Permission text is optional. you can type whatever you want. But this permission not optional. If you didn't add this permission. Desk360 Images attachment property doesn't work.

  

### Using Optional Notification System

If you need to send a notification when a message is sent to the users. You have to do this integration in ios.

  
  

```swift

import  Desk360

  

@UIApplicationMain

final  class  AppDelegate: UIResponder, UIApplicationDelegate {

  
	func  application(_  application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken  deviceToken: Data) {
	
		Desk360.setPushToken(deviceToken: deviceToken)
	
	}

}

```

  

After the above integration, it is sufficient to make the notification certificate settings in the [Desk360](https://desk360.com/) admin panel. You can now use notifications

  

Also if you want notification redirect deeplink system. You should some extra integration.

  
  

```swift

import  Desk360

  

@UIApplicationMain

final  class  AppDelegate: UIResponder, UIApplicationDelegate {

	func  application(_  application: UIApplication, didFinishLaunchingWithOptions  launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

		Desk360.applicationLaunchChecker(launchOptions)

		if  #available(iOS  10.0, *) {

			let center = UNUserNotificationCenter.current()

			center.delegate = self

		}

		return  true

	}

}

  
  

// MARK: - UNUserNotificationCenterDelegate

extension  AppDelegate: UNUserNotificationCenterDelegate {

 
	func  userNotificationCenter(_  center: UNUserNotificationCenter, willPresent  notification: UNNotification, withCompletionHandler  completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {

		completionHandler([.alert])

		Desk360.willNotificationPresent(notification.request.content.userInfo)

	}

  

	func  application(_  application: UIApplication, didReceiveRemoteNotification  userInfo: [AnyHashable: Any], fetchCompletionHandler  completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {

		Desk360.applicationUserInfoChecker(userInfo)

	}

	@available(iOS  10.0, *)

	public  func  userNotificationCenter(_  center: UNUserNotificationCenter, didReceive  response: UNNotificationResponse, withCompletionHandler  completionHandler: @escaping () -> Void) {

		Desk360.applicationUserInfoChecker(response.notification.request.content.userInfo)

	}

}

  

```

  

When you click on the notification when your application is closed, you need to add this code on which page you want Des360 to open.

  

```javascript

...

RNDesk360.getInstance().showWithPushDeeplink();

...

  

```

  

### Getting the unread tickets

If you would like to get a list of the unread tickets you can do so like follows:

```javascript

RNDesk360.getInstance().getUnreadTickets().then( (results) {

	print(results);

});

  

```

  

You can show the unread tickets the way that fits your app design and expierence. If you want to navigate to a specific ticket

detail you can do so so by following:

  

```javascript

RNDesk360.getInstance().ticketDetailsViewController(unreadTicket);

  

```

  

### Customize Desk360 Theme

  

You should use [Desk360](https://desk360.com/) dashboard for custom config.



## License

  
  
Desk360 is released under the MIT license. See [LICENSE](https://github.com/Teknasyon-Teknoloji/desk360-react-native-sdk/blob/master/LICENSE) for more information.
