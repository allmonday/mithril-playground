document.addEventListener('DOMContentLoaded', function () {
    let clock = document.getElementById("clock");
    let textarea = document.getElementById("ta");
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
    clock.ondragstart = function (event) {
        console.log("drag start");
        let dt = event.dataTransfer;
        dt.setData("Text", Date() + '\n');
    }
    clock.ondragend = function (event) {
        console.log("drag end");
    }

    textarea.addEventListener("dragenter", function (e) {
        this.classList.add("hl");
        console.log("drag enter");
        e.preventDefault();
    });

    textarea.addEventListener("drop", function (e) {
        this.classList.remove("hl");
        console.log("drag drop");
        // e.preventDefault();
    });

    textarea.addEventListener("dragleave", function (e) {
        this.classList.remove("hl");
        console.log("drag leave");
    });

    textarea.addEventListener("dragover", function (e) {
        console.log("drag over");
        e.preventDefault();
    })

});