"use strict";

// вызывает соот. ф-цию
function nextStep(chessMan = '', row = -1, col = -1) {
	if (row == -1 || col == -1) {
		return alert("ОШИБКА (nextStep): row = ", row, " | col = ", col)
	}
	
	switch (chessMan) {
		case 'P': Pawn(row, col); break;	// пешка
		case 'R': Rook(row, col); break;	// ладья
		case 'N': Knight(row, col); break;	// конь
		case 'B': Bishop(row, col); break;	// слон
		case 'Q': Queen(row, col); break;	// ферзь
		case 'K': King(row, col); break;	// король
	
		default:break;
	}
}

// [row, col, /*цвет ячейки 1-след.ход, 2-взятие, 0-бесцвет.*/]

// ПЕШКА
function Pawn(row, col) {
	let nextStep = [];
	// заполняем стандарт
	nextStep = [
		[row-1, col, 1],
		[row-1, col-1, 2],
		[row-1, col+1, 2]
	];
	// если мы стоим вначале
	if (row == 6) {
		nextStep.push([row-2, col, 1]);
	}
	// проверяем границы доски и наличие "сруба"
	for (let i = 0; i < nextStep.length; i++) {
		// если границы
		if (nextStep[i][0] < 0 ||
				nextStep[i][1] < 0 ||
				nextStep[i][1] > 7) {
			nextStep.splice(i, 1);
		}
		// если есть кого "срубить"
		if (nextStep[i][2] == 2) {
			let row_d = nextStep[i][0];
			let col_d = nextStep[i][1];
			let symbol = game.board[row_d][col_d];
			let arrChessmanBlack = ['p','r','n','b','q','k'];
			// если нет врага, удаляем
			if (arrChessmanBlack.indexOf(symbol) === -1)
			{
				nextStep.splice(i, 1);
				i--;
			}
		}
	}

	game.nextStep = nextStep;
}

// ЛАДЬЯ
function Rook(row, col) {
	
}

// КОНЬ
function Knight(row, col) {
	
}

// СЛОН
function Bishop(row, col) {
	
}

// ФЕРЗЬ
function Queen(row, col) {
	
}

// КОРОЛЬ
function King(row, col) {
	
}