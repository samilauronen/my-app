
import { complex, abs, pow, sqrt, add, evaluate} from 'mathjs'

class MandelbrotSet {

    constructor(iterations) {
        this.originX = 0;
        this.originY = 0;
        this.max_iterations = iterations;
    }

    update(key, value) {
        switch(key) {
            case "iterations":
                console.log("Value is: " + value)
                this.max_iterations = value;
                break;
            default:
        }
    }

    createLinearGradient(fromRGB, toRGB, nSteps) {
        var dR = toRGB[0] - fromRGB[0];
        var dG = toRGB[1] - fromRGB[1];
        var dB = toRGB[2] - fromRGB[2];


        return Array.apply(null, Array(nSteps)).map(
                (x,i) => [
                    dR*(i/nSteps) + fromRGB[0],
                    dG*(i/nSteps) + fromRGB[1],
                    dB*(i/nSteps) + fromRGB[2]
            ])
    }

    scalePixelToComplex(x,y, width, height) {
        const [reRangeStart, reRangeEnd] = [-2.5, 1];
        const [imRangeStart, imRangeEnd] = [-1, 1];

        let re = (x / width) * (reRangeEnd - reRangeStart) + reRangeStart;
        let im = (y / height) * (imRangeEnd - imRangeStart) + imRangeStart;

        return complex(re, im)
    }

    setPixel(imgData, x, y, r, g, b, a) {
        const index = (y * imgData.width + x)*4;
        var data = imgData.data;
        data[index] = r;
        data[index+1] = g;
        data[index+2] = b;
        data[index+3] = a;
    }

    // https://en.wikipedia.org/wiki/Plotting_algorithms_for_the_Mandelbrot_set
    // Optimized escape time algorithm
    iterate(C) {
        var iterations = 0;
        const cx = C.re;
        const cy = C.im;
        var zx = 0;
        var zy = 0;

        // squares of z
        var zx2 = 0;
        var zy2 = 0;

        // abs(z) <= 2
        // sqrt(zx^2 + zy^2) <= 2   || ^2
        // zx^2 + zy^2 <= 4
        while (zx2 + zy2 <= 4 && iterations < this.max_iterations) {
            // update z
            zy = 2 * zy * zx + cy;
            zx = zx2 - zy2 + cx;
            // update squares of z
            zx2 = zx * zx;
            zy2 = zy * zy;
            // update iterations
            iterations++;
        }
        return iterations
    }

    draw(ctx) {
        console.log(this.max_iterations)
        const width = ctx.canvas.width
        const height = ctx.canvas.height 
        let imageData = ctx.createImageData(width, height); // base to draw on
        let gradient = this.createLinearGradient([252, 161, 3], [39, 14, 230], this.max_iterations)

        for (let x = this.originX; x < width; x++) {
            for(let y = this.originY; y < height; y++) {
                const C = this.scalePixelToComplex(x, y, width, height);
                const iterations = this.iterate(C);

                let color = gradient[iterations-1];
                this.setPixel(imageData, x, y, color[0], color[1], color[2], 255);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }


}

export default MandelbrotSet;