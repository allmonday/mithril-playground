import * as $ from "jquery";

class PlaceHolder {
    currentNode: Node = null;
    currentStateTop: boolean;
    prevState: boolean = null;
    constructor(node: Node | null, istop: boolean | null) {
        this.currentNode = node;
        this.currentStateTop = istop;
    }
    stateChanged():boolean {
        return this.currentStateTop !== this.prevState;
    }
    setState(istop: boolean): void {
        this.prevState = this.currentStateTop;
        this.currentStateTop = istop;
    }
    setNode(node: Node): void {
        this.currentNode = node;
    }
    isSameNode(node: Node): boolean {
        return this.currentNode.isSameNode(node);
    }
    isDifferentNode(node: Node): boolean {
        if (!this.currentNode) {
            return true;
        }
        return !this.currentNode.isSameNode(node);
    }
    createPlaceHolder(): Node {
        let placeHolder = document.createElement("div");
        placeHolder.classList.add("default-block"); 
        return placeHolder;
    }
    removeNode(): void {
        if (!this.currentNode) return;
        this.currentNode.parentNode.removeChild(this.currentNode);
        this.currentNode = null;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    let ph = new PlaceHolder(null, null);

    let clock = document.getElementById("clock");
    let textarea = $(".target");
    let icon = new Image();
    icon.src = "http://www.duokan.com/static/lib/images/logo.png?dfa4300d2cfb2df4caf5c816f70bf72f"

    function displayTime() {
        let now = new Date();
        let hrs = now.getHours(),
            mins = now.getMinutes(),
            minString: string = "",
            hrString: string = hrs.toString();
        if (mins < 10) {
            minString = "0" + mins.toString();
        } else {
            minString = mins.toString();
        }
        clock.innerHTML = hrString + ":" + minString;
        setTimeout(displayTime, 60000);
    }

    displayTime();

    clock.draggable = true;
    $(document).on("dragenter", ".target", function (e: any) {
    });

    clock.ondragstart = function (event) {
        console.log("drag start");
        let dt = event.dataTransfer;
        dt.setData("Text", Date() + '\n');
    }
    clock.ondragend = function (event) {
        console.log("drag end");
    }

    document.addEventListener("dragenter", function (e) {
        e.preventDefault();
    })

    document.addEventListener("dragleave", function(e) {
        let target = <HTMLElement>e.target;
        let classList = (<HTMLElement>e.target).classList;
        if(classList.contains("target")) {
            console.log("drag leave");
        }
        if (classList.contains("block-group")) {
            console.log("group leave");
            ph.removeNode();
        }
        e.preventDefault();
    })

    document.addEventListener("dragover", function(e) {
        let target = <HTMLElement>e.target;
        let parentNode = target.parentNode;
        let classList = target.classList;

        if(classList.contains("target")) {
            let topHalf = isAbove(e);
            ph.setState(topHalf);

            try {
                if (ph.stateChanged()) {
                    if (topHalf) {
                        if (ph.isDifferentNode(target.previousSibling)) {
                            let placeholder = ph.createPlaceHolder();
                            parentNode.insertBefore(placeholder, target);
                            ph.removeNode();
                            ph.setNode(placeholder);
                        } else { 
                            throw("nothing");
                        }
                    } else {
                        let nextSibling = target.nextSibling;
                        if (nextSibling) {
                            if (ph.isDifferentNode(nextSibling)) {
                                let placeholder = ph.createPlaceHolder();
                                parentNode.insertBefore(placeholder, nextSibling)
                                ph.removeNode();
                                ph.setNode(placeholder);
                            } else {
                                throw("nothing");
                            }
                        } else {
                            if (ph.isDifferentNode(nextSibling)) {
                                let placeholder = ph.createPlaceHolder();
                                parentNode.appendChild(placeholder);
                                ph.removeNode();
                                ph.setNode(placeholder);
                            }
                        }
                    }
                } 
            } catch (e) {

            } finally {
                console.log("preventDefault")
                e.preventDefault();
            }
        }
    })

    document.addEventListener("drop", function(e) {
        let classList = (<HTMLElement>e.target).classList;
        if(classList.contains("target")) {
            console.log("drag drop");
        }
    })

    function isAbove(e: DragEvent): boolean {
        let mouseY = e.offsetY,
            clientHeight = (<HTMLElement>e.target).clientHeight,
            middle = clientHeight / 2;
        return mouseY <= middle;
    }
});