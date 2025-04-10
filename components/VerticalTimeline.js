

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const VerticalTimeline = ({
  animate = true,
  className = "",
  layout = "2-columns",
  lineColor = "white",
  children,
}) => {
  if (typeof window === "object") {
    document.documentElement.style.setProperty("--line-color", lineColor);
  }

  return /*#__PURE__*/ _react.default.createElement(
    "div",
    {
      className: (0, _classnames.default)(className, "vertical-timeline", {
        "vertical-timeline--animate": animate,
        "vertical-timeline--two-columns": layout === "2-columns",
        "vertical-timeline--one-column-left":
          layout === "1-column" || layout === "1-column-left",
        "vertical-timeline--one-column-right": layout === "1-column-right",
      }),
    },
    children
  );
};

VerticalTimeline.propTypes = {
  children: _propTypes.default.oneOfType([
    _propTypes.default.arrayOf(_propTypes.default.node),
    _propTypes.default.node,
  ]).isRequired,
  className: _propTypes.default.string,
  animate: _propTypes.default.bool,
  layout: _propTypes.default.oneOf([
    "1-column-left",
    "1-column",
    "2-columns",
    "1-column-right",
  ]),
  lineColor: _propTypes.default.string,
};
var _default = VerticalTimeline;
exports.default = _default;