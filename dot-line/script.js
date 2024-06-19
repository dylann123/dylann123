const canvas = document.getElementsByTagName("canvas")[0]
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const orbCount = 100;

let orbInstance = new OrbEnvironment(orbCount, canvas, ctx)

orbInstance.start()

let cursor = new Cursor()
cursor.init(orbInstance)

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})