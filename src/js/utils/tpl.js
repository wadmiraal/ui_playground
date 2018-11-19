
class Template {

  constructor( string ) {
    this.templateString = string;
  }

  render = ( variables ) => {
    let result = this.templateString;
    if ( Object.keys( variables ).length ) {
      for ( const key of Object.keys( variables ) ) {
        result = result.replace(
          new RegExp( `\{\{\\s*${key}\\s*\}\}`, 'g' ),
          variables[ key ]
        );
      }
    }
    return result;
  };

}

export const tpl = {
  compile( string ) {
    return new Template( string );
  }
};
