class Canvas {
    ctx: CanvasRenderingContext2D | null;
    canvas: HTMLCanvasElement
    strokeStyle: string;
    fillStyle: string;
    constructor(elementRef: HTMLCanvasElement) {
        this.canvas = elementRef
        this.ctx = elementRef.getContext('2d')!;
        this.strokeStyle = 'black';
        this.fillStyle = 'black';
    }

    clear() {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGrid(grid: number[][]) {
        this.ctx?.beginPath();
        const rowHeight = this.canvas.height / grid.length;
        const colWidth = this.canvas.width / grid[0].length;
        for (let i = 0; i < grid.length; i++) {
            this.ctx?.moveTo(0, i * rowHeight)
            this.ctx?.lineTo(this.canvas.width, i * rowHeight)
        }
        for (let i = 0; i < grid[0].length; i++) {
            this.ctx?.moveTo(i * colWidth, 0)
            this.ctx?.lineTo(i * colWidth, this.canvas.height)

        }
        this.ctx?.stroke();
    }
    circle([x, y, r]: number[]) {
        this.ctx?.beginPath()
        this.ctx?.arc(x, y, r, 0, Math.PI * 2);
        this.ctx?.stroke();
    }
    dimensions() {
        return [this.canvas.width, this.canvas.height]
    }
    rect(x: number, y: number, w: number, h: number) {
        this.ctx?.fillRect(x, y, w, h);
    }

}
export default Canvas;
