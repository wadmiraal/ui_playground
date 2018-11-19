import Search from './components/Search';
import Menu from './components/Menu';
import Notes from './components/Notes';
import DOM from './utils/DOM';

const appContent = DOM.find( '#content' );

const search = new Search( DOM.find( '#search' ) );
const menu = new Menu( DOM.find( '#menu' ) );
const notes = new Notes( appContent );
