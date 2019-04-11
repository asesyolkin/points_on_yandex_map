'use-strict';

/*
  1. переделать функцию deletePoint: делать проверку на класс, а не тег, удалять элемент через поиск по классу, а не через навигацию
*/

const fieldCreateNewPoint = document.body.querySelector('.field-create-new-point'),
listOfpoints = document.body.querySelector('.list-points-routes');

let point,
underPoint,
previousPoint,
ghostPoint,
dividingLine,
coordsOfList,
coordsOfPoint,
coordsOfUnderPoint,
coordMiddleUnderPoint,
halfDistanceBetweenPoints,
shiftY,
firstPointListOfpoints,
lastPointListOfpoints;

fieldCreateNewPoint.addEventListener('keydown', addNewPoint);
listOfpoints.addEventListener('click', deletePoint);
listOfpoints.addEventListener('mousedown', movePoint);

function addNewPoint(e) {
  if (e.keyCode !== 13 || this.value === '') return;
  
  let newPoint = document.createElement('li');
  newPoint.classList.add('point');
  
  newPoint.innerHTML = `
  <span class="name-point">
  ${fieldCreateNewPoint.value}
  </span>
  <span class="delete-point">
  <b>x</b>
  </span>  
  `;
  
  listOfpoints.appendChild(newPoint);
  this.value = '';
}

function deletePoint(e) {
  if (e.target.tagName === 'B') {
    e.target.parentElement.parentElement.remove();
  }
}

function movePoint(e) {
  if (e.target.closest('.delete-point') || !e.target.closest('.point')) return;
  
  point = e.target.closest('.point');
  ghostPoint = document.createElement('li');
  coordsOfPoint = getCoords(point);
  coordsOfList = getCoords(listOfpoints);
  shiftY = e.pageY - coordsOfPoint.top;
  firstPointListOfpoints = listOfpoints.children[0],
  lastPointListOfpoints = listOfpoints.children[listOfpoints.children.length - 1];

  if (listOfpoints.children.length > 1) {
    halfDistanceBetweenPoints = (listOfpoints.children[1].offsetTop - listOfpoints.children[0].offsetTop - listOfpoints.children[0].offsetHeight) / 2;
  }
  
  point.style.position = 'absolute';
  point.style.borderColor = 'rgb(0, 0, 0)';
  point.style.pointerEvents = 'none';
  point.style.cursor = 'grabbing';
  
  ghostPoint.classList.add('ghostPoint');
  ghostPoint.style.height = point.offsetHeight + 'px';
  listOfpoints.insertBefore(ghostPoint, point.nextElementSibling);
  moveAt(e);
  
  document.onmousemove = function(e) {
    moveAt(e);
    
    if ( !document.elementFromPoint(e.clientX, e.clientY) ) return;

    underPoint = document.elementFromPoint(e.clientX, e.clientY).closest('.point');
    
    if (!underPoint) {
      underPoint = document.elementFromPoint(e.clientX, e.clientY).closest('.currentUnderPoint');
    }
    
    if (!underPoint) return;
    
    changeUnderPointClass();
    insertDividingLine(e);
  };
  
  document.onmouseup = function(e) {
    document.onmousemove = null;
    
    point.style.cssText = '';
    listOfpoints.removeChild(ghostPoint);
    
    if (previousPoint) {
      changePosition(e);
      removeDividingLine();
      previousPoint.classList.remove('currentUnderPoint', 'pointBefore', 'pointAfter');
      previousPoint.classList.add('point');
      previousPoint = '';
    };
    
    document.onmouseup = null;
  };
}

function moveAt(e) {
  let currentTop = e.pageY - shiftY,
  currentBottom = e.pageY - shiftY + point.offsetHeight,
  maxTop = coordsOfList.top - 10,
  maxBottom = coordsOfList.bottom + 14;

  if (point === firstPointListOfpoints) {
    maxTop = coordsOfList.top - 10 + point.offsetHeight;
  } else if (point === lastPointListOfpoints) {
    maxBottom = coordsOfList.bottom + 10 - point.offsetHeight;
  }

  if (currentBottom > maxTop && currentTop < maxBottom) {
    point.style.top = e.pageY - shiftY + 'px';
  };
}

function insertDividingLine(e) {
  coordsOfUnderPoint = getCoords(underPoint);
  coordMiddleUnderPoint = (coordsOfUnderPoint.top + coordsOfUnderPoint.bottom) / 2;

  if (!dividingLine) {
    dividingLine = document.createElement('div');
    dividingLine.classList.add('dividingLine');
    document.body.appendChild(dividingLine);
    dividingLine.style.width = listOfpoints.clientWidth * 95 / 100 + 'px';
    dividingLine.style.left = coordsOfList.left + ((listOfpoints.clientWidth - parseInt(dividingLine.style.width)) / 2) + 'px';
  }
  
  if (e.pageY < coordMiddleUnderPoint) {
    dividingLine.style.top = coordsOfUnderPoint.top - halfDistanceBetweenPoints + 'px';
  } else {
    dividingLine.style.top = coordsOfUnderPoint.bottom + halfDistanceBetweenPoints + 'px';
  }
}

function removeDividingLine() {
  dividingLine.remove();
  dividingLine = null;
}

function changeUnderPointClass() {
  if (previousPoint) {
    if (previousPoint !== underPoint) {
      previousPoint.classList.remove('currentUnderPoint');
      previousPoint.classList.add('point');
      previousPoint = underPoint;
      underPoint.classList.remove('point');
      underPoint.classList.add('currentUnderPoint');
    };
  } else {
    previousPoint = underPoint;
    underPoint.classList.remove('point');
    underPoint.classList.add('currentUnderPoint');
  };
}

function changePosition(e) {
  if (e.pageY < coordMiddleUnderPoint) {
    listOfpoints.insertBefore(point, previousPoint);
  } else {
    listOfpoints.insertBefore(point, previousPoint.nextElementSibling);
  }
}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    bottom: box.bottom + pageYOffset,
    right: box.right + pageXOffset
  };
}

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.

// ymaps.ready(init);
// function init(){ 
//   // Создание карты.    
//   let myMap = new ymaps.Map("map", {
//       // Координаты центра карты.
//       // Порядок по умолчнию: «широта, долгота».
//       // Чтобы не определять координаты центра карты вручную,
//       // воспользуйтесь инструментом Определение координат.
//       center: [55.74, 37.63],
//       // Уровень масштабирования. Допустимые значения:
//       // от 0 (весь мир) до 19.
//       zoom: 10
//   });
// }