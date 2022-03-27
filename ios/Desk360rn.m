#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Desk360rn, NSObject)

RCT_EXTERN_METHOD(start:(NSDictionary *)desk360Properties)

RCT_EXTERN_METHOD(show:(BOOL *)animated)

RCT_EXTERN_METHOD(setPushToken:(NSData *)deviceToken)

RCT_EXTERN_METHOD(applicationLaunchChecker:([UIApplication.LaunchOptionsKey: Any] *)launchOptions)

RCT_EXTERN_METHOD(applicationUserInfoChecker:([UIApplication.LaunchOptionsKey: Any] *)launchOptions)

RCT_EXTERN_METHOD(willNotificationPresent:([AnyHashable: Any] *)data)

RCT_EXTERN_METHOD(showWithPushDeeplink)

RCT_EXTERN_METHOD(getUnreadTickets:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(ticketDetailsViewController:(NSDictionary *)ticket)

RCT_EXTERN_METHOD(showDetails:(NSDictionary *)ticket withAnimated:(BOOL)animated)

@end
