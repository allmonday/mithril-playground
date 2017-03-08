interface IUpload {
    filename: string,
    name: string
}

interface IUploaderModel {
    list: IUpload[]
    isEmpty: () => boolean
    next: () => IUpload
    add: (u: IUpload) => void 
}

let Upload: IUploaderModel = {
    list: [{
        filename: "a",
        name: "b"
    }],
    isEmpty: () => {
        return Upload.list.length === 0;
    },
    next: () => {
        let u = Upload.list.shift();
        return u;
    },
    add: (uobj) => {
        Upload.list.push(uobj);
    }
}

export {Upload, IUpload};