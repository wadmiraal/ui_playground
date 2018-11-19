import { pubsub} from "../utils/PubSub";

class RenderableComponent {

  constructor( wrapper ) {
    _register( this );
    this.wrapper = wrapper;
    this.rendered = false;
    this.html = '';

    // Bind methods.
    this.mount.bind( this );
    this.unmount.bind( this );
    this.render.bind( this );
    this.preRender.bind( this );
    this.postRender.bind( this );
  }

  mount() {
    if ( !this.rendered ) {
      this.render();
    }
    this.wrapper.html( this.html );
  }

  render() {
    this.rendered = true;
  }

  preRender() {
    _willGetRendered( this );
  }

  postRender() { /* No-op. */ }

  unmount() { /* No-op. */ }

}

// Keep track of all renderables. Not the cleanest, but it's the simplest
// solution. This also allows us to keep track of who needs unmounting.
const renderables = [];

function _register( renderable ) {
  renderables.push( renderable );
}

function _willGetRendered( renderable ) {
  renderables.forEach( ( element ) => {
    if ( element !== renderable ) {
      element.unmount();
    }
  });
}

export default RenderableComponent;
