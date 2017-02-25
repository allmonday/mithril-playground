import * as m from "mithril";
import {User} from "./model/User";
import {UserList} from "./view/UserList";
import {UserForm} from "./view/UserForm";
import {Layout} from "./view/Layout";
// m.mount(document.body, UserList)

m.route(document.body, "/list", {
    "/list": {
        render: function () {
            return m(Layout, m(UserList))
        }
    },
    "/edit/:id": {
        render: function (vnode) {
            return m(Layout, m(UserForm, vnode.attrs))
        }
    }
})