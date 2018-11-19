import install from 'jasmine-es6/overrides/async';
import 'jasmine_dom_matchers';
import DOM from './DOM';
import { JSDOM } from 'jsdom';
install();

describe( "DOM manipulation utility", function() {

  beforeEach(function() {
    // Mock the global document object.
    global.document = new JSDOM(`<body><div class="my-other-element"></div><div class="my-element"><span class="my-child-element">Ahem</span></div><ul><li class="multiple">Hi</li><li class="multiple with-class">There</li></ul><span class="multiple">Last one</span></body>`).window.document;

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

  it( "should allow to manipulate elements across multiple parents", function() {
    const element = DOM.find( '.multiple' );

    expect( element.hasClass( 'with-class' ) ).toBe( true );
    expect( 'span.multiple' ).not.toHaveClass( 'with-class' );
    expect( 'li.multiple:nth-child(2)' ).toHaveClass( 'with-class' );

    element.addClass( 'with-class' );
    expect( 'span.multiple' ).toHaveClass( 'with-class' );
    expect( 'li.multiple:first-child' ).toHaveClass( 'with-class' );

    element.removeClass( 'with-class' );
    expect( 'span.multiple' ).not.toHaveClass( 'with-class' );
    expect( 'li.multiple:first-child' ).not.toHaveClass( 'with-class' );

    element.toggleClass( 'with-class' );
    expect( 'span.multiple' ).toHaveClass( 'with-class' );
    expect( 'li.multiple:first-child' ).toHaveClass( 'with-class' );
    expect( 'li.multiple:nth-child(2)' ).toHaveClass( 'with-class' );
    element.toggleClass( 'with-class' );
    expect( 'span.multiple' ).not.toHaveClass( 'with-class' );
    expect( 'li.multiple:first-child' ).not.toHaveClass( 'with-class' );
    expect( 'li.multiple:nth-child(2)' ).not.toHaveClass( 'with-class' );
  });

  it( "should return elements with easy event listener methods", function() {
    const element = DOM.find( '.my-element' );
    const eventHandler = jasmine.createSpy( 'eventHandler' );

    element.on( 'click', eventHandler );
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

  it( "should return the actual element when it's on its own, or an array if multiple are concerned", function() {
    let element;
    element = DOM.find( '.multiple' );
    expect( element.getNode() ).toHaveLength( 3 );

    element = DOM.find( 'body' );
    expect( element.getNode() ).toEqual( global.document.querySelector( 'body' ) );
  });

  it( "should return the element's content when calling html() with no parameters", function() {
    let element;

    element = DOM.find( '.my-element' );
    expect( element.html() ).toEqual( '<span class="my-child-element">Ahem</span>' );

    element = DOM.find( '.multiple' );
    expect( element.html() ).toHaveLength( 3 );
    expect( element.html()[ 0 ] ).toEqual( 'Hi' );
  });

  it( "should set the element's content when calling html() with a parameter", function() {
    const element = DOM.find( '.my-child-element' );
    const content = '<span>What?</span>';

    element.html( content );
    expect( global.document.querySelector( '.my-child-element' ).innerHTML ).toEqual( content );
  });

  it( "should throw an error when calling html() with something different from a string", function() {
    const element = DOM.find( '.my-child-element' );
    expect( () => { element.html([ 'a string' ]) } ).toThrow( new Error( "Content can only be a string." ) );
  });

});

