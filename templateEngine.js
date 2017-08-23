function render( template, data = {} ) {
	let output = template;

	// подстановки
	const subRegexp = /{{\s*([A-z_][A-z0-9_]+)\s*}}/g;
	output = output.replace( subRegexp, (match, name) => data[ name ] || '' );

	// комментарии
	const comRegexp = /{#(.*)#}/g;
	output = output.replace( comRegexp, (match, comment) => '' );

	// сбор данных о блоках и элементах
	const blockRegexp = /({%\s*[A-z_][A-z0-9_]+\s*%}|{%\s*[\/.]\s*%}|{{\s*\.\s*}})/g;
	const blockParts = {
		type: 'root',
		elements: []
	};
	let currentBlock = blockParts;
	output.split( blockRegexp ).forEach( part => {
		var match;
		if (part.match(/{{\s*\.\s*}}/)) { // элемент блока/вложенного блока

			currentBlock.elements.push({
				type: 'element'
			});

		} else if (part.match(/{%\s*\.\s*%}/)) { // открытие вложенного блока
			
			currentBlock = {
				type: 'subblock',
				elements: [],
				parent: currentBlock,
			};
			currentBlock.parent.elements.push( currentBlock );

		} else if (part.match(/{%\s*\/\s*%}/)) { // закрытие блока

			currentBlock = currentBlock.parent;

		} else if (match = part.match(/{%\s*([A-z_][A-z0-9_]+)\s*%}/)) { // открытие блока
			
			currentBlock = {
				type: 'block',
				name: match[1],
				elements: [],
				parent: currentBlock,
			};
			currentBlock.parent.elements.push( currentBlock );

		} else { // общий случай (строки)
			
			currentBlock.elements.push({
				type: 'string',
				content: part
			});

		}
	});
	
	// рендер блоков и элементов
	output = '';
	(function renderBlock( block ) {
		switch (block.type) {
			case 'root':
				block.elements.forEach( renderBlock );
				break;

			case 'block':
				if (block.name in data == false || block.name === '') break;
				
				let dataSlice = data[ block.name ];

				if (typeof dataSlice == 'string') {
					output += dataSlice;
				} else if (typeof dataSlice == 'object' && Object.prototype.toString.call( dataSlice ) == '[object Array]') {
					//
				}
				break;

			case 'subblock':
				// @todo
				break;

			case 'element':
				// @todo
				break;

			case 'string':
				// @todo
				// output += block.content;
				break;
		}
	})( blockParts );

	return output;
}
