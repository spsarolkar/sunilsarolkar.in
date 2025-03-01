import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { scaleLinear } from 'd3';
import { colorScaler } from './ExpressionPlotType';

interface ExpressionPlotLegendProps {
  max_count: number;
  width?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  height?: number;
}
const ExpressionPlotLegend: React.FC<ExpressionPlotLegendProps> = ({ max_count, width = 450, margin = { top: 10, right: 90, bottom: 50, left: 150 }, height = 20 }) => {
  useEffect(() => {
    d3.select('#my_dataviz_legend').selectAll('*').remove();
    const containerWidth = document.getElementById('my_dataviz_legend')?.offsetWidth || width;

    const legend = d3.select('#my_dataviz_legend')
      .append('svg')
      .attr('width', containerWidth)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const legendHeight = 10;
    const legendWidth = containerWidth - margin.left - margin.right;

    const defs = legend.append('defs');
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'linear-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    linearGradient.selectAll('stop')
      .data(d3.range(5).map((i) => ({ offset: `${(100 * i) / 4}%`, color: colorScaler(i / 4) })))
      .enter().append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color);

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#linear-gradient)');

    const legendScale = scaleLinear()
      .domain([0, max_count])
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale).ticks(max_count);

    legend.append('g')
      .attr('transform', `translate(0, ${legendHeight})`)
      .call(legendAxis);
  }, [max_count]);

  return (
    <div id="my_dataviz_legend" className="w-full">
    </div>
  );
};

export default ExpressionPlotLegend;
