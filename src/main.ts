import Canvas from "./lib/canvas";
import Grid from "./lib/grid"
function init() {
    const elementRef = document.querySelector("canvas")!
    elementRef.width = window.innerWidth
    elementRef.height = window.innerHeight
    const canvas = new Canvas(elementRef!);
    let colorPointer = 0;
    const colors = [
        "#FF6600",
        "#00FF00",
        "#9900FF",
        "#33FF00",
        "#CC00FF",
        "#0062FF",
        "#FD1C03",
        "#FFFF00",
        "#E6FB04",
        "#FFFF33",
        "#9D00FF",
        "#FF0099",
        "#099FFF",
        "#00FF33",
        "#00FF66",
        "#FF3300",
        "#FF00FF",
        "#FF00CC",
        "#CC00FF",
        "#6E0DD0",
        "#FF0000",
        "#00FFFF",
        "#0033FF",
        "#F2EA02",
    ]

    canvas.strokeColor(colors[colorPointer])
    const [WIDTH, HEIGHT] = canvas.dimensions();
    canvas.clear()
    const res = 20
    const grid = new Grid(10 * res, 10 * res);

    const circles: number[][] = []
    const vel: number[][] = []

    for (let i = 0; i < 10; i++) {
        circles.push([WIDTH / 2, HEIGHT / 2, 50 + Math.random() * 30])
        vel.push([Math.random() - 0.5, Math.random() - 0.5])
    }

    const MAG = 1

    function updateGridDistance(grid: number[][], [x, y, r]: number[]) {
        const rowHeight = HEIGHT / grid.length;
        const colWidth = WIDTH / grid[0].length;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                const distance = (r * r) / (Math.pow((j * colWidth) - x, 2) + Math.pow((i * rowHeight) - y, 2))
                grid[i][j] = distance + grid[i][j]
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
            const radius = circles[idx][2]
            if (circles[idx][0] >= WIDTH - radius || circles[idx][0] <= radius) {
                vel[idx][0] = -vel[idx][0]
                colorPointer += 1
                colorPointer %= colors.length
                canvas.strokeColor(colors[colorPointer])
            }
            if (circles[idx][1] >= HEIGHT - radius || circles[idx][1] <= radius) {
                vel[idx][1] = -vel[idx][1]
                colorPointer += 1
                colorPointer %= colors.length
                canvas.strokeColor("#F00000")
                canvas.strokeColor(colors[colorPointer])
            }
        })
    }
    const drawContours = (i: number, j: number, grid: number[][]) => {
        const pos = `${Number(grid[i][j] >= 1)}${Number(grid[i][j + 1] >= 1)}${Number(grid[i + 1][j + 1] >= 1)}${Number(grid[i + 1][j] >= 1)}`
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

    const drawContoursInterpolate = (i: number, j: number, grid: number[][]) => {
        const pos = `${Number(grid[i][j] >= 1)}${Number(grid[i][j + 1] >= 1)}${Number(grid[i + 1][j + 1] >= 1)}${Number(grid[i + 1][j] >= 1)}`
        const rowHeight = HEIGHT / grid.length;
        const colWidth = WIDTH / grid[0].length;

        switch (pos) {
            case '0000':
                break;
            case '0001':
                {
                    let qy = (1 - grid[i][j]) / (grid[i + 1][j] - grid[i][j]);
                    let px = (1 - grid[i + 1][j]) / (grid[i + 1][j + 1] - grid[i + 1][j]);
                    canvas.line(j * colWidth, (i + qy) * rowHeight, (j + px) * colWidth, (i + 1) * rowHeight)
                }
                break;
            case '0010':
                {
                    let qy = (1 - grid[i][j + 1]) / (grid[i + 1][j + 1] - grid[i][j + 1]);
                    let px = (1 - grid[i + 1][j]) / (grid[i + 1][j + 1] - grid[i + 1][j]);
                    canvas.line((j + px) * colWidth, (i + 1) * rowHeight, (j + 1) * colWidth, (i + qy) * rowHeight)
                }
                break;
            case '0011':
                {
                    let qy = (1 - grid[i][j + 1]) / (grid[i + 1][j + 1] - grid[i][j + 1]);
                    let px = (1 - grid[i][j]) / (grid[i + 1][j] - grid[i][j]);
                    canvas.line(j * colWidth, (i + px) * rowHeight, (j + 1) * colWidth, (i + qy) * rowHeight)
                }
                break;
            case '0100':
                {
                    let qy = (1 - grid[i][j + 1]) / (grid[i + 1][j + 1] - grid[i][j + 1]);
                    let px = (1 - grid[i][j]) / (grid[i][j + 1] - grid[i][j]);
                    canvas.line((j + px) * colWidth, (i) * rowHeight, (j + 1) * colWidth, (i + qy) * rowHeight)
                }
                break;
            case '0101':
                {
                    let qy = (1 - grid[i][j]) / (grid[i + 1][j] - grid[i][j]);
                    let px = (1 - grid[i][j]) / (grid[i][j + 1] - grid[i][j]);
                    canvas.line((j) * colWidth, (i + qy) * rowHeight, (j + px) * colWidth, (i) * rowHeight)
                }
                {
                    let qy = (1 - grid[i][j + 1]) / (grid[i + 1][j + 1] - grid[i][j + 1]);
                    let px = (1 - grid[i + 1][j]) / (grid[i + 1][j + 1] - grid[i + 1][j]);
                    canvas.line((j + px) * colWidth, (i + 1) * rowHeight, (j + 1) * colWidth, (i + qy) * rowHeight)
                }
                break;
            case '0110':
                {
                    let qy = (1 - grid[i + 1][j]) / (grid[i + 1][j + 1] - grid[i + 1][j]);
                    let px = (1 - grid[i][j]) / (grid[i][j + 1] - grid[i][j]);
                    canvas.line((j + px) * colWidth, (i) * rowHeight, (j + qy) * colWidth, (i + 1) * rowHeight)
                }
                break;
            case '0111':
                {
                    let qy = (1 - grid[i][j]) / (grid[i + 1][j] - grid[i][j]);
                    let px = (1 - grid[i][j]) / (grid[i][j + 1] - grid[i][j]);
                    canvas.line((j) * colWidth, (i + qy) * rowHeight, (j + px) * colWidth, (i) * rowHeight)
                }
                break;
            case '1000':
                {
                    let qy = (1 - grid[i][j]) / (grid[i + 1][j] - grid[i][j]);
                    let px = (1 - grid[i][j]) / (grid[i][j + 1] - grid[i][j]);
                    canvas.line((j) * colWidth, (i + qy) * rowHeight, (j + px) * colWidth, (i) * rowHeight)
                }
                break;
            case '1001':
                {
                    let qy = (1 - grid[i + 1][j]) / (grid[i + 1][j + 1] - grid[i + 1][j]);
                    let px = (1 - grid[i][j]) / (grid[i][j + 1] - grid[i][j]);
                    canvas.line((j + px) * colWidth, (i) * rowHeight, (j + qy) * colWidth, (i + 1) * rowHeight)
                }
                break;
            case '1010':
                {
                    let qy = (1 - grid[i][j + 1]) / (grid[i + 1][j + 1] - grid[i][j + 1]);
                    let px = (1 - grid[i][j]) / (grid[i][j + 1] - grid[i][j]);
                    canvas.line((j + px) * colWidth, (i) * rowHeight, (j + 1) * colWidth, (i + qy) * rowHeight)
                }
                {
                    let qy = (1 - grid[i][j]) / (grid[i + 1][j] - grid[i][j]);
                    let px = (1 - grid[i + 1][j]) / (grid[i + 1][j + 1] - grid[i + 1][j]);
                    canvas.line((j) * colWidth, (i + qy) * rowHeight, (j + px) * colWidth, (i + 1) * rowHeight)
                }
                break;
            case '1011':
                {
                    let qy = (1 - grid[i][j + 1]) / (grid[i + 1][j + 1] - grid[i][j + 1]);
                    let px = (1 - grid[i][j]) / (grid[i][j + 1] - grid[i][j]);
                    canvas.line((j + px) * colWidth, (i) * rowHeight, (j + 1) * colWidth, (i + qy) * rowHeight)
                }
                break;
            case '1100':
                {
                    let qy = (1 - grid[i][j + 1]) / (grid[i + 1][j + 1] - grid[i][j + 1]);
                    let px = (1 - grid[i][j]) / (grid[i + 1][j] - grid[i][j]);
                    canvas.line(j * colWidth, (i + px) * rowHeight, (j + 1) * colWidth, (i + qy) * rowHeight)
                }
                break;
            case '1101':
                {
                    let qy = (1 - grid[i][j + 1]) / (grid[i + 1][j + 1] - grid[i][j + 1]);
                    let px = (1 - grid[i + 1][j]) / (grid[i + 1][j + 1] - grid[i + 1][j]);
                    canvas.line((j + px) * colWidth, (i + 1) * rowHeight, (j + 1) * colWidth, (i + qy) * rowHeight)
                }
                break;
            case '1110':
                {
                    let qy = (1 - grid[i][j]) / (grid[i + 1][j] - grid[i][j]);
                    let px = (1 - grid[i + 1][j]) / (grid[i + 1][j + 1] - grid[i + 1][j]);
                    canvas.line(j * colWidth, (i + qy) * rowHeight, (j + px) * colWidth, (i + 1) * rowHeight)
                }

                break;
            case '1111':
                break;
        }
    }


    const marchSquare = (grid: number[][]) => {
        for (let i = 0; i < grid.length - 1; i++) {
            for (let j = 0; j < grid[0].length - 1; j++) {
                // drawContours(i, j, grid)
                drawContoursInterpolate(i, j, grid)
            }
        }

    }

    function loop() {
        canvas.clear();
        // canvas.drawGrid(grid.grid)
        // circles.forEach(circle => canvas.circle(circle));
        circles.forEach(circle => updateGridDistance(grid.grid, circle))
        updatePos(circles)
        marchSquare(grid.grid)
        // temp resoultion of build error
        false && fillGrid;
        false && drawContours;
        // console.log(grid.grid)
        grid.reset()
        window.requestAnimationFrame(loop)
    }

    // document.addEventListener('click', () => {
    //     shouldLoop = !shouldLoop;
    //     if (shouldLoop)
    //         window.requestAnimationFrame(loop)
    // })
    window.requestAnimationFrame(loop)
}
// canvas.clear();
// canvas.drawGrid(grid.grid)
// for (let i = 0; i < 16; i++) {
//     const s = i.toString(2).padStart(4, '0');
//     drawContours(s, i + 1, 2, grid.grid)
//
// }
init()
