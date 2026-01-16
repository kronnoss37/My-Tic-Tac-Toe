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

          const currentPath = getRightPath(path, target, prop);

          const value = target[prop]
 
          if (typeof value === 'object' && value !== null) {
            return iter(value, currentPath);
          }
          return value;
        },
        set: (target, prop, value, receiver) => {

          const currentPath = getRightPath(path, target, prop);

          const oldValue = target[prop];
          target[prop] = value;
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