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
    getGrid() {
        return this.grid
    }
    reset() {
        this.grid.forEach(row => {
            row.forEach((_, idx) => row[idx] = 0)
        })
    }
}

export default Grid
