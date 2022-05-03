import { DIMENSIONS } from './const';

const defaultPicsPosition = new Uint8Array(DIMENSIONS.EQUALIZER_FREG / 2).fill(DIMENSIONS.EQUALIZER_HEIGHT);
const initialPicsPosition = new Uint8Array(DIMENSIONS.EQUALIZER_FREG).fill(DIMENSIONS.EQUALIZER_HEIGHT);

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

    initialJumps(): void {
        console.log('initial');
        const initialJump = 20;
        let j = 0;
        initialPicsPosition.fill(DIMENSIONS.EQUALIZER_HEIGHT - this.picHeight);

        const defaultJumping = () => {
            const recWidth = ~~((this.width - (this.freq + 1) * this.colMargin) / this.freq);
            const halfCanvas = ~~(this.width / 2);

            if (this.ctx) {
                // this.ctx.save();
                this.ctx.clearRect(0, 0, this.width, this.height);

                initialPicsPosition[j] = initialJump;
                const speed = 30;

                // y = a (x - h) 2 + k

                console.log('x0, y0', this.colMargin * (j + 1) + recWidth * j, initialPicsPosition[j], this.colMargin * (j + 1) + recWidth * j, initialPicsPosition[j], '********');

                for (let k = 0; k <= ~~(this.freq); k++) {
                    if (k < j) {
                        const x0 = this.colMargin * (j + 1) + recWidth * j;
                        const x = this.colMargin * (k + 1) + recWidth * k;
                        const y = ~~(1/80 *((x - x0) ** 2) + initialPicsPosition[j]);
                        const step: number = y + this.picHeight < this.height - this.picHeight ? y + this.picHeight : this.height - this.picHeight;

                        console.log(x, y, !!(y + this.picHeight), step);

                        initialPicsPosition[k] = step;
                    }

                    // if (k > j) {
                    //     const step: number = (initialJump + speed + k) < (this.height - this.picHeight) ? initialJump + speed + k : this.height - this.picHeight;
                    //     initialPicsPosition[k] = step
                    // }

                    // console.log(initialPicsPosition)


                    // if (initialPicsPosition[j - k ] !== undefined && initialPicsPosition[j - k ] + 3 < this.height - this.picHeight) {
                    //     initialPicsPosition[j - k ] = initialPicsPosition[j - k ] + 3;
                    // }
                    //
                    // if (initialPicsPosition[j + k ] !== undefined && initialPicsPosition[j + k ] + initialJump + 4 + k < this.height - this.picHeight) {
                    //     initialPicsPosition[j + k ] = initialPicsPosition[j - k ] + initialJump + 4 + k - j;
                    // }

                    // if ( === j) {
                    //     initialPicsPosition[k] = initialJump;
                    //     initialPicsPosition[i - 1] = 70;
                    //     initialPicsPosition[i + 1] = 80;
                    // } else {
                    //     initialPicsPosition[i] = this.height - this.picHeight;
                    // }
                }
                // for (let k = 0; k < 6; k++) {
                //     initialPicsPosition[j] = initialJump;
                //     // if ( === j) {
                //     //     initialPicsPosition[k] = initialJump;
                //     //     initialPicsPosition[i - 1] = 70;
                //     //     initialPicsPosition[i + 1] = 80;
                //     // } else {
                //     //     initialPicsPosition[i] = this.height - this.picHeight;
                //     // }
                //
                // }


                for (let i = 0; i < ~~(this.freq); i++) {
                    // const reqHeight = !dataArray[i] ? 0 : dataArray[i];
                    // const recY = reqHeight ? ~~((1 - reqHeight / 255) * this.height + this.picHeight) : this.height;
                    let picY;

                    // if (i === j) {
                    //     picY = 75;
                    //     defaultPicsPosition[i] = picY;
                    //     defaultPicsPosition[i - 1] = picY - 1;
                    //     defaultPicsPosition[i + 1] = picY - 1;
                    // } else {
                    //     defaultPicsPosition[i] = this.height - this.picHeight;
                    // }

                    // if (recY - this.picHeight <= 0) {
                    //     picY = 0;
                    // } else if (recY === this.height) {
                    //     picY = this.height - this.picHeight;
                    // } else {
                    //     picY = recY - this.picJump - this.picHeight;
                    // }

                    // pics


                    // console.log(i, initialPicsPosition[i]);
                    // if (defaultPicsPosition[i] > recY - this.picHeight) {
                    //     defaultPicsPosition[i] = picY;
                    // } else {
                    //     defaultPicsPosition[i] = defaultPicsPosition[i] < this.height - this.picHeight ?
                    //         defaultPicsPosition[i] + this.picSpeed : this.height - this.picHeight;
                    // }
                    this.ctx.fillRect(this.colMargin * (i + 1) + recWidth * i, initialPicsPosition[i], recWidth, this.picHeight);
                    // this.ctx.fillRect(halfCanvas - this.colMargin * i - recWidth * (i + 1), defaultPicsPosition[i], recWidth, this.picHeight);
                }
                // if (i === j) {
                //         picY = 75;
                //         defaultPicsPosition[i] = picY;
                //         defaultPicsPosition[i - 1] = picY - 1;
                //         defaultPicsPosition[i + 1] = picY - 1;
                //     } else {
                //         defaultPicsPosition[i] = this.height - this.picHeight;
                //     }

                // defaultPicsPosition[j] = 75;
                // defaultPicsPosition[j - 1] = 70;
                // defaultPicsPosition[j + 1] = 80;
                if (j > ~~(this.freq)) {
                    j = 0;
                } else {
                    j++;
                }
                // this.ctx.restore();
            }
        };

        setInterval(() => {
            window.requestAnimationFrame(() => {
                if (this.ctx) {
                    defaultJumping();
                }
            });
        }, 150);
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
                this.ctx.fillRect(halfCanvas + this.colMargin * (i + 1) + recWidth * i, defaultPicsPosition[i], recWidth, this.picHeight);
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
