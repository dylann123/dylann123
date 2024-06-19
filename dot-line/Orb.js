class Orb {
    constructor(x, y, direction, color = "#1b263b") {
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.direction = direction
        this.speed = 1
        this.defaultColor = color
        this.color = this.defaultColor
        this.maxConnections = 3
        this.maxConnectionDistance = 200
        this.maxConnectionSize = 12
        this.isBeingPulled = false
        this.pull = false
        this.density = 0.2
    }
    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke()
        ctx.fill()
    }
    update(canvas) {
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.direction = Math.PI - this.direction
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.direction *= -1
        }
        if (!this.isBeingPulled) {
            this.x += Math.cos(this.direction) * this.speed
            this.y += Math.sin(this.direction) * this.speed
        }
        this.colorCloseOrbs(255)
        this.moveAwayFromPoint(cursor.getX(), cursor.getY(), 200, this.pull)
        this.draw(canvas.getContext('2d'))
    }
    connect(orbArray, ctx) {
        let closest = [...orbArray]
        // sort orbs by distance to get closest
        for (let i = 0; i < closest.length; i++) {
            let minIndex = i;
            for (let j = i + 1; j < closest.length; j++) {
                if (this.distanceToPoint(closest[j].x, closest[j].y) < this.distanceToPoint(closest[minIndex].x, closest[minIndex].y)) {
                    minIndex = j
                }
            }
            let temp = closest[i]
            closest[i] = closest[minIndex]
            closest[minIndex] = temp
        }
        //
        for (let i = 1; i < this.maxConnections + 1; i++) {
            if (this.distanceToPoint(closest[i].x, closest[i].y) <= this.maxConnectionDistance && closest.length > i) {
                ctx.strokeStyle = this.color
                let lineScale = 1 
                    / (this.distanceToPoint(closest[i].x, closest[i].y) / 50) * 2
                if (lineScale > this.maxConnectionSize) lineScale = this.maxConnectionSize
                ctx.lineWidth = lineScale
                ctx.beginPath()
                ctx.moveTo(closest[i].x, closest[i].y)
                ctx.lineTo(this.x, this.y)
                ctx.stroke()
            }
        }
    }
    distanceToPoint(x2, y2) {
        return Math.sqrt(((this.y - y2) ** 2) + ((this.x - x2) ** 2))
    }
    colorCloseOrbs(distance) {
        let distanceToCursor = this.distanceToPoint(cursor.getX(), cursor.getY())
        if (distanceToCursor < distance) {
            let colorDifference = 255 - (distanceToCursor * (255 / distance))
            this.color = `rgba(${255 - colorDifference},${255 - colorDifference},${255 - colorDifference}, 0.3)`
        } else {
            this.color = this.defaultColor
        }
    }
    moveAwayFromPoint(x, y, maxDistance, reverse = false) {
        let distanceToPoint = this.distanceToPoint(x, y)
        if (distanceToPoint < maxDistance) {
            let angle = Math.atan2(y - this.y, x - this.x)
            if (reverse) {
                angle += Math.PI
            }
            let pullFactor = (maxDistance / distanceToPoint) % 10
            this.x -= ((Math.cos(angle) * this.speed) / this.density) * pullFactor
            this.y -= ((Math.sin(angle) * this.speed) / this.density) * pullFactor

            if (this.x - this.radius < 0) {
                this.x = this.radius
            }
            if (this.x + this.radius > canvas.width) {
                this.x = canvas.width - this.radius
            }
            if (this.y - this.radius < 0) {
                this.y = this.radius
            }
            if (this.y + this.radius > canvas.height) {
                this.y = canvas.height - this.radius
            }

        } else {
            this.isBeingPulled = false
        }

    }
}   