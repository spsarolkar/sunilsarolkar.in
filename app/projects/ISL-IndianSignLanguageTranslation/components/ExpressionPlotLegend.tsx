import * as d3 from 'd3';
import React, { useEffect } from 'react'
import { ScaleSequential, scaleLinear } from 'd3';
import { colorScaler } from './ExpressionPlotType';

const ExpressionPlotLegend = ({max_count, width=450, margin= { top: 10, right: 90, bottom: 50, left: 150 }, height=20}:{max_count:number, width:number, margin:any, height:number}) => {
        // const colorScaler = d3.scaleSequential(d3.interpolateSpectral)
        //     .domain([0, 1])
        //     .interpolator(d3.interpolateSpectral);
        useEffect(() => {
            
        d3.select("#my_dataviz_legend").selectAll("*").remove();
        const legend = d3.select("#my_dataviz_legend")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
      // Add color scale legend
          const legendHeight = 10;
          const legendWidth = width+50;  // Same height as the chart
          const legendX = 0 // Position to the right of the chart
          const legendY = 0;
    
        //   const legend = svg.append("g")
        //       .attr("transform", `translate(${legendX},${legendY})`);
    
          const defs = legend.append("defs"); // Define the gradient outside the main SVG
    
          const linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient") // Assign unique ID to the gradient
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")// Horizontal gradient
            .attr("y2", "0%"); 
    
            linearGradient.selectAll("stop") 
            .data(d3.range(5).map((i) => ({ offset: `${100*i/4}%`, color: colorScaler(i/4) })))
            .enter().append("stop")
            .attr("offset", d => d.offset) 
            .attr("stop-color", d => d.color);
    
    
          legend.append("rect")
              .attr("width", legendWidth)
              .attr("height", legendHeight)
              .style("fill", "url(#linear-gradient)"); // Use the gradient as the fill
    
                // console.log('total_count',total_count);
          // Add labels to the color legend (optional)
          console.log('max_count',max_count);
           const legendScale = scaleLinear()
              .domain([0, max_count])
              .range([0,legendWidth ]); // Reverse the range for the legend
    
          const legendAxis = d3.axisBottom(legendScale).ticks(max_count);  // Adjust number of ticks as needed
    
          legend.append("g")
             .attr("transform", `translate(0, ${legendHeight})`)
             .call(legendAxis);
        },[max_count]);
  return (
    <div id="my_dataviz_legend">
      
    </div>
  )
}

export default ExpressionPlotLegend
