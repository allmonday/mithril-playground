import * as m from "mithril";
import {UserList} from "./view/UserList";

let mountPoint:HTMLElement = document.getElementById("app-mount");
m.route(mountPoint, "/list", {
    "/list": {
        render: function () {
            return m(UserList);
        }
    }
})