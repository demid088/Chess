"use strict";

const game = {
	settings: {
		cellWhite: '#fff',
		cellBlack: '#525252',
		cellSelect: 'green',
		cellNextStep: 'lightgreen',
		cellCapture: 'lightcoral',
	},
  // массив фигур
  board: [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']
  ],
	// цвет фона
	colorTD: [
    ['w','b','w','b','w','b','w','b'],
    ['b','w','b','w','b','w','b','w'],
		['w','b','w','b','w','b','w','b'],
    ['b','w','b','w','b','w','b','w'],
		['w','b','w','b','w','b','w','b'],
    ['b','w','b','w','b','w','b','w'],
		['w','b','w','b','w','b','w','b'],
    ['b','w','b','w','b','w','b','w']
  ],
	// выбранная ячейка
	selectTD: [-1, -1], // row, col
	// следущий возможный шаг
	nextStep: [],
  //---
  // отрисовка фигур на доске 
  _render() {
    // получаем все ячейки в виде массива
    let arrTD = document.querySelectorAll('td');

    // проходим по каждой ячейке и расставляем фигуры
    for (let i = 0; i < arrTD.length; i++) {
      // получаем ячейку
      let td = arrTD[i];
      // получаем data-аттрибуты
      let d_row = td.dataset.row;
      let d_col = td.dataset.col;
      // если это первые и последние строки/колонки, пропускаем их
      if (d_col === '0' || d_col === '9' ||
          d_row === '0' || d_row === '9') {
        continue;
      }
      // получаем нужную строку/колонку из массива
      let row = +this._getRowArr(d_row);
      let col = +this._getColArr(d_col);
      // добавляем нужную фигуру в ячейку
      td.innerHTML = this._getSymbol(row, col);
			// раскрашиваем выбранную ячейку
			if (this.selectTD[0] === row && this.selectTD[1] === col) {
				td.style.backgroundColor = this.settings.cellSelect;
			} else {
				td.style.backgroundColor = (this.colorTD[row][col] == 'w') ? this.settings.cellWhite : this.settings.cellBlack;
			}
			// добавляем возможные ходы
			if (this.nextStep.length != 0) {
				for (let u = 0; u < this.nextStep.length; u++){
					if (this.nextStep[u][0] === row &&
							this.nextStep[u][1] === col) {
						if (this.nextStep[u][2] == 1)
							td.style.backgroundColor = this.settings.cellNextStep;
						if (this.nextStep[u][2] == 2)
							td.style.backgroundColor = this.settings.cellCapture;
					}
				}
			}
      // помечаем клетку "игровой"
      td.classList.add("game");
    }
  },
  // получаем строку из массива
  _getRowArr(d_row) {
    switch (d_row) {
      case '8': return '0';
      case '7': return '1';
      case '6': return '2';
      case '5': return '3';
      case '4': return '4';
      case '3': return '5';
      case '2': return '6';
      case '1': return '7';
      default: alert(`ОШИБКА: d_row = `, d_row); break;
    }
  },
  // получаем колонку из массива
  _getColArr(d_col) {
    switch (d_col) {
      case 'A': return '0';
      case 'B': return '1';
      case 'C': return '2';
      case 'D': return '3';
      case 'E': return '4';
      case 'F': return '5';
      case 'G': return '6';
      case 'H': return '7';
      default: alert(`ОШИБКА: d_col = `, d_col); break;
    }
  },
  // получаем символ в соответствии символом массива
  _getSymbol(row, col) {
    let symbol = this.board[row][col];

    switch (symbol) {
      case 'P': return '&#9817;';
      case 'R': return '&#9814;';
      case 'N': return '&#9816;';
      case 'B': return '&#9815;';
      case 'Q': return '&#9813;';
      case 'K': return '&#9812;';
      // 
      case 'p': return '&#9823;';
      case 'r': return '&#9820;';
      case 'n': return '&#9822;';
      case 'b': return '&#9821;';
      case 'q': return '&#9819;';
      case 'k': return '&#9818;';
      // 
      case ' ': return ' ';
      default: alert(`ОШИБКА: "game.js > _getSymbol"`); break;
    }
  },
	_chessmanWhite(row, col) {
		let symbol = this.board[row][col];
		let arrChessmanWhite = ['P','R','N','B','Q','K'];
		return arrChessmanWhite.indexOf(symbol) != -1 ? true : false;
	},
	_reset(){
		game.selectTD[0] = -1;
		game.selectTD[1] = -1;
		game.nextStep = [];
	}
}

window.onload = () => game._render();

document.addEventListener("click", function (e) {
	// сбрасываем цвета
	game._reset();
	// получаем ячейку
  let td = e.target;
	// проверяем класс
	if (!td.classList.contains("game")){
		game._render();
		return;
	}
	// получаем data-аттрибуты
	let d_row = td.dataset.row;
	let d_col = td.dataset.col;
	// получаем нужную строку/колонку из массива
	let row = +game._getRowArr(d_row);
	let col = +game._getColArr(d_col);
	// проверяем цвет фигуры
	if (!game._chessmanWhite(row, col)){
		game._render();
		return;
	}
	// перекрашиваем выббранную ячейку
	game.selectTD[0] = row;
	game.selectTD[1] = col;
	// рисуем след. ходы
	let symbol = game.board[row][col];
	nextStep(symbol, row, col);
	// отображаем доску
	game._render();
});