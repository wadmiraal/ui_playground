import install from 'jasmine-es6/overrides/async';
import 'jasmine_dom_matchers';
import DOM from './DOM';
import { JSDOM } from 'jsdom';
install();

describe( "DOM manipulation utility", function() {

  beforeEach(function() {
    // Mock the global document object.
    global.document = new JSDOM(`<body><div class="my-other-element"></div><div class="my-element"><span class="my-child-element"></span></div></body>`).window.document;

    // Also mock the global window object, for Jasmine DOM Matchers.
    global.window = {};
  });

  it( "should be defined", function() {
    expect( DOM ).toBeDefined();
  });

  it( "should be able to find elements", function() {
    const element = DOM.find( 'body' );
    expect( element ).toBeDefined();
    expect( element.getNode() ).toEqual( global.document.querySelector( 'body' ) );

    const none = element.find( 'not' );
    expect( none ).not.toBeDefined();
  });

  it( "should return elements with easy class manipulation methods", function() {
    const element = DOM.find( '.my-element' );

    element.addClass( 'my-class' );
    expect( '.my-element' ).toHaveClass( 'my-class' );

    element.removeClass( 'my-class' );
    expect( '.my-element' ).not.toHaveClass( 'my-class' );

    element.toggleClass( 'my-class' );
    expect( '.my-element' ).toHaveClass( 'my-class' );
    element.toggleClass( 'my-class' );
    expect( '.my-element' ).not.toHaveClass( 'my-class' );

    expect( element.hasClass( 'my-element' ) ).toBe( true );
    expect( element.hasClass( 'not-my-element' ) ).toBe( false );
  });

  it( "should return elements with easy event listener methods", function() {
    const element = DOM.find( '.my-element' );
    const eventHandler = jasmine.createSpy( 'eventHandler' );

    element.on( 'click', eventHandler() );
    const e = global.document.createEvent( 'MouseEvents' );
    e.initEvent( 'click', true, true );
    global.document.querySelector( '.my-element' ).dispatchEvent( e );

    expect( eventHandler ).toHaveBeenCalled();
  });

  it( "should return elements with easy access to child elements", function() {
    const element = DOM.find( '.my-element' );
    const child = element.find( '.my-child-element' );
    expect( child ).toBeDefined();
    expect( child.getNode() ).toEqual( global.document.querySelector( '.my-child-element' ) );

    const none = element.find( '.my-other-element' );
    expect( none ).not.toBeDefined();
  });

});

