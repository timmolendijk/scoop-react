"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require("react");
const storeShape_1 = require("react-redux/lib/utils/storeShape");
const redux_scoop_1 = require("redux-scoop");
redux_scoop_1.registerView({
    isViewComponent(value) {
        return value instanceof React.Component;
    },
    getViewComponentType(component) {
        const Component = component.constructor;
        Component.contextTypes = __assign({}, Component.contextTypes, { store: storeShape_1.default });
        return Component;
    },
    getViewComponentStore(component) {
        return component.context.store;
    },
    getViewComponentId(component) {
        return component.props.id;
    }
});
