export const isArray = variable => variable instanceof Array;

export const isString = v => typeof v === 'string';

export const isObject = variable => variable !== null && typeof variable === 'object' && ! Array.isArray( variable )

export const isNumeric = n => ! isNaN( parseFloat( n ) ) && isFinite( n );

export const isEmpty = variable => {

	if( variable.constructor === String ) {
		return variable === '' ? true : false;
	}
	else if( variable.constructor === Object && ! Array.isArray( variable ) ) {
		return Object.keys( variable ).length === 0 ? true : false;
	}
	else if( variable.constructor === Array ) {
		return variable.length === 0 ? true : false;
	}

	return false;

}

export const buildClassName = ( props, isOpen, selected, tags ) => {

	const targetProps = [
		'disabled',
		'multiple',
		'placeHolderInside',
		'arrow',
		'customScrollbar',
		'searchable',
		'commaSeperated',
		'singleLine',
		'checkBoxes',
		'materialize',
		'tags'
	];

	let className = '';

	for( let [ key, value ] of Object.entries( props ) ) {
		if( value === true && targetProps.includes( key ) ) {
			className += `rs-base-${ key.toLowerCase() } `;
		}
	}

	if( isOpen ) {
		className += 'rs-base-open ';
	}

	if( selected.length === 0 ) {
		className += 'rs-base-empty ';
	}

	if( tags.enabled ) {
		className += 'rs-base-tags ';
	}

	if( props.className !== '' ) {
		className += props.className;
	}

	className = className.trim();

	return className !== '' ? ` ${ className }` : '';

}

export const getFocusedItemByKey = ( key, options ) => {
	return options.filter( o => o.key === key )[ 0 ];
}

export const getSelectValue = ( selected, isMultiple = false ) => {
	if( selected.length === 0 ) {
		return '';
	}
	if( isMultiple === false ) {
		return selected[ 0 ];
	}
	return '';
}

export const getSelectedIndex = ( selected, options ) => {
	for( let [ index, option ] of options.entries() ) {
		if( selected === option.key ) {
			return index;
		}
	}
	return false;
}

export const normalizeSelected = ( selected, options ) => {

	const results = {
		selected: [],
		selectedIndex: []
	};

	for( let [ index, o ] of options.entries() ) {

		if( isArray( selected ) ) {

			if( selected.includes( o.key ) ) {
				results.selected.push( o.key );
				results.selectedIndex.push( index );
			}

		}
		else {
			if( selected === o.key ) {
				results.selected.push( o.key );
				results.selectedIndex.push( index );
			}
		}
	}

	return results;

}

export const isInViewport = ( selectEl, itemEl ) => {

	if ( ! itemEl ) return false;
	const top = itemEl.offsetTop;
	const offset = selectEl.scrollTop;
	const height = selectEl.clientHeight;
	const elHeight = itemEl.clientHeight;

	if( top - offset <= 0 || top - offset >= height ) {
		return ( top - height ) + elHeight;
	}

	return false;

}

export const itemInOptions = ( itemKey, options ) => (
	options.findIndex( o => o.key === itemKey ) !== -1
)

export const debounce = ( func, wait, immediate ) => {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if ( !immediate ) func.apply( context, args );
		};
		let callNow = immediate && !timeout;
		clearTimeout( timeout );
		timeout = setTimeout( later, wait );
		if ( callNow ) func.apply( context, args );
	};
};
