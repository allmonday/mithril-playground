import * as m from "mithril";
import {Upload, IUpload} from "../model/Upload";

interface IUploadList {
    oninit: (vnode: any) => void
    view: (vnode: any) => void
}

let UploadList: IUploadList = {
    oninit: (vnode) => {
        let vm:any = vnode.state.vm = {
            handleFile: (evt:any) => {
                var files = evt.target.files;
                console.log(files)
            },
            setFilename: (f: string) => {
                vm.filename = f;
            },
            setName: (n: string) => {
                vm.name = n;
            },
            filename: "",
            name: "",
            add: (f:string, n:string) => {
                let u: IUpload = {
                    filename: f,
                    name: n
                }
                Upload.add(u);
                console.log(Upload.list);
            }
        }
    },
    view: (vnode) => {
        let vm = vnode.state.vm;
        return m("div.upload-list", [
            m("input[type=file]", {
                // oninput: m.withAttr("value", vm.setFilename),
                onchange: vm.handleFile
            }),
            m("input", {
                oninput: m.withAttr("value", vm.setName),
                value: vm.name
            }),
            m("button", {
                onclick: () => { 
                    vm.add(vm.filename, vm.name);
                    vm.filename = "";
                    vm.name = "";
                }
            }, "save"),
            m("ul", Upload.list.map((item, index) => {
                return m("li", {key: item.filename + item.name}, [
                    m("span", item.filename),
                    m("span", item.name)
                ])
            }))
        ])
    }
}

export {UploadList}