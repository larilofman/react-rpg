function normRand() {
    let x1;
    let x2;
    let rad;

    do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        rad = x1 * x1 + x2 * x2;
    } while (rad >= 1 || rad == 0);

    const c = Math.sqrt(-2 * Math.log(rad) / rad);

    return x1 * c;
}

export default function weightedRandom(min: number, max: number, mean: number): number {
    const range = [min, max];
    const target = mean;
    const stddev = 1.0;
    const takeGauss = (Math.random() < 0.81546);
    if (takeGauss) {
        // perform gaussian sampling (normRand has mean 0), resample if outside range
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const sample = ((normRand() * stddev) + target);
            if (sample >= range[0] && sample <= range[1]) {
                return Math.floor(sample);
            }
        }
    } else {
        // perform flat sampling
        return Math.floor(range[0] + (Math.random() * (range[1] - range[0])));
    }
}