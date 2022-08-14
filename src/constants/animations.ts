const OPACITY_CHANGE = [
    { opacity: 0 },
    { opacity: 1 },
    { opacity: 0 },
];

const SMOKE_EFFECT = [
    {opacity: 0, transform: 'scale3d(0.4, 0.4, 0.4)' },
    { opacity: 0.05 },
    { opacity: 0.1 },
    { opacity: 0.15 },
    { opacity: 0.2 },
    { opacity: 0.25 },
    { opacity: 0.3 },
    { opacity: 0.35 },
    { transform: 'scale3d(0.6, 0.6, 0.6)' },
    { opacity: 0.4 },
    { opacity: 0.45 },
    { opacity: 0.5 },
    { opacity: 0.6 },
    { opacity: 0.8 },
    { opacity: 0.9 },
    {opacity: 1, transform: 'scale3d(1, 1, 1)' },
];

const TEXT_JUMPING = [
    { opacity: 0 },
    { opacity: 1 },
    { opacity: 0 },
];

export {
    OPACITY_CHANGE,
    SMOKE_EFFECT,
    TEXT_JUMPING,
}
