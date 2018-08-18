import m, { Component } from "mithril";
import hydro from "./hydro";

import css from "./index.css";
import "minireset.css";

const state = {};

hydro(document.getElementById("mount"), {
    view : (vnode) =>
        m("div", { class : css.component }, vnode.state.h1)
} as Component);
