import install from 'jasmine-es6/overrides/async';
import { tpl } from './tpl';
install();

describe( "Template utility", function() {

  it( "should be defined", function() {
    expect( tpl ).toBeDefined();
  });

  it( "should allow strings to be compiled to template objects", function() {
    const template = tpl.compile( `<h1>Hello world</h1>` );
    expect( template ).toBeDefined();
  });

  it ( "should render template strings using the passed variables", function() {
    const template = tpl.compile( `<h1>{{ title }}</h1>` );
    expect( template.render({ title: "Hello World" }) ).toEqual( '<h1>Hello World</h1>' );
  });

});

