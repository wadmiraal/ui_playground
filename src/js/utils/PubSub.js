
class PubSub {

  constructor() {
    this.callbacks = {};
  }

  trigger = ( eventName, event ) => {
    if ( typeof this.callbacks[ eventName ] !== 'undefined' ) {
      this.callbacks[ eventName ].forEach( ( callback ) => {
        callback( event );
      } );
    }
  };

  on = ( eventName, listener ) => {
    if ( typeof this.callbacks[ eventName ] === 'undefined' ) {
      this.callbacks[ eventName ] = [];
    }

    this.callbacks[ eventName ].push( listener );
  };

}

export let pubsub = new PubSub();
