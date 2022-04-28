import { DIMENSIONS } from './const';

const defaultPicsPosition = new Uint8Array(DIMENSIONS.EQUALIZER_FREG / 2).fill(DIMENSIONS.EQUALIZER_HEIGHT);

export class RectangleEqualizer {
    readonly ctx: CanvasRenderingContext2D | null = null;
    private width = NaN;
    private height = NaN;
    private freq = DIMENSIONS.EQUALIZER_FREG;
    private border = 1;
    private picHeight = 2;
    private picJump = 20;
    private picSpeed = 1;
    private largeSize = 900;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.ctx = ctx;
        this.updateDimensions(width, height);
    }

    private updateDimensions(width: number, height: number): void {
        this.ctx.clearRect(0, 0, width, height);

        this.width = width;
        this.height = height;
    }

    fillBackground(): void {
        const gradient = this.ctx.createLinearGradient(~~(this.width / 2), this.height, ~~(this.width / 2), 0);

        // console.log(~~(this.width / 2), this.height, ~~(this.width / 2), 0);

        gradient.addColorStop(0, '#038E16');
        gradient.addColorStop(0.2, '#28B13B');
        gradient.addColorStop(0.4, '#D3E331');
        gradient.addColorStop(0.6, 'orange');
        gradient.addColorStop(0.8, 'red');
        gradient.addColorStop(1, 'black');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    rectangles(dataArray) {
        // this.updateDimensions(width, height);

        console.log('this.width', this.width, this.height);

        const recWidth = (this.width - (this.freq + 1) * this.border) / this.freq;
        const halfCanvas = this.width / 2;

        if (this.ctx) {
            // this.ctx.save();
            // this.ctx.clearRect(0, 0, this.width, this.height);
            // this.ctx.beginPath();
            // for (let i = 0; i < ~~(this.freq / 2); i++) {
            //     const reqHeight = !dataArray[i] ? 0 : dataArray[i];
            //     const recY = reqHeight ? ~~((1 - reqHeight / 255) * this.height + this.picHeight) : this.height;
            //     let picY;
            //
            //     if (recY - this.picHeight <= 0) {
            //         picY = 0
            //     } else if (recY === this.height) {
            //         picY = 0
            //     } else {
            //         picY = recY - this.picJump;
            //     }
            //
            //
            //     this.ctx.rect(halfCanvas + this.border * (i + 1) + recWidth * i, recY, recWidth, reqHeight);
            //     this.ctx.rect(halfCanvas - this.border * i - recWidth * (i + 1), recY, recWidth, reqHeight);
            // }
            // this.ctx.clip();
            //
            // this.ctx.beginPath();

            for (let i = 0; i < ~~(this.freq / 2); i++) {
                const reqHeight = !dataArray[i] ? 0 : dataArray[i];
                const recY = reqHeight ? ~~((1 - reqHeight / 255) * this.height + this.picHeight) : this.height;
                let picY;

                if (recY - this.picHeight <= 0) {
                    picY = 0;
                } else if (recY === this.height) {
                    picY = this.height - this.picHeight;
                } else {
                    picY = recY - this.picJump;
                }


                // this.ctx.rect(halfCanvas + this.border * (i + 1) + recWidth * i, recY, recWidth, reqHeight);
                // this.ctx.rect(halfCanvas - this.border * i - recWidth * (i + 1), recY, recWidth, reqHeight);
                // pics
                this.ctx.fillStyle = 'blue';
                // console.log(this.width, halfCanvas + this.border * (i + 1) + recWidth * i, recY - 10, recWidth, this.picHeight)
                // this.ctx.fillRect(halfCanvas + this.border * (i + 1) + recWidth * i, recY - 10, recWidth, this.picHeight);
                if (defaultPicsPosition[i] > picY) {
                    this.ctx.clearRect(halfCanvas + this.border * (i + 1) + recWidth * i, picY + this.picHeight, recWidth, this.height - picY - this.picHeight);
                    this.ctx.clearRect(halfCanvas - this.border * i - recWidth * (i + 1), picY + this.picHeight, recWidth, this.height - picY - this.picHeight);

                    this.ctx.fillRect(halfCanvas + this.border * (i + 1) + recWidth * i, picY, recWidth, this.picHeight);
                    this.ctx.fillRect(halfCanvas - this.border * i - recWidth * (i + 1), picY, recWidth, this.picHeight);
                    defaultPicsPosition[i] = picY;
                } else {
                    this.ctx.clearRect(halfCanvas + this.border * (i + 1) + recWidth * i, 0, recWidth, defaultPicsPosition[i]);
                    this.ctx.clearRect(halfCanvas - this.border * i - recWidth * (i + 1), 0, recWidth, defaultPicsPosition[i]);

                    this.ctx.fillRect(halfCanvas + this.border * (i + 1) + recWidth * i, defaultPicsPosition[i], recWidth, this.picHeight);
                    this.ctx.fillRect(halfCanvas - this.border * i - recWidth * (i + 1), defaultPicsPosition[i], recWidth, this.picHeight);
                    defaultPicsPosition[i] = defaultPicsPosition[i] < this.height - this.picHeight ?
                        defaultPicsPosition[i] + this.picSpeed : this.height - this.picHeight;
                }

                // this.ctx.fill();
            }
            // this.ctx.clip();
            // this.ctx.fillRect(0, 0, 100, 200);

            // this.fillBackground();
            // this.ctx.restore();
        }
    }
}

function pics() {
    const defaultPicsPosition = new Uint8Array(64);
}
