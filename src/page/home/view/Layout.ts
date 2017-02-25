import * as m from "mithril";

interface LayoutInterface {
    view: (a: any) => any
}

let Layout: LayoutInterface = {
    view: function(vnode) {
        return m("main.layout", [
            m("nav.menu", [
                m("a[href='/list']", {oncreate: m.route.link}, "Users")
            ]),
            m("section", vnode.children)
        ])
    }
}

export {Layout}