export function draw(ctx, width, height): void {
    // const height: number = ctx.canvas.clientHeight;
    // const weight: number = ctx.canvas.clientWidth;

    // ctx.fillStyle = "green";
    // ctx.fillRect(10, 10, 100, 100);


    // ctx.arc(100, 75, 50, 0, Math.PI * 2);
    // ctx.clip();
    ctx.fillStyle = createGradient(ctx, width / 2, height, width / 2, 0);
    ctx.fillRect(0, 0, width, height);
    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, width, height);

}

function createGradient(ctx, x0, y0, x1, y1) {
    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);

    gradient.addColorStop(0, 'green');
    gradient.addColorStop(0.2, 'yellow');
    gradient.addColorStop(0.6, 'orange');
    gradient.addColorStop(0.8, 'red');
    gradient.addColorStop(1, 'black');

    return gradient;
}

export function rectangles(ctx, width, height, dataArray) {
    const freq = 128;
    const border = 1;
    const recWidth = ~~((width - (freq + 1) * border) / freq);
    const remainder = (width - freq * border) % freq;

    console.log('rectangles', dataArray);

    if (ctx) {
        ctx.save();
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        for (let i = 0; i <= freq; i++) {
            const y = !dataArray[i] ? 0 : dataArray[i];
            ctx.rect(i * recWidth + i * border,height - y, recWidth, height);
        }
        ctx.clip();

        draw(ctx, width, height);
        ctx.restore();
    }
}
