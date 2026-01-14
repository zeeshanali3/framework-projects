function isPlainObject(x) {
  return x && typeof x === 'object' && !Array.isArray(x) && !(x instanceof Date);
}

function deepMerge(template, override) {
  if (template === undefined || template === null) {
    return override === undefined ? template : override;
  }

  if (Array.isArray(template)) {
    if (!Array.isArray(override)) {
      return override === undefined ? template : override;
    }

    if (template.length === 1) {
      const elemTemplate = template[0];
      return override.map((ovElem) => deepMerge(elemTemplate, ovElem));
    }

    const maxLen = Math.max(template.length, override.length);
    const result = [];
    for (let i = 0; i < maxLen; i++) {
      if (i < template.length && i < override.length) {
        result[i] = deepMerge(template[i], override[i]);
      } else if (i < template.length) {
        result[i] = template[i];
      } else {
        result[i] = override[i];
      }
    }
    return result;
  }

  if (isPlainObject(template)) {
    if (!isPlainObject(override)) {
      return override === undefined ? template : override;
    }

    const result = {};
    const keys = new Set([...Object.keys(template), ...Object.keys(override)]);
    for (const key of keys) {
      const tVal = template[key];
      const oVal = override ? override[key] : undefined;

      if ((isPlainObject(tVal) || Array.isArray(tVal)) && (isPlainObject(oVal) || Array.isArray(oVal))) {
        result[key] = deepMerge(tVal, oVal);
      } else if (oVal === undefined) {
        result[key] = tVal;
      } else {
        result[key] = oVal;
      }
    }
    return result;
  }

  return override === undefined ? template : override;
}
module.exports = { deepMerge };