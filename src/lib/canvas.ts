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

    fillPath(vertices: number[][]) {
        if (vertices.length < 3) return;
        this.ctx?.beginPath();
        this.ctx?.moveTo(vertices[0][0], vertices[0][1])
        vertices.forEach(vertex => this.ctx?.lineTo(vertex[0], vertex[1]))
        this.ctx?.closePath();
        this.ctx?.fill()
    }

    strokeColor(color: string) {
        if (this.ctx)
            this.ctx.strokeStyle = color
    }
    getImageData(args?: [number, number, number, number]) {
        if (!args) return this.ctx?.getImageData(0, 0, this.canvas.width, this.canvas.height)
        if (args && args.length === 4) {
            const [x, y, w, h] = args;
            return this.ctx?.getImageData(x, y, w, h);
        }
        return null;
    }

    createImageData(w: number, h: number) {
        return this.ctx?.createImageData(w, h)
    }

    putImageData(imageData: ImageData, x: number, y: number) {
        this.ctx?.putImageData(imageData, x, y)
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

    text(text: string, x: number, y: number) {
        this.ctx?.fillText(text, x, y)
    }

    line(x1: number, y1: number, x2: number, y2: number) {
        this.ctx?.beginPath()
        this.ctx?.moveTo(x1, y1)
        this.ctx?.lineTo(x2, y2)
        this.ctx?.stroke()
    }

}
export default Canvas;
