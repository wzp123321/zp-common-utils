import c from "spark-md5";
const u = (t, o = !1) => new Promise((s) => {
  const e = document.createElement("input");
  e.multiple = o, e.type = "file", t && (e.accept = t), e.click(), e.onchange = () => {
    e.files && s([...e.files]), e.remove();
  };
}), p = (t) => {
  let o = null;
  return window.createObjectURL != null ? o = window.createObjectURL(t) : window.URL != null ? o = window.URL.createObjectURL(t) : window.webkitURL != null && (o = window.webkitURL.createObjectURL(t)), o;
}, w = (t, o) => new Promise((s, e) => {
  if (t.size) {
    const n = new FileReader();
    t.type.includes("json") ? (n.onloadend = (r) => {
      var l;
      const i = JSON.parse((l = r.target) == null ? void 0 : l.result);
      e((i == null ? void 0 : i.message) ?? "未知原因");
    }, n.readAsText(t)) : (n.onloadend = (r) => {
      var i;
      d((i = r.target) == null ? void 0 : i.result, o).then(() => s()).catch((l) => e(l));
    }, n.readAsDataURL(t));
  } else
    e(`无法获取${o || "文件"}`);
}), d = (t, o) => new Promise((s, e) => {
  if (t) {
    const n = document.createElement("a");
    n.href = t, o && (n.download = o), n.click(), s(), n.remove();
  } else
    e(`无法下载${o || "文件"}`);
}), h = (t) => new Promise((o) => {
  if (!t) {
    o(null);
    return;
  }
  const s = new FileReader(), e = new c.ArrayBuffer();
  s.readAsArrayBuffer(t), s.onload = (n) => {
    e.append(n.target.result);
    const r = e.end();
    o(r);
  };
}), m = (t) => {
  const s = Math.ceil(t.size / 10485760), e = [];
  for (let n = 0; n < s; n++) {
    const r = n * 10485760, i = Math.min(r + 10485760, t.size), l = t.slice(r, i);
    e.push({
      index: n,
      data: l
    });
  }
  return e;
}, f = (t, o = "14px", s = "1") => {
  const e = document.createElement("span");
  e.style.visibility = "hidden", e.style.position = "absolute", e.style.whiteSpace = "pre", e.style.lineHeight = s, e.style.fontSize = o, e.textContent = t, document.body.appendChild(e);
  const n = e.clientWidth, r = e.clientHeight;
  return document.body.removeChild(e), { width: n, height: r };
}, U = (t, o) => {
  if (t || t === 0) {
    const s = typeof t == "number" ? String(t) : t;
    let e = "", n = "";
    return s.includes(".") ? (e = s.split(".")[0], n = s.split(".")[1]) : e = s, n || n === "0" ? e.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + n : e.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else
    return o || "--";
};
export {
  w as FBlobHandler,
  d as FDownLoadHandler,
  f as FLabelSizeCalculator,
  u as handleFileChoose,
  m as mapFileChunks,
  h as mapFileMD5,
  U as thousandSeparation,
  p as transferFileToUrl
};
