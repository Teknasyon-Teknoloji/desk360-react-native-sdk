import {NativeEventEmitter, NativeModules} from 'react-native';
import Desk360Exception from '../Exceptions/Desk360Exception';
import ErrorCodes from '../Enums/ErrorCodes';
import EventBus from './EventBus';

export default class SdkEventListener {
  constructor() {
    if (!NativeModules.RNDesk360ReactNativeEmitter) {
      throw new Desk360Exception(
        ErrorCodes.NATIVE_MODULE_EVENT_EMITTER_NOT_FOUND,
      );
    }
  }

  listenEvents() {
    const NativeEventBusEmitter = new NativeEventEmitter(
      NativeModules.RNDesk360ReactNativeEmitter,
    );

    NativeEventBusEmitter.addListener('Desk360Event', (Desk360Event) => {
      EventBus.getInstance().fireEvent(
        Desk360Event.event,
        typeof Desk360Event.data === 'undefined' ? null : Desk360Event.data,
      );
    });
  }
}
