export const genId = () => `${Math.random()}`;

const _createTreeStructure = (obj: any, fatherLabel?: any) => {
  let ret: any[] = [];

  if (typeof obj === "object" && !Array.isArray(obj)) {
    for (let field in obj) {
      let key = field;
      let value = obj[field];

      if (Array.isArray(value)) {
        let arr = [];

        for (let item of value) {
          arr.push(_createTreeStructure(item, value));
        }

        ret.push({
          label: `${key}`,
          key: genId(),
          nodes: arr,
        });
      } else if (typeof value === "object") {
        ret.push({
          label: `${key}`,
          key: genId(),
          nodes: _createTreeStructure(value),
        })
      } else {
        ret.push({
          label: `${key}`,
          key: genId(),
          nodes: _createTreeStructure(value),
        })
      }
    }
  } else {
    if (fatherLabel) {
      return {
        label: `${obj}`,
        key: genId(),
        nodes: [],
      }
    } else {
      ret.push({
        label: `${obj}`,
        key: genId(),
        nodes: [],
      })
    }
  }

  return ret;
}

export const createTreeStructure = (obj: any) => {
  let ret = _createTreeStructure(obj);

  if (!Array.isArray(ret)) {
    ret = [ret];
  }

  return ret;
}
