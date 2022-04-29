import { DIMENSIONS } from './const';

const defaultPicsPosition = new Uint8Array(DIMENSIONS.EQUALIZER_FREG / 2).fill(DIMENSIONS.EQUALIZER_HEIGHT);

export class RectangleEqualizer {
    readonly ctx: CanvasRenderingContext2D | null = null;
    private width = NaN;
    private height = NaN;
    private freq = DIMENSIONS.EQUALIZER_FREG;
    private colMargin = 4;
    private picHeight = 4;
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
        const recWidth = ~~((this.width - (this.freq + 1) * this.colMargin) / this.freq);
        const halfCanvas = ~~(this.width / 2);

        if (this.ctx) {
            this.ctx.save();
            this.ctx.clearRect(0, 0, this.width, this.height);

            this.ctx.beginPath();

            for (let i = 0; i < ~~(this.freq / 2); i++) {
                const reqHeight = !dataArray[i] ? 0 : dataArray[i];
                const recY = reqHeight ? ~~((1 - reqHeight / 255) * this.height + this.picHeight) : this.height;
                let picY;

                if (recY - this.picHeight <= 0) {
                    picY = 0;
                } else if (recY === this.height) {
                    picY = this.height - this.picHeight;
                } else {
                    picY = recY - this.picJump - this.picHeight;
                }

                this.ctx.rect(halfCanvas + this.colMargin * (i + 1) + recWidth * i, recY, recWidth, reqHeight);
                this.ctx.rect(halfCanvas - this.colMargin * i - recWidth * (i + 1), recY, recWidth, reqHeight);

                // pics
                if (defaultPicsPosition[i] > recY - this.picHeight) {
                    defaultPicsPosition[i] = picY;
                } else {
                    defaultPicsPosition[i] = defaultPicsPosition[i] < this.height - this.picHeight ?
                        defaultPicsPosition[i] + this.picSpeed : this.height - this.picHeight;
                }
                this.ctx.fillRect(halfCanvas + this.colMargin * (i + 1) + recWidth * i, defaultPicsPosition[i] , recWidth, this.picHeight);
                this.ctx.fillRect(halfCanvas - this.colMargin * i - recWidth * (i + 1), defaultPicsPosition[i], recWidth, this.picHeight);
            }
            this.ctx.clip();
            this.fillBackground();
            this.ctx.restore();
        }
    }
}

function pics() {
    const defaultPicsPosition = new Uint8Array(64);
}
