function render( template, data = {} ) {
	let output = template;

	// подстановки
	const subRegexp = /\{\{\s*([A-z_][A-z0-9_]+)\s*\}\}/g;
	output = output.replace( subRegexp, function( match, name ){
		return data[ name ] || '';
	});

	return output;
}
