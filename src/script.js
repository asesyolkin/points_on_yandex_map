'use-strict';

class Route extends React.Component {
  render() {
    return (
      <div id="route">
        <PointsRoute />
        <YanMap />
      </div>
    );
  }
}

class PointsRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: []
    };

    const numberOfPoints = 5;
    
    for (let i = 0; i < numberOfPoints; ++i) {
      let point = <Point key={Math.random()} pointNumber={i}/>
      this.state.points.push(point);
    };
  }

  addNewPoint = (namePoint) => {
    const newPoint = <Point key={Math.random()} pointName={namePoint}/>;
    const newArrOfPoints = this.state.points.slice();
    newArrOfPoints.push(newPoint);
    this.setState({
      points: newArrOfPoints
    });
  }

  render() {
    return (
      <div className="points-route">
        <CreateNewPoint addNewPoint={this.addNewPoint} />
        <ListPointsRoute points={this.state.points} />
      </div>
    );
  }
}

class CreateNewPoint extends React.Component {
  onKeyDownHandler = (e) => {
    if (e.keyCode !== 13 || e.target.value === '') return;

    this.props.addNewPoint(e.target.value);
    e.target.value = '';
  }

  render() {
    return (
      <input className="field-create-new-point" placeholder="Новая точка маршрута" onKeyDown={this.onKeyDownHandler} />
      )
    };
  }
  
class ListPointsRoute extends React.Component {
  render() {
    return (
      <ul className="list-points-route" onMouseDown={(e) => e.preventDefault()}>
        {this.props.points}
      </ul>
    );
  }
}

class Point extends React.Component {
  render() {
    return (
      <li className="point">
        <span className="name-point">
          {this.props.pointName ? this.props.pointName : `точка ${this.props.pointNumber + 1}`}
        </span>
        <DeletePoint />
      </li>
    )
  }
}

class DeletePoint extends React.Component {
  deletePoint = (e) => {
    if (e.target.classList.contains('delete-point-button')) {
      e.target.closest('.point').remove();
    }
  }
 
  render() {
    return (
      <span className="delete-point">
        <b className="delete-point-button" onClick={this.deletePoint}>x</b>
      </span>
    );
  }
}

class YanMap extends React.Component {
  render() {
    return (
      <div id="map"></div>
    );
  }
}
  
ReactDOM.render(
  <Route />,
  document.getElementById('container')
);

const fieldCreateNewPoint = document.body.querySelector('.field-create-new-point'),
listOfpoints = document.body.querySelector('.list-points-route');

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

listOfpoints.addEventListener('mousedown', movePoint);

function movePoint(e) {
  if (e.target.closest('.delete-point-button') || !e.target.closest('.point')) return;
  
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