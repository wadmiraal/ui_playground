
class DomElement {

  constructor( elements ) {
    this.elements = Array.from( elements );
  }

  toggleClass = ( classname ) => {
    if ( this.hasClass( classname ) ) {
      this.removeClass( classname );
    } else {
      this.addClass( classname );
    }
  };

  hasClass = ( classname ) => {
    return this.elements.reduce( ( acc, item ) => {
      if ( !acc ) {
        return item.classList.contains( classname );
      }
      return acc;
    }, false );
  };

  addClass = ( classname ) => {
    this.elements.forEach( ( item ) => item.classList.add( classname ) );
  };

  removeClass = ( classname ) => {
    this.elements.forEach( ( item ) => item.classList.remove( classname ) );
  };

  on = ( event, callback ) => {
    this.elements.forEach( ( item ) => item.addEventListener( event, callback, false ) );
  };

  html = ( content ) => {
    if ( typeof content === 'undefined' ) {
      if ( this.elements.length === 1 ) {
        return this.elements[ 0 ].innerHTML;
      } else {
        const result = [];
        this.elements.forEach( ( item ) => result.push( item.innerHTML ) );
        return result;
      }
    } else if (typeof content === 'string' ) {
      this.elements.forEach( ( item ) => item.innerHTML = content );
    } else {
      throw new Error( "Content can only be a string." );
    }
  };

  find = ( selector ) => {
    const list = [];
    this.elements.forEach( ( item ) => {
      const elements = item.querySelectorAll( selector );
      if ( elements.length ) {
        list.push( ...elements );
      }
    } );

    if ( list.length ) {
      return new DomElement( list );
    }
  };

  getNode = () => {
    return this.elements.length === 1 ? this.elements[ 0 ] : this.elements;
  };

}


const DOM = {

  find( selector ) {
    const elements = document.querySelectorAll( selector );
    if ( elements.length ) {
      return new DomElement( elements );
    }
  }

};

export default DOM;
