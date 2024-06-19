class Cursor {
    constructor(orbInstance) {
        this.x = 0;
        this.y = 0;
        this.orbInstance = orbInstance
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    init() {
        document.addEventListener("mousemove", (e) => {
            this.x = e.clientX;
            this.y = e.clientY;
        })
    }
}