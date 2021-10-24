// 延迟函数
export const delay = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

// 防抖函数
export const debounce = (fn: () => Fn, timeout: number) => {
  let timmer: TimeoutHandle;
  return () => {
    timmer ? clearTimeout(timmer) : null;
    timmer = setTimeout(fn, timeout);
  };
};

export const hasClass = (ele: any, cls: string): any => {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
};

export const addClass = (ele: any, cls: string, extracls?: string): any => {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
  if (extracls) {
    if (!hasClass(ele, extracls)) ele.className += " " + extracls;
  }
};

export const removeClass = (ele: any, cls: string, extracls?: string): any => {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ").trim();
  }
  if (extracls) {
    if (hasClass(ele, extracls)) {
      const regs = new RegExp("(\\s|^)" + extracls + "(\\s|$)");
      ele.className = ele.className.replace(regs, " ").trim();
    }
  }
};

export const toggleClass = (
  flag: boolean,
  clsName: string,
  target?: any
): any => {
  const targetEl = target || document.body;
  let { className } = targetEl;
  className = className.replace(clsName, "");
  targetEl.className = flag ? `${className} ${clsName} ` : className;
};
