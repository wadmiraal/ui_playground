
class Search {

  constructor( domElement ) {
    this.element = domElement;
    const wrapper = domElement.find( '.search__wrapper' );
    domElement.find( '.search__icon' ).on( 'click', ( e ) => {
      wrapper.toggleClass( 'search__wrapper--show' );
    });
  }

}

export default Search;
