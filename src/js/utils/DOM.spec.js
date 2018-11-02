import install from 'jasmine-es6/overrides/async';
import DOM from './DOM';
install();

describe( "DOM manipulation utility", function() {

  it( "should be defined", function() {
    expect( DOM ).not.toBe( undefined );
  });

});

