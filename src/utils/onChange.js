const getRightPath = (path, target, prop) => {
  const newPath = !Array.isArray(target) ? `${path}.${prop}` : path;
  return path === '' ? prop : newPath;
}

const onChange = (state, callback) => {
  const stateCopy = structuredClone(state)
  const cache = new WeakMap()
  const iter = (currentState, path = '') => {

    if (cache.has(currentState)) {
      return cache.get(currentState)
    }

    const proxy =
      new Proxy(currentState, {
        get: (target, prop, receiver) => {
          // console.log('Getting...');
          // console.log('target', target);
          // console.log('prop', prop);
          // console.log('receiver', receiver);

          const currentPath = getRightPath(path, target, prop);

          const value = target[prop]

          // if (prop === 'push') {
          //   return (...args) => {
          //     const result = value.apply(target, args)
          //     callback(path, target);
          //     return result;
          //   }
          // }
 
          if (typeof value === 'object' && value !== null) {
            return iter(value, currentPath);
          }
          return value;
        },
        set: (target, prop, value, receiver) => {
          // console.log('Setting...');
          // const hasProperty = Reflect.has(target, prop, receiver);
          // console.log('hasProperty', hasProperty);
          // if (!hasProperty) throw new Error(`Error: Property "${prop}" doesn't exist...`);

          const currentPath = getRightPath(path, target, prop);

          const oldValue = target[prop];
          target[prop] = value; // в чем отличие от Reflect?
          callback(currentPath, value, oldValue);

          return true;
        },
      });
    cache.set(currentState, proxy);
    return proxy
  }

  return iter(stateCopy);
}

export default onChange