class Input {
    
    static init() {
        window.addEventListener("keydown", this.keydownEvent);
        window.addEventListener("keyup", this.keyupEvent);
        window.addEventListener("blur", this.keyupEvent);
    }

    static keydownEvent(e) {
        switch (e.keyCode) {
            case 38: //UP
            case 87: //W
                Input.key.up = true;
                break;
            case 37: //LEFT
            case 65: //A
                Input.key.left = true;
                break;
            case 39: //RIGHT
            case 68: //D
                Input.key.right = true;
                break;
        }
    }
    
    static keyupEvent(e) {
        switch (e.keyCode) {
            case 38: //UP
            case 87: //W
                Input.key.up = false;
                break;
            case 37: //LEFT
            case 65: //A
                Input.key.left = false;
                break;
            case 39: //RIGHT
            case 68: //D
                Input.key.right = false;
                break;
        }
    }
}

Input.key = {
    down:false,
    up:false,
    left:false,
    right:false
};
