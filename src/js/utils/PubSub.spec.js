import install from 'jasmine-es6/overrides/async';
import { pubsub } from './PubSub';
install();

describe( "PubSub utility", function() {

  it( "should be defined", function() {
    expect( pubsub ).toBeDefined();
  });

  it( "should allow events to be subscribed to, and triggered", function() {
    const eventHandler = jasmine.createSpy( 'eventHandler' );
    const event = { myAttr: true };

    pubsub.on( 'my-custom-event', eventHandler );
    pubsub.trigger( 'my-custom-event', event );

    expect( eventHandler ).toHaveBeenCalledWith( event );
  });

});

