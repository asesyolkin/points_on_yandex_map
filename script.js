'use-strict';
  
// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
/*
ymaps.ready(init);
function init(){ 
    // Создание карты.    
    let myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчнию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.74, 37.63],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 10
    });
}
*/

let fieldCreateNewPoint = document.body.querySelector('.field-create-new-point');
let listPointsRoutes = document.body.querySelector('.list-points-routes');

fieldCreateNewPoint.addEventListener('keydown', addNewPoint);
listPointsRoutes.addEventListener('click', deletePoint);
listPointsRoutes.addEventListener('mousedown', movePoint);

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
  
  listPointsRoutes.appendChild(newPoint);
  this.value = '';
}

function deletePoint(e) {
  if (e.target.tagName === 'B') {
    e.target.parentElement.parentElement.remove();
  }
}

function movePoint(e) {
  if (e.target.closest('.delete-point') || !e.target.closest('.point')) return;

  let point = e.target.closest('.point');
  let listOfpoints = e.target.closest('.list-points-routes');
  let coordsOfPoint = getCoords(point);
  let coordsOfList = getCoords(listOfpoints);
  let shiftY = e.pageY - coordsOfPoint.top;

  point.style.position = 'absolute';
  point.style.borderColor = 'rgb(0, 0, 0)';
  
  let ghostPoint = document.createElement('li');
  ghostPoint.classList.add('ghostPoint');
  listOfpoints.insertBefore(ghostPoint, point.nextElementSibling);
  moveAt(e);
  
  document.onmousemove = function(e) {
    moveAt(e);
  };
  
  document.onmouseup = function(e) {
    document.onmousemove = null;
    
    point.style.cssText = '';
    listOfpoints.removeChild(ghostPoint);
    
    changePosition(e);
    
    document.onmouseup = null;
  };
  
  function moveAt(e) {
    const top = e.pageY - shiftY;

    if (top > coordsOfList.top - 10 && top < coordsOfList.bottom - 5) {
      point.style.top = top + 'px';
    };
  }
  
  function changePosition(e) {
    let elem = document.elementFromPoint(e.pageX, e.pageY);
    elem = elem.closest('.point');
    console.log(elem);
    listOfpoints.insertBefore(point, elem);
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

// console.log(getCoords(document.querySelector('.point')));
// console.log(getCoords(document.querySelector('.list-points-routes')));