var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src = 'dino.png';

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'green';
        ctx.drawImage(img2, this.x, this.y);
    }
}

var img1 = new Image();
img1.src = 'cactus.png';

class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.drawImage(img1, this.x, this.y);
    }
}

var timer = 0;
var cactus여러개 = [];
var 점프timer = 0;
var animation;
var 점프중 = false;

function 프레임마다실행할거() {
    animation = requestAnimationFrame(프레임마다실행할거);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 장애물 생성 속도 3배 더 빠르게 (67 -> 22)
    if (timer % 22 === 0) {
        var cactus = new Cactus();
        cactus여러개.push(cactus);
    }

    cactus여러개.forEach((a, i, o) => {
        if (a.x < 0) {
            o.splice(i, 1);
        }
        // 장애물 이동 속도 3배 더 빠르게 (3px -> 9px)
        a.x -= 9;

        충돌하냐(dino, a);
        a.draw();
    });

    // 점프 속도 3배 더 빠르게 (4.5 -> 13.5)
    if (점프중) {
        dino.y -= 13.5;
        점프timer++;
    }

    // 착지 속도 3배 더 빠르게 (4.5 -> 13.5)
    if (!점프중) {
        if (dino.y < 200) {
            dino.y += 13.5;
        }
    }

    if (점프timer > 11) { // 33/3 = 11
        점프중 = false;
        점프timer = 0;
    }

    dino.draw();
}

프레임마다실행할거();

function 충돌하냐(dino, cactus) {
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);
    if (x축차이 < 0 && y축차이 < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        점프중 = true;
    }
});
