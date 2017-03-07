import * as m from "mithril";
import {UserList} from "./view/UserList";


m.route(document.body, "/list", {
    "/list": {
        render: function () {
            return m(UserList);
        }
    }
})