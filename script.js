var colors = ['blue', 'green', 'white', 'yellow', 'orange', 'red'];
var pieces = document.getElementsByClassName('piece');
const faceMap = ['L', 'R', 'U', 'D', 'B', 'F'];
let cube;

function mx(i, j) {
    return ([2, 4, 3, 5][j % 4 | 0] + i % 2 * ((j | 0) % 4 * 2 + 3) + 2 * (i / 2 | 0)) % 6;
}

function getAxis(face) {
    return String.fromCharCode('X'.charCodeAt(0) + face / 2);
}

function assembleCube() {
    function moveto(face) {
        id = id + (1 << face);
        pieces[i].children[face].appendChild(document.createElement('div'))
            .setAttribute('class', 'sticker ' + colors[face]);
        return 'translate' + getAxis(face) + '(' + (face % 2 * 4 - 2) + 'em)';
    }

    for (var id, x, i = 0; id = 0, i < 26; i++) {
        x = mx(i, i % 18);
        pieces[i].style.transform =
            'rotateX(0deg)' +
            moveto(i % 6) +
            (i > 5 ? moveto(x) + (i > 17 ? moveto(mx(x, x + 2)) : '') : '');
        pieces[i].setAttribute('id', 'piece' + id);
    }
}

function getPieceBy(face, index, corner) {
    return document.getElementById(
        'piece' +
        ((1 << face) +
            (1 << mx(face, index)) +
            (1 << mx(face, index + 1)) * corner)
    );
}

function swapPieces(face, times) {
    for (var i = 0; i < 6 * times; i++) {
        var piece1 = getPieceBy(face, i / 2, i % 2);
        var piece2 = getPieceBy(face, i / 2 + 1, i % 2);

        for (var j = 0; j < 5; j++) {
            var sticker1 = piece1.children[j < 4 ? mx(face, j) : face].firstChild;
            var sticker2 = piece2.children[j < 4 ? mx(face, j + 1) : face].firstChild;
            var className = sticker1 ? sticker1.className : '';

            if (className) {
                sticker1.className = sticker2.className;
                sticker2.className = className;
            }
        }
    }
}

function animateRotation(face, cw, currentTime) {
    var k = 0.3 * (face % 2 * 2 - 1) * (2 * cw - 1);
    var qubes = Array(9).fill(pieces[face]).map(function (value, index) {
        return index ? getPieceBy(face, Math.floor(index / 2), index % 2) : value;
    });

    (function rotatePieces() {
        var passed = Date.now() - currentTime;
        var style = 'rotate' + getAxis(face) + '(' + k * passed * (passed < 300 ? 1 : 0) + 'deg)';

        qubes.forEach(function (piece) {
            piece.style.transform = piece.style.transform.replace(/rotate[XYZ]\([^)]+\)/, style);
        });

        if (passed >= 300) {
            swapPieces(face, 3 - 2 * cw);
            if (cube) {
                let faceLetter = faceMap[face];
                cube.rotate(faceLetter);
                console.log("Rotated Face:", faceLetter);
                console.log("Current Cube State:", cube.toSvgString());
            }
            return;
        }
        requestAnimationFrame(rotatePieces);
    })();
}

function mousedown(md_e) {
    var startXY = pivot.style.transform.match(/-?\d+\.?\d*/g).map(Number);
    var element = md_e.target.closest('.element');
    if (!element) return; // prevent errors if click outside
    var face = [].indexOf.call(element.parentNode.children, element);

    function mousemove(mm_e) {
        if (element) {
            var gid = /\d/.exec(document.elementFromPoint(mm_e.pageX, mm_e.pageY).id);
            if (gid && gid.input.includes('anchor')) {
                mouseup();
                var e = element.parentNode.children[mx(face, Number(gid) + 3)].hasChildNodes();
                animateRotation(mx(face, Number(gid) + 1 + 2 * e), e, Date.now());
            }
        } else {
            pivot.style.transform =
                'rotateX(' + (startXY[0] - (mm_e.pageY - md_e.pageY) / 2) + 'deg)' +
                'rotateY(' + (startXY[1] + (mm_e.pageX - md_e.pageX) / 2) + 'deg)';
        }
    }

    function mouseup() {
        document.body.appendChild(guide);
        scene.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        scene.addEventListener('mousedown', mousedown);
    }

    (element || document.body).appendChild(guide);
    scene.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    scene.removeEventListener('mousedown', mousedown);
}

document.ondragstart = function () {
    return false;
};

window.addEventListener('load', () => {
    assembleCube();

    cube = new Cube();

    console.log("Initial Cube State:");
    console.log(cube.toSvgString());

    scene.addEventListener('mousedown', mousedown);
});

class Cube {
    constructor() {
        this.faces = {
            U: Array(9).fill('w'),
            D: Array(9).fill('y'),
            F: Array(9).fill('g'),
            B: Array(9).fill('b'),
            L: Array(9).fill('o'),
            R: Array(9).fill('r')
        };
        this.moves = [];
    }

    rotate(face) {
        this.moves.push(face);
    }

    scramble(steps = 20) {
        const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
        for (let i = 0; i < steps; i++) {
            const randFace = faces[Math.floor(Math.random() * faces.length)];
            this.rotate(randFace);
        }
    }

    solve() {
        const reversed = [...this.moves].reverse();
        reversed.forEach((move, i) => {
            this.rotate(move);
            console.log(`Step ${i + 1}: Undo move ${move}`);
            console.log(this.toSvgString());
        });
    }

    toSvgString() {
        return (
            this.faces.U.join('') +
            this.faces.R.join('') +
            this.faces.F.join('') +
            this.faces.D.join('') +
            this.faces.L.join('') +
            this.faces.B.join('')
        );
    }
}

