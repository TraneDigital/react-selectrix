import { connect } from 'react-redux';
import {
	toggleSelect,
	selectItem,
	focusItem,
	clearSelect,
	openSelect,
	closeSelect,
	focusSelect,
	blurSelect,
	handleKeyDown,
	maybeScroll,
	unlockMouseFocus,
	selectAll,
	searchOptions,
	focusTag
} from 'actions';
import App from './App';

const mapStateToProps = state => {

	const queryString = state.search.queryString.toLowerCase();

	let options = ! state.search.active || queryString === '' ? [ ... state.options ] : [ ... state.search.resultSet ];
	const selected = state.ajax.fetchOnSearch ? state.selected.map( s => s.key ) : state.selected;
	const originalCount = state.options.length;

	if( state.settings.multiple && ! state.settings.commaSeperated && ! state.settings.checkBoxes ) {
		options = options.filter( o => ! selected.includes( o.key ) );
	}

	return {
		settings: state.settings,
		selected,
		selectedIndex: state.selectedIndex,
		isOpen: state.isOpen,
		options,
		focused: state.focused,
		focusedItem: state.focusedItem,
		focusedItemIndex: state.focusedItemIndex,
		checkForScroll: state.checkForScroll,
		mouseEventLocked: state.mouseEventLocked,
		checkForHover: state.checkForHover,
		originalCount,
		height: state.height,
		ajax: state.ajax,
		onRenderOption: state.onRenderOption,
		tags: state.tags,
		queryString,
		id: state.id,
	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		toggleSelect: () => {
			dispatch( toggleSelect() );
		},

		selectItem: ( index ) => {
			dispatch( selectItem( index ) );
		},

		focusItem: ( index, mouseEvent = false ) => {
			dispatch( focusItem( index, mouseEvent ) );
		},
		focusKey: ( key, mouseEvent = false ) => {
			dispatch( focusItem( key, mouseEvent ) );
		},
		focusTag: () => {
			dispatch( focusTag() );
		},
		openSelect: () => {
			dispatch( openSelect() );
		},

		clearSelect: ( event = false, stayOpen = false ) => {
			if( event ) {
				event.stopPropagation();
				event.nativeEvent.stopImmediatePropagation();
			}
			dispatch( clearSelect( stayOpen ) );
		},

		closeSelect: ( blur = false ) => {
			dispatch( closeSelect( blur ) );
		},

		focusSelect: () => {
			dispatch( focusSelect() );
		},

		blurSelect: () => {
			dispatch( blurSelect() );
		},

		handleKeyDown: ( e ) => {
			dispatch( handleKeyDown( e ) );
		},

		maybeScroll: ( selectEl, itemEl ) => {
			dispatch( maybeScroll( selectEl, itemEl ) );
		},

		unlockMouseFocus: () => {
			dispatch( unlockMouseFocus() );
		},

		selectAll: () => {
			dispatch( selectAll() );
		},

		clearSearchInput: () => {
			dispatch( searchOptions( '' ) );
		}

	}
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
