const canvas = document.querySelector('#canvas');
let c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// mouse object 
const mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    reUpdateCircle()

})

// circle function
function Circle(x, y, radius, dx, dy, circleCol) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.constRadius = this.radius
    this.dx = dx;
    this.dy = dy;
    this.color = circleCol;
    this.area = 50;
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill()
    }
    this.update = function() {
        
        if (this.y > canvas.height - this.radius || this.y < this.radius) {
            this.dy = -this.dy
        }
        if (this.x > canvas.width - this.radius|| this.x < this.radius) {
            this.dx = -this.dx
        }
        this.x += this.dx
        this.y += this.dy

        // update on mouse move
        if (this.x - mouse.x > -50 && this.x - mouse.x < 50 && this.y - mouse.y > -50 && this.y - mouse.y < 50) {

            if (this.radius < 50 && this.radius < this.constRadius ) {
                this.radius ++
            }
        } else if (this.radius > 2){
            this.radius --
        }
        this.draw()
    }
}
// circle max speed
const maxSpeed = 5;
// circle min speed
const minSpeed = 5;
// max radius
const maxRadius = 30;
// minimum radius
const minRadius = 10;
// array of circle objects
let circleArr = []
let colorArr = [
     "hsl(7, 88%, 39%)",
     "hsl(69, 88%, 39%)",
     "hsl(113, 88%, 39%)",
     "hsl(182, 88%, 39%)",
     "hsl(241, 88%, 39%)",
     "hsl(278, 88%, 39%)",
     "hsl(318, 88%, 39%)",
]
function reUpdateCircle() {
     circleArr = []
    // color array 
    // many circle
    for (let i = 0; i < 800; i++) {
        let radius = Math.random() * maxRadius + minRadius
        let x = Math.random() * (canvas.width - 2 * radius) + radius ;
        let y = Math.random() * (canvas.height - 2 * radius) + radius;
        let dx = ((Math.random() - 0.5) * maxSpeed) ;
        let dy = ((Math.random() - 0.5)  * maxSpeed) ;
        const randomCol = Math.floor(Math.random() * colorArr.length)
        const circleCol = colorArr[randomCol]
        circleArr.push(new Circle(x, y, radius, dx, dy, circleCol))
    }
}

// animate function
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate);
    circleArr.forEach(item => {
        item.update()
    })
}
reUpdateCircle()
animate()