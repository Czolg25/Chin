let xmlHttpRequest
let uuid
let content = ""

    function init() {
        content = ""
        let storage = window.localStorage;
        if (storage.getItem("Uuid") == null) storage.setItem("Uuid", this.getUuid())
        uuid = storage.getItem("Uuid")

        if (window.XMLHttpRequest) xmlHttpRequest = new XMLHttpRequest()
        else xmlHttpRequest = new ActiveXObject("MICROSOFT.XMLHTTP");

        sendMessageToServer("render", "")
        setInterval(function () {
            sendMessageToServer("render", "")
        }, 1000)
    }

    function sendMessageToServer(sendFunction, pararams) {
        try {
            xmlHttpRequest.open("GET", "server?uuid=" + uuid + pararams + "&function=" + sendFunction, true)
            xmlHttpRequest.onreadystatechange = receiveMessageFromServer;
            xmlHttpRequest.send();
        } catch (e) {

        }
    }

    function receiveMessageFromServer() {
        try {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                if(content != clearTag(xmlHttpRequest.response, "board")){
                    content = clearTag(xmlHttpRequest.response, "board")
                    document.body.innerHTML = clearTag(xmlHttpRequest.response, "board")
                }
            }
        } catch (e) {

        }
    }

    function clearTag(xml, tag) {
        return xml.split(tag)[1].replaceAll("*", "")
    }

    function randomInt() {
        return (Math.floor(Math.random() * 10)).toString()
    }

    function getUuid() {
        return randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()
            +randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()+randomInt()
    }

    function play() {
        let nick = document.getElementById("nick").value;
        if (nick == null) return
        if (nick == "") return;
        sendMessageToServer("addPlayer", "&nick=" + nick)
    }

    function losuj() {
        sendMessageToServer("random", "")
    }

    function ready() {
        sendMessageToServer("ready", "")
    }

    function move(button) {
        sendMessageToServer("move", "&idp=" + button.id)
    }