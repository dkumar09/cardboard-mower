class Grid {
    rows: number
    cols: number
    grid: number[][]
    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.grid = Array.from(Array(rows), () => new Array(cols).fill(0));
        console.log('oni: init grid', this.grid)
    }
    reset() {
        this.grid = Array(10).fill(Array(10).fill(0))
    }
}

export default Grid
