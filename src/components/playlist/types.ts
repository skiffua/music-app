export interface PlayerInterface {
    src: string;
    format?: string[],
    onload?: () => any;
    onend?: () => any;
    onplay?: () => any;
}
