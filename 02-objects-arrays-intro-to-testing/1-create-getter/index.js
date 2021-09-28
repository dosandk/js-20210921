/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const arr = path.split('.');

  return obj => {
    if (Object.keys(obj).length === 0) return;

    const GetVal = (index, newObj) => {
      const result = [undefined];

      if ((index === arr.length - 1) && (typeof newObj === 'object') && (typeof obj !== undefined)) {
        console.error(1);
        if (newObj.hasOwnProperty(arr[index])) {
          result.unshift(newObj[arr[index]]);
        }
      }
      else if ((typeof obj === 'object') && (typeof obj !== undefined)) {
        console.error(2);

        result.unshift(GetVal(index+1,newObj[arr[index]]))
      }

      return result[0];
    };

    return GetVal(0,obj);
  };
}
