'use-strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Route = function (_React$Component) {
  _inherits(Route, _React$Component);

  function Route() {
    _classCallCheck(this, Route);

    return _possibleConstructorReturn(this, (Route.__proto__ || Object.getPrototypeOf(Route)).apply(this, arguments));
  }

  _createClass(Route, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "route" },
        React.createElement(PointsRoutes, null),
        React.createElement(YanMap, null)
      );
    }
  }]);

  return Route;
}(React.Component);

var PointsRoutes = function (_React$Component2) {
  _inherits(PointsRoutes, _React$Component2);

  function PointsRoutes() {
    _classCallCheck(this, PointsRoutes);

    return _possibleConstructorReturn(this, (PointsRoutes.__proto__ || Object.getPrototypeOf(PointsRoutes)).apply(this, arguments));
  }

  _createClass(PointsRoutes, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "points-routes" },
        React.createElement(CreateNewPoint, null),
        React.createElement(ListPointsRoutes, null)
      );
    }
  }]);

  return PointsRoutes;
}(React.Component);

var CreateNewPoint = function (_React$Component3) {
  _inherits(CreateNewPoint, _React$Component3);

  function CreateNewPoint() {
    _classCallCheck(this, CreateNewPoint);

    return _possibleConstructorReturn(this, (CreateNewPoint.__proto__ || Object.getPrototypeOf(CreateNewPoint)).apply(this, arguments));
  }

  _createClass(CreateNewPoint, [{
    key: "render",
    value: function render() {
      return React.createElement("input", { className: "field-create-new-point", placeholder: "\u041D\u043E\u0432\u0430\u044F \u0442\u043E\u0447\u043A\u0430 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430" });
    }
  }]);

  return CreateNewPoint;
}(React.Component);

var ListPointsRoutes = function (_React$Component4) {
  _inherits(ListPointsRoutes, _React$Component4);

  function ListPointsRoutes() {
    _classCallCheck(this, ListPointsRoutes);

    return _possibleConstructorReturn(this, (ListPointsRoutes.__proto__ || Object.getPrototypeOf(ListPointsRoutes)).apply(this, arguments));
  }

  _createClass(ListPointsRoutes, [{
    key: "render",
    value: function render() {
      var numberOfPoints = 5;
      var arrPoints = [];

      for (var i = 0; i < numberOfPoints; ++i) {
        var _point = React.createElement(
          "li",
          { className: "point", key: i },
          React.createElement(
            "span",
            { className: "name-point" },
            "\u0442\u043E\u0447\u043A\u0430 ",
            i + 1,
            "."
          ),
          React.createElement(
            "span",
            { className: "delete-point" },
            React.createElement(
              "b",
              { className: "delete-point-button" },
              "x"
            )
          )
        );

        arrPoints.push(_point);
      }

      return React.createElement(
        "ul",
        { className: "list-points-routes", onMouseDown: function onMouseDown() {
            return false;
          } },
        arrPoints
      );
    }
  }]);

  return ListPointsRoutes;
}(React.Component);

var YanMap = function (_React$Component5) {
  _inherits(YanMap, _React$Component5);

  function YanMap() {
    _classCallCheck(this, YanMap);

    return _possibleConstructorReturn(this, (YanMap.__proto__ || Object.getPrototypeOf(YanMap)).apply(this, arguments));
  }

  _createClass(YanMap, [{
    key: "render",
    value: function render() {
      return React.createElement("div", { id: "map" });
    }
  }]);

  return YanMap;
}(React.Component);

ReactDOM.render(React.createElement(Route, null), document.getElementById('container'));

var fieldCreateNewPoint = document.body.querySelector('.field-create-new-point'),
    listOfpoints = document.body.querySelector('.list-points-routes');

var point = void 0,
    underPoint = void 0,
    previousPoint = void 0,
    ghostPoint = void 0,
    dividingLine = void 0,
    coordsOfList = void 0,
    coordsOfPoint = void 0,
    coordsOfUnderPoint = void 0,
    coordMiddleUnderPoint = void 0,
    halfDistanceBetweenPoints = void 0,
    shiftY = void 0,
    firstPointListOfpoints = void 0,
    lastPointListOfpoints = void 0;

fieldCreateNewPoint.addEventListener('keydown', addNewPoint);
listOfpoints.addEventListener('click', deletePoint);
listOfpoints.addEventListener('mousedown', movePoint);

function addNewPoint(e) {
  if (e.keyCode !== 13 || this.value === '') return;

  var newPoint = document.createElement('li');
  newPoint.classList.add('point');

  newPoint.innerHTML = "\n  <span class=\"name-point\">\n  " + fieldCreateNewPoint.value + "\n  </span>\n  <span class=\"delete-point\">\n  <b class=\"delete-point-button\">x</b>\n  </span>  \n  ";

  listOfpoints.appendChild(newPoint);
  this.value = '';
}

function deletePoint(e) {
  if (e.target.classList.contains('delete-point-button')) {
    e.target.closest('.point').remove();
  }
}

function movePoint(e) {
  if (e.target.closest('.delete-point-button') || !e.target.closest('.point')) return;

  point = e.target.closest('.point');
  ghostPoint = document.createElement('li');
  coordsOfPoint = getCoords(point);
  coordsOfList = getCoords(listOfpoints);
  shiftY = e.pageY - coordsOfPoint.top;
  firstPointListOfpoints = listOfpoints.children[0], lastPointListOfpoints = listOfpoints.children[listOfpoints.children.length - 1];

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

  document.onmousemove = function (e) {
    moveAt(e);

    if (!document.elementFromPoint(e.clientX, e.clientY)) return;

    underPoint = document.elementFromPoint(e.clientX, e.clientY).closest('.point');

    if (!underPoint) {
      underPoint = document.elementFromPoint(e.clientX, e.clientY).closest('.currentUnderPoint');
    }

    if (!underPoint) return;

    changeUnderPointClass();
    insertDividingLine(e);
  };

  document.onmouseup = function (e) {
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
  var currentTop = e.pageY - shiftY,
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
    dividingLine.style.left = coordsOfList.left + (listOfpoints.clientWidth - parseInt(dividingLine.style.width)) / 2 + 'px';
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
  var box = elem.getBoundingClientRect();
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