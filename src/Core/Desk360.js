import { NativeModules, Platform } from "react-native";
import AndroidFunctions from "./Methods/AndroidFunctions";
import CommonFunctions from "./Methods/CommonFunctions";
import IOSFunctions from "./Methods/IOSFunctions";

export default class Desk360 {
  nativeDesk360;
  listenSdkEvents = false;

  static getInstance() {
    if (!Desk360.instance) {
      Desk360.instance = new Desk360();
    }

    return Desk360.instance;
  }

  constructor() {
    const LINKING_ERROR =
    `The package 'react-native-desk360rn' doesn't seem to be linked. Make sure: \n\n` +
    Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo managed workflow\n';
  
    this.nativeDesk360 = NativeModules.Desk360rn
      ? NativeModules.Desk360rn 
      : new Proxy(
          {},
          {
            get() {
              throw new Error(LINKING_ERROR);
            },
          }
        );

    // if (!this.listenSdkEvents) {
    //   new SdkEventListener().listenEvents();
    //   this.listenSdkEvents = true;
    // }
    
  }

  /**
   * @param properties
   * @param token
   * @returns {Void}
   */
   initialize(properties, token = null) {
    new CommonFunctions(this.nativeDesk360).initialize(properties, token);
  }

  /**
   * @param properties
   * @returns {Void}
   */
  start(animated = true) {
    new CommonFunctions(this.nativeDesk360).start(animated);
  }

  /**
   * @param deviceToken
   * @returns {Void}
   * IOS Only
   */
  setPushToken(deviceToken) {
    new IOSFunctions(this.nativeDesk360).setPushToken(deviceToken);
  }

  /**
   * @returns {Void}
   * IOS Only
   */
   showWithPushDeeplink() {
    new IOSFunctions(this.nativeDesk360).showWithPushDeeplink();
  }

  /**
   * @param {callback}
   * @returns {Void}
   * IOS Only
   */
  getUnreadTickets(callback) {
    new IOSFunctions(this.nativeDesk360).getUnreadTickets(callback);
  }

  /**
   * @param ticket
   * @returns {Void}
   * IOS Only
   */
   ticketDetailsViewController(ticket) {
    new IOSFunctions(this.nativeDesk360).ticketDetailsViewController(ticket);
  }

  /**
   * @param ticket
   * @returns {Void}
   * IOS Only
   */
  showDetails(ticket, animated = true) {
    new IOSFunctions(this.nativeDesk360).showDetails(ticket, animated);
  }
  /**
   * @param launchOptions
   * @returns {Void}
   * IOS Only
   */
  applicationLaunchChecker(launchOptions) {
    new IOSFunctions(this.nativeDesk360).applicationLaunchChecker(launchOptions);
  }

  /**
   * @param userInfo
   * @returns {Void}
   * IOS Only
   */
  willNotificationPresent(userInfo) {
    new IOSFunctions(this.nativeDesk360).willNotificationPresent(userInfo);
  }

  /**
   * @param launchOptions
   * @returns {Void}
   * IOS Only
   */
  applicationUserInfoChecker(launchOptions) {
    new IOSFunctions(this.nativeDesk360).applicationUserInfoChecker(launchOptions);
  }

  /**
   * @param hermes
   * @returns {String}
   * Android Only
   */
  getTicketId(hermes, callback) {
    new AndroidFunctions(this.nativeDesk360).getTicketId(hermes, callback);
  }

}