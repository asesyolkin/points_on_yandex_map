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
        React.createElement(PointsRoute, null),
        React.createElement(YanMap, null)
      );
    }
  }]);

  return Route;
}(React.Component);

var PointsRoute = function (_React$Component2) {
  _inherits(PointsRoute, _React$Component2);

  function PointsRoute(props) {
    _classCallCheck(this, PointsRoute);

    var _this2 = _possibleConstructorReturn(this, (PointsRoute.__proto__ || Object.getPrototypeOf(PointsRoute)).call(this, props));

    _this2.addNewPoint = function (namePoint) {
      var newPoint = React.createElement(Point, { key: Math.random(), pointName: namePoint });
      var newArrOfPoints = _this2.state.points.slice();
      newArrOfPoints.push(newPoint);
      _this2.setState({
        points: newArrOfPoints
      });
    };

    _this2.state = {
      points: []
    };

    var numberOfPoints = 5;

    for (var i = 0; i < numberOfPoints; ++i) {
      var _point = React.createElement(Point, { key: Math.random(), pointNumber: i });
      _this2.state.points.push(_point);
    };
    return _this2;
  }

  _createClass(PointsRoute, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "points-route" },
        React.createElement(CreateNewPoint, { addNewPoint: this.addNewPoint }),
        React.createElement(ListPointsRoute, { points: this.state.points })
      );
    }
  }]);

  return PointsRoute;
}(React.Component);

var CreateNewPoint = function (_React$Component3) {
  _inherits(CreateNewPoint, _React$Component3);

  function CreateNewPoint() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, CreateNewPoint);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = CreateNewPoint.__proto__ || Object.getPrototypeOf(CreateNewPoint)).call.apply(_ref, [this].concat(args))), _this3), _this3.onKeyDownHandler = function (e) {
      if (e.keyCode !== 13 || e.target.value === '') return;

      _this3.props.addNewPoint(e.target.value);
      e.target.value = '';
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(CreateNewPoint, [{
    key: "render",
    value: function render() {
      return React.createElement("input", { className: "field-create-new-point", placeholder: "\u041D\u043E\u0432\u0430\u044F \u0442\u043E\u0447\u043A\u0430 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430", onKeyDown: this.onKeyDownHandler });
    }
  }]);

  return CreateNewPoint;
}(React.Component);

var ListPointsRoute = function (_React$Component4) {
  _inherits(ListPointsRoute, _React$Component4);

  function ListPointsRoute() {
    _classCallCheck(this, ListPointsRoute);

    return _possibleConstructorReturn(this, (ListPointsRoute.__proto__ || Object.getPrototypeOf(ListPointsRoute)).apply(this, arguments));
  }

  _createClass(ListPointsRoute, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "ul",
        { className: "list-points-route", onMouseDown: function onMouseDown(e) {
            return e.preventDefault();
          } },
        this.props.points
      );
    }
  }]);

  return ListPointsRoute;
}(React.Component);

var Point = function (_React$Component5) {
  _inherits(Point, _React$Component5);

  function Point() {
    _classCallCheck(this, Point);

    return _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).apply(this, arguments));
  }

  _createClass(Point, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "li",
        { className: "point" },
        React.createElement(
          "span",
          { className: "name-point" },
          this.props.pointName ? this.props.pointName : "\u0442\u043E\u0447\u043A\u0430 " + (this.props.pointNumber + 1)
        ),
        React.createElement(DeletePoint, null)
      );
    }
  }]);

  return Point;
}(React.Component);

var DeletePoint = function (_React$Component6) {
  _inherits(DeletePoint, _React$Component6);

  function DeletePoint() {
    var _ref2;

    var _temp2, _this6, _ret2;

    _classCallCheck(this, DeletePoint);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this6 = _possibleConstructorReturn(this, (_ref2 = DeletePoint.__proto__ || Object.getPrototypeOf(DeletePoint)).call.apply(_ref2, [this].concat(args))), _this6), _this6.deletePoint = function (e) {
      if (e.target.classList.contains('delete-point-button')) {
        e.target.closest('.point').remove();
      }
    }, _temp2), _possibleConstructorReturn(_this6, _ret2);
  }

  _createClass(DeletePoint, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "span",
        { className: "delete-point" },
        React.createElement(
          "b",
          { className: "delete-point-button", onClick: this.deletePoint },
          "x"
        )
      );
    }
  }]);

  return DeletePoint;
}(React.Component);

var YanMap = function (_React$Component7) {
  _inherits(YanMap, _React$Component7);

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
    listOfpoints = document.body.querySelector('.list-points-route');

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

listOfpoints.addEventListener('mousedown', movePoint);

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