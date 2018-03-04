"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Format = require("d3-format");

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _utils = require("../utils");

var _GenericComponent = require("../GenericComponent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrentCoordinate = function (_Component) {
	_inherits(CurrentCoordinate, _Component);

	function CurrentCoordinate(props) {
		_classCallCheck(this, CurrentCoordinate);

		var _this = _possibleConstructorReturn(this, (CurrentCoordinate.__proto__ || Object.getPrototypeOf(CurrentCoordinate)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(CurrentCoordinate, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var circle = helper(this.props, moreProps);
			if (!circle) return null;

			var  ohlcFormat = this.props.ohlcFormat;

			// ctx.shadowBlur = circle.shadowBlur;
			// ctx.shadowColor = circle.shadowColor;
			ctx.fillStyle = circle.fill;
			ctx.beginPath();
			ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.beginPath();
			ctx.stroke();
			ctx.closePath();
			// ctx.strokeStyle = "rgb(76, 152, 149)";
			// ctx.lineWidth = 4;
			// ctx.fillStyle = "rgb(31, 44, 57)";
			// roundRect(ctx, circle.x + 8, circle.y - 15, 90, 30, 5, true);
			ctx.lineJoin = "round";
			ctx.strokeStyle = "#409A97";
			ctx.lineWidth = 2;
			ctx.fillStyle = "#152936";
			var halfScreenWidth = circle.screenWidth / 2;
			//console.log(circle.x + " " + circle.screenWidth);
			if(circle.x > halfScreenWidth){
				ctx.beginPath();
				roundedQuoteBoxRight(ctx, circle.x - 133, circle.y - 17, 120, 26, 5, 5, 0.5);
				ctx.fill();
				ctx.stroke()
				ctx.font = '11.5pt Ubuntu, Helvetica Neue, Helvetica, Arial, sans-serif';
				ctx.fillStyle = "rgb(90, 176, 221)";
				ctx.fillText((circle.close.close).toFixed(5) + " " + circle.acronym, circle.x - 120, circle.y);
				// ctx.fillText(ohlcFormat(circle.close.close) + " " + circle.acronym, circle.x - 100, circle.y);

				//USD todo
				// ctx.font = '9pt Ubuntu, Helvetica Neue, Helvetica, Arial, sans-serif';
				// ctx.fillStyle = "rgb(51, 105, 133)";
				// ctx.fillText("~$15.58USD", circle.x - 100, circle.y + 13);

			}else {
				// draw left quote box
				ctx.beginPath();
				roundedQuoteBoxLeft(ctx, circle.x + 13, circle.y - 17, 120, 26, 5, 5, 0.5);
				ctx.fill();
				ctx.stroke()
				ctx.font = '11.5pt Ubuntu, Helvetica Neue, Helvetica, Arial, sans-serif';
				ctx.fillStyle = "rgb(90, 176, 221)";
				ctx.fillText((circle.close.close).toFixed(5) + " " + circle.acronym, circle.x + 30, circle.y);
				//USD todo
				// ctx.font = '9pt Ubuntu, Helvetica Neue, Helvetica, Arial, sans-serif';
				// ctx.fillStyle = "rgb(51, 105, 133)";
				// ctx.fillText("~$15.58USD", circle.x + 28, circle.y + 13);

			}



		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var className = this.props.className;


			var circle = helper(this.props, moreProps);
			if (!circle) return null;

			return _react2.default.createElement("circle", { className: className, cx: circle.x, cy: circle.y, r: circle.r, fill: circle.fill });
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericChartComponent2.default, {
				svgDraw: this.renderSVG,
				canvasDraw: this.drawOnCanvas,
				canvasToDraw: _GenericComponent.getMouseCanvas,
				drawOn: ["mousemove", "pan"]
			});
		}
	}]);

	return CurrentCoordinate;
}(_react.Component);

CurrentCoordinate.propTypes = {
	yAccessor: _propTypes2.default.func,
	ohlcFormat: _propTypes2.default.func,
	r: _propTypes2.default.number.isRequired,
	className: _propTypes2.default.string
};

CurrentCoordinate.defaultProps = {
	r: 3,
	ohlcFormat: (0, _d3Format.format)(".2f"),
	className: "react-stockcharts-current-coordinate"
};

function helper(props, moreProps) {
	var fill = props.fill,
	    yAccessor = props.yAccessor,
	    r = props.r;
	var show = moreProps.show,
		xScale = moreProps.xScale,
		screenWidth = moreProps.width,
		yScale = moreProps.chartConfig.yScale,
		shadowColor = props.shadowColor,
		shadowBlur = props.shadowBlur,
		currentItem = moreProps.currentItem,
		acronym = props.acronym,
	    xAccessor = moreProps.xAccessor;

	// console.log(show);

	if (!show || (0, _utils.isNotDefined)(currentItem)) return null;

	var xValue = xAccessor(currentItem);
	var yValue = yAccessor(currentItem);

	if ((0, _utils.isNotDefined)(yValue)) return null;

	// console.log(chartConfig);
	var x = Math.round(xScale(xValue));
	var y = Math.round(yScale(yValue));
	var close = currentItem;


	return { x: x, y: y, r: r, fill: fill, close: close, screenWidth: screenWidth, acronym : acronym, shadowColor : shadowColor, shadowBlur : shadowBlur };
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
	if (typeof stroke == "undefined" ) {
	  stroke = true;
	}
	if (typeof radius === "undefined") {
	  radius = 5;
	}
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
	if (stroke) {
	  ctx.stroke();
	}
	if (fill) {
	  ctx.fill();
	}
  }

  function roundedQuoteBoxLeft(ctx, x, y, w, h, r, quoteSize, quotePos) {

	// draw 4 corners of box from top, left, top right , bottom right, bottom left
	ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
	ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
	ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
	ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
	
	// make sure trianle fits
	if (quoteSize > h - r * 2) { quoteSize = h - r * 2 }
  
	// get triangle position
	var qy = (h - (r * 2 + quoteSize)) * quotePos + r + y;
	
	// draw triangle
	ctx.lineTo(x, qy + quoteSize);
	ctx.lineTo(x - quoteSize, qy + quoteSize / 2);
	ctx.lineTo(x, qy);
  
   // and add the last line back to start
	ctx.closePath();
  }

  function roundedQuoteBoxRight(ctx, x, y, w, h, r, quoteSize, quotePos) {

	// draw top arcs from left to right
	ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
	ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
  
	// make sure trianle fits
	if (quoteSize > h - r * 2) { quoteSize = h - r * 2 }
  
	// get pos of triangle
	var qy = (h - (r * 2 + quoteSize)) * quotePos + r + y;
  
	// draw triangle
	ctx.lineTo(x + w, qy);
	ctx.lineTo(x + w + quoteSize, qy + quoteSize / 2);
	ctx.lineTo(x + w, qy + quoteSize);
  
	// draw remaining arcs
	ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
	ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
  
	// and add the last line back to start
	ctx.closePath();
  }


exports.default = CurrentCoordinate;
//# sourceMappingURL=CurrentCoordinate.js.map