const d = (e, n = !1) => new Promise((o) => {
  const t = document.createElement("input");
  t.multiple = n, t.type = "file", e && (t.accept = e), t.click(), t.onchange = () => {
    t.files && o([...t.files]), t.remove();
  };
}), h = (e) => {
  let n = null;
  return window.createObjectURL != null ? n = window.createObjectURL(e) : window.URL != null ? n = window.URL.createObjectURL(e) : window.webkitURL != null && (n = window.webkitURL.createObjectURL(e)), n;
}, p = (e, n) => new Promise((o, t) => {
  if (e.size) {
    const r = new FileReader();
    e.type.includes("json") ? (r.onloadend = (l) => {
      const c = JSON.parse(l.target?.result);
      t(c?.message ?? "未知原因");
    }, r.readAsText(e)) : (r.onloadend = (l) => {
      u(l.target?.result, n).then(() => o()).catch((c) => t(c));
    }, r.readAsDataURL(e));
  } else
    t(`无法获取${n || "文件"}`);
}), u = (e, n) => new Promise((o, t) => {
  if (e) {
    const r = document.createElement("a");
    r.href = e, n && (r.download = n), r.click(), o(), r.remove();
  } else
    t(`无法下载${n || "文件"}`);
}), m = (e) => {
  const o = Math.ceil(e.size / 10485760), t = [];
  for (let r = 0; r < o; r++) {
    const l = r * 10485760, c = Math.min(l + 10485760, e.size), a = e.slice(l, c);
    t.push({
      index: r,
      data: a
    });
  }
  return t;
}, g = (e) => {
  const o = e.name.split(".");
  return o[o.length - 1];
}, f = (e) => {
  let n;
  const o = ["B", "KB", "MB", "GB", "TB", "PB"];
  for (n = 0; n < o.length && e >= 1024; n++)
    e /= 1024;
  return (Math.round(e * 100) / 100 || 0) + o[n];
}, b = (e, n = "14px", o = "1") => {
  const t = document.createElement("span");
  t.style.visibility = "hidden", t.style.position = "absolute", t.style.whiteSpace = "pre", t.style.lineHeight = o, t.style.fontSize = n, t.textContent = e, document.body.appendChild(t);
  const r = t.clientWidth, l = t.clientHeight;
  return document.body.removeChild(t), { width: r, height: l };
}, w = (e) => {
  const n = new RegExp(`(^|&)${e}=([^&]*)(&|$)`, "i"), o = window.location.search.substring(1).match(n) ?? "";
  if (o.length > 2)
    return decodeURIComponent(o[2]);
}, S = (e, n) => {
  if (e || e === 0) {
    const o = typeof e == "number" ? String(e) : e;
    let t = "", r = "";
    return o.includes(".") ? (t = o.split(".")[0], r = o.split(".")[1]) : t = o, r || r === "0" ? t.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + r : t.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else
    return n || "--";
}, N = (e, n) => {
  let o, t;
  try {
    o = e.toString().split(".")[1].length;
  } catch {
    o = 0;
  }
  try {
    t = n.toString().split(".")[1].length;
  } catch {
    t = 0;
  }
  const r = Math.pow(10, Math.max(o, t));
  return (Number(i(e, r)) + Number(i(n, r))) / r;
}, y = (e, n) => {
  let o, t;
  try {
    o = e.toString().split(".")[1].length;
  } catch {
    o = 0;
  }
  try {
    t = n.toString().split(".")[1].length;
  } catch {
    t = 0;
  }
  const r = Math.pow(10, Math.max(o, t)), l = o >= t ? o : t;
  return ((Number(i(Number(e), Number(r))) - Number(i(Number(n), Number(r)))) / r).toFixed(l);
}, i = (e, n) => {
  if (e == null || n == null)
    return null;
  let o, t;
  try {
    o = e.toString().split(".")[1].length;
  } catch {
    o = 0;
  }
  try {
    t = n.toString().split(".")[1].length;
  } catch {
    t = 0;
  }
  const r = Number(e.toString().replace(".", "")), l = Number(n.toString().replace(".", ""));
  return r * l / Math.pow(10, o + t);
}, U = (e, n) => {
  if (e == null || n == null || n == 0)
    return null;
  let o, t;
  try {
    o = e.toString().split(".")[1].length;
  } catch {
    o = 0;
  }
  try {
    t = n.toString().split(".")[1].length;
  } catch {
    t = 0;
  }
  const r = Number(e.toString().replace(".", "")), l = Number(n.toString().replace(".", ""));
  return i(r / l, Math.pow(10, t - o));
}, x = (e) => {
  const n = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"], o = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿"];
  if (!e || isNaN(e))
    return "零";
  const t = e.toString().split("");
  let r = "";
  for (let l = 0; l < t.length; l++) {
    const c = t.length - 1 - l;
    r = o[l] + r;
    const a = t[c];
    r = n[a] + r;
  }
  return r = r.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十"), r = r.replace(/零+/g, "零"), r = r.replace(/零亿/g, "亿").replace(/零万/g, "万"), r = r.replace(/亿万/g, "亿"), r = r.replace(/零+$/, ""), r = r.replace(/^一十/g, "十"), r;
}, C = (e) => {
  let n = e === null ? "" : e + "";
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
    return "数据非法";
  let o = "千百拾亿千百拾万千百拾元角分", t = "";
  n += "00";
  let r = n.indexOf(".");
  r >= 0 && (n = n.substring(0, r) + n.substring(r + 1, 2)), o = o.substring(o.length - n.length);
  for (var l = 0; l < n.length; l++)
    t += "零壹贰叁肆伍陆柒捌玖".charAt(Number(n.charAt(l))) + o.charAt(l);
  return t.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}, M = (e, n) => {
  const o = [];
  for (let t = e; t <= n; t++)
    o.push(t);
  return o;
}, R = () => s() + s() + s() + s() + s() + s() + s() + s(), F = () => s() + s() + s() + s(), s = () => (Math.floor(Math.random() * 8999) + 1e3).toString();
export {
  p as FBlobHandler,
  u as FDownLoadHandler,
  w as FGetQueryParam,
  b as FLabelSizeCalculator,
  C as convertNumberToAmountInWords,
  x as convertToChinaNum,
  f as fileFormatSize,
  N as floatAdd,
  U as floatDivide,
  i as floatMultiply,
  y as floatSub,
  g as getFileExtension,
  d as handleFileChoose,
  M as makeRange,
  m as mapFileChunks,
  s as n4,
  F as randomNumber16,
  R as randomNumber32,
  S as thousandSeparation,
  h as transferFileToUrl
};
