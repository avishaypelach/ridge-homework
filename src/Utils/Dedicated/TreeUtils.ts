export const genId = () => `${Math.random()}`;

export const createTreeStructure = (obj: any) => {
  let ret = [];

  if (typeof obj === "object" && !Array.isArray(obj)) {
    for (let field in obj) {
      let key = field;
      let value = obj[field];

      if (Array.isArray(value)) {
        let arr = [];

        for (let item of value) {
          arr.push(createTreeStructure(item));
        }

        ret.push({
          label: key,
          key: genId(),
          nodes: arr,
        });
      } else if (typeof value === "object") {
        ret.push({
          label: key,
          key: genId(),
          nodes: createTreeStructure(value),
        })
      } else {
        ret.push({
          label: key,
          key: genId(),
          nodes: value,
        })
      }
    }
  } else {
    ret.push({
      label: obj,
      key: genId(),
      nodes: obj,
    })
  }

  return ret;
}
