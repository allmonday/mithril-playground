import * as m from "mithril"
import {User} from "../model/User";

interface UserFormInterface {
    oninit: (a:any) => void,
    view: () => void
}

let UserForm: UserFormInterface = {
    oninit: function (vnode) { User.load(vnode.attrs.id) },
    view: function () {
        return m("form", [
            m("label.label", "First name"),
            m("input.input[type=text][placeholder=First name]", {
                oninput: m.withAttr("value", function(value) {User.current.firstName = value}),
                value: User.current.firstName,
            }),
            m("label.label", "Last name"),
            m("input.input[placeholder=Last name]", {
                oninput: m.withAttr("value", function(value) {User.current.lastName = value}),
                value: User.current.lastName
            }),
            m("button.button[type=submit]", {
                onclick: User.save
            }, "Save"),
        ])
    }
}

export {UserForm}