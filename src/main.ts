import Canvas from "./lib/canvas";
import Grid from "./lib/grid"

const canvas = new Canvas(document.querySelector("canvas")!);
const [WIDTH, HEIGHT] = canvas.dimensions();
canvas.clear()
const grid = new Grid(10, 10);
console.log('oni: grid is ', grid.grid)
// canvas.drawGrid(grid.grid);
const circles = [[100, 100, 30]];
canvas.circle(circles[0])
function updateGridDistance(grid: number[][], [x, y, r]: number[]) {
    const rowHeight = HEIGHT / grid.length;
    const colWidth = WIDTH / grid[0].length;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const distance = (r * r) / (Math.pow((j * colWidth) - x, 2) + Math.pow((i * rowHeight) - y, 2))
            grid[i][j] = Math.max(distance, grid[i][j])
        }
    }
    console.log("oni:", grid);

}
function fillGrid(grid: number[][], canvas: Canvas) {
    const rowHeight = HEIGHT / grid.length;
    const colWidth = WIDTH / grid[0].length;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] >= 1)
                canvas.rect(i * rowHeight, j * colWidth, rowHeight, colWidth)
        }
    }
}
updateGridDistance(grid.grid, circles[0])
fillGrid(grid.grid, canvas)
