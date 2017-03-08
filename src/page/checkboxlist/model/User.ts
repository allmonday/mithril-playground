/// reference types="./node_modules/mithril/mithri.d.ts"/>
import * as m from "mithril";

interface UserInterface {
    list: any[],
    loadList: () => PromiseLike<any>
};

let User: UserInterface = {
    list : [],
    loadList : function() {
        return m.request({
                method: "GET",
                url: "http://rem-rest-api.herokuapp.com/api/users",
                withCredentials: true,
            })
            .then(function(result: any) {
                User.list = result.data.map((item: any, index: number) => {
                    item.id = index;
                    item.checked = false;
                    return item;
                })
            })
        },
}


export {User};
