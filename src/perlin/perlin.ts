import Canvas from "../lib/canvas";

export default function() {
    const elementRef = document.querySelector('canvas')
    if (!elementRef) return;
    console.log('initialized')

    elementRef.width = window.innerWidth
    elementRef.height = window.innerHeight

    const canvas = new Canvas(elementRef)
    canvas.clear();
    canvas.strokeColor('#FFFFFF')



}
