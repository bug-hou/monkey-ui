var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject(a);
  bValidType = isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const extend$1 = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => val instanceof Date;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let activeEffectScope;
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({
  deps
}) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const {
    deps
  } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const {
    deps
  } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    trackEffects(dep);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger$1(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect of isArray(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger$1(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger$1(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger$1(target, "delete", key, void 0);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const {
    has: has2
  } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger$1(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const {
    has: has2,
    get: get2
  } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger$1(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger$1(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const {
    has: has2,
    get: get2
  } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger$1(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger$1(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const {
          value,
          done
        } = innerIterator.next();
        return done ? {
          value,
          done
        } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [mutableInstrumentations2, readonlyInstrumentations2, shallowInstrumentations2, shallowReadonlyInstrumentations2];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep);
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index2) {
  if (!isArray(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  flushPreFlushCbs(seen);
  queue.sort((a, b) => getId(a) - getId(b));
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn(...args);
    setCurrentRenderingInstance(prevInstance);
    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props, {
    slots
  }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        for (const c of children) {
          if (c.type !== Comment) {
            child = c;
            break;
          }
        }
      }
      const rawProps = toRaw(props);
      const {
        mode
      } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const {
        getTransitionKey
      } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const {
    leavingVNodes
  } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        hook(el, done);
        if (hook.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        onLeave(el, done);
        if (onLeave.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, {
        key
      }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options) {
  return isFunction(options) ? {
    setup: options,
    name: options.name
  } : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function injectHook(type, hook, target = currentInstance, prepend2 = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend2) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => injectHook(lifecycle, hook, target);
const onMounted = createHook("m");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
function resolveMergedOptions(instance) {
  const base = instance.type;
  const {
    mixins,
    extends: extendsOptions
  } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: {
      optionMergeStrategies
    }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const {
    mixins,
    extends: extendsOptions
  } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend$1(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend$1(extend$1(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend$1(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (isFunction(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }
    if (dir.deep) {
      traverse(value);
    }
    bindings.push({
      dir,
      instance,
      value,
      oldValue: void 0,
      arg,
      modifiers
    });
  }
  return vnode;
}
const queuePostRenderEffect = queueEffectWithSuspense;
const isTeleport = (type) => type.__isTeleport;
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveDynamicComponent(component) {
  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
const Comment = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({
  key
}) => key != null ? key : null;
const normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? {
    i: currentRenderingInstance,
    r: ref2,
    k: ref_key,
    f: !!ref_for
  } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let {
      class: klass,
      style: style2
    } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style2)) {
      if (isProxy(style2) && !isArray(style2)) {
        style2 = extend$1({}, style2);
      }
      props.style = normalizeStyle(style2);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend$1({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const {
    props,
    ref: ref2,
    patchFlag,
    children
  } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const {
    shapeFlag
  } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = {
      default: children,
      _ctx: currentRenderingInstance
    };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function renderList(source, renderItem, cache, index2) {
  let ret;
  const cached = cache && cache[index2];
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index2] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    return createVNode("slot", name === "default" ? null : {
      name
    }, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(Fragment, {
    key: props.key || `_${name}`
  }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend$1(/* @__PURE__ */ Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => i.props,
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
  $refs: (i) => i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => () => queueJob(i.update),
  $nextTick: (i) => nextTick.bind(i.proxy),
  $watch: (i) => instanceWatch.bind(i)
});
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }
    }));
  }
}
function getComponentName(Component) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
function mergeDefaults(raw, defaults) {
  const props = isArray(raw) ? raw.reduce((normalized, p) => (normalized[p] = {}, normalized), {}) : raw;
  for (const key in defaults) {
    const opt = props[key];
    if (opt) {
      if (isArray(opt) || isFunction(opt)) {
        props[key] = {
          type: opt,
          default: defaults[key]
        };
      } else {
        opt.default = defaults[key];
      }
    } else if (opt === null) {
      props[key] = {
        default: defaults[key]
      };
    } else
      ;
  }
  return props;
}
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
function addEventListener$1(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition$1 = (props, {
  slots
}) => h(BaseTransition, resolveTransitionProps(props), slots);
Transition$1.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = Transition$1.props = /* @__PURE__ */ extend$1({}, BaseTransition.props, DOMTransitionPropsValidators);
const callHook = (hook, args = []) => {
  if (isArray(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend$1(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const {
    _vtc
  } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const {
    type,
    timeout,
    propCount
  } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(TRANSITION + "Delay");
  const transitionDurations = getStyleProperties(TRANSITION + "Duration");
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(ANIMATION + "Delay");
  const animationDurations = getStyleProperties(ANIMATION + "Duration");
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const TransitionGroupImpl = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ extend$1({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, {
    slots
  }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c) => {
        const el = c.el;
        const style2 = el.style;
        addTransitionClass(el, moveClass);
        style2.transform = style2.webkitTransform = style2.transitionDuration = "";
        const cb = el._moveCb = (e) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      const rawProps = toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
        }
      }
      if (prevChildren) {
        for (let i = 0; i < prevChildren.length; i++) {
          const child = prevChildren[i];
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }
      return createVNode(tag, null, children);
    };
  }
};
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
  const el = c.el;
  if (el._moveCb) {
    el._moveCb();
  }
  if (el._enterCb) {
    el._enterCb();
  }
}
function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}
function applyTranslation(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
    return c;
  }
}
function hasCSSTransform(el, root, moveClass) {
  const clone = el.cloneNode();
  if (el._vtc) {
    el._vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const {
    hasTransform
  } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"];
  return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    trigger(target, "input");
  }
}
function trigger(el, type) {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
const vModelText = {
  created(el, {
    modifiers: {
      lazy,
      trim,
      number
    }
  }, vnode) {
    el._assign = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener$1(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing)
        return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      } else if (castToNumber) {
        domValue = toNumber(domValue);
      }
      el._assign(domValue);
    });
    if (trim) {
      addEventListener$1(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener$1(el, "compositionstart", onCompositionStart);
      addEventListener$1(el, "compositionend", onCompositionEnd);
      addEventListener$1(el, "change", onCompositionEnd);
    }
  },
  mounted(el, {
    value
  }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, {
    value,
    modifiers: {
      lazy,
      trim,
      number
    }
  }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (el.composing)
      return;
    if (document.activeElement === el) {
      if (lazy) {
        return;
      }
      if (trim && el.value.trim() === value) {
        return;
      }
      if ((number || el.type === "number") && toNumber(el.value) === value) {
        return;
      }
    }
    const newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
  }
};
const vModelCheckbox = {
  deep: true,
  created(el, _, vnode) {
    el._assign = getModelAssigner(vnode);
    addEventListener$1(el, "change", () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign = el._assign;
      if (isArray(modelValue)) {
        const index2 = looseIndexOf(modelValue, elementValue);
        const found = index2 !== -1;
        if (checked && !found) {
          assign(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index2, 1);
          assign(filtered);
        }
      } else if (isSet(modelValue)) {
        const cloned = new Set(modelValue);
        if (checked) {
          cloned.add(elementValue);
        } else {
          cloned.delete(elementValue);
        }
        assign(cloned);
      } else {
        assign(getCheckboxValue(el, checked));
      }
    });
  },
  mounted: setChecked,
  beforeUpdate(el, binding, vnode) {
    el._assign = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  }
};
function setChecked(el, {
  value,
  oldValue
}, vnode) {
  el._modelValue = value;
  if (isArray(value)) {
    el.checked = looseIndexOf(value, vnode.props.value) > -1;
  } else if (isSet(value)) {
    el.checked = value.has(vnode.props.value);
  } else if (value !== oldValue) {
    el.checked = looseEqual(value, getCheckboxValue(el, true));
  }
}
const vModelRadio = {
  created(el, {
    value
  }, vnode) {
    el.checked = looseEqual(value, vnode.props.value);
    el._assign = getModelAssigner(vnode);
    addEventListener$1(el, "change", () => {
      el._assign(getValue(el));
    });
  },
  beforeUpdate(el, {
    value,
    oldValue
  }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (value !== oldValue) {
      el.checked = looseEqual(value, vnode.props.value);
    }
  }
};
const vModelSelect = {
  deep: true,
  created(el, {
    value,
    modifiers: {
      number
    }
  }, vnode) {
    const isSetModel = isSet(value);
    addEventListener$1(el, "change", () => {
      const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map((o) => number ? toNumber(getValue(o)) : getValue(o));
      el._assign(el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]);
    });
    el._assign = getModelAssigner(vnode);
  },
  mounted(el, {
    value
  }) {
    setSelected(el, value);
  },
  beforeUpdate(el, _binding, vnode) {
    el._assign = getModelAssigner(vnode);
  },
  updated(el, {
    value
  }) {
    setSelected(el, value);
  }
};
function setSelected(el, value) {
  const isMultiple = el.multiple;
  if (isMultiple && !isArray(value) && !isSet(value)) {
    return;
  }
  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i];
    const optionValue = getValue(option);
    if (isMultiple) {
      if (isArray(value)) {
        option.selected = looseIndexOf(value, optionValue) > -1;
      } else {
        option.selected = value.has(optionValue);
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i)
          el.selectedIndex = i;
        return;
      }
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1;
  }
}
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
  const key = checked ? "_trueValue" : "_falseValue";
  return key in el ? el[key] : checked;
}
const vModelDynamic = {
  created(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "created");
  },
  mounted(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "mounted");
  },
  beforeUpdate(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "beforeUpdate");
  },
  updated(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "updated");
  }
};
function callModelHook(el, binding, vnode, prevVNode, hook) {
  let modelToUse;
  switch (el.tagName) {
    case "SELECT":
      modelToUse = vModelSelect;
      break;
    case "TEXTAREA":
      modelToUse = vModelText;
      break;
    default:
      switch (vnode.props && vnode.props.type) {
        case "checkbox":
          modelToUse = vModelCheckbox;
          break;
        case "radio":
          modelToUse = vModelRadio;
          break;
        default:
          modelToUse = vModelText;
      }
  }
  const fn = modelToUse[hook];
  fn && fn(el, binding, vnode, prevVNode);
}
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  return (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn(event, ...args);
  };
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  return (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) {
      return fn(event);
    }
  };
};
const vShow = {
  beforeMount(el, {
    value
  }, {
    transition: transition2
  }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition2 && value) {
      transition2.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, {
    value
  }, {
    transition: transition2
  }) {
    if (transition2 && value) {
      transition2.enter(el);
    }
  },
  updated(el, {
    value,
    oldValue
  }, {
    transition: transition2
  }) {
    if (!value === !oldValue)
      return;
    if (transition2) {
      if (value) {
        transition2.beforeEnter(el);
        setDisplay(el, true);
        transition2.enter(el);
      } else {
        transition2.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, {
    value
  }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
function useInject(name, key, value) {
  var _a2;
  return (_a2 = name != null ? name : inject(key, value)) != null ? _a2 : value;
}
function processStyle(prefix, suffix, split, ...args) {
  let result = prefix + "";
  args.forEach((arg) => result += arg + split);
  return result.slice(0, -1) + suffix;
}
/*!
 * better-scroll / better-scroll
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  }, f, y, t, g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
var propertiesConfig$7 = [{
  sourceKey: "scroller.scrollBehaviorX.currentPos",
  key: "x"
}, {
  sourceKey: "scroller.scrollBehaviorY.currentPos",
  key: "y"
}, {
  sourceKey: "scroller.scrollBehaviorX.hasScroll",
  key: "hasHorizontalScroll"
}, {
  sourceKey: "scroller.scrollBehaviorY.hasScroll",
  key: "hasVerticalScroll"
}, {
  sourceKey: "scroller.scrollBehaviorX.contentSize",
  key: "scrollerWidth"
}, {
  sourceKey: "scroller.scrollBehaviorY.contentSize",
  key: "scrollerHeight"
}, {
  sourceKey: "scroller.scrollBehaviorX.maxScrollPos",
  key: "maxScrollX"
}, {
  sourceKey: "scroller.scrollBehaviorY.maxScrollPos",
  key: "maxScrollY"
}, {
  sourceKey: "scroller.scrollBehaviorX.minScrollPos",
  key: "minScrollX"
}, {
  sourceKey: "scroller.scrollBehaviorY.minScrollPos",
  key: "minScrollY"
}, {
  sourceKey: "scroller.scrollBehaviorX.movingDirection",
  key: "movingDirectionX"
}, {
  sourceKey: "scroller.scrollBehaviorY.movingDirection",
  key: "movingDirectionY"
}, {
  sourceKey: "scroller.scrollBehaviorX.direction",
  key: "directionX"
}, {
  sourceKey: "scroller.scrollBehaviorY.direction",
  key: "directionY"
}, {
  sourceKey: "scroller.actions.enabled",
  key: "enabled"
}, {
  sourceKey: "scroller.animater.pending",
  key: "pending"
}, {
  sourceKey: "scroller.animater.stop",
  key: "stop"
}, {
  sourceKey: "scroller.scrollTo",
  key: "scrollTo"
}, {
  sourceKey: "scroller.scrollBy",
  key: "scrollBy"
}, {
  sourceKey: "scroller.scrollToElement",
  key: "scrollToElement"
}, {
  sourceKey: "scroller.resetPosition",
  key: "resetPosition"
}];
function warn(msg) {
  console.error("[BScroll warn]: " + msg);
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error("[BScroll] " + msg);
  }
}
var inBrowser = typeof window !== "undefined";
var ua = inBrowser && navigator.userAgent.toLowerCase();
var isWeChatDevTools = !!(ua && /wechatdevtools/.test(ua));
var isAndroid = ua && ua.indexOf("android") > 0;
var isIOSBadVersion = function() {
  if (typeof ua === "string") {
    var regex = /os (\d\d?_\d(_\d)?)/;
    var matches = regex.exec(ua);
    if (!matches)
      return false;
    var parts = matches[1].split("_").map(function(item) {
      return parseInt(item, 10);
    });
    return !!(parts[0] === 13 && parts[1] >= 4);
  }
  return false;
}();
var supportsPassive = false;
if (inBrowser) {
  var EventName = "test-passive";
  try {
    var opts = {};
    Object.defineProperty(opts, "passive", {
      get: function() {
        supportsPassive = true;
      }
    });
    window.addEventListener(EventName, function() {
    }, opts);
  } catch (e) {
  }
}
function getNow() {
  return window.performance && window.performance.now && window.performance.timing ? window.performance.now() + window.performance.timing.navigationStart : +new Date();
}
var extend = function(target, source) {
  for (var key in source) {
    target[key] = source[key];
  }
  return target;
};
function isUndef(v) {
  return v === void 0 || v === null;
}
function getDistance(x, y) {
  return Math.sqrt(x * x + y * y);
}
function between(x, min, max) {
  if (x < min) {
    return min;
  }
  if (x > max) {
    return max;
  }
  return x;
}
function findIndex(ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn);
  }
  var index2 = -1;
  ary.some(function(item, i, ary2) {
    var ret = fn(item, i, ary2);
    if (ret) {
      index2 = i;
      return ret;
    }
  });
  return index2;
}
var elementStyle = inBrowser && document.createElement("div").style;
var vendor = function() {
  if (!inBrowser) {
    return false;
  }
  var transformNames = [{
    key: "standard",
    value: "transform"
  }, {
    key: "webkit",
    value: "webkitTransform"
  }, {
    key: "Moz",
    value: "MozTransform"
  }, {
    key: "O",
    value: "OTransform"
  }, {
    key: "ms",
    value: "msTransform"
  }];
  for (var _i = 0, transformNames_1 = transformNames; _i < transformNames_1.length; _i++) {
    var obj = transformNames_1[_i];
    if (elementStyle[obj.value] !== void 0) {
      return obj.key;
    }
  }
  return false;
}();
function prefixStyle(style2) {
  if (vendor === false) {
    return style2;
  }
  if (vendor === "standard") {
    if (style2 === "transitionEnd") {
      return "transitionend";
    }
    return style2;
  }
  return vendor + style2.charAt(0).toUpperCase() + style2.substr(1);
}
function getElement(el) {
  return typeof el === "string" ? document.querySelector(el) : el;
}
function addEvent(el, type, fn, capture) {
  var useCapture = supportsPassive ? {
    passive: false,
    capture: !!capture
  } : !!capture;
  el.addEventListener(type, fn, useCapture);
}
function removeEvent(el, type, fn, capture) {
  el.removeEventListener(type, fn, {
    capture: !!capture
  });
}
function offset(el) {
  var left = 0;
  var top = 0;
  while (el) {
    left -= el.offsetLeft;
    top -= el.offsetTop;
    el = el.offsetParent;
  }
  return {
    left,
    top
  };
}
function offsetToBody(el) {
  var rect = el.getBoundingClientRect();
  return {
    left: -(rect.left + window.pageXOffset),
    top: -(rect.top + window.pageYOffset)
  };
}
var cssVendor = vendor && vendor !== "standard" ? "-" + vendor.toLowerCase() + "-" : "";
var transform = prefixStyle("transform");
var transition = prefixStyle("transition");
var hasPerspective = inBrowser && prefixStyle("perspective") in elementStyle;
var hasTouch = inBrowser && ("ontouchstart" in window || isWeChatDevTools);
var hasTransition = inBrowser && transition in elementStyle;
var style = {
  transform,
  transition,
  transitionTimingFunction: prefixStyle("transitionTimingFunction"),
  transitionDuration: prefixStyle("transitionDuration"),
  transitionDelay: prefixStyle("transitionDelay"),
  transformOrigin: prefixStyle("transformOrigin"),
  transitionEnd: prefixStyle("transitionEnd"),
  transitionProperty: prefixStyle("transitionProperty")
};
var eventTypeMap = {
  touchstart: 1,
  touchmove: 1,
  touchend: 1,
  touchcancel: 1,
  mousedown: 2,
  mousemove: 2,
  mouseup: 2
};
function getRect(el) {
  if (el instanceof window.SVGElement) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
}
function preventDefaultExceptionFn(el, exceptions) {
  for (var i in exceptions) {
    if (exceptions[i].test(el[i])) {
      return true;
    }
  }
  return false;
}
var tagExceptionFn = preventDefaultExceptionFn;
function tap(e, eventName) {
  var ev = document.createEvent("Event");
  ev.initEvent(eventName, true, true);
  ev.pageX = e.pageX;
  ev.pageY = e.pageY;
  e.target.dispatchEvent(ev);
}
function click(e, event) {
  if (event === void 0) {
    event = "click";
  }
  var eventSource;
  if (e.type === "mouseup") {
    eventSource = e;
  } else if (e.type === "touchend" || e.type === "touchcancel") {
    eventSource = e.changedTouches[0];
  }
  var posSrc = {};
  if (eventSource) {
    posSrc.screenX = eventSource.screenX || 0;
    posSrc.screenY = eventSource.screenY || 0;
    posSrc.clientX = eventSource.clientX || 0;
    posSrc.clientY = eventSource.clientY || 0;
  }
  var ev;
  var bubbles = true;
  var cancelable = true;
  var ctrlKey = e.ctrlKey, shiftKey = e.shiftKey, altKey = e.altKey, metaKey = e.metaKey;
  var pressedKeysMap = {
    ctrlKey,
    shiftKey,
    altKey,
    metaKey
  };
  if (typeof MouseEvent !== "undefined") {
    try {
      ev = new MouseEvent(event, extend(__assign({
        bubbles,
        cancelable
      }, pressedKeysMap), posSrc));
    } catch (e2) {
      createEvent();
    }
  } else {
    createEvent();
  }
  function createEvent() {
    ev = document.createEvent("Event");
    ev.initEvent(event, bubbles, cancelable);
    extend(ev, posSrc);
  }
  ev.forwardedTouchEvent = true;
  ev._constructed = true;
  e.target.dispatchEvent(ev);
}
function dblclick(e) {
  click(e, "dblclick");
}
function prepend(el, target) {
  var firstChild = target.firstChild;
  if (firstChild) {
    before(el, firstChild);
  } else {
    target.appendChild(el);
  }
}
function before(el, target) {
  var parentNode = target.parentNode;
  parentNode.insertBefore(el, target);
}
function removeChild(el, child) {
  el.removeChild(child);
}
function hasClass(el, className) {
  var reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
  return reg.test(el.className);
}
function HTMLCollectionToArray(el) {
  return Array.prototype.slice.call(el, 0);
}
function getClientSize(el) {
  return {
    width: el.clientWidth,
    height: el.clientHeight
  };
}
var ease = {
  swipe: {
    style: "cubic-bezier(0.23, 1, 0.32, 1)",
    fn: function(t) {
      return 1 + --t * t * t * t * t;
    }
  },
  swipeBounce: {
    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    fn: function(t) {
      return t * (2 - t);
    }
  },
  bounce: {
    style: "cubic-bezier(0.165, 0.84, 0.44, 1)",
    fn: function(t) {
      return 1 - --t * t * t * t;
    }
  }
};
var DEFAULT_INTERVAL = 1e3 / 60;
var windowCompat = inBrowser && window;
function noop$1() {
}
var requestAnimationFrame$1 = function() {
  if (!inBrowser) {
    return noop$1;
  }
  return windowCompat.requestAnimationFrame || windowCompat.webkitRequestAnimationFrame || windowCompat.mozRequestAnimationFrame || windowCompat.oRequestAnimationFrame || function(callback) {
    return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL);
  };
}();
var cancelAnimationFrame = function() {
  if (!inBrowser) {
    return noop$1;
  }
  return windowCompat.cancelAnimationFrame || windowCompat.webkitCancelAnimationFrame || windowCompat.mozCancelAnimationFrame || windowCompat.oCancelAnimationFrame || function(id) {
    window.clearTimeout(id);
  };
}();
var noop = function(val) {
};
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};
var getProperty = function(obj, key) {
  var keys = key.split(".");
  for (var i = 0; i < keys.length - 1; i++) {
    obj = obj[keys[i]];
    if (typeof obj !== "object" || !obj)
      return;
  }
  var lastKey = keys.pop();
  if (typeof obj[lastKey] === "function") {
    return function() {
      return obj[lastKey].apply(obj, arguments);
    };
  } else {
    return obj[lastKey];
  }
};
var setProperty = function(obj, key, value) {
  var keys = key.split(".");
  var temp;
  for (var i = 0; i < keys.length - 1; i++) {
    temp = keys[i];
    if (!obj[temp])
      obj[temp] = {};
    obj = obj[temp];
  }
  obj[keys.pop()] = value;
};
function propertiesProxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return getProperty(this, sourceKey);
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    setProperty(this, sourceKey, val);
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
var EventEmitter = function() {
  function EventEmitter2(names) {
    this.events = {};
    this.eventTypes = {};
    this.registerType(names);
  }
  EventEmitter2.prototype.on = function(type, fn, context) {
    if (context === void 0) {
      context = this;
    }
    this.hasType(type);
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push([fn, context]);
    return this;
  };
  EventEmitter2.prototype.once = function(type, fn, context) {
    var _this = this;
    if (context === void 0) {
      context = this;
    }
    this.hasType(type);
    var magic = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      _this.off(type, magic);
      var ret = fn.apply(context, args);
      if (ret === true) {
        return ret;
      }
    };
    magic.fn = fn;
    this.on(type, magic);
    return this;
  };
  EventEmitter2.prototype.off = function(type, fn) {
    if (!type && !fn) {
      this.events = {};
      return this;
    }
    if (type) {
      this.hasType(type);
      if (!fn) {
        this.events[type] = [];
        return this;
      }
      var events = this.events[type];
      if (!events) {
        return this;
      }
      var count = events.length;
      while (count--) {
        if (events[count][0] === fn || events[count][0] && events[count][0].fn === fn) {
          events.splice(count, 1);
        }
      }
      return this;
    }
  };
  EventEmitter2.prototype.trigger = function(type) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    this.hasType(type);
    var events = this.events[type];
    if (!events) {
      return;
    }
    var len = events.length;
    var eventsCopy = __spreadArrays(events);
    var ret;
    for (var i = 0; i < len; i++) {
      var event_1 = eventsCopy[i];
      var fn = event_1[0], context = event_1[1];
      if (fn) {
        ret = fn.apply(context, args);
        if (ret === true) {
          return ret;
        }
      }
    }
  };
  EventEmitter2.prototype.registerType = function(names) {
    var _this = this;
    names.forEach(function(type) {
      _this.eventTypes[type] = type;
    });
  };
  EventEmitter2.prototype.destroy = function() {
    this.events = {};
    this.eventTypes = {};
  };
  EventEmitter2.prototype.hasType = function(type) {
    var types = this.eventTypes;
    var isType = types[type] === type;
    if (!isType) {
      warn('EventEmitter has used unknown event type: "' + type + '", should be oneof [' + ("" + Object.keys(types).map(function(_) {
        return JSON.stringify(_);
      })) + "]");
    }
  };
  return EventEmitter2;
}();
var EventRegister = function() {
  function EventRegister2(wrapper, events) {
    this.wrapper = wrapper;
    this.events = events;
    this.addDOMEvents();
  }
  EventRegister2.prototype.destroy = function() {
    this.removeDOMEvents();
    this.events = [];
  };
  EventRegister2.prototype.addDOMEvents = function() {
    this.handleDOMEvents(addEvent);
  };
  EventRegister2.prototype.removeDOMEvents = function() {
    this.handleDOMEvents(removeEvent);
  };
  EventRegister2.prototype.handleDOMEvents = function(eventOperation) {
    var _this = this;
    var wrapper = this.wrapper;
    this.events.forEach(function(event) {
      eventOperation(wrapper, event.name, _this, !!event.capture);
    });
  };
  EventRegister2.prototype.handleEvent = function(e) {
    var eventType = e.type;
    this.events.some(function(event) {
      if (event.name === eventType) {
        event.handler(e);
        return true;
      }
      return false;
    });
  };
  return EventRegister2;
}();
var CustomOptions = function() {
  function CustomOptions2() {
  }
  return CustomOptions2;
}();
var OptionsConstructor = function(_super) {
  __extends(OptionsConstructor2, _super);
  function OptionsConstructor2() {
    var _this = _super.call(this) || this;
    _this.startX = 0;
    _this.startY = 0;
    _this.scrollX = false;
    _this.scrollY = true;
    _this.freeScroll = false;
    _this.directionLockThreshold = 0;
    _this.eventPassthrough = "";
    _this.click = false;
    _this.dblclick = false;
    _this.tap = "";
    _this.bounce = {
      top: true,
      bottom: true,
      left: true,
      right: true
    };
    _this.bounceTime = 800;
    _this.momentum = true;
    _this.momentumLimitTime = 300;
    _this.momentumLimitDistance = 15;
    _this.swipeTime = 2500;
    _this.swipeBounceTime = 500;
    _this.deceleration = 15e-4;
    _this.flickLimitTime = 200;
    _this.flickLimitDistance = 100;
    _this.resizePolling = 60;
    _this.probeType = 0;
    _this.stopPropagation = false;
    _this.preventDefault = true;
    _this.preventDefaultException = {
      tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/
    };
    _this.tagException = {
      tagName: /^TEXTAREA$/
    };
    _this.HWCompositing = true;
    _this.useTransition = true;
    _this.bindToWrapper = false;
    _this.bindToTarget = false;
    _this.disableMouse = hasTouch;
    _this.disableTouch = !hasTouch;
    _this.autoBlur = true;
    _this.autoEndDistance = 5;
    _this.outOfBoundaryDampingFactor = 1 / 3;
    _this.specifiedIndexAsContent = 0;
    _this.quadrant = 1;
    return _this;
  }
  OptionsConstructor2.prototype.merge = function(options) {
    if (!options)
      return this;
    for (var key in options) {
      if (key === "bounce") {
        this.bounce = this.resolveBounce(options[key]);
        continue;
      }
      this[key] = options[key];
    }
    return this;
  };
  OptionsConstructor2.prototype.process = function() {
    this.translateZ = this.HWCompositing && hasPerspective ? " translateZ(1px)" : "";
    this.useTransition = this.useTransition && hasTransition;
    this.preventDefault = !this.eventPassthrough && this.preventDefault;
    this.scrollX = this.eventPassthrough === "horizontal" ? false : this.scrollX;
    this.scrollY = this.eventPassthrough === "vertical" ? false : this.scrollY;
    this.freeScroll = this.freeScroll && !this.eventPassthrough;
    this.scrollX = this.freeScroll ? true : this.scrollX;
    this.scrollY = this.freeScroll ? true : this.scrollY;
    this.directionLockThreshold = this.eventPassthrough ? 0 : this.directionLockThreshold;
    return this;
  };
  OptionsConstructor2.prototype.resolveBounce = function(bounceOptions) {
    var DEFAULT_BOUNCE = {
      top: true,
      right: true,
      bottom: true,
      left: true
    };
    var NEGATED_BOUNCE = {
      top: false,
      right: false,
      bottom: false,
      left: false
    };
    var ret;
    if (typeof bounceOptions === "object") {
      ret = extend(DEFAULT_BOUNCE, bounceOptions);
    } else {
      ret = bounceOptions ? DEFAULT_BOUNCE : NEGATED_BOUNCE;
    }
    return ret;
  };
  return OptionsConstructor2;
}(CustomOptions);
var ActionsHandler = function() {
  function ActionsHandler2(wrapper, options) {
    this.wrapper = wrapper;
    this.options = options;
    this.hooks = new EventEmitter(["beforeStart", "start", "move", "end", "click"]);
    this.handleDOMEvents();
  }
  ActionsHandler2.prototype.handleDOMEvents = function() {
    var _a2 = this.options, bindToWrapper = _a2.bindToWrapper, disableMouse = _a2.disableMouse, disableTouch = _a2.disableTouch, click2 = _a2.click;
    var wrapper = this.wrapper;
    var target = bindToWrapper ? wrapper : window;
    var wrapperEvents = [];
    var targetEvents = [];
    var shouldRegisterTouch = !disableTouch;
    var shouldRegisterMouse = !disableMouse;
    if (click2) {
      wrapperEvents.push({
        name: "click",
        handler: this.click.bind(this),
        capture: true
      });
    }
    if (shouldRegisterTouch) {
      wrapperEvents.push({
        name: "touchstart",
        handler: this.start.bind(this)
      });
      targetEvents.push({
        name: "touchmove",
        handler: this.move.bind(this)
      }, {
        name: "touchend",
        handler: this.end.bind(this)
      }, {
        name: "touchcancel",
        handler: this.end.bind(this)
      });
    }
    if (shouldRegisterMouse) {
      wrapperEvents.push({
        name: "mousedown",
        handler: this.start.bind(this)
      });
      targetEvents.push({
        name: "mousemove",
        handler: this.move.bind(this)
      }, {
        name: "mouseup",
        handler: this.end.bind(this)
      });
    }
    this.wrapperEventRegister = new EventRegister(wrapper, wrapperEvents);
    this.targetEventRegister = new EventRegister(target, targetEvents);
  };
  ActionsHandler2.prototype.beforeHandler = function(e, type) {
    var _a2 = this.options, preventDefault = _a2.preventDefault, stopPropagation = _a2.stopPropagation, preventDefaultException = _a2.preventDefaultException;
    var preventDefaultConditions = {
      start: function() {
        return preventDefault && !preventDefaultExceptionFn(e.target, preventDefaultException);
      },
      end: function() {
        return preventDefault && !preventDefaultExceptionFn(e.target, preventDefaultException);
      },
      move: function() {
        return preventDefault;
      }
    };
    if (preventDefaultConditions[type]()) {
      e.preventDefault();
    }
    if (stopPropagation) {
      e.stopPropagation();
    }
  };
  ActionsHandler2.prototype.setInitiated = function(type) {
    if (type === void 0) {
      type = 0;
    }
    this.initiated = type;
  };
  ActionsHandler2.prototype.start = function(e) {
    var _eventType = eventTypeMap[e.type];
    if (this.initiated && this.initiated !== _eventType) {
      return;
    }
    this.setInitiated(_eventType);
    if (tagExceptionFn(e.target, this.options.tagException)) {
      this.setInitiated();
      return;
    }
    if (_eventType === 2 && e.button !== 0)
      return;
    if (this.hooks.trigger(this.hooks.eventTypes.beforeStart, e)) {
      return;
    }
    this.beforeHandler(e, "start");
    var point = e.touches ? e.touches[0] : e;
    this.pointX = point.pageX;
    this.pointY = point.pageY;
    this.hooks.trigger(this.hooks.eventTypes.start, e);
  };
  ActionsHandler2.prototype.move = function(e) {
    if (eventTypeMap[e.type] !== this.initiated) {
      return;
    }
    this.beforeHandler(e, "move");
    var point = e.touches ? e.touches[0] : e;
    var deltaX = point.pageX - this.pointX;
    var deltaY = point.pageY - this.pointY;
    this.pointX = point.pageX;
    this.pointY = point.pageY;
    if (this.hooks.trigger(this.hooks.eventTypes.move, {
      deltaX,
      deltaY,
      e
    })) {
      return;
    }
    var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var pX = this.pointX - scrollLeft;
    var pY = this.pointY - scrollTop;
    var autoEndDistance = this.options.autoEndDistance;
    if (pX > document.documentElement.clientWidth - autoEndDistance || pY > document.documentElement.clientHeight - autoEndDistance || pX < autoEndDistance || pY < autoEndDistance) {
      this.end(e);
    }
  };
  ActionsHandler2.prototype.end = function(e) {
    if (eventTypeMap[e.type] !== this.initiated) {
      return;
    }
    this.setInitiated();
    this.beforeHandler(e, "end");
    this.hooks.trigger(this.hooks.eventTypes.end, e);
  };
  ActionsHandler2.prototype.click = function(e) {
    this.hooks.trigger(this.hooks.eventTypes.click, e);
  };
  ActionsHandler2.prototype.setContent = function(content) {
    if (content !== this.wrapper) {
      this.wrapper = content;
      this.rebindDOMEvents();
    }
  };
  ActionsHandler2.prototype.rebindDOMEvents = function() {
    this.wrapperEventRegister.destroy();
    this.targetEventRegister.destroy();
    this.handleDOMEvents();
  };
  ActionsHandler2.prototype.destroy = function() {
    this.wrapperEventRegister.destroy();
    this.targetEventRegister.destroy();
    this.hooks.destroy();
  };
  return ActionsHandler2;
}();
var translaterMetaData = {
  x: ["translateX", "px"],
  y: ["translateY", "px"]
};
var Translater = function() {
  function Translater2(content) {
    this.setContent(content);
    this.hooks = new EventEmitter(["beforeTranslate", "translate"]);
  }
  Translater2.prototype.getComputedPosition = function() {
    var cssStyle = window.getComputedStyle(this.content, null);
    var matrix = cssStyle[style.transform].split(")")[0].split(", ");
    var x = +(matrix[12] || matrix[4]) || 0;
    var y = +(matrix[13] || matrix[5]) || 0;
    return {
      x,
      y
    };
  };
  Translater2.prototype.translate = function(point) {
    var transformStyle = [];
    Object.keys(point).forEach(function(key) {
      if (!translaterMetaData[key]) {
        return;
      }
      var transformFnName = translaterMetaData[key][0];
      if (transformFnName) {
        var transformFnArgUnit = translaterMetaData[key][1];
        var transformFnArg = point[key];
        transformStyle.push(transformFnName + "(" + transformFnArg + transformFnArgUnit + ")");
      }
    });
    this.hooks.trigger(this.hooks.eventTypes.beforeTranslate, transformStyle, point);
    this.style[style.transform] = transformStyle.join(" ");
    this.hooks.trigger(this.hooks.eventTypes.translate, point);
  };
  Translater2.prototype.setContent = function(content) {
    if (this.content !== content) {
      this.content = content;
      this.style = content.style;
    }
  };
  Translater2.prototype.destroy = function() {
    this.hooks.destroy();
  };
  return Translater2;
}();
var Base = function() {
  function Base2(content, translater, options) {
    this.translater = translater;
    this.options = options;
    this.timer = 0;
    this.hooks = new EventEmitter(["move", "end", "beforeForceStop", "forceStop", "callStop", "time", "timeFunction"]);
    this.setContent(content);
  }
  Base2.prototype.translate = function(endPoint) {
    this.translater.translate(endPoint);
  };
  Base2.prototype.setPending = function(pending) {
    this.pending = pending;
  };
  Base2.prototype.setForceStopped = function(forceStopped) {
    this.forceStopped = forceStopped;
  };
  Base2.prototype.setCallStop = function(called) {
    this.callStopWhenPending = called;
  };
  Base2.prototype.setContent = function(content) {
    if (this.content !== content) {
      this.content = content;
      this.style = content.style;
      this.stop();
    }
  };
  Base2.prototype.clearTimer = function() {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
      this.timer = 0;
    }
  };
  Base2.prototype.destroy = function() {
    this.hooks.destroy();
    cancelAnimationFrame(this.timer);
  };
  return Base2;
}();
var isValidPostion = function(startPoint, endPoint, currentPos, prePos) {
  var computeDirection = function(endValue, startValue) {
    var delta = endValue - startValue;
    var direction = delta > 0 ? -1 : delta < 0 ? 1 : 0;
    return direction;
  };
  var directionX = computeDirection(endPoint.x, startPoint.x);
  var directionY = computeDirection(endPoint.y, startPoint.y);
  var deltaX = currentPos.x - prePos.x;
  var deltaY = currentPos.y - prePos.y;
  return directionX * deltaX <= 0 && directionY * deltaY <= 0;
};
var Transition = function(_super) {
  __extends(Transition2, _super);
  function Transition2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Transition2.prototype.startProbe = function(startPoint, endPoint) {
    var _this = this;
    var prePos = startPoint;
    var probe = function() {
      var pos = _this.translater.getComputedPosition();
      if (isValidPostion(startPoint, endPoint, pos, prePos)) {
        _this.hooks.trigger(_this.hooks.eventTypes.move, pos);
      }
      if (!_this.pending) {
        if (_this.callStopWhenPending) {
          _this.callStopWhenPending = false;
        } else {
          _this.hooks.trigger(_this.hooks.eventTypes.end, pos);
        }
      }
      prePos = pos;
      if (_this.pending) {
        _this.timer = requestAnimationFrame$1(probe);
      }
    };
    if (this.callStopWhenPending) {
      this.setCallStop(false);
    }
    cancelAnimationFrame(this.timer);
    probe();
  };
  Transition2.prototype.transitionTime = function(time) {
    if (time === void 0) {
      time = 0;
    }
    this.style[style.transitionDuration] = time + "ms";
    this.hooks.trigger(this.hooks.eventTypes.time, time);
  };
  Transition2.prototype.transitionTimingFunction = function(easing) {
    this.style[style.transitionTimingFunction] = easing;
    this.hooks.trigger(this.hooks.eventTypes.timeFunction, easing);
  };
  Transition2.prototype.transitionProperty = function() {
    this.style[style.transitionProperty] = style.transform;
  };
  Transition2.prototype.move = function(startPoint, endPoint, time, easingFn) {
    this.setPending(time > 0);
    this.transitionTimingFunction(easingFn);
    this.transitionProperty();
    this.transitionTime(time);
    this.translate(endPoint);
    var isRealtimeProbeType = this.options.probeType === 3;
    if (time && isRealtimeProbeType) {
      this.startProbe(startPoint, endPoint);
    }
    if (!time) {
      this._reflow = this.content.offsetHeight;
      if (isRealtimeProbeType) {
        this.hooks.trigger(this.hooks.eventTypes.move, endPoint);
      }
      this.hooks.trigger(this.hooks.eventTypes.end, endPoint);
    }
  };
  Transition2.prototype.doStop = function() {
    var pending = this.pending;
    this.setForceStopped(false);
    this.setCallStop(false);
    if (pending) {
      this.setPending(false);
      cancelAnimationFrame(this.timer);
      var _a2 = this.translater.getComputedPosition(), x = _a2.x, y = _a2.y;
      this.transitionTime();
      this.translate({
        x,
        y
      });
      this.setForceStopped(true);
      this.setCallStop(true);
      this.hooks.trigger(this.hooks.eventTypes.forceStop, {
        x,
        y
      });
    }
    return pending;
  };
  Transition2.prototype.stop = function() {
    var stopFromTransition = this.doStop();
    if (stopFromTransition) {
      this.hooks.trigger(this.hooks.eventTypes.callStop);
    }
  };
  return Transition2;
}(Base);
var Animation = function(_super) {
  __extends(Animation2, _super);
  function Animation2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Animation2.prototype.move = function(startPoint, endPoint, time, easingFn) {
    if (!time) {
      this.translate(endPoint);
      if (this.options.probeType === 3) {
        this.hooks.trigger(this.hooks.eventTypes.move, endPoint);
      }
      this.hooks.trigger(this.hooks.eventTypes.end, endPoint);
      return;
    }
    this.animate(startPoint, endPoint, time, easingFn);
  };
  Animation2.prototype.animate = function(startPoint, endPoint, duration, easingFn) {
    var _this = this;
    var startTime = getNow();
    var destTime = startTime + duration;
    var isRealtimeProbeType = this.options.probeType === 3;
    var step = function() {
      var now = getNow();
      if (now >= destTime) {
        _this.translate(endPoint);
        if (isRealtimeProbeType) {
          _this.hooks.trigger(_this.hooks.eventTypes.move, endPoint);
        }
        _this.hooks.trigger(_this.hooks.eventTypes.end, endPoint);
        return;
      }
      now = (now - startTime) / duration;
      var easing = easingFn(now);
      var newPoint = {};
      Object.keys(endPoint).forEach(function(key) {
        var startValue = startPoint[key];
        var endValue = endPoint[key];
        newPoint[key] = (endValue - startValue) * easing + startValue;
      });
      _this.translate(newPoint);
      if (isRealtimeProbeType) {
        _this.hooks.trigger(_this.hooks.eventTypes.move, newPoint);
      }
      if (_this.pending) {
        _this.timer = requestAnimationFrame$1(step);
      }
      if (!_this.pending) {
        if (_this.callStopWhenPending) {
          _this.callStopWhenPending = false;
        } else {
          _this.hooks.trigger(_this.hooks.eventTypes.end, endPoint);
        }
      }
    };
    this.setPending(true);
    if (this.callStopWhenPending) {
      this.setCallStop(false);
    }
    cancelAnimationFrame(this.timer);
    step();
  };
  Animation2.prototype.doStop = function() {
    var pending = this.pending;
    this.setForceStopped(false);
    this.setCallStop(false);
    if (pending) {
      this.setPending(false);
      cancelAnimationFrame(this.timer);
      var pos = this.translater.getComputedPosition();
      this.setForceStopped(true);
      this.setCallStop(true);
      this.hooks.trigger(this.hooks.eventTypes.forceStop, pos);
    }
    return pending;
  };
  Animation2.prototype.stop = function() {
    var stopFromAnimation = this.doStop();
    if (stopFromAnimation) {
      this.hooks.trigger(this.hooks.eventTypes.callStop);
    }
  };
  return Animation2;
}(Base);
function createAnimater(element, translater, options) {
  var useTransition = options.useTransition;
  var animaterOptions = {};
  Object.defineProperty(animaterOptions, "probeType", {
    enumerable: true,
    configurable: false,
    get: function() {
      return options.probeType;
    }
  });
  if (useTransition) {
    return new Transition(element, translater, animaterOptions);
  } else {
    return new Animation(element, translater, animaterOptions);
  }
}
var Behavior = function() {
  function Behavior2(wrapper, content, options) {
    this.wrapper = wrapper;
    this.options = options;
    this.hooks = new EventEmitter(["beforeComputeBoundary", "computeBoundary", "momentum", "end", "ignoreHasScroll"]);
    this.refresh(content);
  }
  Behavior2.prototype.start = function() {
    this.dist = 0;
    this.setMovingDirection(0);
    this.setDirection(0);
  };
  Behavior2.prototype.move = function(delta) {
    delta = this.hasScroll ? delta : 0;
    this.setMovingDirection(delta);
    return this.performDampingAlgorithm(delta, this.options.outOfBoundaryDampingFactor);
  };
  Behavior2.prototype.setMovingDirection = function(delta) {
    this.movingDirection = delta > 0 ? -1 : delta < 0 ? 1 : 0;
  };
  Behavior2.prototype.setDirection = function(delta) {
    this.direction = delta > 0 ? -1 : delta < 0 ? 1 : 0;
  };
  Behavior2.prototype.performDampingAlgorithm = function(delta, dampingFactor) {
    var newPos = this.currentPos + delta;
    if (newPos > this.minScrollPos || newPos < this.maxScrollPos) {
      if (newPos > this.minScrollPos && this.options.bounces[0] || newPos < this.maxScrollPos && this.options.bounces[1]) {
        newPos = this.currentPos + delta * dampingFactor;
      } else {
        newPos = newPos > this.minScrollPos ? this.minScrollPos : this.maxScrollPos;
      }
    }
    return newPos;
  };
  Behavior2.prototype.end = function(duration) {
    var momentumInfo = {
      duration: 0
    };
    var absDist = Math.abs(this.currentPos - this.startPos);
    if (this.options.momentum && duration < this.options.momentumLimitTime && absDist > this.options.momentumLimitDistance) {
      var wrapperSize = this.direction === -1 && this.options.bounces[0] || this.direction === 1 && this.options.bounces[1] ? this.wrapperSize : 0;
      momentumInfo = this.hasScroll ? this.momentum(this.currentPos, this.startPos, duration, this.maxScrollPos, this.minScrollPos, wrapperSize, this.options) : {
        destination: this.currentPos,
        duration: 0
      };
    } else {
      this.hooks.trigger(this.hooks.eventTypes.end, momentumInfo);
    }
    return momentumInfo;
  };
  Behavior2.prototype.momentum = function(current, start, time, lowerMargin, upperMargin, wrapperSize, options) {
    if (options === void 0) {
      options = this.options;
    }
    var distance = current - start;
    var speed = Math.abs(distance) / time;
    var deceleration = options.deceleration, swipeBounceTime = options.swipeBounceTime, swipeTime = options.swipeTime;
    var duration = Math.min(swipeTime, speed * 2 / deceleration);
    var momentumData = {
      destination: current + speed * speed / deceleration * (distance < 0 ? -1 : 1),
      duration,
      rate: 15
    };
    this.hooks.trigger(this.hooks.eventTypes.momentum, momentumData, distance);
    if (momentumData.destination < lowerMargin) {
      momentumData.destination = wrapperSize ? Math.max(lowerMargin - wrapperSize / 4, lowerMargin - wrapperSize / momentumData.rate * speed) : lowerMargin;
      momentumData.duration = swipeBounceTime;
    } else if (momentumData.destination > upperMargin) {
      momentumData.destination = wrapperSize ? Math.min(upperMargin + wrapperSize / 4, upperMargin + wrapperSize / momentumData.rate * speed) : upperMargin;
      momentumData.duration = swipeBounceTime;
    }
    momentumData.destination = Math.round(momentumData.destination);
    return momentumData;
  };
  Behavior2.prototype.updateDirection = function() {
    var absDist = this.currentPos - this.absStartPos;
    this.setDirection(absDist);
  };
  Behavior2.prototype.refresh = function(content) {
    var _a2 = this.options.rect, size2 = _a2.size, position = _a2.position;
    var isWrapperStatic = window.getComputedStyle(this.wrapper, null).position === "static";
    var wrapperRect = getRect(this.wrapper);
    this.wrapperSize = this.wrapper[size2 === "width" ? "clientWidth" : "clientHeight"];
    this.setContent(content);
    var contentRect = getRect(this.content);
    this.contentSize = contentRect[size2];
    this.relativeOffset = contentRect[position];
    if (isWrapperStatic) {
      this.relativeOffset -= wrapperRect[position];
    }
    this.computeBoundary();
    this.setDirection(0);
  };
  Behavior2.prototype.setContent = function(content) {
    if (content !== this.content) {
      this.content = content;
      this.resetState();
    }
  };
  Behavior2.prototype.resetState = function() {
    this.currentPos = 0;
    this.startPos = 0;
    this.dist = 0;
    this.setDirection(0);
    this.setMovingDirection(0);
    this.resetStartPos();
  };
  Behavior2.prototype.computeBoundary = function() {
    this.hooks.trigger(this.hooks.eventTypes.beforeComputeBoundary);
    var boundary = {
      minScrollPos: 0,
      maxScrollPos: this.wrapperSize - this.contentSize
    };
    if (boundary.maxScrollPos < 0) {
      boundary.maxScrollPos -= this.relativeOffset;
      if (this.options.specifiedIndexAsContent === 0) {
        boundary.minScrollPos = -this.relativeOffset;
      }
    }
    this.hooks.trigger(this.hooks.eventTypes.computeBoundary, boundary);
    this.minScrollPos = boundary.minScrollPos;
    this.maxScrollPos = boundary.maxScrollPos;
    this.hasScroll = this.options.scrollable && this.maxScrollPos < this.minScrollPos;
    if (!this.hasScroll && this.minScrollPos < this.maxScrollPos) {
      this.maxScrollPos = this.minScrollPos;
      this.contentSize = this.wrapperSize;
    }
  };
  Behavior2.prototype.updatePosition = function(pos) {
    this.currentPos = pos;
  };
  Behavior2.prototype.getCurrentPos = function() {
    return this.currentPos;
  };
  Behavior2.prototype.checkInBoundary = function() {
    var position = this.adjustPosition(this.currentPos);
    var inBoundary = position === this.getCurrentPos();
    return {
      position,
      inBoundary
    };
  };
  Behavior2.prototype.adjustPosition = function(pos) {
    if (!this.hasScroll && !this.hooks.trigger(this.hooks.eventTypes.ignoreHasScroll)) {
      pos = this.minScrollPos;
    } else if (pos > this.minScrollPos) {
      pos = this.minScrollPos;
    } else if (pos < this.maxScrollPos) {
      pos = this.maxScrollPos;
    }
    return pos;
  };
  Behavior2.prototype.updateStartPos = function() {
    this.startPos = this.currentPos;
  };
  Behavior2.prototype.updateAbsStartPos = function() {
    this.absStartPos = this.currentPos;
  };
  Behavior2.prototype.resetStartPos = function() {
    this.updateStartPos();
    this.updateAbsStartPos();
  };
  Behavior2.prototype.getAbsDist = function(delta) {
    this.dist += delta;
    return Math.abs(this.dist);
  };
  Behavior2.prototype.destroy = function() {
    this.hooks.destroy();
  };
  return Behavior2;
}();
var _a, _b, _c, _d;
var PassthroughHandlers = (_a = {}, _a["yes"] = function(e) {
  return true;
}, _a["no"] = function(e) {
  e.preventDefault();
  return false;
}, _a);
var DirectionMap = (_b = {}, _b["horizontal"] = (_c = {}, _c["yes"] = "horizontal", _c["no"] = "vertical", _c), _b["vertical"] = (_d = {}, _d["yes"] = "vertical", _d["no"] = "horizontal", _d), _b);
var DirectionLockAction = function() {
  function DirectionLockAction2(directionLockThreshold, freeScroll, eventPassthrough) {
    this.directionLockThreshold = directionLockThreshold;
    this.freeScroll = freeScroll;
    this.eventPassthrough = eventPassthrough;
    this.reset();
  }
  DirectionLockAction2.prototype.reset = function() {
    this.directionLocked = "";
  };
  DirectionLockAction2.prototype.checkMovingDirection = function(absDistX, absDistY, e) {
    this.computeDirectionLock(absDistX, absDistY);
    return this.handleEventPassthrough(e);
  };
  DirectionLockAction2.prototype.adjustDelta = function(deltaX, deltaY) {
    if (this.directionLocked === "horizontal") {
      deltaY = 0;
    } else if (this.directionLocked === "vertical") {
      deltaX = 0;
    }
    return {
      deltaX,
      deltaY
    };
  };
  DirectionLockAction2.prototype.computeDirectionLock = function(absDistX, absDistY) {
    if (this.directionLocked === "" && !this.freeScroll) {
      if (absDistX > absDistY + this.directionLockThreshold) {
        this.directionLocked = "horizontal";
      } else if (absDistY >= absDistX + this.directionLockThreshold) {
        this.directionLocked = "vertical";
      } else {
        this.directionLocked = "none";
      }
    }
  };
  DirectionLockAction2.prototype.handleEventPassthrough = function(e) {
    var handleMap = DirectionMap[this.directionLocked];
    if (handleMap) {
      if (this.eventPassthrough === handleMap["yes"]) {
        return PassthroughHandlers["yes"](e);
      } else if (this.eventPassthrough === handleMap["no"]) {
        return PassthroughHandlers["no"](e);
      }
    }
    return false;
  };
  return DirectionLockAction2;
}();
var applyQuadrantTransformation = function(deltaX, deltaY, quadrant) {
  if (quadrant === 2) {
    return [deltaY, -deltaX];
  } else if (quadrant === 3) {
    return [-deltaX, -deltaY];
  } else if (quadrant === 4) {
    return [-deltaY, deltaX];
  } else {
    return [deltaX, deltaY];
  }
};
var ScrollerActions = function() {
  function ScrollerActions2(scrollBehaviorX, scrollBehaviorY, actionsHandler, animater, options) {
    this.hooks = new EventEmitter(["start", "beforeMove", "scrollStart", "scroll", "beforeEnd", "end", "scrollEnd", "contentNotMoved", "detectMovingDirection", "coordinateTransformation"]);
    this.scrollBehaviorX = scrollBehaviorX;
    this.scrollBehaviorY = scrollBehaviorY;
    this.actionsHandler = actionsHandler;
    this.animater = animater;
    this.options = options;
    this.directionLockAction = new DirectionLockAction(options.directionLockThreshold, options.freeScroll, options.eventPassthrough);
    this.enabled = true;
    this.bindActionsHandler();
  }
  ScrollerActions2.prototype.bindActionsHandler = function() {
    var _this = this;
    this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.start, function(e) {
      if (!_this.enabled)
        return true;
      return _this.handleStart(e);
    });
    this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.move, function(_a2) {
      var deltaX = _a2.deltaX, deltaY = _a2.deltaY, e = _a2.e;
      if (!_this.enabled)
        return true;
      var _b2 = applyQuadrantTransformation(deltaX, deltaY, _this.options.quadrant), transformateDeltaX = _b2[0], transformateDeltaY = _b2[1];
      var transformateDeltaData = {
        deltaX: transformateDeltaX,
        deltaY: transformateDeltaY
      };
      _this.hooks.trigger(_this.hooks.eventTypes.coordinateTransformation, transformateDeltaData);
      return _this.handleMove(transformateDeltaData.deltaX, transformateDeltaData.deltaY, e);
    });
    this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.end, function(e) {
      if (!_this.enabled)
        return true;
      return _this.handleEnd(e);
    });
    this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.click, function(e) {
      if (_this.enabled && !e._constructed) {
        _this.handleClick(e);
      }
    });
  };
  ScrollerActions2.prototype.handleStart = function(e) {
    var timestamp = getNow();
    this.fingerMoved = false;
    this.contentMoved = false;
    this.startTime = timestamp;
    this.directionLockAction.reset();
    this.scrollBehaviorX.start();
    this.scrollBehaviorY.start();
    this.animater.doStop();
    this.scrollBehaviorX.resetStartPos();
    this.scrollBehaviorY.resetStartPos();
    this.hooks.trigger(this.hooks.eventTypes.start, e);
  };
  ScrollerActions2.prototype.handleMove = function(deltaX, deltaY, e) {
    if (this.hooks.trigger(this.hooks.eventTypes.beforeMove, e)) {
      return;
    }
    var absDistX = this.scrollBehaviorX.getAbsDist(deltaX);
    var absDistY = this.scrollBehaviorY.getAbsDist(deltaY);
    var timestamp = getNow();
    if (this.checkMomentum(absDistX, absDistY, timestamp)) {
      return true;
    }
    if (this.directionLockAction.checkMovingDirection(absDistX, absDistY, e)) {
      this.actionsHandler.setInitiated();
      return true;
    }
    var delta = this.directionLockAction.adjustDelta(deltaX, deltaY);
    var prevX = this.scrollBehaviorX.getCurrentPos();
    var newX = this.scrollBehaviorX.move(delta.deltaX);
    var prevY = this.scrollBehaviorY.getCurrentPos();
    var newY = this.scrollBehaviorY.move(delta.deltaY);
    if (this.hooks.trigger(this.hooks.eventTypes.detectMovingDirection)) {
      return;
    }
    if (!this.fingerMoved) {
      this.fingerMoved = true;
    }
    var positionChanged = newX !== prevX || newY !== prevY;
    if (!this.contentMoved && !positionChanged) {
      this.hooks.trigger(this.hooks.eventTypes.contentNotMoved);
    }
    if (!this.contentMoved && positionChanged) {
      this.contentMoved = true;
      this.hooks.trigger(this.hooks.eventTypes.scrollStart);
    }
    if (this.contentMoved && positionChanged) {
      this.animater.translate({
        x: newX,
        y: newY
      });
      this.dispatchScroll(timestamp);
    }
  };
  ScrollerActions2.prototype.dispatchScroll = function(timestamp) {
    if (timestamp - this.startTime > this.options.momentumLimitTime) {
      this.startTime = timestamp;
      this.scrollBehaviorX.updateStartPos();
      this.scrollBehaviorY.updateStartPos();
      if (this.options.probeType === 1) {
        this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
      }
    }
    if (this.options.probeType > 1) {
      this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
    }
  };
  ScrollerActions2.prototype.checkMomentum = function(absDistX, absDistY, timestamp) {
    return timestamp - this.endTime > this.options.momentumLimitTime && absDistY < this.options.momentumLimitDistance && absDistX < this.options.momentumLimitDistance;
  };
  ScrollerActions2.prototype.handleEnd = function(e) {
    if (this.hooks.trigger(this.hooks.eventTypes.beforeEnd, e)) {
      return;
    }
    var currentPos = this.getCurrentPos();
    this.scrollBehaviorX.updateDirection();
    this.scrollBehaviorY.updateDirection();
    if (this.hooks.trigger(this.hooks.eventTypes.end, e, currentPos)) {
      return true;
    }
    currentPos = this.ensureIntegerPos(currentPos);
    this.animater.translate(currentPos);
    this.endTime = getNow();
    var duration = this.endTime - this.startTime;
    this.hooks.trigger(this.hooks.eventTypes.scrollEnd, currentPos, duration);
  };
  ScrollerActions2.prototype.ensureIntegerPos = function(currentPos) {
    this.ensuringInteger = true;
    var x = currentPos.x, y = currentPos.y;
    var _a2 = this.scrollBehaviorX, minScrollPosX = _a2.minScrollPos, maxScrollPosX = _a2.maxScrollPos;
    var _b2 = this.scrollBehaviorY, minScrollPosY = _b2.minScrollPos, maxScrollPosY = _b2.maxScrollPos;
    x = x > 0 ? Math.ceil(x) : Math.floor(x);
    y = y > 0 ? Math.ceil(y) : Math.floor(y);
    x = between(x, maxScrollPosX, minScrollPosX);
    y = between(y, maxScrollPosY, minScrollPosY);
    return {
      x,
      y
    };
  };
  ScrollerActions2.prototype.handleClick = function(e) {
    if (!preventDefaultExceptionFn(e.target, this.options.preventDefaultException)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  ScrollerActions2.prototype.getCurrentPos = function() {
    return {
      x: this.scrollBehaviorX.getCurrentPos(),
      y: this.scrollBehaviorY.getCurrentPos()
    };
  };
  ScrollerActions2.prototype.refresh = function() {
    this.endTime = 0;
  };
  ScrollerActions2.prototype.destroy = function() {
    this.hooks.destroy();
  };
  return ScrollerActions2;
}();
function createActionsHandlerOptions(bsOptions) {
  var options = ["click", "bindToWrapper", "disableMouse", "disableTouch", "preventDefault", "stopPropagation", "tagException", "preventDefaultException", "autoEndDistance"].reduce(function(prev, cur) {
    prev[cur] = bsOptions[cur];
    return prev;
  }, {});
  return options;
}
function createBehaviorOptions(bsOptions, extraProp, bounces, rect) {
  var options = ["momentum", "momentumLimitTime", "momentumLimitDistance", "deceleration", "swipeBounceTime", "swipeTime", "outOfBoundaryDampingFactor", "specifiedIndexAsContent"].reduce(function(prev, cur) {
    prev[cur] = bsOptions[cur];
    return prev;
  }, {});
  options.scrollable = !!bsOptions[extraProp];
  options.bounces = bounces;
  options.rect = rect;
  return options;
}
function bubbling(source, target, events) {
  events.forEach(function(event) {
    var sourceEvent;
    var targetEvent;
    if (typeof event === "string") {
      sourceEvent = targetEvent = event;
    } else {
      sourceEvent = event.source;
      targetEvent = event.target;
    }
    source.on(sourceEvent, function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return target.trigger.apply(target, __spreadArrays([targetEvent], args));
    });
  });
}
function isSamePoint(startPoint, endPoint) {
  var keys = Object.keys(startPoint);
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    if (startPoint[key] !== endPoint[key])
      return false;
  }
  return true;
}
var MIN_SCROLL_DISTANCE = 1;
var Scroller = function() {
  function Scroller2(wrapper, content, options) {
    this.wrapper = wrapper;
    this.content = content;
    this.resizeTimeout = 0;
    this.hooks = new EventEmitter(["beforeStart", "beforeMove", "beforeScrollStart", "scrollStart", "scroll", "beforeEnd", "scrollEnd", "resize", "touchEnd", "end", "flick", "scrollCancel", "momentum", "scrollTo", "minDistanceScroll", "scrollToElement", "beforeRefresh"]);
    this.options = options;
    var _a2 = this.options.bounce, left = _a2.left, right = _a2.right, top = _a2.top, bottom = _a2.bottom;
    this.scrollBehaviorX = new Behavior(wrapper, content, createBehaviorOptions(options, "scrollX", [left, right], {
      size: "width",
      position: "left"
    }));
    this.scrollBehaviorY = new Behavior(wrapper, content, createBehaviorOptions(options, "scrollY", [top, bottom], {
      size: "height",
      position: "top"
    }));
    this.translater = new Translater(this.content);
    this.animater = createAnimater(this.content, this.translater, this.options);
    this.actionsHandler = new ActionsHandler(this.options.bindToTarget ? this.content : wrapper, createActionsHandlerOptions(this.options));
    this.actions = new ScrollerActions(this.scrollBehaviorX, this.scrollBehaviorY, this.actionsHandler, this.animater, this.options);
    var resizeHandler = this.resize.bind(this);
    this.resizeRegister = new EventRegister(window, [{
      name: "orientationchange",
      handler: resizeHandler
    }, {
      name: "resize",
      handler: resizeHandler
    }]);
    this.registerTransitionEnd();
    this.init();
  }
  Scroller2.prototype.init = function() {
    var _this = this;
    this.bindTranslater();
    this.bindAnimater();
    this.bindActions();
    this.hooks.on(this.hooks.eventTypes.scrollEnd, function() {
      _this.togglePointerEvents(true);
    });
  };
  Scroller2.prototype.registerTransitionEnd = function() {
    this.transitionEndRegister = new EventRegister(this.content, [{
      name: style.transitionEnd,
      handler: this.transitionEnd.bind(this)
    }]);
  };
  Scroller2.prototype.bindTranslater = function() {
    var _this = this;
    var hooks = this.translater.hooks;
    hooks.on(hooks.eventTypes.beforeTranslate, function(transformStyle) {
      if (_this.options.translateZ) {
        transformStyle.push(_this.options.translateZ);
      }
    });
    hooks.on(hooks.eventTypes.translate, function(pos) {
      var prevPos = _this.getCurrentPos();
      _this.updatePositions(pos);
      if (_this.actions.ensuringInteger === true) {
        _this.actions.ensuringInteger = false;
        return;
      }
      if (pos.x !== prevPos.x || pos.y !== prevPos.y) {
        _this.togglePointerEvents(false);
      }
    });
  };
  Scroller2.prototype.bindAnimater = function() {
    var _this = this;
    this.animater.hooks.on(this.animater.hooks.eventTypes.end, function(pos) {
      if (!_this.resetPosition(_this.options.bounceTime)) {
        _this.animater.setPending(false);
        _this.hooks.trigger(_this.hooks.eventTypes.scrollEnd, pos);
      }
    });
    bubbling(this.animater.hooks, this.hooks, [{
      source: this.animater.hooks.eventTypes.move,
      target: this.hooks.eventTypes.scroll
    }, {
      source: this.animater.hooks.eventTypes.forceStop,
      target: this.hooks.eventTypes.scrollEnd
    }]);
  };
  Scroller2.prototype.bindActions = function() {
    var _this = this;
    var actions = this.actions;
    bubbling(actions.hooks, this.hooks, [{
      source: actions.hooks.eventTypes.start,
      target: this.hooks.eventTypes.beforeStart
    }, {
      source: actions.hooks.eventTypes.start,
      target: this.hooks.eventTypes.beforeScrollStart
    }, {
      source: actions.hooks.eventTypes.beforeMove,
      target: this.hooks.eventTypes.beforeMove
    }, {
      source: actions.hooks.eventTypes.scrollStart,
      target: this.hooks.eventTypes.scrollStart
    }, {
      source: actions.hooks.eventTypes.scroll,
      target: this.hooks.eventTypes.scroll
    }, {
      source: actions.hooks.eventTypes.beforeEnd,
      target: this.hooks.eventTypes.beforeEnd
    }]);
    actions.hooks.on(actions.hooks.eventTypes.end, function(e, pos) {
      _this.hooks.trigger(_this.hooks.eventTypes.touchEnd, pos);
      if (_this.hooks.trigger(_this.hooks.eventTypes.end, pos)) {
        return true;
      }
      if (!actions.fingerMoved) {
        _this.hooks.trigger(_this.hooks.eventTypes.scrollCancel);
        if (_this.checkClick(e)) {
          return true;
        }
      }
      if (_this.resetPosition(_this.options.bounceTime, ease.bounce)) {
        _this.animater.setForceStopped(false);
        return true;
      }
    });
    actions.hooks.on(actions.hooks.eventTypes.scrollEnd, function(pos, duration) {
      var deltaX = Math.abs(pos.x - _this.scrollBehaviorX.startPos);
      var deltaY = Math.abs(pos.y - _this.scrollBehaviorY.startPos);
      if (_this.checkFlick(duration, deltaX, deltaY)) {
        _this.animater.setForceStopped(false);
        _this.hooks.trigger(_this.hooks.eventTypes.flick);
        return;
      }
      if (_this.momentum(pos, duration)) {
        _this.animater.setForceStopped(false);
        return;
      }
      if (actions.contentMoved) {
        _this.hooks.trigger(_this.hooks.eventTypes.scrollEnd, pos);
      }
      if (_this.animater.forceStopped) {
        _this.animater.setForceStopped(false);
      }
    });
  };
  Scroller2.prototype.checkFlick = function(duration, deltaX, deltaY) {
    var flickMinMovingDistance = 1;
    if (this.hooks.events.flick.length > 1 && duration < this.options.flickLimitTime && deltaX < this.options.flickLimitDistance && deltaY < this.options.flickLimitDistance && (deltaY > flickMinMovingDistance || deltaX > flickMinMovingDistance)) {
      return true;
    }
  };
  Scroller2.prototype.momentum = function(pos, duration) {
    var meta = {
      time: 0,
      easing: ease.swiper,
      newX: pos.x,
      newY: pos.y
    };
    var momentumX = this.scrollBehaviorX.end(duration);
    var momentumY = this.scrollBehaviorY.end(duration);
    meta.newX = isUndef(momentumX.destination) ? meta.newX : momentumX.destination;
    meta.newY = isUndef(momentumY.destination) ? meta.newY : momentumY.destination;
    meta.time = Math.max(momentumX.duration, momentumY.duration);
    this.hooks.trigger(this.hooks.eventTypes.momentum, meta, this);
    if (meta.newX !== pos.x || meta.newY !== pos.y) {
      if (meta.newX > this.scrollBehaviorX.minScrollPos || meta.newX < this.scrollBehaviorX.maxScrollPos || meta.newY > this.scrollBehaviorY.minScrollPos || meta.newY < this.scrollBehaviorY.maxScrollPos) {
        meta.easing = ease.swipeBounce;
      }
      this.scrollTo(meta.newX, meta.newY, meta.time, meta.easing);
      return true;
    }
  };
  Scroller2.prototype.checkClick = function(e) {
    var cancelable = {
      preventClick: this.animater.forceStopped
    };
    if (this.hooks.trigger(this.hooks.eventTypes.checkClick)) {
      this.animater.setForceStopped(false);
      return true;
    }
    if (!cancelable.preventClick) {
      var _dblclick = this.options.dblclick;
      var dblclickTrigged = false;
      if (_dblclick && this.lastClickTime) {
        var _a2 = _dblclick.delay, delay = _a2 === void 0 ? 300 : _a2;
        if (getNow() - this.lastClickTime < delay) {
          dblclickTrigged = true;
          dblclick(e);
        }
      }
      if (this.options.tap) {
        tap(e, this.options.tap);
      }
      if (this.options.click && !preventDefaultExceptionFn(e.target, this.options.preventDefaultException)) {
        click(e);
      }
      this.lastClickTime = dblclickTrigged ? null : getNow();
      return true;
    }
    return false;
  };
  Scroller2.prototype.resize = function() {
    var _this = this;
    if (!this.actions.enabled) {
      return;
    }
    if (isAndroid) {
      this.wrapper.scrollTop = 0;
    }
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = window.setTimeout(function() {
      _this.hooks.trigger(_this.hooks.eventTypes.resize);
    }, this.options.resizePolling);
  };
  Scroller2.prototype.transitionEnd = function(e) {
    if (e.target !== this.content || !this.animater.pending) {
      return;
    }
    var animater = this.animater;
    animater.transitionTime();
    if (!this.resetPosition(this.options.bounceTime, ease.bounce)) {
      this.animater.setPending(false);
      if (this.options.probeType !== 3) {
        this.hooks.trigger(this.hooks.eventTypes.scrollEnd, this.getCurrentPos());
      }
    }
  };
  Scroller2.prototype.togglePointerEvents = function(enabled) {
    if (enabled === void 0) {
      enabled = true;
    }
    var el = this.content.children.length ? this.content.children : [this.content];
    var pointerEvents = enabled ? "auto" : "none";
    for (var i = 0; i < el.length; i++) {
      var node = el[i];
      if (node.isBScrollContainer) {
        continue;
      }
      node.style.pointerEvents = pointerEvents;
    }
  };
  Scroller2.prototype.refresh = function(content) {
    var contentChanged = this.setContent(content);
    this.hooks.trigger(this.hooks.eventTypes.beforeRefresh);
    this.scrollBehaviorX.refresh(content);
    this.scrollBehaviorY.refresh(content);
    if (contentChanged) {
      this.translater.setContent(content);
      this.animater.setContent(content);
      this.transitionEndRegister.destroy();
      this.registerTransitionEnd();
      if (this.options.bindToTarget) {
        this.actionsHandler.setContent(content);
      }
    }
    this.actions.refresh();
    this.wrapperOffset = offset(this.wrapper);
  };
  Scroller2.prototype.setContent = function(content) {
    var contentChanged = content !== this.content;
    if (contentChanged) {
      this.content = content;
    }
    return contentChanged;
  };
  Scroller2.prototype.scrollBy = function(deltaX, deltaY, time, easing) {
    if (time === void 0) {
      time = 0;
    }
    var _a2 = this.getCurrentPos(), x = _a2.x, y = _a2.y;
    easing = !easing ? ease.bounce : easing;
    deltaX += x;
    deltaY += y;
    this.scrollTo(deltaX, deltaY, time, easing);
  };
  Scroller2.prototype.scrollTo = function(x, y, time, easing, extraTransform) {
    if (time === void 0) {
      time = 0;
    }
    if (easing === void 0) {
      easing = ease.bounce;
    }
    if (extraTransform === void 0) {
      extraTransform = {
        start: {},
        end: {}
      };
    }
    var easingFn = this.options.useTransition ? easing.style : easing.fn;
    var currentPos = this.getCurrentPos();
    var startPoint = __assign({
      x: currentPos.x,
      y: currentPos.y
    }, extraTransform.start);
    var endPoint = __assign({
      x,
      y
    }, extraTransform.end);
    this.hooks.trigger(this.hooks.eventTypes.scrollTo, endPoint);
    if (isSamePoint(startPoint, endPoint))
      return;
    var deltaX = Math.abs(endPoint.x - startPoint.x);
    var deltaY = Math.abs(endPoint.y - startPoint.y);
    if (deltaX < MIN_SCROLL_DISTANCE && deltaY < MIN_SCROLL_DISTANCE) {
      time = 0;
      this.hooks.trigger(this.hooks.eventTypes.minDistanceScroll);
    }
    this.animater.move(startPoint, endPoint, time, easingFn);
  };
  Scroller2.prototype.scrollToElement = function(el, time, offsetX, offsetY, easing) {
    var targetEle = getElement(el);
    var pos = offset(targetEle);
    var getOffset = function(offset2, size2, wrapperSize) {
      if (typeof offset2 === "number") {
        return offset2;
      }
      return offset2 ? Math.round(size2 / 2 - wrapperSize / 2) : 0;
    };
    offsetX = getOffset(offsetX, targetEle.offsetWidth, this.wrapper.offsetWidth);
    offsetY = getOffset(offsetY, targetEle.offsetHeight, this.wrapper.offsetHeight);
    var getPos = function(pos2, wrapperPos, offset2, scrollBehavior) {
      pos2 -= wrapperPos;
      pos2 = scrollBehavior.adjustPosition(pos2 - offset2);
      return pos2;
    };
    pos.left = getPos(pos.left, this.wrapperOffset.left, offsetX, this.scrollBehaviorX);
    pos.top = getPos(pos.top, this.wrapperOffset.top, offsetY, this.scrollBehaviorY);
    if (this.hooks.trigger(this.hooks.eventTypes.scrollToElement, targetEle, pos)) {
      return;
    }
    this.scrollTo(pos.left, pos.top, time, easing);
  };
  Scroller2.prototype.resetPosition = function(time, easing) {
    if (time === void 0) {
      time = 0;
    }
    if (easing === void 0) {
      easing = ease.bounce;
    }
    var _a2 = this.scrollBehaviorX.checkInBoundary(), x = _a2.position, xInBoundary = _a2.inBoundary;
    var _b2 = this.scrollBehaviorY.checkInBoundary(), y = _b2.position, yInBoundary = _b2.inBoundary;
    if (xInBoundary && yInBoundary) {
      return false;
    }
    if (isIOSBadVersion) {
      this.reflow();
    }
    this.scrollTo(x, y, time, easing);
    return true;
  };
  Scroller2.prototype.reflow = function() {
    this._reflow = this.content.offsetHeight;
  };
  Scroller2.prototype.updatePositions = function(pos) {
    this.scrollBehaviorX.updatePosition(pos.x);
    this.scrollBehaviorY.updatePosition(pos.y);
  };
  Scroller2.prototype.getCurrentPos = function() {
    return this.actions.getCurrentPos();
  };
  Scroller2.prototype.enable = function() {
    this.actions.enabled = true;
  };
  Scroller2.prototype.disable = function() {
    cancelAnimationFrame(this.animater.timer);
    this.actions.enabled = false;
  };
  Scroller2.prototype.destroy = function() {
    var _this = this;
    var keys = ["resizeRegister", "transitionEndRegister", "actionsHandler", "actions", "hooks", "animater", "translater", "scrollBehaviorX", "scrollBehaviorY"];
    keys.forEach(function(key) {
      return _this[key].destroy();
    });
  };
  return Scroller2;
}();
var BScrollConstructor = function(_super) {
  __extends(BScrollConstructor2, _super);
  function BScrollConstructor2(el, options) {
    var _this = _super.call(this, ["refresh", "contentChanged", "enable", "disable", "beforeScrollStart", "scrollStart", "scroll", "scrollEnd", "scrollCancel", "touchEnd", "flick", "destroy"]) || this;
    var wrapper = getElement(el);
    if (!wrapper) {
      warn("Can not resolve the wrapper DOM.");
      return _this;
    }
    _this.plugins = {};
    _this.options = new OptionsConstructor().merge(options).process();
    if (!_this.setContent(wrapper).valid) {
      return _this;
    }
    _this.hooks = new EventEmitter(["refresh", "enable", "disable", "destroy", "beforeInitialScrollTo", "contentChanged"]);
    _this.init(wrapper);
    return _this;
  }
  BScrollConstructor2.use = function(ctor) {
    var name = ctor.pluginName;
    var installed = BScrollConstructor2.plugins.some(function(plugin) {
      return ctor === plugin.ctor;
    });
    if (installed)
      return BScrollConstructor2;
    if (isUndef(name)) {
      warn("Plugin Class must specify plugin's name in static property by 'pluginName' field.");
      return BScrollConstructor2;
    }
    BScrollConstructor2.pluginsMap[name] = true;
    BScrollConstructor2.plugins.push({
      name,
      applyOrder: ctor.applyOrder,
      ctor
    });
    return BScrollConstructor2;
  };
  BScrollConstructor2.prototype.setContent = function(wrapper) {
    var contentChanged = false;
    var valid = true;
    var content = wrapper.children[this.options.specifiedIndexAsContent];
    if (!content) {
      warn("The wrapper need at least one child element to be content element to scroll.");
      valid = false;
    } else {
      contentChanged = this.content !== content;
      if (contentChanged) {
        this.content = content;
      }
    }
    return {
      valid,
      contentChanged
    };
  };
  BScrollConstructor2.prototype.init = function(wrapper) {
    var _this = this;
    this.wrapper = wrapper;
    wrapper.isBScrollContainer = true;
    this.scroller = new Scroller(wrapper, this.content, this.options);
    this.scroller.hooks.on(this.scroller.hooks.eventTypes.resize, function() {
      _this.refresh();
    });
    this.eventBubbling();
    this.handleAutoBlur();
    this.enable();
    this.proxy(propertiesConfig$7);
    this.applyPlugins();
    this.refreshWithoutReset(this.content);
    var _a2 = this.options, startX = _a2.startX, startY = _a2.startY;
    var position = {
      x: startX,
      y: startY
    };
    if (this.hooks.trigger(this.hooks.eventTypes.beforeInitialScrollTo, position)) {
      return;
    }
    this.scroller.scrollTo(position.x, position.y);
  };
  BScrollConstructor2.prototype.applyPlugins = function() {
    var _this = this;
    var options = this.options;
    BScrollConstructor2.plugins.sort(function(a, b) {
      var _a2;
      var applyOrderMap = (_a2 = {}, _a2["pre"] = -1, _a2["post"] = 1, _a2);
      var aOrder = a.applyOrder ? applyOrderMap[a.applyOrder] : 0;
      var bOrder = b.applyOrder ? applyOrderMap[b.applyOrder] : 0;
      return aOrder - bOrder;
    }).forEach(function(item) {
      var ctor = item.ctor;
      if (options[item.name] && typeof ctor === "function") {
        _this.plugins[item.name] = new ctor(_this);
      }
    });
  };
  BScrollConstructor2.prototype.handleAutoBlur = function() {
    if (this.options.autoBlur) {
      this.on(this.eventTypes.beforeScrollStart, function() {
        var activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
          activeElement.blur();
        }
      });
    }
  };
  BScrollConstructor2.prototype.eventBubbling = function() {
    bubbling(this.scroller.hooks, this, [this.eventTypes.beforeScrollStart, this.eventTypes.scrollStart, this.eventTypes.scroll, this.eventTypes.scrollEnd, this.eventTypes.scrollCancel, this.eventTypes.touchEnd, this.eventTypes.flick]);
  };
  BScrollConstructor2.prototype.refreshWithoutReset = function(content) {
    this.scroller.refresh(content);
    this.hooks.trigger(this.hooks.eventTypes.refresh, content);
    this.trigger(this.eventTypes.refresh, content);
  };
  BScrollConstructor2.prototype.proxy = function(propertiesConfig2) {
    var _this = this;
    propertiesConfig2.forEach(function(_a2) {
      var key = _a2.key, sourceKey = _a2.sourceKey;
      propertiesProxy(_this, sourceKey, key);
    });
  };
  BScrollConstructor2.prototype.refresh = function() {
    var _a2 = this.setContent(this.wrapper), contentChanged = _a2.contentChanged, valid = _a2.valid;
    if (valid) {
      var content = this.content;
      this.refreshWithoutReset(content);
      if (contentChanged) {
        this.hooks.trigger(this.hooks.eventTypes.contentChanged, content);
        this.trigger(this.eventTypes.contentChanged, content);
      }
      this.scroller.resetPosition();
    }
  };
  BScrollConstructor2.prototype.enable = function() {
    this.scroller.enable();
    this.hooks.trigger(this.hooks.eventTypes.enable);
    this.trigger(this.eventTypes.enable);
  };
  BScrollConstructor2.prototype.disable = function() {
    this.scroller.disable();
    this.hooks.trigger(this.hooks.eventTypes.disable);
    this.trigger(this.eventTypes.disable);
  };
  BScrollConstructor2.prototype.destroy = function() {
    this.hooks.trigger(this.hooks.eventTypes.destroy);
    this.trigger(this.eventTypes.destroy);
    this.scroller.destroy();
  };
  BScrollConstructor2.prototype.eventRegister = function(names) {
    this.registerType(names);
  };
  BScrollConstructor2.plugins = [];
  BScrollConstructor2.pluginsMap = {};
  return BScrollConstructor2;
}(EventEmitter);
function createBScroll(el, options) {
  var bs = new BScrollConstructor(el, options);
  return bs;
}
createBScroll.use = BScrollConstructor.use;
createBScroll.plugins = BScrollConstructor.plugins;
createBScroll.pluginsMap = BScrollConstructor.pluginsMap;
var BScroll = createBScroll;
var MouseWheel = function() {
  function MouseWheel2(scroll) {
    this.scroll = scroll;
    this.wheelEndTimer = 0;
    this.wheelMoveTimer = 0;
    this.wheelStart = false;
    this.init();
  }
  MouseWheel2.prototype.init = function() {
    this.handleBScroll();
    this.handleOptions();
    this.handleHooks();
    this.registerEvent();
  };
  MouseWheel2.prototype.handleBScroll = function() {
    this.scroll.registerType(["alterOptions", "mousewheelStart", "mousewheelMove", "mousewheelEnd"]);
  };
  MouseWheel2.prototype.handleOptions = function() {
    var userOptions = this.scroll.options.mouseWheel === true ? {} : this.scroll.options.mouseWheel;
    var defaultOptions = {
      speed: 20,
      invert: false,
      easeTime: 300,
      discreteTime: 400,
      throttleTime: 0,
      dampingFactor: 0.1
    };
    this.mouseWheelOpt = extend(defaultOptions, userOptions);
  };
  MouseWheel2.prototype.handleHooks = function() {
    this.hooksFn = [];
    this.registerHooks(this.scroll.hooks, "destroy", this.destroy);
  };
  MouseWheel2.prototype.registerEvent = function() {
    this.eventRegister = new EventRegister(this.scroll.scroller.wrapper, [{
      name: "wheel",
      handler: this.wheelHandler.bind(this)
    }, {
      name: "mousewheel",
      handler: this.wheelHandler.bind(this)
    }, {
      name: "DOMMouseScroll",
      handler: this.wheelHandler.bind(this)
    }]);
  };
  MouseWheel2.prototype.registerHooks = function(hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  MouseWheel2.prototype.wheelHandler = function(e) {
    if (!this.scroll.enabled) {
      return;
    }
    this.beforeHandler(e);
    if (!this.wheelStart) {
      this.wheelStartHandler(e);
      this.wheelStart = true;
    }
    var delta = this.getWheelDelta(e);
    this.wheelMoveHandler(delta);
    this.wheelEndDetector(delta);
  };
  MouseWheel2.prototype.wheelStartHandler = function(e) {
    this.cleanCache();
    var _a2 = this.scroll.scroller, scrollBehaviorX = _a2.scrollBehaviorX, scrollBehaviorY = _a2.scrollBehaviorY;
    scrollBehaviorX.setMovingDirection(0);
    scrollBehaviorY.setMovingDirection(0);
    scrollBehaviorX.setDirection(0);
    scrollBehaviorY.setDirection(0);
    this.scroll.trigger(this.scroll.eventTypes.alterOptions, this.mouseWheelOpt);
    this.scroll.trigger(this.scroll.eventTypes.mousewheelStart);
  };
  MouseWheel2.prototype.cleanCache = function() {
    this.deltaCache = [];
  };
  MouseWheel2.prototype.wheelMoveHandler = function(delta) {
    var _this = this;
    var _a2 = this.mouseWheelOpt, throttleTime = _a2.throttleTime, dampingFactor = _a2.dampingFactor;
    if (throttleTime && this.wheelMoveTimer) {
      this.deltaCache.push(delta);
    } else {
      var cachedDelta = this.deltaCache.reduce(function(prev, current) {
        return {
          x: prev.x + current.x,
          y: prev.y + current.y
        };
      }, {
        x: 0,
        y: 0
      });
      this.cleanCache();
      var _b2 = this.scroll.scroller, scrollBehaviorX = _b2.scrollBehaviorX, scrollBehaviorY = _b2.scrollBehaviorY;
      scrollBehaviorX.setMovingDirection(-delta.directionX);
      scrollBehaviorY.setMovingDirection(-delta.directionY);
      scrollBehaviorX.setDirection(delta.x);
      scrollBehaviorY.setDirection(delta.y);
      var newX = scrollBehaviorX.performDampingAlgorithm(Math.round(delta.x) + cachedDelta.x, dampingFactor);
      var newY = scrollBehaviorY.performDampingAlgorithm(Math.round(delta.y) + cachedDelta.x, dampingFactor);
      if (!this.scroll.trigger(this.scroll.eventTypes.mousewheelMove, {
        x: newX,
        y: newY
      })) {
        var easeTime = this.getEaseTime();
        if (newX !== this.scroll.x || newY !== this.scroll.y) {
          this.scroll.scrollTo(newX, newY, easeTime);
        }
      }
      if (throttleTime) {
        this.wheelMoveTimer = window.setTimeout(function() {
          _this.wheelMoveTimer = 0;
        }, throttleTime);
      }
    }
  };
  MouseWheel2.prototype.wheelEndDetector = function(delta) {
    var _this = this;
    window.clearTimeout(this.wheelEndTimer);
    this.wheelEndTimer = window.setTimeout(function() {
      _this.wheelStart = false;
      window.clearTimeout(_this.wheelMoveTimer);
      _this.wheelMoveTimer = 0;
      _this.scroll.trigger(_this.scroll.eventTypes.mousewheelEnd, delta);
    }, this.mouseWheelOpt.discreteTime);
  };
  MouseWheel2.prototype.getWheelDelta = function(e) {
    var _a2 = this.mouseWheelOpt, speed = _a2.speed, invert = _a2.invert;
    var wheelDeltaX = 0;
    var wheelDeltaY = 0;
    var direction = invert ? -1 : 1;
    switch (true) {
      case "deltaX" in e:
        if (e.deltaMode === 1) {
          wheelDeltaX = -e.deltaX * speed;
          wheelDeltaY = -e.deltaY * speed;
        } else {
          wheelDeltaX = -e.deltaX;
          wheelDeltaY = -e.deltaY;
        }
        break;
      case "wheelDeltaX" in e:
        wheelDeltaX = e.wheelDeltaX / 120 * speed;
        wheelDeltaY = e.wheelDeltaY / 120 * speed;
        break;
      case "wheelDelta" in e:
        wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * speed;
        break;
      case "detail" in e:
        wheelDeltaX = wheelDeltaY = -e.detail / 3 * speed;
        break;
    }
    wheelDeltaX *= direction;
    wheelDeltaY *= direction;
    if (!this.scroll.hasVerticalScroll) {
      if (Math.abs(wheelDeltaY) > Math.abs(wheelDeltaX)) {
        wheelDeltaX = wheelDeltaY;
      }
      wheelDeltaY = 0;
    }
    if (!this.scroll.hasHorizontalScroll) {
      wheelDeltaX = 0;
    }
    var directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
    var directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;
    return {
      x: wheelDeltaX,
      y: wheelDeltaY,
      directionX,
      directionY
    };
  };
  MouseWheel2.prototype.beforeHandler = function(e) {
    var _a2 = this.scroll.options, preventDefault = _a2.preventDefault, stopPropagation = _a2.stopPropagation, preventDefaultException = _a2.preventDefaultException;
    if (preventDefault && !preventDefaultExceptionFn(e.target, preventDefaultException)) {
      e.preventDefault();
    }
    if (stopPropagation) {
      e.stopPropagation();
    }
  };
  MouseWheel2.prototype.getEaseTime = function() {
    var SAFE_EASETIME = 100;
    var easeTime = this.mouseWheelOpt.easeTime;
    if (easeTime < SAFE_EASETIME) {
      warn("easeTime should be greater than 100.If mouseWheel easeTime is too small,scrollEnd will be triggered many times.");
    }
    return Math.max(easeTime, SAFE_EASETIME);
  };
  MouseWheel2.prototype.destroy = function() {
    this.eventRegister.destroy();
    window.clearTimeout(this.wheelEndTimer);
    window.clearTimeout(this.wheelMoveTimer);
    this.hooksFn.forEach(function(item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
  };
  MouseWheel2.pluginName = "mouseWheel";
  MouseWheel2.applyOrder = "pre";
  return MouseWheel2;
}();
var ObserveDOM = function() {
  function ObserveDOM2(scroll) {
    this.scroll = scroll;
    this.stopObserver = false;
    this.init();
  }
  ObserveDOM2.prototype.init = function() {
    this.handleMutationObserver();
    this.handleHooks();
  };
  ObserveDOM2.prototype.handleMutationObserver = function() {
    var _this = this;
    if (typeof MutationObserver !== "undefined") {
      var timer_1 = 0;
      this.observer = new MutationObserver(function(mutations) {
        _this.mutationObserverHandler(mutations, timer_1);
      });
      this.startObserve(this.observer);
    } else {
      this.checkDOMUpdate();
    }
  };
  ObserveDOM2.prototype.handleHooks = function() {
    var _this = this;
    this.hooksFn = [];
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function() {
      _this.stopObserve();
      _this.handleMutationObserver();
    });
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.enable, function() {
      if (_this.stopObserver) {
        _this.handleMutationObserver();
      }
    });
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.disable, function() {
      _this.stopObserve();
    });
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.destroy, function() {
      _this.destroy();
    });
  };
  ObserveDOM2.prototype.mutationObserverHandler = function(mutations, timer) {
    var _this = this;
    if (this.shouldNotRefresh()) {
      return;
    }
    var immediateRefresh = false;
    var deferredRefresh = false;
    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i];
      if (mutation.type !== "attributes") {
        immediateRefresh = true;
        break;
      } else {
        if (mutation.target !== this.scroll.scroller.content) {
          deferredRefresh = true;
          break;
        }
      }
    }
    if (immediateRefresh) {
      this.scroll.refresh();
    } else if (deferredRefresh) {
      clearTimeout(timer);
      timer = window.setTimeout(function() {
        if (!_this.shouldNotRefresh()) {
          _this.scroll.refresh();
        }
      }, 60);
    }
  };
  ObserveDOM2.prototype.startObserve = function(observer) {
    var config2 = {
      attributes: true,
      childList: true,
      subtree: true
    };
    observer.observe(this.scroll.scroller.content, config2);
  };
  ObserveDOM2.prototype.shouldNotRefresh = function() {
    var scroller = this.scroll.scroller;
    var scrollBehaviorX = scroller.scrollBehaviorX, scrollBehaviorY = scroller.scrollBehaviorY;
    var outsideBoundaries = scrollBehaviorX.currentPos > scrollBehaviorX.minScrollPos || scrollBehaviorX.currentPos < scrollBehaviorX.maxScrollPos || scrollBehaviorY.currentPos > scrollBehaviorY.minScrollPos || scrollBehaviorY.currentPos < scrollBehaviorY.maxScrollPos;
    return scroller.animater.pending || outsideBoundaries;
  };
  ObserveDOM2.prototype.checkDOMUpdate = function() {
    var _this = this;
    var content = this.scroll.scroller.content;
    var contentRect = getRect(content);
    var oldWidth = contentRect.width;
    var oldHeight = contentRect.height;
    var check = function() {
      if (_this.stopObserver) {
        return;
      }
      contentRect = getRect(content);
      var newWidth = contentRect.width;
      var newHeight = contentRect.height;
      if (oldWidth !== newWidth || oldHeight !== newHeight) {
        _this.scroll.refresh();
      }
      oldWidth = newWidth;
      oldHeight = newHeight;
      next();
    };
    var next = function() {
      setTimeout(function() {
        check();
      }, 1e3);
    };
    next();
  };
  ObserveDOM2.prototype.registerHooks = function(hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  ObserveDOM2.prototype.stopObserve = function() {
    this.stopObserver = true;
    if (this.observer) {
      this.observer.disconnect();
    }
  };
  ObserveDOM2.prototype.destroy = function() {
    this.stopObserve();
    this.hooksFn.forEach(function(item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
    this.hooksFn.length = 0;
  };
  ObserveDOM2.pluginName = "observeDOM";
  return ObserveDOM2;
}();
var sourcePrefix$6 = "plugins.pullDownRefresh";
var propertiesMap$6 = [{
  key: "finishPullDown",
  name: "finishPullDown"
}, {
  key: "openPullDown",
  name: "openPullDown"
}, {
  key: "closePullDown",
  name: "closePullDown"
}, {
  key: "autoPullDownRefresh",
  name: "autoPullDownRefresh"
}];
var propertiesConfig$6 = propertiesMap$6.map(function(item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix$6 + "." + item.name
  };
});
var PULLING_DOWN_EVENT = "pullingDown";
var ENTER_THRESHOLD_EVENT = "enterThreshold";
var LEAVE_THRESHOLD_EVENT = "leaveThreshold";
var PullDown = function() {
  function PullDown2(scroll) {
    this.scroll = scroll;
    this.pulling = 0;
    this.thresholdBoundary = 0;
    this.init();
  }
  PullDown2.prototype.setPulling = function(status) {
    this.pulling = status;
  };
  PullDown2.prototype.setThresholdBoundary = function(boundary) {
    this.thresholdBoundary = boundary;
  };
  PullDown2.prototype.init = function() {
    this.handleBScroll();
    this.handleOptions(this.scroll.options.pullDownRefresh);
    this.handleHooks();
    this.watch();
  };
  PullDown2.prototype.handleBScroll = function() {
    this.scroll.registerType([PULLING_DOWN_EVENT, ENTER_THRESHOLD_EVENT, LEAVE_THRESHOLD_EVENT]);
    this.scroll.proxy(propertiesConfig$6);
  };
  PullDown2.prototype.handleOptions = function(userOptions) {
    if (userOptions === void 0) {
      userOptions = {};
    }
    userOptions = userOptions === true ? {} : userOptions;
    var defaultOptions = {
      threshold: 90,
      stop: 40
    };
    this.options = extend(defaultOptions, userOptions);
    this.scroll.options.probeType = 3;
  };
  PullDown2.prototype.handleHooks = function() {
    var _this = this;
    this.hooksFn = [];
    var scroller = this.scroll.scroller;
    var scrollBehaviorY = scroller.scrollBehaviorY;
    this.currentMinScrollY = this.cachedOriginanMinScrollY = scrollBehaviorY.minScrollPos;
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function() {
      _this.finishPullDown();
    });
    this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.computeBoundary, function(boundary) {
      if (boundary.maxScrollPos > 0) {
        boundary.maxScrollPos = -1;
      }
      boundary.minScrollPos = _this.currentMinScrollY;
    });
    if (this.hasMouseWheelPlugin()) {
      this.registerHooks(this.scroll, this.scroll.eventTypes.alterOptions, function(mouseWheelOptions) {
        var SANE_DISCRETE_TIME = 300;
        var SANE_EASE_TIME = 350;
        mouseWheelOptions.discreteTime = SANE_DISCRETE_TIME;
        mouseWheelOptions.easeTime = SANE_EASE_TIME;
      });
      this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelEnd, function() {
        scroller.hooks.trigger(scroller.hooks.eventTypes.end);
      });
    }
  };
  PullDown2.prototype.registerHooks = function(hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  PullDown2.prototype.hasMouseWheelPlugin = function() {
    return !!this.scroll.eventTypes.alterOptions;
  };
  PullDown2.prototype.watch = function() {
    var scroller = this.scroll.scroller;
    this.watching = true;
    this.registerHooks(scroller.hooks, scroller.hooks.eventTypes.end, this.checkPullDown);
    this.registerHooks(this.scroll, this.scroll.eventTypes.scrollStart, this.resetStateBeforeScrollStart);
    this.registerHooks(this.scroll, this.scroll.eventTypes.scroll, this.checkLocationOfThresholdBoundary);
    if (this.hasMouseWheelPlugin()) {
      this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelStart, this.resetStateBeforeScrollStart);
    }
  };
  PullDown2.prototype.resetStateBeforeScrollStart = function() {
    if (!this.isFetchingStatus()) {
      this.setPulling(1);
      this.setThresholdBoundary(0);
    }
  };
  PullDown2.prototype.checkLocationOfThresholdBoundary = function() {
    if (this.pulling === 1) {
      var scroll_1 = this.scroll;
      var enteredThresholdBoundary = this.thresholdBoundary !== 1 && this.locateInsideThresholdBoundary();
      var leftThresholdBoundary = this.thresholdBoundary !== 2 && !this.locateInsideThresholdBoundary();
      if (enteredThresholdBoundary) {
        this.setThresholdBoundary(1);
        scroll_1.trigger(ENTER_THRESHOLD_EVENT);
      }
      if (leftThresholdBoundary) {
        this.setThresholdBoundary(2);
        scroll_1.trigger(LEAVE_THRESHOLD_EVENT);
      }
    }
  };
  PullDown2.prototype.locateInsideThresholdBoundary = function() {
    return this.scroll.y <= this.options.threshold;
  };
  PullDown2.prototype.unwatch = function() {
    var scroll = this.scroll;
    var scroller = scroll.scroller;
    this.watching = false;
    scroller.hooks.off(scroller.hooks.eventTypes.end, this.checkPullDown);
    scroll.off(scroll.eventTypes.scrollStart, this.resetStateBeforeScrollStart);
    scroll.off(scroll.eventTypes.scroll, this.checkLocationOfThresholdBoundary);
    if (this.hasMouseWheelPlugin()) {
      scroll.off(scroll.eventTypes.mousewheelStart, this.resetStateBeforeScrollStart);
    }
  };
  PullDown2.prototype.checkPullDown = function() {
    var _a2 = this.options, threshold = _a2.threshold, stop = _a2.stop;
    if (this.scroll.y < threshold) {
      return false;
    }
    if (this.pulling === 1) {
      this.modifyBehaviorYBoundary(stop);
      this.setPulling(2);
      this.scroll.trigger(PULLING_DOWN_EVENT);
    }
    this.scroll.scrollTo(this.scroll.x, stop, this.scroll.options.bounceTime, ease.bounce);
    return this.isFetchingStatus();
  };
  PullDown2.prototype.isFetchingStatus = function() {
    return this.pulling === 2;
  };
  PullDown2.prototype.modifyBehaviorYBoundary = function(stopDistance) {
    var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
    this.cachedOriginanMinScrollY = scrollBehaviorY.minScrollPos;
    this.currentMinScrollY = stopDistance;
    scrollBehaviorY.computeBoundary();
  };
  PullDown2.prototype.finishPullDown = function() {
    if (this.isFetchingStatus()) {
      var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
      this.currentMinScrollY = this.cachedOriginanMinScrollY;
      scrollBehaviorY.computeBoundary();
      this.setPulling(0);
      this.scroll.resetPosition(this.scroll.options.bounceTime, ease.bounce);
    }
  };
  PullDown2.prototype.openPullDown = function(config2) {
    if (config2 === void 0) {
      config2 = {};
    }
    this.handleOptions(config2);
    if (!this.watching) {
      this.watch();
    }
  };
  PullDown2.prototype.closePullDown = function() {
    this.unwatch();
  };
  PullDown2.prototype.autoPullDownRefresh = function() {
    var _a2 = this.options, threshold = _a2.threshold, stop = _a2.stop;
    if (this.isFetchingStatus() || !this.watching) {
      return;
    }
    this.modifyBehaviorYBoundary(stop);
    this.scroll.trigger(this.scroll.eventTypes.scrollStart);
    this.scroll.scrollTo(this.scroll.x, threshold);
    this.setPulling(2);
    this.scroll.trigger(PULLING_DOWN_EVENT);
    this.scroll.scrollTo(this.scroll.x, stop, this.scroll.options.bounceTime, ease.bounce);
  };
  PullDown2.pluginName = "pullDownRefresh";
  return PullDown2;
}();
var sourcePrefix$5 = "plugins.pullUpLoad";
var propertiesMap$5 = [{
  key: "finishPullUp",
  name: "finishPullUp"
}, {
  key: "openPullUp",
  name: "openPullUp"
}, {
  key: "closePullUp",
  name: "closePullUp"
}, {
  key: "autoPullUpLoad",
  name: "autoPullUpLoad"
}];
var propertiesConfig$5 = propertiesMap$5.map(function(item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix$5 + "." + item.name
  };
});
var PULL_UP_HOOKS_NAME = "pullingUp";
var PullUp = function() {
  function PullUp2(scroll) {
    this.scroll = scroll;
    this.pulling = false;
    this.watching = false;
    this.init();
  }
  PullUp2.prototype.init = function() {
    this.handleBScroll();
    this.handleOptions(this.scroll.options.pullUpLoad);
    this.handleHooks();
    this.watch();
  };
  PullUp2.prototype.handleBScroll = function() {
    this.scroll.registerType([PULL_UP_HOOKS_NAME]);
    this.scroll.proxy(propertiesConfig$5);
  };
  PullUp2.prototype.handleOptions = function(userOptions) {
    if (userOptions === void 0) {
      userOptions = {};
    }
    userOptions = userOptions === true ? {} : userOptions;
    var defaultOptions = {
      threshold: 0
    };
    this.options = extend(defaultOptions, userOptions);
    this.scroll.options.probeType = 3;
  };
  PullUp2.prototype.handleHooks = function() {
    var _this = this;
    this.hooksFn = [];
    var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function() {
      _this.finishPullUp();
    });
    this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.computeBoundary, function(boundary) {
      if (boundary.maxScrollPos > 0) {
        boundary.maxScrollPos = -1;
      }
    });
  };
  PullUp2.prototype.registerHooks = function(hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  PullUp2.prototype.watch = function() {
    if (this.watching) {
      return;
    }
    this.watching = true;
    this.registerHooks(this.scroll, this.scroll.eventTypes.scroll, this.checkPullUp);
  };
  PullUp2.prototype.unwatch = function() {
    this.watching = false;
    this.scroll.off(this.scroll.eventTypes.scroll, this.checkPullUp);
  };
  PullUp2.prototype.checkPullUp = function(pos) {
    var _this = this;
    var threshold = this.options.threshold;
    if (this.scroll.movingDirectionY === 1 && pos.y <= this.scroll.maxScrollY + threshold) {
      this.pulling = true;
      this.scroll.once(this.scroll.eventTypes.scrollEnd, function() {
        _this.pulling = false;
      });
      this.unwatch();
      this.scroll.trigger(PULL_UP_HOOKS_NAME);
    }
  };
  PullUp2.prototype.finishPullUp = function() {
    var _this = this;
    this.scroll.scroller.scrollBehaviorY.setMovingDirection(0);
    if (this.pulling) {
      this.scroll.once(this.scroll.eventTypes.scrollEnd, function() {
        _this.watch();
      });
    } else {
      this.watch();
    }
  };
  PullUp2.prototype.openPullUp = function(config2) {
    if (config2 === void 0) {
      config2 = {};
    }
    this.handleOptions(config2);
    this.watch();
  };
  PullUp2.prototype.closePullUp = function() {
    this.unwatch();
  };
  PullUp2.prototype.autoPullUpLoad = function() {
    var threshold = this.options.threshold;
    var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
    if (this.pulling || !this.watching) {
      return;
    }
    var NEGATIVE_VALUE = -1;
    var outOfBoundaryPos = scrollBehaviorY.maxScrollPos + threshold + NEGATIVE_VALUE;
    this.scroll.scroller.scrollBehaviorY.setMovingDirection(NEGATIVE_VALUE);
    this.scroll.scrollTo(this.scroll.x, outOfBoundaryPos, this.scroll.options.bounceTime);
  };
  PullUp2.pluginName = "pullUpLoad";
  return PullUp2;
}();
var EventHandler = function() {
  function EventHandler2(indicator, options) {
    this.indicator = indicator;
    this.options = options;
    this.hooks = new EventEmitter(["touchStart", "touchMove", "touchEnd"]);
    this.registerEvents();
  }
  EventHandler2.prototype.registerEvents = function() {
    var _a2 = this.options, disableMouse = _a2.disableMouse, disableTouch = _a2.disableTouch;
    var startEvents = [];
    var moveEvents = [];
    var endEvents = [];
    if (!disableMouse) {
      startEvents.push({
        name: "mousedown",
        handler: this.start.bind(this)
      });
      moveEvents.push({
        name: "mousemove",
        handler: this.move.bind(this)
      });
      endEvents.push({
        name: "mouseup",
        handler: this.end.bind(this)
      });
    }
    if (!disableTouch) {
      startEvents.push({
        name: "touchstart",
        handler: this.start.bind(this)
      });
      moveEvents.push({
        name: "touchmove",
        handler: this.move.bind(this)
      });
      endEvents.push({
        name: "touchend",
        handler: this.end.bind(this)
      }, {
        name: "touchcancel",
        handler: this.end.bind(this)
      });
    }
    this.startEventRegister = new EventRegister(this.indicator.indicatorEl, startEvents);
    this.moveEventRegister = new EventRegister(window, moveEvents);
    this.endEventRegister = new EventRegister(window, endEvents);
  };
  EventHandler2.prototype.BScrollIsDisabled = function() {
    return !this.indicator.scroll.enabled;
  };
  EventHandler2.prototype.start = function(e) {
    if (this.BScrollIsDisabled()) {
      return;
    }
    var point = e.touches ? e.touches[0] : e;
    e.preventDefault();
    e.stopPropagation();
    this.initiated = true;
    this.lastPoint = point[this.indicator.keysMap.point];
    this.hooks.trigger(this.hooks.eventTypes.touchStart);
  };
  EventHandler2.prototype.move = function(e) {
    if (!this.initiated) {
      return;
    }
    var point = e.touches ? e.touches[0] : e;
    var pointPos = point[this.indicator.keysMap.point];
    e.preventDefault();
    e.stopPropagation();
    var delta = pointPos - this.lastPoint;
    this.lastPoint = pointPos;
    this.hooks.trigger(this.hooks.eventTypes.touchMove, delta);
  };
  EventHandler2.prototype.end = function(e) {
    if (!this.initiated) {
      return;
    }
    this.initiated = false;
    e.preventDefault();
    e.stopPropagation();
    this.hooks.trigger(this.hooks.eventTypes.touchEnd);
  };
  EventHandler2.prototype.destroy = function() {
    this.startEventRegister.destroy();
    this.moveEventRegister.destroy();
    this.endEventRegister.destroy();
  };
  return EventHandler2;
}();
var Indicator$1 = function() {
  function Indicator2(scroll, options) {
    this.scroll = scroll;
    this.options = options;
    this.hooksFn = [];
    this.wrapper = options.wrapper;
    this.direction = options.direction;
    this.indicatorEl = this.wrapper.children[0];
    this.keysMap = this.getKeysMap();
    this.handleFade();
    this.handleHooks();
  }
  Indicator2.prototype.handleFade = function() {
    if (this.options.fade) {
      this.wrapper.style.opacity = "0";
    }
  };
  Indicator2.prototype.handleHooks = function() {
    var _this = this;
    var _a2 = this.options, fade = _a2.fade, interactive = _a2.interactive, scrollbarTrackClickable = _a2.scrollbarTrackClickable;
    var scroll = this.scroll;
    var scrollHooks = scroll.hooks;
    var translaterHooks = scroll.scroller.translater.hooks;
    var animaterHooks = scroll.scroller.animater.hooks;
    this.registerHooks(scrollHooks, scrollHooks.eventTypes.refresh, this.refresh);
    this.registerHooks(translaterHooks, translaterHooks.eventTypes.translate, function(pos) {
      var hasScrollKey = _this.keysMap.hasScroll;
      if (_this.scroll[hasScrollKey]) {
        _this.updatePosition(pos);
      }
    });
    this.registerHooks(animaterHooks, animaterHooks.eventTypes.time, this.transitionTime);
    this.registerHooks(animaterHooks, animaterHooks.eventTypes.timeFunction, this.transitionTimingFunction);
    if (fade) {
      this.registerHooks(scroll, scroll.eventTypes.scrollEnd, function() {
        _this.fade();
      });
      this.registerHooks(scroll, scroll.eventTypes.scrollStart, function() {
        _this.fade(true);
      });
      if (scroll.eventTypes.mousewheelStart && scroll.eventTypes.mousewheelEnd) {
        this.registerHooks(scroll, scroll.eventTypes.mousewheelStart, function() {
          _this.fade(true);
        });
        this.registerHooks(scroll, scroll.eventTypes.mousewheelMove, function() {
          _this.fade(true);
        });
        this.registerHooks(scroll, scroll.eventTypes.mousewheelEnd, function() {
          _this.fade();
        });
      }
    }
    if (interactive) {
      var _b2 = this.scroll.options, disableMouse = _b2.disableMouse, disableTouch = _b2.disableTouch;
      this.eventHandler = new EventHandler(this, {
        disableMouse,
        disableTouch
      });
      var eventHandlerHooks = this.eventHandler.hooks;
      this.registerHooks(eventHandlerHooks, eventHandlerHooks.eventTypes.touchStart, this.startHandler);
      this.registerHooks(eventHandlerHooks, eventHandlerHooks.eventTypes.touchMove, this.moveHandler);
      this.registerHooks(eventHandlerHooks, eventHandlerHooks.eventTypes.touchEnd, this.endHandler);
    }
    if (scrollbarTrackClickable) {
      this.bindClick();
    }
  };
  Indicator2.prototype.registerHooks = function(hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  Indicator2.prototype.bindClick = function() {
    var wrapper = this.wrapper;
    this.clickEventRegister = new EventRegister(wrapper, [{
      name: "click",
      handler: this.handleClick.bind(this)
    }]);
  };
  Indicator2.prototype.handleClick = function(e) {
    var newPos = this.calculateclickOffsetPos(e);
    var _a2 = this.scroll, x = _a2.x, y = _a2.y;
    x = this.direction === "horizontal" ? newPos : x;
    y = this.direction === "vertical" ? newPos : y;
    this.scroll.scrollTo(x, y, this.options.scrollbarTrackOffsetTime);
  };
  Indicator2.prototype.calculateclickOffsetPos = function(e) {
    var _a2 = this.keysMap, poinKey = _a2.point, domRectKey = _a2.domRect;
    var scrollbarTrackOffsetType = this.options.scrollbarTrackOffsetType;
    var clickPointOffset = e[poinKey] - this.wrapperRect[domRectKey];
    var scrollToWhere = clickPointOffset < this.currentPos ? -1 : 1;
    var delta = 0;
    var currentPos = this.currentPos;
    if (scrollbarTrackOffsetType === "step") {
      delta = this.scrollInfo.baseSize * scrollToWhere;
    } else {
      delta = 0;
      currentPos = clickPointOffset;
    }
    return this.newPos(currentPos, delta, this.scrollInfo);
  };
  Indicator2.prototype.getKeysMap = function() {
    if (this.direction === "vertical") {
      return {
        hasScroll: "hasVerticalScroll",
        size: "height",
        wrapperSize: "clientHeight",
        scrollerSize: "scrollerHeight",
        maxScrollPos: "maxScrollY",
        pos: "y",
        point: "pageY",
        translateProperty: "translateY",
        domRect: "top"
      };
    }
    return {
      hasScroll: "hasHorizontalScroll",
      size: "width",
      wrapperSize: "clientWidth",
      scrollerSize: "scrollerWidth",
      maxScrollPos: "maxScrollX",
      pos: "x",
      point: "pageX",
      translateProperty: "translateX",
      domRect: "left"
    };
  };
  Indicator2.prototype.fade = function(visible) {
    var _a2 = this.options, fadeInTime = _a2.fadeInTime, fadeOutTime = _a2.fadeOutTime;
    var time = visible ? fadeInTime : fadeOutTime;
    var wrapper = this.wrapper;
    wrapper.style[style.transitionDuration] = time + "ms";
    wrapper.style.opacity = visible ? "1" : "0";
  };
  Indicator2.prototype.refresh = function() {
    var hasScrollKey = this.keysMap.hasScroll;
    var scroll = this.scroll;
    var x = scroll.x, y = scroll.y;
    this.wrapperRect = this.wrapper.getBoundingClientRect();
    if (this.canScroll(scroll[hasScrollKey])) {
      var _a2 = this.keysMap, wrapperSizeKey = _a2.wrapperSize, scrollerSizeKey = _a2.scrollerSize, maxScrollPosKey = _a2.maxScrollPos;
      this.scrollInfo = this.refreshScrollInfo(this.wrapper[wrapperSizeKey], scroll[scrollerSizeKey], scroll[maxScrollPosKey], this.indicatorEl[wrapperSizeKey]);
      this.updatePosition({
        x,
        y
      });
    }
  };
  Indicator2.prototype.transitionTime = function(time) {
    if (time === void 0) {
      time = 0;
    }
    this.indicatorEl.style[style.transitionDuration] = time + "ms";
  };
  Indicator2.prototype.transitionTimingFunction = function(easing) {
    this.indicatorEl.style[style.transitionTimingFunction] = easing;
  };
  Indicator2.prototype.canScroll = function(hasScroll) {
    this.wrapper.style.display = hasScroll ? "block" : "none";
    return hasScroll;
  };
  Indicator2.prototype.refreshScrollInfo = function(wrapperSize, scrollerSize, maxScrollPos, indicatorElSize) {
    var baseSize = Math.max(Math.round(wrapperSize * wrapperSize / (scrollerSize || wrapperSize || 1)), this.options.minSize);
    if (this.options.isCustom) {
      baseSize = indicatorElSize;
    }
    var maxIndicatorScrollPos = wrapperSize - baseSize;
    var sizeRatio = maxIndicatorScrollPos / maxScrollPos;
    return {
      baseSize,
      maxScrollPos: maxIndicatorScrollPos,
      minScrollPos: 0,
      sizeRatio
    };
  };
  Indicator2.prototype.updatePosition = function(point) {
    var _a2 = this.caculatePosAndSize(point, this.scrollInfo), pos = _a2.pos, size2 = _a2.size;
    this.refreshStyle(size2, pos);
    this.currentPos = pos;
  };
  Indicator2.prototype.caculatePosAndSize = function(point, scrollInfo) {
    var posKey = this.keysMap.pos;
    var sizeRatio = scrollInfo.sizeRatio, baseSize = scrollInfo.baseSize, maxScrollPos = scrollInfo.maxScrollPos, minScrollPos = scrollInfo.minScrollPos;
    var minSize = this.options.minSize;
    var pos = Math.round(sizeRatio * point[posKey]);
    var size2;
    if (pos < minScrollPos) {
      size2 = Math.max(baseSize + pos * 3, minSize);
      pos = minScrollPos;
    } else if (pos > maxScrollPos) {
      size2 = Math.max(baseSize - (pos - maxScrollPos) * 3, minSize);
      pos = maxScrollPos + baseSize - size2;
    } else {
      size2 = baseSize;
    }
    return {
      pos,
      size: size2
    };
  };
  Indicator2.prototype.refreshStyle = function(size2, pos) {
    var _a2 = this.keysMap, translatePropertyKey = _a2.translateProperty, sizeKey = _a2.size;
    var translateZ = this.scroll.options.translateZ;
    this.indicatorEl.style[sizeKey] = size2 + "px";
    this.indicatorEl.style[style.transform] = translatePropertyKey + "(" + pos + "px)" + translateZ;
  };
  Indicator2.prototype.startHandler = function() {
    this.moved = false;
    this.startTime = getNow();
    this.transitionTime();
    this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.beforeScrollStart);
  };
  Indicator2.prototype.moveHandler = function(delta) {
    if (!this.moved && !this.indicatorNotMoved(delta)) {
      this.moved = true;
      this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollStart);
    }
    if (this.moved) {
      var newPos = this.newPos(this.currentPos, delta, this.scrollInfo);
      this.syncBScroll(newPos);
    }
  };
  Indicator2.prototype.endHandler = function() {
    if (this.moved) {
      var _a2 = this.scroll, x = _a2.x, y = _a2.y;
      this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollEnd, {
        x,
        y
      });
    }
  };
  Indicator2.prototype.indicatorNotMoved = function(delta) {
    var currentPos = this.currentPos;
    var _a2 = this.scrollInfo, maxScrollPos = _a2.maxScrollPos, minScrollPos = _a2.minScrollPos;
    var notMoved = currentPos === minScrollPos && delta <= 0 || currentPos === maxScrollPos && delta >= 0;
    return notMoved;
  };
  Indicator2.prototype.syncBScroll = function(newPos) {
    var timestamp = getNow();
    var _a2 = this.scroll, x = _a2.x, y = _a2.y, options = _a2.options, scroller = _a2.scroller, maxScrollY = _a2.maxScrollY, minScrollY = _a2.minScrollY, maxScrollX = _a2.maxScrollX, minScrollX = _a2.minScrollX;
    var probeType = options.probeType, momentumLimitTime = options.momentumLimitTime;
    var position = {
      x,
      y
    };
    if (this.direction === "vertical") {
      position.y = between(newPos, maxScrollY, minScrollY);
    } else {
      position.x = between(newPos, maxScrollX, minScrollX);
    }
    scroller.translater.translate(position);
    if (timestamp - this.startTime > momentumLimitTime) {
      this.startTime = timestamp;
      if (probeType === 1) {
        scroller.hooks.trigger(scroller.hooks.eventTypes.scroll, position);
      }
    }
    if (probeType > 1) {
      scroller.hooks.trigger(scroller.hooks.eventTypes.scroll, position);
    }
  };
  Indicator2.prototype.newPos = function(currentPos, delta, scrollInfo) {
    var maxScrollPos = scrollInfo.maxScrollPos, sizeRatio = scrollInfo.sizeRatio, minScrollPos = scrollInfo.minScrollPos;
    var newPos = currentPos + delta;
    newPos = between(newPos, minScrollPos, maxScrollPos);
    return Math.round(newPos / sizeRatio);
  };
  Indicator2.prototype.destroy = function() {
    var _a2 = this.options, interactive = _a2.interactive, scrollbarTrackClickable = _a2.scrollbarTrackClickable, isCustom = _a2.isCustom;
    if (interactive) {
      this.eventHandler.destroy();
    }
    if (scrollbarTrackClickable) {
      this.clickEventRegister.destroy();
    }
    if (!isCustom) {
      this.wrapper.parentNode.removeChild(this.wrapper);
    }
    this.hooksFn.forEach(function(item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
    this.hooksFn.length = 0;
  };
  return Indicator2;
}();
var ScrollBar = function() {
  function ScrollBar2(scroll) {
    this.scroll = scroll;
    this.handleOptions();
    this.createIndicators();
    this.handleHooks();
  }
  ScrollBar2.prototype.handleHooks = function() {
    var _this = this;
    var scroll = this.scroll;
    scroll.hooks.on(scroll.hooks.eventTypes.destroy, function() {
      for (var _i = 0, _a2 = _this.indicators; _i < _a2.length; _i++) {
        var indicator = _a2[_i];
        indicator.destroy();
      }
    });
  };
  ScrollBar2.prototype.handleOptions = function() {
    var userOptions = this.scroll.options.scrollbar === true ? {} : this.scroll.options.scrollbar;
    var defaultOptions = {
      fade: true,
      fadeInTime: 250,
      fadeOutTime: 500,
      interactive: false,
      customElements: [],
      minSize: 8,
      scrollbarTrackClickable: false,
      scrollbarTrackOffsetType: "step",
      scrollbarTrackOffsetTime: 300
    };
    this.options = extend(defaultOptions, userOptions);
  };
  ScrollBar2.prototype.createIndicators = function() {
    var indicatorOptions;
    var scroll = this.scroll;
    var indicators = [];
    var scrollDirectionConfigKeys = ["scrollX", "scrollY"];
    var indicatorDirections = [
      "horizontal",
      "vertical"
    ];
    var customScrollbarEls = this.options.customElements;
    for (var i = 0; i < scrollDirectionConfigKeys.length; i++) {
      var key = scrollDirectionConfigKeys[i];
      if (scroll.options[key]) {
        var customElement = customScrollbarEls.shift();
        var direction = indicatorDirections[i];
        var isCustom = false;
        var scrollbarWrapper = customElement ? customElement : this.createScrollbarElement(direction);
        if (scrollbarWrapper !== customElement) {
          scroll.wrapper.appendChild(scrollbarWrapper);
        } else {
          isCustom = true;
        }
        indicatorOptions = __assign(__assign({
          wrapper: scrollbarWrapper,
          direction
        }, this.options), {
          isCustom
        });
        indicators.push(new Indicator$1(scroll, indicatorOptions));
      }
    }
    this.indicators = indicators;
  };
  ScrollBar2.prototype.createScrollbarElement = function(direction, scrollbarTrackClickable) {
    if (scrollbarTrackClickable === void 0) {
      scrollbarTrackClickable = this.options.scrollbarTrackClickable;
    }
    var scrollbarWrapperEl = document.createElement("div");
    var scrollbarIndicatorEl = document.createElement("div");
    scrollbarWrapperEl.style.cssText = "position:absolute;z-index:9999;overflow:hidden;";
    scrollbarIndicatorEl.style.cssText = "box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;";
    scrollbarIndicatorEl.className = "bscroll-indicator";
    if (direction === "horizontal") {
      scrollbarWrapperEl.style.cssText += "height:7px;left:2px;right:2px;bottom:0;";
      scrollbarIndicatorEl.style.height = "100%";
      scrollbarWrapperEl.className = "bscroll-horizontal-scrollbar";
    } else {
      scrollbarWrapperEl.style.cssText += "width:7px;bottom:2px;top:2px;right:1px;";
      scrollbarIndicatorEl.style.width = "100%";
      scrollbarWrapperEl.className = "bscroll-vertical-scrollbar";
    }
    if (!scrollbarTrackClickable) {
      scrollbarWrapperEl.style.cssText += "pointer-events:none;";
    }
    scrollbarWrapperEl.appendChild(scrollbarIndicatorEl);
    return scrollbarWrapperEl;
  };
  ScrollBar2.pluginName = "scrollbar";
  return ScrollBar2;
}();
var PagesMatrix = function() {
  function PagesMatrix2(scroll) {
    this.scroll = scroll;
    this.init();
  }
  PagesMatrix2.prototype.init = function() {
    var scroller = this.scroll.scroller;
    var scrollBehaviorX = scroller.scrollBehaviorX, scrollBehaviorY = scroller.scrollBehaviorY;
    this.wrapperWidth = scrollBehaviorX.wrapperSize;
    this.wrapperHeight = scrollBehaviorY.wrapperSize;
    this.scrollerHeight = scrollBehaviorY.contentSize;
    this.scrollerWidth = scrollBehaviorX.contentSize;
    this.pages = this.buildPagesMatrix(this.wrapperWidth, this.wrapperHeight);
    this.pageLengthOfX = this.pages ? this.pages.length : 0;
    this.pageLengthOfY = this.pages && this.pages[0] ? this.pages[0].length : 0;
  };
  PagesMatrix2.prototype.getPageStats = function(pageX, pageY) {
    return this.pages[pageX][pageY];
  };
  PagesMatrix2.prototype.getNearestPageIndex = function(x, y) {
    var pageX = 0;
    var pageY = 0;
    var l = this.pages.length;
    for (; pageX < l - 1; pageX++) {
      if (x >= this.pages[pageX][0].cx) {
        break;
      }
    }
    l = this.pages[pageX].length;
    for (; pageY < l - 1; pageY++) {
      if (y >= this.pages[0][pageY].cy) {
        break;
      }
    }
    return {
      pageX,
      pageY
    };
  };
  PagesMatrix2.prototype.buildPagesMatrix = function(stepX, stepY) {
    var pages = [];
    var x = 0;
    var y;
    var cx;
    var cy;
    var i = 0;
    var l;
    var maxScrollPosX = this.scroll.scroller.scrollBehaviorX.maxScrollPos;
    var maxScrollPosY = this.scroll.scroller.scrollBehaviorY.maxScrollPos;
    cx = Math.round(stepX / 2);
    cy = Math.round(stepY / 2);
    while (x > -this.scrollerWidth) {
      pages[i] = [];
      l = 0;
      y = 0;
      while (y > -this.scrollerHeight) {
        pages[i][l] = {
          x: Math.max(x, maxScrollPosX),
          y: Math.max(y, maxScrollPosY),
          width: stepX,
          height: stepY,
          cx: x - cx,
          cy: y - cy
        };
        y -= stepY;
        l++;
      }
      x -= stepX;
      i++;
    }
    return pages;
  };
  return PagesMatrix2;
}();
var BASE_PAGE = {
  pageX: 0,
  pageY: 0,
  x: 0,
  y: 0
};
var SlidePages = function() {
  function SlidePages2(scroll, slideOptions) {
    this.scroll = scroll;
    this.slideOptions = slideOptions;
    this.slideX = false;
    this.slideY = false;
    this.currentPage = extend({}, BASE_PAGE);
  }
  SlidePages2.prototype.refresh = function() {
    this.pagesMatrix = new PagesMatrix(this.scroll);
    this.checkSlideLoop();
    this.currentPage = this.getAdjustedCurrentPage();
  };
  SlidePages2.prototype.getAdjustedCurrentPage = function() {
    var _a2 = this.currentPage, pageX = _a2.pageX, pageY = _a2.pageY;
    pageX = Math.min(pageX, this.pagesMatrix.pageLengthOfX - 1);
    pageY = Math.min(pageY, this.pagesMatrix.pageLengthOfY - 1);
    if (this.loopX) {
      pageX = Math.min(pageX, this.pagesMatrix.pageLengthOfX - 2);
    }
    if (this.loopY) {
      pageY = Math.min(pageY, this.pagesMatrix.pageLengthOfY - 2);
    }
    var _b2 = this.pagesMatrix.getPageStats(pageX, pageY), x = _b2.x, y = _b2.y;
    return {
      pageX,
      pageY,
      x,
      y
    };
  };
  SlidePages2.prototype.setCurrentPage = function(newPage) {
    this.currentPage = newPage;
  };
  SlidePages2.prototype.getInternalPage = function(pageX, pageY) {
    if (pageX >= this.pagesMatrix.pageLengthOfX) {
      pageX = this.pagesMatrix.pageLengthOfX - 1;
    } else if (pageX < 0) {
      pageX = 0;
    }
    if (pageY >= this.pagesMatrix.pageLengthOfY) {
      pageY = this.pagesMatrix.pageLengthOfY - 1;
    } else if (pageY < 0) {
      pageY = 0;
    }
    var _a2 = this.pagesMatrix.getPageStats(pageX, pageY), x = _a2.x, y = _a2.y;
    return {
      pageX,
      pageY,
      x,
      y
    };
  };
  SlidePages2.prototype.getInitialPage = function(showFirstPage, firstInitialised) {
    if (showFirstPage === void 0) {
      showFirstPage = false;
    }
    if (firstInitialised === void 0) {
      firstInitialised = false;
    }
    var _a2 = this.slideOptions, startPageXIndex = _a2.startPageXIndex, startPageYIndex = _a2.startPageYIndex;
    var firstPageX = this.loopX ? 1 : 0;
    var firstPageY = this.loopY ? 1 : 0;
    var pageX = showFirstPage ? firstPageX : this.currentPage.pageX;
    var pageY = showFirstPage ? firstPageY : this.currentPage.pageY;
    if (firstInitialised) {
      pageX = this.loopX ? startPageXIndex + 1 : startPageXIndex;
      pageY = this.loopY ? startPageYIndex + 1 : startPageYIndex;
    } else {
      pageX = showFirstPage ? firstPageX : this.currentPage.pageX;
      pageY = showFirstPage ? firstPageY : this.currentPage.pageY;
    }
    var _b2 = this.pagesMatrix.getPageStats(pageX, pageY), x = _b2.x, y = _b2.y;
    return {
      pageX,
      pageY,
      x,
      y
    };
  };
  SlidePages2.prototype.getExposedPage = function(page) {
    var exposedPage = extend({}, page);
    if (this.loopX) {
      exposedPage.pageX = this.fixedPage(exposedPage.pageX, this.pagesMatrix.pageLengthOfX - 2);
    }
    if (this.loopY) {
      exposedPage.pageY = this.fixedPage(exposedPage.pageY, this.pagesMatrix.pageLengthOfY - 2);
    }
    return exposedPage;
  };
  SlidePages2.prototype.getExposedPageByPageIndex = function(pageIndexX, pageIndexY) {
    var page = {
      pageX: pageIndexX,
      pageY: pageIndexY
    };
    if (this.loopX) {
      page.pageX = pageIndexX + 1;
    }
    if (this.loopY) {
      page.pageY = pageIndexY + 1;
    }
    var _a2 = this.pagesMatrix.getPageStats(page.pageX, page.pageY), x = _a2.x, y = _a2.y;
    return {
      x,
      y,
      pageX: pageIndexX,
      pageY: pageIndexY
    };
  };
  SlidePages2.prototype.getWillChangedPage = function(page) {
    page = extend({}, page);
    if (this.loopX) {
      page.pageX = this.fixedPage(page.pageX, this.pagesMatrix.pageLengthOfX - 2);
      page.x = this.pagesMatrix.getPageStats(page.pageX + 1, 0).x;
    }
    if (this.loopY) {
      page.pageY = this.fixedPage(page.pageY, this.pagesMatrix.pageLengthOfY - 2);
      page.y = this.pagesMatrix.getPageStats(0, page.pageY + 1).y;
    }
    return page;
  };
  SlidePages2.prototype.fixedPage = function(page, realPageLen) {
    var pageIndex = [];
    for (var i = 0; i < realPageLen; i++) {
      pageIndex.push(i);
    }
    pageIndex.unshift(realPageLen - 1);
    pageIndex.push(0);
    return pageIndex[page];
  };
  SlidePages2.prototype.getPageStats = function() {
    return this.pagesMatrix.getPageStats(this.currentPage.pageX, this.currentPage.pageY);
  };
  SlidePages2.prototype.getValidPageIndex = function(x, y) {
    var lastX = this.pagesMatrix.pageLengthOfX - 1;
    var lastY = this.pagesMatrix.pageLengthOfY - 1;
    var firstX = 0;
    var firstY = 0;
    if (this.loopX) {
      x += 1;
      firstX = firstX + 1;
      lastX = lastX - 1;
    }
    if (this.loopY) {
      y += 1;
      firstY = firstY + 1;
      lastY = lastY - 1;
    }
    x = between(x, firstX, lastX);
    y = between(y, firstY, lastY);
    return {
      pageX: x,
      pageY: y
    };
  };
  SlidePages2.prototype.nextPageIndex = function() {
    return this.getPageIndexByDirection("positive");
  };
  SlidePages2.prototype.prevPageIndex = function() {
    return this.getPageIndexByDirection("negative");
  };
  SlidePages2.prototype.getNearestPage = function(x, y) {
    var pageIndex = this.pagesMatrix.getNearestPageIndex(x, y);
    var pageX = pageIndex.pageX, pageY = pageIndex.pageY;
    var newX = this.pagesMatrix.getPageStats(pageX, 0).x;
    var newY = this.pagesMatrix.getPageStats(0, pageY).y;
    return {
      x: newX,
      y: newY,
      pageX,
      pageY
    };
  };
  SlidePages2.prototype.getPageByDirection = function(page, directionX, directionY) {
    var pageX = page.pageX, pageY = page.pageY;
    if (pageX === this.currentPage.pageX) {
      pageX = between(pageX + directionX, 0, this.pagesMatrix.pageLengthOfX - 1);
    }
    if (pageY === this.currentPage.pageY) {
      pageY = between(pageY + directionY, 0, this.pagesMatrix.pageLengthOfY - 1);
    }
    var x = this.pagesMatrix.getPageStats(pageX, 0).x;
    var y = this.pagesMatrix.getPageStats(0, pageY).y;
    return {
      x,
      y,
      pageX,
      pageY
    };
  };
  SlidePages2.prototype.resetLoopPage = function() {
    if (this.loopX) {
      if (this.currentPage.pageX === 0) {
        return {
          pageX: this.pagesMatrix.pageLengthOfX - 2,
          pageY: this.currentPage.pageY
        };
      }
      if (this.currentPage.pageX === this.pagesMatrix.pageLengthOfX - 1) {
        return {
          pageX: 1,
          pageY: this.currentPage.pageY
        };
      }
    }
    if (this.loopY) {
      if (this.currentPage.pageY === 0) {
        return {
          pageX: this.currentPage.pageX,
          pageY: this.pagesMatrix.pageLengthOfY - 2
        };
      }
      if (this.currentPage.pageY === this.pagesMatrix.pageLengthOfY - 1) {
        return {
          pageX: this.currentPage.pageX,
          pageY: 1
        };
      }
    }
  };
  SlidePages2.prototype.getPageIndexByDirection = function(direction) {
    var x = this.currentPage.pageX;
    var y = this.currentPage.pageY;
    if (this.slideX) {
      x = direction === "negative" ? x - 1 : x + 1;
    }
    if (this.slideY) {
      y = direction === "negative" ? y - 1 : y + 1;
    }
    return {
      pageX: x,
      pageY: y
    };
  };
  SlidePages2.prototype.checkSlideLoop = function() {
    this.wannaLoop = this.slideOptions.loop;
    if (this.pagesMatrix.pageLengthOfX > 1) {
      this.slideX = true;
    } else {
      this.slideX = false;
    }
    if (this.pagesMatrix.pages[0] && this.pagesMatrix.pageLengthOfY > 1) {
      this.slideY = true;
    } else {
      this.slideY = false;
    }
    this.loopX = this.wannaLoop && this.slideX;
    this.loopY = this.wannaLoop && this.slideY;
    if (this.slideX && this.slideY) {
      warn("slide does not support two direction at the same time.");
    }
  };
  return SlidePages2;
}();
var sourcePrefix$4 = "plugins.slide";
var propertiesMap$4 = [{
  key: "next",
  name: "next"
}, {
  key: "prev",
  name: "prev"
}, {
  key: "goToPage",
  name: "goToPage"
}, {
  key: "getCurrentPage",
  name: "getCurrentPage"
}, {
  key: "startPlay",
  name: "startPlay"
}, {
  key: "pausePlay",
  name: "pausePlay"
}];
var propertiesConfig$4 = propertiesMap$4.map(function(item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix$4 + "." + item.name
  };
});
var samePage = function(p1, p2) {
  return p1.pageX === p2.pageX && p1.pageY === p2.pageY;
};
var Slide = function() {
  function Slide2(scroll) {
    this.scroll = scroll;
    this.cachedClonedPageDOM = [];
    this.resetLooping = false;
    this.autoplayTimer = 0;
    if (!this.satisfyInitialization()) {
      return;
    }
    this.init();
  }
  Slide2.prototype.satisfyInitialization = function() {
    if (this.scroll.scroller.content.children.length <= 0) {
      warn("slide need at least one slide page to be initialised.please check your DOM layout.");
      return false;
    }
    return true;
  };
  Slide2.prototype.init = function() {
    this.willChangeToPage = extend({}, BASE_PAGE);
    this.handleBScroll();
    this.handleOptions();
    this.handleHooks();
    this.createPages();
  };
  Slide2.prototype.createPages = function() {
    this.pages = new SlidePages(this.scroll, this.options);
  };
  Slide2.prototype.handleBScroll = function() {
    this.scroll.registerType(["slideWillChange", "slidePageChanged"]);
    this.scroll.proxy(propertiesConfig$4);
  };
  Slide2.prototype.handleOptions = function() {
    var userOptions = this.scroll.options.slide === true ? {} : this.scroll.options.slide;
    var defaultOptions = {
      loop: true,
      threshold: 0.1,
      speed: 400,
      easing: ease.bounce,
      listenFlick: true,
      autoplay: true,
      interval: 3e3,
      startPageXIndex: 0,
      startPageYIndex: 0
    };
    this.options = extend(defaultOptions, userOptions);
  };
  Slide2.prototype.handleLoop = function(prevSlideContent) {
    var loop = this.options.loop;
    var slideContent = this.scroll.scroller.content;
    var currentSlidePagesLength = slideContent.children.length;
    if (loop) {
      if (slideContent !== prevSlideContent) {
        this.resetLoopChangedStatus();
        this.removeClonedSlidePage(prevSlideContent);
        currentSlidePagesLength > 1 && this.cloneFirstAndLastSlidePage(slideContent);
      } else {
        if (currentSlidePagesLength === 3 && this.initialised) {
          this.removeClonedSlidePage(slideContent);
          this.moreToOnePageInLoop = true;
          this.oneToMorePagesInLoop = false;
        } else if (currentSlidePagesLength > 1) {
          if (this.initialised && this.cachedClonedPageDOM.length === 0) {
            this.oneToMorePagesInLoop = true;
            this.moreToOnePageInLoop = false;
          } else {
            this.removeClonedSlidePage(slideContent);
            this.resetLoopChangedStatus();
          }
          this.cloneFirstAndLastSlidePage(slideContent);
        } else {
          this.resetLoopChangedStatus();
        }
      }
    }
  };
  Slide2.prototype.resetLoopChangedStatus = function() {
    this.moreToOnePageInLoop = false;
    this.oneToMorePagesInLoop = false;
  };
  Slide2.prototype.handleHooks = function() {
    var _this = this;
    var scrollHooks = this.scroll.hooks;
    var scrollerHooks = this.scroll.scroller.hooks;
    var listenFlick = this.options.listenFlick;
    this.prevContent = this.scroll.scroller.content;
    this.hooksFn = [];
    this.registerHooks(this.scroll, this.scroll.eventTypes.beforeScrollStart, this.pausePlay);
    this.registerHooks(this.scroll, this.scroll.eventTypes.scrollEnd, this.modifyCurrentPage);
    this.registerHooks(this.scroll, this.scroll.eventTypes.scrollEnd, this.startPlay);
    if (this.scroll.eventTypes.mousewheelMove) {
      this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelMove, function() {
        return true;
      });
      this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelEnd, function(delta) {
        if (delta.directionX === 1 || delta.directionY === 1) {
          _this.next();
        }
        if (delta.directionX === -1 || delta.directionY === -1) {
          _this.prev();
        }
      });
    }
    this.registerHooks(scrollHooks, scrollHooks.eventTypes.refresh, this.refreshHandler);
    this.registerHooks(scrollHooks, scrollHooks.eventTypes.destroy, this.destroy);
    this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.beforeRefresh, function() {
      _this.handleLoop(_this.prevContent);
      _this.setSlideInlineStyle();
    });
    this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.momentum, this.modifyScrollMetaHandler);
    this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.scroll, this.scrollHandler);
    this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.checkClick, this.startPlay);
    if (listenFlick) {
      this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.flick, this.flickHandler);
    }
  };
  Slide2.prototype.startPlay = function() {
    var _this = this;
    var _a2 = this.options, interval = _a2.interval, autoplay = _a2.autoplay;
    if (autoplay) {
      clearTimeout(this.autoplayTimer);
      this.autoplayTimer = window.setTimeout(function() {
        _this.next();
      }, interval);
    }
  };
  Slide2.prototype.pausePlay = function() {
    if (this.options.autoplay) {
      clearTimeout(this.autoplayTimer);
    }
  };
  Slide2.prototype.setSlideInlineStyle = function() {
    var styleConfigurations = [{
      direction: "scrollX",
      sizeType: "offsetWidth",
      styleType: "width"
    }, {
      direction: "scrollY",
      sizeType: "offsetHeight",
      styleType: "height"
    }];
    var _a2 = this.scroll.scroller, slideContent = _a2.content, slideWrapper = _a2.wrapper;
    var scrollOptions = this.scroll.options;
    styleConfigurations.forEach(function(_a3) {
      var direction = _a3.direction, sizeType = _a3.sizeType, styleType = _a3.styleType;
      if (scrollOptions[direction]) {
        var size2 = slideWrapper[sizeType];
        var children = slideContent.children;
        var length_1 = children.length;
        for (var i = 0; i < length_1; i++) {
          var slidePageDOM = children[i];
          slidePageDOM.style[styleType] = size2 + "px";
        }
        slideContent.style[styleType] = size2 * length_1 + "px";
      }
    });
  };
  Slide2.prototype.next = function(time, easing) {
    var _a2 = this.pages.nextPageIndex(), pageX = _a2.pageX, pageY = _a2.pageY;
    this.goTo(pageX, pageY, time, easing);
  };
  Slide2.prototype.prev = function(time, easing) {
    var _a2 = this.pages.prevPageIndex(), pageX = _a2.pageX, pageY = _a2.pageY;
    this.goTo(pageX, pageY, time, easing);
  };
  Slide2.prototype.goToPage = function(pageX, pageY, time, easing) {
    var pageIndex = this.pages.getValidPageIndex(pageX, pageY);
    this.goTo(pageIndex.pageX, pageIndex.pageY, time, easing);
  };
  Slide2.prototype.getCurrentPage = function() {
    return this.exposedPage || this.pages.getInitialPage(false, true);
  };
  Slide2.prototype.setCurrentPage = function(page) {
    this.pages.setCurrentPage(page);
    this.exposedPage = this.pages.getExposedPage(page);
  };
  Slide2.prototype.nearestPage = function(x, y) {
    var _a2 = this.scroll.scroller, scrollBehaviorX = _a2.scrollBehaviorX, scrollBehaviorY = _a2.scrollBehaviorY;
    var maxScrollPosX = scrollBehaviorX.maxScrollPos, minScrollPosX = scrollBehaviorX.minScrollPos;
    var maxScrollPosY = scrollBehaviorY.maxScrollPos, minScrollPosY = scrollBehaviorY.minScrollPos;
    return this.pages.getNearestPage(between(x, maxScrollPosX, minScrollPosX), between(y, maxScrollPosY, minScrollPosY));
  };
  Slide2.prototype.satisfyThreshold = function(x, y) {
    var _a2 = this.scroll.scroller, scrollBehaviorX = _a2.scrollBehaviorX, scrollBehaviorY = _a2.scrollBehaviorY;
    var satisfied = true;
    if (Math.abs(x - scrollBehaviorX.absStartPos) <= this.thresholdX && Math.abs(y - scrollBehaviorY.absStartPos) <= this.thresholdY) {
      satisfied = false;
    }
    return satisfied;
  };
  Slide2.prototype.refreshHandler = function(content) {
    var _this = this;
    if (!this.satisfyInitialization()) {
      return;
    }
    this.pages.refresh();
    this.computeThreshold();
    var contentChanged = this.contentChanged = this.prevContent !== content;
    if (contentChanged) {
      this.prevContent = content;
    }
    var initPage = this.pages.getInitialPage(this.oneToMorePagesInLoop || this.moreToOnePageInLoop, contentChanged || !this.initialised);
    if (this.initialised) {
      this.goTo(initPage.pageX, initPage.pageY, 0);
    } else {
      this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.beforeInitialScrollTo, function(position) {
        _this.initialised = true;
        position.x = initPage.x;
        position.y = initPage.y;
      });
    }
    this.startPlay();
  };
  Slide2.prototype.computeThreshold = function() {
    var threshold = this.options.threshold;
    if (threshold % 1 === 0) {
      this.thresholdX = threshold;
      this.thresholdY = threshold;
    } else {
      var _a2 = this.pages.getPageStats(), width = _a2.width, height = _a2.height;
      this.thresholdX = Math.round(width * threshold);
      this.thresholdY = Math.round(height * threshold);
    }
  };
  Slide2.prototype.cloneFirstAndLastSlidePage = function(slideContent) {
    var children = slideContent.children;
    var preprendDOM = children[children.length - 1].cloneNode(true);
    var appendDOM = children[0].cloneNode(true);
    prepend(preprendDOM, slideContent);
    slideContent.appendChild(appendDOM);
    this.cachedClonedPageDOM = [preprendDOM, appendDOM];
  };
  Slide2.prototype.removeClonedSlidePage = function(slideContent) {
    var slidePages = slideContent && slideContent.children || [];
    if (slidePages.length) {
      this.cachedClonedPageDOM.forEach(function(el) {
        removeChild(slideContent, el);
      });
    }
    this.cachedClonedPageDOM = [];
  };
  Slide2.prototype.modifyCurrentPage = function(point) {
    var _a2 = this.getCurrentPage(), prevExposedPageX = _a2.pageX, prevExposedPageY = _a2.pageY;
    var newPage = this.nearestPage(point.x, point.y);
    this.setCurrentPage(newPage);
    if (this.contentChanged) {
      this.contentChanged = false;
      return true;
    }
    var _b2 = this.getCurrentPage(), currentExposedPageX = _b2.pageX, currentExposedPageY = _b2.pageY;
    this.pageWillChangeTo(newPage);
    if (this.oneToMorePagesInLoop) {
      this.oneToMorePagesInLoop = false;
      return true;
    }
    if (this.moreToOnePageInLoop && prevExposedPageX === 0 && prevExposedPageY === 0) {
      this.moreToOnePageInLoop = false;
      return true;
    }
    if (prevExposedPageX !== currentExposedPageX || prevExposedPageY !== currentExposedPageY) {
      var page = this.pages.getExposedPageByPageIndex(currentExposedPageX, currentExposedPageY);
      this.scroll.trigger(this.scroll.eventTypes.slidePageChanged, page);
    }
    if (this.resetLooping) {
      this.resetLooping = false;
      return;
    }
    var changePage = this.pages.resetLoopPage();
    if (changePage) {
      this.resetLooping = true;
      this.goTo(changePage.pageX, changePage.pageY, 0);
      return true;
    }
  };
  Slide2.prototype.goTo = function(pageX, pageY, time, easing) {
    var newPage = this.pages.getInternalPage(pageX, pageY);
    var scrollEasing = easing || this.options.easing || ease.bounce;
    var x = newPage.x, y = newPage.y;
    var deltaX = x - this.scroll.scroller.scrollBehaviorX.currentPos;
    var deltaY = y - this.scroll.scroller.scrollBehaviorY.currentPos;
    if (!deltaX && !deltaY) {
      this.scroll.scroller.togglePointerEvents(true);
      return;
    }
    time = time === void 0 ? this.getEaseTime(deltaX, deltaY) : time;
    this.scroll.scroller.scrollTo(x, y, time, scrollEasing);
  };
  Slide2.prototype.flickHandler = function() {
    var _a2 = this.scroll.scroller, scrollBehaviorX = _a2.scrollBehaviorX, scrollBehaviorY = _a2.scrollBehaviorY;
    var currentPosX = scrollBehaviorX.currentPos, startPosX = scrollBehaviorX.startPos, directionX = scrollBehaviorX.direction;
    var currentPosY = scrollBehaviorY.currentPos, startPosY = scrollBehaviorY.startPos, directionY = scrollBehaviorY.direction;
    var _b2 = this.pages.currentPage, pageX = _b2.pageX, pageY = _b2.pageY;
    var time = this.getEaseTime(currentPosX - startPosX, currentPosY - startPosY);
    this.goTo(pageX + directionX, pageY + directionY, time);
  };
  Slide2.prototype.getEaseTime = function(deltaX, deltaY) {
    return this.options.speed || Math.max(Math.max(Math.min(Math.abs(deltaX), 1e3), Math.min(Math.abs(deltaY), 1e3)), 300);
  };
  Slide2.prototype.modifyScrollMetaHandler = function(scrollMeta) {
    var _a2 = this.scroll.scroller, scrollBehaviorX = _a2.scrollBehaviorX, scrollBehaviorY = _a2.scrollBehaviorY, animater = _a2.animater;
    var newX = scrollMeta.newX;
    var newY = scrollMeta.newY;
    var newPage = this.satisfyThreshold(newX, newY) || animater.forceStopped ? this.pages.getPageByDirection(this.nearestPage(newX, newY), scrollBehaviorX.direction, scrollBehaviorY.direction) : this.pages.currentPage;
    scrollMeta.time = this.getEaseTime(scrollMeta.newX - newPage.x, scrollMeta.newY - newPage.y);
    scrollMeta.newX = newPage.x;
    scrollMeta.newY = newPage.y;
    scrollMeta.easing = this.options.easing || ease.bounce;
  };
  Slide2.prototype.scrollHandler = function(_a2) {
    var x = _a2.x, y = _a2.y;
    if (this.satisfyThreshold(x, y)) {
      var newPage = this.nearestPage(x, y);
      this.pageWillChangeTo(newPage);
    }
  };
  Slide2.prototype.pageWillChangeTo = function(newPage) {
    var changeToPage = this.pages.getWillChangedPage(newPage);
    if (!samePage(this.willChangeToPage, changeToPage)) {
      this.willChangeToPage = changeToPage;
      this.scroll.trigger(this.scroll.eventTypes.slideWillChange, this.willChangeToPage);
    }
  };
  Slide2.prototype.registerHooks = function(hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  Slide2.prototype.destroy = function() {
    var slideContent = this.scroll.scroller.content;
    var _a2 = this.options, loop = _a2.loop, autoplay = _a2.autoplay;
    if (loop) {
      this.removeClonedSlidePage(slideContent);
    }
    if (autoplay) {
      clearTimeout(this.autoplayTimer);
    }
    this.hooksFn.forEach(function(item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      if (hooks.eventTypes[hooksName]) {
        hooks.off(hooksName, handlerFn);
      }
    });
    this.hooksFn.length = 0;
  };
  Slide2.pluginName = "slide";
  return Slide2;
}();
var sourcePrefix$3 = "plugins.wheel";
var propertiesMap$3 = [{
  key: "wheelTo",
  name: "wheelTo"
}, {
  key: "getSelectedIndex",
  name: "getSelectedIndex"
}, {
  key: "restorePosition",
  name: "restorePosition"
}];
var propertiesConfig$3 = propertiesMap$3.map(function(item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix$3 + "." + item.name
  };
});
var WHEEL_INDEX_CHANGED_EVENT_NAME = "wheelIndexChanged";
var CONSTANTS = {
  rate: 4
};
var Wheel = function() {
  function Wheel2(scroll) {
    this.scroll = scroll;
    this.init();
  }
  Wheel2.prototype.init = function() {
    this.handleBScroll();
    this.handleOptions();
    this.handleHooks();
    this.refreshBoundary();
    this.setSelectedIndex(this.options.selectedIndex);
  };
  Wheel2.prototype.handleBScroll = function() {
    this.scroll.proxy(propertiesConfig$3);
    this.scroll.registerType([WHEEL_INDEX_CHANGED_EVENT_NAME]);
  };
  Wheel2.prototype.handleOptions = function() {
    var userOptions = this.scroll.options.wheel === true ? {} : this.scroll.options.wheel;
    var defaultOptions = {
      wheelWrapperClass: "wheel-scroll",
      wheelItemClass: "wheel-item",
      rotate: 25,
      adjustTime: 400,
      selectedIndex: 0,
      wheelDisabledItemClass: "wheel-disabled-item"
    };
    this.options = extend(defaultOptions, userOptions);
  };
  Wheel2.prototype.handleHooks = function() {
    var _this = this;
    var scroll = this.scroll;
    var scroller = this.scroll.scroller;
    var actionsHandler = scroller.actionsHandler, scrollBehaviorX = scroller.scrollBehaviorX, scrollBehaviorY = scroller.scrollBehaviorY, animater = scroller.animater;
    var prevContent = scroller.content;
    scroll.on(scroll.eventTypes.scrollEnd, function(position) {
      var index2 = _this.findNearestValidWheel(position.y).index;
      if (scroller.animater.forceStopped && !_this.isAdjustingPosition) {
        _this.target = _this.items[index2];
        return true;
      } else {
        _this.setSelectedIndex(index2);
        if (_this.isAdjustingPosition) {
          _this.isAdjustingPosition = false;
        }
      }
    });
    this.scroll.hooks.on(this.scroll.hooks.eventTypes.refresh, function(content) {
      if (content !== prevContent) {
        prevContent = content;
        _this.setSelectedIndex(_this.options.selectedIndex, true);
      }
      _this.rotateX(_this.scroll.y);
      _this.wheelTo(_this.selectedIndex, 0);
    });
    this.scroll.hooks.on(this.scroll.hooks.eventTypes.beforeInitialScrollTo, function(position) {
      position.x = 0;
      position.y = -(_this.selectedIndex * _this.itemHeight);
    });
    scroller.hooks.on(scroller.hooks.eventTypes.checkClick, function() {
      var index2 = HTMLCollectionToArray(_this.items).indexOf(_this.target);
      if (index2 === -1)
        return true;
      _this.wheelTo(index2, _this.options.adjustTime, ease.swipe);
      return true;
    });
    scroller.hooks.on(scroller.hooks.eventTypes.scrollTo, function(endPoint) {
      endPoint.y = _this.findNearestValidWheel(endPoint.y).y;
    });
    scroller.hooks.on(scroller.hooks.eventTypes.minDistanceScroll, function() {
      var animater2 = scroller.animater;
      if (animater2.forceStopped === true) {
        animater2.forceStopped = false;
      }
    });
    scroller.hooks.on(scroller.hooks.eventTypes.scrollToElement, function(el, pos) {
      if (!hasClass(el, _this.options.wheelItemClass)) {
        return true;
      } else {
        pos.top = _this.findNearestValidWheel(pos.top).y;
      }
    });
    actionsHandler.hooks.on(actionsHandler.hooks.eventTypes.beforeStart, function(e) {
      _this.target = e.target;
    });
    scrollBehaviorX.hooks.on(scrollBehaviorX.hooks.eventTypes.computeBoundary, function(boundary) {
      boundary.maxScrollPos = 0;
      boundary.minScrollPos = 0;
    });
    scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.computeBoundary, function(boundary) {
      _this.items = _this.scroll.scroller.content.children;
      _this.checkWheelAllDisabled();
      _this.itemHeight = _this.items.length > 0 ? scrollBehaviorY.contentSize / _this.items.length : 0;
      boundary.maxScrollPos = -_this.itemHeight * (_this.items.length - 1);
      boundary.minScrollPos = 0;
    });
    scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.momentum, function(momentumInfo) {
      momentumInfo.rate = CONSTANTS.rate;
      momentumInfo.destination = _this.findNearestValidWheel(momentumInfo.destination).y;
    });
    scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.end, function(momentumInfo) {
      var validWheel = _this.findNearestValidWheel(scrollBehaviorY.currentPos);
      momentumInfo.destination = validWheel.y;
      momentumInfo.duration = _this.options.adjustTime;
    });
    animater.hooks.on(animater.hooks.eventTypes.time, function(time) {
      _this.transitionDuration(time);
    });
    animater.hooks.on(animater.hooks.eventTypes.timeFunction, function(easing) {
      _this.timeFunction(easing);
    });
    animater.hooks.on(animater.hooks.eventTypes.callStop, function() {
      var index2 = _this.findNearestValidWheel(_this.scroll.y).index;
      _this.isAdjustingPosition = true;
      _this.wheelTo(index2, 0);
    });
    animater.translater.hooks.on(animater.translater.hooks.eventTypes.translate, function(endPoint) {
      _this.rotateX(endPoint.y);
    });
  };
  Wheel2.prototype.refreshBoundary = function() {
    var _a2 = this.scroll.scroller, scrollBehaviorX = _a2.scrollBehaviorX, scrollBehaviorY = _a2.scrollBehaviorY, content = _a2.content;
    scrollBehaviorX.refresh(content);
    scrollBehaviorY.refresh(content);
  };
  Wheel2.prototype.setSelectedIndex = function(index2, contentChanged) {
    if (contentChanged === void 0) {
      contentChanged = false;
    }
    var prevSelectedIndex = this.selectedIndex;
    this.selectedIndex = index2;
    if (prevSelectedIndex !== index2 && !contentChanged) {
      this.scroll.trigger(WHEEL_INDEX_CHANGED_EVENT_NAME, index2);
    }
  };
  Wheel2.prototype.getSelectedIndex = function() {
    return this.selectedIndex;
  };
  Wheel2.prototype.wheelTo = function(index2, time, ease2) {
    if (index2 === void 0) {
      index2 = 0;
    }
    if (time === void 0) {
      time = 0;
    }
    var y = -index2 * this.itemHeight;
    this.scroll.scrollTo(0, y, time, ease2);
  };
  Wheel2.prototype.restorePosition = function() {
    var isPending = this.scroll.pending;
    if (isPending) {
      var selectedIndex = this.getSelectedIndex();
      this.scroll.scroller.animater.clearTimer();
      this.wheelTo(selectedIndex, 0);
    }
  };
  Wheel2.prototype.transitionDuration = function(time) {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].style[style.transitionDuration] = time + "ms";
    }
  };
  Wheel2.prototype.timeFunction = function(easing) {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].style[style.transitionTimingFunction] = easing;
    }
  };
  Wheel2.prototype.rotateX = function(y) {
    var _a2 = this.options.rotate, rotate = _a2 === void 0 ? 25 : _a2;
    for (var i = 0; i < this.items.length; i++) {
      var deg = rotate * (y / this.itemHeight + i);
      var SafeDeg = deg.toFixed(3);
      this.items[i].style[style.transform] = "rotateX(" + SafeDeg + "deg)";
    }
  };
  Wheel2.prototype.findNearestValidWheel = function(y) {
    y = y > 0 ? 0 : y < this.scroll.maxScrollY ? this.scroll.maxScrollY : y;
    var currentIndex = Math.abs(Math.round(-y / this.itemHeight));
    var cacheIndex = currentIndex;
    var items = this.items;
    var wheelDisabledItemClassName = this.options.wheelDisabledItemClass;
    while (currentIndex >= 0) {
      if (!hasClass(items[currentIndex], wheelDisabledItemClassName)) {
        break;
      }
      currentIndex--;
    }
    if (currentIndex < 0) {
      currentIndex = cacheIndex;
      while (currentIndex <= items.length - 1) {
        if (!hasClass(items[currentIndex], wheelDisabledItemClassName)) {
          break;
        }
        currentIndex++;
      }
    }
    if (currentIndex === items.length) {
      currentIndex = cacheIndex;
    }
    return {
      index: this.wheelItemsAllDisabled ? -1 : currentIndex,
      y: -currentIndex * this.itemHeight
    };
  };
  Wheel2.prototype.checkWheelAllDisabled = function() {
    var wheelDisabledItemClassName = this.options.wheelDisabledItemClass;
    var items = this.items;
    this.wheelItemsAllDisabled = true;
    for (var i = 0; i < items.length; i++) {
      if (!hasClass(items[i], wheelDisabledItemClassName)) {
        this.wheelItemsAllDisabled = false;
        break;
      }
    }
  };
  Wheel2.pluginName = "wheel";
  return Wheel2;
}();
var sourcePrefix$2 = "plugins.zoom";
var propertiesMap$2 = [{
  key: "zoomTo",
  name: "zoomTo"
}];
var propertiesConfig$2 = propertiesMap$2.map(function(item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix$2 + "." + item.name
  };
});
var TWO_FINGERS = 2;
var RAW_SCALE = 1;
var Zoom = function() {
  function Zoom2(scroll) {
    this.scroll = scroll;
    this.scale = RAW_SCALE;
    this.prevScale = 1;
    this.init();
  }
  Zoom2.prototype.init = function() {
    this.handleBScroll();
    this.handleOptions();
    this.handleHooks();
    this.tryInitialZoomTo(this.zoomOpt);
  };
  Zoom2.prototype.zoomTo = function(scale, x, y, bounceTime) {
    var _a2 = this.resolveOrigin(x, y), originX = _a2.originX, originY = _a2.originY;
    var origin = {
      x: originX,
      y: originY,
      baseScale: this.scale
    };
    this._doZoomTo(scale, origin, bounceTime, true);
  };
  Zoom2.prototype.handleBScroll = function() {
    this.scroll.proxy(propertiesConfig$2);
    this.scroll.registerType(["beforeZoomStart", "zoomStart", "zooming", "zoomEnd"]);
  };
  Zoom2.prototype.handleOptions = function() {
    var userOptions = this.scroll.options.zoom === true ? {} : this.scroll.options.zoom;
    var defaultOptions = {
      start: 1,
      min: 1,
      max: 4,
      initialOrigin: [0, 0],
      minimalZoomDistance: 5,
      bounceTime: 800
    };
    this.zoomOpt = extend(defaultOptions, userOptions);
  };
  Zoom2.prototype.handleHooks = function() {
    var _this = this;
    var scroll = this.scroll;
    var scroller = this.scroll.scroller;
    this.wrapper = this.scroll.scroller.wrapper;
    this.setTransformOrigin(this.scroll.scroller.content);
    var scrollBehaviorX = scroller.scrollBehaviorX;
    var scrollBehaviorY = scroller.scrollBehaviorY;
    this.hooksFn = [];
    this.registerHooks(scroll.hooks, scroll.hooks.eventTypes.contentChanged, function(content) {
      _this.setTransformOrigin(content);
      _this.scale = RAW_SCALE;
      _this.tryInitialZoomTo(_this.zoomOpt);
    });
    this.registerHooks(scroll.hooks, scroll.hooks.eventTypes.beforeInitialScrollTo, function() {
      if (_this.zoomOpt.start !== RAW_SCALE) {
        return true;
      }
    });
    this.registerHooks(scrollBehaviorX.hooks, scrollBehaviorX.hooks.eventTypes.beforeComputeBoundary, function() {
      var contentSize = getRect(_this.scroll.scroller.content);
      scrollBehaviorX.contentSize = Math.floor(contentSize.width * _this.scale);
    });
    this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.beforeComputeBoundary, function() {
      var contentSize = getRect(_this.scroll.scroller.content);
      scrollBehaviorY.contentSize = Math.floor(contentSize.height * _this.scale);
    });
    this.registerHooks(scroller.actions.hooks, scroller.actions.hooks.eventTypes.start, function(e) {
      var numberOfFingers = e.touches && e.touches.length || 0;
      _this.fingersOperation(numberOfFingers);
      if (numberOfFingers === TWO_FINGERS) {
        _this.zoomStart(e);
      }
    });
    this.registerHooks(scroller.actions.hooks, scroller.actions.hooks.eventTypes.beforeMove, function(e) {
      var numberOfFingers = e.touches && e.touches.length || 0;
      _this.fingersOperation(numberOfFingers);
      if (numberOfFingers === TWO_FINGERS) {
        _this.zoom(e);
        return true;
      }
    });
    this.registerHooks(scroller.actions.hooks, scroller.actions.hooks.eventTypes.beforeEnd, function(e) {
      var numberOfFingers = _this.fingersOperation();
      if (numberOfFingers === TWO_FINGERS) {
        _this.zoomEnd();
        return true;
      }
    });
    this.registerHooks(scroller.translater.hooks, scroller.translater.hooks.eventTypes.beforeTranslate, function(transformStyle, point) {
      var scale = point.scale ? point.scale : _this.prevScale;
      _this.prevScale = scale;
      transformStyle.push("scale(" + scale + ")");
    });
    this.registerHooks(scroller.hooks, scroller.hooks.eventTypes.scrollEnd, function() {
      if (_this.fingersOperation() === TWO_FINGERS) {
        _this.scroll.trigger(_this.scroll.eventTypes.zoomEnd, {
          scale: _this.scale
        });
      }
    });
    this.registerHooks(this.scroll.hooks, "destroy", this.destroy);
  };
  Zoom2.prototype.setTransformOrigin = function(content) {
    content.style[style.transformOrigin] = "0 0";
  };
  Zoom2.prototype.tryInitialZoomTo = function(options) {
    var start = options.start, initialOrigin = options.initialOrigin;
    var _a2 = this.scroll.scroller, scrollBehaviorX = _a2.scrollBehaviorX, scrollBehaviorY = _a2.scrollBehaviorY;
    if (start !== RAW_SCALE) {
      this.resetBoundaries([scrollBehaviorX, scrollBehaviorY]);
      this.zoomTo(start, initialOrigin[0], initialOrigin[1], 0);
    }
  };
  Zoom2.prototype.fingersOperation = function(amounts) {
    if (typeof amounts === "number") {
      this.numberOfFingers = amounts;
    } else {
      return this.numberOfFingers;
    }
  };
  Zoom2.prototype._doZoomTo = function(scale, origin, time, useCurrentPos) {
    var _this = this;
    if (time === void 0) {
      time = this.zoomOpt.bounceTime;
    }
    if (useCurrentPos === void 0) {
      useCurrentPos = false;
    }
    var _a2 = this.zoomOpt, min = _a2.min, max = _a2.max;
    var fromScale = this.scale;
    var toScale = between(scale, min, max);
    (function() {
      if (time === 0) {
        _this.scroll.trigger(_this.scroll.eventTypes.zooming, {
          scale: toScale
        });
        return;
      }
      if (time > 0) {
        var timer_1;
        var startTime_1 = getNow();
        var endTime_1 = startTime_1 + time;
        var scheduler_1 = function() {
          var now = getNow();
          if (now >= endTime_1) {
            _this.scroll.trigger(_this.scroll.eventTypes.zooming, {
              scale: toScale
            });
            cancelAnimationFrame(timer_1);
            return;
          }
          var ratio = ease.bounce.fn((now - startTime_1) / time);
          var currentScale = ratio * (toScale - fromScale) + fromScale;
          _this.scroll.trigger(_this.scroll.eventTypes.zooming, {
            scale: currentScale
          });
          timer_1 = requestAnimationFrame$1(scheduler_1);
        };
        scheduler_1();
      }
    })();
    this.fingersOperation(2);
    this._zoomTo(toScale, fromScale, origin, time, useCurrentPos);
  };
  Zoom2.prototype._zoomTo = function(toScale, fromScale, origin, time, useCurrentPos) {
    if (useCurrentPos === void 0) {
      useCurrentPos = false;
    }
    var ratio = toScale / origin.baseScale;
    this.setScale(toScale);
    var scroller = this.scroll.scroller;
    var scrollBehaviorX = scroller.scrollBehaviorX, scrollBehaviorY = scroller.scrollBehaviorY;
    this.resetBoundaries([scrollBehaviorX, scrollBehaviorY]);
    var newX = this.getNewPos(origin.x, ratio, scrollBehaviorX, true, useCurrentPos);
    var newY = this.getNewPos(origin.y, ratio, scrollBehaviorY, true, useCurrentPos);
    if (scrollBehaviorX.currentPos !== Math.round(newX) || scrollBehaviorY.currentPos !== Math.round(newY) || toScale !== fromScale) {
      scroller.scrollTo(newX, newY, time, ease.bounce, {
        start: {
          scale: fromScale
        },
        end: {
          scale: toScale
        }
      });
    }
  };
  Zoom2.prototype.resolveOrigin = function(x, y) {
    var _a2 = this.scroll.scroller, scrollBehaviorX = _a2.scrollBehaviorX, scrollBehaviorY = _a2.scrollBehaviorY;
    var resolveFormula = {
      left: function() {
        return 0;
      },
      top: function() {
        return 0;
      },
      right: function() {
        return scrollBehaviorX.contentSize;
      },
      bottom: function() {
        return scrollBehaviorY.contentSize;
      },
      center: function(index2) {
        var baseSize = index2 === 0 ? scrollBehaviorX.contentSize : scrollBehaviorY.contentSize;
        return baseSize / 2;
      }
    };
    return {
      originX: typeof x === "number" ? x : resolveFormula[x](0),
      originY: typeof y === "number" ? y : resolveFormula[y](1)
    };
  };
  Zoom2.prototype.zoomStart = function(e) {
    var firstFinger = e.touches[0];
    var secondFinger = e.touches[1];
    this.startDistance = this.getFingerDistance(e);
    this.startScale = this.scale;
    var _a2 = offsetToBody(this.wrapper), left = _a2.left, top = _a2.top;
    this.origin = {
      x: Math.abs(firstFinger.pageX + secondFinger.pageX) / 2 + left - this.scroll.x,
      y: Math.abs(firstFinger.pageY + secondFinger.pageY) / 2 + top - this.scroll.y,
      baseScale: this.startScale
    };
    this.scroll.trigger(this.scroll.eventTypes.beforeZoomStart);
  };
  Zoom2.prototype.zoom = function(e) {
    var currentDistance = this.getFingerDistance(e);
    if (!this.zoomed && Math.abs(currentDistance - this.startDistance) < this.zoomOpt.minimalZoomDistance) {
      return;
    }
    var endScale = this.dampingScale(currentDistance / this.startDistance * this.startScale);
    var ratio = endScale / this.startScale;
    this.setScale(endScale);
    if (!this.zoomed) {
      this.zoomed = true;
      this.scroll.trigger(this.scroll.eventTypes.zoomStart);
    }
    var scroller = this.scroll.scroller;
    var scrollBehaviorX = scroller.scrollBehaviorX, scrollBehaviorY = scroller.scrollBehaviorY;
    var x = this.getNewPos(this.origin.x, ratio, scrollBehaviorX, false, false);
    var y = this.getNewPos(this.origin.y, ratio, scrollBehaviorY, false, false);
    this.scroll.trigger(this.scroll.eventTypes.zooming, {
      scale: this.scale
    });
    scroller.translater.translate({
      x,
      y,
      scale: endScale
    });
  };
  Zoom2.prototype.zoomEnd = function() {
    if (!this.zoomed)
      return;
    if (this.shouldRebound()) {
      this._doZoomTo(this.scale, this.origin, this.zoomOpt.bounceTime);
      return;
    }
    this.scroll.trigger(this.scroll.eventTypes.zoomEnd, {
      scale: this.scale
    });
  };
  Zoom2.prototype.getFingerDistance = function(e) {
    var firstFinger = e.touches[0];
    var secondFinger = e.touches[1];
    var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);
    var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);
    return getDistance(deltaX, deltaY);
  };
  Zoom2.prototype.shouldRebound = function() {
    var _a2 = this.zoomOpt, min = _a2.min, max = _a2.max;
    var currentScale = this.scale;
    if (currentScale !== between(currentScale, min, max)) {
      return true;
    }
    var _b2 = this.scroll.scroller, scrollBehaviorX = _b2.scrollBehaviorX, scrollBehaviorY = _b2.scrollBehaviorY;
    this.resetBoundaries([scrollBehaviorX, scrollBehaviorY]);
    var xInBoundary = scrollBehaviorX.checkInBoundary().inBoundary;
    var yInBoundary = scrollBehaviorX.checkInBoundary().inBoundary;
    return !(xInBoundary && yInBoundary);
  };
  Zoom2.prototype.dampingScale = function(scale) {
    var _a2 = this.zoomOpt, min = _a2.min, max = _a2.max;
    if (scale < min) {
      scale = 0.5 * min * Math.pow(2, scale / min);
    } else if (scale > max) {
      scale = 2 * max * Math.pow(0.5, max / scale);
    }
    return scale;
  };
  Zoom2.prototype.setScale = function(scale) {
    this.scale = scale;
  };
  Zoom2.prototype.resetBoundaries = function(scrollBehaviorPairs) {
    scrollBehaviorPairs.forEach(function(behavior) {
      return behavior.computeBoundary();
    });
  };
  Zoom2.prototype.getNewPos = function(origin, lastScale, scrollBehavior, shouldInBoundary, useCurrentPos) {
    if (useCurrentPos === void 0) {
      useCurrentPos = false;
    }
    var newPos = origin - origin * lastScale + (useCurrentPos ? scrollBehavior.currentPos : scrollBehavior.startPos);
    if (shouldInBoundary) {
      newPos = between(newPos, scrollBehavior.maxScrollPos, scrollBehavior.minScrollPos);
    }
    return newPos > 0 ? Math.floor(newPos) : Math.ceil(newPos);
  };
  Zoom2.prototype.registerHooks = function(hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  Zoom2.prototype.destroy = function() {
    this.hooksFn.forEach(function(item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
    this.hooksFn.length = 0;
  };
  Zoom2.pluginName = "zoom";
  return Zoom2;
}();
var BScrollFamily = function() {
  function BScrollFamily2(scroll) {
    this.ancestors = [];
    this.descendants = [];
    this.hooksManager = [];
    this.analyzed = false;
    this.selfScroll = scroll;
  }
  BScrollFamily2.create = function(scroll) {
    return new BScrollFamily2(scroll);
  };
  BScrollFamily2.prototype.hasAncestors = function(bscrollFamily) {
    var index2 = findIndex(this.ancestors, function(_a2) {
      var item = _a2[0];
      return item === bscrollFamily;
    });
    return index2 > -1;
  };
  BScrollFamily2.prototype.hasDescendants = function(bscrollFamily) {
    var index2 = findIndex(this.descendants, function(_a2) {
      var item = _a2[0];
      return item === bscrollFamily;
    });
    return index2 > -1;
  };
  BScrollFamily2.prototype.addAncestor = function(bscrollFamily, distance) {
    var ancestors = this.ancestors;
    ancestors.push([bscrollFamily, distance]);
    ancestors.sort(function(a, b) {
      return a[1] - b[1];
    });
  };
  BScrollFamily2.prototype.addDescendant = function(bscrollFamily, distance) {
    var descendants = this.descendants;
    descendants.push([bscrollFamily, distance]);
    descendants.sort(function(a, b) {
      return a[1] - b[1];
    });
  };
  BScrollFamily2.prototype.removeAncestor = function(bscrollFamily) {
    var ancestors = this.ancestors;
    if (ancestors.length) {
      var index2 = findIndex(this.ancestors, function(_a2) {
        var item = _a2[0];
        return item === bscrollFamily;
      });
      if (index2 > -1) {
        return ancestors.splice(index2, 1);
      }
    }
  };
  BScrollFamily2.prototype.removeDescendant = function(bscrollFamily) {
    var descendants = this.descendants;
    if (descendants.length) {
      var index2 = findIndex(this.descendants, function(_a2) {
        var item = _a2[0];
        return item === bscrollFamily;
      });
      if (index2 > -1) {
        return descendants.splice(index2, 1);
      }
    }
  };
  BScrollFamily2.prototype.registerHooks = function(hook, eventType, handler) {
    hook.on(eventType, handler);
    this.hooksManager.push([hook, eventType, handler]);
  };
  BScrollFamily2.prototype.setAnalyzed = function(flag) {
    if (flag === void 0) {
      flag = false;
    }
    this.analyzed = flag;
  };
  BScrollFamily2.prototype.purge = function() {
    var _this = this;
    this.ancestors.forEach(function(_a2) {
      var bscrollFamily = _a2[0];
      bscrollFamily.removeDescendant(_this);
    });
    this.descendants.forEach(function(_a2) {
      var bscrollFamily = _a2[0];
      bscrollFamily.removeAncestor(_this);
    });
    this.hooksManager.forEach(function(_a2) {
      var hooks = _a2[0], eventType = _a2[1], handler = _a2[2];
      hooks.off(eventType, handler);
    });
    this.hooksManager = [];
  };
  return BScrollFamily2;
}();
var sourcePrefix$1 = "plugins.nestedScroll";
var propertiesMap$1 = [{
  key: "purgeNestedScroll",
  name: "purgeNestedScroll"
}];
var propertiesConfig$1 = propertiesMap$1.map(function(item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix$1 + "." + item.name
  };
});
var DEFAUL_GROUP_ID = "INTERNAL_NESTED_SCROLL";
var forceScrollStopHandler = function(scrolls) {
  scrolls.forEach(function(scroll) {
    if (scroll.pending) {
      scroll.stop();
      scroll.resetPosition();
    }
  });
};
var enableScrollHander = function(scrolls) {
  scrolls.forEach(function(scroll) {
    scroll.enable();
  });
};
var disableScrollHander = function(scrolls, currentScroll) {
  scrolls.forEach(function(scroll) {
    if (scroll.hasHorizontalScroll === currentScroll.hasHorizontalScroll || scroll.hasVerticalScroll === currentScroll.hasVerticalScroll) {
      scroll.disable();
    }
  });
};
var syncTouchstartData = function(scrolls) {
  scrolls.forEach(function(scroll) {
    var _a2 = scroll.scroller, actions = _a2.actions, scrollBehaviorX = _a2.scrollBehaviorX, scrollBehaviorY = _a2.scrollBehaviorY;
    actions.fingerMoved = true;
    actions.contentMoved = false;
    actions.directionLockAction.reset();
    scrollBehaviorX.start();
    scrollBehaviorY.start();
    scrollBehaviorX.resetStartPos();
    scrollBehaviorY.resetStartPos();
    actions.startTime = +new Date();
  });
};
var isOutOfBoundary = function(scroll) {
  var hasHorizontalScroll = scroll.hasHorizontalScroll, hasVerticalScroll = scroll.hasVerticalScroll, x = scroll.x, y = scroll.y, minScrollX = scroll.minScrollX, maxScrollX = scroll.maxScrollX, minScrollY = scroll.minScrollY, maxScrollY = scroll.maxScrollY, movingDirectionX = scroll.movingDirectionX, movingDirectionY = scroll.movingDirectionY;
  var ret = false;
  var outOfLeftBoundary = x >= minScrollX && movingDirectionX === -1;
  var outOfRightBoundary = x <= maxScrollX && movingDirectionX === 1;
  var outOfTopBoundary = y >= minScrollY && movingDirectionY === -1;
  var outOfBottomBoundary = y <= maxScrollY && movingDirectionY === 1;
  if (hasVerticalScroll) {
    ret = outOfTopBoundary || outOfBottomBoundary;
  } else if (hasHorizontalScroll) {
    ret = outOfLeftBoundary || outOfRightBoundary;
  }
  return ret;
};
var isResettingPosition = function(scroll) {
  var hasHorizontalScroll = scroll.hasHorizontalScroll, hasVerticalScroll = scroll.hasVerticalScroll, x = scroll.x, y = scroll.y, minScrollX = scroll.minScrollX, maxScrollX = scroll.maxScrollX, minScrollY = scroll.minScrollY, maxScrollY = scroll.maxScrollY;
  var ret = false;
  var outOfLeftBoundary = x > minScrollX;
  var outOfRightBoundary = x < maxScrollX;
  var outOfTopBoundary = y > minScrollY;
  var outOfBottomBoundary = y < maxScrollY;
  if (hasVerticalScroll) {
    ret = outOfTopBoundary || outOfBottomBoundary;
  } else if (hasHorizontalScroll) {
    ret = outOfLeftBoundary || outOfRightBoundary;
  }
  return ret;
};
var resetPositionHandler = function(scroll) {
  scroll.scroller.reflow();
  scroll.resetPosition(0);
};
var calculateDistance = function(childNode, parentNode) {
  var distance = 0;
  var parent = childNode.parentNode;
  while (parent && parent !== parentNode) {
    distance++;
    parent = parent.parentNode;
  }
  return distance;
};
var NestedScroll = function() {
  function NestedScroll2(scroll) {
    var groupId = this.handleOptions(scroll);
    var instance = NestedScroll2.instancesMap[groupId];
    if (!instance) {
      instance = NestedScroll2.instancesMap[groupId] = this;
      instance.store = [];
      instance.hooksFn = [];
    }
    instance.init(scroll);
    return instance;
  }
  NestedScroll2.getAllNestedScrolls = function() {
    var instancesMap = NestedScroll2.instancesMap;
    return Object.keys(instancesMap).map(function(key) {
      return instancesMap[key];
    });
  };
  NestedScroll2.purgeAllNestedScrolls = function() {
    var nestedScrolls = NestedScroll2.getAllNestedScrolls();
    nestedScrolls.forEach(function(ns) {
      return ns.purgeNestedScroll();
    });
  };
  NestedScroll2.prototype.handleOptions = function(scroll) {
    var userOptions = scroll.options.nestedScroll === true ? {} : scroll.options.nestedScroll;
    var defaultOptions = {
      groupId: DEFAUL_GROUP_ID
    };
    this.options = extend(defaultOptions, userOptions);
    var groupIdType = typeof this.options.groupId;
    if (groupIdType !== "string" && groupIdType !== "number") {
      warn("groupId must be string or number for NestedScroll plugin");
    }
    return this.options.groupId;
  };
  NestedScroll2.prototype.init = function(scroll) {
    scroll.proxy(propertiesConfig$1);
    this.addBScroll(scroll);
    this.buildBScrollGraph();
    this.analyzeBScrollGraph();
    this.ensureEventInvokeSequence();
    this.handleHooks(scroll);
  };
  NestedScroll2.prototype.handleHooks = function(scroll) {
    var _this = this;
    this.registerHooks(scroll.hooks, scroll.hooks.eventTypes.destroy, function() {
      _this.deleteScroll(scroll);
    });
  };
  NestedScroll2.prototype.deleteScroll = function(scroll) {
    var wrapper = scroll.wrapper;
    wrapper.isBScrollContainer = void 0;
    var store = this.store;
    var hooksFn = this.hooksFn;
    var i = findIndex(store, function(bscrollFamily2) {
      return bscrollFamily2.selfScroll === scroll;
    });
    if (i > -1) {
      var bscrollFamily = store[i];
      bscrollFamily.purge();
      store.splice(i, 1);
    }
    var k = findIndex(hooksFn, function(_a3) {
      var hooks2 = _a3[0];
      return hooks2 === scroll.hooks;
    });
    if (k > -1) {
      var _a2 = hooksFn[k], hooks = _a2[0], eventType = _a2[1], handler = _a2[2];
      hooks.off(eventType, handler);
      hooksFn.splice(k, 1);
    }
  };
  NestedScroll2.prototype.addBScroll = function(scroll) {
    this.store.push(BScrollFamily.create(scroll));
  };
  NestedScroll2.prototype.buildBScrollGraph = function() {
    var store = this.store;
    var bf1;
    var bf2;
    var wrapper1;
    var wrapper2;
    var len = this.store.length;
    for (var i = 0; i < len; i++) {
      bf1 = store[i];
      wrapper1 = bf1.selfScroll.wrapper;
      for (var j = 0; j < len; j++) {
        bf2 = store[j];
        wrapper2 = bf2.selfScroll.wrapper;
        if (bf1 === bf2)
          continue;
        if (!wrapper1.contains(wrapper2))
          continue;
        var distance = calculateDistance(wrapper2, wrapper1);
        if (!bf1.hasDescendants(bf2)) {
          bf1.addDescendant(bf2, distance);
        }
        if (!bf2.hasAncestors(bf1)) {
          bf2.addAncestor(bf1, distance);
        }
      }
    }
  };
  NestedScroll2.prototype.analyzeBScrollGraph = function() {
    this.store.forEach(function(bscrollFamily) {
      if (bscrollFamily.analyzed) {
        return;
      }
      var ancestors = bscrollFamily.ancestors, descendants = bscrollFamily.descendants, currentScroll = bscrollFamily.selfScroll;
      var beforeScrollStartHandler = function() {
        var ancestorScrolls = ancestors.map(function(_a2) {
          var bscrollFamily2 = _a2[0];
          return bscrollFamily2.selfScroll;
        });
        var descendantScrolls = descendants.map(function(_a2) {
          var bscrollFamily2 = _a2[0];
          return bscrollFamily2.selfScroll;
        });
        forceScrollStopHandler(__spreadArrays(ancestorScrolls, descendantScrolls));
        if (isResettingPosition(currentScroll)) {
          resetPositionHandler(currentScroll);
        }
        syncTouchstartData(ancestorScrolls);
        disableScrollHander(ancestorScrolls, currentScroll);
      };
      var touchEndHandler = function() {
        var ancestorScrolls = ancestors.map(function(_a2) {
          var bscrollFamily2 = _a2[0];
          return bscrollFamily2.selfScroll;
        });
        var descendantScrolls = descendants.map(function(_a2) {
          var bscrollFamily2 = _a2[0];
          return bscrollFamily2.selfScroll;
        });
        enableScrollHander(__spreadArrays(ancestorScrolls, descendantScrolls));
      };
      bscrollFamily.registerHooks(currentScroll, currentScroll.eventTypes.beforeScrollStart, beforeScrollStartHandler);
      bscrollFamily.registerHooks(currentScroll, currentScroll.eventTypes.touchEnd, touchEndHandler);
      var selfActionsHooks = currentScroll.scroller.actions.hooks;
      bscrollFamily.registerHooks(selfActionsHooks, selfActionsHooks.eventTypes.detectMovingDirection, function() {
        var ancestorScrolls = ancestors.map(function(_a2) {
          var bscrollFamily2 = _a2[0];
          return bscrollFamily2.selfScroll;
        });
        var parentScroll = ancestorScrolls[0];
        var otherAncestorScrolls = ancestorScrolls.slice(1);
        var contentMoved = currentScroll.scroller.actions.contentMoved;
        var isTopScroll = ancestorScrolls.length === 0;
        if (contentMoved) {
          disableScrollHander(ancestorScrolls, currentScroll);
        } else if (!isTopScroll) {
          if (isOutOfBoundary(currentScroll)) {
            disableScrollHander([currentScroll], currentScroll);
            if (parentScroll) {
              enableScrollHander([parentScroll]);
            }
            disableScrollHander(otherAncestorScrolls, currentScroll);
            return true;
          }
        }
      });
      bscrollFamily.setAnalyzed(true);
    });
  };
  NestedScroll2.prototype.ensureEventInvokeSequence = function() {
    var copied = this.store.slice();
    var sequencedScroll = copied.sort(function(a, b) {
      return a.descendants.length - b.descendants.length;
    });
    sequencedScroll.forEach(function(bscrollFamily) {
      var scroll = bscrollFamily.selfScroll;
      scroll.scroller.actionsHandler.rebindDOMEvents();
    });
  };
  NestedScroll2.prototype.registerHooks = function(hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  NestedScroll2.prototype.purgeNestedScroll = function() {
    var groupId = this.options.groupId;
    this.store.forEach(function(bscrollFamily) {
      bscrollFamily.purge();
    });
    this.store = [];
    this.hooksFn.forEach(function(_a2) {
      var hooks = _a2[0], eventType = _a2[1], handler = _a2[2];
      hooks.off(eventType, handler);
    });
    this.hooksFn = [];
    delete NestedScroll2.instancesMap[groupId];
  };
  NestedScroll2.pluginName = "nestedScroll";
  NestedScroll2.instancesMap = {};
  return NestedScroll2;
}();
var PRE_NUM = 10;
var POST_NUM = 30;
var IndexCalculator = function() {
  function IndexCalculator2(wrapperHeight, tombstoneHeight) {
    this.wrapperHeight = wrapperHeight;
    this.tombstoneHeight = tombstoneHeight;
    this.lastDirection = 1;
    this.lastPos = 0;
  }
  IndexCalculator2.prototype.calculate = function(pos, list) {
    var offset2 = pos - this.lastPos;
    this.lastPos = pos;
    var direction = this.getDirection(offset2);
    var start = this.calculateIndex(0, pos, list);
    var end = this.calculateIndex(start, pos + this.wrapperHeight, list);
    if (direction === 1) {
      start -= PRE_NUM;
      end += POST_NUM;
    } else {
      start -= POST_NUM;
      end += PRE_NUM;
    }
    if (start < 0) {
      start = 0;
    }
    return {
      start,
      end
    };
  };
  IndexCalculator2.prototype.getDirection = function(offset2) {
    var direction;
    if (offset2 > 0) {
      direction = 1;
    } else if (offset2 < 0) {
      direction = 0;
    } else {
      return this.lastDirection;
    }
    this.lastDirection = direction;
    return direction;
  };
  IndexCalculator2.prototype.calculateIndex = function(start, offset2, list) {
    if (offset2 <= 0) {
      return start;
    }
    var i = start;
    var startPos = list[i] && list[i].pos !== -1 ? list[i].pos : 0;
    var lastPos = startPos;
    var tombstone = 0;
    while (i < list.length && list[i].pos < offset2) {
      lastPos = list[i].pos;
      i++;
    }
    if (i === list.length) {
      tombstone = Math.floor((offset2 - lastPos) / this.tombstoneHeight);
    }
    i += tombstone;
    return i;
  };
  IndexCalculator2.prototype.resetState = function() {
    this.lastDirection = 1;
    this.lastPos = 0;
  };
  return IndexCalculator2;
}();
var ListItem$1 = function() {
  function ListItem2() {
    this.data = null;
    this.dom = null;
    this.tombstone = null;
    this.width = 0;
    this.height = 0;
    this.pos = 0;
  }
  return ListItem2;
}();
var DataManager = function() {
  function DataManager2(list, fetchFn, onFetchFinish) {
    this.fetchFn = fetchFn;
    this.onFetchFinish = onFetchFinish;
    this.loadedNum = 0;
    this.fetching = false;
    this.hasMore = true;
    this.list = list || [];
  }
  DataManager2.prototype.update = function(end) {
    return __awaiter(this, void 0, void 0, function() {
      var len;
      return __generator(this, function(_a2) {
        if (!this.hasMore) {
          end = Math.min(end, this.list.length);
        }
        if (end > this.list.length) {
          len = end - this.list.length;
          this.addEmptyData(len);
        }
        return [
          2,
          this.checkToFetch(end)
        ];
      });
    });
  };
  DataManager2.prototype.add = function(data) {
    for (var i = 0; i < data.length; i++) {
      if (!this.list[this.loadedNum]) {
        this.list[this.loadedNum] = {
          data: data[i]
        };
      } else {
        this.list[this.loadedNum] = __assign(__assign({}, this.list[this.loadedNum]), {
          data: data[i]
        });
      }
      this.loadedNum++;
    }
    return this.list;
  };
  DataManager2.prototype.addEmptyData = function(len) {
    for (var i = 0; i < len; i++) {
      this.list.push(new ListItem$1());
    }
    return this.list;
  };
  DataManager2.prototype.fetch = function(len) {
    return __awaiter(this, void 0, void 0, function() {
      var data;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            if (this.fetching) {
              return [
                2,
                []
              ];
            }
            this.fetching = true;
            return [
              4,
              this.fetchFn(len)
            ];
          case 1:
            data = _a2.sent();
            this.fetching = false;
            return [
              2,
              data
            ];
        }
      });
    });
  };
  DataManager2.prototype.checkToFetch = function(end) {
    return __awaiter(this, void 0, void 0, function() {
      var min, newData, currentEnd;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            if (!this.hasMore) {
              return [
                2
              ];
            }
            if (end <= this.loadedNum) {
              return [
                2
              ];
            }
            min = end - this.loadedNum;
            return [
              4,
              this.fetch(min)
            ];
          case 1:
            newData = _a2.sent();
            if (newData instanceof Array && newData.length) {
              this.add(newData);
              currentEnd = this.onFetchFinish(this.list, true);
              return [
                2,
                this.checkToFetch(currentEnd)
              ];
            } else if (typeof newData === "boolean" && newData === false) {
              this.hasMore = false;
              this.list.splice(this.loadedNum);
              this.onFetchFinish(this.list, false);
            }
            return [
              2
            ];
        }
      });
    });
  };
  DataManager2.prototype.getList = function() {
    return this.list;
  };
  DataManager2.prototype.resetState = function() {
    this.loadedNum = 0;
    this.fetching = false;
    this.hasMore = true;
    this.list = [];
  };
  return DataManager2;
}();
var Tombstone = function() {
  function Tombstone2(create) {
    this.create = create;
    this.cached = [];
    this.width = 0;
    this.height = 0;
    this.initialed = false;
    this.getSize();
  }
  Tombstone2.isTombstone = function(el) {
    if (el && el.classList) {
      return el.classList.contains("tombstone");
    }
    return false;
  };
  Tombstone2.prototype.getSize = function() {
    if (!this.initialed) {
      var tombstone = this.create();
      tombstone.style.position = "absolute";
      document.body.appendChild(tombstone);
      tombstone.style.display = "";
      this.height = tombstone.offsetHeight;
      this.width = tombstone.offsetWidth;
      document.body.removeChild(tombstone);
      this.cached.push(tombstone);
    }
  };
  Tombstone2.prototype.getOne = function() {
    var tombstone = this.cached.pop();
    if (tombstone) {
      var tombstoneStyle = tombstone.style;
      tombstoneStyle.display = "";
      tombstoneStyle.opacity = "1";
      tombstoneStyle[style.transform] = "";
      tombstoneStyle[style.transition] = "";
      return tombstone;
    }
    return this.create();
  };
  Tombstone2.prototype.recycle = function(tombstones) {
    for (var _i = 0, tombstones_1 = tombstones; _i < tombstones_1.length; _i++) {
      var tombstone = tombstones_1[_i];
      tombstone.style.display = "none";
      this.cached.push(tombstone);
    }
    return this.cached;
  };
  Tombstone2.prototype.recycleOne = function(tombstone) {
    this.cached.push(tombstone);
    return this.cached;
  };
  return Tombstone2;
}();
var ANIMATION_DURATION_MS = 200;
var DomManager = function() {
  function DomManager2(content, renderFn, tombstone) {
    this.renderFn = renderFn;
    this.tombstone = tombstone;
    this.unusedDom = [];
    this.timers = [];
    this.setContent(content);
  }
  DomManager2.prototype.update = function(list, start, end) {
    if (start >= list.length) {
      start = list.length - 1;
    }
    if (end > list.length) {
      end = list.length;
    }
    this.collectUnusedDom(list, start, end);
    this.createDom(list, start, end);
    this.cacheHeight(list, start, end);
    var _a2 = this.positionDom(list, start, end), startPos = _a2.startPos, startDelta = _a2.startDelta, endPos = _a2.endPos;
    return {
      start,
      startPos,
      startDelta,
      end,
      endPos
    };
  };
  DomManager2.prototype.collectUnusedDom = function(list, start, end) {
    for (var i = 0; i < list.length; i++) {
      if (i === start) {
        i = end - 1;
        continue;
      }
      if (list[i].dom) {
        var dom = list[i].dom;
        if (Tombstone.isTombstone(dom)) {
          this.tombstone.recycleOne(dom);
          dom.style.display = "none";
        } else {
          this.unusedDom.push(dom);
        }
        list[i].dom = null;
      }
    }
    return list;
  };
  DomManager2.prototype.createDom = function(list, start, end) {
    for (var i = start; i < end; i++) {
      var dom = list[i].dom;
      var data = list[i].data;
      if (dom) {
        if (Tombstone.isTombstone(dom) && data) {
          list[i].tombstone = dom;
          list[i].dom = null;
        } else {
          continue;
        }
      }
      dom = data ? this.renderFn(data, this.unusedDom.pop()) : this.tombstone.getOne();
      dom.style.position = "absolute";
      list[i].dom = dom;
      list[i].pos = -1;
      this.content.appendChild(dom);
    }
  };
  DomManager2.prototype.cacheHeight = function(list, start, end) {
    for (var i = start; i < end; i++) {
      if (list[i].data && !list[i].height) {
        list[i].height = list[i].dom.offsetHeight;
      }
    }
  };
  DomManager2.prototype.positionDom = function(list, start, end) {
    var _this = this;
    var tombstoneEles = [];
    var _a2 = this.getStartPos(list, start, end), startPos = _a2.start, startDelta = _a2.delta;
    var pos = startPos;
    for (var i = start; i < end; i++) {
      var tombstone = list[i].tombstone;
      if (tombstone) {
        var tombstoneStyle = tombstone.style;
        tombstoneStyle[style.transition] = cssVendor + "transform " + ANIMATION_DURATION_MS + "ms, opacity " + ANIMATION_DURATION_MS + "ms";
        tombstoneStyle[style.transform] = "translateY(" + pos + "px)";
        tombstoneStyle.opacity = "0";
        list[i].tombstone = null;
        tombstoneEles.push(tombstone);
      }
      if (list[i].dom && list[i].pos !== pos) {
        list[i].dom.style[style.transform] = "translateY(" + pos + "px)";
        list[i].pos = pos;
      }
      pos += list[i].height || this.tombstone.height;
    }
    var timerId = window.setTimeout(function() {
      _this.tombstone.recycle(tombstoneEles);
    }, ANIMATION_DURATION_MS);
    this.timers.push(timerId);
    return {
      startPos,
      startDelta,
      endPos: pos
    };
  };
  DomManager2.prototype.getStartPos = function(list, start, end) {
    if (list[start] && list[start].pos !== -1) {
      return {
        start: list[start].pos,
        delta: 0
      };
    }
    var pos = list[0].pos === -1 ? 0 : list[0].pos;
    for (var i_1 = 0; i_1 < start; i_1++) {
      pos += list[i_1].height || this.tombstone.height;
    }
    var originPos = pos;
    var i;
    for (i = start; i < end; i++) {
      if (!Tombstone.isTombstone(list[i].dom) && list[i].pos !== -1) {
        pos = list[i].pos;
        break;
      }
    }
    var x = i;
    if (x < end) {
      while (x > start) {
        pos -= list[x - 1].height;
        x--;
      }
    }
    var delta = originPos - pos;
    return {
      start: pos,
      delta
    };
  };
  DomManager2.prototype.removeTombstone = function() {
    var tombstones = this.content.querySelectorAll(".tombstone");
    for (var i = tombstones.length - 1; i >= 0; i--) {
      this.content.removeChild(tombstones[i]);
    }
  };
  DomManager2.prototype.setContent = function(content) {
    if (content !== this.content) {
      this.content = content;
    }
  };
  DomManager2.prototype.destroy = function() {
    this.removeTombstone();
    this.timers.forEach(function(id) {
      clearTimeout(id);
    });
  };
  DomManager2.prototype.resetState = function() {
    this.destroy();
    this.timers = [];
    this.unusedDom = [];
  };
  return DomManager2;
}();
var EXTRA_SCROLL_Y = -2e3;
var InfinityScroll = function() {
  function InfinityScroll2(scroll) {
    this.scroll = scroll;
    this.start = 0;
    this.end = 0;
    this.init();
  }
  InfinityScroll2.prototype.init = function() {
    var _this = this;
    this.handleOptions();
    var _a2 = this.options, fetchFn = _a2.fetch, renderFn = _a2.render, createTombstoneFn = _a2.createTombstone;
    this.tombstone = new Tombstone(createTombstoneFn);
    this.indexCalculator = new IndexCalculator(this.scroll.scroller.scrollBehaviorY.wrapperSize, this.tombstone.height);
    this.domManager = new DomManager(this.scroll.scroller.content, renderFn, this.tombstone);
    this.dataManager = new DataManager([], fetchFn, this.onFetchFinish.bind(this));
    this.scroll.on(this.scroll.eventTypes.destroy, this.destroy, this);
    this.scroll.on(this.scroll.eventTypes.scroll, this.update, this);
    this.scroll.on(this.scroll.eventTypes.contentChanged, function(content) {
      _this.domManager.setContent(content);
      _this.indexCalculator.resetState();
      _this.domManager.resetState();
      _this.dataManager.resetState();
      _this.update({
        y: 0
      });
    });
    var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
    scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.computeBoundary, this.modifyBoundary, this);
    this.update({
      y: 0
    });
  };
  InfinityScroll2.prototype.modifyBoundary = function(boundary) {
    boundary.maxScrollPos = EXTRA_SCROLL_Y;
  };
  InfinityScroll2.prototype.handleOptions = function() {
    var infinityOptions = this.scroll.options.infinity;
    if (infinityOptions) {
      if (typeof infinityOptions.fetch !== "function") {
        warn("Infinity plugin need fetch Function to new data.");
      }
      if (typeof infinityOptions.render !== "function") {
        warn("Infinity plugin need render Function to render each item.");
      }
      if (typeof infinityOptions.render !== "function") {
        warn("Infinity plugin need createTombstone Function to create tombstone.");
      }
      this.options = infinityOptions;
    }
    this.scroll.options.probeType = 3;
  };
  InfinityScroll2.prototype.update = function(pos) {
    var position = Math.round(-pos.y);
    var _a2 = this.indexCalculator.calculate(position, this.dataManager.getList()), start = _a2.start, end = _a2.end;
    this.start = start;
    this.end = end;
    this.dataManager.update(end);
    this.updateDom(this.dataManager.getList());
  };
  InfinityScroll2.prototype.onFetchFinish = function(list, hasMore) {
    var end = this.updateDom(list).end;
    if (!hasMore) {
      this.domManager.removeTombstone();
      this.scroll.scroller.animater.stop();
      this.scroll.resetPosition();
    }
    return end;
  };
  InfinityScroll2.prototype.updateDom = function(list) {
    var _a2 = this.domManager.update(list, this.start, this.end), end = _a2.end, startPos = _a2.startPos, endPos = _a2.endPos, startDelta = _a2.startDelta;
    if (startDelta) {
      this.scroll.minScrollY = startDelta;
    }
    if (endPos > this.scroll.maxScrollY) {
      this.scroll.maxScrollY = -(endPos - this.scroll.scroller.scrollBehaviorY.wrapperSize);
    }
    return {
      end,
      startPos,
      endPos
    };
  };
  InfinityScroll2.prototype.destroy = function() {
    var _a2 = this.scroll.scroller, content = _a2.content, scrollBehaviorY = _a2.scrollBehaviorY;
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
    this.domManager.destroy();
    this.scroll.off("scroll", this.update);
    this.scroll.off("destroy", this.destroy);
    scrollBehaviorY.hooks.off(scrollBehaviorY.hooks.eventTypes.computeBoundary);
  };
  InfinityScroll2.pluginName = "infinity";
  return InfinityScroll2;
}();
var sourcePrefix = "plugins.movable";
var propertiesMap = [{
  key: "putAt",
  name: "putAt"
}];
var propertiesConfig = propertiesMap.map(function(item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix + "." + item.name
  };
});
var Movable = function() {
  function Movable2(scroll) {
    this.scroll = scroll;
    this.handleBScroll();
    this.handleHooks();
  }
  Movable2.prototype.handleBScroll = function() {
    this.scroll.proxy(propertiesConfig);
  };
  Movable2.prototype.handleHooks = function() {
    var _this = this;
    this.hooksFn = [];
    var _a2 = this.scroll.scroller, scrollBehaviorX = _a2.scrollBehaviorX, scrollBehaviorY = _a2.scrollBehaviorY;
    var computeBoundary = function(boundary, behavior) {
      if (boundary.maxScrollPos > 0) {
        boundary.minScrollPos = behavior.wrapperSize - behavior.contentSize;
        boundary.maxScrollPos = 0;
      }
    };
    this.registerHooks(scrollBehaviorX.hooks, scrollBehaviorX.hooks.eventTypes.ignoreHasScroll, function() {
      return true;
    });
    this.registerHooks(scrollBehaviorX.hooks, scrollBehaviorX.hooks.eventTypes.computeBoundary, function(boundary) {
      computeBoundary(boundary, scrollBehaviorX);
    });
    this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.ignoreHasScroll, function() {
      return true;
    });
    this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.computeBoundary, function(boundary) {
      computeBoundary(boundary, scrollBehaviorY);
    });
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.destroy, function() {
      _this.destroy();
    });
  };
  Movable2.prototype.putAt = function(x, y, time, easing) {
    if (time === void 0) {
      time = this.scroll.options.bounceTime;
    }
    if (easing === void 0) {
      easing = ease.bounce;
    }
    var position = this.resolvePostion(x, y);
    this.scroll.scrollTo(position.x, position.y, time, easing);
  };
  Movable2.prototype.resolvePostion = function(x, y) {
    var _a2 = this.scroll.scroller, scrollBehaviorX = _a2.scrollBehaviorX, scrollBehaviorY = _a2.scrollBehaviorY;
    var resolveFormula = {
      left: function() {
        return 0;
      },
      top: function() {
        return 0;
      },
      right: function() {
        return scrollBehaviorX.minScrollPos;
      },
      bottom: function() {
        return scrollBehaviorY.minScrollPos;
      },
      center: function(index2) {
        var baseSize = index2 === 0 ? scrollBehaviorX.minScrollPos : scrollBehaviorY.minScrollPos;
        return baseSize / 2;
      }
    };
    return {
      x: typeof x === "number" ? x : resolveFormula[x](0),
      y: typeof y === "number" ? y : resolveFormula[y](1)
    };
  };
  Movable2.prototype.destroy = function() {
    this.hooksFn.forEach(function(item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
    this.hooksFn.length = 0;
  };
  Movable2.prototype.registerHooks = function(hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  Movable2.pluginName = "movable";
  Movable2.applyOrder = "pre";
  return Movable2;
}();
var isImageTag = function(el) {
  return el.tagName.toLowerCase() === "img";
};
var ObserveImage = function() {
  function ObserveImage2(scroll) {
    this.scroll = scroll;
    this.refreshTimer = 0;
    this.init();
  }
  ObserveImage2.prototype.init = function() {
    this.handleOptions(this.scroll.options.observeImage);
    this.bindEventsToWrapper();
  };
  ObserveImage2.prototype.handleOptions = function(userOptions) {
    if (userOptions === void 0) {
      userOptions = {};
    }
    userOptions = userOptions === true ? {} : userOptions;
    var defaultOptions = {
      debounceTime: 100
    };
    this.options = extend(defaultOptions, userOptions);
  };
  ObserveImage2.prototype.bindEventsToWrapper = function() {
    var wrapper = this.scroll.scroller.wrapper;
    this.imageLoadEventRegister = new EventRegister(wrapper, [{
      name: "load",
      handler: this.load.bind(this),
      capture: true
    }]);
    this.imageErrorEventRegister = new EventRegister(wrapper, [{
      name: "error",
      handler: this.load.bind(this),
      capture: true
    }]);
  };
  ObserveImage2.prototype.load = function(e) {
    var _this = this;
    var target = e.target;
    var debounceTime = this.options.debounceTime;
    if (target && isImageTag(target)) {
      if (debounceTime === 0) {
        this.scroll.refresh();
      } else {
        clearTimeout(this.refreshTimer);
        this.refreshTimer = window.setTimeout(function() {
          _this.scroll.refresh();
        }, this.options.debounceTime);
      }
    }
  };
  ObserveImage2.pluginName = "observeImage";
  return ObserveImage2;
}();
var resolveRatioOption = function(ratioConfig) {
  var ret = {
    ratioX: 0,
    ratioY: 0
  };
  if (!ratioConfig) {
    return ret;
  }
  if (typeof ratioConfig === "number") {
    ret.ratioX = ret.ratioY = ratioConfig;
  } else if (typeof ratioConfig === "object" && ratioConfig) {
    ret.ratioX = ratioConfig.x || 0;
    ret.ratioY = ratioConfig.y || 0;
  }
  return ret;
};
var handleBubbleAndCancelable = function(e) {
  e.preventDefault();
  e.stopPropagation();
};
var Indicator = function() {
  function Indicator2(scroll, options) {
    this.scroll = scroll;
    this.options = options;
    this.currentPos = {
      x: 0,
      y: 0
    };
    this.hooksFn = [];
    this.handleDOM();
    this.handleHooks();
    this.handleInteractive();
  }
  Indicator2.prototype.handleDOM = function() {
    var _a2 = this.options, relationElement = _a2.relationElement, _b2 = _a2.relationElementHandleElementIndex, relationElementHandleElementIndex = _b2 === void 0 ? 0 : _b2;
    this.wrapper = relationElement;
    this.indicatorEl = this.wrapper.children[relationElementHandleElementIndex];
  };
  Indicator2.prototype.handleHooks = function() {
    var _this = this;
    var scroll = this.scroll;
    var scrollHooks = scroll.hooks;
    var translaterHooks = scroll.scroller.translater.hooks;
    var animaterHooks = scroll.scroller.animater.hooks;
    this.registerHooks(scrollHooks, scrollHooks.eventTypes.refresh, this.refresh);
    this.registerHooks(translaterHooks, translaterHooks.eventTypes.translate, function(pos) {
      _this.updatePosition(pos);
    });
    this.registerHooks(animaterHooks, animaterHooks.eventTypes.time, this.transitionTime);
    this.registerHooks(animaterHooks, animaterHooks.eventTypes.timeFunction, this.transitionTimingFunction);
  };
  Indicator2.prototype.transitionTime = function(time) {
    if (time === void 0) {
      time = 0;
    }
    this.indicatorEl.style[style.transitionDuration] = time + "ms";
  };
  Indicator2.prototype.transitionTimingFunction = function(easing) {
    this.indicatorEl.style[style.transitionTimingFunction] = easing;
  };
  Indicator2.prototype.handleInteractive = function() {
    if (this.options.interactive !== false) {
      this.registerEvents();
    }
  };
  Indicator2.prototype.registerHooks = function(hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  Indicator2.prototype.registerEvents = function() {
    var _a2 = this.scroll.options, disableMouse = _a2.disableMouse, disableTouch = _a2.disableTouch;
    var startEvents = [];
    var moveEvents = [];
    var endEvents = [];
    if (!disableMouse) {
      startEvents.push({
        name: "mousedown",
        handler: this.start.bind(this)
      });
      moveEvents.push({
        name: "mousemove",
        handler: this.move.bind(this)
      });
      endEvents.push({
        name: "mouseup",
        handler: this.end.bind(this)
      });
    }
    if (!disableTouch) {
      startEvents.push({
        name: "touchstart",
        handler: this.start.bind(this)
      });
      moveEvents.push({
        name: "touchmove",
        handler: this.move.bind(this)
      });
      endEvents.push({
        name: "touchend",
        handler: this.end.bind(this)
      }, {
        name: "touchcancel",
        handler: this.end.bind(this)
      });
    }
    this.startEventRegister = new EventRegister(this.indicatorEl, startEvents);
    this.moveEventRegister = new EventRegister(window, moveEvents);
    this.endEventRegister = new EventRegister(window, endEvents);
  };
  Indicator2.prototype.refresh = function() {
    var _a2 = this.scroll, x = _a2.x, y = _a2.y, hasHorizontalScroll = _a2.hasHorizontalScroll, hasVerticalScroll = _a2.hasVerticalScroll, maxBScrollX = _a2.maxScrollX, maxBScrollY = _a2.maxScrollY;
    var _b2 = resolveRatioOption(this.options.ratio), ratioX = _b2.ratioX, ratioY = _b2.ratioY;
    var _c2 = getClientSize(this.wrapper), wrapperWidth = _c2.width, wrapperHeight = _c2.height;
    var _d2 = getRect(this.indicatorEl), indicatorWidth = _d2.width, indicatorHeight = _d2.height;
    if (hasHorizontalScroll) {
      this.maxScrollX = wrapperWidth - indicatorWidth;
      this.translateXSign = this.maxScrollX > 0 ? -1 : 1;
      this.minScrollX = 0;
      this.ratioX = ratioX ? ratioX : Math.abs(this.maxScrollX / maxBScrollX);
    }
    if (hasVerticalScroll) {
      this.maxScrollY = wrapperHeight - indicatorHeight;
      this.translateYSign = this.maxScrollY > 0 ? -1 : 1;
      this.minScrollY = 0;
      this.ratioY = ratioY ? ratioY : Math.abs(this.maxScrollY / maxBScrollY);
    }
    this.updatePosition({
      x,
      y
    });
  };
  Indicator2.prototype.start = function(e) {
    if (this.BScrollIsDisabled()) {
      return;
    }
    var point = e.touches ? e.touches[0] : e;
    handleBubbleAndCancelable(e);
    this.initiated = true;
    this.moved = false;
    this.lastPointX = point.pageX;
    this.lastPointY = point.pageY;
    this.startTime = getNow();
    this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.beforeScrollStart);
  };
  Indicator2.prototype.BScrollIsDisabled = function() {
    return !this.scroll.enabled;
  };
  Indicator2.prototype.move = function(e) {
    if (!this.initiated) {
      return;
    }
    var point = e.touches ? e.touches[0] : e;
    var pointX = point.pageX;
    var pointY = point.pageY;
    handleBubbleAndCancelable(e);
    var deltaX = pointX - this.lastPointX;
    var deltaY = pointY - this.lastPointY;
    this.lastPointX = pointX;
    this.lastPointY = pointY;
    if (!this.moved && !this.indicatorNotMoved(deltaX, deltaY)) {
      this.moved = true;
      this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollStart);
    }
    if (this.moved) {
      var newPos = this.getBScrollPosByRatio(this.currentPos, deltaX, deltaY);
      this.syncBScroll(newPos);
    }
  };
  Indicator2.prototype.end = function(e) {
    if (!this.initiated) {
      return;
    }
    this.initiated = false;
    handleBubbleAndCancelable(e);
    if (this.moved) {
      var _a2 = this.scroll, x = _a2.x, y = _a2.y;
      this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollEnd, {
        x,
        y
      });
    }
  };
  Indicator2.prototype.getBScrollPosByRatio = function(currentPos, deltaX, deltaY) {
    var currentX = currentPos.x, currentY = currentPos.y;
    var _a2 = this.scroll, hasHorizontalScroll = _a2.hasHorizontalScroll, hasVerticalScroll = _a2.hasVerticalScroll, BScrollMinScrollX = _a2.minScrollX, BScrollMaxScrollX = _a2.maxScrollX, BScrollMinScrollY = _a2.minScrollY, BScrollMaxScrollY = _a2.maxScrollY;
    var _b2 = this.scroll, x = _b2.x, y = _b2.y;
    if (hasHorizontalScroll) {
      var newPosX = between(currentX + deltaX, Math.min(this.minScrollX, this.maxScrollX), Math.max(this.minScrollX, this.maxScrollX));
      var roundX = Math.round(newPosX / this.ratioX * this.translateXSign);
      x = between(roundX, BScrollMaxScrollX, BScrollMinScrollX);
    }
    if (hasVerticalScroll) {
      var newPosY = between(currentY + deltaY, Math.min(this.minScrollY, this.maxScrollY), Math.max(this.minScrollY, this.maxScrollY));
      var roundY = Math.round(newPosY / this.ratioY * this.translateYSign);
      y = between(roundY, BScrollMaxScrollY, BScrollMinScrollY);
    }
    return {
      x,
      y
    };
  };
  Indicator2.prototype.indicatorNotMoved = function(deltaX, deltaY) {
    var _a2 = this.currentPos, x = _a2.x, y = _a2.y;
    var xNotMoved = x === this.minScrollX && deltaX <= 0 || x === this.maxScrollX && deltaX >= 0;
    var yNotMoved = y === this.minScrollY && deltaY <= 0 || y === this.maxScrollY && deltaY >= 0;
    return xNotMoved && yNotMoved;
  };
  Indicator2.prototype.syncBScroll = function(newPos) {
    var timestamp = getNow();
    var _a2 = this.scroll, options = _a2.options, scroller = _a2.scroller;
    var probeType = options.probeType, momentumLimitTime = options.momentumLimitTime;
    scroller.translater.translate(newPos);
    if (timestamp - this.startTime > momentumLimitTime) {
      this.startTime = timestamp;
      if (probeType === 1) {
        scroller.hooks.trigger(scroller.hooks.eventTypes.scroll, newPos);
      }
    }
    if (probeType > 1) {
      scroller.hooks.trigger(scroller.hooks.eventTypes.scroll, newPos);
    }
  };
  Indicator2.prototype.updatePosition = function(BScrollPos) {
    var newIndicatorPos = this.getIndicatorPosByRatio(BScrollPos);
    this.applyTransformProperty(newIndicatorPos);
    this.currentPos = __assign({}, newIndicatorPos);
  };
  Indicator2.prototype.applyTransformProperty = function(pos) {
    var translateZ = this.scroll.options.translateZ;
    var transformProperties = ["translateX(" + pos.x + "px)", "translateY(" + pos.y + "px)", "" + translateZ];
    this.indicatorEl.style[style.transform] = transformProperties.join(" ");
  };
  Indicator2.prototype.getIndicatorPosByRatio = function(BScrollPos) {
    var x = BScrollPos.x, y = BScrollPos.y;
    var _a2 = this.scroll, hasHorizontalScroll = _a2.hasHorizontalScroll, hasVerticalScroll = _a2.hasVerticalScroll;
    var position = __assign({}, this.currentPos);
    if (hasHorizontalScroll) {
      var roundX = Math.round(this.ratioX * x * this.translateXSign);
      position.x = between(roundX, Math.min(this.minScrollX, this.maxScrollX), Math.max(this.minScrollX, this.maxScrollX));
    }
    if (hasVerticalScroll) {
      var roundY = Math.round(this.ratioY * y * this.translateYSign);
      position.y = between(roundY, Math.min(this.minScrollY, this.maxScrollY), Math.max(this.minScrollY, this.maxScrollY));
    }
    return position;
  };
  Indicator2.prototype.destroy = function() {
    if (this.options.interactive !== false) {
      this.startEventRegister.destroy();
      this.moveEventRegister.destroy();
      this.endEventRegister.destroy();
    }
    this.hooksFn.forEach(function(item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
    this.hooksFn.length = 0;
  };
  return Indicator2;
}();
var Indicators = function() {
  function Indicators2(scroll) {
    this.scroll = scroll;
    this.options = [];
    this.indicators = [];
    this.handleOptions();
    this.handleHooks();
  }
  Indicators2.prototype.handleOptions = function() {
    var UserIndicatorsOptions = this.scroll.options.indicators;
    assert(Array.isArray(UserIndicatorsOptions), "'indicators' must be an array.");
    for (var _i = 0, UserIndicatorsOptions_1 = UserIndicatorsOptions; _i < UserIndicatorsOptions_1.length; _i++) {
      var indicatorOptions = UserIndicatorsOptions_1[_i];
      assert(!!indicatorOptions.relationElement, "'relationElement' must be a HTMLElement.");
      this.createIndicators(indicatorOptions);
    }
  };
  Indicators2.prototype.createIndicators = function(options) {
    this.indicators.push(new Indicator(this.scroll, options));
  };
  Indicators2.prototype.handleHooks = function() {
    var _this = this;
    var scrollHooks = this.scroll.hooks;
    scrollHooks.on(scrollHooks.eventTypes.destroy, function() {
      for (var _i = 0, _a2 = _this.indicators; _i < _a2.length; _i++) {
        var indicator = _a2[_i];
        indicator.destroy();
      }
      _this.indicators = [];
    });
  };
  Indicators2.pluginName = "indicators";
  return Indicators2;
}();
BScroll.use(MouseWheel).use(ObserveDOM).use(PullDown).use(PullUp).use(ScrollBar).use(Slide).use(Wheel).use(Zoom).use(NestedScroll).use(InfinityScroll).use(Movable).use(ObserveImage).use(Indicators);
function useScroll$1(el, options) {
  const defaultOptions = Object.assign({
    click: true,
    bounce: true,
    probeType: 3,
    mouseWheel: true,
    scrollY: true,
    scrollbar: {
      fade: false,
      interactive: true,
      scrollbarTrackClickable: true
    }
  }, options);
  return new BScroll(el, defaultOptions);
}
const processUnit = (unit) => {
  console.log(unit);
  if (typeof unit === "string") {
    if (isNaN(Number(unit))) {
      return unit;
    }
  }
  return unit + "px";
};
const LightTheme = {
  success: "#67c23a",
  info: "#909399",
  primary: "#409eff",
  warning: "#faaca8",
  error: "#f56c6c",
  default: "rgb(48, 170, 105)"
};
function HexToRgb(str) {
  str = str.replace("#", "");
  let hxs = str.match(/[0-9A-F]{2}/ig).map((item) => parseInt(item, 16));
  return hxs;
}
function getDarkColor(color, level = 0.7) {
  return processColor(color, level, (num, level2) => Math.floor(num * (1 - level2)));
}
function getLightColor(color, level = 0.7) {
  return processColor(color, level, (num, level2) => Math.floor((255 - num) * level2 + +num));
}
function processColor(color, level, processFn) {
  if (typeof color !== "string") {
    return "";
  }
  if (!(color.startsWith("#") || color.startsWith("rgb("))) {
    return "";
  }
  let lightColor = "#";
  let colors;
  if (color.startsWith("rgb")) {
    const reg = /rgb\((\d{1,3}),\s*?(\d{1,3}),\s*?(\d{1,3})\)/ig;
    const match = reg.exec(color);
    colors = [+match["1"], +match["2"], +match["3"]];
  } else {
    colors = HexToRgb(color);
  }
  lightColor += colors.map((item) => {
    const str = processFn(item, level).toString(16);
    return ("00" + str).slice(str.length);
  }).join("");
  return lightColor;
}
function withInstall(component, name = component.name) {
  component.name = name;
  component.install = (app, options) => {
    app.component(name, component);
  };
  return component;
}
function scrollParent(element) {
  const parent = element.parentElement;
  if (!parent) {
    return null;
  }
  const style2 = getComputedStyle(parent);
  const client = parent.clientHeight;
  const scroll = parent.scrollHeight;
  if (parent.nodeName === "HTML" || parent.nodeName === "BODY") {
    if (client < scroll) {
      return parent;
    } else {
      scrollParent(parent);
    }
  }
  if (client < scroll && style2.overflow !== "visible") {
    return parent;
  } else {
    return scrollParent(parent);
  }
}
function useScroll(element) {
  const parentScroll = scrollParent(element);
  if (!parentScroll) {
    return;
  }
  const scrollPos = () => {
    const scroll = ref(0);
    const setScroll = (e) => {
      scroll.value = parentScroll.scrollTop;
    };
    parentScroll.addEventListener("scroll", setScroll);
    const callback = () => {
      parentScroll.removeEventListener("scroll", setScroll);
    };
    return {
      scroll: readonly(scroll),
      callback
    };
  };
  const scrollTop = (duration = 1e3) => {
    const cubic = (value) => Math.pow(value, 3);
    const easeInOutCubic = (value) => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
    const beginTime = Date.now();
    const beginValue = parentScroll.scrollTop;
    const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16));
    const frameFunc = () => {
      const progress = (Date.now() - beginTime) / duration;
      if (progress < 1) {
        parentScroll.scrollTo(0, beginValue * (1 - easeInOutCubic(progress)));
        rAF(frameFunc);
      } else {
        parentScroll.scrollTo(0, 0);
      }
    };
    rAF(frameFunc);
  };
  return {
    scrollPos,
    scrollTop
  };
}
function mitt(n) {
  return {
    all: n = n || /* @__PURE__ */ new Map(),
    on: function(t, e) {
      var i = n.get(t);
      i ? i.push(e) : n.set(t, [e]);
    },
    off: function(t, e) {
      var i = n.get(t);
      i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
    },
    emit: function(t, e) {
      var i = n.get(t);
      i && i.slice().map(function(n2) {
        n2(e);
      }), (i = n.get("*")) && i.slice().map(function(n2) {
        n2(t, e);
      });
    }
  };
}
mitt();
const collapseMitt = mitt();
mitt();
const formMitt = mitt();
function computedPosition(el) {
  const { top } = el.getBoundingClientRect();
  const availHeight = window.innerHeight;
  return top > availHeight - top ? "top" : "bottom";
}
const easeOut = (t) => 1 - Math.pow(1 - t, 5);
function tween(props) {
  const { from, to, duration, onUpdate, onFinish } = props;
  const tick = () => {
    const current = performance.now();
    const elapsedTime = Math.min(current - startTime, duration);
    const currentValue = from + (to - from) * easeOut(elapsedTime / duration);
    if (elapsedTime === duration) {
      onFinish();
      return;
    }
    onUpdate(currentValue);
    requestAnimationFrame(tick);
  };
  const startTime = performance.now();
  tick();
}
function cssUnitConversion(unit) {
  if (!unit) {
    return "";
  }
  const value = +unit;
  if (isNaN(value)) {
    return String(unit);
  } else {
    return value + "px";
  }
}
var configData = {
  color: "#0ff",
  width: 20,
  height: 20,
  opacity: 0.2,
  duration: 0.9
};
const _hoisted_1$Z = ["width", "height"];
const _hoisted_2$E = ["fill"];
const _hoisted_3$t = ["dur"];
const _hoisted_4$i = ["fill"];
const _hoisted_5$f = /* @__PURE__ */ createBaseVNode("animateTransform", {
  attributeType: "xml",
  attributeName: "transform",
  type: "translate",
  values: "0 0; 0 20; 0 0",
  begin: "0.2s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1);
const _hoisted_6$e = [
  _hoisted_5$f
];
const _hoisted_7$c = ["fill"];
const _hoisted_8$9 = /* @__PURE__ */ createBaseVNode("animateTransform", {
  attributeType: "xml",
  attributeName: "transform",
  type: "translate",
  values: "0 0; 0 20; 0 0",
  begin: "0.4s",
  dur: "0.6s",
  repeatCount: "indefinite"
}, null, -1);
const _hoisted_9$8 = [
  _hoisted_8$9
];
const _sfc_main$1b = /* @__PURE__ */ defineComponent({
  props: mergeDefaults({
    color: null,
    width: null,
    height: null,
    duration: null,
    opacity: null
  }, __spreadValues({}, configData)),
  setup(__props) {
    function processMetaData(data) {
      return typeof data === "string" ? data : data + "px";
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: processMetaData(__props.width),
        height: processMetaData(__props.height),
        viewBox: "0 0 24 24",
        style: { "enable-background": "new 0 0 24 24" },
        "xml:space": "preserve"
      }, [
        createBaseVNode("rect", {
          x: "0",
          y: "0",
          width: "4",
          height: "10",
          fill: __props.color,
          transform: "translate(0 9.4336)"
        }, [
          createBaseVNode("animateTransform", {
            attributeType: "xml",
            attributeName: "transform",
            type: "translate",
            values: "0 0; 0 20; 0 0",
            begin: "0",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_3$t)
        ], 8, _hoisted_2$E),
        createBaseVNode("rect", {
          x: "10",
          y: "0",
          width: "4",
          height: "10",
          fill: __props.color,
          transform: "translate(0 17.2331)"
        }, _hoisted_6$e, 8, _hoisted_4$i),
        createBaseVNode("rect", {
          x: "20",
          y: "0",
          width: "4",
          height: "10",
          fill: __props.color,
          transform: "translate(0 3.89973)"
        }, _hoisted_9$8, 8, _hoisted_7$c)
      ], 8, _hoisted_1$Z);
    };
  }
});
const _hoisted_1$Y = ["width", "height"];
const _hoisted_2$D = ["fill"];
const _hoisted_3$s = ["dur"];
const _sfc_main$1a = /* @__PURE__ */ defineComponent({
  props: mergeDefaults({
    color: null,
    width: null,
    height: null,
    duration: null,
    opacity: null
  }, __spreadValues({}, configData)),
  setup(__props) {
    function processMetaData(data) {
      return typeof data === "string" ? data : data + "px";
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: processMetaData(__props.width),
        height: processMetaData(__props.height),
        viewBox: "0 0 50 50",
        style: { "enable-background": "new 0 0 50 50" },
        "xml:space": "preserve"
      }, [
        createBaseVNode("path", {
          fill: __props.color,
          d: "M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z",
          transform: "rotate(275.098 25 25)"
        }, [
          createBaseVNode("animateTransform", {
            attributeType: "xml",
            attributeName: "transform",
            type: "rotate",
            from: "0 25 25",
            to: "360 25 25",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_3$s)
        ], 8, _hoisted_2$D)
      ], 8, _hoisted_1$Y);
    };
  }
});
const _hoisted_1$X = ["width", "height"];
const _hoisted_2$C = ["fill"];
const _hoisted_3$r = ["dur"];
const _sfc_main$19 = /* @__PURE__ */ defineComponent({
  props: mergeDefaults({
    color: null,
    width: null,
    height: null,
    duration: null
  }, __spreadValues({}, configData)),
  setup(__props) {
    function processMetaData(data) {
      return typeof data === "string" ? data : data + "px";
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: processMetaData(__props.width),
        height: processMetaData(__props.height),
        viewBox: "0 0 50 50",
        style: { "enable-background": "new 0 0 50 50" },
        "xml:space": "preserve"
      }, [
        createBaseVNode("path", {
          fill: __props.color,
          d: "M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z",
          transform: "rotate(275.098 25 25)"
        }, [
          createBaseVNode("animateTransform", {
            attributeType: "xml",
            attributeName: "transform",
            type: "rotate",
            from: "0 25 25",
            to: "360 25 25",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_3$r)
        ], 8, _hoisted_2$C)
      ], 8, _hoisted_1$X);
    };
  }
});
const _hoisted_1$W = ["width", "height"];
const _hoisted_2$B = ["fill"];
const _hoisted_3$q = ["dur"];
const _hoisted_4$h = ["dur"];
const _hoisted_5$e = ["dur"];
const _hoisted_6$d = ["fill"];
const _hoisted_7$b = ["dur"];
const _hoisted_8$8 = ["dur"];
const _hoisted_9$7 = ["dur"];
const _hoisted_10$6 = ["fill"];
const _hoisted_11$6 = ["dur"];
const _hoisted_12$4 = ["dur"];
const _hoisted_13$3 = ["dur"];
const _sfc_main$18 = /* @__PURE__ */ defineComponent({
  props: mergeDefaults({
    color: null,
    width: null,
    height: null,
    duration: null,
    opacity: null
  }, __spreadValues({}, configData)),
  setup(__props) {
    function processMetaData(data) {
      return typeof data === "string" ? data : data + "px";
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: processMetaData(__props.width),
        height: processMetaData(__props.height),
        viewBox: "0 0 24 30",
        style: { "enable-background": "new 0 0 50 50" },
        "xml:space": "preserve"
      }, [
        createBaseVNode("rect", {
          x: "0",
          y: "7.6416",
          width: "4",
          height: "12",
          fill: __props.color,
          opacity: "0.2"
        }, [
          createBaseVNode("animate", {
            attributeName: "opacity",
            attributeType: "XML",
            values: "0.2; 1; .2",
            begin: "0s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_3$q),
          createBaseVNode("animate", {
            attributeName: "height",
            attributeType: "XML",
            values: "10; 20; 10",
            begin: "0s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_4$h),
          createBaseVNode("animate", {
            attributeName: "y",
            attributeType: "XML",
            values: "10; 5; 10",
            begin: "0s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_5$e)
        ], 8, _hoisted_2$B),
        createBaseVNode("rect", {
          x: "8",
          y: "5.1416",
          width: "4",
          height: "15",
          fill: __props.color,
          opacity: "0.2"
        }, [
          createBaseVNode("animate", {
            attributeName: "opacity",
            attributeType: "XML",
            values: "0.2; 1; .2",
            begin: "0.15s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_7$b),
          createBaseVNode("animate", {
            attributeName: "height",
            attributeType: "XML",
            values: "10; 20; 10",
            begin: "0.15s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_8$8),
          createBaseVNode("animate", {
            attributeName: "y",
            attributeType: "XML",
            values: "10; 5; 10",
            begin: "0.15s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_9$7)
        ], 8, _hoisted_6$d),
        createBaseVNode("rect", {
          x: "16",
          y: "7.3584",
          width: "4",
          height: "13",
          fill: __props.color,
          opacity: "0.2"
        }, [
          createBaseVNode("animate", {
            attributeName: "opacity",
            attributeType: "XML",
            values: "0.2; 1; .2",
            begin: "0.3s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_11$6),
          createBaseVNode("animate", {
            attributeName: "height",
            attributeType: "XML",
            values: "10; 20; 10",
            begin: "0.3s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_12$4),
          createBaseVNode("animate", {
            attributeName: "y",
            attributeType: "XML",
            values: "10; 5; 10",
            begin: "0.3s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_13$3)
        ], 8, _hoisted_10$6)
      ], 8, _hoisted_1$W);
    };
  }
});
const _hoisted_1$V = ["width", "height"];
const _hoisted_2$A = ["opacity", "fill"];
const _hoisted_3$p = ["fill"];
const _hoisted_4$g = ["dur"];
const _sfc_main$17 = /* @__PURE__ */ defineComponent({
  props: mergeDefaults({
    color: null,
    width: null,
    height: null,
    duration: null,
    opacity: null
  }, __spreadValues({}, configData)),
  setup(__props) {
    function processMetaData(data) {
      return typeof data === "string" ? data : data + "px";
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: processMetaData(__props.width),
        height: processMetaData(__props.height),
        viewBox: "0 0 40 40",
        "enable-background": "new 0 0 40 40",
        "xml:space": "preserve"
      }, [
        createBaseVNode("path", {
          opacity: __props.opacity,
          fill: __props.color,
          d: "M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\n      s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\n      c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
        }, null, 8, _hoisted_2$A),
        createBaseVNode("path", {
          fill: __props.color,
          d: "M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\n      C22.32,8.481,24.301,9.057,26.013,10.047z",
          transform: "rotate(42.1171 20 20)"
        }, [
          createBaseVNode("animateTransform", {
            attributeType: "xml",
            attributeName: "transform",
            type: "rotate",
            from: "0 20 20",
            to: "360 20 20",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_4$g)
        ], 8, _hoisted_3$p)
      ], 8, _hoisted_1$V);
    };
  }
});
const _hoisted_1$U = ["width", "height"];
const _hoisted_2$z = ["fill"];
const _hoisted_3$o = ["dur"];
const _hoisted_4$f = ["dur"];
const _hoisted_5$d = ["fill"];
const _hoisted_6$c = ["dur"];
const _hoisted_7$a = ["dur"];
const _hoisted_8$7 = ["fill"];
const _hoisted_9$6 = ["dur"];
const _hoisted_10$5 = ["dur"];
const _sfc_main$16 = /* @__PURE__ */ defineComponent({
  props: mergeDefaults({
    color: null,
    width: null,
    height: null,
    duration: null
  }, __spreadValues({}, configData)),
  setup(__props) {
    function processMetaData(data) {
      return typeof data === "string" ? data : data + "px";
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: processMetaData(__props.width),
        height: processMetaData(__props.height),
        viewBox: "0 0 24 30",
        style: { "enable-background": "new 0 0 50 50" },
        "xml:space": "preserve"
      }, [
        createBaseVNode("rect", {
          x: "0",
          y: "9.22656",
          width: "4",
          height: "12",
          fill: __props.color
        }, [
          createBaseVNode("animate", {
            attributeName: "height",
            attributeType: "XML",
            values: "5;21;5",
            begin: "0s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_3$o),
          createBaseVNode("animate", {
            attributeName: "y",
            attributeType: "XML",
            values: "13; 5; 13",
            begin: "0s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_4$f)
        ], 8, _hoisted_2$z),
        createBaseVNode("rect", {
          x: "10",
          y: "5.22656",
          width: "4",
          height: "15",
          fill: __props.color
        }, [
          createBaseVNode("animate", {
            attributeName: "height",
            attributeType: "XML",
            values: "5;21;5",
            begin: "0.15s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_6$c),
          createBaseVNode("animate", {
            attributeName: "y",
            attributeType: "XML",
            values: "13; 5; 13",
            begin: "0.15s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_7$a)
        ], 8, _hoisted_5$d),
        createBaseVNode("rect", {
          x: "20",
          y: "8.77344",
          width: "4",
          height: "13",
          fill: __props.color
        }, [
          createBaseVNode("animate", {
            attributeName: "height",
            attributeType: "XML",
            values: "5;21;5",
            begin: "0.3s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_9$6),
          createBaseVNode("animate", {
            attributeName: "y",
            attributeType: "XML",
            values: "13; 5; 13",
            begin: "0.3s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_10$5)
        ], 8, _hoisted_8$7)
      ], 8, _hoisted_1$U);
    };
  }
});
const _hoisted_1$T = ["width", "height"];
const _hoisted_2$y = ["fill"];
const _hoisted_3$n = ["dur"];
const _hoisted_4$e = ["fill"];
const _hoisted_5$c = ["dur"];
const _hoisted_6$b = ["fill"];
const _hoisted_7$9 = ["dur"];
const _sfc_main$15 = /* @__PURE__ */ defineComponent({
  props: mergeDefaults({
    color: null,
    width: null,
    height: null,
    duration: null,
    opacity: null
  }, __spreadValues({}, configData)),
  setup(__props) {
    function processMetaData(data) {
      return typeof data === "string" ? data : data + "px";
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: processMetaData(__props.width),
        height: processMetaData(__props.height),
        viewBox: "0 0 24 24",
        style: { "enable-background": "new 0 0 50 50" },
        "xml:space": "preserve"
      }, [
        createBaseVNode("rect", {
          x: "0",
          y: "0",
          width: "4",
          height: "7",
          fill: __props.color,
          transform: "scale(1 1.94336)"
        }, [
          createBaseVNode("animateTransform", {
            attributeType: "xml",
            attributeName: "transform",
            type: "scale",
            values: "1,1; 1,3; 1,1",
            begin: "0s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_3$n)
        ], 8, _hoisted_2$y),
        createBaseVNode("rect", {
          x: "10",
          y: "0",
          width: "4",
          height: "7",
          fill: __props.color,
          transform: "scale(1 2.72331)"
        }, [
          createBaseVNode("animateTransform", {
            attributeType: "xml",
            attributeName: "transform",
            type: "scale",
            values: "1,1; 1,3; 1,1",
            begin: "0.2s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_5$c)
        ], 8, _hoisted_4$e),
        createBaseVNode("rect", {
          x: "20",
          y: "0",
          width: "4",
          height: "7",
          fill: __props.color,
          transform: "scale(1 1.38997)"
        }, [
          createBaseVNode("animateTransform", {
            attributeType: "xml",
            attributeName: "transform",
            type: "scale",
            values: "1,1; 1,3; 1,1",
            begin: "0.4s",
            dur: __props.duration + "s",
            repeatCount: "indefinite"
          }, null, 8, _hoisted_7$9)
        ], 8, _hoisted_6$b)
      ], 8, _hoisted_1$T);
    };
  }
});
var ButtonNames = {
  TYPE: Symbol("type"),
  SHAPE: Symbol("shape"),
  SIZE: Symbol("size"),
  PLAIN: Symbol("plain"),
  LOADING: Symbol("loading"),
  DISABLED: Symbol("disabled"),
  COLOR: Symbol("color"),
  BORDER_COLOR: Symbol("borderColor"),
  TEXT_COLOR: Symbol("textColor"),
  TEXT: Symbol("text")
};
var button_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$S = {
  key: 0,
  class: "loading"
};
const _sfc_main$14 = /* @__PURE__ */ defineComponent({
  props: {
    type: null,
    disabled: { type: Boolean },
    loading: { type: Boolean, default: false },
    shape: null,
    plain: { type: Boolean, default: void 0 },
    size: null,
    color: null,
    borderColor: null,
    textColor: null,
    loadingName: { default: "short" },
    text: { type: Boolean, default: void 0 },
    textFixed: { type: Boolean, default: false }
  },
  emits: ["mClick", "mTouch"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const loadingMap = {
      short: _sfc_main$19,
      loop: _sfc_main$17,
      grow: _sfc_main$18,
      slow: _sfc_main$16,
      deep: _sfc_main$1b,
      long: _sfc_main$1a,
      top: _sfc_main$15
    };
    const {
      TEXT_COLOR,
      TYPE,
      SHAPE,
      SIZE,
      DISABLED,
      BORDER_COLOR,
      COLOR,
      PLAIN,
      TEXT
    } = ButtonNames;
    const type = useInject(props.type, TYPE, "default");
    const shape = useInject(props.shape, SHAPE, "round");
    const size2 = useInject(props.size, SIZE, "small");
    const plain = useInject(props.plain, PLAIN, true);
    const text = useInject(props.text, TEXT, false);
    const theme = LightTheme[type];
    const color = useInject(props.color, COLOR, theme);
    const plainColor = getLightColor(color, 0.8);
    const textColor = useInject(props.textColor, TEXT_COLOR, "#fff");
    const plainTextColor = color;
    const borderColor = useInject(props.borderColor, BORDER_COLOR, color);
    const iconColor = ref(plain ? textColor : color);
    const handleClick = (event) => {
      if (!props.disabled) {
        emits("mClick", event);
      }
    };
    const handleTouch = (event) => {
      if (!props.disabled) {
        emits("mClick", event);
      }
    };
    function handleEnter() {
      if (!props.disabled && !plain) {
        iconColor.value = textColor;
      }
    }
    function handleLeave() {
      if (!props.disabled && !plain) {
        iconColor.value = color;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        onClick: handleClick,
        onTouchend: handleTouch,
        onMouseenter: handleEnter,
        onMouseleave: handleLeave,
        onKeydown: _cache[0] || (_cache[0] = () => {
        }),
        class: normalizeClass(["m-button", [
          "button-" + unref(size2),
          "button-" + unref(shape),
          __props.disabled && "m-button-disabled",
          !unref(plain) && "plain",
          unref(text) && "text",
          __props.textFixed && "fixed"
        ]]),
        style: normalizeStyle([
          {
            ["--m-button-color"]: unref(plain) ? unref(textColor) : unref(plainTextColor)
          },
          {
            ["--m-button-back"]: unref(plain) ? unref(color) : unref(plainColor)
          },
          {
            ["--m-button-border"]: unref(borderColor)
          },
          {
            ["--m-button-hover-color"]: unref(textColor)
          },
          {
            ["--m-button-hover-back"]: unref(color)
          },
          {
            ["--m-button-text"]: unref(textColor) === "#fff" ? unref(borderColor) : unref(textColor)
          }
        ])
      }, [
        __props.loading ? (openBlock(), createElementBlock("div", _hoisted_1$S, [
          (openBlock(), createBlock(resolveDynamicComponent(loadingMap[__props.loadingName]), { color: iconColor.value }, null, 8, ["color"]))
        ])) : renderSlot(_ctx.$slots, "icon", { key: 1 }, void 0, true),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 38);
    };
  }
});
var mButtonVue = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["__scopeId", "data-v-0d2983d1"]]);
var buttonGroup_vue_vue_type_style_index_0_lang = "";
const _sfc_main$13 = /* @__PURE__ */ defineComponent({
  props: {
    type: { default: "default" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    shape: { default: "round" },
    plain: { type: Boolean, default: true },
    size: { default: "small" },
    color: null,
    textColor: null,
    borderColor: null,
    text: { type: Boolean, default: false },
    border: { type: Boolean }
  },
  setup(__props) {
    var _a2;
    const props = __props;
    const {
      TEXT_COLOR,
      TYPE,
      SHAPE,
      SIZE,
      LOADING,
      DISABLED,
      BORDER_COLOR,
      COLOR,
      PLAIN,
      TEXT
    } = ButtonNames;
    provide(TYPE, props.type);
    provide(DISABLED, props.disabled);
    provide(LOADING, props.loading);
    provide(SHAPE, props.shape);
    provide(PLAIN, props.plain);
    provide(SIZE, props.size);
    provide(COLOR, props.color);
    provide(BORDER_COLOR, props.borderColor);
    provide(TEXT_COLOR, props.textColor);
    provide(TEXT, props.text);
    const theme = LightTheme[props.type];
    const color = (_a2 = props.color) != null ? _a2 : theme;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mButtonGroup", __props.border && "m-button-group-border"]),
        style: normalizeStyle([{ ["--m-button-group-border-color"]: unref(color) }])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});
mButtonVue.name = "mButton";
_sfc_main$13.name = "mButtonGroup";
const mButton = withInstall(mButtonVue);
const mButtonGroup = withInstall(_sfc_main$13);
var icon_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$12 = /* @__PURE__ */ defineComponent({
  props: {
    name: null,
    color: { default: "inherit" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("i", {
        class: normalizeClass(["m-icon iconfont", __props.name]),
        style: normalizeStyle({
          ["--icon-color"]: __props.color
        })
      }, null, 6);
    };
  }
});
var mIcon$1 = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__scopeId", "data-v-e031ed58"]]);
var IconNames = {
  TYPE: Symbol("type"),
  SIZE: Symbol("size"),
  COLOR: Symbol("color"),
  HOVER_COLOR: Symbol("hoverColor")
};
const _hoisted_1$R = { class: "mIconGroup" };
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
  props: {
    size: { default: "small" },
    color: null,
    plain: { type: Boolean, default: true },
    type: { default: "default" },
    glass: { type: Boolean, default: false },
    shape: null
  },
  setup(__props) {
    const props = __props;
    const { SHAPE, SIZE, TYPE, COLOR, PLAIN } = IconNames;
    provide(SIZE, props.size);
    provide(PLAIN, props.plain);
    provide(TYPE, props.type);
    provide(SHAPE, props.shape);
    provide("glass", props.glass);
    provide(COLOR, props.color);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$R, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});
mIcon$1.name = "mIcon";
_sfc_main$11.name = "mIconGroup";
const mIcon = withInstall(mIcon$1);
const mIconGroup = withInstall(_sfc_main$11);
var input_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$Q = { class: "labelBox" };
const _hoisted_2$x = { key: 0 };
const _hoisted_3$m = { class: "slot" };
const _hoisted_4$d = ["tabindex", "type", "onKeyup", "maxlength", "disabled"];
const _hoisted_5$b = {
  key: 1,
  class: "max-length"
};
const _hoisted_6$a = {
  key: 2,
  class: "loading"
};
const _hoisted_7$8 = {
  key: 3,
  class: "suffix"
};
const _hoisted_8$6 = { class: "slot" };
const _hoisted_9$5 = ["onClick", "onMouseenter"];
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  props: {
    size: { default: "small" },
    suffix: { type: [Boolean, String] },
    type: { default: "text" },
    modelValue: null,
    clear: { type: Boolean, default: false },
    password: { type: Boolean },
    list: { default: () => [] },
    prefix: { type: [Boolean, String] },
    index: null,
    radius: { default: "6px" },
    round: { type: Boolean, default: false },
    prefixColor: { default: "#f1f2f3" },
    prefixTextColor: { default: "#606366" },
    suffixColor: { default: "#f1f2f3" },
    suffixTextColor: { default: "#606366" },
    disabled: { type: Boolean, default: false },
    maxLength: null,
    loading: { type: Boolean },
    color: null,
    useBorder: { type: Boolean, default: true },
    center: { type: Boolean, default: false },
    inputDisabled: { type: Boolean, default: false }
  },
  emits: [
    "update:modelValue",
    "liClick",
    "focus",
    "blur",
    "listClick"
  ],
  setup(__props, { emit: emits }) {
    const props = __props;
    const value = ref(typeof props.modelValue === "string" ? props.modelValue : JSON.stringify(props.modelValue));
    const inputType = ref(props.type);
    const isShow = ref(false);
    const isHover = ref(false);
    const input = ref();
    const activeIndex = ref(1);
    const focus = ref(false);
    const len = ref(String(value.value).length);
    let backColor = ref("white");
    watch(() => props.color, (newColor) => {
      backColor.value = getLightColor(newColor);
    }, {
      immediate: true
    });
    watch(() => props.modelValue, (newValue) => {
      value.value = newValue;
      len.value = String(value.value).length;
    });
    var changeValue = (event) => {
      var _a2;
      value.value = event.target.value;
      len.value = String(value.value).length;
      isShow.value = true;
      emits("update:modelValue", (_a2 = event.target) == null ? void 0 : _a2.value);
    };
    const clickIcon = () => {
      if (props.clear) {
        value.value = "";
        emits("update:modelValue", "");
      } else {
        inputType.value = inputType.value === "password" ? "text" : "password";
      }
    };
    const clickListItem = (item, index2) => {
      var _a2;
      value.value = (_a2 = item.value) != null ? _a2 : item;
      isShow.value = false;
      isHover.value = false;
      emits("update:modelValue", item);
      emits("liClick", item, index2);
    };
    const changeListShow = () => {
      if (props.list) {
        value.value = typeof props.list[activeIndex.value] == "object" ? props.list[activeIndex.value].value : props.list[activeIndex.value];
        console.log(props.list[activeIndex.value]);
        nextTick(() => {
          var _a2;
          emits("listClick", (_a2 = props.list[activeIndex.value].value) != null ? _a2 : props.list[activeIndex.value]);
        });
        isShow.value = false;
      }
    };
    const blurHandler = (e) => {
      isShow.value = false;
      focus.value = false;
      emits("blur", e);
    };
    const focusHandler = (e) => {
      focus.value = true;
      isShow.value = true;
      emits("focus", e);
    };
    const enterHandler = () => {
      isHover.value = true;
    };
    const leaveHandler = () => {
      activeIndex.value = 0;
      isHover.value = false;
    };
    const itemEnterHandler = (index2) => {
      activeIndex.value = index2;
    };
    const downHandler = () => {
      if (activeIndex.value < props.list.length - 1) {
        activeIndex.value++;
      } else {
        activeIndex.value = 0;
      }
    };
    const upHandler = () => {
      if (activeIndex.value > 0) {
        activeIndex.value--;
      } else {
        activeIndex.value = props.list.length - 1;
      }
    };
    return (_ctx, _cache) => {
      const _component_m_icon = resolveComponent("m-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$Q, [
        createBaseVNode("label", {
          class: normalizeClass([
            "mInput",
            "input-" + __props.size,
            focus.value && "m-input-focus",
            __props.round && "m-input-round",
            __props.disabled && "m-input-disabled",
            __props.useBorder && "m-input-border",
            __props.center && "m-input-center"
          ]),
          style: normalizeStyle({
            ["--input-radius"]: __props.radius,
            ["--input-pre-color"]: __props.prefixColor,
            ["--input-pre-text-color"]: __props.prefixTextColor,
            ["--input-suf-color"]: __props.suffixColor,
            ["--input-suf-text-color"]: __props.suffixTextColor,
            ["--input-color"]: __props.color ? __props.color : "rgb(220, 223, 230)",
            ["--input-back-color"]: unref(backColor)
          })
        }, [
          __props.prefix ? (openBlock(), createElementBlock("div", _hoisted_2$x, [
            renderSlot(_ctx.$slots, "prefix", {}, () => [
              createBaseVNode("p", _hoisted_3$m, toDisplayString(__props.prefix), 1)
            ], true)
          ])) : createCommentVNode("", true),
          withDirectives(createBaseVNode("input", mergeProps(_ctx.$attrs, {
            tabindex: __props.index,
            onInput: _cache[0] || (_cache[0] = (...args) => unref(changeValue) && unref(changeValue)(...args)),
            type: inputType.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => value.value = $event),
            onKeyup: [
              withKeys(changeListShow, ["enter"]),
              withKeys(upHandler, ["up"]),
              withKeys(downHandler, ["down"])
            ],
            onBlur: blurHandler,
            onFocus: focusHandler,
            maxlength: __props.maxLength,
            ref_key: "input",
            ref: input,
            disabled: __props.disabled || __props.inputDisabled
          }), null, 16, _hoisted_4$d), [
            [vModelDynamic, value.value]
          ]),
          renderSlot(_ctx.$slots, "icon", {}, () => [
            (__props.clear || __props.password) && value.value ? (openBlock(), createElementBlock("p", {
              key: 0,
              onClick: clickIcon,
              class: "clear"
            }, [
              __props.password ? (openBlock(), createBlock(_component_m_icon, {
                key: 0,
                name: "m-show"
              })) : (openBlock(), createBlock(_component_m_icon, {
                key: 1,
                name: "m-delete"
              }))
            ])) : createCommentVNode("", true)
          ], true),
          __props.maxLength ? (openBlock(), createElementBlock("p", _hoisted_5$b, toDisplayString(len.value) + "/" + toDisplayString(__props.maxLength), 1)) : createCommentVNode("", true),
          __props.loading ? (openBlock(), createElementBlock("p", _hoisted_6$a, [
            createVNode(unref(_sfc_main$17), { color: "#409eff" })
          ])) : createCommentVNode("", true),
          __props.suffix ? (openBlock(), createElementBlock("div", _hoisted_7$8, [
            renderSlot(_ctx.$slots, "suffix", {}, () => [
              createBaseVNode("p", _hoisted_8$6, toDisplayString(__props.suffix), 1)
            ], true)
          ])) : createCommentVNode("", true)
        ], 6),
        __props.list && Array.isArray(__props.list) && __props.list.length !== 0 && (isShow.value || isHover.value) ? (openBlock(), createElementBlock("ul", {
          key: 0,
          class: "list",
          onMouseenter: enterHandler,
          onMouseleave: leaveHandler
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.list, (item, index2) => {
            return openBlock(), createElementBlock("li", {
              key: item,
              onClick: ($event) => clickListItem(item, index2),
              class: normalizeClass(activeIndex.value == index2 && "hover"),
              onMouseenter: ($event) => itemEnterHandler(index2)
            }, [
              renderSlot(_ctx.$slots, "list", { value: item }, () => [
                createTextVNode(toDisplayString(typeof item === "object" ? item.value : item), 1)
              ], true)
            ], 42, _hoisted_9$5);
          }), 128))
        ], 32)) : createCommentVNode("", true)
      ]);
    };
  }
});
var mInput$1 = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["__scopeId", "data-v-7f15ad0b"]]);
var inputGroup_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$P = { class: "mInputGroup" };
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$P);
    };
  }
});
var InputGroup = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["__scopeId", "data-v-7d606057"]]);
mInput$1.name = "mInput";
InputGroup.name = "mInputGroup";
const mInput = withInstall(mInput$1);
const mInputGroup = withInstall(InputGroup);
var errorImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAABopJREFUeAHtnd9rG0cQx+ckxVFbt7VBgSS07o84BCJaAoW8NFDogyH/R176mj+kbyUv+T8KfggU0pdAi/tDTapIiWPHsZzY8S/JliWfrjtnH1JUWb7dO61nVrNg9Gtmd/b78dzezZ5lD/raw0cLRb/l31FvzwUAMwDBZJ+JvCSlgFf3AJZUSPPZiez9WzdvlHrDU58dtVKpNLG+2fwRPPghCIJM9L488lHA87wOBHCvMJ2/WywWWxh5CDiEu9X8WYH9ns90JNKTFFCgHxSm8rcRcpipmLkC9yS5+L2PLMOjsQrdC9fctv+nHJb5gRwWMR6us+eyX+fwhCoAWXOHicXxM0xYZIuH6DmOE5CYYykwlzm6FIplLEbMFEC2KoPlOpcZN41wg8nwLFrDQ0yZKSCAmQHTDVcA6yrGzF4AMwOmG64A1lWMmb0AZgZMN1wBrKsYM3sBzAyYbrgCWFcxZvYCmBkw3XAFsK5izOwFMDNguuEKYF3FmNkLYGbAdMMVwLqKMbMXwMyA6YYrgHUVY2YvgJkB0w1XAOsqxsxeADMDphuuANZVjJm9AGYGTDdcAayrGDP7nO14v/v2G9tDkhrvl19/sxqPZLBVue0PJoDta251RAFsVW77gwlg+5pbHVEAW5Xb/mAC2L7mVkcUwFbltj+Y9etg0yk29vZhtbYOm1s70DwIvyEI8ucnYHrqI7h0sQAfvP+eaddO+5EH3Ol0oPr8JbyqvfkfiL39JuDPyupruHzxAlz54hPIZOSg1CsUaTUQ7l//VAbC7Z0EPsdfALRFH2ldBUgDxszd2t7tRnvKM7RFH2ldBcgCxjV30GG5G/rgZ+iDvtKOFCALGE+oTFsSX9MxqfqRBYxny6Ytia/pmFT9yAKOLoVMhEviazIeZR+ygCmLxik2soCxiGHakviajknVjyxgrFCZtiS+pmNS9SMLGMuPpi2Jr+mYVP3IAsbaMpYfdRv6SF26qxpZwBgi1panPv6wG+0pz9AWfaR1FSANGDcOvro+GyuTMXPRNo3NBiyUvNnY7KrE+Bn53SQEdvXKDFy+dMHKduFuvQFPny3BuVwOptURIaceOTc20eO6OvvlpyPVut0+hNKTZ6C+Dh9a7TZUF1fg2uxnIx1z1J2TPkSPevK9/SPUx+XncHB8MwF+Vltb19rN6u2PynMBfEzixfJqeLdIP5h/Ky/A9/nuMQtgRXRjcxsQ8KDWbB6oz14N+ojFe2MPGAE+UYfmYW15ZQ1263vDTMh+NtaA8fYePKk6PPRPBVSuLIYnX6caEjMYa8BPq0tQb8TLzHpjHzCTubWxBbyqzpBrrze0eOFavK/u4uTUWALGSlNZnd2a3kGJ6ylmr27rdAIoKz+8pOLS2AGOKk2YgX/8XYaDVltL66NiRtUYEt65WVvTy3ytAFM2ZgW4t9KEOuzsNuD3hcewvVOPJQtmHp4x9xYzYjn2GVUXX2r/YvV1Ye0lG8CDKk2oEpYUMZPj3GKL17pvE9zMF1HxfR8qBof4yN/mIxvAJ1WaUCyEj2vqsHV5WDHDRPD1t1ssdpxYAI4L56R1OU4xwwRypbqsrqEPTVyt+ZAHrAunf13WKWboqh7tOOn62bQnDdgUTu+6rFPMMBGe+o4TacBJ4ETrsm4xwwQy5R0nsoBNKk0mcNLwobzjRBKwaaUpDVimfVDdcSIHOGmlyRRQGn4Ud5xIAU6r0pQGLJM+KO44kQKcVqXJBE5aPtR2nMgAjlvMSAvEqPqhtuNEArBuMWNUcNLql9KO05kDNi1mpAVjVP1Q2XE6c8BJihmjgpNGv1R2nM78LxuuXf0c8EfaaBQ48wwezbSk10gBARwp4eijAHYUbDQtARwp4eijAHYUbDQt62fRtv9vUDTRcX2UDHacvAAWwI4r4Pj0JIMFsOMKOD49yWAB7LgCjk9PMlgAO66A49OTDBbAjivg+PQkgwWw4wo4Pj3JYAHsuAKOT08yWAA7roDj05MMFsCOK+D49CSDBbDjCjg+PclgAey4Ao5PT2WwF++rWh0Xws3pefWMB7Dk5uRkVsgW1+B5kcJZBeYz2Ynsfc/z+P7nJ2fZJJsYMkW2mVs3b5QggHvJuhNvcgoopsg2vEwqTOfvKuIPyAUpARkpgCyRKTqHgIvFYqswlb/tgfeTHK6NNCXhhOyQIbJEphiUOtF6tz18tFD0W/4d9e6c+ucxM+oL8yfftZBXtBTw6sdXQvO45oZLbk+A/wFCn6eLV03nkQAAAABJRU5ErkJggg==";
var avatar_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$O = ["src", "alt"];
const _hoisted_2$w = ["src", "alt"];
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  props: {
    src: null,
    size: { default: "small" },
    round: { type: Boolean },
    type: null,
    errorSrc: null,
    color: { default: "#f0f2f5" },
    alt: null
  },
  setup(__props) {
    const image = ref();
    const isError = ref(false);
    onMounted(() => {
      image.value.onerror = () => {
        isError.value = true;
      };
    });
    return (_ctx, _cache) => {
      var _a2, _b2;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mAvatar", "avatar-" + __props.size, __props.round && "avatar-round"]),
        style: normalizeStyle({ ["--avatar-color"]: __props.color })
      }, [
        !isError.value ? (openBlock(), createElementBlock("img", {
          key: 0,
          class: normalizeClass([__props.type]),
          src: __props.src,
          alt: __props.alt,
          ref_key: "image",
          ref: image
        }, null, 10, _hoisted_1$O)) : (openBlock(), createElementBlock("img", {
          key: 1,
          src: (_a2 = __props.errorSrc) != null ? _a2 : unref(errorImage),
          alt: (_b2 = __props.alt) != null ? _b2 : "\u52A0\u8F7D\u5931\u8D25"
        }, null, 8, _hoisted_2$w))
      ], 6);
    };
  }
});
var avatar = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-82290a3c"]]);
avatar.name = "mAvatar";
const mAvatar = withInstall(avatar);
var gradient_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
  props: {
    deg: { default: "90deg" },
    colors: { default: () => ["#ee9ca7", "#ffdde1"] }
  },
  setup(__props) {
    const props = __props;
    const gradient2 = processStyle("linear-gradient(" + props.deg + ",", ")", ",", props.colors);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-gradient",
        style: normalizeStyle({ backgroundImage: unref(gradient2) })
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4);
    };
  }
});
var gradient = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__scopeId", "data-v-281b4756"]]);
gradient.name = "mGradient";
const mGradient = withInstall(gradient);
var backtop_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$N = /* @__PURE__ */ createTextVNode(" Top ");
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  props: {
    offset: { default: 200 },
    right: { default: 50 },
    bottom: { default: 50 },
    size: { default: "small" },
    circle: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    let callback = () => {
    };
    const scrollRef = ref();
    const showBackTop = ref(false);
    let scrollHandle = () => {
    };
    function clickHandle() {
      scrollHandle();
    }
    onMounted(() => {
      const result = useScroll(scrollRef.value);
      if (!result) {
        return;
      }
      const { scrollPos, scrollTop } = result;
      scrollHandle = scrollTop;
      const scrollInfo = scrollPos();
      callback = scrollInfo.callback;
      const scrollY = scrollInfo.scroll;
      watchEffect(() => {
        if (scrollY.value >= props.offset) {
          showBackTop.value = true;
        } else {
          showBackTop.value = false;
        }
      });
    });
    onUnmounted(() => {
      callback();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mBackTop", ["backTop-" + __props.size, showBackTop.value && "back-show", __props.circle && "circle"]]),
        style: normalizeStyle([{ right: __props.right + "px" }, { bottom: __props.bottom + "px" }]),
        ref_key: "scrollRef",
        ref: scrollRef,
        onClick: clickHandle
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          _hoisted_1$N
        ], true)
      ], 6);
    };
  }
});
var backTop = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-543d0380"]]);
backTop.name = "mBackTop";
const mBackTop = withInstall(backTop);
var card_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$M = { class: "m-card-common m-card-aside" };
const _hoisted_2$v = { class: "m-card-common m-card-header" };
const _hoisted_3$l = { class: "m-card-common" };
const _hoisted_4$c = { class: "m-card-common m-card-footer" };
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  props: {
    size: null,
    type: null
  },
  setup(__props) {
    const props = __props;
    const shadow = ref(props.type === "always" ? true : false);
    function handleEnter() {
      if (props.type === "hover") {
        shadow.value = true;
      }
    }
    function handleLeave() {
      if (props.type === "hover") {
        shadow.value = false;
      }
    }
    function handleClick() {
      if (props.type === "click") {
        shadow.value = !shadow.value;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-card", [shadow.value && "active"]]),
        onMouseenter: handleEnter,
        onMouseleave: handleLeave,
        onClick: handleClick
      }, [
        createBaseVNode("aside", _hoisted_1$M, [
          renderSlot(_ctx.$slots, "cover", {}, void 0, true)
        ]),
        createBaseVNode("header", _hoisted_2$v, [
          renderSlot(_ctx.$slots, "header", {}, void 0, true)
        ]),
        createBaseVNode("main", _hoisted_3$l, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        createBaseVNode("footer", _hoisted_4$c, [
          renderSlot(_ctx.$slots, "footer", {}, void 0, true)
        ])
      ], 34);
    };
  }
});
var Card = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-287245d4"]]);
const mCard = withInstall(Card, "mCard");
var divider_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$L = { class: "m-divider-slot" };
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  props: {
    vertical: { type: Boolean },
    shape: { default: "solid" },
    color: { default: "rgb(229, 229, 225)" },
    titlePlacement: { default: "center" },
    width: { default: "1px" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-divider", __props.vertical && "m-divider-vertical"]),
        style: normalizeStyle([
          { ["--m-divider-color"]: __props.color },
          { ["--m-divider-shape"]: __props.shape },
          { ["--m-divider-width"]: __props.width }
        ])
      }, [
        createBaseVNode("p", {
          class: normalizeClass(["m-divider-common", [__props.titlePlacement === "left" && "m-divider-left"]])
        }, null, 2),
        createBaseVNode("p", _hoisted_1$L, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        createBaseVNode("p", {
          class: normalizeClass(["m-divider-common", [__props.titlePlacement === "right" && "m-divider-right"]])
        }, null, 2)
      ], 6);
    };
  }
});
var mDivider$1 = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-6650d72a"]]);
const mDivider = withInstall(mDivider$1, "mDivider");
var collapseTitle_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$K = { class: "slot" };
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  props: {
    isExtension: { type: Boolean, default: false },
    title: null
  },
  emits: ["titleClick"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const extension = ref(props.isExtension);
    watch(() => props.isExtension, (newValue) => {
      extension.value = newValue;
    });
    const titleClick = () => {
      extension.value = !extension.value;
      emits("titleClick", extension.value);
    };
    return (_ctx, _cache) => {
      const _component_m_icon = resolveComponent("m-icon");
      return openBlock(), createElementBlock("div", {
        class: "bgCollapseTitle",
        onClick: titleClick
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createBaseVNode("div", _hoisted_1$K, [
            createVNode(_component_m_icon, {
              name: "m-right",
              class: normalizeClass([extension.value && "extension", "common"])
            }, null, 8, ["class"]),
            createBaseVNode("p", null, toDisplayString(__props.title), 1)
          ])
        ], true)
      ]);
    };
  }
});
var collapseTitleVue = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-4e1dc0d8"]]);
var collapse_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$J = { class: "mCollapse" };
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  props: {
    title: null,
    accordion: { type: Boolean, default: false }
  },
  emits: ["change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const currentKey = [];
    provide("accordion", props.accordion);
    collapseMitt.on("open", (key) => {
      currentKey.push(key);
      emits("change", currentKey);
    });
    collapseMitt.on("close", (key) => {
      currentKey.splice(currentKey.indexOf(key), 1);
      emits("change", currentKey);
    });
    onMounted(() => {
      collapseMitt.off("*");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$J, [
        createVNode(collapseTitleVue, {
          class: "title",
          isExtension: false,
          isHeader: true
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(__props.title), 1)
            ], true)
          ]),
          _: 3
        }),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
var Collapse = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__scopeId", "data-v-428d73e4"]]);
var collapseItem_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  props: {
    index: null,
    extension: { type: Boolean, default: false },
    content: null,
    title: null
  },
  emits: ["open", "close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const height = ref(0);
    const contentDiv = ref();
    const extension = ref(props.extension);
    const accordion = inject("accordion", false);
    const changeExtension = (value) => {
      if (value) {
        emits("open", props.index);
        collapseMitt.emit("open", props.index);
      } else {
        emits("close", props.index);
        collapseMitt.emit("close", props.index);
      }
      if (accordion) {
        collapseMitt.emit("close");
      }
      nextTick(() => {
        extension.value = value;
      });
    };
    if (accordion) {
      const close = () => {
        extension.value = false;
      };
      collapseMitt.on("close", close);
      onUnmounted(() => {
        collapseMitt.off("*");
      });
    }
    watch(() => props.extension, (newValue) => {
      if (newValue) {
        emits("open", props.index);
        collapseMitt.emit("open", props.index);
      } else {
        emits("close", props.index);
        collapseMitt.emit("close", props.index);
      }
      extension.value = newValue;
    });
    onMounted(() => {
      height.value = parseFloat(getComputedStyle(contentDiv.value).height) + 40;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["bgCollpaseItem", extension.value && "extension"]),
        style: normalizeStyle([{ ["--m-collapse-height"]: height.value + "px" }])
      }, [
        createVNode(collapseTitleVue, {
          title: __props.title,
          isExtension: extension.value,
          onTitleClick: changeExtension
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "title", {}, void 0, true)
          ]),
          _: 3
        }, 8, ["title", "isExtension"]),
        createBaseVNode("p", {
          class: "content",
          ref_key: "contentDiv",
          ref: contentDiv
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.content), 1)
          ], true)
        ], 512)
      ], 6);
    };
  }
});
var CollapseItem = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__scopeId", "data-v-c5e10bda"]]);
const mCollapse = withInstall(Collapse, "mCollapse");
const mCollapseItem = withInstall(CollapseItem, "mCollapseItem");
var inputNumber_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$I = /* @__PURE__ */ createTextVNode("-");
const _hoisted_2$u = {
  key: 1,
  class: "m-input-common-left"
};
const _hoisted_3$k = /* @__PURE__ */ createTextVNode(" + ");
const _hoisted_4$b = /* @__PURE__ */ createTextVNode(" - ");
const _hoisted_5$a = /* @__PURE__ */ createTextVNode("+");
const _hoisted_6$9 = {
  key: 1,
  class: "m-input-common-left"
};
const _hoisted_7$7 = /* @__PURE__ */ createTextVNode(" + ");
const _hoisted_8$5 = /* @__PURE__ */ createTextVNode("-");
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  props: {
    step: { default: 1 },
    max: { default: Number.MAX_SAFE_INTEGER },
    min: { default: Number.MIN_SAFE_INTEGER },
    fixed: { default: 0 },
    size: { default: "small" },
    modelValue: null,
    controlsPosition: { default: "between" },
    disabled: { type: Boolean, default: false },
    inputDisabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const zero = 0;
    const value = ref(props.modelValue > props.max || props.modelValue < props.min ? props.min === Number.MIN_SAFE_INTEGER ? processFiexd(zero, props.fixed) : processFiexd(props.min, props.fixed) : processFiexd(props.modelValue, props.fixed));
    watch(() => props.modelValue, (newValue) => {
      value.value = processFiexd(newValue, props.fixed);
    });
    const hover = ref(false);
    const inputHandler = (event) => {
      if (event.target.value !== "") {
        const userInput = processFiexd(+event.target.value, props.fixed);
        if (!isNaN(Number(userInput))) {
          if (+userInput > props.max) {
            value.value = processFiexd(props.max, props.fixed);
          } else if (+userInput < props.min) {
            value.value = processFiexd(props.min, props.fixed);
          } else {
            value.value = userInput;
          }
        } else {
          value.value = void 0;
        }
        emits("update:modelValue", +value.value);
      }
    };
    const decrement = () => {
      value.value = +value.value - props.step < props.min ? processFiexd(value.value, props.fixed) : processFiexd(+value.value - props.step, props.fixed);
      emits("update:modelValue", +value.value);
    };
    const increment = () => {
      value.value = +value.value + props.step > props.max ? processFiexd(value.value, props.fixed) : processFiexd(+value.value + props.step, props.fixed);
      emits("update:modelValue", +value.value);
    };
    let mouseUp = false;
    function continuousIncrement() {
      processContinuous(increment);
    }
    function continuousDecrement() {
      processContinuous(decrement);
    }
    function stopIncrement() {
      if (!props.disabled) {
        increment();
        mouseUp = true;
      }
    }
    function stopDecrement() {
      if (!props.disabled) {
        decrement();
        mouseUp = true;
      }
    }
    function processContinuous(execFn) {
      if (!props.disabled) {
        mouseUp = false;
        setTimeout(() => {
          let timer = setInterval(() => {
            if (!mouseUp) {
              execFn();
            } else {
              clearInterval(timer);
            }
          }, 100);
        }, 300);
      }
    }
    function processFiexd(num, fixed) {
      if (typeof num === "number") {
        return +num.toFixed(fixed);
      }
      return num;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["bgInputNumber", __props.size, hover.value && "hover"]),
        onMouseenter: _cache[1] || (_cache[1] = ($event) => hover.value = true),
        onMouseleave: _cache[2] || (_cache[2] = ($event) => hover.value = false)
      }, [
        createVNode(mInput$1, mergeProps({
          class: "m-input-number",
          type: "number",
          modelValue: value.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
          onInput: inputHandler,
          suffix: __props.controlsPosition !== "left",
          prefix: __props.controlsPosition !== "right",
          useBorder: false,
          size: __props.size
        }, _ctx.$attrs, {
          center: __props.controlsPosition === "between",
          disabled: __props.disabled,
          max: __props.max,
          min: __props.min,
          step: __props.step,
          radius: "5px",
          inputDisabled: __props.inputDisabled
        }), {
          prefix: withCtx(() => [
            __props.controlsPosition === "between" ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass([(value.value == __props.min || __props.disabled) && "disabled", "input-number-common"]),
              onMousedown: continuousDecrement,
              onMouseup: stopDecrement
            }, [
              renderSlot(_ctx.$slots, "left", {}, () => [
                _hoisted_1$I
              ], true)
            ], 34)) : __props.controlsPosition === "left" ? (openBlock(), createElementBlock("div", _hoisted_2$u, [
              createBaseVNode("div", {
                class: normalizeClass([(value.value == __props.max || __props.disabled) && "disabled", "m-input-left-child"]),
                onMousedown: continuousIncrement,
                onMouseup: stopIncrement
              }, [
                renderSlot(_ctx.$slots, "right", {}, () => [
                  _hoisted_3$k
                ], true)
              ], 34),
              createVNode(mDivider$1),
              createBaseVNode("div", {
                class: normalizeClass([(value.value == __props.min || __props.disabled) && "disabled", "m-input-left-child"]),
                onMousedown: continuousDecrement,
                onMouseup: stopDecrement
              }, [
                renderSlot(_ctx.$slots, "left", {}, () => [
                  _hoisted_4$b
                ], true)
              ], 34)
            ])) : createCommentVNode("", true)
          ]),
          suffix: withCtx(() => [
            __props.controlsPosition === "between" ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass([(value.value == __props.max || __props.disabled) && "disabled", "input-number-common"]),
              onMousedown: continuousIncrement,
              onMouseup: stopIncrement
            }, [
              renderSlot(_ctx.$slots, "right", {}, () => [
                _hoisted_5$a
              ], true)
            ], 34)) : __props.controlsPosition === "right" ? (openBlock(), createElementBlock("div", _hoisted_6$9, [
              createBaseVNode("div", {
                class: normalizeClass([(value.value == __props.max || __props.disabled) && "disabled", "m-input-left-child"]),
                onMousedown: continuousIncrement,
                onMouseup: stopIncrement
              }, [
                renderSlot(_ctx.$slots, "right", {}, () => [
                  _hoisted_7$7
                ], true)
              ], 34),
              createVNode(mDivider$1),
              createBaseVNode("div", {
                class: normalizeClass([(value.value == __props.min || __props.disabled) && "disabled", "m-input-left-child"]),
                onMousedown: continuousDecrement,
                onMouseup: stopDecrement
              }, [
                renderSlot(_ctx.$slots, "left", {}, () => [
                  _hoisted_8$5
                ], true)
              ], 34)
            ])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 16, ["modelValue", "suffix", "prefix", "size", "center", "disabled", "max", "min", "step", "inputDisabled"])
      ], 34);
    };
  }
});
var mInputNumber$1 = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-7f252022"]]);
const mInputNumber = withInstall(mInputNumber$1, "mInputNumber");
const radioConfig = {
  name: Symbol("name"),
  modelValue: Symbol("modelValue"),
  size: Symbol("size"),
  button: Symbol("button"),
  disabled: Symbol("disabled"),
  select: Symbol("isSelect")
};
var checkBox_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$H = ["type", "name", "disabled", "value"];
const _hoisted_2$t = {
  key: 1,
  class: "border"
};
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: null,
    disabled: { type: Boolean, default: void 0 },
    name: null,
    value: null,
    isRadio: { type: Boolean, default: void 0 },
    size: null,
    border: { type: Boolean, default: void 0 },
    button: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const check = useInject(props.modelValue, radioConfig.modelValue, ref(""));
    const hasBorder = useInject(props.border, "border", false);
    const isButton = useInject(props.button, radioConfig.button, false);
    const mSize = useInject(props.size, radioConfig.size, "small");
    const disabled = useInject(props.disabled, radioConfig.disabled, false);
    const isSelect = useInject(void 0, radioConfig.select, false);
    let isChecked = ref(props.isRadio ? true : check.value.includes(props.value));
    watch(check, (newValue) => {
      if (props.isRadio) {
        emits("update:modelValue", newValue);
      } else {
        if (newValue.includes(props.value)) {
          isChecked.value = true;
          emits("update:modelValue", newValue);
        } else {
          isChecked.value = false;
        }
      }
    }, {
      deep: true
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: normalizeClass([
          "m-checkbox-" + unref(mSize),
          (unref(disabled) || !unref(isChecked) && !unref(isSelect)) && "disabled",
          unref(isButton) && "labelBorder",
          unref(hasBorder) && "hasBorder",
          "m-check-box"
        ]),
        style: normalizeStyle([{ cursor: unref(disabled) && "not-allowed" }])
      }, [
        withDirectives(createBaseVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(check) ? check.value = $event : null),
          type: __props.isRadio ? "radio" : "checkbox",
          name: __props.name,
          disabled: unref(disabled) || !unref(isChecked) && !unref(isSelect),
          class: normalizeClass(unref(isButton) && "noMarge"),
          value: __props.value
        }, null, 10, _hoisted_1$H), [
          [vModelDynamic, unref(check)]
        ]),
        !unref(isButton) ? (openBlock(), createElementBlock("p", {
          key: 0,
          class: normalizeClass(__props.isRadio && "radio")
        }, null, 2)) : createCommentVNode("", true),
        unref(isButton) ? (openBlock(), createElementBlock("div", _hoisted_2$t)) : createCommentVNode("", true),
        createBaseVNode("span", null, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ], 6);
    };
  }
});
var CheckBox = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-70b18d09"]]);
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  props: {
    disabled: { type: Boolean, default: void 0 },
    name: null,
    value: null,
    size: null,
    button: { type: Boolean, default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const name = useInject(props.name, radioConfig.name);
    const size2 = useInject(props.size, radioConfig.size, "small");
    const button = useInject(props.button, radioConfig.button, false);
    const disabled = useInject(props.disabled, radioConfig.disabled, false);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(CheckBox, {
        isRadio: true,
        name: unref(name),
        value: __props.value,
        size: unref(size2),
        button: unref(button),
        disabled: unref(disabled)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["name", "value", "size", "button", "disabled"]);
    };
  }
});
var radioGroup_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$G = { class: "m-radio-group" };
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  props: {
    name: null,
    modelValue: null,
    disabled: { type: Boolean, default: void 0 },
    button: { type: Boolean, default: void 0 },
    size: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    var _a2, _b2, _c2;
    const props = __props;
    const value = ref(props.modelValue);
    watch(value, (newValue) => {
      emits("update:modelValue", newValue);
    });
    provide(radioConfig.name, props.name);
    provide(radioConfig.modelValue, value);
    provide(radioConfig.size, (_a2 = props.size) != null ? _a2 : "small");
    provide(radioConfig.button, (_b2 = props.button) != null ? _b2 : false);
    provide(radioConfig.disabled, (_c2 = props.disabled) != null ? _c2 : false);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$G, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});
const mRadio = withInstall(_sfc_main$Q, "mRadio");
const mRadioGroup = withInstall(_sfc_main$P, "mRadioGroup");
var checkBoxGroup_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$F = { class: "m-check-box-group" };
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  props: {
    name: null,
    modelValue: null,
    disabled: { type: Boolean },
    selectColor: null,
    button: { type: Boolean },
    border: { type: Boolean },
    size: null,
    max: { default: Number.MAX_SAFE_INTEGER },
    min: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    var _a2, _b2, _c2, _d2;
    const props = __props;
    const isSelect = ref(!!(props.modelValue.length < props.max));
    const value = ref(props.modelValue);
    watch(value, (newValue) => {
      if (newValue.length === props.max) {
        isSelect.value = false;
      } else {
        isSelect.value = true;
      }
      if (newValue.length <= props.max) {
        emits("update:modelValue", newValue);
      }
    });
    provide(radioConfig.select, isSelect);
    provide(radioConfig.name, props.name);
    provide(radioConfig.modelValue, value);
    provide(radioConfig.size, (_a2 = props.size) != null ? _a2 : "small");
    provide(radioConfig.button, (_b2 = props.button) != null ? _b2 : false);
    provide("border", (_c2 = props.border) != null ? _c2 : false);
    provide(radioConfig.disabled, (_d2 = props.disabled) != null ? _d2 : false);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$F, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});
const mCheckBox = withInstall(CheckBox, "mCheckBox");
const mCheckBoxGroup = withInstall(_sfc_main$O, "mCheckBoxGroup");
var select_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$E = {
  class: /* @__PURE__ */ normalizeClass(["m-select-contain"])
};
const _hoisted_2$s = ["onClick"];
const _hoisted_3$j = {
  key: 0,
  class: "m-select-box-multipart"
};
const _hoisted_4$a = {
  key: 0,
  class: "m-select-multiple-show"
};
const _hoisted_5$9 = ["onClick"];
const _hoisted_6$8 = { key: 1 };
const _hoisted_7$6 = {
  key: 1,
  class: "m-select-box-clone"
};
const _hoisted_8$4 = { class: "m-select-list" };
const _hoisted_9$4 = ["onClick"];
const _hoisted_10$4 = ["onClick"];
const _hoisted_11$5 = /* @__PURE__ */ createTextVNode(" \u663E\u793A\u66F4\u591A ");
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: null,
    multiple: { type: Boolean, default: false },
    options: null,
    size: { default: "small" },
    disabled: { type: Boolean },
    placeholder: null,
    autoPosition: { type: Boolean },
    delete: { type: Boolean, default: false },
    more: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "loading"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const isShowList = ref(false);
    let selectItem = reactive([]);
    let values = reactive([]);
    const position = ref("bottom");
    const listRef = ref(null);
    let bscroll = null;
    const loading = ref(false);
    const items = Array.isArray(props.modelValue) ? [...props.modelValue] : [props.modelValue];
    if (items.length !== 0) {
      items.forEach((item) => {
        if (props.options.includes(item)) {
          selectItem.push(item);
          values.push(item);
        } else {
          props.options.forEach((option) => {
            if (option.value === item) {
              selectItem.push(option.label);
              values.push(option.value);
            }
          });
        }
      });
    }
    function clickHandler(item) {
      var _a2, _b2, _c2;
      const value = (_a2 = item.label) != null ? _a2 : item;
      if (!props.disabled) {
        if (!item.disabled) {
          if (props.multiple) {
            if (!selectItem.includes(value)) {
              selectItem.push(value);
              values.push((_b2 = item.value) != null ? _b2 : item);
            } else {
              selectItem.splice(selectItem.indexOf(value), 1);
              values.splice(values.indexOf(value), 1);
            }
          } else {
            selectItem[0] = value;
            values[0] = (_c2 = item.value) != null ? _c2 : item;
            isShowList.value = false;
          }
        }
      }
      console.log(values);
      emits("update:modelValue", props.multiple ? values : values[0]);
    }
    watch(() => props.options, () => {
      nextTick(() => {
        bscroll.refresh();
        loading.value = false;
      });
    }, {
      deep: true
    });
    function changeShowStatusHandle() {
      if (props.disabled) {
        return;
      }
      isShowList.value = !isShowList.value;
    }
    const showListClickHandle = (event) => {
      if (!props.disabled && !isShowList.value) {
        let windowHandle = function(event2) {
          if (!event2.target.dataset.name) {
            isShowList.value = false;
          }
        };
        position.value = computedPosition(listRef.value);
        isShowList.value = true;
        setTimeout(() => {
          bscroll.refresh();
        }, 500);
        addEventListener("click", windowHandle);
      }
    };
    const deleteClickHandle = (index2) => {
      if (index2 != void 0) {
        selectItem.splice(index2, 1);
        values.splice(index2, 1);
        return;
      }
      while (selectItem.length !== 0) {
        selectItem.pop();
        values.pop();
      }
    };
    function showLoadingHandle() {
      loading.value = true;
      emits("loading");
    }
    window.onresize = () => {
      position.value = computedPosition(listRef.value);
    };
    onMounted(() => {
      position.value = computedPosition(listRef.value);
      bscroll = useScroll$1(listRef.value);
    });
    return (_ctx, _cache) => {
      const _component_m_icon = resolveComponent("m-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$E, [
        createBaseVNode("div", {
          class: normalizeClass([
            "m-select-box",
            __props.disabled && "m-select-disabled",
            "m-select-" + __props.size,
            unref(selectItem).length === 0 && "m-select-placeholder"
          ]),
          onClick: withModifiers(showListClickHandle, ["stop"])
        }, [
          __props.multiple ? (openBlock(), createElementBlock("div", _hoisted_3$j, [
            unref(selectItem).length !== 0 ? (openBlock(), createElementBlock("ul", _hoisted_4$a, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(selectItem), (item, index2) => {
                var _a2, _b2;
                return openBlock(), createElementBlock("li", {
                  key: (_a2 = item.value) != null ? _a2 : item
                }, [
                  createBaseVNode("span", null, toDisplayString((_b2 = item.value) != null ? _b2 : item), 1),
                  createBaseVNode("span", {
                    class: "m-select-list-delete",
                    onClick: withModifiers(($event) => deleteClickHandle(index2), ["stop"])
                  }, [
                    createVNode(_component_m_icon, { name: "m-cha" })
                  ], 8, _hoisted_5$9)
                ]);
              }), 128))
            ])) : (openBlock(), createElementBlock("span", _hoisted_6$8, toDisplayString(__props.placeholder), 1))
          ])) : (openBlock(), createElementBlock("div", _hoisted_7$6, toDisplayString(unref(selectItem).length === 0 ? __props.placeholder : unref(selectItem)[0]), 1)),
          createBaseVNode("p", {
            class: normalizeClass(["m-select-icon", isShowList.value && "hover"])
          }, [
            __props.delete ? (openBlock(), createBlock(_component_m_icon, {
              key: 0,
              name: "m-delete",
              onClick: _cache[0] || (_cache[0] = ($event) => deleteClickHandle(null))
            })) : (openBlock(), createBlock(_component_m_icon, {
              key: 1,
              name: "m-right",
              onClick: withModifiers(changeShowStatusHandle, ["stop"])
            }, null, 8, ["onClick"]))
          ], 2)
        ], 10, _hoisted_2$s),
        createBaseVNode("main", {
          class: normalizeClass([
            "m-select-scrollContain",
            isShowList.value && "m-select-show-list",
            "m-select-show-" + position.value
          ]),
          ref_key: "listRef",
          ref: listRef
        }, [
          createBaseVNode("ul", _hoisted_8$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (item, index2) => {
              var _a2, _b2;
              return openBlock(), createElementBlock("li", {
                key: (_a2 = item.value) != null ? _a2 : item,
                "data-name": "m-select-item",
                class: normalizeClass([
                  item.disabled && "m-select-item-disabled",
                  unref(selectItem).includes((_b2 = item.label) != null ? _b2 : item) && "m-select-list-active"
                ]),
                onClick: ($event) => clickHandler(item)
              }, [
                renderSlot(_ctx.$slots, "default", {
                  item,
                  index: index2
                }, () => {
                  var _a3;
                  return [
                    createTextVNode(toDisplayString((_a3 = item.label) != null ? _a3 : item), 1)
                  ];
                }, true)
              ], 10, _hoisted_9$4);
            }), 128)),
            __props.more ? (openBlock(), createBlock(mDivider$1, { key: 0 })) : createCommentVNode("", true),
            __props.more ? (openBlock(), createElementBlock("li", {
              key: 1,
              class: normalizeClass([
                "m-select-list-more",
                !loading.value && "m-select-list-more-after"
              ]),
              onClick: withModifiers(showLoadingHandle, ["stop"])
            }, [
              !loading.value ? renderSlot(_ctx.$slots, "more", { key: 0 }, () => [
                _hoisted_11$5
              ], true) : (openBlock(), createBlock(_sfc_main$1a, {
                key: 1,
                color: "#0005"
              }))
            ], 10, _hoisted_10$4)) : createCommentVNode("", true)
          ])
        ], 2)
      ]);
    };
  }
});
var mSelect$1 = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-05b331e8"]]);
const mSelect = withInstall(mSelect$1, "mSelect");
var switch_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$D = { class: "m-switch-slider" };
const _hoisted_2$r = { key: 0 };
const _hoisted_3$i = { key: 1 };
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  props: {
    checkValue: null,
    unCheckValue: null,
    checkIconName: null,
    unCheckIconName: null,
    size: { default: "small" },
    modelValue: { type: Boolean },
    checkColor: { default: "#18a058" },
    unCheckColor: { default: "#dbdbdb" },
    color: { default: "#fff" },
    sliderColor: { default: "#fff" },
    radius: { default: 10 },
    disabled: { type: Boolean, default: false }
  },
  emits: ["check", "unCheck", "update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const mapSize = {
      mini: 10,
      small: 15,
      medium: 20
    };
    const checkRef = ref();
    const unCheckRef = ref();
    const currentSize = mapSize[props.size];
    const boxRadius = Math.ceil(currentSize * props.radius / 10);
    const maxWidth = ref(currentSize * 2);
    const isCheck = ref(props.modelValue);
    const isChangeCheck = ref(false);
    watch(() => props.modelValue, (newValue) => {
      isCheck.value = newValue;
    });
    function mouseDownHandle() {
      processDisabled(() => {
        isChangeCheck.value = true;
      });
    }
    function mouseUpHandle() {
      processDisabled(() => {
        if (isChangeCheck.value) {
          isCheck.value = !isCheck.value;
          isChangeCheck.value = false;
          emits("update:modelValue", isCheck.value);
          if (isCheck.value) {
            emits("check");
          } else {
            emits("unCheck");
          }
        }
      });
    }
    function mouseLeaveHandle() {
      processDisabled(() => {
        isChangeCheck.value = false;
      });
    }
    function processDisabled(fn) {
      if (!props.disabled) {
        fn();
      }
    }
    onMounted(() => {
      const leftWidth = checkRef.value.clientWidth;
      const rightWidth = unCheckRef.value.clientWidth;
      maxWidth.value = Math.max(maxWidth.value, Math.max(leftWidth, rightWidth));
      if (maxWidth.value === leftWidth) {
        unCheckRef.value.style.width = maxWidth.value + "px";
      } else if (maxWidth.value === rightWidth) {
        checkRef.value.style.width = maxWidth.value + "px";
      } else {
        checkRef.value.style.width = maxWidth.value + "px";
        unCheckRef.value.style.width = maxWidth.value + "px";
      }
    });
    return (_ctx, _cache) => {
      const _component_m_icon = resolveComponent("m-icon");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "m-switch",
          "m-switch-" + __props.size,
          isChangeCheck.value && "m-switch-slider-big",
          __props.disabled && "m-switch-disabled"
        ]),
        style: normalizeStyle([
          { background: isCheck.value ? __props.checkColor : __props.unCheckColor },
          { color: __props.color },
          { ["--m-switch-max-width"]: maxWidth.value + "px" },
          { ["--m-switch-shadow-color"]: isCheck.value ? __props.checkColor : __props.unCheckColor },
          { ["--m-switch-box-radius"]: unref(boxRadius) + "px" },
          { ["--m-switch-slider-back"]: __props.sliderColor }
        ])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["m-switch-button", isCheck.value && "m-switch-check"]),
          onMousedown: mouseDownHandle,
          onMouseup: mouseUpHandle,
          onMouseleave: mouseLeaveHandle
        }, [
          createBaseVNode("p", {
            ref_key: "checkRef",
            ref: checkRef
          }, [
            renderSlot(_ctx.$slots, "checked", {}, () => [
              createTextVNode(toDisplayString(__props.checkValue), 1)
            ], true)
          ], 512),
          createBaseVNode("div", _hoisted_1$D, [
            isCheck.value && __props.checkIconName ? (openBlock(), createElementBlock("div", _hoisted_2$r, [
              renderSlot(_ctx.$slots, "checkIcon", {}, () => [
                createVNode(_component_m_icon, { name: __props.checkIconName }, null, 8, ["name"])
              ], true)
            ])) : createCommentVNode("", true),
            !isCheck.value && __props.unCheckIconName ? (openBlock(), createElementBlock("div", _hoisted_3$i, [
              renderSlot(_ctx.$slots, "unCheckIcon", {}, () => [
                createVNode(_component_m_icon, { name: __props.unCheckIconName }, null, 8, ["name"])
              ], true)
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("p", {
            ref_key: "unCheckRef",
            ref: unCheckRef
          }, [
            renderSlot(_ctx.$slots, "unChecked", {}, () => [
              createTextVNode(toDisplayString(__props.unCheckValue), 1)
            ], true)
          ], 512)
        ], 34)
      ], 6);
    };
  }
});
var Switch = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-99ce58ae"]]);
const mSwitch = withInstall(Switch, "mSwitch");
var pagination_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$C = {
  key: 0,
  class: "m-pagination-prefix"
};
const _hoisted_2$q = ["onClick"];
const _hoisted_3$h = {
  key: 7,
  class: "m-pagination-suffix"
};
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  props: {
    count: { default: 10 },
    defaultPageSize: { default: 5 },
    nav: { type: Boolean, default: true },
    size: { default: "small" },
    useBack: { type: Boolean, default: false },
    skip: { type: Boolean, default: false },
    modelValue: null,
    prefix: { type: [String, Boolean] },
    pageCount: null,
    pageSizes: null,
    label: { default: "" },
    showSizePicker: { type: Boolean, default: false },
    pageSize: null,
    suffix: { type: [String, Boolean] },
    interval: { default: "5px" }
  },
  emits: ["update:modelValue", "update:pageSize"],
  setup(__props, { emit: emits }) {
    var _a2;
    const props = __props;
    const showLis = reactive(new Array(props.defaultPageSize - 2).fill(0).map((_, index2) => index2 + 2));
    const mid = Math.ceil(showLis.length / 2);
    const lisInfo = reactive({
      left: mid - 1,
      right: showLis.length - mid
    });
    const activeLis = ref((_a2 = props.modelValue) != null ? _a2 : 1);
    const leftMore = ref(false);
    const rightMore = ref(true);
    watch(activeLis, (newValue) => {
      emits("update:modelValue", newValue);
      const count = Number(props.count);
      const defaultPageSize = Number(props.defaultPageSize) > 2 ? Number(props.defaultPageSize) : 3;
      if (newValue - lisInfo.left > 2) {
        leftMore.value = true;
      } else {
        leftMore.value = false;
      }
      if (newValue + lisInfo.right < count - 1) {
        rightMore.value = true;
      } else {
        rightMore.value = false;
      }
      showLis.splice(0, showLis.length);
      if (leftMore.value && !rightMore.value) {
        const startCount = count - (defaultPageSize - 2);
        for (var i = startCount; i < count; i++) {
          showLis.push(i);
        }
      } else if (!leftMore.value && rightMore.value) {
        const startCount = 2;
        for (var i = 0; i < defaultPageSize - 2; i++) {
          showLis.push(startCount + i);
        }
      } else if (leftMore.value && rightMore.value) {
        const startCount = Math.floor(defaultPageSize / 2) - 1;
        for (let i2 = newValue - startCount; i2 <= newValue + startCount; i2++) {
          showLis.push(i2);
        }
      } else {
        for (let i2 = 2; i2 < count; i2++) {
          showLis.push(i2);
        }
      }
    }, {
      immediate: true
    });
    watch(() => props.pageSize, (newSize) => {
      emits("update:pageSize", newSize);
    });
    const toLeft = () => {
      if (activeLis.value > 1) {
        activeLis.value--;
      }
    };
    const toRight = () => {
      if (activeLis.value < props.count) {
        activeLis.value++;
      }
    };
    const clickLeftMore = () => {
      activeLis.value = showLis.shift();
    };
    const clickRightMore = () => {
      activeLis.value = showLis.pop();
    };
    return (_ctx, _cache) => {
      const _component_m_icon = resolveComponent("m-icon");
      return openBlock(), createElementBlock("ul", {
        class: normalizeClass([
          "m-pagination",
          "m-pagination-" + __props.size,
          __props.useBack && "m-pagination-background",
          __props.skip && "m-pagination-skiping"
        ]),
        style: normalizeStyle([{ "--m-pagination-interval": __props.interval }])
      }, [
        __props.prefix ? (openBlock(), createElementBlock("li", _hoisted_1$C, [
          renderSlot(_ctx.$slots, "prefix", {}, () => [
            createTextVNode(toDisplayString(__props.prefix), 1)
          ], true)
        ])) : createCommentVNode("", true),
        __props.nav ? (openBlock(), createElementBlock("li", {
          key: 1,
          onClick: toLeft,
          class: normalizeClass(["m-pagination-nav", activeLis.value === 1 && "m-pagination-disabled"])
        }, [
          renderSlot(_ctx.$slots, "left", {}, () => [
            createVNode(_component_m_icon, { name: "m-after" })
          ], true)
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("li", {
          class: normalizeClass(activeLis.value === 1 && "active"),
          onClick: _cache[0] || (_cache[0] = ($event) => activeLis.value = 1)
        }, toDisplayString(__props.label) + "1 ", 3),
        +__props.defaultPageSize < +__props.count ? withDirectives((openBlock(), createElementBlock("li", {
          key: 2,
          onClick: clickLeftMore,
          class: "m-pagination-nav"
        }, [
          createVNode(_component_m_icon, { name: "m-ellipsis" })
        ], 512)), [
          [vShow, leftMore.value]
        ]) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(showLis), (item, index2) => {
          return openBlock(), createElementBlock("li", {
            key: index2,
            class: normalizeClass(+activeLis.value === +item && "active"),
            onClick: ($event) => activeLis.value = item
          }, toDisplayString(__props.label + item), 11, _hoisted_2$q);
        }), 128)),
        +__props.defaultPageSize < +__props.count ? withDirectives((openBlock(), createElementBlock("li", {
          key: 3,
          onClick: clickRightMore,
          class: "m-pagination-nav"
        }, [
          createVNode(_component_m_icon, { name: "m-ellipsis" })
        ], 512)), [
          [vShow, rightMore.value]
        ]) : createCommentVNode("", true),
        createBaseVNode("li", {
          class: normalizeClass(+activeLis.value === +__props.count && "active"),
          onClick: _cache[1] || (_cache[1] = ($event) => activeLis.value = __props.count)
        }, toDisplayString(__props.label + __props.count), 3),
        __props.nav ? (openBlock(), createElementBlock("li", {
          key: 4,
          onClick: toRight,
          class: normalizeClass(["m-pagination-nav", activeLis.value === __props.count && "m-pagination-disabled"])
        }, [
          renderSlot(_ctx.$slots, "right", {}, () => [
            createVNode(_component_m_icon, { name: "m-right" })
          ], true)
        ], 2)) : createCommentVNode("", true),
        __props.showSizePicker ? (openBlock(), createBlock(mSelect$1, {
          key: 5,
          class: "m-pagination-select",
          options: __props.pageSizes,
          modelValue: __props.pageSize,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(pageSize) ? pageSize.value = $event : null),
          size: "mini"
        }, null, 8, ["options", "modelValue"])) : createCommentVNode("", true),
        __props.skip ? (openBlock(), createBlock(mInputNumber$1, {
          key: 6,
          class: "m-pagination-skip",
          min: 1,
          max: __props.count,
          modelValue: activeLis.value,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => activeLis.value = $event),
          size: "mini"
        }, null, 8, ["max", "modelValue"])) : createCommentVNode("", true),
        __props.suffix ? (openBlock(), createElementBlock("li", _hoisted_3$h, [
          renderSlot(_ctx.$slots, "suffix", {}, () => [
            createTextVNode(toDisplayString(__props.suffix), 1)
          ], true)
        ])) : createCommentVNode("", true)
      ], 6);
    };
  }
});
var Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-283434d4"]]);
const mPagination = withInstall(Pagination, "mPagination");
var tag_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  props: {
    effect: { default: "plain" },
    color: null,
    type: { default: "default" },
    size: { default: "small" },
    rounded: { type: Boolean },
    background: { type: Boolean, default: void 0 },
    isCancle: { type: Boolean, default: false },
    closabled: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ["close", "bgClick"],
  setup(__props, { emit: emits }) {
    var _a2, _b2;
    const props = __props;
    const colors = LightTheme;
    const active = ref(false);
    const color = (_a2 = props.color) != null ? _a2 : colors[props.type];
    const background = (_b2 = props.background) != null ? _b2 : getLightColor(color, 0.8);
    const changecancle = () => {
      if (!props.disabled) {
        emits("close");
      }
    };
    return (_ctx, _cache) => {
      const _component_m_icon = resolveComponent("m-icon");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "mTag",
          "m-tag-" + __props.effect,
          "m-tag-" + __props.size,
          __props.rounded && "m-tag-rounded",
          active.value && "m-tag-active",
          __props.disabled && "m-tag-disabled"
        ]),
        style: normalizeStyle([
          { ["--m-tag-color"]: unref(color) },
          { ["--m-tag-background"]: unref(background) }
        ])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        __props.closabled ? (openBlock(), createBlock(_component_m_icon, {
          key: 0,
          class: "m-tag-icon",
          name: "m-cha",
          onClick: withModifiers(changecancle, ["stop"])
        }, null, 8, ["onClick"])) : createCommentVNode("", true)
      ], 6);
    };
  }
});
var mTag$1 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-bf721010"]]);
const mTag = withInstall(mTag$1, "mTag");
var tooltip_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$4 = (n) => (pushScopeId("data-v-2527a6a0"), n = n(), popScopeId(), n);
const _hoisted_1$B = { class: "m-tooltip-container" };
const _hoisted_2$p = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createBaseVNode("div", { class: "custom-vertical-indicator" }, null, -1));
const _hoisted_3$g = [
  _hoisted_2$p
];
const _hoisted_4$9 = { class: "m-tooltip-header" };
const _hoisted_5$8 = ["onClick"];
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  props: {
    direction: { default: "top" },
    width: { default: "auto" },
    columns: { default: 1 },
    height: { default: "auto" },
    arrow: { type: Boolean, default: true },
    tooltipText: { default: "" },
    tooltipShow: { type: Boolean, default: true },
    trigger: { default: "hover" },
    effect: { default: "light" },
    delay: { default: 0 },
    duration: { default: 0 },
    keepAliveOnHover: { type: Boolean, default: true },
    header: null,
    overflow: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const fatherShow = ref(false);
    const selfShow = ref(false);
    const list = reactive([]);
    const showTooltip = ref(false);
    const tooltipRef = ref();
    const scrollBarRef = ref();
    let bscroll;
    const background = props.effect === "dark" ? "#262626" : "#fafbfc";
    const color = props.effect === "dark" ? "#fff" : "#61666d";
    const hoverColor = "#e3e5e7";
    if (typeof props.tooltipText === "string") {
      list.push(props.tooltipText);
    } else if (Array.isArray(props.tooltipText)) {
      list.splice(0, 0, ...props.tooltipText);
    }
    const tooltipEnterHandle = () => {
      bscroll.refresh();
      if (props.trigger === "hover")
        selfShow.value = true;
    };
    const tooltipLeaveHandle = () => {
      bscroll.refresh();
      if (props.trigger === "hover")
        selfShow.value = false;
    };
    const itemClick = (item, index2) => {
    };
    function enterHandle() {
      processShowTooltip("hover", true);
    }
    function leaveHandle() {
      processShowTooltip("hover", false);
    }
    function clickHandle() {
      processShowTooltip("click", !showTooltip.value);
    }
    function processShowTooltip(name, value) {
      if (props.trigger === name)
        setTimeout(() => {
          fatherShow.value = !fatherShow.value;
          showTooltip.value = value;
          bscroll.refresh();
        }, value ? props.delay : props.duration);
    }
    onMounted(() => {
      bscroll = useScroll$1(tooltipRef.value, {
        scrollbar: {
          interactive: true,
          fade: true,
          customElements: [scrollBarRef.value]
        }
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-tooltip-contain",
        onMouseenter: enterHandle,
        onMouseleave: leaveHandle,
        onClick: clickHandle,
        style: normalizeStyle([
          { ["--m-tooltip-columns"]: +__props.columns },
          { ["--m-tooltip-width"]: __props.width },
          { ["--m-tooltip-height"]: __props.height },
          { ["--m-tooltip-background"]: unref(background) },
          { ["--m-tooltip-color"]: unref(color) },
          { ["--m-tooltip-hover"]: hoverColor },
          { ["--m-tooltip-overflow"]: __props.overflow ? "hidden" : "visible" }
        ])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        createVNode(Transition$1, {
          name: __props.direction === "top" ? "listPositionOpacity" : "listPositionBottomOpacity",
          appear: true
        }, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", {
              class: normalizeClass([
                "m-tooltip",
                "m-tooltip-" + __props.direction,
                __props.arrow && "m-tooltip-arrow",
                unref(list).length === 1 && "m-tooltip-text",
                __props.width !== "auto" && "m-tooltip-width"
              ]),
              ref_key: "tooltipRef",
              ref: tooltipRef,
              onMouseenter: tooltipEnterHandle,
              onMouseleave: tooltipLeaveHandle,
              style: normalizeStyle(!__props.keepAliveOnHover && { "pointer-events": "none" })
            }, [
              createBaseVNode("div", _hoisted_1$B, [
                createBaseVNode("div", {
                  class: "custom-vertical-scrollbar",
                  ref_key: "scrollBarRef",
                  ref: scrollBarRef
                }, _hoisted_3$g, 512),
                createBaseVNode("div", _hoisted_4$9, [
                  renderSlot(_ctx.$slots, "header", {}, () => [
                    createTextVNode(toDisplayString(__props.header), 1)
                  ], true)
                ]),
                createVNode(mDivider$1),
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(list), (item, index2) => {
                  return renderSlot(_ctx.$slots, "tooltip", {
                    key: index2,
                    value: item
                  }, () => [
                    createBaseVNode("p", {
                      onClick: ($event) => itemClick()
                    }, toDisplayString(item), 9, _hoisted_5$8)
                  ], true);
                }), 128))
              ])
            ], 38), [
              [vShow, (fatherShow.value || selfShow.value) && __props.tooltipShow && showTooltip.value]
            ])
          ]),
          _: 3
        }, 8, ["name"])
      ], 36);
    };
  }
});
var tooltipVue = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-2527a6a0"]]);
const mTooltip = withInstall(tooltipVue, "mTooltip");
var ellipsis_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  props: {
    width: null,
    clamp: { default: 1 }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-ellipsis-box",
        style: normalizeStyle([{ ["--m-ellipsis-clamp"]: __props.clamp }, { width: __props.width }])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4);
    };
  }
});
var Ellipsis = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-28454e77"]]);
const mEllipsis = withInstall(Ellipsis, "mEllipsis");
function useChange(from, to, duration, displayedValueRef) {
  const onUpdate = (currentValue) => {
    displayedValueRef.value = Math.round(currentValue);
  };
  const onFinish = () => {
    displayedValueRef.value = to;
  };
  tween({ to, from, onFinish, onUpdate, duration });
}
var scroll_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$A = /* @__PURE__ */ createStaticVNode("<span data-v-c171e3ae>0</span><span data-v-c171e3ae>1</span><span data-v-c171e3ae>2</span><span data-v-c171e3ae>3</span><span data-v-c171e3ae>4</span><span data-v-c171e3ae>5</span><span data-v-c171e3ae>6</span><span data-v-c171e3ae>7</span><span data-v-c171e3ae>8</span><span data-v-c171e3ae>9</span>", 10);
const _hoisted_11$4 = [
  _hoisted_1$A
];
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  props: {
    value: null,
    duration: null
  },
  setup(__props) {
    const props = __props;
    const numberAnimationScrollRef = ref();
    onMounted(() => {
      watch(() => props.value, (newValue) => {
        setTimeout(() => {
          numberAnimationScrollRef.value.style.transform = "translateY(-" + newValue + "0%)";
        }, 100);
      }, {
        immediate: true
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "numberAnimationScroll",
        ref_key: "numberAnimationScrollRef",
        ref: numberAnimationScrollRef,
        style: normalizeStyle({
          ["--m-number-animation-duration"]: __props.duration + "ms"
        })
      }, _hoisted_11$4, 4);
    };
  }
});
var scrollVue = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-c171e3ae"]]);
var numberAnimation_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$z = { key: 0 };
const _hoisted_2$o = { class: "m-number-animation-scroll" };
const _hoisted_3$f = {
  key: 0,
  class: "m-number-animation-separator"
};
const _hoisted_4$8 = { key: 1 };
const _hoisted_5$7 = { class: "m-number-animation-scroll" };
const _hoisted_6$7 = {
  key: 0,
  class: "m-number-animation-separator"
};
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  props: {
    to: null,
    from: null,
    effect: { default: "change" },
    active: { type: Boolean, default: true },
    duration: { default: 1e3 },
    background: { default: "#9995" },
    height: { default: 24 },
    fontSize: { default: 18 },
    color: { default: "#333" },
    showBackground: { type: Boolean, default: false },
    gap: { default: 0 },
    width: null,
    bold: { type: Boolean, default: false },
    showSeparator: { type: Boolean },
    separator: { default: "," },
    prefix: null,
    suffix: null
  },
  setup(__props) {
    const props = __props;
    const { from, duration } = props;
    const numberAnimationRef = ref();
    let displayedValue = ref(from);
    let scrollValue = ref(processScrollValue());
    watch(() => [props.active, props.to], ([newActive, newTo]) => {
      if (newActive) {
        if (props.effect === "change") {
          useChange(from, newTo, duration, displayedValue);
        } else {
          if (String(newTo).length < scrollValue.value.length) {
            scrollValue.value.splice(0, String(newTo).length);
          }
          for (let i = 0; i < String(newTo).length; i++) {
            scrollValue.value[i] = +String(newTo).charAt(i);
          }
        }
      }
    }, {
      immediate: true
    });
    function processScrollValue() {
      return new Array(String(from).length).fill(0).map((_, index2) => +String(from).charAt(index2));
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-number-animation", [
          __props.showBackground && "m-number-animation-background",
          __props.bold && "m-number-animation-bold"
        ]]),
        ref_key: "numberAnimationRef",
        ref: numberAnimationRef,
        style: normalizeStyle([
          { ["--m-number-animation-height"]: Math.max(__props.height, __props.fontSize) + "px" },
          { ["--m-number-animation-width"]: __props.width + "px" },
          { ["--m-number-animation-gap"]: __props.gap + "px" },
          { ["--m-number-animation-fontSize"]: __props.fontSize + "px" },
          { ["--m-number-animation-background"]: __props.background },
          { ["--m-number-animation-color"]: __props.color }
        ])
      }, [
        renderSlot(_ctx.$slots, "prefix", {}, () => [
          createTextVNode(toDisplayString(__props.prefix), 1)
        ], true),
        __props.effect === "change" ? (openBlock(), createElementBlock("div", _hoisted_1$z, [
          createBaseVNode("ul", _hoisted_2$o, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(String(unref(displayedValue)), (item, index2) => {
              return openBlock(), createElementBlock("li", null, [
                __props.showSeparator && (String(unref(displayedValue)).length - index2) % 3 === 0 && index2 !== 0 ? (openBlock(), createElementBlock("p", _hoisted_3$f, toDisplayString(__props.separator), 1)) : createCommentVNode("", true),
                createBaseVNode("p", null, toDisplayString(item), 1)
              ]);
            }), 256))
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_4$8, [
          createBaseVNode("ul", _hoisted_5$7, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(scrollValue), (item, index2) => {
              return openBlock(), createElementBlock("li", { key: index2 }, [
                __props.showSeparator && (unref(scrollValue).length - index2) % 3 === 0 && index2 !== 0 ? (openBlock(), createElementBlock("p", _hoisted_6$7, toDisplayString(__props.separator), 1)) : createCommentVNode("", true),
                createBaseVNode("p", null, [
                  createVNode(scrollVue, {
                    duration: unref(duration),
                    value: item
                  }, null, 8, ["duration", "value"])
                ])
              ]);
            }), 128))
          ])
        ])),
        renderSlot(_ctx.$slots, "suffix", {}, () => [
          createTextVNode(toDisplayString(__props.suffix), 1)
        ], true)
      ], 6);
    };
  }
});
var mNumberAnimation$1 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-0a799ba3"]]);
const mNumberAnimation = withInstall(mNumberAnimation$1, "mNumberAnimation");
var badge_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$y = { class: "m-badge-container" };
const _hoisted_2$n = { key: 0 };
const _hoisted_3$e = { key: 1 };
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  props: {
    value: null,
    dot: { type: Boolean, default: false },
    max: { default: Number.MAX_SAFE_INTEGER },
    type: { default: "default" },
    color: null,
    show: { type: Boolean, default: true },
    showZero: { type: Boolean },
    medium: { type: Boolean, default: false }
  },
  setup(__props) {
    var _a2;
    const props = __props;
    const color = (_a2 = props.color) != null ? _a2 : LightTheme[props.type];
    return (_ctx, _cache) => {
      var _a3;
      return openBlock(), createElementBlock("div", _hoisted_1$y, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        __props.show && (!__props.showZero || __props.value !== 0) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["m-badge", __props.dot && "m-badge-dot", __props.medium && "m-badge-medium"]),
          style: normalizeStyle([{ ["--m-badge-back"]: (_a3 = unref(color)) != null ? _a3 : _ctx.colors[__props.type] }])
        }, [
          renderSlot(_ctx.$slots, "value", {}, () => [
            !__props.dot && typeof __props.value === "number" && __props.value <= __props.max ? (openBlock(), createElementBlock("p", _hoisted_2$n, [
              createVNode(mNumberAnimation$1, {
                active: "",
                from: __props.value,
                to: __props.value,
                effect: "scroll",
                color: "#fff",
                fontSize: __props.medium ? 14 : 12
              }, null, 8, ["from", "to", "fontSize"])
            ])) : (openBlock(), createElementBlock("p", _hoisted_3$e, toDisplayString(__props.dot ? "" : __props.max < __props.value ? __props.max + "+" : __props.value), 1))
          ], true)
        ], 6)) : createCommentVNode("", true)
      ]);
    };
  }
});
var Badge = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-fe99db70"]]);
const mBadge = withInstall(Badge, "mBadge");
var rate_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$x = { key: 0 };
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  props: {
    count: { default: 5 },
    modelValue: null,
    color: { default: "#f7ba2a" },
    size: { default: "small" },
    icon: { default: "m-star" },
    type: { default: "all" },
    prefix: { default: "" },
    suffix: { default: "" },
    readonly: { type: Boolean },
    show: { type: Boolean, default: false },
    fixed: { default: 1 },
    defaultColor: { default: "#c6d1de" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const precent = ref(props.modelValue / props.count * 100);
    const value = ref(props.modelValue.toFixed(props.fixed));
    function clickHandle(index2, event) {
      if (!props.readonly) {
        if (props.type === "wantonly") {
          precent.value = Math.ceil((index2 + +(event.offsetX / event.target.offsetWidth).toFixed(1)) / props.count * 100);
        } else if (props.type === "half") {
          precent.value = Math.ceil((index2 + (+(event.offsetX / event.target.offsetWidth).toFixed(1) > 0.5 ? 1 : 0.5)) / props.count * 100);
        } else {
          precent.value = Math.ceil((index2 + Math.ceil(+(event.offsetX / event.target.offsetWidth).toFixed(1))) / props.count * 100);
        }
        value.value = (precent.value / 100 * (props.count - 0) + 0).toFixed(props.fixed);
        emits("update:modelValue", +value.value);
      }
    }
    return (_ctx, _cache) => {
      const _component_m_icon = resolveComponent("m-icon");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-rate", "m-rate-" + __props.size])
      }, [
        createBaseVNode("div", {
          class: "m-rate-icon",
          style: normalizeStyle([
            { ["--m-rate-active-color"]: __props.color },
            { ["--m-rate-color"]: __props.defaultColor },
            { ["--m-rate-precent"]: precent.value + "%" }
          ])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.count, (_, index2) => {
            return openBlock(), createBlock(_component_m_icon, {
              name: "m-star",
              class: "m-rate-icon-star",
              onClick: ($event) => clickHandle(index2, $event)
            }, null, 8, ["onClick"]);
          }), 256))
        ], 4),
        renderSlot(_ctx.$slots, "default", { precent: value.value }, () => [
          __props.show ? (openBlock(), createElementBlock("p", _hoisted_1$x, toDisplayString(__props.prefix + value.value + __props.suffix), 1)) : createCommentVNode("", true)
        ], true)
      ], 2);
    };
  }
});
var Rate = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-a1e66624"]]);
const mRate = withInstall(Rate, "mRate");
var config = {
  TYPE: Symbol("type"),
  BACKGROUND: Symbol("background"),
  BACKGROUNDLINE: Symbol("backgroundLine"),
  ISBORDER: Symbol("isBorder"),
  ISSHADOW: Symbol("isShadow"),
  HORIZONTAL: Symbol("horizontal")
};
var timeline_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$w = { key: 0 };
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  props: {
    showHeader: { type: Boolean, default: true },
    backgroundLine: null,
    background: null,
    isShadow: { type: Boolean },
    isBorder: { type: Boolean },
    type: { default: "default" },
    width: { default: 500 },
    horizontal: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    provide(config.TYPE, props.type);
    provide(config.BACKGROUND, props.background);
    provide(config.BACKGROUNDLINE, props.backgroundLine);
    provide(config.ISBORDER, props.isBorder);
    provide(config.ISSHADOW, props.isShadow);
    provide(config.HORIZONTAL, props.horizontal);
    function processWidth(width) {
      if (isNaN(Number(width))) {
        return width;
      } else {
        return width + "px";
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mTimeline", __props.horizontal && "mTimelineHorizontal"]),
        style: normalizeStyle({ ["width"]: processWidth(__props.width) })
      }, [
        __props.showHeader ? (openBlock(), createElementBlock("header", _hoisted_1$w, [
          renderSlot(_ctx.$slots, "title")
        ])) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});
var timelineItem_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-4ad4d709"), n = n(), popScopeId(), n);
const _hoisted_1$v = { class: "m-timeline-before" };
const _hoisted_2$m = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("p", null, null, -1));
const _hoisted_3$d = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("p", { class: "m-timeline-after" }, null, -1));
const _hoisted_4$7 = { class: "m-timeline-item-main" };
const _hoisted_5$6 = { class: "m-timeline-title" };
const _hoisted_6$6 = { class: "m-timeline-content" };
const _hoisted_7$5 = { class: "m-timeline-time" };
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  props: {
    backgroundLine: null,
    background: null,
    isShadow: { type: Boolean, default: void 0 },
    isBorder: { type: Boolean, default: void 0 },
    type: null,
    iconName: null,
    timestamp: null,
    content: null,
    title: null,
    lineStyle: { default: "solid" }
  },
  setup(__props) {
    const props = __props;
    const type = useInject(props.type, config.TYPE, "default");
    const colors = LightTheme[type];
    const background = useInject(props.background, config.BACKGROUND, colors);
    const backgroundLine = useInject(props.backgroundLine, config.BACKGROUNDLINE, getLightColor(colors, 0.7));
    const isBorder = useInject(props.isBorder, config.ISBORDER, false);
    const isShadow = useInject(props.isShadow, config.ISSHADOW, false);
    const horizontal = useInject(void 0, config.HORIZONTAL, false);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mTimelineItem", unref(horizontal) && "mTimelineItemHorizontal"]),
        style: normalizeStyle([
          { ["--m-timeline-back"]: unref(background) },
          { ["--m-timeline-back-line"]: unref(backgroundLine) },
          { ["--m-timeline-line-style"]: __props.lineStyle }
        ])
      }, [
        createBaseVNode("div", _hoisted_1$v, [
          renderSlot(_ctx.$slots, "icon", {}, () => [
            _hoisted_2$m
          ], true)
        ]),
        _hoisted_3$d,
        createBaseVNode("div", _hoisted_4$7, [
          createBaseVNode("p", _hoisted_5$6, toDisplayString(__props.title), 1),
          createBaseVNode("div", {
            class: normalizeClass([
              unref(isShadow) && "m-timeline-shadow",
              unref(isBorder) && "m-timeline-border",
              "m-timeline-item-contain"
            ])
          }, [
            renderSlot(_ctx.$slots, "main", {}, () => [
              createBaseVNode("p", _hoisted_6$6, [
                renderSlot(_ctx.$slots, "default", {}, () => [
                  createTextVNode(toDisplayString(__props.content), 1)
                ], true)
              ])
            ], true),
            createBaseVNode("p", _hoisted_7$5, toDisplayString(__props.timestamp), 1)
          ], 2)
        ])
      ], 6);
    };
  }
});
var TimelineItem = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-4ad4d709"]]);
const mTimeline = withInstall(_sfc_main$D, "mTimeline");
const mTimelineItem = withInstall(TimelineItem, "mTimelineItem");
const _sfc_main$B = {};
const _hoisted_1$u = {
  t: "1654503653776",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "23017",
  width: "128",
  height: "128"
};
const _hoisted_2$l = /* @__PURE__ */ createBaseVNode("path", {
  d: "M536.953154 464.455014m-448.014129 0a448.014129 448.014129 0 1 0 896.028258 0 448.014129 448.014129 0 1 0-896.028258 0Z",
  fill: "#FFE585",
  "p-id": "23018"
}, null, -1);
const _hoisted_3$c = /* @__PURE__ */ createBaseVNode("path", {
  d: "M547.508202 24.443486c-4.204756 0-8.421844 0.073984-12.597828 0.189071 223.698798 6.374953 403.068858 189.703157 403.068858 414.943287 0 229.268148-185.8601 415.132358-415.132358 415.132358-229.259927 0-415.132358-185.86421-415.132358-415.132358 0-36.108295 4.619889-71.143822 13.284236-104.5517-13.958312 43.305292-21.504678 89.483629-21.504679 137.433471 0 247.427106 200.595244 448.014129 448.014129 448.014129 247.431216 0 448.014129-200.587023 448.014129-448.014129 0-247.431216-200.582913-448.014129-448.014129-448.014129z",
  fill: "#FF9900",
  opacity: ".24",
  "p-id": "23019"
}, null, -1);
const _hoisted_4$6 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M437.757071 1024h197.290626a16.440885 16.440885 0 0 0 0-32.881771h-197.290626a16.440885 16.440885 0 0 0 0 32.881771z",
  fill: "#6E6E96",
  opacity: ".29",
  "p-id": "23020"
}, null, -1);
const _hoisted_5$5 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M708.480912 1024h57.543099a16.440885 16.440885 0 0 0 0-32.881771h-57.543099a16.440885 16.440885 0 0 0 0 32.881771zM359.112096 991.118229h-45.212435a16.440885 16.440885 0 0 0 0 32.881771h45.212435a16.440885 16.440885 0 0 0 0-32.881771z",
  fill: "#6E6E96",
  opacity: ".17",
  "p-id": "23021"
}, null, -1);
const _hoisted_6$5 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M125.931017 487.061232c0-234.948474 190.459438-425.407911 425.407912-425.407912 229.851799 0 451.487266 147.898095 425.107865 410.187762 0.18085-5.182989 0.300046-10.378309 0.300046-15.60651 0-247.427106-200.595244-448.014129-448.014129-448.014129-247.431216 0-448.014129 200.587023-448.014129 448.014129 0 205.963193 138.987135 379.443306 328.308042 431.819856-164.955514-58.558324-283.095607-215.955141-283.095607-400.993196z",
  fill: "#FFEFB5",
  "p-id": "23022"
}, null, -1);
const _hoisted_7$4 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M802.103534 804.990965C725.731511 864.548072 634.040693 896.028258 536.953154 896.028258c-217.24164 0-401.342565-162.292091-428.227523-377.511502-1.12209-9.009605-9.338423-15.400999-18.352139-14.274799a16.440885 16.440885 0 0 0-14.274799 18.352139C105.038762 754.233841 303.163763 928.910029 536.953154 928.910029c104.485937 0 203.168242-33.884665 285.372669-97.991788a16.440885 16.440885 0 1 0-20.222289-25.927276zM966.195902 419.26313c1.549553 14.920104 2.334606 30.123812 2.334606 45.195995 0 25.598459-2.260622 51.24213-6.711992 76.219945a16.440885 16.440885 0 0 0 32.367993 5.778971 468.380276 468.380276 0 0 0 7.225769-81.990696c0-16.198382-0.846706-32.548843-2.511345-48.595147a16.440885 16.440885 0 0 0-32.705031 3.390932zM162.092745 250.435788C238.8799 116.245281 382.519807 32.881771 536.953154 32.881771c133.434226 0 257.262866 60.284617 339.726237 165.391197a16.440885 16.440885 0 0 0 25.865623-20.296273C813.809445 64.867514 680.556068 0 536.953154 0 370.756353 0 216.179148 89.705581 133.555478 234.105878a16.440885 16.440885 0 0 0 28.537267 16.32991z",
  fill: "#6E6E96",
  "p-id": "23023"
}, null, -1);
const _hoisted_8$3 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M193.975732 288.471776s-245.762466 63.67966-152.612519 155.247172c93.145837 91.559291 152.612519-155.247171 152.612519-155.247172z",
  fill: "#89E0F5",
  "p-id": "23024"
}, null, -1);
const _hoisted_9$3 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M189.85318 272.556999C172.988942 276.926165 24.556518 317.263877 5.859121 387.067766c-4.336284 16.181942-3.690979 41.180308 23.974921 68.377643 27.66179 27.193225 52.664266 27.406956 68.768113 22.799398 69.475072-19.885251 107.268557-168.987641 111.345897-185.921753 1.352263-5.614562-0.341148-11.529171-4.45548-15.577739s-10.049491-5.639224-15.639392-4.188316z m-136.964907 159.439597c-19.794826-19.466008-16.387453-32.220025-15.265362-36.412451 10.370089-38.771718 103.939278-76.511771 160.479483-91.197592a16.440885 16.440885 0 0 1-20.111313-19.766054c-13.711698 56.778598-49.848765 150.980761-88.439633 162.012596-4.167764 1.191964-16.864238 4.8254-36.663175-14.636499z",
  fill: "#6E6E96",
  "p-id": "23025"
}, null, -1);
const _hoisted_10$3 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M881.241736 534.756241s222.646581 217.948598 67.555599 258.491821c-155.090983 40.526783-67.555598-258.491822-67.555599-258.491821z",
  fill: "#89E0F5",
  "p-id": "23026"
}, null, -1);
const _hoisted_11$3 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M869.741337 546.507363c-0.00411 0 0 0 0 0 37.259157 36.515207 130.766693 143.405623 116.060321 198.745644-4.097891 15.421551-17.562976 25.914946-41.172088 32.084388s-40.48568 3.604664-51.603829-7.846412c-35.479431-36.527537-16.383342-160.532916 3.986915-230.106633a16.436775 16.436775 0 0 1-27.271319 7.123013z m83.211432 262.647256c35.578076-9.305541 57.325257-27.970056 64.633231-55.467437 22.219857-83.667666-109.722359-215.872936-124.843864-230.673844a16.453216 16.453216 0 0 0-15.659944-4.159544 16.399783 16.399783 0 0 0-11.619595 11.286668c-5.94338 20.300383-56.330584 200.15545 3.986914 262.265005 19.823598 20.411359 47.921071 26.046473 83.503258 16.749152z",
  fill: "#6E6E96",
  "p-id": "23027"
}, null, -1);
const _hoisted_12$3 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M640.982857 708.133598c-66.951396 72.105613-65.060694-65.011371-193.65308-101.403271-138.785735-39.277275-194.084653 84.391065-206.329002-9.708343-11.282558-86.659907 122.990154-166.328328 251.689405-130.581733 138.608995 38.508664 207.755249 177.651988 148.292677 241.693347z",
  fill: "#C7A17B",
  "p-id": "23028"
}, null, -1);
const _hoisted_13$2 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M628.931688 696.949686c-13.123937 14.130941-19.815377 15.466763-22.08422 15.380448-7.439501-0.275385-19.322151-15.174937-30.82255-29.581263-24.661328-30.904754-58.435017-73.215373-124.22322-91.838786-75.097855-21.249844-127.227792 1.455018-161.72899 16.490208-9.868641 4.295181-23.378939 10.185129-27.238437 9.358974a1.759175 1.759175 0 0 1 0.620643 0.308267c-0.152078-0.131527-3.732081-3.510129-6.161222-22.178755-3.300508-25.335404 9.10003-51.628491 34.920441-74.025087 40.432248-35.08485 116.738507-60.625765 196.074-38.590868 85.615911 23.785851 138.674759 86.491388 153.278375 138.086997 8.808204 31.130817 4.319843 58.328151-12.63482 76.589865z m-131.843571-246.346118c-91.082505-25.298413-179.349509 4.591117-226.423875 45.434387-34.414883 29.864868-50.748903 66.47872-45.976936 103.109014 2.342826 18.00688 6.835298 37.600305 22.351384 46.392068 16.432665 9.305541 34.846457 1.286499 56.166175-7.99438 32.014514-13.950091 75.858246-33.04207 139.644771-14.989978 55.627736 15.742148 84.374624 51.768238 107.478178 80.708307 17.595858 22.047227 32.795456 41.093993 55.290698 41.928368 20.267502 0.764501 36.75771-14.398105 47.407293-25.865623 25.06824-26.987713 32.232356-65.315528 20.172967-107.905641-17.094411-60.449026-78.184631-133.615076-176.110655-160.816522zM758.703707 353.298188c-0.727509-1.812608-18.232942-44.513697-58.49256-56.531985-25.845072-7.714886-53.963096-1.138531-83.581352 19.548213a16.440885 16.440885 0 0 0 18.833034 26.958942c20.900476-14.603617 39.466346-19.663299 55.175612-15.047521 24.998366 7.349076 37.444117 37.061866 37.571534 37.361913l-0.028772-0.061654a16.440885 16.440885 0 1 0 30.522504-12.227908z",
  fill: "#6E6E96",
  "p-id": "23029"
}, null, -1);
const _hoisted_14$1 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M491.046091 268.86191c-0.727509-1.812608-18.228832-44.513697-58.484339-56.536095-25.849182-7.714886-53.971317-1.138531-83.589572 19.548213a16.440885 16.440885 0 0 0 18.828924 26.958942c20.97857-14.652939 39.601983-19.700291 55.352351-14.998198 24.813406 7.410729 37.250936 36.95089 37.370133 37.246826a16.440885 16.440885 0 1 0 30.522503-12.219688z",
  fill: "#6E6E96",
  "p-id": "23030"
}, null, -1);
const _hoisted_15$1 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M355.811588 532.549052s123.306641-67.818653 234.282618 67.818652l39.939021-39.939021c-29.075706-40.810388-76.511771-77.087202-137.338937-93.988432-56.223718-15.614731-113.499653-9.202786-159.250527 10.189239l22.367825 55.919562z",
  fill: "#FFFFFF",
  "p-id": "23031"
}, null, -1);
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M363.736095 546.955378l-0.053433 0.028771c4.574676-2.474353 113.154394-59.080322 213.690409 63.794746a16.473767 16.473767 0 0 0 11.903201 6.005033 16.408004 16.408004 0 0 0 12.44164-4.792518l39.939021-39.939021a16.440885 16.440885 0 0 0 1.767395-21.16764c-34.16416-47.941622-86.133799-83.55669-146.327991-100.281181-56.25249-15.618841-116.643972-11.751123-170.068629 10.892087a16.440885 16.440885 0 0 0-8.849307 21.241624l22.367825 55.915451a16.449106 16.449106 0 0 0 23.189869 8.302648z m-23.876276-55.187943c45.931724-19.466008 100.034568-22.922705 148.436534-9.48228 52.960202 14.714592 98.542557 45.85363 128.349883 87.683352a16.424445 16.424445 0 0 1 1.767395-21.15942l-39.939021 39.939021a16.399783 16.399783 0 0 1 12.44164-4.800738 16.469657 16.469657 0 0 1 11.903201 6.013254c-118.263399-144.548265-253.571887-72.553628-254.924149-71.817898a16.449106 16.449106 0 0 1 23.181648 8.298537l-22.367824-55.919562a16.444996 16.444996 0 0 1-8.849307 21.245734z",
  fill: "#6E6E96",
  "p-id": "23032"
}, null, -1);
const _hoisted_17 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M827.537584 254.619993s90.568728 162.111241 138.119879 79.245068c47.53471-82.862063-138.119879-79.245068-138.119879-79.245068z",
  fill: "#89E0F5",
  "p-id": "23033"
}, null, -1);
const _hoisted_18 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M813.180581 262.634925c10.349537 18.524768 64.715435 110.943095 118.933365 111.255472 13.428093 0.078094 32.622827-5.3885 47.797765-31.845995 15.174937-26.457495 10.20568-45.779646 3.366271-57.333478-27.633018-46.646902-134.856363-46.946948-156.065105-46.531816a16.465547 16.465547 0 0 0-13.945982 8.253324 16.449106 16.449106 0 0 0-0.086314 16.202493z m138.206193 63.046685c-8.824645 15.384559-16.547751 15.339346-19.091978 15.327016-26.067024-0.147968-68.562603-55.298918-90.412539-94.407675a16.432665 16.432665 0 0 1-14.032296 24.451707c44.813744-0.838485 113.890124 8.043703 127.137367 30.419749 1.29472 2.186638 5.228202 8.828755-3.600554 24.209203z",
  fill: "#6E6E96",
  "p-id": "23034"
}, null, -1);
const _hoisted_19 = [
  _hoisted_2$l,
  _hoisted_3$c,
  _hoisted_4$6,
  _hoisted_5$5,
  _hoisted_6$5,
  _hoisted_7$4,
  _hoisted_8$3,
  _hoisted_9$3,
  _hoisted_10$3,
  _hoisted_11$3,
  _hoisted_12$3,
  _hoisted_13$2,
  _hoisted_14$1,
  _hoisted_15$1,
  _hoisted_16,
  _hoisted_17,
  _hoisted_18
];
function _sfc_render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$u, _hoisted_19);
}
var cryVue = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$2]]);
const _hoisted_1$t = ["width", "height"];
const _hoisted_2$k = ["fill"];
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  props: {
    color: { default: "#FF3A36" },
    width: { default: 128 },
    height: { default: 128 }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        t: "1654503011569",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "10886",
        width: __props.width,
        height: __props.height
      }, [
        createBaseVNode("path", {
          d: "M1007.470407 641.910647c0-82.661509-54.004808-152.195368-183.200104-173.327684 0.533644-29.563897 0.533644-58.167234 0.533644-84.956181H16.33276c0 245.903316 0 640.373218 404.182229 640.373218 188.696641 0 289.235237-85.970104 342.866494-202.784852 173.327684-7.257563 244.088925-84.689358 244.088924-179.304501z m-791.928212 227.172399a665.881417 665.881417 0 0 1-104.594292-380.061505 43.91893 43.91893 0 0 1 87.83786 0 581.672339 581.672339 0 0 0 92.800752 335.662295c32.018661 47.067431-44.292481 90.719539-75.830862 44.345845z m576.602718-128.074644a944.230309 944.230309 0 0 0 29.083617-193.232618c67.50601 16.756433 82.928332 51.336586 82.127865 96.055983-0.907195 50.642849-19.638112 85.062909-111.211482 97.443457zM326.540219 298.723967a167.030681 167.030681 0 0 0-5.336443-119.269512c-16.863161-43.865565-39.489682-73.482827-7.897936-116.174375 33.566229-45.733321-42.691548-89.438793-75.830862-44.345845a142.322948 142.322948 0 0 0-24.013996 126.687168c11.953633 45.573227 45.35977 80.793754 28.389879 129.675577-18.624188 53.631257 66.225264 76.524599 84.689358 23.373622z m158.065456 0a167.030681 167.030681 0 0 0-5.336443-119.269512c-17.076619-43.865565-39.489682-73.322733-8.111394-116.12101 33.566229-45.733321-42.691548-89.438793-75.830862-44.345845a142.322948 142.322948 0 0 0-24.013996 126.687168c11.953633 45.573227 45.35977 80.793754 28.38988 129.675576-18.624188 53.631257 66.225264 76.524599 84.689358 23.373623z m158.065456 0a167.030681 167.030681 0 0 0-5.336443-119.269512c-17.076619-43.865565-39.489682-73.322733-8.111394-116.12101 33.566229-45.733321-42.691548-89.438793-75.830862-44.345845a142.322948 142.322948 0 0 0-24.013996 126.687168c11.953633 45.573227 45.35977 80.793754 28.389879 129.675576-18.624188 53.631257 66.225264 76.524599 84.689358 23.373623z",
          fill: __props.color,
          "p-id": "10887"
        }, null, 8, _hoisted_2$k)
      ], 8, _hoisted_1$t);
    };
  }
});
const _sfc_main$z = {};
const _hoisted_1$s = {
  t: "1654503369023",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "22510",
  width: "128",
  height: "128"
};
const _hoisted_2$j = /* @__PURE__ */ createBaseVNode("path", {
  d: "M999.129632 484.507195c0 65.607611-5.899965 130.802225-29.499825 187.795888-24.543855 58.999651-69.678587 106.848367-114.223323 151.452103a473.649195 473.649195 0 0 1-156.644073 101.479399c-57.052662 23.59986-116.996307 51.152697-182.544918 51.152697s-128.206241-21.121875-185.199903-44.780735c-58.999651-24.484855-108.854355-63.955621-153.399092-108.500357a477.897169 477.897169 0 0 1-106.081372-154.520085c-23.59986-56.993662-44.013739-118.471298-44.013739-184.07891a491.467089 491.467089 0 0 1 37.051781-186.969892c24.484855-58.999651 66.669605-108.677356 111.273341-153.399092s95.579434-82.894509 154.697083-107.379364A483.797135 483.797135 0 0 1 516.040494 0.356063c65.548612 0 126.318252 17.699895 183.311914 41.299755 58.999651 24.543855 118.825296 51.388696 163.370032 95.933432s68.793593 105.314376 93.278448 164.432026c23.65886 57.288661 43.128745 116.878308 43.128744 182.485919z",
  fill: "#FFD635",
  "p-id": "22511"
}, null, -1);
const _hoisted_3$b = /* @__PURE__ */ createBaseVNode("path", {
  d: "M617.637892 913.021657c-61.831634 0-120.890284-19.941882-174.638966-42.243749-55.75467-23.127863-102.659392-60.297643-144.667143-102.364394a449.813336 449.813336 0 0 1-99.886408-145.670137c-22.301868-53.748682-41.299755-111.745338-41.299756-173.635972a463.973252 463.973252 0 0 1 34.691795-176.349956c23.127863-55.75467 63.129626-102.482393 104.960378-144.490144S387.008258 49.974769 442.703928 26.846906A447.158352 447.158352 0 0 1 531.7934 0.533062C525.716436 0.002065 519.580473 0.002065 513.385509 0.002065a483.325137 483.325137 0 0 0-185.435901 36.402784c-58.999651 24.543855-110.211347 63.011627-154.756084 107.556363s-86.729486 94.399441-111.273341 153.399092A491.467089 491.467089 0 0 0 24.868403 484.153197c0 65.607611 20.413879 127.085247 44.072739 184.13791a476.363179 476.363179 0 0 0 106.199371 154.461085c44.544736 44.544736 94.399441 84.015502 153.399091 108.500357 57.052662 23.59986 119.651291 44.780735 185.199903 44.780735s125.551256-27.493837 182.544919-51.152697a493.591077 493.591077 0 0 0 128.26524-75.814551c-11.209934 5.545967-22.655866 10.855936-34.396796 15.752907-54.10268 22.301868-110.388346 48.202715-172.514978 48.202714z",
  fill: "#F7B523",
  "p-id": "22512"
}, null, -1);
const _hoisted_4$5 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M435.68297 112.691398s3.480979-2.713984 9.793942-6.961959a228.918644 228.918644 0 0 1 27.316838-15.870906 224.670669 224.670669 0 0 1 42.24375-16.047905A207.324772 207.324772 0 0 1 567.665188 66.494671h13.392921c4.188975 0 8.967947 0.294998 13.274921 0.589997s8.672949 0.943994 12.920923 1.533991 8.37795 1.474991 12.448927 2.359986a160.715048 160.715048 0 0 1 22.950864 7.138957 133.575209 133.575209 0 0 1 19.528884 9.439944 117.999301 117.999301 0 0 1 26.195845 20.29588 70.799581 70.799581 0 0 1 6.312963 7.374957 26.313844 26.313844 0 0 1 2.064987 2.890982s-4.955971 0.884995-12.979923 1.474992c-3.952977 0.294998-8.672949 0.412998-13.982917 0.648996s-11.091934 0-17.286898 0-12.802924-0.589997-19.705883-1.061994-14.041917-1.297992-21.416873-2.241987l-11.150934-1.533991-11.445932-1.828989c-3.893977-0.648996-7.374956-1.356992-11.79993-1.946988l-5.899965-1.179993a52.627688 52.627688 0 0 0-5.545967-0.707996 418.425522 418.425522 0 0 0-87.260484 0l-30.620818 2.359986-8.790948 0.648996z",
  fill: "#FFEF57",
  "p-id": "22513"
}, null, -1);
const _hoisted_5$4 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M812.631737 289.926348c-5.899965-4.188975-10.501938-9.085946-16.165904-12.330927s-13.038923-2.300986-18.230892-4.896971c-10.442938-5.13297-19.174886-10.265939-26.903841-13.392921-9.262945-3.657978-8.43695-5.899965-17.699895-9.498944-4.542973-1.887989-5.899965-2.890983-6.666961-4.896971s0-2.949983 5.486968-5.899965a45.901728 45.901728 0 0 1 23.59986-9.085946 113.810326 113.810326 0 0 1 18.407891 4.188975 112.099336 112.099336 0 0 1 18.58489 2.359986 164.255027 164.255027 0 0 1 19.764883 11.327933 141.068164 141.068164 0 0 1 20.354879 14.100917c6.607961 5.07397 16.224904 6.253963 21.475873 11.79993a160.47905 160.47905 0 0 1 14.100917 19.587884c8.141952 11.504932 10.442938 23.953858 13.923917 33.275803 7.079958 18.820889 8.554949 31.387814 5.014971 32.508807s-11.79993-7.787954-23.599861-21.062875c-4.542973-5.13297-10.501938-10.383938-16.696901-16.637901-5.13297-5.191969-9.380944-12.212928-15.752906-17.699896s-12.212928-9.026947-18.997888-13.746918z",
  fill: "#E59D0E",
  "p-id": "22514"
}, null, -1);
const _hoisted_6$4 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M569.966174 404.031672a160.951047 160.951047 0 0 1-18.761889 45.901728c-8.43695 14.041917-23.304862 23.59986-35.39979 33.8658a155.34608 155.34608 0 0 1-39.765764 27.552836 155.700078 155.700078 0 0 1-47.199721 9.203946 150.744107 150.744107 0 0 1-47.19972-5.899965c-16.224904-3.834977-32.15481-6.489962-45.66573-14.631914a157.588067 157.588067 0 0 1-38.467772-29.971822 160.007052 160.007052 0 0 1-25.31085-41.830752c-6.253963-14.749913-4.896971-31.505813-6.253963-47.848717a147.499126 147.499126 0 0 1 1.533991-47.19972 156.821071 156.821071 0 0 1 15.339909-45.783729A157.706066 157.706066 0 0 1 313.966691 250.160583a155.464079 155.464079 0 0 1 42.479748-23.186862c14.749913-6.253963 29.499825-15.811906 45.960728-17.227898s31.446814 7.669955 47.671717 11.445932 33.039804 4.896971 46.550725 13.097922a158.886059 158.886059 0 0 1 39.352767 29.499826c10.619937 12.271927 15.339909 29.499825 21.652871 44.190738a151.098105 151.098105 0 0 1 11.091935 46.786723c1.120993 15.988905 4.837971 33.039804 1.238992 49.264708z",
  fill: "#F7B523",
  "p-id": "22515"
}, null, -1);
const _hoisted_7$3 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M551.971281 364.855904a137.705184 137.705184 0 0 1-6.548961 41.299755c-4.247975 13.097922-14.631913 23.59986-22.596866 34.455796a129.032236 129.032236 0 0 1-27.257839 30.148822 130.743226 130.743226 0 0 1-37.051781 16.637901 126.377251 126.377251 0 0 1-39.824764 4.365974c-13.982917 0-27.493837 0.884995-40.119762-3.24498a132.572215 132.572215 0 0 1-37.16978-17.109899 133.103212 133.103212 0 0 1-28.73283-29.499825c-7.964953-10.914935-10.029941-24.838853-14.277915-37.936776A123.899266 123.899266 0 0 1 290.36683 364.855904a132.159217 132.159217 0 0 1 4.011977-40.355761 130.389228 130.389228 0 0 1 18.52589-36.461784 130.212229 130.212229 0 0 1 30.561819-27.139839c10.914935-7.964953 21.239874-18.64389 34.337796-22.891865s27.198839 0 41.299756 0 27.965834-2.300986 40.591759 1.828989a133.693208 133.693208 0 0 1 37.877776 16.814901c11.032935 7.964953 18.171892 20.944876 26.195845 31.97781a128.855237 128.855237 0 0 1 17.994893 36.166786c3.716978 12.861924 10.20694 26.077846 10.20694 40.060763z",
  fill: "#FFFFFF",
  "p-id": "22516"
}, null, -1);
const _hoisted_8$2 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M464.179801 364.855904a45.429731 45.429731 0 1 1-45.488731-45.429731c17.699895 0-0.471997 28.083834 7.728955 36.048787s37.759776-8.43695 37.759776 9.380944z",
  fill: "#534741",
  "p-id": "22517"
}, null, -1);
const _hoisted_9$2 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M766.730009 364.324907c-12.743925 0-25.428849-5.01497-36.638783-2.418986-12.625925 2.890983-22.478867 11.79993-32.567807 16.814901a142.425156 142.425156 0 0 0-44.367737 30.797817 76.699546 76.699546 0 0 0-15.457909 30.50282c-2.477985 7.905953-2.300986 9.026947 0 10.737936 4.542973 3.480979 17.699895 1.533991 39.942764-7.138957 12.212928-4.719972 25.605848-15.044911 42.597747-18.70289a199.18282 199.18282 0 0 1 93.101449 0c16.9329 3.834977 29.912823 15.398909 42.12575 20.118881 22.242868 8.849948 38.526772 13.982917 43.069745 10.501938a16.696901 16.696901 0 0 0 2.890983-16.401903c-2.477985-7.846954-11.79993-16.696901-21.94787-28.083834a143.133152 143.133152 0 0 0-43.83674-30.856817c-10.08894-5.01497-20.118881-12.212928-32.685807-15.22191-11.091934-2.831983-23.422861-0.589997-36.225785-0.648996zM309.954714 585.219599c-10.796936 2.300986-3.598979 26.785841 0 38.939769 7.551955 26.549843 20.17788 62.53963 38.172774 88.499476 29.499825 42.479748 71.566576 87.673481 120.536286 107.674362 54.220679 22.124869 109.916349 27.670836 166.084017 29.086828 55.164673 1.415992 116.819308-25.782847 156.99807-60.061644 20.649878-17.699895 41.299755-35.39979 55.931668-58.114656a323.908082 323.908082 0 0 0 35.399791-70.799581c7.256957-20.708877 10.08894-43.541742 17.699895-63.837622 3.893977-10.737936 1.415992-16.8149-9.616943-17.699895-11.79993-0.707996-127.616244 43.600742-275.646367 45.429731-185.7899 2.595985-279.422345-44.603736-305.559191-39.116768z",
  fill: "#943436",
  "p-id": "22518"
}, null, -1);
const _hoisted_10$2 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M486.717667 741.214675c-4.365974 19.174886-8.259951 44.013739-12.448926 71.802575-1.887989 12.743925-7.079958 25.605848-8.200951 39.352767s-0.943994 26.549843-0.943995 40.178762a128.029242 128.029242 0 0 0 14.572914 54.574676 127.085247 127.085247 0 0 0 32.272809 46.373726 138.236181 138.236181 0 0 0 41.299755 26.077845c14.808912 5.13297 31.682812 4.365974 48.438713 4.365974a140.773166 140.773166 0 0 0 50.798699-10.206939c16.696901-6.371962 33.924799-12.330927 46.550725-24.189857a133.280211 133.280211 0 0 0 31.033816-44.131739 136.938189 136.938189 0 0 0 11.327933-53.099685c0-26.785841-6.312963-52.804687-9.793942-76.699546-4.070976-27.965834-9.970941-53.099685-14.395915-72.451571-3.244981-14.454914-11.268933-36.638783-38.88077-36.638783-12.448926 0-40.709759 2.064988-69.973585 2.064988-14.513914 0-29.499825-1.297992-42.479749-1.297992h-42.420748c-21.534872 0.707996-33.6888 20.413879-36.756783 33.924799z",
  fill: "#F9747E",
  "p-id": "22519"
}, null, -1);
const _hoisted_11$2 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M608.964943 909.068681h-2.359986a26.549843 26.549843 0 0 1-24.130857-28.79183 545.27477 545.27477 0 0 0-15.280909-176.998951 26.549843 26.549843 0 0 1 51.034697-14.749913 593.654484 593.654484 0 0 1 17.227898 196.468836 26.608842 26.608842 0 0 1-26.490843 24.071858z",
  fill: "#E44C5F",
  "p-id": "22520"
}, null, -1);
const _hoisted_12$2 = [
  _hoisted_2$j,
  _hoisted_3$b,
  _hoisted_4$5,
  _hoisted_5$4,
  _hoisted_6$4,
  _hoisted_7$3,
  _hoisted_8$2,
  _hoisted_9$2,
  _hoisted_10$2,
  _hoisted_11$2
];
function _sfc_render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$s, _hoisted_12$2);
}
var ghostVue = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$1]]);
const _hoisted_1$r = ["width", "height"];
const _hoisted_2$i = ["fill"];
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  props: {
    color: { default: "#F7B563" },
    width: { default: 128 },
    height: { default: 128 }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        t: "1654502836749",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "3225",
        width: __props.width,
        height: __props.height
      }, [
        createBaseVNode("path", {
          d: "M552.625521 179.441349v278.13409a26.916202 26.916202 0 0 1-53.832404 0V53.832405a53.832405 53.832405 0 1 0-107.664809 0v403.743034a26.916202 26.916202 0 0 1-53.832405 0v-322.994428a44.860337 44.860337 0 1 0-89.720674 0v358.882698a26.916202 26.916202 0 0 1-53.832405 0V269.162023a44.860337 44.860337 0 0 0-44.860337-44.860337h-0.179441a44.860337 44.860337 0 0 0-44.860338 44.860337v486.78849c15.001297 216.765149 133.863246 268.049487 301.640907 268.049487 119.633547 0 222.794378-61.171556 272.338135-149.85147 20.833141-33.627309 147.034241-230.13353 157.872499-250.66162 12.632671-23.937476 31.133074-52.755756 54.460449-71.812428 12.435285-10.15638 20.707532-23.65037 28.369677-37.772404 1.955911-3.624715 7.644201-47.480181-24.960291-47.354572-28.279957 0.107665-60.561455 12.02257-83.978551 27.849298-26.252269 17.746749-60.328181 48.377388-89.433569 99.24901-9.456559 16.544492-26.395822 28.064627-45.434549 28.495286-17.962079 0.412715-13.314548-8.397855-14.427085-45.506326V179.441349a53.832405 53.832405 0 1 0-107.664809 0z",
          fill: __props.color,
          "p-id": "3226"
        }, null, 8, _hoisted_2$i)
      ], 8, _hoisted_1$r);
    };
  }
});
const _hoisted_1$q = ["width", "height"];
const _hoisted_2$h = ["fill"];
const _hoisted_3$a = ["fill"];
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  props: {
    color: { default: "#F7B563" },
    width: { default: 128 },
    height: { default: 128 }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        t: "1654503106745",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "13400",
        width: __props.width,
        height: __props.height
      }, [
        createBaseVNode("path", {
          d: "M549.341867 691.985067c-105.506133 22.254933-208.9984 34.013867-299.264 34.013866h-0.017067c-12.5952 0-24.644267-0.290133-36.420267-0.750933 66.577067 92.996267 175.2576 153.821867 298.359467 153.821867 177.390933 0 325.376-125.832533 359.594667-293.102934-87.6544 43.076267-200.413867 80.315733-322.2528 106.018134M425.4208 228.608c27.989333-8.533333 57.105067-12.868267 86.5792-12.868267a25.6 25.6 0 0 1 0 51.2c-24.405333 0-48.503467 3.584-71.6288 10.632534a25.617067 25.617067 0 0 1-14.9504-48.964267m144.3328 17.681067a25.617067 25.617067 0 0 1 32.1536-16.64 296.448 296.448 0 0 1 129.826133 83.6608 25.565867 25.565867 0 0 1-18.978133 42.769066c-6.980267 0-13.9264-2.833067-18.978133-8.430933a245.3504 245.3504 0 0 0-107.383467-69.205333 25.6 25.6 0 0 1-16.64-32.1536M271.530667 564.1728c71.509333 0 155.306667-9.693867 242.312533-28.0576 104.174933-21.981867 199.509333-53.589333 268.373333-89.019733 42.837333-22.016 65.501867-40.5504 76.868267-53.725867C809.710933 248.9344 673.143467 144.9472 512 144.9472 309.282133 144.9472 144.930133 309.2992 144.930133 512c0 12.0832 0.682667 23.978667 1.809067 35.7376 22.306133 8.635733 61.696 16.452267 124.791467 16.452267",
          fill: __props.color,
          "p-id": "13401"
        }, null, 8, _hoisted_2$h),
        createBaseVNode("path", {
          d: "M1015.6544 408.712533c-8.4992-40.328533-68.369067-65.962667-159.044267-75.264 21.3504 8.686933 34.645333 20.292267 37.6832 34.747734 12.6976 60.194133-155.272533 146.602667-375.176533 192.9728-219.904 46.3872-408.456533 35.191467-421.154133-25.002667-2.798933-13.277867 3.242667-27.835733 16.622933-42.9568C40.96 536.814933 0.170667 582.382933 8.362667 621.175467c17.698133 83.950933 257.536 104.430933 535.722666 45.738666 278.152533-58.658133 489.301333-174.267733 471.586134-258.218666",
          fill: __props.color,
          "p-id": "13402"
        }, null, 8, _hoisted_3$a)
      ], 8, _hoisted_1$q);
    };
  }
});
const _hoisted_1$p = ["width", "height"];
const _hoisted_2$g = ["fill"];
const _hoisted_3$9 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M512.64 252.8c-142.592 0-258.56 115.968-258.56 258.56s115.968 258.56 258.56 258.56 258.56-115.968 258.56-258.56-115.968-258.56-258.56-258.56z m-194.688 258.56c0-42.24 13.568-81.152 36.48-113.024l271.36 271.36c-31.872 22.912-70.912 36.48-113.024 36.48-107.52 0-194.816-87.424-194.816-194.816z m352.896 113.152l-271.36-271.36c31.872-22.912 70.912-36.48 113.024-36.48 107.392 0 194.688 87.424 194.688 194.688 0.128 42.24-13.44 81.152-36.352 113.152z",
  fill: "#FFFFFF",
  "p-id": "3071"
}, null, -1);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  props: {
    color: { default: "#FF4D3C" },
    width: { default: 128 },
    height: { default: 128 }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        t: "1654502688124",
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "3069",
        width: __props.width,
        height: __props.height
      }, [
        createBaseVNode("path", {
          d: "M763.776 968.96H261.504C147.456 968.96 55.04 876.544 55.04 762.496V260.224C55.04 146.176 147.456 53.76 261.504 53.76h502.272C877.824 53.76 970.24 146.176 970.24 260.224v502.272c0 114.048-92.416 206.464-206.464 206.464z",
          fill: __props.color,
          "p-id": "3070"
        }, null, 8, _hoisted_2$g),
        _hoisted_3$9
      ], 8, _hoisted_1$p);
    };
  }
});
const _sfc_main$v = {};
const _hoisted_1$o = {
  t: "1654503619815",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "22846",
  width: "128",
  height: "128"
};
const _hoisted_2$f = /* @__PURE__ */ createBaseVNode("path", {
  d: "M512 464.455014m-448.014129 0a448.014129 448.014129 0 1 0 896.028258 0 448.014129 448.014129 0 1 0-896.028258 0Z",
  fill: "#FFE585",
  "p-id": "22847"
}, null, -1);
const _hoisted_3$8 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M412.803918 1024h197.290625a16.440885 16.440885 0 0 0 0-32.881771h-197.290625a16.440885 16.440885 0 0 0 0 32.881771z",
  fill: "#6E6E96",
  opacity: ".29",
  "p-id": "22848"
}, null, -1);
const _hoisted_4$4 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M683.527758 1024h57.543099a16.440885 16.440885 0 0 0 0-32.881771h-57.543099a16.440885 16.440885 0 0 0 0 32.881771zM334.158942 991.118229h-45.212435a16.440885 16.440885 0 0 0 0 32.881771h45.212435a16.440885 16.440885 0 0 0 0-32.881771z",
  fill: "#6E6E96",
  opacity: ".17",
  "p-id": "22849"
}, null, -1);
const _hoisted_5$3 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M522.555048 24.443486c-4.217087 0-8.421844 0.078094-12.614269 0.193181 223.698798 6.374953 403.085299 189.699047 403.085299 414.939177 0 229.268148-185.8601 415.132358-415.132358 415.132358s-415.132358-185.86421-415.132358-415.132358c0-36.104184 4.619889-71.143822 13.284236-104.5517a447.590776 447.590776 0 0 0-21.504678 137.433471c0 247.427106 200.582913 448.014129 448.014128 448.014129s448.014129-200.587023 448.014129-448.014129c0-247.431216-200.578803-448.014129-448.014129-448.014129z",
  fill: "#FF9900",
  opacity: ".24",
  "p-id": "22850"
}, null, -1);
const _hoisted_6$3 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M100.977863 487.061232C100.977863 252.112758 291.437301 61.65332 526.385775 61.65332c229.851799 0 417.092934 182.300648 425.107865 410.187762 0.18085-5.182989 0.300046-10.378309 0.300046-15.60651C951.793686 208.807466 751.210773 8.220443 503.779557 8.220443S55.765428 208.807466 55.765428 456.234572c0 205.954972 138.999466 379.435085 328.308042 431.819856C219.117956 829.496105 100.977863 672.099288 100.977863 487.061232z",
  fill: "#FFEFB5",
  "p-id": "22851"
}, null, -1);
const _hoisted_7$2 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M258.970662 342.973312c0-31.167809 19.297489-56.527874 43.017577-56.527875s43.017577 25.355956 43.017577 56.527875a16.440885 16.440885 0 0 0 32.881771 0c0-49.302105-34.049074-89.409645-75.899348-89.409646s-75.899348 40.10754-75.899347 89.409646a16.440885 16.440885 0 0 0 32.88177 0zM526.541963 342.973312c0-31.167809 19.293379-56.527874 43.017577-56.527875s43.021687 25.355956 43.021687 56.527875a16.440885 16.440885 0 0 0 32.881771 0c0-49.302105-34.044964-89.409645-75.903458-89.409646-41.850274 0-75.899348 40.10754-75.899348 89.409646a16.440885 16.440885 0 0 0 32.881771 0z",
  fill: "#6E6E96",
  "p-id": "22852"
}, null, -1);
const _hoisted_8$1 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M378.019114 661.408602a59.055661 56.827921 0 1 0 118.111321 0 59.055661 56.827921 0 1 0-118.111321 0Z",
  fill: "#C7A17B",
  "p-id": "22853"
}, null, -1);
const _hoisted_9$1 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M437.074775 621.021567c23.498136 0 42.614775 18.117856 42.614775 40.387035s-19.11664 40.387035-42.614775 40.387035-42.614775-18.117856-42.614775-40.387035 19.11664-40.387035 42.614775-40.387035z m-75.496546 40.387035c0 40.399366 33.868224 73.268806 75.496546 73.268806s75.496546-32.86944 75.496546-73.268806-33.868224-73.268806-75.496546-73.268806-75.496546 32.86944-75.496546 73.268806z",
  fill: "#6E6E96",
  "p-id": "22854"
}, null, -1);
const _hoisted_10$1 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M225.764184 450.973488a71.402766 33.317454 0 1 0 142.805531 0 71.402766 33.317454 0 1 0-142.805531 0Z",
  fill: "#FF0000",
  opacity: ".18",
  "p-id": "22855"
}, null, -1);
const _hoisted_11$1 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M501.798431 450.973488a71.398655 33.317454 0 1 0 142.79731 0 71.398655 33.317454 0 1 0-142.79731 0Z",
  fill: "#FF0000",
  opacity: ".18",
  "p-id": "22856"
}, null, -1);
const _hoisted_12$1 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M512 32.881771c237.965376 0 431.573243 193.603757 431.573243 431.573243 0 115.279379-44.891838 223.653585-126.405747 305.167496S627.279379 896.028258 512 896.028258c-115.275268 0-223.657696-44.891838-305.167496-126.405748C125.318594 688.1086 80.426757 579.734393 80.426757 464.455014 80.426757 226.485528 274.030514 32.881771 512 32.881771zM47.544986 464.455014c0 124.067032 48.311542 240.702784 136.035996 328.419018C271.305437 880.594377 387.937078 928.910029 512 928.910029c124.062922 0 240.698673-48.311542 328.414908-136.035997C928.139362 705.149578 976.455014 588.522046 976.455014 464.455014 976.455014 208.355341 768.103783 0 512 0S47.544986 208.355341 47.544986 464.455014z",
  fill: "#6E6E96",
  "p-id": "22857"
}, null, -1);
const _hoisted_13$1 = [
  _hoisted_2$f,
  _hoisted_3$8,
  _hoisted_4$4,
  _hoisted_5$3,
  _hoisted_6$3,
  _hoisted_7$2,
  _hoisted_8$1,
  _hoisted_9$1,
  _hoisted_10$1,
  _hoisted_11$1,
  _hoisted_12$1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$o, _hoisted_13$1);
}
var smallVue = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render]]);
var result_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$n = { class: "mResult" };
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  props: {
    title: null,
    content: null,
    component: { default: "cry" }
  },
  setup(__props) {
    const mapComponents = {
      cry: cryVue,
      palm: _sfc_main$y,
      planet: _sfc_main$x,
      prohibit: _sfc_main$w,
      small: smallVue,
      ghost: ghostVue,
      cup: _sfc_main$A
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$n, [
        createBaseVNode("header", null, [
          renderSlot(_ctx.$slots, "header", {}, () => [
            (openBlock(), createBlock(resolveDynamicComponent(mapComponents[__props.component])))
          ], true)
        ]),
        createBaseVNode("main", null, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createBaseVNode("h1", null, toDisplayString(__props.title), 1)
          ], true),
          renderSlot(_ctx.$slots, "default", {}, () => [
            createBaseVNode("p", null, toDisplayString(__props.content), 1)
          ], true)
        ]),
        createBaseVNode("footer", null, [
          renderSlot(_ctx.$slots, "footer", {}, void 0, true)
        ])
      ]);
    };
  }
});
var Result = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-dba4cb5a"]]);
const mResult = withInstall(Result, "mResult");
var affix_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  props: {
    top: null,
    left: { default: 0 },
    bottom: { default: "auto" }
  },
  setup(__props) {
    var _a2;
    const props = __props;
    const top = (_a2 = props.top) != null ? _a2 : props.bottom ? "auto" : 0;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-affix",
        style: normalizeStyle([
          { top: unref(processUnit)(unref(top)) },
          { left: unref(processUnit)(__props.left) },
          { bottom: unref(processUnit)(__props.bottom) }
        ])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4);
    };
  }
});
var Affix = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-aaa87e60"]]);
const mAffix = withInstall(Affix, "mAffix");
var configName = {
  SHOWRECT: Symbol("showRect"),
  LOADING: Symbol("loading")
};
var cascaderItem_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$m = { class: "m-cascader-label" };
const _hoisted_2$e = {
  key: 1,
  class: "m-cascader-children"
};
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    status: null
  },
  emits: ["select", "cancel", "active"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const isActive = ref(false);
    function verifyChildren() {
      return props.option.children;
    }
    function clickHandle() {
      if (props.option.disabled) {
        return;
      }
      if (props.option.children) {
        if (props.status === "select") {
          emits("cancel");
        } else {
          emits("select");
        }
      }
    }
    function activeHandle() {
      var _a2;
      if (((_a2 = props.option.children) == null ? void 0 : _a2.length) === 0) {
        isActive.value = true;
      }
    }
    const showRect = useInject(void 0, configName.SHOWRECT, true);
    const loading = useInject(void 0, configName.LOADING, false);
    watch(loading, (newValue) => {
      if (!newValue) {
        isActive.value = false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-cascader-item", [
          __props.option.disabled && "m-cascader-item-disabled",
          "m-cascader-item-" + __props.status
        ]]),
        onClick: activeHandle
      }, [
        unref(showRect) ? (openBlock(), createElementBlock("p", {
          key: 0,
          class: "m-cascader-rect",
          onClick: clickHandle
        })) : createCommentVNode("", true),
        createBaseVNode("p", _hoisted_1$m, toDisplayString(__props.option.label), 1),
        verifyChildren() && (!unref(loading) || !isActive.value) ? (openBlock(), createElementBlock("p", _hoisted_2$e)) : createCommentVNode("", true),
        isActive.value && unref(loading) ? (openBlock(), createBlock(unref(_sfc_main$17), {
          key: 2,
          color: "#6666"
        })) : createCommentVNode("", true)
      ], 2);
    };
  }
});
var cascaderItemVue = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-5ed78a74"]]);
var cascaderList_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  props: {
    options: null,
    index: null,
    activeIndex: null,
    selectIndex: null,
    hasIndex: null,
    trigger: null
  },
  emits: ["change", "show", "hidden", "select", "cancel"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const cascaderRef = ref();
    function clickHandle(item, parentIndex) {
      if (props.trigger === "click") {
        processCommon(item, parentIndex);
      }
    }
    function enterHandle(item, parentIndex) {
      if (props.trigger === "hover") {
        processCommon(item, parentIndex);
      }
    }
    function cancelHandle(item, parentIndex) {
      emits("cancel", item, props.index, parentIndex);
    }
    function selectHandle(item, parentIndex) {
      emits("select", item, props.index, parentIndex);
    }
    function processCommon(item, parentIndex) {
      var _a2;
      if (item.disabled) {
        return;
      }
      if (item.children) {
        emits("change", item, props.index, parentIndex);
      } else {
        if (!((_a2 = props.selectIndex) == null ? void 0 : _a2.includes(parentIndex))) {
          emits("show", item, props.index, parentIndex);
        } else {
          emits("hidden", item, props.index, parentIndex);
        }
      }
    }
    onMounted(() => {
      useScroll$1(cascaderRef.value, {
        bounce: false,
        scrollbar: {
          fade: true,
          interactive: true,
          scrollbarTrackClickable: true
        }
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-cascader-option-list",
        ref_key: "cascaderRef",
        ref: cascaderRef
      }, [
        createBaseVNode("div", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (item, index2) => {
            var _a2;
            return openBlock(), createBlock(cascaderItemVue, {
              class: normalizeClass(["m-cascader-option-list-item", [
                __props.activeIndex === index2 && "m-cascader-option-list-item-active"
              ]]),
              option: item,
              status: ((_a2 = __props.selectIndex) == null ? void 0 : _a2.includes(index2)) ? "select" : __props.hasIndex.includes(index2) ? "has" : "none",
              onClick: ($event) => clickHandle(item, index2),
              onCancel: ($event) => cancelHandle(item, index2),
              onSelect: ($event) => selectHandle(item, index2),
              onMouseenter: ($event) => enterHandle(item, index2)
            }, null, 8, ["class", "option", "status", "onClick", "onCancel", "onSelect", "onMouseenter"]);
          }), 256))
        ])
      ], 512);
    };
  }
});
var cascaderListVue = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-b786900c"]]);
var cascader_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$l = { class: "m-cascader" };
const _hoisted_2$d = ["onMousedown"];
const _hoisted_3$7 = {
  key: 0,
  class: "m-cascader-showValue"
};
const _hoisted_4$3 = {
  key: 1,
  style: { "color": "#666" }
};
const _hoisted_5$2 = {
  key: 0,
  class: "m-cascader-list"
};
const _hoisted_6$2 = { key: 1 };
const _hoisted_7$1 = { class: "m-cascader-footer" };
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  props: {
    options: null,
    separator: { default: "/" },
    multiple: { type: Boolean, default: false },
    modelValue: null,
    focus: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    maxTagCount: { default: 1 },
    tagType: null,
    filter: { type: Function, default: (str) => str },
    filterOption: { type: Function, default: (options) => options },
    placeholder: null,
    remote: { type: Boolean, default: false },
    labelRule: { default: "all" },
    loadOption: null,
    trigger: { default: "click" },
    size: { default: "small" },
    direction: null,
    valueField: null,
    labelField: null
  },
  emits: ["update:modelValue", "load"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const showOptions = reactive([props.options]);
    const activeIndex = reactive([]);
    const showValues = reactive(props.remote ? [] : Array.isArray(props.modelValue) ? props.multiple ? props.modelValue : props.modelValue.slice(0, props.maxTagCount) : props.modelValue ? [props.modelValue] : []);
    const showLabels = reactive([]);
    const activeMap = ref(/* @__PURE__ */ new WeakMap());
    const childrenMap = ref(/* @__PURE__ */ new WeakMap());
    const inputRef = ref();
    const loading = ref(false);
    provide(configName.LOADING, loading);
    watch(showValues, (newValue) => {
      emits("update:modelValue", toRaw(newValue));
    });
    function a() {
      var _a2;
      (_a2 = inputRef.value) == null ? void 0 : _a2.focus();
    }
    onMounted(() => {
      if (props.focus) {
        a();
      }
    });
    if (!props.remote) {
      parseModelValue();
    }
    function parseModelValue() {
      const models = showValues;
      for (let i = 0; i < models.length; i++) {
        if (props.multiple) {
          queryLocation(models[i]);
        } else {
          if (i === props.maxTagCount) {
            break;
          }
          queryLocation(models[i]);
        }
      }
    }
    function queryLocation(value, type = "add") {
      var _a2, _b2, _c2, _d2, _e;
      const valuess = value.split(props.separator);
      let options = props.options;
      let indexs = [];
      let optionss = [];
      let label = "";
      for (let i = 0; i < valuess.length; i++) {
        for (let j = 0; j < options.length; j++) {
          if (options[j].value === valuess[i]) {
            label += options[j].label + props.separator;
            if (i !== valuess.length - 1) {
              optionss.push(options);
              indexs.push(j);
            }
            if (type === "add") {
              treatmentToAdd(i, j, valuess, label, options);
            } else {
              treatmentToSub(i, j, valuess, options);
            }
            options = (_a2 = options[j].children) != null ? _a2 : [];
            break;
          }
        }
      }
      while (indexs.length !== 0) {
        const key = optionss.pop();
        const index2 = indexs.pop();
        if (type === "add") {
          const value2 = (_b2 = activeMap.value.get(key)) != null ? _b2 : [];
          if (value2.length === key.length) {
            goHeavy(value2, index2);
            activeMap.value.set(key, value2);
          } else {
            break;
          }
        } else {
          const childrenValue = (_c2 = childrenMap.value.get(key)) != null ? _c2 : [];
          const cchildrenValue = (_d2 = childrenMap.value.get(key[index2].children)) != null ? _d2 : [];
          const vvalue = (_e = activeMap.value.get(key[index2].children)) != null ? _e : [];
          if (cchildrenValue.length === 0 && vvalue.length === 0) {
            removeValue(childrenValue, index2);
            childrenMap.value.set(key, childrenValue);
          }
          if (childrenValue.length !== 0) {
            break;
          }
        }
      }
    }
    function treatmentToAdd(i, j, valuess, label, options) {
      var _a2, _b2;
      if (i === valuess.length - 1) {
        const activeValues = (_a2 = activeMap.value.get(options)) != null ? _a2 : [];
        goHeavy(activeValues, j);
        activeMap.value.set(options, activeValues);
        goHeavy(showLabels, label.slice(0, -1));
        return;
      }
      const childrenValue = (_b2 = childrenMap.value.get(options)) != null ? _b2 : [];
      goHeavy(childrenValue, j);
      childrenMap.value.set(options, childrenValue);
    }
    function treatmentToSub(i, j, valuess, options) {
      var _a2;
      if (i === valuess.length - 1) {
        const activeValues = (_a2 = activeMap.value.get(options)) != null ? _a2 : [];
        removeValue(activeValues, j);
        activeMap.value.set(options, activeValues);
        return;
      }
      activeMap.value.delete(options);
    }
    function closeHandle(index2) {
      queryLocation(showValues[index2], "sub");
      removeValue(showValues, showValues[index2]);
      removeValue(showLabels, showLabels[index2]);
    }
    async function changeHandle(option, index2, parentIndex) {
      var _a2;
      showOptions.splice(index2 + 1, showOptions.length);
      activeIndex.splice(index2, activeIndex.length);
      if (props.remote) {
        const result = await processRemote(option);
        processOptions(result, parentIndex);
      } else {
        processOptions((_a2 = option.children) != null ? _a2 : [], parentIndex);
      }
    }
    function processOptions(options, index2) {
      showOptions.push(props.filterOption(options));
      activeIndex.push(index2);
    }
    function processRemote(option, index2, parentIndex) {
      return new Promise((resolve2, reject) => {
        var _a2;
        try {
          if (((_a2 = option.children) == null ? void 0 : _a2.length) !== 0) {
            resolve2(option.children);
          } else {
            emits("load", option);
            loading.value = true;
            let cancelWatch = watch(() => props.loadOption, (newOptions) => {
              if (loading.value) {
                option.children = newOptions;
                loading.value = false;
                cancelWatch();
                resolve2(newOptions);
              }
            });
          }
        } catch (error) {
          reject(error);
        }
      });
    }
    function showHandle(option, index2, parentIndex, children = true) {
      var _a2, _b2, _c2;
      if (children) {
        processShow(index2, option);
      }
      let key = showOptions[index2];
      let values = (_a2 = activeMap.value.get(key)) != null ? _a2 : [];
      goHeavy(values, parentIndex);
      if (!props.multiple) {
        processQueue();
      }
      activeMap.value.set(key, values);
      while (index2 !== 0 && values.length === key.length) {
        key = showOptions[index2 - 1];
        values = (_b2 = activeMap.value.get(key)) != null ? _b2 : [];
        goHeavy(values, activeIndex[index2 - 1]);
        activeMap.value.set(key, values);
        index2--;
      }
      while (index2 !== 0) {
        key = showOptions[index2 - 1];
        values = (_c2 = childrenMap.value.get(key)) != null ? _c2 : [];
        goHeavy(values, activeIndex[index2 - 1]);
        childrenMap.value.set(key, values);
        index2--;
      }
    }
    function hiddenHandle(option, index2, parentIndex, isChldren = true) {
      var _a2, _b2, _c2, _d2, _e, _f;
      processShow(index2, option, (showValue, showLabel) => {
        showValues.splice(showValues.indexOf(showValue), 1);
        showLabels.splice(showLabels.indexOf(showLabel), 1);
      });
      let key = showOptions[isChldren ? index2 : index2 - 1];
      if (!key) {
        return;
      }
      let values = (_a2 = activeMap.value.get(key)) != null ? _a2 : [];
      let curIndex = index2;
      while (curIndex !== -1) {
        values.splice(values.indexOf(curIndex === index2 ? parentIndex : activeIndex[curIndex - 1]), 1);
        activeMap.value.set(key, values);
        if (values.length === (curIndex === index2 ? key.length - 1 : key.length)) {
          key = showOptions[curIndex - 1];
          values = (_b2 = activeMap.value.get(key)) != null ? _b2 : [];
          curIndex--;
        } else {
          break;
        }
      }
      key = showOptions[index2];
      values = (_c2 = childrenMap.value.get(key)) != null ? _c2 : [];
      let childrenValue = (_d2 = activeMap.value.get(key)) != null ? _d2 : [];
      while (index2 !== 0 && values.length === 0 && childrenValue.length === 0) {
        key = showOptions[index2 - 1];
        values = (_e = childrenMap.value.get(key)) != null ? _e : [];
        values.splice(values.indexOf(childrenMap[index2 - 1]), 1);
        childrenValue = (_f = activeMap.value.get(key)) != null ? _f : [];
        childrenMap.value.set(key, values);
        if (!props.multiple) {
          processQueue();
        }
        index2--;
      }
    }
    function rootSearchAdd(parentOption, index2, label, value) {
      var _a2, _b2;
      const name = label + parentOption.children[index2].label;
      const vvalue = value + parentOption.children[index2].value;
      if (props.multiple) {
        goHeavy(showValues, vvalue);
        goHeavy(showLabels, name);
      } else {
        showLabels[0] = name;
        showValues[0] = vvalue;
      }
      const values = (_a2 = activeMap.value.get(parentOption.children)) != null ? _a2 : [];
      goHeavy(values, index2);
      activeMap.value.set(parentOption.children, values);
      if (Array.isArray(parentOption.children[index2].children)) {
        const childrenValues = (_b2 = childrenMap.value.get(parentOption.children)) != null ? _b2 : [];
        goHeavy(childrenValues, index2);
        childrenMap.value.set(parentOption.children, childrenValues);
      }
    }
    function rootSearchSub(parentOption, index2, label, value) {
      const name = label + parentOption.children[index2].label;
      const vvalue = value + parentOption.children[index2].value;
      if (props.multiple) {
        showValues.splice(showValues.indexOf(vvalue), 1);
        showLabels.splice(showLabels.indexOf(name), 1);
      } else {
        showLabels[0] = name;
        showValues[0] = vvalue;
      }
    }
    function selectHandle(option, index2, parentIndex, label, showValue) {
      var _a2, _b2, _c2;
      if (!props.multiple || props.remote) {
        return;
      }
      if (!label) {
        const values2 = (_a2 = activeMap.value.get(showOptions[index2])) != null ? _a2 : [];
        const childrenValues = (_b2 = childrenMap.value.get(showOptions[index2])) != null ? _b2 : [];
        goHeavy(values2, parentIndex);
        goHeavy(childrenValues, parentIndex);
        activeMap.value.set(showOptions[index2], values2);
        childrenMap.value.set(showOptions[index2], childrenValues);
        processShow(index2, option);
        label = processPrefix(index2);
        showValue = processPrefix(index2, "value");
        showHandle(option, index2, parentIndex, false);
      }
      label += option.label + props.separator;
      showValue += option.value + props.separator;
      const values = (_c2 = activeMap.value.get(option)) != null ? _c2 : [];
      const children = option.children;
      for (let i = 0; i < children.length; i++) {
        if (!values.includes(i)) {
          const o = children[i];
          rootSearchAdd(option, i, label, showValue);
          if (Array.isArray(o.children) && o.children.length !== 0) {
            selectHandle(o, index2, parentIndex, label, showValue);
          }
        }
      }
      activeMap.value.set(option, values);
    }
    function cancelHandle(option, index2, parentIndex, label, showValue) {
      var _a2, _b2;
      if (!props.multiple || props.remote) {
        return;
      }
      activeMap.value.delete(option.children);
      childrenMap.value.delete(option.children);
      if (!label) {
        const value = (_a2 = activeMap.value.get(showOptions[index2])) != null ? _a2 : [];
        value.splice(value.indexOf(parentIndex), 1);
        activeMap.value.set(showOptions[index2], value);
        const childValue = (_b2 = childrenMap.value.get(showOptions[index2])) != null ? _b2 : [];
        childValue.splice(childValue.indexOf(parentIndex), 1);
        childrenMap.value.set(showOptions[index2], childValue);
        label = processPrefix(index2);
        showValue = processPrefix(index2, "value");
        hiddenHandle(option, index2, parentIndex, false);
      }
      showValues.splice(showValues.indexOf(showValue + option.value), 1);
      showLabels.splice(showLabels.indexOf(label + option.value));
      label += option.label + props.separator;
      showValue += option.value + props.separator;
      const children = option.children;
      for (let i = 0; i < children.length; i++) {
        const o = children[i];
        if (Array.isArray(o.children) && o.children.length !== 0) {
          cancelHandle(o, index2, parentIndex, label, showValue);
        } else {
          rootSearchSub(option, i, label, showValue);
        }
      }
    }
    function processPrefix(index2, key = "label") {
      let showValue = "";
      for (let i = 0; i < index2; i++) {
        showValue += showOptions[i][activeIndex[i]][key] + props.separator;
      }
      return showValue;
    }
    function processShow(index2, option, callBack = (showValue, showLabel) => {
      goHeavy(showValues, showValue);
      goHeavy(showLabels, showLabel);
      if (!props.multiple) {
        processQueue();
      }
    }) {
      let showValue = processPrefix(index2, "value");
      let showLabel = processPrefix(index2, "label");
      showValue += option.value;
      showLabel += option.label;
      callBack(showValue, showLabel);
    }
    function goHeavy(target, value) {
      if (!target.includes(value)) {
        target.push(value);
      }
    }
    function removeValue(target, value) {
      if (target.includes(value)) {
        target.splice(target.indexOf(value), 1);
      }
    }
    function processQueue() {
      const len = showValues.length;
      if (len > props.maxTagCount) {
        const value = showValues.shift();
        showLabels.shift();
        queryLocation(value, "sub");
      }
    }
    function processLabel(str, type) {
      const strs = str.split(props.separator).map((item) => props.filter(item));
      switch (type) {
        case "all":
          return strs.join(props.separator);
        case "child":
          return strs[strs.length - 1];
        case "parent":
          return strs.slice(-2).join(props.separator);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", _hoisted_1$l, [
        createBaseVNode("input", {
          type: "text",
          ref_key: "inputRef",
          ref: inputRef
        }, null, 512),
        createBaseVNode("div", {
          class: normalizeClass(["m-cascader-label", "m-cascader-label-" + __props.size]),
          onMousedown: withModifiers(a, ["prevent"])
        }, [
          unref(showLabels).length !== 0 ? (openBlock(), createElementBlock("div", _hoisted_3$7, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(showLabels), (item, index2) => {
              return openBlock(), createBlock(mTag$1, {
                class: "m-cascader-tag",
                size: __props.size,
                closabled: __props.clearable,
                onClose: ($event) => closeHandle(index2)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(processLabel(item, __props.labelRule)), 1)
                ]),
                _: 2
              }, 1032, ["size", "closabled", "onClose"]);
            }), 256))
          ])) : (openBlock(), createElementBlock("p", _hoisted_4$3, toDisplayString(__props.placeholder), 1))
        ], 42, _hoisted_2$d),
        createBaseVNode("div", {
          class: normalizeClass(["m-cascader-contain", "m-cascader-contain-" + __props.direction]),
          onMousedown: a
        }, [
          __props.options ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(showOptions), (option, index2) => {
              var _a2, _b2;
              return openBlock(), createBlock(cascaderListVue, {
                class: "m-cascader-list-option",
                index: index2,
                options: option,
                "select-index": (_a2 = activeMap.value.get(option)) != null ? _a2 : [],
                "active-index": !isNaN(index2) ? unref(activeIndex)[index2] : void 0,
                "has-index": (_b2 = childrenMap.value.get(option)) != null ? _b2 : [],
                onChange: changeHandle,
                onShow: showHandle,
                onHidden: hiddenHandle,
                onSelect: selectHandle,
                onCancel: cancelHandle,
                trigger: __props.remote ? "click" : __props.trigger
              }, null, 8, ["index", "options", "select-index", "active-index", "has-index", "trigger"]);
            }), 256))
          ])) : (openBlock(), createElementBlock("div", _hoisted_6$2)),
          createBaseVNode("div", _hoisted_7$1, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])
        ], 34)
      ]);
    };
  }
});
var Cascader = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-65e5be94"]]);
const mCascader = withInstall(Cascader, "mCascader");
var autoComplete_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  props: {
    prefix: { default: [] },
    suffix: { default: [] },
    modelValue: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const value = ref(props.modelValue);
    const listOptions = ref([]);
    watch(value, (newValue) => {
      var _a2, _b2;
      if (newValue) {
        listOptions.value = [];
        const len = Math.max(props.prefix.length, props.suffix.length);
        for (let i = 0; i < len; i++) {
          const prefix = (_a2 = props.prefix[i]) != null ? _a2 : "";
          const suffix = (_b2 = props.suffix[i]) != null ? _b2 : "";
          listOptions.value.push(prefix + newValue + suffix);
        }
      } else {
        listOptions.value = [];
      }
    });
    function clickHandle(value2) {
      emits("update:modelValue", value2);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(mInput$1, mergeProps({
        modelValue: value.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
        list: listOptions.value
      }, _ctx.$attrs, {
        clear: "",
        onLiClick: clickHandle,
        onListClick: clickHandle
      }), {
        list: withCtx(({ value: value2 }) => [
          renderSlot(_ctx.$slots, "default", { value: value2 }, () => [
            createTextVNode(toDisplayString(value2), 1)
          ], true)
        ]),
        _: 3
      }, 16, ["modelValue", "list"]);
    };
  }
});
var AutoComplete = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-3402331a"]]);
const mAutoComplete = withInstall(AutoComplete, "mAutoComplete");
var VertualScroll_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$k = ["onClick"];
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  props: {
    options: null,
    height: { default: 34 },
    width: { default: 200 },
    gap: { default: 5 },
    maxHeight: { default: 500 },
    start: { default: 0 },
    labelName: null,
    labelValue: null
  },
  emits: ["option"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const containHeight = props.options.length * props.height;
    const translateY = ref(0);
    const showOptions = ref([]);
    function scrollHandle(event) {
      const y = event.target.scrollTop;
      translateY.value = Math.abs(y);
      settingOptions(Math.abs(y));
    }
    settingOptions();
    function settingOptions(y = props.start) {
      const minLen = Math.floor(y / props.height);
      const maxLen = Math.ceil((y + props.maxHeight) / props.height);
      const len = maxLen - minLen;
      const options = [];
      for (let i = 0; i < len; i++) {
        if (minLen + i < props.options.length) {
          options.push(props.options[minLen + i]);
        }
      }
      showOptions.value = options;
    }
    function clickHandle(item, index2) {
      emits("option", item, index2);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-vertualScroll scroll",
        onScroll: scrollHandle,
        style: normalizeStyle([
          { height: __props.maxHeight + "px" },
          { width: __props.width + "px" },
          { ["--m-vertual-scroll-height"]: __props.height + "px" }
        ])
      }, [
        createBaseVNode("div", {
          class: "m-vertual-scroll-contain",
          style: normalizeStyle([{ height: containHeight + "px" }])
        }, [
          createBaseVNode("ul", {
            style: normalizeStyle({ transform: `translateY(${translateY.value}px)` })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(showOptions.value, (item, index2) => {
              return openBlock(), createElementBlock("li", {
                onClick: ($event) => clickHandle(item, index2)
              }, [
                renderSlot(_ctx.$slots, "default", { value: item }, () => [
                  createTextVNode(toDisplayString(__props.labelName ? item[__props.labelName] : item), 1)
                ], true)
              ], 8, _hoisted_1$k);
            }), 256))
          ], 4)
        ], 4)
      ], 36);
    };
  }
});
var VertualScroll = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-54b287cc"]]);
const mVertualScroll = withInstall(VertualScroll, "mVertualScroll");
var null_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$j = { class: "m-null" };
const _hoisted_2$c = {
  t: "1655445000801",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "9964",
  width: "64",
  height: "64"
};
const _hoisted_3$6 = ["fill"];
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  props: {
    color: { default: "#333333" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$j, [
        (openBlock(), createElementBlock("svg", _hoisted_2$c, [
          createBaseVNode("path", {
            d: "M274.56 798.997333l19.434667-25.130666-33.792 68.565333a18.133333 18.133333 0 0 0 11.562666 25.536l59.733334 16a18.133333 18.133333 0 0 0 17.28-4.48c20.522667-19.818667 35.626667-35.989333 45.290666-48.469333l19.456-25.130667-33.813333 68.565333a18.133333 18.133333 0 0 0 11.562667 25.536l84.48 22.634667a18.133333 18.133333 0 0 0 17.28-4.48c20.522667-19.84 35.626667-35.989333 45.269333-48.469333l19.456-25.130667-33.813333 68.565333A18.133333 18.133333 0 0 0 535.530667 938.666667l72.106666 19.328a18.133333 18.133333 0 0 0 17.28-4.48c20.522667-19.84 35.626667-36.010667 45.269334-48.490667l19.456-25.130667-33.813334 68.586667a18.133333 18.133333 0 0 0 11.584 25.514667l86.421334 23.338666 3.84-0.213333c13.269333-0.704 29.056-5.034667 43.84-12.8 29.781333-15.701333 48.170667-43.2 52.181333-78.250667 2.133333-18.517333 4.778667-38.549333 8.405333-63.530666 1.642667-11.221333 2.944-20.010667 6.229334-41.834667 11.050667-73.322667 14.634667-101.034667 17.130666-133.674667l0.938667-12.373333 2.837333-2.922667 12.330667-1.344a41.813333 41.813333 0 0 0 24.810667-11.221333c10.730667-10.24 14.805333-25.386667 11.093333-42.197333l-37.546667-171.584c-3.029333-13.696-11.264-27.946667-23.146666-39.829334-11.648-11.626667-25.92-20.138667-39.893334-23.893333L723.626667 331.306667l-2.261334-3.925334L774.250667 130.133333c8.32-31.061333-11.754667-63.744-44.970667-72.64l-79.509333-21.312c-33.194667-8.896-66.922667 9.365333-75.264 40.426667l-52.842667 197.269333-3.925333 2.261334-118.101334-31.637334c-13.994667-3.754667-30.634667-3.498667-46.506666 0.746667-16.256 4.352-30.506667 12.586667-39.957334 22.933333l-118.314666 129.792c-11.605333 12.714667-15.658667 27.84-11.52 42.090667 4.16 14.229333 15.850667 25.194667 32.896 30.528l13.610666 4.266667 2.133334 3.882666-3.626667 13.802667c-21.12 79.850667-52.885333 136.917333-85.717333 150.890667-47.530667 20.202667-72.938667 49.429333-78.421334 85.034666-5.034667 32.682667 9.28 67.114667 37.589334 91.541334l22.037333 8.341333 74.666667 20.010667a42.666667 42.666667 0 0 0 41.216-11.050667c15.274667-15.274667 26.88-28.032 34.837333-38.293333z m551.381333-396.565333c14.144 3.797333 29.952 19.2 32.768 32l34.56 157.781333a10.666667 10.666667 0 0 1-13.184 12.586667L240.64 433.493333a10.666667 10.666667 0 0 1-5.12-17.493333l108.8-119.36c8.832-9.685333 30.229333-15.146667 44.373333-11.349333l141.333334 37.866666a21.333333 21.333333 0 0 0 26.133333-15.082666l58.304-217.642667a21.333333 21.333333 0 0 1 26.133333-15.082667l77.056 20.650667a21.333333 21.333333 0 0 1 15.082667 26.133333l-58.325333 217.642667a21.333333 21.333333 0 0 0 15.082666 26.112l136.448 36.565333zM315.456 701.568c-33.664 45.141333-64.597333 79.082667-92.8 101.802667l-5.909333 4.778666-2.837334 0.597334-88.106666-24.106667-2.922667-3.2c-13.034667-14.165333-19.370667-31.04-16.981333-46.592 3.285333-21.333333 22.058667-39.338667 53.205333-52.586667 31.722667-13.482667 59.818667-47.104 82.922667-99.904 10.026667-22.954667 18.88-48.725333 26.389333-76.586666l3.882667-14.4 3.904-2.261334 566.165333 151.701334 2.346667 3.306666-0.789334 12.224c-1.984 30.592-30.336 229.397333-32.128 244.906667-2.346667 20.416-11.306667 34.986667-27.605333 44.394667a73.237333 73.237333 0 0 1-21.397333 8.106666l-5.013334 0.725334-60.373333-16.170667 11.242667-20.288c8.277333-14.976 22.656-43.84 43.093333-86.613333a21.12 21.12 0 0 0-9.962667-28.16l-3.136-1.493334a21.333333 21.333333 0 0 0-26.261333 6.485334c-33.642667 45.056-64.533333 78.912-92.672 101.546666l-5.909333 4.757334-2.837334 0.597333-52.544-14.08 11.114667-20.266667c3.562667-6.485333 7.04-13.013333 10.453333-19.626666 7.04-13.504 17.898667-35.797333 32.597334-66.816a21.290667 21.290667 0 0 0-9.984-28.309334l-3.029334-1.450666a21.333333 21.333333 0 0 0-26.368 6.442666c-33.6 45.013333-64.469333 78.826667-92.608 101.482667l-5.909333 4.757333-2.837333 0.597334-52.138667-13.973334 11.114667-20.266666c3.242667-5.888 6.72-12.416 10.453333-19.626667 6.997333-13.461333 17.962667-35.946667 32.896-67.434667a20.970667 20.970667 0 0 0-10.112-28.010666l-3.328-1.536a21.333333 21.333333 0 0 0-26.069333 6.613333c-33.642667 45.056-64.554667 78.976-92.778667 101.696l-5.909333 4.757333-2.837334 0.597334-32.64-8.746667 11.093334-20.245333c3.541333-6.506667 7.04-13.034667 10.453333-19.626667 6.976-13.482667 17.941333-35.968 32.874667-67.456a21.056 21.056 0 0 0-10.069334-28.074667l-3.242666-1.514666a21.333333 21.333333 0 0 0-26.154667 6.549333z",
            fill: __props.color,
            "p-id": "9965"
          }, null, 8, _hoisted_3$6)
        ]))
      ]);
    };
  }
});
var mNullVue = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-e9d7a664"]]);
var transfer_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-2c6e9b7f"), n = n(), popScopeId(), n);
const _hoisted_1$i = { class: "m-transfer-origin m-transfer-common" };
const _hoisted_2$b = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("span", null, "/", -1));
const _hoisted_3$5 = { key: 0 };
const _hoisted_4$2 = { key: 0 };
const _hoisted_5$1 = ["onClick"];
const _hoisted_6$1 = {
  key: 1,
  class: "m-transfer-null"
};
const _hoisted_7 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("span", null, "\u65E0\u6570\u636E", -1));
const _hoisted_8 = { class: "m-transfer-operate" };
const _hoisted_9 = { class: "m-transfer-target m-transfer-common" };
const _hoisted_10 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("span", null, "/", -1));
const _hoisted_11 = { key: 0 };
const _hoisted_12 = { key: 0 };
const _hoisted_13 = ["onClick"];
const _hoisted_14 = {
  key: 1,
  class: "m-transfer-null"
};
const _hoisted_15 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("span", null, "\u65E0\u6570\u636E", -1));
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  props: {
    originLabel: { default: "\u6E90\u9879" },
    targetLabel: { default: "\u76EE\u6807\u9879" },
    originOptions: null,
    targetOptions: null,
    labelName: { default: "label" },
    valueName: { default: "value" },
    targetValue: { default: () => [] },
    originValue: { default: () => [] },
    filterable: { type: Boolean, default: false },
    height: { default: 220 },
    width: { default: 180 },
    filter: { type: Function, default: (m, key, value) => {
      return m.filter((item) => {
        if (typeof item[key] === "string") {
          return item[key].includes(value);
        }
      });
    } },
    originFooter: null,
    targetFooter: null
  },
  emits: ["update:targetOptions", "update:originOptions"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const originRef = ref();
    const targetRef = ref();
    const showAnimation = ref(false);
    const originInfo = reactive({
      selectStatus: "none",
      selection: [],
      options: props.originOptions,
      scroll: void 0,
      disableds: processDisableds(props.originOptions),
      inputValue: ""
    });
    const originValues = ref([]);
    const targetValues = ref([]);
    const targetInfo = reactive({
      selectStatus: "none",
      selection: [],
      options: props.targetOptions,
      scroll: void 0,
      disableds: processDisableds(props.targetOptions),
      inputValue: ""
    });
    processInitialValue(props.originOptions, props.originValue, "origin");
    processInitialValue(props.targetOptions, props.targetValue, "target");
    function clickHandle(type, index2, item) {
      if (typeof item === "object" && item.disabled) {
        return;
      }
      let target;
      let curInfo;
      let values;
      if (type === "origin") {
        target = originInfo.selection;
        curInfo = originInfo;
        values = originValues.value;
      } else {
        target = targetInfo.selection;
        curInfo = targetInfo;
        values = targetValues.value;
      }
      const value = processObject(props.valueName, item);
      if (target.includes(index2)) {
        target.splice(target.indexOf(index2), 1);
        values.splice(values.indexOf(value), 1);
        if (curInfo.selection.length === 0) {
          curInfo.selectStatus = "none";
        } else {
          curInfo.selectStatus = "has";
        }
      } else {
        target.push(index2);
        values.push(value);
        if (curInfo.selection.length === curInfo.disableds) {
          curInfo.selectStatus = "select";
        } else {
          curInfo.selectStatus = "has";
        }
      }
      if (type === "origin") {
        emits("update:originOptions", values);
      } else {
        emits("update:targetOptions", values);
      }
    }
    function buttonHandle(type) {
      showAnimation.value = true;
      let target;
      let curInfo;
      let changeInfo;
      if (type === "origin") {
        target = originInfo.selection;
        curInfo = originInfo;
        changeInfo = targetInfo;
      } else {
        target = targetInfo.selection;
        changeInfo = originInfo;
        curInfo = targetInfo;
      }
      target.sort((a, b) => b - a);
      const len = target.length;
      for (let i = 0; i < len; i++) {
        const option = curInfo.options[target[i]];
        curInfo.options.splice(target[i], 1);
        changeInfo.options.unshift(option);
      }
      setTimeout(() => {
        showAnimation.value = false;
        targetInfo.scroll.refresh();
        originInfo.scroll.refresh();
      }, 500);
      curInfo.selection = [];
      curInfo.selectStatus = "none";
      for (let i = 0; i < changeInfo.selection.length; i++) {
        changeInfo.selection[i] += len;
      }
      originInfo.disableds = processDisableds(originInfo.options);
      targetInfo.disableds = processDisableds(targetInfo.options);
    }
    function changeStatusHandle(type) {
      let info;
      let values;
      if (type === "origin") {
        info = originInfo;
        values = originValues.value = [];
      } else {
        info = targetInfo;
        values = targetValues.value = [];
      }
      if (info.disableds === 0) {
        return;
      }
      info.selection = [];
      if (info.selectStatus !== "select") {
        for (let i = 0; i < info.options.length; i++) {
          if (info.options[i].disabled) {
            continue;
          }
          info.selection.push(i);
          values.push(info.options[i][props.valueName]);
        }
        info.selectStatus = "select";
      } else {
        info.selectStatus = "none";
      }
      if (type === "origin") {
        emits("update:originOptions", values);
      } else {
        emits("update:targetOptions", values);
      }
    }
    function processObject(key, obj) {
      var _a2;
      if (typeof obj === "object") {
        return (_a2 = obj[key]) != null ? _a2 : obj;
      } else {
        return obj;
      }
    }
    function processDisableds(objs) {
      let answer = 0;
      for (let obj of objs) {
        if (typeof obj === "object") {
          if (!obj.disabled) {
            answer++;
          }
        }
      }
      return answer;
    }
    function processInitialValue(target, options, type) {
      let index2;
      options.forEach((item) => {
        if (target.some((i, ind) => {
          if (i.value === item) {
            index2 = ind;
            return true;
          }
        })) {
          clickHandle(type, index2, target[index2]);
        }
      });
    }
    function processFilter(options, key, value) {
      return props.filter(options, key, value);
    }
    onMounted(() => {
      originInfo.scroll = useScroll$1(originRef.value, {
        bounce: false
      });
      targetInfo.scroll = useScroll$1(targetRef.value, { bounce: false });
    });
    watch(() => originInfo.inputValue, () => {
      setTimeout(() => {
        originInfo.scroll.refresh();
      }, 100);
    });
    watch(() => targetInfo.inputValue, () => {
      setTimeout(() => {
        targetInfo.scroll.refresh();
      }, 100);
    });
    return (_ctx, _cache) => {
      const _component_m_icon = resolveComponent("m-icon");
      return openBlock(), createElementBlock("div", {
        class: "m-transfer",
        style: normalizeStyle([
          { ["--m-transfer-height"]: __props.height },
          { ["--m-transfer-width"]: __props.width }
        ])
      }, [
        createBaseVNode("div", _hoisted_1$i, [
          createBaseVNode("header", null, [
            createBaseVNode("div", {
              class: normalizeClass(["m-transfer-content", unref(originInfo).disableds === 0 && "m-transfer-content-disabled"]),
              onClick: _cache[0] || (_cache[0] = ($event) => changeStatusHandle("origin"))
            }, [
              createBaseVNode("span", {
                class: normalizeClass([unref(originInfo).selectStatus, "m-transfer-rect"])
              }, null, 2),
              createBaseVNode("span", null, toDisplayString(__props.originLabel), 1)
            ], 2),
            createBaseVNode("div", null, [
              createBaseVNode("span", null, toDisplayString(unref(originInfo).selection.length), 1),
              _hoisted_2$b,
              createBaseVNode("span", null, toDisplayString(unref(originInfo).options.length), 1)
            ])
          ]),
          __props.filterable ? (openBlock(), createElementBlock("nav", _hoisted_3$5, [
            createVNode(mInput$1, {
              class: "m-transfer-input",
              placeholder: "\u8BF7\u8F93\u5165",
              modelValue: unref(originInfo).inputValue,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(originInfo).inputValue = $event),
              clear: ""
            }, null, 8, ["modelValue"])
          ])) : createCommentVNode("", true),
          createBaseVNode("main", {
            ref_key: "originRef",
            ref: originRef
          }, [
            processFilter(unref(originInfo).options, __props.labelName, unref(originInfo).inputValue).length !== 0 ? (openBlock(), createElementBlock("ul", _hoisted_4$2, [
              createVNode(TransitionGroup, {
                name: showAnimation.value ? "mTransferItemLeave" : "",
                mode: "out-in"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(originInfo).options, (item, index2) => {
                    return withDirectives((openBlock(), createElementBlock("li", {
                      key: item[props.valueName],
                      class: normalizeClass(item.disabled && "m-transfer-li-disabled"),
                      onClick: ($event) => clickHandle("origin", index2, item)
                    }, [
                      createBaseVNode("span", {
                        class: normalizeClass(["m-transfer-rect", unref(originInfo).selection.includes(index2) && "select"])
                      }, null, 2),
                      createBaseVNode("p", null, toDisplayString(processObject(__props.labelName, item)), 1)
                    ], 10, _hoisted_5$1)), [
                      [vShow, item[__props.labelName].includes(unref(originInfo).inputValue)]
                    ]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["name"])
            ])) : (openBlock(), createElementBlock("div", _hoisted_6$1, [
              createVNode(mNullVue),
              _hoisted_7
            ]))
          ], 512),
          createBaseVNode("footer", null, toDisplayString(__props.originFooter), 1)
        ]),
        createBaseVNode("div", _hoisted_8, [
          createVNode(mButtonVue, {
            color: "#fff",
            textColor: "rgb(64, 67, 69)",
            borderColor: "rgb(224, 224, 230)",
            disabled: unref(originInfo).selection.length === 0,
            onMClick: _cache[2] || (_cache[2] = ($event) => buttonHandle("origin"))
          }, {
            default: withCtx(() => [
              createVNode(_component_m_icon, { name: "m-toRight" })
            ]),
            _: 1
          }, 8, ["disabled"]),
          createVNode(mButtonVue, {
            color: "#fff",
            textColor: "rgb(64, 67, 69)",
            borderColor: "rgb(224, 224, 230)",
            disabled: unref(targetInfo).selection.length === 0,
            onMClick: _cache[3] || (_cache[3] = ($event) => buttonHandle("target"))
          }, {
            default: withCtx(() => [
              createVNode(_component_m_icon, { name: "m-toLeft" })
            ]),
            _: 1
          }, 8, ["disabled"])
        ]),
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("header", null, [
            createBaseVNode("div", {
              class: normalizeClass(["m-transfer-content", unref(targetInfo).disableds === 0 && "m-transfer-content-disabled"]),
              onClick: _cache[4] || (_cache[4] = ($event) => changeStatusHandle("target"))
            }, [
              createBaseVNode("span", {
                class: normalizeClass([unref(targetInfo).selectStatus, "m-transfer-rect"])
              }, null, 2),
              createBaseVNode("span", null, toDisplayString(__props.targetLabel), 1)
            ], 2),
            createBaseVNode("div", null, [
              createBaseVNode("span", null, toDisplayString(unref(targetInfo).selection.length), 1),
              _hoisted_10,
              createBaseVNode("span", null, toDisplayString(unref(targetInfo).options.length), 1)
            ])
          ]),
          __props.filterable ? (openBlock(), createElementBlock("nav", _hoisted_11, [
            createVNode(mInput$1, {
              class: "m-transfer-input",
              placeholder: "\u8BF7\u8F93\u5165",
              modelValue: unref(targetInfo).inputValue,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(targetInfo).inputValue = $event),
              clear: ""
            }, null, 8, ["modelValue"])
          ])) : createCommentVNode("", true),
          createBaseVNode("main", {
            ref_key: "targetRef",
            ref: targetRef
          }, [
            processFilter(unref(targetInfo).options, __props.labelName, unref(targetInfo).inputValue).length !== 0 ? (openBlock(), createElementBlock("div", _hoisted_12, [
              createBaseVNode("ul", null, [
                createVNode(TransitionGroup, {
                  name: showAnimation.value ? "mTransferItemLeaveRight" : "",
                  mode: "out-in"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(targetInfo).options, (item, index2) => {
                      return withDirectives((openBlock(), createElementBlock("li", {
                        class: normalizeClass(item.disabled && "m-transfer-li-disabled"),
                        key: item[props.valueName],
                        onClick: ($event) => clickHandle("target", index2, item)
                      }, [
                        createBaseVNode("span", {
                          class: normalizeClass(["m-transfer-rect", unref(targetInfo).selection.includes(index2) && "select"])
                        }, null, 2),
                        createBaseVNode("p", null, toDisplayString(processObject(__props.labelName, item)), 1)
                      ], 10, _hoisted_13)), [
                        [vShow, item[__props.labelName].includes(unref(targetInfo).inputValue)]
                      ]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["name"])
              ])
            ])) : (openBlock(), createElementBlock("div", _hoisted_14, [
              createVNode(mNullVue),
              _hoisted_15
            ]))
          ], 512),
          createBaseVNode("footer", null, toDisplayString(__props.targetFooter), 1)
        ])
      ], 4);
    };
  }
});
var Transfer = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-2c6e9b7f"]]);
const mTransfer = withInstall(Transfer, "mTransfer");
var ColorPicker_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$h = { class: "m-color" };
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  props: {
    color: { default: "#00ffff" },
    mode: { default: "RGB" }
  },
  setup(__props) {
    const props = __props;
    const color = ref(props.color);
    function computedColor(color2) {
      let answer = 1;
      if (color2.startsWith("#")) {
        color2 = color2.slice(1);
        for (let i = 0; i < 3; i++) {
          let colors;
          if (color2.length == 6) {
            colors = color2.slice(i * 2, (i + 1) * 2);
          } else {
            colors = color2.slice(i, i + 1) + color2.slice(i, i + 1);
          }
          answer += +parseInt(colors, 16);
        }
      }
      if (answer >= 450) {
        return "#000000";
      } else {
        return "#ffffff";
      }
    }
    var colorRgb = function(sColor) {
      sColor = sColor.toLowerCase();
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "RGB(" + sColorChange.join(",") + ")";
      }
      return sColor;
    };
    function rgbToHsl(color2) {
      let [r, g, b] = color2.slice(4, -1).split(",").map((item) => +item);
      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h2, s, l = (max + min) / 2;
      if (max == min) {
        h2 = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h2 = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h2 = (b - r) / d + 2;
            break;
          case b:
            h2 = (r - g) / d + 4;
            break;
        }
        h2 /= 6;
      }
      return `hsl(${h2.toFixed(2)},${s.toFixed(2)},${l.toFixed(2)})`;
    }
    function modeSelect(color2, mode) {
      if (mode === "HEX") {
        return color2;
      }
      const colors = colorRgb(color2);
      if (mode === "RGB") {
        return colors;
      }
      return rgbToHsl(colors);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", _hoisted_1$h, [
        withDirectives(createBaseVNode("input", {
          type: "color",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => color.value = $event)
        }, null, 512), [
          [vModelText, color.value]
        ]),
        createBaseVNode("div", {
          class: "m-color-show",
          style: normalizeStyle([{ color: computedColor(color.value) }, { backgroundColor: color.value }])
        }, toDisplayString(modeSelect(color.value, __props.mode)), 5)
      ]);
    };
  }
});
var ColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-03682e14"]]);
const mColorPicker = withInstall(ColorPicker, "mColorPicker");
var dropdownChild_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-0110de88"), n = n(), popScopeId(), n);
const _hoisted_1$g = { class: "m-dropdown-child" };
const _hoisted_2$a = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("p", { class: "m-dropdown-child-arrow" }, null, -1));
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  props: {
    options: null,
    labelName: { default: "label" },
    valueName: { default: "value" },
    defaultValue: null,
    flag: { type: Boolean },
    iconName: { default: "icon" }
  },
  emits: ["hidden"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const showChild = ref(false);
    const isMove = ref(false);
    const isShow = ref(false);
    function enterContentHandle() {
      showChild.value = true;
      isShow.value = true;
    }
    function leaveContentHandle() {
      setTimeout(() => {
        showChild.value = false;
        isShow.value = false;
      }, 100);
    }
    function enterHandle() {
      isMove.value = true;
      setTimeout(() => {
        showChild.value = true;
        isShow.value = true;
      }, 200);
    }
    function leaveHandle() {
      isMove.value = false;
      showChild.value = false;
    }
    function hiddenHandle(option, values) {
      isMove.value = false;
      showChild.value = false;
      isShow.value = false;
      values.unshift(props.options[props.valueName]);
      emits("hidden", option, values);
    }
    watch(() => props.flag, (newValue) => {
      if (newValue) {
        isShow.value = false;
      }
    });
    onMounted(() => {
    });
    return (_ctx, _cache) => {
      var _a2;
      return openBlock(), createElementBlock("div", _hoisted_1$g, [
        createBaseVNode("div", {
          class: normalizeClass([
            "m-dropdown-child-content",
            ((_a2 = __props.defaultValue) == null ? void 0 : _a2.includes(__props.options[__props.valueName])) && "m-dropwon-item-active"
          ]),
          onMouseenter: enterContentHandle,
          onMouseleave: leaveContentHandle
        }, [
          __props.options[__props.iconName] ? (openBlock(), createBlock(mIcon$1, {
            key: 0,
            name: __props.options[__props.iconName],
            class: "m-dropdown-item-icon"
          }, null, 8, ["name"])) : createCommentVNode("", true),
          createBaseVNode("p", null, toDisplayString(__props.options[__props.labelName]), 1)
        ], 34),
        _hoisted_2$a,
        createVNode(Transition$1, { name: "fade" }, {
          default: withCtx(() => [
            withDirectives(createVNode(mDropdownItem, {
              onMouseenter: enterHandle,
              onMouseleave: leaveHandle,
              class: "m-dropdown-child-item",
              options: __props.options.children,
              onHidden: hiddenHandle,
              "default-value": __props.defaultValue
            }, null, 8, ["options", "default-value"]), [
              [vShow, isMove.value || showChild.value || isShow.value]
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
var mDropdownChild = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-0110de88"]]);
var dropdownItem_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$f = { class: "m-dropdown-item-li" };
const _hoisted_2$9 = ["onClick"];
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  props: {
    options: null,
    labelName: { default: "label" },
    valueName: { default: "value" },
    defaultValue: null,
    iconName: { default: "icon" }
  },
  emits: ["hidden"],
  setup(__props, { emit: emits }) {
    const props = __props;
    let flag = ref(false);
    function clickHandle(option) {
      emits("hidden", option, [option[props.valueName]]);
    }
    function enterHandle() {
      flag.value = true;
    }
    function leaveHandle() {
      flag.value = false;
    }
    function hiddenHandle(option, values, item) {
      emits("hidden", option, values);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("ul", {
        class: "m-dropdown-item",
        onMouseenter: enterHandle,
        onMouseleave: leaveHandle
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (item, index2) => {
          var _a2;
          return openBlock(), createElementBlock("li", _hoisted_1$f, [
            item.children ? (openBlock(), createBlock(mDropdownChild, {
              key: 0,
              options: item,
              flag: unref(flag),
              onHidden: (option, values) => {
                hiddenHandle(option, values);
              },
              "default-value": __props.defaultValue
            }, null, 8, ["options", "flag", "onHidden", "default-value"])) : (openBlock(), createElementBlock("div", {
              key: 1,
              onClick: withModifiers(($event) => clickHandle(item), ["stop"])
            }, [
              item[__props.iconName] ? (openBlock(), createBlock(mIcon$1, {
                key: 0,
                name: item[__props.iconName],
                class: "m-dropdown-item-icon"
              }, null, 8, ["name"])) : createCommentVNode("", true),
              createBaseVNode("p", {
                class: normalizeClass(((_a2 = __props.defaultValue) == null ? void 0 : _a2.includes(item[__props.valueName])) && "m-dropwon-item-active")
              }, toDisplayString(item[__props.labelName]), 3)
            ], 8, _hoisted_2$9))
          ]);
        }), 256))
      ], 32);
    };
  }
});
var mDropdownItem = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-49c1b56e"]]);
var dropdown_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$e = ["onClick"];
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  props: {
    options: null,
    labelName: { default: "label" },
    valueName: { default: "value" },
    direction: { default: "bottom" },
    trigger: { default: "hover" },
    defaultValue: null,
    iconName: { default: "icon" }
  },
  emits: ["select"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const isShow = ref(false);
    function clickHandle() {
      if (props.trigger !== "hover") {
        isShow.value = !unref(isShow);
      }
    }
    function hiddenHandle(option, values) {
      isShow.value = false;
      emits("select", option, values);
    }
    function enterHandle() {
      if (props.trigger === "hover") {
        isShow.value = true;
      }
    }
    function leaveHandle() {
      if (props.trigger === "hover") {
        isShow.value = false;
      }
    }
    if (props.trigger === "auto") {
      window.addEventListener("click", () => {
        isShow.value = false;
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-dropdown",
        onMouseenter: enterHandle,
        onMouseleave: leaveHandle
      }, [
        createBaseVNode("div", {
          onClick: withModifiers(clickHandle, ["stop"])
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 8, _hoisted_1$e),
        createVNode(Transition$1, { name: "fade" }, {
          default: withCtx(() => [
            withDirectives(createVNode(mDropdownItem, {
              options: __props.options,
              class: normalizeClass("m-dropdown-item-" + __props.direction),
              onHidden: hiddenHandle,
              defaultValue: __props.defaultValue,
              "value-name": __props.valueName,
              "label-name": __props.labelName,
              onMouseenter: enterHandle
            }, null, 8, ["options", "class", "defaultValue", "value-name", "label-name"]), [
              [vShow, isShow.value]
            ])
          ]),
          _: 1
        })
      ], 32);
    };
  }
});
var mDropdown$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-8ca5e9d8"]]);
const mDropdown = withInstall(mDropdown$1, "mDropdown");
var treeItem_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$d = { class: "m-tree-item" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    level: null,
    path: null
  },
  emits: ["choose", "transfer", "expand"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const labelName = useInject(void 0, "labelName", "label");
    useInject(void 0, "valueName", "value");
    const selectMap = useInject(void 0, "selectMap", /* @__PURE__ */ new WeakMap());
    function expandHandle(level, option, signal) {
      emits("expand", level, option, signal);
    }
    function clickHandle() {
      if (!props.option.disabled) {
        emits("choose", props.level, props.option);
      }
    }
    function chooseHandle(level, option) {
      emits("choose", level, option);
    }
    function transferHandle(level, option) {
      emits("transfer", level, option);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$d, [
        __props.option.children ? (openBlock(), createBlock(treeChildVue, {
          key: 0,
          level: __props.level + 1,
          option: __props.option,
          path: __props.path,
          onExpand: expandHandle,
          onChoose: chooseHandle,
          onTransfer: transferHandle
        }, null, 8, ["level", "option", "path"])) : (openBlock(), createElementBlock("p", {
          key: 1,
          onClick: clickHandle,
          class: normalizeClass(__props.option.disabled && "m-tree-child-disabled")
        }, [
          createBaseVNode("span", {
            class: normalizeClass(["m-tree-child-rect", unref(selectMap).get(__props.option) && "m-tree-child-select"])
          }, null, 2),
          createBaseVNode("span", null, toDisplayString(__props.option[unref(labelName)]), 1)
        ], 2))
      ]);
    };
  }
});
var treeItemVue = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-6b50f94c"]]);
var treeChild_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$c = { class: "m-tree-child" };
const _hoisted_2$8 = { class: "m-tree-child-label" };
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    level: null,
    path: null
  },
  emits: ["expand", "choose", "transfer"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const labelName = useInject(void 0, "labelName", "label");
    useInject(void 0, "valueName", "value");
    const hasMap = useInject(void 0, "hasMap", /* @__PURE__ */ new WeakMap());
    const selectMap = useInject(void 0, "selectMap", /* @__PURE__ */ new WeakMap());
    function clickHandle() {
      var _a2;
      if (!props.option.disabled) {
        emits("expand", props.level, props.option, !((_a2 = props.path.get(props.option)) != null ? _a2 : false));
      }
    }
    function expandHandle(level, option, signal) {
      emits("expand", level, option, signal);
    }
    function chooseHandle(level = props.level, option = props.option) {
      if (!props.option.disabled) {
        emits("choose", level, option);
      }
    }
    function transferHandle(level, option) {
      emits("transfer", level, option);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        createBaseVNode("div", {
          class: normalizeClass(["m-tree-child-content", [
            __props.path.get(__props.option) && "m-tree-child-content-hover",
            __props.option.disabled && "m-tree-child-disabled"
          ]]),
          onClick: clickHandle
        }, [
          createBaseVNode("span", {
            class: normalizeClass(["m-tree-child-rect", [
              unref(hasMap).get(__props.option) && "m-tree-child-has",
              unref(selectMap).get(__props.option) && "m-tree-child-select"
            ]]),
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => chooseHandle(), ["stop"]))
          }, null, 2),
          createBaseVNode("span", {
            class: normalizeClass(["m-tree-child-signal", __props.path.get(__props.option) && "m-tree-child-active"])
          }, null, 2),
          createBaseVNode("p", _hoisted_2$8, toDisplayString(__props.option[unref(labelName)]), 1)
        ], 2),
        createBaseVNode("ul", {
          class: normalizeClass(["m-tree-child-list", __props.path.get(__props.option) && "m-tree-child-show"])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.option.children, (item) => {
            return openBlock(), createElementBlock("li", null, [
              createVNode(treeItemVue, {
                path: __props.path,
                option: item,
                level: __props.level + 1,
                onExpand: expandHandle,
                onChoose: chooseHandle,
                onTransfer: transferHandle
              }, null, 8, ["path", "option", "level"])
            ]);
          }), 256))
        ], 2)
      ]);
    };
  }
});
var treeChildVue = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-545485a0"]]);
var tree_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$b = ["onMousedown"];
const _hoisted_2$7 = { class: "m-tree-label" };
const _hoisted_3$4 = { class: "m-tree-label-list" };
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  props: {
    options: null,
    labelName: { default: "label" },
    valueName: { default: "value" },
    separatist: { default: "/" },
    labelRule: { default: "all" },
    modelValue: null,
    filter: { type: Function, default: (str) => str }
  },
  emits: ["change", "update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    provide("labelName", props.labelName);
    provide("valueName", props.valueName);
    const listRef = ref();
    const inputRef = ref();
    const markInfo = reactive({
      path: /* @__PURE__ */ new WeakMap(),
      levels: /* @__PURE__ */ new Map()
    });
    const selectInfo = reactive({
      path: /* @__PURE__ */ new WeakMap(),
      selectAll: /* @__PURE__ */ new WeakMap(),
      levels: /* @__PURE__ */ new Map()
    });
    const showLabel = reactive({
      labels: /* @__PURE__ */ new Map(),
      values: new Array(),
      labelToValue: /* @__PURE__ */ new Map()
    });
    provide("hasMap", selectInfo.path);
    provide("selectMap", selectInfo.selectAll);
    let scroll;
    watch(showLabel.values, (newValue) => {
      emits("change", newValue);
      emits("update:modelValue", newValue);
    });
    preProcessing(props.options, props.modelValue);
    function preProcessing(options, modelValues) {
      modelValues.forEach((value) => {
        const values = value.split(props.separatist);
        const option = processOption(options, values);
        const labels = [];
        option.forEach((item) => {
          labels.unshift(item[props.labelName]);
        });
        const label = labels.join(props.separatist);
        showLabel.labels.set(label, option[0]);
        showLabel.labelToValue.set(label, value);
        showLabel.values.push(value);
        processSelect(option);
      });
    }
    function downHandle() {
      var _a2;
      (_a2 = inputRef.value) == null ? void 0 : _a2.focus();
      setTimeout(() => {
        scroll.refresh();
      }, 500);
    }
    function expandHandle(level, option, signal) {
      if (markInfo.levels.has(level)) {
        for (const l of markInfo.levels) {
          if (level <= l[0]) {
            markInfo.path.delete(l[1]);
          }
        }
      }
      markInfo.levels.set(level, option);
      markInfo.path.set(option, signal);
      setTimeout(() => {
        scroll.refresh();
      }, 200);
    }
    function chooseHandle(level, option) {
      processWeakMap(selectInfo.selectAll, option, level);
      if (selectInfo.path.get(option)) {
        selectInfo.path.set(option, false);
      }
    }
    function transferHandle(level, option) {
      processWeakMap(selectInfo.path, option, level);
    }
    function processWeakMap(map, option, level) {
      if (map.get(option)) {
        map.set(option, false);
        processChild(selectInfo.selectAll, option, false, level);
      } else {
        map.set(option, true);
        processChild(selectInfo.selectAll, option, true, level);
      }
      processSelectParent(level - 1);
      processHasParent(level - 1);
    }
    function processChild(map, option, signal, level, values = [], labels = []) {
      if (!markInfo.levels.has(level)) {
        values.push(option[props.valueName]);
        labels.push(option[props.labelName]);
      }
      if (Array.isArray(option.children) && option.children.length !== 0) {
        for (let o of option.children) {
          if (!o.disabled) {
            const curValues = [...values];
            const curLabels = [...labels];
            map.set(o, signal);
            curValues.push(o[props.valueName]);
            curLabels.push(o[props.labelName]);
            if (o.children) {
              processChild(map, o, signal, level, curValues, curLabels);
            } else {
              processLabelValue(level, curValues, curLabels, o, signal);
            }
          }
        }
      } else {
        if (markInfo.levels.has(level)) {
          values.push(option[props.valueName]);
          labels.push(option[props.labelName]);
        }
        debugger;
        processLabelValue(level - 1, values, labels, option, signal);
      }
    }
    function processLabelValue(level, values, labels, o, signal) {
      if (signal) {
        const label = processAddLabel(level, labels);
        const value = processAddLabel(level, values, props.valueName);
        showLabel.values.push(value);
        showLabel.labels.set(label, o);
        showLabel.labelToValue.set(label, value);
      } else {
        const label = processAddLabel(level, labels);
        const value = processDelLabel(level, values, props.valueName);
        arrayToSplice(showLabel.values, value);
        showLabel.labels.delete(label);
        showLabel.labelToValue.delete(label);
      }
    }
    function processSelectParent(level) {
      while (level >= 0) {
        const option = markInfo.levels.get(level);
        if (option) {
          let i = 0;
          for (const o of option.children) {
            if (!o.disabled && !selectInfo.selectAll.get(o)) {
              break;
            }
            i++;
          }
          if (i === option.children.length) {
            selectInfo.selectAll.set(option, true);
          } else {
            selectInfo.selectAll.set(option, false);
          }
        }
        level--;
      }
    }
    function processHasParent(level) {
      while (level >= 0) {
        const option = markInfo.levels.get(level);
        if (option) {
          let i = 0;
          for (const o of option.children) {
            if (selectInfo.path.get(o) || selectInfo.selectAll.get(o)) {
              i++;
              continue;
            }
          }
          if (i === 0) {
            selectInfo.path.set(option, false);
          } else {
            selectInfo.path.set(option, true);
          }
        }
        level--;
      }
    }
    function processLable(level, curOption, key = props.labelName) {
      const labels = new Array();
      labels.unshift(...curOption);
      while (level >= 0) {
        const option = markInfo.levels.get(level);
        level -= 1;
        if (!option) {
          continue;
        }
        labels.unshift(option[key]);
      }
      return labels.join(props.separatist);
    }
    function processAddLabel(level, curOption, key = props.labelName) {
      return processLable(level, curOption, key);
    }
    function processDelLabel(level, curOption, key = props.labelName) {
      return processLable(level, curOption, key);
    }
    function closeHandle(item) {
      const value = showLabel.labelToValue.get(item);
      showLabel.labels.delete(item);
      arrayToSplice(showLabel.values, value);
      const values = value == null ? void 0 : value.split(props.separatist);
      const options = processOption(props.options, values != null ? values : []);
      processSelectAll(options);
    }
    function arrayToSplice(target, value) {
      target.splice(target.indexOf(value), 1);
    }
    function processOption(options, values) {
      const results = [];
      values.forEach((value) => {
        const option = options.find((option2) => option2[props.valueName] === value);
        results.unshift(option);
        options = option.children;
      });
      return results;
    }
    function processSelectAll(options) {
      let superior = false;
      debugger;
      options.forEach((option) => {
        selectInfo.selectAll.set(option, false);
        if (option.children) {
          if (superior) {
            selectInfo.path.set(option, true);
          } else {
            let len = option.children.length;
            for (let i = 0; i < len; i++) {
              const item = option.children[i];
              if (i === len - 1 && !selectInfo.path.get(item) && !selectInfo.selectAll.get(item)) {
                selectInfo.path.set(option, false);
              } else {
                if (selectInfo.path.get(item) || selectInfo.selectAll.get(item)) {
                  selectInfo.path.set(option, true);
                  superior = true;
                  break;
                }
              }
            }
          }
        }
      });
    }
    function processSelect(options) {
      options.forEach((option) => {
        if (option.children) {
          selectInfo.path.set(option, true);
          const len = option.children.length;
          for (let i = 0; i < len; i++) {
            const item = option.children[i];
            if (len === i + 1 && selectInfo.selectAll.get(item)) {
              selectInfo.selectAll.set(option, true);
            } else {
              break;
            }
          }
        } else {
          selectInfo.selectAll.set(option, true);
        }
      });
    }
    function processLabelRule(type, str) {
      const strs = str.split(props.separatist).map((item) => props.filter(item));
      switch (type) {
        case "all":
          return strs.join(props.separatist);
        case "child":
          return strs[strs.length - 1];
        case "parent":
          return strs.slice(-2).join(props.separatist);
      }
    }
    onMounted(() => {
      scroll = useScroll$1(listRef.value, {
        bounce: false,
        scrollX: true,
        scrollY: true
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: "m-tree",
        onMousedown: withModifiers(downHandle, ["prevent"])
      }, [
        createBaseVNode("input", {
          type: "text",
          ref_key: "inputRef",
          ref: inputRef
        }, null, 512),
        createBaseVNode("div", _hoisted_2$7, [
          createBaseVNode("ul", _hoisted_3$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(showLabel).labels.keys(), (item) => {
              return openBlock(), createElementBlock("li", null, [
                createVNode(mTag$1, {
                  closabled: "",
                  onClose: ($event) => closeHandle(item)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(processLabelRule(__props.labelRule, item)), 1)
                  ]),
                  _: 2
                }, 1032, ["onClose"])
              ]);
            }), 256))
          ])
        ]),
        createBaseVNode("div", {
          class: "m-tree-list",
          ref_key: "listRef",
          ref: listRef
        }, [
          createBaseVNode("ul", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (item) => {
              return openBlock(), createElementBlock("li", {
                key: item[__props.valueName]
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(item.children ? treeChildVue : treeItemVue), {
                  option: item,
                  level: 0,
                  path: unref(markInfo).path,
                  onExpand: expandHandle,
                  onChoose: chooseHandle,
                  onTransfer: transferHandle
                }, null, 8, ["option", "path"]))
              ]);
            }), 128))
          ])
        ], 512)
      ], 40, _hoisted_1$b);
    };
  }
});
var Tree = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-89d2dc96"]]);
const mTree = withInstall(Tree, "mTree");
function processProvides$1(infos) {
  for (const iterator of infos) {
    provide(iterator[0], iterator[1]);
  }
}
var carousel_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$a = ["onClick"];
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  props: {
    defaultIndex: { default: 0 },
    mode: { default: "vertical" },
    duration: { default: 1e3 },
    dotPlacement: { default: "bottom" },
    dotStyle: { default: "round" },
    dotColor: { default: "#fff" },
    dotBgColor: { default: "rgba(255, 255, 255, 0.3)" },
    autoplay: { type: Boolean, default: false },
    delay: { default: 4e3 },
    customDotPosition: null,
    showDot: { type: Boolean, default: true },
    showArrow: { type: Boolean, default: false },
    arrowColor: { default: "#fff" },
    arrowBgColor: { default: "rgba(255, 255, 255, 0.3)" },
    attachment: { type: Boolean, default: false },
    mosueWheel: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const carouselRef = ref();
    const currentIndex = ref(props.defaultIndex);
    const direction = ref("from");
    let isChange = true;
    const mouseInfo = {
      x: 0,
      y: 0,
      has: false
    };
    const len = ref(0);
    const provideInfo = [
      ["currentIndex", currentIndex],
      ["direction", direction],
      ["duration", props.duration],
      ["mode", props.mode],
      ["attachment", props.attachment],
      ["itemClickHandle", dotClickHandle]
    ];
    processProvides$1(provideInfo);
    function dotClickHandle(index2) {
      if (index2 > currentIndex.value) {
        processClickHandle("right", "from", index2);
      } else {
        processClickHandle("left", "to", index2);
      }
    }
    function leftClickHandle() {
      processClickHandle("left", "to");
    }
    function rightClickHandle() {
      processClickHandle("right", "from");
    }
    function processClickHandle(button, directive, index2) {
      if (isChange) {
        isChange = false;
        direction.value = directive;
        changeIndex(button, index2);
        setTimeout(() => {
          isChange = true;
        }, props.duration);
      }
    }
    function wheelHandle(event) {
      if (props.mosueWheel) {
        event.preventDefault();
        if (event.wheelDelta > 0) {
          leftClickHandle();
        } else {
          rightClickHandle();
        }
      }
    }
    function changeIndex(opacity = "right", index2) {
      if (typeof index2 === "number") {
        currentIndex.value = index2;
      } else {
        if (opacity === "right") {
          currentIndex.value++;
          if (currentIndex.value === len.value) {
            currentIndex.value = 0;
          }
        } else {
          currentIndex.value--;
          if (currentIndex.value === -1) {
            currentIndex.value = len.value - 1;
          }
        }
      }
    }
    function startInterval() {
      let timer2;
      if (props.autoplay) {
        timer2 = setInterval(() => {
          processClickHandle("right", "from");
        }, props.delay);
      }
      return timer2;
    }
    function downHandle(event) {
      mouseInfo.has = true;
      mouseInfo.x = event.offsetX;
      mouseInfo.y = event.offsetY;
    }
    function upHandle(event) {
      if (mouseInfo.has) {
        mouseInfo.has = false;
        const curX = event.offsetX;
        const curY = event.offsetY;
        if (props.mode === "horization" && Math.abs(curY - mouseInfo.y) >= 50) {
          if (curY > mouseInfo.y) {
            processClickHandle("left", "to");
          } else {
            processClickHandle("right", "from");
          }
        } else if (props.mode === "vertical" && Math.abs(curX - mouseInfo.x) >= 50) {
          if (curX > mouseInfo.x) {
            processClickHandle("left", "to");
          } else {
            processClickHandle("right", "from");
          }
        }
      }
    }
    onMounted(() => {
      var _a2, _b2;
      len.value = (_b2 = (_a2 = carouselRef.value) == null ? void 0 : _a2.children.length) != null ? _b2 : 0;
      startInterval();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-carousel",
        onWheel: wheelHandle,
        style: normalizeStyle([
          {
            ["--carousel-dot-color"]: __props.dotColor
          },
          {
            ["--carousel-dot-bg-color"]: __props.dotBgColor
          },
          {
            ["--carousel-arrow-color"]: __props.arrowColor
          },
          {
            ["--carousel-arrow-bg-color"]: __props.arrowBgColor
          }
        ])
      }, [
        createBaseVNode("main", {
          class: normalizeClass(["m-carousel-main", [__props.mode === "slider" && "m-carousel-slide"]]),
          ref_key: "carouselRef",
          ref: carouselRef,
          onMousedown: downHandle,
          onMouseup: upHandle
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 34),
        __props.showDot ? (openBlock(), createElementBlock("ul", {
          key: 0,
          class: normalizeClass(["m-carousel-dot", ["m-carousel-dot-" + __props.dotPlacement, "m-carousel-dot-" + __props.dotStyle]]),
          style: normalizeStyle([
            {
              left: __props.customDotPosition && unref(cssUnitConversion)(__props.customDotPosition[0])
            },
            { top: __props.customDotPosition && unref(cssUnitConversion)(__props.customDotPosition[1]) }
          ])
        }, [
          renderSlot(_ctx.$slots, "dot", {}, () => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(len.value, (item) => {
              return openBlock(), createElementBlock("li", {
                key: item,
                onClick: ($event) => dotClickHandle(item - 1),
                class: normalizeClass([currentIndex.value + 1 == item && "m-carousel-li-active"])
              }, null, 10, _hoisted_1$a);
            }), 128))
          ], true)
        ], 6)) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "operateLeft", { execHandle: leftClickHandle }, () => [
          __props.showArrow ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["m-carousel-operate m-carousel-operate-left", __props.mode === "horization" && "m-carousel-operate-rotate"]),
            onClick: leftClickHandle
          }, [
            createVNode(mIcon$1, { name: "m-toLeft" })
          ], 2)) : createCommentVNode("", true)
        ], true),
        renderSlot(_ctx.$slots, "operateRight", { execHandle: rightClickHandle }, () => [
          __props.showArrow ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["m-carousel-operate m-carousel-operate-right", __props.mode === "horization" && "m-carousel-operate-rotate"]),
            onClick: rightClickHandle
          }, [
            createVNode(mIcon$1, { name: "m-toRight" })
          ], 2)) : createCommentVNode("", true)
        ], true)
      ], 36);
    };
  }
});
var Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-71da02a2"]]);
var carouselItem_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  props: {
    order: null
  },
  setup(__props) {
    const props = __props;
    const animationMap = {
      vertical: "vertical",
      horization: "horization",
      attachment: "attachment",
      scale: "scale"
    };
    const carouselItemRef = ref();
    const key = ref();
    const currentIndex = useInject(void 0, "currentIndex", 0);
    const direction = useInject(void 0, "direction", "to");
    const mode = useInject(void 0, "mode", "horization");
    const duration = useInject(void 0, "duration", 1e3);
    const attachment = useInject(void 0, "attachment", false);
    const itemClickHandle = useInject(void 0, "itemClickHandle", (index2) => {
    });
    function clickHandle() {
      var _a2;
      itemClickHandle((_a2 = key.value) != null ? _a2 : 0);
    }
    onMounted(() => {
      var _a2, _b2, _c2;
      const parent = (_a2 = carouselItemRef.value) == null ? void 0 : _a2.parentElement;
      const children = (_b2 = parent == null ? void 0 : parent.children) != null ? _b2 : [];
      const len = children.length;
      for (let i = 0; i < len; i++) {
        const element = children[i];
        if (element === carouselItemRef.value) {
          key.value = (_c2 = props.order) != null ? _c2 : i;
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition$1, {
        name: animationMap[unref(mode)] + unref(direction) + (unref(attachment) && (unref(mode) === "vertical" || unref(mode) === "horization") ? "attachment" : ""),
        mode: "out-in",
        appear: ""
      }, {
        default: withCtx(() => [
          unref(mode) === "slider" || key.value === void 0 || key.value === unref(currentIndex) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["carouselItem", [
              unref(mode) === "slider" && "carousel-item-slider",
              unref(mode) === "slider" && key.value === unref(currentIndex) && "carousel-item-active"
            ]]),
            ref_key: "carouselItemRef",
            ref: carouselItemRef,
            style: normalizeStyle({ ["--carousel-duration"]: unref(duration) + "ms" }),
            onClick: clickHandle
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 6)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name"]);
    };
  }
});
var CarouselItem = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-1931271a"]]);
const mCarousel = withInstall(Carousel, "mCarousel");
const mCarouselItem = withInstall(CarouselItem, "mCarouselItem");
function processProvides(infos) {
  for (const iterator of infos) {
    provide(iterator[0], iterator[1]);
  }
}
var menuTitle_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$9 = { class: "m-menu-title" };
const _hoisted_2$6 = { key: 2 };
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  props: {
    title: null,
    icon: null
  },
  setup(__props) {
    const collapse = useInject(void 0, "collapse", ref(false));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        unref(collapse) ? (openBlock(), createBlock(tooltipVue, {
          key: 0,
          "tooltip-text": __props.title,
          effect: "dark",
          class: "m-menu-title-tooltip"
        }, {
          default: withCtx(() => [
            __props.icon ? (openBlock(), createBlock(mIcon$1, {
              key: 0,
              name: __props.icon,
              class: "m-menu-title-icon"
            }, null, 8, ["name"])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["tooltip-text"])) : createCommentVNode("", true),
        __props.icon && !unref(collapse) ? (openBlock(), createBlock(mIcon$1, {
          key: 1,
          name: __props.icon,
          class: "m-menu-title-icon"
        }, null, 8, ["name"])) : createCommentVNode("", true),
        !unref(collapse) ? (openBlock(), createElementBlock("span", _hoisted_2$6, toDisplayString(__props.title), 1)) : createCommentVNode("", true)
      ]);
    };
  }
});
var menuTitleVue = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-60890604"]]);
var menuItem_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  props: {
    options: null,
    level: null
  },
  emits: ["checkValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const lableName = useInject(void 0, "labelName", "label");
    const valueName = useInject(void 0, "valueName", "value");
    const iconName = useInject(void 0, "iconName", "icon");
    const itemHeight = useInject(void 0, "itemHeight", 40);
    const showValue = useInject(void 0, "showValue", []);
    const navigator2 = useInject(void 0, "navigator", (path) => {
    });
    const menuItemRef = ref();
    function clickHandle() {
      if (props.options.disabled) {
        return;
      }
      if (props.options.path) {
        navigator2(props.options.path);
      }
      emits("checkValue", [props.options[valueName]], props.level);
    }
    onMounted(() => {
      if (menuItemRef.value) {
        menuItemRef.value.dataset.height = String(itemHeight);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-menu-item", unref(showValue)[__props.level - 1] === __props.options[unref(valueName)] && "m-menu-item-active"]),
        ref_key: "menuItemRef",
        ref: menuItemRef,
        onClick: clickHandle
      }, [
        __props.options[unref(iconName)] ? (openBlock(), createBlock(mIcon$1, {
          key: 0,
          name: __props.options[unref(iconName)],
          class: "m-menu-item-icon"
        }, null, 8, ["name"])) : createCommentVNode("", true),
        createBaseVNode("span", null, toDisplayString(__props.options[unref(lableName)]), 1)
      ], 2);
    };
  }
});
var MenuItem = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-95a2ea0c"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  props: {
    options: null,
    level: null
  },
  emits: ["checkValue"],
  setup(__props, { emit: emits }) {
    useInject(void 0, "labelName", "label");
    useInject(void 0, "valueName", "value");
    function checkValueHandle(values, level) {
      emits("checkValue", values, level);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(menuContentVue, {
        options: __props.options,
        level: __props.level,
        ref: "menuContentRef",
        onCheckValue: checkValueHandle
      }, null, 8, ["options", "level"]);
    };
  }
});
var menuContent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$8 = { style: { "width": "100%" } };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  props: {
    options: null,
    level: null
  },
  emits: ["checkValue"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const labelName = useInject(void 0, "labelName", "label");
    const valueName = useInject(void 0, "valueName", "value");
    const iconName = useInject(void 0, "iconName", "icon");
    const itemHeight = useInject(void 0, "itemHeight", 40);
    const showValue = useInject(void 0, "showValue", []);
    const accordion = useInject(void 0, "accordion", ref(false));
    const navigator2 = useInject(void 0, "navigator", (path) => {
    });
    const collapse = useInject(void 0, "collapse", ref(false));
    const expand = ref(false);
    const allHeight = ref(0);
    const contentRef = ref();
    const menuContentRef = ref();
    let transfer = false;
    function clickHandle() {
      expand.value = !expand.value;
    }
    watch(accordion, () => {
      if (transfer) {
        transfer = false;
      } else {
        expand.value = false;
      }
    });
    function checkValueHandle(values, level) {
      values.unshift(props.options[valueName]);
      transfer = true;
      emits("checkValue", values, props.level);
    }
    function selectHandle(option, path) {
      if (option.path) {
        navigator2(option.path);
      }
      checkValueHandle(path, props.level);
    }
    expose({
      allHeight
    });
    onMounted(() => {
      var _a2;
      if (contentRef.value) {
        let maxHeight = itemHeight;
        const len = contentRef.value.children.length;
        for (let i = 0; i < len; i++) {
          const element = contentRef.value.children[i];
          maxHeight += +((_a2 = element == null ? void 0 : element.dataset.height) != null ? _a2 : 0);
        }
        allHeight.value = maxHeight;
        if (menuContentRef.value) {
          menuContentRef.value.dataset.height = String(maxHeight);
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-menu-content", [
          expand.value && "m-menu-content-expand",
          __props.level === 1 && unref(collapse) && "m-menu-content-collapse"
        ]]),
        ref_key: "menuContentRef",
        ref: menuContentRef,
        style: normalizeStyle([{ ["--menu-content-height"]: allHeight.value + "px" }])
      }, [
        withDirectives(createBaseVNode("div", _hoisted_1$8, [
          createVNode(mDropdown$1, {
            options: __props.options.children,
            "label-name": unref(labelName),
            "value-name": unref(valueName),
            "icon-name": unref(iconName),
            direction: "right",
            style: { "width": "100%" },
            "default-value": unref(showValue),
            onSelect: selectHandle
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                class: normalizeClass([
                  "m-menu-content-title m-menu-content-title-collapse",
                  unref(showValue)[0] === __props.options[unref(valueName)] && "m-menu-content-title-active"
                ])
              }, [
                __props.options[unref(iconName)] ? (openBlock(), createBlock(mIcon$1, {
                  key: 0,
                  name: __props.options[unref(iconName)],
                  class: "m-menu-content-title-icon"
                }, null, 8, ["name"])) : createCommentVNode("", true)
              ], 2)
            ]),
            _: 1
          }, 8, ["options", "label-name", "value-name", "icon-name", "default-value"])
        ], 512), [
          [vShow, __props.level === 1 && unref(collapse)]
        ]),
        withDirectives(createBaseVNode("div", null, [
          createBaseVNode("div", {
            class: normalizeClass([
              "m-menu-content-title",
              unref(showValue)[__props.level - 1] === __props.options[unref(valueName)] && "m-menu-content-title-active"
            ]),
            onClick: clickHandle
          }, [
            __props.options[unref(iconName)] ? (openBlock(), createBlock(mIcon$1, {
              key: 0,
              name: __props.options[unref(iconName)],
              class: "m-menu-content-title-icon"
            }, null, 8, ["name"])) : createCommentVNode("", true),
            createBaseVNode("span", null, toDisplayString(__props.options[unref(labelName)]), 1),
            createVNode(mIcon$1, {
              class: normalizeClass(["m-menu-content-icon", expand.value && "m-menu-content-icon-expand"]),
              name: "m-right"
            }, null, 8, ["class"])
          ], 2),
          createBaseVNode("ul", {
            ref_key: "contentRef",
            ref: contentRef
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options.children, (item) => {
              return openBlock(), createBlock(resolveDynamicComponent(item.children ? _sfc_main$a : MenuItem), {
                key: item[unref(valueName)],
                level: __props.level + 1,
                options: item,
                onCheckValue: checkValueHandle
              }, null, 8, ["level", "options"]);
            }), 128))
          ], 512)
        ], 512), [
          [vShow, !(__props.level === 1 && unref(collapse))]
        ])
      ], 6);
    };
  }
});
var menuContentVue = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-6208a8fc"]]);
/*!
  * vue-router v4.0.13
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const PolySymbol = (name) => hasSymbol ? Symbol(name) : "_vr_" + name;
const routerKey = /* @__PURE__ */ PolySymbol("r");
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function useRouter() {
  return inject(routerKey);
}
var menu_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  props: {
    capture: null,
    icon: null,
    options: null,
    labelName: { default: "label" },
    valueName: { default: "value" },
    iconName: { default: "icon" },
    itemHeight: { default: 40 },
    showValue: null,
    iconColor: { default: "#666" },
    iconSize: { default: 20 },
    color: { default: "#000" },
    itemColor: { default: "#666" },
    isCollapse: { type: Boolean, default: false },
    collapse: { type: Boolean, default: false },
    navigator: null
  },
  setup(__props) {
    var _a2, _b2;
    const props = __props;
    const router = useRouter();
    const showValue = ref((_a2 = props.showValue) != null ? _a2 : []);
    const collapse = ref(false);
    const accordion = ref(false);
    const provideValue = [
      ["labelName", props.labelName],
      ["valueName", props.valueName],
      ["iconName", props.iconName],
      ["itemHeight", props.itemHeight],
      ["showValue", showValue],
      ["navigator", (_b2 = props.navigator) != null ? _b2 : navigatorHandle],
      ["collapse", collapse],
      ["accordion", accordion]
    ];
    processProvides(provideValue);
    function setAccordion() {
      accordion.value = !unref(accordion);
    }
    function clickHandle() {
      if (props.isCollapse) {
        collapse.value = !unref(collapse);
      }
    }
    if (props.isCollapse) {
      watch(() => props.collapse, (newValue) => {
        collapse.value = newValue;
      });
    }
    function checkValueHandle(values, level) {
      if (level === 1) {
        showValue.value = values;
        setAccordion();
      }
    }
    function navigatorHandle(path) {
      router.push(path);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-menu", collapse.value && "m-menu-collapse"]),
        style: normalizeStyle([
          { ["--menu-item-height"]: __props.itemHeight + "px" },
          { ["--menu-icon-color"]: __props.iconColor },
          { ["--menu-icon-size"]: unref(processUnit)(__props.iconSize) },
          { ["--menu-item-color"]: __props.itemColor },
          {
            color: __props.color
          }
        ])
      }, [
        renderSlot(_ctx.$slots, "title", {}, () => [
          createVNode(menuTitleVue, {
            title: __props.capture,
            icon: __props.icon,
            onClick: clickHandle
          }, null, 8, ["title", "icon"])
        ], true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (item) => {
          return openBlock(), createElementBlock("ul", {
            key: item[__props.valueName]
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(item.children ? menuContentVue : MenuItem), {
              onCheckValue: checkValueHandle,
              options: item,
              level: 1
            }, null, 8, ["options"]))
          ]);
        }), 128))
      ], 6);
    };
  }
});
var Menu = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-3d0752cc"]]);
const mMenu = withInstall(Menu, "mMenu");
const mMenuItem = withInstall(MenuItem, "mMenuItem");
var alert_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-7663ec6e"), n = n(), popScopeId(), n);
const _hoisted_1$7 = { class: "m-alert-icon" };
const _hoisted_2$5 = { class: "m-alert-title" };
const _hoisted_3$3 = { class: "m-alert-body" };
const _hoisted_4$1 = { key: 1 };
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", null, "\u5C55\u5F00", -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "m-alert-footet" }, null, -1));
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  props: {
    extend: { type: Boolean, default: false },
    type: { default: "default" },
    color: null,
    background: null,
    close: { type: Boolean, default: false }
  },
  emits: ["close"],
  setup(__props, { emit: emits }) {
    var _a2, _b2;
    const props = __props;
    const iconMap = {
      info: "m-info-empty",
      default: "m-info-empty",
      primary: "m-info-empty",
      warning: "m-warning-empty",
      success: "m-success-empty",
      error: "m-error-empty"
    };
    const color = (_a2 = props.color) != null ? _a2 : LightTheme[props.type];
    const bgColor = (_b2 = props.background) != null ? _b2 : getLightColor(color, 0.8);
    const titleColor = getDarkColor(color);
    const visibleBody = ref(!props.extend);
    function clickHandle() {
      if (props.extend) {
        visibleBody.value = !unref(visibleBody);
      }
    }
    function closeHandle() {
      emits("close");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "m-alert",
        style: normalizeStyle([
          { ["--m-alert-background"]: unref(bgColor) },
          { ["--m-alert-color"]: unref(color) },
          { ["--m-alert-title-color"]: unref(titleColor) }
        ])
      }, [
        createBaseVNode("div", _hoisted_1$7, [
          createVNode(mIcon$1, {
            name: iconMap[__props.type]
          }, null, 8, ["name"])
        ]),
        __props.close ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "m-alert-close",
          onClick: closeHandle
        }, [
          createVNode(mIcon$1, { name: "m-cha" })
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2$5, [
          renderSlot(_ctx.$slots, "title", {}, void 0, true)
        ]),
        createBaseVNode("div", _hoisted_3$3, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        visibleBody.value ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
          renderSlot(_ctx.$slots, "extend", {}, void 0, true)
        ])) : createCommentVNode("", true),
        __props.extend ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: "m-alert-extend",
          onClick: clickHandle
        }, [
          _hoisted_5,
          createBaseVNode("span", {
            class: normalizeClass(["m-alert-signal-extend", visibleBody.value && "m-alert-signal-extend-active"])
          }, null, 2)
        ])) : createCommentVNode("", true),
        _hoisted_6
      ], 4);
    };
  }
});
var Alert = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-7663ec6e"]]);
const mAlert = withInstall(Alert, "mAlert");
var list_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$6 = { class: "m-list" };
const _hoisted_2$4 = { style: { "color": "rgba(0, 0, 0, 0.4)" } };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  props: {
    type: { default: "public" }
  },
  setup(__props) {
    const props = __props;
    provide("listType", props.type);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("p", _hoisted_2$4, [
          renderSlot(_ctx.$slots, "title", {}, void 0, true)
        ]),
        createBaseVNode("ul", {
          class: "m-list-ul",
          style: normalizeStyle([
            !(__props.type === "divider" || __props.type === "public" || __props.type === "stripe") && {
              listStyle: __props.type
            }
          ])
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 4)
      ]);
    };
  }
});
var List = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-dbcb0a5c"]]);
var listItem_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$5 = { class: "m-list-item-p" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const type = useInject(void 0, "listType", "driver");
    ref();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", {
        class: normalizeClass(["m-list-item", [
          unref(type) === "stripe" && "m-list-item-stripe",
          unref(type) === "divider" && "m-list-item-divider"
        ]])
      }, [
        createBaseVNode("p", _hoisted_1$5, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        unref(type) === "divider" ? (openBlock(), createBlock(mDivider$1, {
          key: 0,
          class: "m-list-item-divider-cpn",
          shape: "solid"
        })) : createCommentVNode("", true)
      ], 2);
    };
  }
});
var ListItem = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-158412d0"]]);
const mList = withInstall(List, "mList");
const mListItem = withInstall(ListItem, "mListItem");
var watermark_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$4 = { class: "m-watermark" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  props: {
    fontSize: { default: 18 },
    color: { default: "rgba(184, 184, 184, 0.6)" },
    content: { default: "\u5546\u4E1A\u673A\u5BC6" },
    textAlign: { default: "center" },
    textBaseline: { default: "middle" },
    fontFamily: { default: "Microsoft Yahei" },
    rotate: { default: 45 },
    img: null,
    textInterval: { default: 1.5 },
    imgWidth: null,
    imgHeight: null,
    visible: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const watermarkRef = ref();
    const watermarkTestRef = ref();
    function __canvasWM(width, {
      textAlign = props.textAlign,
      textBaseline = props.textBaseline,
      font = `${props.fontSize}px ${props.fontFamily}`,
      fillStyle = props.color,
      content = props.content,
      rotate = props.rotate,
      img = null
    } = {}) {
      const canvas = document.createElement("canvas");
      canvas.setAttribute("width", String(width));
      canvas.setAttribute("height", String(width));
      canvas.style.transform = `rotate(30deg);`;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.translate(width / 2, width / 2);
      ctx.textAlign = textAlign;
      ctx.textBaseline = textBaseline;
      ctx.font = font;
      ctx.fillStyle = fillStyle;
      ctx.rotate(Math.PI / 180 * rotate);
      ctx.fillText(content, 0, 0);
      const base64Url = canvas.toDataURL();
      watch(() => props.visible, (newValue) => {
        if (watermarkRef.value) {
          if (!newValue) {
            watermarkRef.value.style.backgroundImage = ``;
            return;
          }
          watermarkRef.value.style.backgroundImage = `url(${base64Url})`;
        }
      }, {
        immediate: true
      });
    }
    onMounted(() => {
      if (watermarkTestRef.value) {
        const { img, imgWidth, textInterval } = props;
        const width = parseInt(getComputedStyle(watermarkTestRef.value).width) * textInterval;
        if (img) {
          __canvasWM(imgWidth != null ? imgWidth : img.width + width, { img });
          return;
        }
        __canvasWM(width);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createBaseVNode("div", {
          class: "m-watermark-canvas",
          ref_key: "watermarkRef",
          ref: watermarkRef
        }, null, 512),
        createBaseVNode("div", {
          class: "m-watermark-test",
          ref_key: "watermarkTestRef",
          ref: watermarkTestRef
        }, toDisplayString(__props.content), 513),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
var Watermark = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-d5f0a02c"]]);
const mWatermark = withInstall(Watermark, "mWatermark");
var tab_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$3 = { class: "m-tab" };
const _hoisted_2$3 = ["onClick"];
const _hoisted_3$2 = { class: "m-tab-body" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  props: {
    type: { default: "line" },
    animated: { type: Boolean },
    barWidth: null,
    defaultValue: null,
    size: null,
    justifyContent: { default: "space-evenly" },
    closable: { type: Boolean },
    addTabName: { type: Function, default: () => {
    } }
  },
  setup(__props) {
    const props = __props;
    const tabNames = ref([]);
    const activeTabName = ref("");
    let bsScroll;
    const tabHeadRef = ref();
    const scrollTabShadow = reactive({
      left: false,
      right: false
    });
    provide("addTabName", addTabName);
    provide("delTabName", delTabName);
    provide("activeTabName", activeTabName);
    function addTabName(tabName, options) {
      props.addTabName(tabName);
      tabNames.value.push(__spreadValues({
        name: tabName
      }, options));
    }
    function delTabName(tabName) {
      tabNames.value.splice(tabName.indexOf(tabName), 1);
    }
    function clickHandle(option) {
      if (option.disabled)
        return;
      activeTabName.value = option.name;
    }
    function deleteItemHandle(index2) {
      tabNames.value.splice(index2, 1);
      nextTick(() => {
        bsScroll.refresh();
      });
    }
    onMounted(() => {
      var _a2;
      activeTabName.value = (_a2 = props.defaultValue) != null ? _a2 : tabNames.value[0].name;
      if (tabHeadRef.value) {
        const totalLength = parseFloat(getComputedStyle(tabHeadRef.value.children[0]).width);
        let startX = 0;
        const index2 = tabNames.value.findIndex((item) => item.name === props.defaultValue);
        if (index2 !== -1) {
          startX = totalLength / tabNames.value.length * index2 * -1;
        }
        bsScroll = useScroll$1(tabHeadRef.value, {
          startX,
          click: true,
          scrollX: true,
          scrollY: false,
          bounce: false,
          scrollbar: false,
          eventPassthrough: "vertical"
        });
        const scrollX = bsScroll.maxScrollX;
        if (scrollX) {
          bsScroll.on("scroll", ({ x }) => {
            scrollTabShadow.right = true;
            scrollTabShadow.left = true;
            if (x === 0) {
              scrollTabShadow.left = false;
            } else if (x <= scrollX) {
              scrollTabShadow.right = false;
            }
          });
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", {
          class: normalizeClass(["m-tab-head-scroll", [
            unref(scrollTabShadow).left && "m-tab-scroll-left",
            unref(scrollTabShadow).right && "m-tab-scroll-right"
          ]]),
          ref_key: "tabHeadRef",
          ref: tabHeadRef
        }, [
          createBaseVNode("ul", {
            class: normalizeClass(["m-tab-head", ["m-tab-head-" + __props.type]]),
            style: normalizeStyle({ justifyContent: __props.justifyContent })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(tabNames.value, (item, index2) => {
              return openBlock(), createElementBlock("li", {
                key: index2,
                class: normalizeClass([
                  activeTabName.value === item.name && "m-tab-head-li-active",
                  item.disabled && "m-tab-head-li-disabled"
                ]),
                onClick: ($event) => clickHandle(item)
              }, [
                createTextVNode(toDisplayString(item.name) + " ", 1),
                __props.type === "card" && (__props.closable ? __props.closable : item.closable) ? (openBlock(), createBlock(mIcon$1, {
                  key: 0,
                  class: "m-tab-head-icon",
                  onClick: withModifiers(($event) => deleteItemHandle(index2), ["stop"]),
                  name: "m-cha"
                }, null, 8, ["onClick"])) : createCommentVNode("", true)
              ], 10, _hoisted_2$3);
            }), 128))
          ], 6)
        ], 2),
        createBaseVNode("div", _hoisted_3$2, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ]);
    };
  }
});
var Tab = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-2c645d44"]]);
var tabPane_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$2 = { class: "m-tab-pane" };
const _hoisted_2$2 = { key: 0 };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  props: {
    name: null,
    disabled: { type: Boolean, default: false },
    closable: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const [addTabName, activeTabName] = useInjects(["addTabName", "activeTabName"], [(str, options) => {
    }, (str) => {
    }]);
    function useInjects(names, defaultValue) {
      const result = [];
      names.forEach((item, index2) => {
        result.push(useInject(void 0, item, defaultValue[index2]));
      });
      return result;
    }
    addTabName(props.name, {
      closable: props.closable,
      disabled: props.disabled
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(Transition$1, {
          name: "verticalto",
          mode: "out-in",
          appear: ""
        }, {
          default: withCtx(() => [
            unref(activeTabName) === __props.name ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ])) : createCommentVNode("", true)
          ]),
          _: 3
        })
      ]);
    };
  }
});
var TabPane = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-86a9c286"]]);
const mTab = withInstall(Tab, "mTab");
const mTabPane = withInstall(TabPane, "mTabPane");
var form_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$1 = { class: "m-form" };
const _hoisted_2$1 = { class: "m-form-header" };
const _hoisted_3$1 = { class: "m-form-footer" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  props: {
    direction: { default: "vertical" },
    placement: { default: "left" },
    labelWidth: { default: "auto" },
    labelAlign: null,
    modelValue: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { placement, labelWidth, labelAlign, modelValue } = props;
    let result = {};
    providesHandle(["placement", "labelWidth", "labelAlign", "formObject"], [placement, labelWidth, labelAlign, modelValue]);
    function resetHandle() {
      formMitt.emit("reset");
    }
    function submitHandle() {
      formMitt.emit("submit");
    }
    formMitt.on("commit", (formItem) => {
      result[formItem.name] = formItem.value;
      emits("update:modelValue", result);
      result = __spreadValues({}, result);
    });
    function providesHandle(names, values) {
      if (names.length !== values.length) {
        return;
      }
      for (let i = 0; i < names.length; i++) {
        provide(names[i], values[i]);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          renderSlot(_ctx.$slots, "header", {}, void 0, true)
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["m-form-body", "m-form-body-" + __props.direction])
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 2),
        createBaseVNode("div", _hoisted_3$1, [
          createBaseVNode("div", {
            class: "m-form-submit",
            onClick: submitHandle
          }, [
            renderSlot(_ctx.$slots, "submit", {}, void 0, true)
          ]),
          createBaseVNode("div", {
            class: "m-form-reset",
            onClick: resetHandle
          }, [
            renderSlot(_ctx.$slots, "reset", {}, void 0, true)
          ])
        ])
      ]);
    };
  }
});
var Form = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-72fc26d8"]]);
var item_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = {
  key: 0,
  class: "m-form-item-label"
};
const _hoisted_2 = {
  key: 0,
  style: { "color": "red" }
};
const _hoisted_3 = { class: "m-form-item-body" };
const _hoisted_4 = {
  key: 0,
  class: "m-form-item-tooltip"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    placement: null,
    labelWidth: null,
    labelAlign: null,
    showLabel: { type: Boolean, default: true },
    rule: null,
    ruleFn: null,
    ruleTigger: { default: "input" },
    showFeedback: { type: Boolean, default: true },
    label: null,
    modelValue: null,
    required: { type: Boolean, default: false },
    placeholder: null,
    color: { default: "#f56c6c" },
    name: { default: "" },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const placement = useInject(props.placement, "placement", "left");
    const labelWidth = useInject(props.labelWidth, "labelWidth", "auto");
    const labelAlign = useInject(props.labelAlign, "labelAlign", "left");
    const formObject = useInject(props.modelValue, "formObject", "");
    const isCorrect = ref(true);
    const errorContent = ref("");
    const value = ref(typeof formObject === "object" ? formObject[props.name] : formObject);
    watch(value, (newValue) => {
      emits("update:modelValue", newValue);
      formMitt.emit("commit", { name: props.name, value: newValue });
      if (props.ruleTigger === "input") {
        processRegistyHandle(newValue);
      }
    });
    function blurHandle() {
      if (props.ruleTigger === "lazy") {
        processRegistyHandle(value.value);
      }
    }
    function processRegistyHandle(newValue) {
      if (props.showFeedback) {
        if (props.ruleFn) {
          const { value: value2 = true, content } = props.ruleFn(newValue);
          isCorrect.value = value2;
          errorContent.value = content != null ? content : "";
        } else {
          if (props.rule) {
            for (const item of props.rule) {
              if (item.rule instanceof RegExp) {
                isCorrect.value = item.rule.test(newValue);
              } else {
                isCorrect.value = newValue === item.rule;
              }
              if (!isCorrect.value) {
                errorContent.value = item.content;
                break;
              }
            }
          }
        }
      }
    }
    formMitt.on("reset", () => {
      value.value = "";
      nextTick(() => {
        isCorrect.value = true;
      });
    });
    formMitt.on("submit", () => {
      processRegistyHandle(value.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["m-form-item", ["m-form-item-" + unref(placement), __props.disabled && "m-form-item-disabled"]]),
        style: normalizeStyle([
          { ["--m-form-item-label-width"]: unref(labelWidth) + "px" },
          { ["--m-form-item-label-dir"]: unref(labelAlign) }
        ])
      }, [
        __props.showLabel ? (openBlock(), createElementBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "label", {}, () => [
            createTextVNode(toDisplayString(__props.label), 1)
          ], true),
          __props.required ? (openBlock(), createElementBlock("span", _hoisted_2, " * ")) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_3, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createVNode(mInput$1, mergeProps({
              modelValue: value.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
              color: __props.showFeedback && !isCorrect.value ? __props.color : "",
              onBlur: blurHandle,
              placeholder: __props.placeholder
            }, _ctx.$attrs, {
              radius: "1px",
              disabled: __props.disabled
            }), null, 16, ["modelValue", "color", "placeholder", "disabled"])
          ], true),
          __props.showFeedback && !isCorrect.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
            renderSlot(_ctx.$slots, "tooltip", { value: errorContent.value }, () => [
              createBaseVNode("span", null, toDisplayString(errorContent.value), 1)
            ], true)
          ])) : createCommentVNode("", true)
        ])
      ], 6);
    };
  }
});
var FormItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-206f87a2"]]);
const mForm = withInstall(Form, "mForm");
const mFormItem = withInstall(FormItem, "mFormItem");
const monkeysUI = [
  mButton,
  mButtonGroup,
  mIcon,
  mIconGroup,
  mInput,
  mInputGroup,
  mAvatar,
  mGradient,
  mBackTop,
  mCard,
  mDivider,
  mCollapse,
  mCollapseItem,
  mInputNumber,
  mCheckBox,
  mCheckBoxGroup,
  mRadio,
  mRadioGroup,
  mSelect,
  mSwitch,
  mPagination,
  mTag,
  mTooltip,
  mEllipsis,
  mNumberAnimation,
  mBadge,
  mRate,
  mTimeline,
  mTimelineItem,
  mResult,
  mAffix,
  mCascader,
  mAutoComplete,
  mVertualScroll,
  mTransfer,
  mColorPicker,
  mDropdown,
  mTree,
  mCarousel,
  mCarouselItem,
  mMenu,
  mMenuItem,
  mAlert,
  mList,
  mListItem,
  mWatermark,
  mTab,
  mTabPane,
  mForm,
  mFormItem
];
var index = (app, opt) => {
  monkeysUI.forEach((cpn) => {
    app.use(cpn);
  });
};
export { index as default, mAffix, mAlert, mAutoComplete, mAvatar, mBackTop, mBadge, mButton, mButtonGroup, mCard, mCarousel, mCarouselItem, mCascader, mCheckBox, mCheckBoxGroup, mCollapse, mCollapseItem, mColorPicker, mDivider, mDropdown, mEllipsis, mForm, mFormItem, mGradient, mIcon, mIconGroup, mInput, mInputGroup, mInputNumber, mList, mListItem, mMenu, mMenuItem, mNumberAnimation, mPagination, mRadio, mRadioGroup, mRate, mResult, mSelect, mSwitch, mTab, mTabPane, mTag, mTimeline, mTimelineItem, mTooltip, mTransfer, mTree, mVertualScroll, mWatermark };
