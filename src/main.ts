import Canvas from "./lib/canvas";
import Grid from "./lib/grid"

const canvas = new Canvas(document.querySelector("canvas")!);
const [WIDTH, HEIGHT] = canvas.dimensions();
canvas.clear()
const res = 10
const grid = new Grid(10 * res, 10 * res);

const circles = [[100, 100, 30], [200, 200, 30], [100, 140, 40]];
const vel = [[0.2, 0.1], [-0.2, -0.2], [-0.2, -0.3]];
const MAG = 1

function updateGridDistance(grid: number[][], [x, y, r]: number[]) {
    const rowHeight = HEIGHT / grid.length;
    const colWidth = WIDTH / grid[0].length;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const distance = (r * r) / (Math.pow((j * colWidth) - x, 2) + Math.pow((i * rowHeight) - y, 2))
            grid[i][j] = Math.max(distance, grid[i][j])
        }
    }
}

function fillGrid(grid: number[][], canvas: Canvas) {
    const rowHeight = HEIGHT / grid.length;
    const colWidth = WIDTH / grid[0].length;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] >= 1)
                canvas.rect(j * colWidth, i * rowHeight, rowHeight, colWidth)
            // canvas.text(grid[i][j].toFixed(2), i * rowHeight + 10, j * colWidth + 10)
        }
    }
}

const updatePos = (circles: number[][]) => {
    circles.forEach((_, idx) => {
        circles[idx][0] += vel[idx][0] * MAG
        circles[idx][1] += vel[idx][1] * MAG
        if (circles[idx][0] >= WIDTH || circles[idx][0] <= 0) vel[idx][0] = -vel[idx][0]
        if (circles[idx][1] >= HEIGHT || circles[idx][1] <= 0) vel[idx][1] = -vel[idx][1]
    })
}
const drawContours = (pos: string, i: number, j: number, grid: number[][]) => {
    const rowHeight = HEIGHT / grid.length;
    const colWidth = WIDTH / grid[0].length;
    switch (pos) {
        case '0000':
            break;
        case '0001':
            canvas.line(j * colWidth, (i + 0.5) * rowHeight, (j + 0.5) * colWidth, (i + 1) * rowHeight)
            break;
        case '0010':
            canvas.line((j + 0.5) * colWidth, (i + 1) * rowHeight, (j + 1) * colWidth, (i + 0.5) * rowHeight)
            break;
        case '0011':
            canvas.line(j * colWidth, (i + 0.5) * rowHeight, (j + 1) * colWidth, (i + 0.5) * rowHeight)
            break;
        case '0100':
            canvas.line((j + 0.5) * colWidth, (i) * rowHeight, (j + 1) * colWidth, (i + 0.5) * rowHeight)
            break;
        case '0101':
            canvas.line((j) * colWidth, (i + 0.5) * rowHeight, (j + 0.5) * colWidth, (i) * rowHeight)
            canvas.line((j + 0.5) * colWidth, (i + 1) * rowHeight, (j + 1) * colWidth, (i + 0.5) * rowHeight)
            break;
        case '0110':
            canvas.line((j + 0.5) * colWidth, (i) * rowHeight, (j + 0.5) * colWidth, (i + 1) * rowHeight)
            break;
        case '0111':
            canvas.line((j) * colWidth, (i + 0.5) * rowHeight, (j + 0.5) * colWidth, (i) * rowHeight)
            break;
        case '1000':
            canvas.line((j) * colWidth, (i + 0.5) * rowHeight, (j + 0.5) * colWidth, (i) * rowHeight)
            break;
        case '1001':
            canvas.line((j + 0.5) * colWidth, (i) * rowHeight, (j + 0.5) * colWidth, (i + 1) * rowHeight)
            break;
        case '1010':
            canvas.line((j + 0.5) * colWidth, (i) * rowHeight, (j + 1) * colWidth, (i + 0.5) * rowHeight)
            canvas.line((j) * colWidth, (i + 0.5) * rowHeight, (j + 0.5) * colWidth, (i + 1) * rowHeight)
            break;
        case '1011':
            canvas.line((j + 0.5) * colWidth, (i) * rowHeight, (j + 1) * colWidth, (i + 0.5) * rowHeight)
            break;
        case '1100':
            canvas.line(j * colWidth, (i + 0.5) * rowHeight, (j + 1) * colWidth, (i + 0.5) * rowHeight)
            break;
        case '1101':
            canvas.line((j + 0.5) * colWidth, (i + 1) * rowHeight, (j + 1) * colWidth, (i + 0.5) * rowHeight)
            break;
        case '1110':
            canvas.line(j * colWidth, (i + 0.5) * rowHeight, (j + 0.5) * colWidth, (i + 1) * rowHeight)
            break;
        case '1111':
            break;
    }
}
const marchSquare = (grid: number[][]) => {
    for (let i = 0; i < grid.length - 1; i++) {
        for (let j = 0; j < grid[0].length - 1; j++) {
            const pos = `${Number(grid[i][j] >= 1)}${Number(grid[i][j + 1] >= 1)}${Number(grid[i + 1][j + 1] >= 1)}${Number(grid[i + 1][j] >= 1)}`
            drawContours(pos, i, j, grid)
        }
    }

}

function loop() {
    canvas.clear();
    // canvas.drawGrid(grid.grid)
    // circles.forEach(circle => canvas.circle(circle));
    circles.forEach(circle => updateGridDistance(grid.grid, circle))
    updatePos(circles)
    // fillGrid(grid.grid, canvas)
    marchSquare(grid.grid)
    grid.reset()
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
// canvas.clear();
// canvas.drawGrid(grid.grid)
// for (let i = 0; i < 16; i++) {
//     const s = i.toString(2).padStart(4, '0');
//     drawContours(s, i + 1, 2, grid.grid)
//
// }
