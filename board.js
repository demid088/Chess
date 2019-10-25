"use strict";

const settings = {
  rowsCount: 10, // 10
  colsCount: 10, // 10
  fontWeight: 100,
  fontSize: '25px',
};

function GenChessBoard() {
  let cellElements = [];  // Массив ячеек
  let containerElement = document.getElementById('board');  // добавляем таблицу в контейнер

  // Пробегаемся в цикле столько раз, какое количество строк в игре.
  for (let row = 0; row < settings.rowsCount; row++) {
    const trElem = document.createElement('tr');  // Создаем новую строку.
    containerElement.appendChild(trElem); // Добавляем строку в контейнер с игрой.

    // В каждой строке пробегаемся по циклу столько раз, сколько у нас колонок.
    for (let col = 0; col < settings.colsCount; col++) {
      // Создаем ячейку.
      const cell = document.createElement('td');
      // добавляем ID в ячейку
      cell.setAttribute('id', `${Digit(row)}${Letter(col)}`);
      // добавляем data-отрибуты
      cell.setAttribute('data-row', `${Digit(row)}`);
      cell.setAttribute('data-col', `${Letter(col)}`);
      // Записываем ячейку в массив ячеек.
      cellElements.push(cell);
      // Добавляем ячейку в текущую строку.
      trElem.appendChild(cell);
    }

    //--- раскрашиваем строку
    // если это не верхняя или нижняя строка
    if (row !== 0 && row !== settings.colsCount - 1) {
      // добавляем цифры в строку
      trElem.firstChild.textContent = trElem.lastChild.textContent = Digit(row);
      trElem.firstChild.style.fontWeight = trElem.lastChild.style.fontWeight = settings.fontWeight;
      trElem.firstChild.style.fontSize = trElem.lastChild.style.fontSize = settings.fontSize;
    } else {  // если это верхняя или нижняя строка
      for (let c = 1; c < settings.colsCount - 1; c++) {
        trElem.childNodes[c].textContent = Letter(c);  // добавляем буквы
        trElem.childNodes[c].style.fontWeight = settings.fontWeight;
        trElem.childNodes[c].style.fontSize = settings.fontSize;
      }
    }
  }

  // Всем ячейкам ставим выравнивание по центру
  cellElements.forEach(cell => cell.style.textAlign = 'center'); 
}

function Letter(col) {
  switch (col) {
    case 0: return '0';
    case 1: return 'A';
    case 2: return 'B';
    case 3: return 'C';
    case 4: return 'D';
    case 5: return 'E';
    case 6: return 'F';
    case 7: return 'G';
    case 8: return 'H';
    case 9: return '9';
    default: return col;
  }
}

function Digit(row) {
  switch (row) {
    case 0: return '9';
    case 1: return '8';
    case 2: return '7';
    case 3: return '6';
    case 4: return '5';
    case 5: return '4';
    case 6: return '3';
    case 7: return '2';
    case 8: return '1';
    case 9: return '0';
    default: return row;
  }
}

GenChessBoard();
