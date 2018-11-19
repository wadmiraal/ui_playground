import { pubsub } from '../utils/PubSub';

class Menu {

  constructor( domElement ) {
    this.element = domElement;

    domElement.find( '.menu__item--open' ).on( 'click', ( e ) => {
      this.element.toggleClass( 'menu--open' );
    });

    domElement.find( '.menu__item' ).on( 'click', ( e ) => {
      const attribute = e.target.attributes.getNamedItem( 'data-trigger-action' );
      if ( attribute ) {
        pubsub.trigger( 'menu:click', {
          action: attribute.value
        } );
      }
    });
  };

}

export default Menu;
