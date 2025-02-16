import * as d3 from 'd3';

export const colorScaler = d3.scaleSequential(d3.interpolateSpectral)
            .domain([0, 1])
            .interpolator(d3.interpolateSpectral);
