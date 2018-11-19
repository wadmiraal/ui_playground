import { pubsub } from '../utils/PubSub';
import RenderableComponent from './RenderableComponent';

const addForm = `
  <form id="notes-add-form">
    <label>Title</label>
    <input type="text" name="title" />
    
    <label>Note</label>
    <textarea></textarea>
  </form>
`;

const editForm = `
  <form id="notes-add-form">
    <label>Title</label>
    <input type="text" name="title" value="{{ title }}" />
    
    <label>Note</label>
    <textarea>{{ note }}</textarea>
  </form>
`;

class Notes extends RenderableComponent {

  ADD_NOTE = 'add-note';

  constructor( wrapper ) {
    super( wrapper );

    pubsub.on( 'menu:click', ( e ) => {
      if ( e.action === this.ADD_NOTE ) {

        this.html = '<h1>Hello World</h1>';
        this.mount();
      }
    });
  }

  render = () => {
    super.render();
  };
}

export default Notes;
