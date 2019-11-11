var geekxue = (function () {
  function iteratee(action) {
    if (typeof action === 'string') {
      return property(action);
    } else if (Array.isArray(action)) {
      return matches(action);
    } else if (typeof action === 'object') {
      return matchProperty(action);
    } else {
      return action;
    }
  }
  function property(str) {
    return function (obj) {
      return obj[str];
    }
  }

  function matches(arr) {
    return function (obj) {
      return obj[arr[0]] === arr[1];
    }
  }

  function matchProperty(m) {
    return function (obj) {
      for (let key in m) {
        if (obj[key] != m[key]) {
          return false;
        }
      }
      return true;
    }
  }

  function chunk(array, size = 1) {
    var arrs = [];
    for (var i = 0; i < array.length; i++) {
      if (i + size > array.length) {
        var arr = array.slice(i);
      }
      var arr = array.slice(i, i + size);
      i = i + size - 1;
      arrs.push(arr);
    }
    return arrs;
  }
  function compact(array) {
    var map = { false: "", null: "", 0: "", "": "", undefined: "", NaN: "" };
    for (var i = 0; i < array.length; i++) {
      if (array[i] in map) {
        array.splice(i, 1);
        i = i - 1;
      }
    }
    return array;
  }
  function concat(array) {
    for (var i = 1; i < arguments.length; i++) {
      if (Array.isArray(arguments[i])) {
        for (var j = 0; j < arguments[i].length; j++) {
          array.push(arguments[i][j]);
        }
      } else {
        array.push(arguments[i]);
      }
    }
    return array;
  }
  function difference(...array) {
    var target = array[0];
    var compare = array.slice(1);
    compareMerge = compare.reduce((result, currItem) => {
      result = result.concat(currItem);
      return result;
    }, []);
    var arrayResult = [];
    for (var i = 0; i < target.length; i++) {
      var count = 0;
      for (var j = 0; j < compareMerge.length; j++) {
        if (isEqual(target[i], compareMerge[j])) {
          count++;
        }
      }
      if (count == 0) {
        arrayResult.push(target[i]);
      }
    }
    return arrayResult;
  }
  function differenceBy(...array) {
    var action = array[array.length - 1];
    var arr = array.slice(0, array.length - 1);
    var target = arr[0];
    var compare = arr.slice(1);
    var func = iteratee(action);
    compareMerge = compare.reduce((result, currItem) => {
      result = result.concat(currItem);
      return result;
    }, []);
    var arrayResult = [];
    for (var i = 0; i < target.length; i++) {
      var count = 0;
      for (var j = 0; j < compareMerge.length; j++) {
        if (isEqual(func(target[i]), func(compareMerge[j]))) {
          count++;
        }
      }
      if (count == 0) {
        arrayResult.push(target[i]);
      }
    }
    return arrayResult;
  }
  function drop(array, n = 1) {
    return array.slice(n);
  }
  function dropRight(array, n = 1) {
    if (array.length <= n) {
      return [];
    }
    return array.slice(0, array.length - n);
  }
  function fill(array, value, start = 0, end = array.length) {
    for (var i = start; i < end; i++) {
      array[i] = value;
    }
    return array;
  }
  function findIndex(array, predicate, fromIndex = 0) {
    predicate = iteratee(predicate);
    for (var i = fromIndex; i < array.length; i++) {
      if (predicate(array[i])) {
        return i;
      }
    }
    return -1;
  }
  function flatten(array) {
    return [].concat(...array);
  }
  /**
   * 递归(由外向里)(递归不用返回)(不能用下标遍历数组)
   */
  function flattenDeep(array) {
    var result = [];
    (function deepFlattern(ary) {
      for (var value of ary) {
        if (Array.isArray(value)) {
          deepFlattern(value);
        } else {
          result.push(value);
        }
      }
    })(array);
    return result;
  }
  /**
   * 递归(由里向外递归) 
   */
  // function flattenDeep(array) {
  //   return array.reduce((result, currItem) => {

  //     result = result.concat(currItem)
  //     if (!Array.isArray(currItem)) {
  //       return result
  //     }
  //     return flattenDeep(result)
  //   }, [])
  // }


  function flattenDepth(array, depth = 1) {
    for (var i = 0; i < depth; i++) {
      array = [].concat(...array);
    }
    return array;
  }
  function fromPairs(pairs) {
    var result = flattenDeep(pairs);
    var map = {};
    for (var i = 0; i < result.length; i += 2) {
      if (i % 2 == 0) {
        map[result[i]] = result[i + 1];
      }
    }
    return map;
  }
  function head(array) {
    return array[0];
  }
  function indexOf(array, value, fromIndex = 0) {
    for (var i = fromIndex; i < array.length; i++) {
      if (array[i] == value) {
        return i;
      }
    }
  }
  function initial(array) {
    array.pop(array.length - 1);
    return array;
  }
  function intersection(arrays) {
    var map = {};
    var result = [];
    var aim = arguments[0];
    for (var i = 0; i < aim.length; i++) {
      if (map[i]) {
        continue;
      } else {
        map[i] = aim[i];
      }
    }
    for (var j in map) {
      var k = 0;
      for (var i = 1; i < arguments.length; i++) {
        if (!(arguments[i].includes(map[j]))) {
          break;
        } else {
          k++;
        }
      }
      if (k == arguments.length - 1) {
        result.push(map[j]);
      }
    }
    return result;;
  }
  function join(array, separator = ",") {
    var result = new Array(array.length * 2 - 1);
    for (var i = 0; i < result.length; i++) {
      if (i % 2 == 0) {
        var removed = array.shift(0);
        result[i] = removed;
      } else {
        result[i] = separator;
      }
    }
    var string = "";
    for (var i = 0; i < result.length; i++) {
      string += result[i];
    }
    return string;
  }
  function last(array) {
    arrayOther = array.slice(-1);
    return arrayOther.pop();
  }
  function lastIndexOf(array, values, fromIndex = array.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
      if (array[i] == values) {
        return i;
      }
    }
    return -1;
  }
  function nth(array, n = 0) {
    if (n < 0) {
      return array[array.length + n];
    } else if (n >= 0) {
      return array[n];
    }
  }
  function pull(array) {
    values = []
    for (var i = 1; i < arguments.length; i++) {
      values.push(arguments[i]);
    }
    return array.reduce((result, currentItem) => {
      if (values.indexOf(currentItem) == -1) {
        result.push(currentItem);
      }
      return result;
    }, [])
  }
  function pullAll(array, values) {
    return array.reduce((result, currentItem) => {
      if (values.indexOf(currentItem) == -1) {
        result.push(currentItem);
      }
      return result;
    }, [])
  }
  function pullAt(array, indexes) {
    // return array.reduce((result,currentItem,i)=>{
    //   if(indexes.indexOf(i)!=-1){
    //     result.push(currentItem);
    //     array.splice(i,1);
    //   }
    //   return result;
    // },[]);
    var result = [];
    for (var i = array.length - 1; i >= 0; i--) {
      if (indexes.indexOf(i) != -1) {
        result.unshift(array[i]);
        array.splice(i, 1);
      }
    }
    return result;
  }
  function remove(array, action) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      if (action(array[i])) {
        result.push(array[i]);
        array.splice(i, 1);
        i = i - 1;
      }
    }
    return result;
  }
  function remove(array, action) {
    return array.reduce((result, currentItem, i) => {
      if (action(currentItem)) {
        result.push(currentItem);
        array.splice(i, 1);
        i = i - 1;
      }
      return result;
    }, []);
  }
  function reverse(array) {
    return array.reduce((result, currItem) => {
      result.unshift(currItem);
      return result;
    }, [])
  }
  function slice(array, starts = 0, end = array.length) {
    result = [];
    for (var i = starts; i < end; i++) {
      result.push(array[i]);
    }
    return result;
  }
  function sortedIndex(array, value) {
    var start = 0;
    var end = array.length - 1;
    function bsearch(array, start, end, value) {
      if (array[start] >= value) {
        return start;
      } else if (array[end] <= value) {
        return end + 1;
      } else {
        mid = Math.floor((start + end) / 2);
        if (array[mid] > value) {
          return bsearch(array, start, mid - 1, value);
        } else if (array[mid] < value) {
          return bsearch(array, mid + 1, end, value);
        } else {
          while (array[mid] == array[mid - 1]) {
            mid = mid - 1
          }
          return mid;
        }
      }
    }
    return bsearch(array, start, end, value);
  }
  function sortedIndexOf(array, value) {
    var low = 0;
    var height = array.length - 1;
    while (low <= height) {
      mid = Math.floor((low + height) / 2);
      if (array[mid] > value) {
        height = mid - 1;
      } else if (array[mid] < value) {
        low = mid + 1;;
      } else {
        while (array[mid] == array[mid - 1]) {
          mid = mid - 1
        }
        return mid;
      }
    }
    return -1;
  }
  function sortedLastIndex(array, value) {
    var low = 0;
    var height = array.length - 1;
    while (low <= height) {
      mid = Math.floor((low + height) / 2);
      if (array[mid] > value) {
        height = mid - 1;
      } else if (array[mid] < value) {
        low = mid + 1;;
      } else {
        while (array[mid] == array[mid + 1]) {
          mid = mid + 1;
        }
        return mid + 1;
      }
    }
    return -1;
  }
  function sortedLastIndexOf(array, value) {
    var low = 0;
    var height = array.length - 1;
    while (low <= height) {
      mid = Math.floor((low + height) / 2);
      if (array[mid] > value) {
        height = mid - 1;
      } else if (array[mid] < value) {
        low = mid + 1;;
      } else {
        while (array[mid] == array[mid + 1]) {
          mid = mid + 1;
        }
        return mid;
      }
    }
    return -1;
  }
  function sortedUniq(array) {
    var s = new Set();
    array.forEach(x => s.add(x));
    var result = [];
    for (var i of s) {
      result.push(i);
    }
    return result;
  }
  function sortedUniqBy(array, action) {
    var map = array.reduceRight((result, currentItem, i) => {
      result[action(currentItem)] = i;
      return result;
    }, {})
    var arr = []
    for (var i in map) {
      arr.push(array[map[i]]);
    }
    return arr;
  }
  function tail(array) {
    return array.slice(1);
  }
  function take(array, n = 1) {
    return array.slice(0, n);
  }
  function takeRight(array, n = 1) {
    if (n >= array.length) {
      return array
    } else if (n == 0) {
      return []
    } else {
      return array.slice(-n);
    }
  }
  function union(arrays) {
    var result = [];
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        result.push(arguments[i][j]);
      }
    }
    return sortedUniq(result);
  }
  function uniq(array) {
    return sortedUniq(array);
  }
  function unzip(array) {
    var result = []
    for (var i = 0; i < array[0].length; i++) {
      var arr = [];
      for (var j = 0; j < array.length; j++) {
        arr.push(array[j][i]);
      }
      result.push(arr);
    }
    return result;
  }
  function unzipWith(array, iteratee) {
    arr = unzip(array);
    return arr.reduce((result, currItem) => {
      result.push(iteratee(...currItem));
      return result;
    }, [])
  }
  function without(array, ...values) {
    result = [...values];
    return array.reduce((arr, currentItem) => {
      if (result.indexOf(currentItem) == -1) {
        arr.push(currentItem);
      }
      return arr;
    }, [])
  }
  function xor(arrays) {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    var arrs = args.reduce((result, currentItem) => {
      result.push(uniq(currentItem));
      return result;
    }, [])
    var first = arrs[0];
    var other = [].concat(...(arrs.slice(1)));
    if (arrs.length == 1) {
      return first;
    } else {
      var result = []
      for (var i = 0; i < first.length; i++) {
        var count = 0
        for (var j = 0; j < other.length; j++) {
          if (isEqual(first[i], other[j])) {
            other.splice(j, 1);
            count++;
            j = j - 1;
          }
        }
        if (count) {
          first.splice(i, 1);
          i = i - 1;
        }
      }
      result = result.concat(first);
      result = result.concat(other);
      for (var a = 0; a < result.length; a++) {
        var count = 0;
        for (var b = a + 1; b < result.length; b++) {
          if (isEqual(result[a], result[b])) {
            result.splice(b, 1);
            b = b - 1;
            count++
          }
        }
        if (count) {
          result.splice(a, 1);
          a = a - 1;
        }
      }
      return result;
    }
  }
  function xorWith(arrays) {
    var args = [];
    var comparator = arguments[arguments.length - 1];
    comparator = typeof comparator == 'function' ? comparator : undefined;
    if (typeof comparator == "function") {
      for (var i = 0; i < arguments.length - 1; i++) {
        args.push(arguments[i]);
      }
    } else {
      for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
    }
    var arrs = args.reduce((result, currentItem) => {
      result.push(uniqObject(currentItem));
      return result;
    }, [])
    var first = arrs[0];
    var other = [].concat(...(arrs.slice(1)));
    if (arrs.length == 1) {
      return first;
    } else {
      if (typeof comparator == "function") {
        var result = []
        for (var i = 0; i < first.length; i++) {
          var count = 0
          for (var j = 0; j < other.length; j++) {
            if (comparator(first[i], other[j])) {
              other.splice(j, 1);
              count++;
              j = j - 1;
            }
          }
          if (count) {
            first.splice(i, 1);
            i = i - 1;
          }
        }
        result = result.concat(first);
        result = result.concat(other);
        for (var a = 0; a < result.length; a++) {
          var count = 0;
          for (var b = a + 1; b < result.length; b++) {
            if (isEqual(result[a], result[b])) {
              result.splice(b, 1);
              b = b - 1;
              count++
            }
          }
          if (count) {
            result.splice(a, 1);
            a = a - 1;
          }
        }
        return result;
      } else {
        var result = []
        for (var i = 0; i < first.length; i++) {
          var count = 0
          for (var j = 0; j < other.length; j++) {
            if (isEqual(first[i], other[j])) {
              other.splice(j, 1);
              count++;
              j = j - 1;
            }
          }
          if (count) {
            first.splice(i, 1);
            i = i - 1;
          }
        }
        result = result.concat(first);
        result = result.concat(other);
        for (var a = 0; a < result.length; a++) {
          var count = 0;
          for (var b = a + 1; b < result.length; b++) {
            if (isEqual(result[a], result[b])) {
              result.splice(b, 1);
              b = b - 1;
              count++
            }
          }
          if (count) {
            result.splice(a, 1);
            a = a - 1;
          }
        }
        return result;
      }
    }
  }
  function uniqObject(array) {
    for (var i = 0; i < array.length; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (isEqual(array[i], array[j])) {
          array.splice(j, 1);
          j = j - 1;
        }
      }
    }
    return array;
  }
  function zip(arrays) {
    var len = 0;
    for (var i = 0; i < arguments.length; i++) {
      len = Math.max(len, arguments[i].length);
    }
    var arr = [];
    for (var j = 0; j < len; j++) {
      var result = []
      for (var i = 0; i < arguments.length; i++) {
        result.push(arguments[i][j]);
      }
      arr.push(result);
    }
    return arr;
  }
  function zipObject(props = [], values = []) {
    var map = {}
    for (var i = 0; i < props.length; i++) {
      map[props[i]] = values[i];
    }
    return map;
  }
  function zipWith(arrays) {
    action = arguments[arguments.length - 1];
    var args = [];
    var arr = [];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }
    arr = zip(...args);
    result = []
    for (var i = 0; i < arr.length; i++) {
      result.push(action(...arr[i]));
    }
    return result;
  }
  function forEach(collection, iteratee) {
    return collection.reduce((result, currItem) => {
      result.push(iteratee(currItem));
      return result;
    }, [])
  }
  function includes(collection, values, fromIndex = 0) {
    if (Object.prototype.toString.call(collection) == "[object String]") {
      var result = collection.substring(fromIndex);
    } else if (Object.prototype.toString.call(collection) == "[object Array]") {
      var result = collection.slice(fromIndex);
    } else if (Object.prototype.toString.call(collection) == "[object Object]") {
      var result = [];
      for (var i in collection) {
        result.push(collection[i]);
      }
      result = result.slice(fromIndex);
    }
    if (result.indexOf(values) !== -1) {
      return true;
    } else {
      return false;
    }
  }
  function size(collection) {
    var count = 0
    for (var i in collection) {
      count++;
    }
    return count;
  }
  function castArray(value) {
    if (Object.prototype.toString.call(value) == "[object Array]") {
      return value;
    } else if (arguments.length == 0) {
      return [];
    } else {
      return [].concat(value);
    }
  }
  function confirmsTo(object, source) {
    for (var i in object) {
      if (i in source) {
        if (source[i](object[i])) {
          continue;
        } else {
          return false;
        }
      }
    }
    return true;
  }
  function eq(object, other) {
    if (isNaN(object) && isNaN(other) && typeof (object) == "number" && typeof (other) == "number") {
      return true;
    } else if (object === other) {
      return true;
    } else {
      return false;
    }
  }
  function gt(value, other) {
    if (value > other) {
      return true;
    } else {
      return false;
    }
  }
  function gte(value, other) {
    if (value >= other) {
      return true;
    } else {
      return false;
    }
  }
  function isArguments(value) {
    if (Object.prototype.toString.call(value) == "[object Arguments]") {
      return true;
    } else {
      return false;
    }
  }
  function isArray(value) {
    if (Array.isArray(value)) {
      return true;
    } else {
      return false;
    }
  }
  function isArrayBuffer(value) {
    if (Object.prototype.toString.call(value) == "[object ArrayBuffer]") {
      return true;
    } else {
      return false;
    }
  }
  function isArrayLike(value) {
    if (!(Object.prototype.toString.call(value) == "[object Function]" && "length" in value)) {
      return true;
    } else {
      return false;
    }
  }
  function isArrayLikeObject(value) {
    return isArrayLike(value);
  }
  function isBoolean(value) {
    if (Object.prototype.toString.call(value) == "[object Boolean]") {
      return true;
    } else {
      return false;
    }
  }
  function isBuffer(value) {
    if (Object.prototype.toString.call(value) == "[object Buffer]") {
      return true;
    } else {
      return false;
    }
  }
  function isDate(value) {
    if (Object.prototype.toString.call(value) == "[object Date]") {
      return true;
    } else {
      return false;
    }
  }
  function isElement(value) {
    if (Object.prototype.toString.call(value) == "[object HTMLBodyElement]") {
      return true;
    } else {
      return false;
    }
  }
  function isEmpty(value) {
    var count = 0;
    for (i in value) {
      count++;
    }
    if (count == 0) {
      return true;
    } else {
      return false;
    }

  }
  function isEqual(object, other) {
    if (isNaN(object) && isNaN(other) && typeof (object) == "number" && typeof (other) == "number") {
      return true;
    } else if (object === other) {
      return true;
    } else if (Object.prototype.toString.call(object) == Object.prototype.toString.call(other)) {
      if (Object.prototype.toString.call(object) == "[object Function]") {
        if (object.toString() === other.toString()) {
          return true;
        } else {
          return false;
        }
      } else {
        if (Object.prototype.toString.call(object) == "[object Array]") {
          for (var i = 0; i < object.length; i++) {
            return isEqual(object[i], other[i]);
          }
        } else if (Object.prototype.toString.call(object) == "[object Object]") {//判断对象
          for (var i in object) {
            if (object.hasOwnProperty(i) !== other.hasOwnProperty(i)) {
              return false;
            } else if (object.hasOwnProperty(i) === other.hasOwnProperty(i)) {
              if (Object.prototype.toString.call(object[i]) == "[object Object]" || Object.prototype.toString.call(object[i]) == "[object Array]" || Object.prototype.toString.call(object[i]) == "[object Function]") {
                return isEqual(object[i], other[i]);
              } else if (object[i] !== other[i]) {
                return false;
              }
            }
          }
          for (var j in other) {
            if (object.hasOwnProperty(j) !== other.hasOwnProperty(j)) {
              return false;
            } else if (object.hasOwnProperty(j) === other.hasOwnProperty(j)) {
              if (Object.prototype.toString.call(other[j]) == "[object Object]" && Object.prototype.toString.call(other[j]) == "[object Array]" && Object.prototype.toString.call(other[i]) == "[object Function]") {
                return isEqual(object[i], other[i]);
              } else if (object[i] !== other[i]) {
                return false;
              }
            }
          }
          return true;
        }
        return false;
      }
    }
    return false;
  }
  function isEqualWith(value, other, customizer) {
    value = castArray(value);
    other = castArray(other);
    var flag = 0;
    for (var j in other) {
      result = customizer(value[j], other[j]);
      if (Object.prototype.toString.call(result) == "undefined") {
        if (!(isEqual(value[j], other[j]))) {
          flag++;
          return false;
        }
      }
    }
    for (i in value) {
      result = customizer(value[i], other[i]);
      if (Object.prototype.toString.call(result) == "undefined") {
        if (!(isEqual(value[i], other[i]))) {
          flag++;
          return false;
        }
      }
      if (flag == 0) {
        return true;
      }
    }
  }
  function isError(value) {
    if (Object.prototype.toString.call(value) == "[object Error]") {
      return true;
    } else {
      return false;
    }
  }
  function isFinite(value) {
    if (Object.prototype.toString.call(value) == "[object Number]" && value >= Number.MIN_VALUE && value <= Number.MAX_VALUE) {
      return true;
    } else {
      return false;
    }
  }
  function isFunction(value) {
    if (Object.prototype.toString.call(value) == "[object Function]") {
      return true;
    } else {
      return false;
    }
  }
  function isInteger(value) {
    if (parseInt(value) === value) {
      return true;
    } else {
      return false;
    }
  }
  function isLength(value) {
    if (isInteger(value) && value >= 0) {
      return true;
    } else {
      return false;
    }
  }
  function isMap(value) {
    if (Object.prototype.toString.call(value) == "[object Map]") {
      return true;
    } else {
      return false;
    }
  }
  function isMatch(object, source) {
    for (i in object) {
      var map = {};
      map[i] = object[i];
      if (isEqual(map, source)) {
        return true;
      }
    }
    return false;
  }
  function isMatchWith(object, source, customizer) {
    for (var i in object) {
      if (isEqualWith(object[i], source, customizer)) {
        return true
      }
    }
    return false;
  }
  function isNaN(value) {
    if (Number.isNaN(value)) {
      return true;
    } else {
      return false;
    }
  }
  function isNative(value) {
    return value.toString().includes('[native code]')
  }
  function isNil(value) {
    if (Object.prototype.toString.call(value) == "[object Undefined]" || Object.prototype.toString.call(value) == "[object Null]") {
      return true;
    } else {
      return false;
    }
  }
  function isNull(value) {
    if (Object.prototype.toString.call(value) == "[object Null]") {
      return true;
    } else {
      return false;
    }
  }
  function isNumber(value) {
    if (Object.prototype.toString.call(value) == "[object Number]") {
      return true;
    } else {
      return false;
    }
  }
  function isObject(value) {
    if ((typeof value == "object" && value !== null) || (typeof value == "function")) {
      return true;
    } else {
      return false;
    }
  }
  function isObjectLike(value) {
    if (typeof value == "object" && value !== null) {
      return true;
    } else {
      return false;
    }
  }
  function isPlainObject(value) {
    if ((!(value.__proto__)) || (value.__proto__.toString() == "[object Object]")) {
      return true;
    } else {
      return false;
    }
  }
  function isRegExp(value) {
    if (Object.prototype.toString.call(value) == "[object RegExp]") {
      return true;
    } else {
      return false;
    }
  }
  function isSafeInteger(value) {
    if (Number.isSafeInteger(value)) {
      return true;
    } else {
      return false;
    }
  }
  function isSet(value) {
    if (Object.prototype.toString.call(value) == "[object Set]") {
      return true;
    } else {
      return false;
    }
  }
  function isString(value) {
    if (Object.prototype.toString.call(value) == "[object String]") {
      return true;
    } else {
      return false;
    }
  }
  function isSymbol(value) {
    if (Object.prototype.toString.call(value) == "[object Symbol]") {
      return true;
    } else {
      return false;
    }
  }
  function isTypedArray(value) {
    if (value instanceof Int8Array) {
      return true;
    } else if (value instanceof Uint8Array) {
      return true;
    } else if (value instanceof Uint8ClampedArray) {
      return true;
    } else if (value instanceof Int16Array) {
      return true;
    } else if (value instanceof Uint16Array) {
      return true;
    } else if (value instanceof Int32Array) {
      return true;
    } else if (value instanceof Uint32Array) {
      return true;
    } else if (value instanceof Float32Array) {
      return true;
    } else if (value instanceof Float64Array) {
      return true;
    } else {
      return false;
    }
  }
  function isUndefined(value) {
    if (typeof value == "undefined") {
      return true;
    } else {
      return false;
    }
  }
  function isWeakMap(value) {
    if (value instanceof WeakMap) {
      return true;
    } else {
      return false;
    }
  }
  function isWeakMap(value) {
    if (value instanceof WeakSet) {
      return true;
    } else {
      return false;
    }
  }
  function lt(value, other) {
    if (value < other) {
      return true;
    } else {
      return false;
    }
  }
  function lte(value, other) {
    if (value <= other) {
      return true;
    } else {
      return false;
    }
  }
  function toArray(value) {
    if (Object.prototype.toString.call(value) == "[object String]") {
      return value.split("");
    } else if (Object.prototype.toString.call(value) == "[object Object]") {
      var result = [];
      for (var i in value) {
        result.push(value[i]);
      }

      return result;
    } else {
      return [];
    }
  }
  function toFinite(value) {
    if (value == Infinity) {
      return 1.7976931348623157e+308
    } else if (value == -Infinity) {
      return -1.7976931348623157e+308
    } else {
      return Number(value);
    }
  }
  function toInteger(value) {
    if (value == Infinity) {
      return 1.7976931348623157e+308
    } else if (value == -Infinity) {
      return -1.7976931348623157e+308
    } else {
      return Math.floor(value);
    }
  }
  function add(value, other) {
    return value + other;
  }
  function ceil(value, precision = 0) {
    result = Math.ceil(value * (10 ** precision));
    return result / (10 ** precision);
  }
  function divide(value, other) {
    return value / other;
  }
  function floor(value, precision = 0) {
    result = Math.floor(value * (10 ** precision));
    return result / (10 ** precision);
  }
  function max(array) {
    return array.reduce((result, currItem) => {
      return Math.max(result, currItem);
    }, array[0]);
  }
  function maxBy(array, iterateeAction) {
    action = iteratee(iterateeAction)
    return array.reduce((result, currItem) => {
      maxNum = Math.max(action(result), action(currItem));
      if (action(result) == maxNum) {
        result = result;
      } else {
        result = currItem;
      }
      return result;
    }, array[0]);
  }
  function mean(array) {
    num = array.reduce((result, currItem) => {
      return result += currItem;
    }, 0);
    return num / (array.length);
  }
  function meanBy(array, iterateeAction) {
    action = iteratee(iterateeAction);
    num = array.reduce((result, currItem) => {
      return result += action(currItem);
    }, 0);
    return num / (array.length);
  }
  function min(array) {
    return array.reduce((result, currItem) => {
      return Math.min(result, currItem);
    }, array[0])
  }
  function minBy(array, iterateeAction) {
    action = iteratee(iterateeAction)
    return array.reduce((result, currItem) => {
      maxNum = Math.min(action(result), action(currItem));
      if (action(result) == maxNum) {
        result = result;
      } else {
        result = currItem;
      }
      return result;
    }, array[0]);
  }
  function multiply(value, other) {
    return value * other;
  }
  function round() {
    result = Math.round(value * (10 ** precision));
    return result / (10 ** precision);
  }
  function subtract(value, other) {
    return value - other;
  }
  function sum(array) {
    return array.reduce((result, currItem) => {
      return result += currItem;
    }, 0)
  }
  function sumBy(array, iterateeAction) {
    action = iteratee(iterateeAction);
    return array.reduce((result, currItem) => {
      return result += action(currItem);
    }, 0)
  }
  function clamp(...array) {
    var result = [];
    for (var i = 0; i < 3; i++) {
      if (typeof (array[i]) != "undefined") {
        result.push(array[i]);
      }
    }
    function compare(a, b) {
      return a - b;
    }
    result = result.sort(compare);
    index = result.length - 2 >= 0 ? result.length - 2 : 0;
    return result[index];
  }
  function inRange(number, start = 0, end) {
    var number = arguments[0];
    var start = arguments.length<=2? 0 : arguments[1];
    var end = arguments.length<=1? undefined : arguments[arguments.length-1];
    if (typeof end == "undefined") {
      return false;
    } else {
      if (start <= end) {
        if (number >= start && number < end) {
          return true;
        } else {
          return false;
        }
      } else {
        if (number >= end && number < start) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
  return {
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    differenceBy: differenceBy,
    drop: drop,
    dropRight: dropRight,
    fill: fill,
    findIndex: findIndex,
    isEqual: isEqual,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    fromPairs: fromPairs,
    head: head,
    indexOf: indexOf,
    initial: initial,
    intersection: intersection,
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    nth: nth,
    pull: pull,
    pullAll: pullAll,
    pullAt: pullAt,
    remove: remove,
    reverse: reverse,
    slice: slice,
    sortedIndex: sortedIndex,
    sortedIndexOf: sortedIndexOf,
    sortedLastIndex: sortedLastIndex,
    sortedLastIndexOf: sortedLastIndexOf,
    sortedUniq: sortedUniq,
    sortedUniqBy: sortedUniqBy,
    tail: tail,
    take: take,
    takeRight: takeRight,
    union: union,
    uniq: uniq,
    unzip: unzip,
    unzipWith: unzipWith,
    without: without,
    xor: xor,
    xorWith: xorWith,
    zip: zip,
    zipObject: zipObject,
    zipWith: zipWith,
    forEach: forEach,
    includes: includes,
    size: size,
    castArray: castArray,
    confirmsTo: confirmsTo,
    eq: eq,
    gt: gt,
    gte: gte,
    isArguments: isArguments,
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isArrayLike: isArrayLike,
    isArrayLikeObject: isArrayLikeObject,
    isBoolean: isBoolean,
    isBuffer: isBuffer,
    isDate: isDate,
    isElement: isElement,
    isEmpty: isEmpty,
    isEqual: isEqual,
    isEqualWith: isEqualWith,
    isFinite: isFinite,
    isFunction: isFunction,
    isInteger: isInteger,
    isLength: isLength,
    isMap: isMap,
    isMatch: isMatch,
    isMatchWith: isMatchWith,
    isNative: isNative,
    isNil: isNil,
    isNull: isNull,
    isNumber: isNumber,
    isObject: isObject,
    isObjectLike: isObjectLike,
    isPlainObject: isPlainObject,
    isRegExp: isRegExp,
    isTypedArray: isTypedArray,
    isSafeInteger: isSafeInteger,
    isSet: isSet,
    isString: isString,
    isSymbol: isSymbol,
    isUndefined: isUndefined,
    isWeakMap: isWeakMap,
    lt: lt,
    lte: lte,
    toArray: toArray,
    toFinite: toFinite,
    toInteger: toInteger,
    add: add,
    ceil: ceil,
    divide: divide,
    floor: floor,
    max: max,
    maxBy: maxBy,
    mean: mean,
    meanBy: meanBy,
    min: min,
    minBy: minBy,
    multiply: multiply,
    round: round,
    sum: sum,
    sumBy: sumBy,
    clamp: clamp,
    inRange: inRange,
    isError: isError
  };
})();