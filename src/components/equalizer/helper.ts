const defaultPicsPosition = new Uint8Array(64).fill(150);

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

    gradient.addColorStop(0, '#038E16');
    gradient.addColorStop(0.2, '#28B13B');
    gradient.addColorStop(0.4, '#D3E331');
    gradient.addColorStop(0.6, 'orange');
    gradient.addColorStop(0.8, 'red');
    gradient.addColorStop(1, 'black');

    return gradient;
}

export function rectangles(ctx, width, height, dataArray) {
    const freq = 128;
    const border = 1;
    const picHeight = 2;
    const picJump = 20;
    const recWidth = ~~((width - (freq + 1) * border) / freq);
    const halfCanvas = ~~(width / 2);
    const remainder = (width - freq * border) % freq;
    // defaultPicsPosition.fill(height);

    if (ctx) {
        ctx.save();
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        for (let i = 0; i < ~~(freq / 2); i++) {
            const reqHeight = !dataArray[i] ? 0 : dataArray[i];
            const recY = reqHeight ? ~~((1 - reqHeight / 255) * height + picHeight) : height;
            let picY;

            if (recY - picHeight <= 0) {
                picY = 0
            } else if (recY === height) {
                picY = 0
            } else {
                picY = recY - picJump;
            }


            ctx.rect(halfCanvas + border * (i + 1) + recWidth * i, recY, recWidth, reqHeight);
            ctx.rect(halfCanvas - border * i - recWidth * (i + 1), recY, recWidth, reqHeight);
            // pics
            // ctx.fillStyle = 'blue';
            if (defaultPicsPosition[i] > recY) {
                ctx.fillRect(halfCanvas + border * (i + 1) + recWidth * i, recY - 10, recWidth, picHeight);
                ctx.fillRect(halfCanvas - border * i - recWidth * (i + 1), recY - 10, recWidth, picHeight);
                defaultPicsPosition[i] = picY;
            } else {
                ctx.fillRect(halfCanvas + border * (i + 1) + recWidth * i, defaultPicsPosition[i], recWidth, picHeight);
                ctx.fillRect(halfCanvas - border * i - recWidth * (i + 1), defaultPicsPosition[i], recWidth, picHeight);
                defaultPicsPosition[i] = defaultPicsPosition[i] + 1;
            }
        }
        ctx.clip();

        draw(ctx, width, height);
        ctx.restore();
    }
}

function pics() {
    const defaultPicsPosition = new Uint8Array(64);
}
