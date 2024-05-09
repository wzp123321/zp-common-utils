const d = (t, s = !1) => new Promise((o) => {
  const e = document.createElement("input");
  e.multiple = s, e.type = "file", t && (e.accept = t), e.click(), e.onchange = () => {
    e.files && o([...e.files]), e.remove();
  };
}), a = (t) => {
  let s = null;
  return window.createObjectURL != null ? s = window.createObjectURL(t) : window.URL != null ? s = window.URL.createObjectURL(t) : window.webkitURL != null && (s = window.webkitURL.createObjectURL(t)), s;
}, u = (t, s) => new Promise((o, e) => {
  if (t.size) {
    const n = new FileReader();
    t.type.includes("json") ? (n.onloadend = (i) => {
      const r = JSON.parse(i.target?.result);
      e(r?.message ?? "未知原因");
    }, n.readAsText(t)) : (n.onloadend = (i) => {
      c(i.target?.result, s).then(() => o()).catch((r) => e(r));
    }, n.readAsDataURL(t));
  } else
    e(`无法获取${s || "文件"}`);
}), c = (t, s) => new Promise((o, e) => {
  if (t) {
    const n = document.createElement("a");
    n.href = t, s && (n.download = s), n.click(), o(), n.remove();
  } else
    e(`无法下载${s || "文件"}`);
}), h = (t) => {
  const o = Math.ceil(t.size / 10485760), e = [];
  for (let n = 0; n < o; n++) {
    const i = n * 10485760, r = Math.min(i + 10485760, t.size), l = t.slice(i, r);
    e.push({
      index: n,
      data: l
    });
  }
  return e;
}, w = (t, s = "14px", o = "1") => {
  const e = document.createElement("span");
  e.style.visibility = "hidden", e.style.position = "absolute", e.style.whiteSpace = "pre", e.style.lineHeight = o, e.style.fontSize = s, e.textContent = t, document.body.appendChild(e);
  const n = e.clientWidth, i = e.clientHeight;
  return document.body.removeChild(e), { width: n, height: i };
}, p = (t, s) => {
  if (t || t === 0) {
    const o = typeof t == "number" ? String(t) : t;
    let e = "", n = "";
    return o.includes(".") ? (e = o.split(".")[0], n = o.split(".")[1]) : e = o, n || n === "0" ? e.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + n : e.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else
    return s || "--";
};
export {
  u as FBlobHandler,
  c as FDownLoadHandler,
  w as FLabelSizeCalculator,
  d as handleFileChoose,
  h as mapFileChunks,
  p as thousandSeparation,
  a as transferFileToUrl
};
