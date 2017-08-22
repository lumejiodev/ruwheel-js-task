function render( template, data = {} ) {
	let output = template;

	// подстановки
	const subRegexp = /\{\{\s*([A-z_][A-z0-9_]+)\s*\}\}/g;
	output = output.replace( subRegexp, (match, name) => data[ name ] || '' );

	// комментарии
	const comRegexp = /\{#(.*)#\}/g;
	output = output.replace( comRegexp, (match, comment) => '' );

	return output;
}
