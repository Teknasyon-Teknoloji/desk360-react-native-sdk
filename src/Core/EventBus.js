/**
 * EventBus
 *
 * Taken from: "https://github.com/crazycodeboy/react-native-event-bus"
 */
export default class EventBus {
  eventListeners = [];

  /**
   * Get singleton instance of this class
   */
  static getInstance() {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }

    return EventBus.instance;
  }

  /**
   * @deprecated since version 1.0.3 (Use fireEvent instead of this method.)
   *
   * Fire event to all listeners
   *
   * @param {String} eventName
   * @param {Object} data
   */
  dispatch(eventName, data) {
    this.fireEvent(eventName, data);
  }

  /**
   * Fire event to all listeners
   *
   * @param {String} eventName
   * @param {Object} data
   */
  fireEvent(eventName, data) {
    const Listeners = this.eventListeners[eventName];

    if (Array.isArray(Listeners)) {
      Listeners.map((listener) => {
        if (typeof listener === 'function') {
          listener(data);
        }
      });
    }
  }

  /**
   * @deprecated since version 1.0.3 (Use addListener instead of this method.)
   *
   * Add listener to given event
   *
   * @param {String} eventName
   * @param {Function} listener
   */
  listen(eventName, listener) {
    this.addListener(eventName, listener);
  }

  /**
   * Add listener to given event
   *
   * @param {String} eventName
   * @param {Function} listener
   */
  addListener(eventName, listener) {
    let listeners = this.eventListeners[eventName];

    if (Array.isArray(listeners)) {
      listeners.push(listener);
    } else {
      this.eventListeners[eventName] = [listener];
    }
  }

  /**
   * Remove event listener
   *
   * @param {Function} listener
   */
  removeListener(listener) {
    Object.keys(this.eventListeners).map(eventName => {
        let listeners = this.eventListeners[eventName];

        if (listeners) {
          for (let i = 0, l = listeners.length; i < l; i++) {
            if (listener === listeners[i]) {
              listeners.splice(i, 1);
            }
          }
        }

        if (listeners.length === 0) {
            delete this.eventListeners[eventName];
        }
    })
  }
}
