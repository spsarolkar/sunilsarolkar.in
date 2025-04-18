import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const EmbeddingVisualization = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const data = [
      { x: 1.1, y: 2.2, word: 'king' },
      { x: 1.0, y: 2.0, word: 'queen' },
      { x: 2.1, y: 1.2, word: 'man' },
      { x: 2.0, y: 1.0, word: 'woman' },
      { x: -1.0, y: -1.5, word: 'uncle' },
      { x: -1.1, y: -1.7, word: 'aunt' },
      { x: -2.0, y: -2.5, word: 'Paris' },
      { x: -2.1, y: -2.3, word: 'France' },
    ];

    const width = 700;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('border', '1px solid black');

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x) as [number, number] || [0, 1]).nice()
      .range([50, width - 50]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y) as [number, number] || [0, 1]).nice()
      .range([height - 50, 50]);

    svg.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5)
      .attr('fill', '#4682B4');

    svg.selectAll('text')
      .data(data)
      .join('text')
      .attr('x', d => xScale(d.x) + 8)
      .attr('y', d => yScale(d.y) + 4)
      .text(d => d.word)
      .attr('font-size', '14px')
      .attr('fill', '#333');

    // Draw analogy vectors
    svg.append('line')
      .attr('x1', xScale(-1.0))
      .attr('y1', yScale(-1.5))
      .attr('x2', xScale(-1.1))
      .attr('y2', yScale(-1.7))
      .attr('stroke', '#FF6347')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');

    svg.append('line')
      .attr('x1', xScale(1.1))
      .attr('y1', yScale(2.2))
      .attr('x2', xScale(1.0))
      .attr('y2', yScale(2.0))
      .attr('stroke', '#FF6347')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');

    // Define arrowhead marker
    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', [0, 0, 6, 6])
      .attr('refX', 5)
      .attr('refY', 3)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,0L6,3L0,6')
      .attr('fill', '#FF6347');

    // Add chart title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text('Word Embeddings and Semantic Relationships');

  }, []);

  return <svg ref={svgRef}></svg>;
};

export default EmbeddingVisualization;