/* eslint-disable */
(function(global) {
    const babelHelpers = (global.babelHelpers = {});

    babelHelpers.jsx = (function() {
        const REACT_ELEMENT_TYPE =
            (typeof Symbol === 'function' &&
                Symbol.for &&
                Symbol.for('react.element')) ||
            0xeac7;

        return function createRawReactElement(type, props, key, children) {
            const defaultProps = type && type.defaultProps;
            const childrenLength = arguments.length - 3;

            if (!props && childrenLength !== 0) {
                props = {};
            }

            if (props && defaultProps) {
                for (const propName in defaultProps) {
                    if (props[propName] === void 0) {
                        props[propName] = defaultProps[propName];
                    }
                }
            } else if (!props) {
                props = defaultProps || {};
            }

            if (childrenLength === 1) {
                props.children = children;
            } else if (childrenLength > 1) {
                const childArray = Array(childrenLength);

                for (let i = 0; i < childrenLength; i++) {
                    childArray[i] = arguments[i + 3];
                }

                props.children = childArray;
            }

            return {
                $$typeof: REACT_ELEMENT_TYPE,
                type: type,
                key: key === undefined ? null : '' + key,
                ref: null,
                props: props,
                _owner: null,
            };
        };
    })();

    babelHelpers.objectWithoutProperties = function(obj, keys) {
        const target = {};

        for (const i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }

        return target;
    };

    babelHelpers.interopRequireDefault = function(obj) {
        return obj && obj.__esModule
            ? obj
            : {
                  default: obj,
              };
    };

    babelHelpers.interopRequireWildcard = function(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            const newObj = {};

            if (obj != null) {
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key))
                        newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    };

    babelHelpers.extends = Object.assign;
})(typeof global === 'undefined' ? self : global);
