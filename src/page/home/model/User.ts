/// reference types="./node_modules/mithril/mithri.d.ts"/>
import * as m from "mithril";

interface UserInterface {
    list: any[],
    loadList: () => PromiseLike<any>
    current: any,
    load: (id:Number) => PromiseLike<any>,
    save: () => PromiseLike<any>
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
                User.list = result.data
            })
        },
    current: {},
    load: function(id) {
        return m.request({
            method: "GET",
            url: "http://rem-rest-api.herokuapp.com/api/users/:id",
            data: {id: id},
            withCredentials: true,
        })
        .then(function(result: any) {
            User.current = result
        })
    },
    save: function() {
        return m.request({
            method: "PUT",
            url: "http://rem-rest-api.herokuapp.com/api/users/:id",
            data: User.current,
            withCredentials: true,
        })
    }
}


export {User};
