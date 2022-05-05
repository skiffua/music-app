import {DIMENSIONS} from './const';

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

    private initialState = true;
    private initialDefaultJumping = false;

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


    async drawSimpleRectangles(dataArray: any): Promise<any> {
        if (this.initialDefaultJumping) {
            return;
        }

        if (this.initialState) {
            await this.initialJumps(2500);
        }

        this.rectangles(dataArray);
    }

    async initialJumps(time: number = 15000): Promise<any> {
        let interval;
        let initialJump = 80;
        let rightDirection = true;
        let downDirection = true;
        let isTurnOff = false;
        let jumpedPic = Math.floor(Math.random() * (this.freq + 1));

        let resolveInitialJumping: (v?: any) => void;
        initialPicsPosition.fill(DIMENSIONS.EQUALIZER_HEIGHT - this.picHeight);

        this.initialDefaultJumping = true;

        const defaultJumping = () => {
            const recWidth = ~~((this.width - (this.freq + 1) * this.colMargin) / this.freq);

            if (this.ctx) {
                this.ctx.clearRect(0, 0, this.width, this.height);

                initialPicsPosition[jumpedPic] = initialJump;
                const speed = 3;

                for (let k = 0; k <= ~~(this.freq); k++) {
                    let y;
                    let prevCount;


                    if (k < jumpedPic) {
                        prevCount = jumpedPic - k || 1;
                        y = rightDirection ? initialPicsPosition[jumpedPic] + prevCount * this.picHeight * speed : initialPicsPosition[jumpedPic] + prevCount * this.picHeight * 5;
                    }

                    if (k > jumpedPic) {
                        prevCount = k - jumpedPic || 1;
                        y = !rightDirection ? initialPicsPosition[jumpedPic] + prevCount * this.picHeight * speed : initialPicsPosition[jumpedPic] + prevCount * this.picHeight * 5;
                    }


                    if (k !== jumpedPic) {
                        initialPicsPosition[k] = y < this.height - this.picHeight ? y : this.height - this.picHeight;
                    }
                }

                for (let i = 0; i < ~~(this.freq); i++) {
                    this.ctx.fillRect(this.colMargin * (i + 1) + recWidth * i, initialPicsPosition[i], recWidth, this.picHeight);
                }
                if ((jumpedPic > ~~(this.freq * 0.8)) && rightDirection) {
                    rightDirection = !rightDirection;
                } else if ((jumpedPic < ~~(this.freq * 0.2)) && !rightDirection) {
                    rightDirection = !rightDirection;
                }

                jumpedPic = rightDirection || isTurnOff ? jumpedPic + 1 : jumpedPic - 1;
                initialJump = downDirection || isTurnOff ? initialJump + 2 : initialJump - 2;

                if (initialJump > this.height - this.picHeight - 5) {
                    downDirection = !downDirection;

                    if (isTurnOff) {
                        clearInterval(interval);
                        this.initialState = false;
                        this.initialDefaultJumping = false;

                        resolveInitialJumping();
                    }
                } else if (initialJump < 80) {
                    downDirection = !downDirection;
                }
            }
        };

        interval = setInterval(() => {
            window.requestAnimationFrame(() => {
                if (this.ctx) {
                    defaultJumping();
                }
            });
        }, 200);

        setTimeout(() => {
            isTurnOff = true;
            // clearInterval(interval);
        }, time);

        return new Promise((resolve) => {
            resolveInitialJumping = resolve;
        })
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
