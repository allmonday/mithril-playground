/// reference types="./node_modules/mithril/mithri.d.ts"/>
import * as m from "mithril";
import {User} from "../model/User";

interface UserListInterface {
    oninit: () => PromiseLike<any>,
    view: () => void
}

let UserList:UserListInterface = {
    oninit: User.loadList,
    view: function () {
        return m(".user-list", User.list.map(function(user: any) {
            return m("a.user-list-item", {href: "/edit/" + user.id, oncreate: m.route.link}, user.firstName + " " + user.lastName)

        }))
    }
}

export {UserList}; 
