import * as React from 'react';
// TODO(tim): This is fragile.
import storeShape from 'react-redux/lib/utils/storeShape';
import { registerView } from 'redux-scoop';

// TODO(tim): The fact that we mutate the component type here is a subtle leaky
// abstraction, because it silently requires the component's constructor to pass
// along not only `props` but also its second parameter `context` to `super`.
// Ideally we would provide a higher-order component class decorator that wraps
// each view component type instead. Doing so would beg the question whether we
// should require *each* stateful class to be decorated as such? If yes, that
// feels like a pretty high price to pay. If no, how do we prevent the user from
// defining stateful fields on undecorated (unwrapped) view component types?

registerView({
  isViewComponent(value) {
    return value instanceof React.Component;
  },
  getViewComponentType<P>(component: React.Component<P, any>) {
    const Component = component.constructor as React.ComponentClass<P>;
    Component.contextTypes = {
      ...Component.contextTypes,
      store: storeShape
    };
    return Component;
  },
  getViewComponentStore(component: React.Component<any, any>) {
    return component.context.store;
  },
  getViewComponentId(component: React.Component<any, any>) {
    // TODO(tim): Make property key configurable.
    return component.props.id;
  }
});
