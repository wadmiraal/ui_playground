
class DomElement {

  constructor( element) {
    this.element = element;
  }

  toggleClass = ( classname ) => {
    if ( this.hasClass( classname ) ) {
      this.removeClass( classname );
    } else {
      this.addClass( classname );
    }
  };

  hasClass = ( classname ) => {
    return this.element.classList.contains( classname );
  };

  addClass = ( classname ) => {
    this.element.classList.add( classname );
  };

  removeClass = ( classname ) => {
    this.element.classList.remove( classname );
  };

  on = ( event, callback ) => {
    console.log(this.element)
    this.element.addEventListener( event, callback, false );
  };

  find = ( selector ) => {
    const element = this.element.querySelector( selector );
    return new DomElement( element );
  }

}


const DOM = {

  find( selector ) {
    const element = document.querySelector( selector );
    console.log( selector, element)
    return new DomElement( element );
  }

}

export default DOM;
