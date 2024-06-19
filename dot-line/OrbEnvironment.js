class OrbEnvironment {
    constructor(count, canvas, ctx) {
        this.orbs = []
        this.count = count
        this.interval = null
        this.msPerTick = 1000 / 60
        this.canvas = canvas
        this.ctx = ctx
    }

    initializeOrbs() {
        for (let i = 0; i < this.count; i++) {
            this.orbs[i] = new Orb(
                Math.floor(Math.random() * canvas.width),
                Math.floor(Math.random() * canvas.height),
                Math.random() * 2 * Math.PI,
                "#1b263b"
            )
        }
        console.log(this.orbs);
    }

    tick() {
        ctx.clearRect(0, 0, document.getElementsByTagName("canvas")[0].width, document.getElementsByTagName("canvas")[0].height)
        for (let orb = 0; orb < this.orbs.length; orb++) {
            this.orbs[orb].update(this.canvas)
            this.orbs[orb].connect(this.orbs, this.ctx)
        }
    }

    start() {
        this.initializeOrbs()

        this.interval = setInterval(() => {
            this.tick()
        }, this.msPerTick);
    }

    stop() {
        clearInterval(this.interval)
    }

    makeRandomColor() {
        let c = '';
        while (c.length < 6) {
            c += (Math.random()).toString(16).substr(-6).substr(-1)
        }
        return '#' + c;
    }
}