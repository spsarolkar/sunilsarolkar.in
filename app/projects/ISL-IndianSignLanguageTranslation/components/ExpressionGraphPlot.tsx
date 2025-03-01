"use client";
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { colorScaler } from './ExpressionPlotType';


const ExpressionGraph = ({data,max_count, chartId}: {data:Array<{x:string;y:string;value:number;split:string}>,max_count:number, chartId: string}) => {
    const [selectedExpression, setSelectedExpression] = useState<string | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null); // Ref for tooltip div
    // const [data, setData] = useState<Array<{x:string;y:string;value:number;split:string}>>([]);

    // const [colorScale, setColorScale] = useState<ScaleSequential<string, never>>(d3.scaleSequential(d3.interpolateSpectral)
    // .domain([0, 1])
    // .interpolator(d3.interpolateSpectral));

    useEffect(() => {
        if (data.length === 0) return;
    
        const margin = { top: 10, right: 90, bottom: 50, left: 150 };  // Increased left margin for labels
        const width = 450 - margin.left - margin.right;
        const height = 8 * 20 *4 - margin.top - margin.bottom; // Dynamic height based on data
        // Create the svg area
        d3.select(`#${chartId}`).selectAll("*").remove();
        const svg = d3.select(`#${chartId}`)
          .append("svg")
          .attr("width", '100%')
          .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`) //Crucial for responsivenes
          .attr("preserveAspectRatio","xMinYMin meet") // Maintain aspect ratio
        //   .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
        // List of all variables and number of them
        const domain = Array.from(new Set(data.map(function(d) { return d.y })))
        
        const scaling = 10;
        
        
        
        const size = d3.scaleSqrt()
        .domain([0, 1])
        .range([0, 9]);
        
    
        // X scale
        const x = d3.scalePoint()
            .range([0, width])
            .domain(Array.from(new Set(data.map(function(d) { return d.x }))));



        // Y scale
        const y = d3.scalePoint()
            .range([0, height])
            .domain(domain)
            .padding(1); // Add padding to separate circles from axis


        // Add X axis
        svg.append("g")
        .attr("transform", `translate(0,${height})`) // Move x-axis to the bottom
        .call(d3.axisBottom(x)).style("font-size", "18px");
        
        // Add Y axis, with a translation to move it slightly to the right
        svg.append("g").call(d3.axisLeft(y))
            .attr("transform", "translate(-30,0)") // Adjust 10 as needed
            .call(d3.axisLeft(y)).style("font-size", "18px");


        // Tooltip setup
        const tooltip = d3.select(tooltipRef.current);

        const rows = svg.selectAll(".row")
            .data(data)
            .enter()
            .append("g") // Use 'g' to group row elements (rect and text)
            .attr("class", "row")
            .attr("transform", (d) => `translate(0, ${y(d.y)!})`)
            .style("cursor", "pointer")  // Indicate clickability
            .on("click", (event, d) => {
                console.log('d.y', d.y);
                setSelectedExpression(d.y);
  
                // Toggle selection (add/remove class)
                svg.selectAll(".row").classed("selected", false); // Deselect all
                d3.select(event.currentTarget).classed("selected", true); // Select clicked row
  
            }).on("mouseover", (event, d) => {

                const selectedData = data.filter(item => item.y === d.y);
                  // Bar chart width and height
                const barChartWidth = 200;
                const barChartHeight = 200;
            
                // Calculate tooltip position
                const chartContainer = d3.select(`#${chartId}`).node() as HTMLElement;

                const chartRect = chartContainer.getBoundingClientRect();

                const tooltipSvg = tooltip
                    .append("svg")
                    .attr("width", barChartWidth + margin.left + margin.right)
                    .attr("height", barChartHeight + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);
                    
                const xBarScale = d3.scaleBand()
                  .range([0, barChartWidth])
                  .domain(selectedData.map(d => d.x))
                  .padding(0.1);

                const yBarScale = d3.scaleLinear()
                  .range([barChartHeight, 0])
                  .domain([0, d3.max(selectedData, d => Math.floor(d.value*max_count))!]); // Set domain based on selected data



                tooltipSvg.append("g")
                  .attr("transform", `translate(0,${barChartHeight})`)
                  .call(d3.axisBottom(xBarScale));

                tooltipSvg.append("g")
                    .call(d3.axisLeft(yBarScale));


                tooltipSvg.selectAll(".bar")
                    .data(selectedData)
                    .join("rect")
                    .attr("class", "bar")
                    .attr("x", d => xBarScale(d.x)!)
                    .attr("y", d => yBarScale(Math.floor(max_count*d.value)))
                    .attr("width", xBarScale.bandwidth())
                    .attr("height", d => barChartHeight - yBarScale(Math.floor(max_count*d.value)))
                    .attr("fill", d => colorScaler(d.value));


                tooltipSvg.append("text")
                    .attr("x", barChartWidth/2)             
                    .attr("y", -margin.top/2 + 20)
                    .attr("text-anchor", "middle")  
                    .style("font-size", "16px") 
                    .style("text-decoration", "underline")  
                    .text(d.y);

                    const tooltipWidth = tooltip.node()!.offsetWidth;
                    const tooltipHeight = tooltip.node()!.offsetHeight;

                    // Calculate tooltip position with offsets, relative to the chart container
                    let tooltipLeft = event.clientX - chartRect.left + 10; // 10px right of cursor, relative to chart
                    let tooltipTop = event.clientY - chartRect.top - tooltipHeight - 10; // 10px above cursor, relative to chart

                    // Check for overflow and adjust if needed
                    if (tooltipLeft + tooltipWidth > chartRect.width) {
                        tooltipLeft = event.clientX - chartRect.left - tooltipWidth - 10; // To the left of cursor
                    }
                    if (tooltipTop < 0) { // Check if tooltip goes above chart's top edge
                        tooltipTop = event.clientY - chartRect.top + 10; // Position below cursor
                    }


                    tooltip.style("left", tooltipLeft + "px")
                        .style("top", tooltipTop + "px")
                        .style("opacity", 1);

            })
            .on("mouseout", () => {
              tooltip.style("opacity", 0).html(``); // Clear on mouseout
            });;
  
        // Add background rect to the row group (make it slightly visible for easier debugging)
        rows.append("rect")
            .attr("width", width)
            .attr("height", y.bandwidth())
            .attr("fill", "transparent"); // You can keep it transparent or add a light background
  
  
  
        // Now append the other elements *within* the row groups
        rows.selectAll(".dot") // Append circles inside each row group
            .data(d=> {
                return x.domain().map( (key) => ({x: key, y:d.y, value: data.find(e => e.y === d.y && e.x === key)?.value || 0}))
            })
            .join("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.x)!)
            .attr("cy", y.bandwidth()/2)
            .attr("r", (d) => size(scaling * d.value))
            .style("fill", function(d){
                  return colorScaler(d.value);
            })
            .style("opacity", 0.8)

        // Add legend using separate component
        
    
      }, [data,selectedExpression]);
    
  
  
    return <div className='relative'>
    <div id={chartId}></div>
    <div id="tooltip" ref={tooltipRef} className='absolute bg-white border-4 border-indigo-500/100 opacity-0 p-4 pointer-events-none z-20' >

    </div>
</div>;
  };
  
  export default ExpressionGraph;
