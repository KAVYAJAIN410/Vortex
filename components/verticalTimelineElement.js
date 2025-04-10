

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactIntersectionObserver = require("react-intersection-observer");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const VerticalTimelineElement = ({
  children = "",
  className = "",
  contentArrowStyle = null,
  contentStyle = null,
  date = "",
  dateClassName = "",
  icon = null,
  iconClassName = "",
  iconOnClick = null,
  onTimelineElementClick = null,
  iconStyle = null,
  id = "",
  position = "",
  style = null,
  textClassName = "",
  intersectionObserverProps = {
    rootMargin: "0px 0px -40px 0px",
    triggerOnce: true,
  },
  visible = false,
}) =>
  /*#__PURE__*/ _react.default.createElement(
    _reactIntersectionObserver.InView,
    intersectionObserverProps,
    ({ inView, ref }) =>
      /*#__PURE__*/ _react.default.createElement(
        "div",
        {
          ref: ref,
          id: id,
          className: (0, _classnames.default)(
            className,
            "vertical-timeline-element",
            {
              "vertical-timeline-element--left": position === "left",
              "vertical-timeline-element--right": position === "right",
              "vertical-timeline-element--no-children": children === "",
            }
          ),
          style: style,
        },
        /*#__PURE__*/ _react.default.createElement(
          _react.default.Fragment,
          null,
          /*#__PURE__*/ _react.default.createElement(
            "span",
            {
              // eslint-disable-line jsx-a11y/no-static-element-interactions
              style: iconStyle,
              onClick: iconOnClick,
              className: (0, _classnames.default)(
                iconClassName,
                "vertical-timeline-element-icon",
                {
                  "bounce-in": inView || visible,
                  "is-hidden": !(inView || visible),
                }
              ),
            },
            icon
          ),
          /*#__PURE__*/ _react.default.createElement(
            "div",
            {
              style: contentStyle,
              onClick: onTimelineElementClick,
              className: (0, _classnames.default)(
                textClassName,
                "vertical-timeline-element-content",
                {
                  "bounce-in": inView || visible,
                  "is-hidden": !(inView || visible),
                }
              ),
            },
            /*#__PURE__*/ _react.default.createElement("div", {
              style: contentArrowStyle,
              className: "vertical-timeline-element-content-arrow",
            }),
            children,
            /*#__PURE__*/ _react.default.createElement(
              "span",
              {
                className: (0, _classnames.default)(
                  dateClassName,
                  "vertical-timeline-element-date"
                ),
              },
              date
            ),
        //     _react.default.createElement("h1", {
        //       className: (0, _classnames.default)(
        //         dateClassName,
        //         "vertical-timeline-element-date"
        //       ),
        //     }
        //   ,
        // "innoventur3")
          )
        )
      )
  );

VerticalTimelineElement.propTypes = {
  children: _propTypes.default.oneOfType([
    _propTypes.default.arrayOf(_propTypes.default.node),
    _propTypes.default.node,
  ]),
  className: _propTypes.default.string,
  contentArrowStyle: _propTypes.default.shape({}),
  contentStyle: _propTypes.default.shape({}),
  date: _propTypes.default.node,
  dateClassName: _propTypes.default.string,
  icon: _propTypes.default.element,
  iconClassName: _propTypes.default.string,
  iconStyle: _propTypes.default.shape({}),
  iconOnClick: _propTypes.default.func,
  onTimelineElementClick: _propTypes.default.func,
  id: _propTypes.default.string,
  position: _propTypes.default.string,
  style: _propTypes.default.shape({}),
  textClassName: _propTypes.default.string,
  visible: _propTypes.default.bool,
  intersectionObserverProps: _propTypes.default.shape({
    root: _propTypes.default.object,
    rootMargin: _propTypes.default.string,
    threshold: _propTypes.default.number,
    triggerOnce: _propTypes.default.bool,
  }),
};
var _default = VerticalTimelineElement;
exports.default = _default;