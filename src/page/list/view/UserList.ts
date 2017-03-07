/// reference types="./node_modules/mithril/mithri.d.ts"/>
import * as m from "mithril";
import {User} from "../model/User";
import * as _ from "lodash";

interface UserListInterface {
    oninit: (vnode: any) => void,
    view: (vnode: any) => void
}

let UserList:UserListInterface = {
    oninit: (vnode) => {
        User.loadList()
        let vm:any = vnode.state.vm = {
            selected: function () {
                return User.list
                    .filter((item: any) => { return item.checked;})
                    .map((item:any) => { return item.id; })
            },
            allChecked: false,
            trigger: function(id: number, action: boolean) {
                User.list[id].checked = action;
                vm.allChecked = _.every(User.list, {'checked': true});
            },
            triggerAll: function (items: any[], action: boolean) {
                vm.allChecked = action;
                User.list.map((item: any) => {
                    item.checked = action;
                })
            }
        } 
    },
    view: function (vnode) {
        let vm = vnode.state.vm;
        return m("div#container", [
            m("table", [
                m("thead", [
                    m("th", m("input", {
                        type: "checkbox", 
                        checked: vm.allChecked? "checked": "",
                        onchange: m.withAttr("checked", vm.triggerAll.bind(null, User.list)),
                    })),
                    m("th", "id"),
                    m("th", "name"),
                ]),
                m("tbody", User.list.map(function(user: any) {
                        return m("tr", [
                            m("th", [
                                m("input", {
                                    type: "checkbox", 
                                    checked: user.checked? "checked": "", 
                                    onchange: m.withAttr("checked", vm.trigger.bind(null, user.id))
                             }),
                            ]),
                            m("th", [
                                m("span", user.id)
                            ]),
                            m("th", [
                                m("span",user.firstName + " " + user.lastName),
                            ])
                        ])
                    })
                ),
            ]),
            m("p", vm.selected().join(","))
        ])
    }
}

export {UserList}; 
