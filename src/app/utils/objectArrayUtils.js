import _ from 'lodash';

export const valueLabelToString = (valueLabel, isLabel) => {
  if (valueLabel == null || valueLabel === undefined) {
    return '';
  }
  if (_.isArray(valueLabel)) {
    return _.map(valueLabel, (item) => (isLabel ? item.label : item.value));
  }
  return isLabel ? valueLabel.label : valueLabel.value;
};

export const stringToValueLabel = (stringValue) => {
  if (stringValue == null || stringValue === undefined) {
    return {};
  }
  if (_.isArray(stringValue)) {
    return _.map(stringValue, (item) => {
      if (_.isObject(item) && item.label && item.value) {
        return item;
      }
      return { label: _.startCase(item), value: item };
    });
  }
  if (_.isObject(stringValue) && stringValue.label && stringValue.value) {
    return stringValue;
  }
  return { label: _.startCase(stringValue), value: stringValue };
};

export const flatObjOfArrays = (rows) => {
  if (!rows) return [];
  if (_.isArray(rows)) return rows;
  if (!_.isObject(rows)) return [];
  const myrows = [];
  Object.keys(rows).forEach((key) => {
    if (_.isArray(rows[key])) {
      rows[key].forEach((row) => {
        myrows.push(row);
      });
    }
  });
  return myrows;
};

/**
 * funtion for filtering array of objects by key value
 * @param {array} listOfObj - array of objects
 * @param {string} property - property to be used for filtering
 * @param {string} value - value to be used for filtering
 * @returns {array} - filtered array of objects
 */
export const filterByKeyValue = (listOfObj, property, value) => {
  // if the value is not provided, return the entire list.
  if (!value) return listOfObj;
  // if the list is empty, return an empty list.
  if (!listOfObj || listOfObj.length === 0) return [];
  // if the value is 'all', return the entire list.
  if (value === 'all' || value === 'All') return listOfObj;
  return listOfObj.filter((user) => {
    // if the property is not defined, return true.
    if (user[property] === undefined) return true;
    return user[property] === value;
  });
};

export const getLastUrlFromImageArray = (imageArray) => {
  if (!imageArray) return '';
  if (_.isArray(imageArray)) {
    return imageArray && imageArray.length > 0 ? imageArray[imageArray.length - 1].url : '';
  }
  if (_.isString(imageArray)) return imageArray;
  if (_.isObject(imageArray)) {
    return imageArray.url;
  }
  return '';
};

export const getImageArrayFromUrl = (url) => {
  if (!url) return [];
  if (_.isArray(url)) return url;
  if (_.isString(url)) return [{ url }];
  if (_.isObject(url)) return [url];
  return [];
};

/**
 * function for filtering array of objects by key values
 * @param {Array} arrayOfObjects - array of objects
 * @param {Arra} keys - array of keys to be kept in the object
 * @returns {Array} - array of objects with only the keys provided
 */
export const filterArrayOfObjectsByKeys = (arrayOfObjects, keys) => {
  if (!arrayOfObjects) return [];
  if (!keys || keys.length === 0) return arrayOfObjects;
  if (!_.isArray(arrayOfObjects)) return [];

  return _.map(arrayOfObjects, (imgObject) => {
    Object.keys(imgObject).forEach((key) => {
      if (!keys.includes(key)) {
        delete imgObject[key];
      }
    });
    return imgObject;
  });
};

export const groupObjectsByKey = (array, key) => {
  if (!array) return {};
  if (!key) return array;
  if (!_.isArray(array)) return {};
  return array.reduce((acc, curr) => {
    const keyValue = curr[key];
    if (!acc[keyValue]) {
      acc[keyValue] = [];
    }
    acc[keyValue].push(curr);
    return acc;
  }, {});
};
