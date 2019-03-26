'use-strict';

/*
  1. не меняется курсок на границе лишки, только внутри неё
  2. переделать функцию deletePoint: делать проверку на класс, а не тег, удалять элемент через поиск по классу, а не через навигацию
*/

let fieldCreateNewPoint = document.body.querySelector('.field-create-new-point'),
listOfpoints = document.body.querySelector('.list-points-routes'),
point,
underPoint,
previousPoint,
ghostPoint,
coordsOfPoint,
coordsOfList,
shiftY;

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
  ghostPoint = document.createElement('li'),
  coordsOfPoint = getCoords(point),
  coordsOfList = getCoords(listOfpoints),
  shiftY = e.pageY - coordsOfPoint.top;
  
  point.style.position = 'absolute';
  point.style.borderColor = 'rgb(0, 0, 0)';
  point.style.pointerEvents = 'none';
  point.style.cursor = 'grabbing';
  
  ghostPoint.classList.add('ghostPoint');
  ghostPoint.style.height = point.offsetHeight;
  listOfpoints.insertBefore(ghostPoint, point.nextElementSibling);
  moveAt(e);
  
  document.onmousemove = function(e) {
    moveAt(e);
    backlightInsertions(e);
  };
  
  document.onmouseup = function(e) {
    document.onmousemove = null;
    
    point.style.cssText = '';
    changePosition(e);
    listOfpoints.removeChild(ghostPoint);
    removeBacklightInsertions();
    previousPoint = '';
    
    document.onmouseup = null;
  };
}

function moveAt(e) {
  const top = e.pageY - shiftY;
  
  if (top > coordsOfList.top - 10 && top < coordsOfList.bottom - 5) {
    point.style.top = top + 'px';
  };
}

function changePosition(e) {
  if (!previousPoint) return;

  if (previousPoint.classList.contains('pointBefore')) {
    listOfpoints.insertBefore(point, previousPoint);
  } else {
    listOfpoints.insertBefore(point, previousPoint.nextElementSibling);
  }
}

function backlightInsertions(e) {

  underPoint = document.elementFromPoint(e.pageX, e.pageY).closest('.point');
  
  if (!underPoint) {
    underPoint = document.elementFromPoint(e.pageX, e.pageY).closest('.currentUnderPoint');
  }
  
  if (!underPoint) return;
  
  if (previousPoint) {
    if (previousPoint !== underPoint) {
      removeBacklightInsertions();
      previousPoint = underPoint;
      underPointRemoveClass('point');
      underPointAddClass('currentUnderPoint');
    };
  } else {
    previousPoint = underPoint;
    underPointRemoveClass('point');
    underPointAddClass('currentUnderPoint');
  };
  
  let coordsUnderPoint = underPoint.getBoundingClientRect();
  let coordMiddleUnderPoint = (coordsUnderPoint.top + coordsUnderPoint.bottom) / 2;
  
  if (e.pageY > coordMiddleUnderPoint) {
    if (underPointContainsClass('pointBefore')) {
      underPointRemoveClass('pointBefore');
    };
    if (underPointContainsClass('pointAfter')) return;
    else underPointAddClass('pointAfter');
  } else {
    if (underPointContainsClass('pointAfter')) {
      underPointRemoveClass('pointAfter');
    };
    if (underPointContainsClass('pointBefore')) return;
    else underPointAddClass('pointBefore');
  }
  
  function underPointAddClass(nameClass) {
    underPoint.classList.add(nameClass);
  }
  
  function underPointRemoveClass(nameClass) {
    underPoint.classList.remove(nameClass);
  }
  
  function underPointContainsClass(nameClass) {
    return underPoint.classList.contains(nameClass);
  }
}

function removeBacklightInsertions() {
  if (!previousPoint) return;

  previousPoint.classList.remove('currentUnderPoint', 'pointBefore', 'pointAfter');
  previousPoint.classList.add('point');
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