const service = {
  inheritance: function (parent, child) {
    let tempChild = child.prototype;
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;

    for (let key in tempChild) {
      if (tempChild.hasOwnProperty(key)) {
        child.prototype[key] = tempChild[key];
      }
    }
  }
};