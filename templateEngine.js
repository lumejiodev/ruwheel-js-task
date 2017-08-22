function render( template, data = {} ) {
	let output = template;

	// подстановки
	const subRegexp = /{{\s*([A-z_][A-z0-9_]+)\s*}}/g;
	output = output.replace( subRegexp, (match, name) => data[ name ] || '' );

	// комментарии
	const comRegexp = /{#(.*)#}/g;
	output = output.replace( comRegexp, (match, comment) => '' );

	// блоки
	const blockRegexp = /({%\s*[A-z_][A-z0-9_]+\s*%}|{%\s*\/\s*%}|{{\s*\.\s*}})/g;
	output.split( blockRegexp ).forEach( part => {
		var match;
		if (part.match(/{{\s*\.\s*}}/)) {
			console.log( 'element' );
		} else if (part.match(/{%\s*\/\s*%}/)) {
			console.log( 'closing' );
		} else if (match = part.match(/{%\s*([A-z_][A-z0-9_]+)\s*%}/)) {
			console.log( 'open ' + match[1] );
		} else {
			console.log( part );
		}
	});

	return output;
}
