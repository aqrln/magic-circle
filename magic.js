window.onload = function () {
	var getRandomCharacter = (function () {
		var allowedSymbols = [];
		function populateList(min, max) {
			for (var i = min.charCodeAt(0); i <= max.charCodeAt(0); i++) {
				allowedSymbols.push(String.fromCharCode(i));
			}
		}
		populateList('a', 'z');
		populateList('A', 'Z');

		function getRandomFromList(list) {
			var index = Math.floor(Math.random() * list.length);
			return list[index];
		}

		var symbols = [];
		while (symbols.length < 10) {
			var char = getRandomFromList(allowedSymbols);
			if (symbols.indexOf(char) == -1) {
				symbols.push(char);
			}
		}

		return function () {
			return getRandomFromList(symbols);
		};
	})();

	var chosenSymbol = getRandomCharacter();

	// Form the number table
	(function () {
		var div = document.getElementById('number-table');
		var table = document.createElement('table');
		for (var i = 0; i < 10; i++) {
			var tr = document.createElement('tr');
			for (var j = 1; j <= 10; j++) {
				var td = document.createElement('td');

				var numberSpan = document.createElement('span');
				numberSpan.className = 'table-entry-left';
				var number = i * 10 + j;
				numberSpan.appendChild(document.createTextNode(number));
				td.appendChild(numberSpan);

				var symbolSpan = document.createElement('span');
				symbolSpan.className = 'table-entry-right';
				var symbol = number % 9 == 0 ? chosenSymbol : getRandomCharacter();
				symbolSpan.appendChild(document.createTextNode(symbol));
				td.appendChild(symbolSpan);

				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		div.appendChild(table);
	})();

	// Set up the onClick callback for the circle
	var circle = document.getElementById('circle');
	circle.onclick = function () {
		circle.innerText = chosenSymbol;
	}

	// Set up the do-it-again button
	document.getElementById('again').onclick = function () {
		var div = document.getElementById('number-table');
		div.removeChild(div.firstChild);
		circle.innerText = '';
		window.onload();
	}
}