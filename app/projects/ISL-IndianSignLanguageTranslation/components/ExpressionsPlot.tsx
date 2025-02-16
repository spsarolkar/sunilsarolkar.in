import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { ScaleSequential } from 'd3';
import ExpressionPlotLegend from './ExpressionPlotLegend';
import { colorScaler } from './ExpressionPlotType';
import ExpressionGraph from './ExpressionGraphPlot';

const ExpressionsPlot = () => {
    const [data, setData] = useState<Array<{x:string;y:string;value:number;split:string}>>([]);
    const [expressionsChunks, setexpressionsChunks] = useState<Array<Array<string>>>([[]]);
    const [total_count, setTotalCount] = useState(0);
    const [max_count, setMaxCount] = useState(0);
    // const [colorScale, setColorScale] = useState<ScaleSequential<string, never>>(d3.scaleSequential(d3.interpolateSpectral)
    // .domain([0, 1])
    // .interpolator(d3.interpolateSpectral));

    useEffect(() => {

      const fetchData = async () => {
        let count = 0;
        let max=-1;
        try {
          const csvData = await d3.csv('/projects/ISL/expression_counts.csv');
  
          // Transform data to group by expression
          const transformedData: {x:string,y:string,value:number,split:string}[] = [];
          
          csvData.forEach((row) => {
            
            transformedData.push({
              x: row.split,
              y: row.Expression,
              value: parseInt(row.count, 10),
              split:row.split
          });
          if(parseInt(row.count, 10) > max)
            max=parseInt(row.count, 10)
          if(row.split !== 'total')
            count+=parseInt(row.count, 10);
        
        });
        setTotalCount(count);
        console.log('setMaxCount',max);
        setMaxCount(max);

        // setColorScale(newColorScale);
        transformedData.forEach((row) => {
            row.value=row.value/max;
        });
           
        const uniqueExpressions = Array.from(new Set(transformedData.map(item => item.y))).sort();

        // Now uniqueExpressions will contain an array of the unique expression names
        // console.log('uniqueExpressions',uniqueExpressions); // Log them to check
        const _expressionsChunks = [];
        for (let i = 0; i < uniqueExpressions.length; i += 8) {
            _expressionsChunks.push(uniqueExpressions.slice(i, i + 8));
        }
        
        setexpressionsChunks(_expressionsChunks);

          setData(transformedData);
        } catch (error) {
          console.error("Error fetching or parsing data:", error);
        }
        
      };
  
      fetchData();
    }, []);


    
  
    useEffect(() => {
        // expressionsChunks.map((chunk, index) => (

        //     console.log('chunk, index',chunk, index)
        // ));
        // // const expressionsChunks = [];
        // // for (let i = 0; i < uniqueExpressions.length; i += 8) {
        // //   expressionsChunks.push(uniqueExpressions.slice(i, i + 8));
        // // }

        // console.log('data.filter(item => expressionsChunks[0].includes(item.y)) #',data.filter(item => expressionsChunks[0].includes(item.y)));
        // if (data.length === 0) return;
    
        // const margin = { top: 10, right: 90, bottom: 50, left: 150 };  // Increased left margin for labels
        // const width = 450 - margin.left - margin.right;
        // const height = data?.length * 20 - margin.top - margin.bottom; // Dynamic height based on data
        // // Create the svg area
        // const svg = d3.select("#my_dataviz")
        //   .append("svg")
        //   .attr("width", width + margin.left + margin.right)
        //   .attr("height", height + margin.top + margin.bottom)
        //   .append("g")
        //   .attr("transform", `translate(${margin.left},${margin.top})`);
        // const rowsData=[];
          
        // // List of all variables and number of them
        // const domain = Array.from(new Set(data.map(function(d) { return d.y })))
        
        // const scaling = 10;
        
        
        
        // var size = d3.scaleSqrt()
        // .domain([0, 1])
        // .range([0, 9]);
        
    
        // // X scale
        // const x = d3.scalePoint()
        //     .range([0, width])
        //     .domain(Array.from(new Set(data.map(function(d) { return d.x }))));



        // // Y scale
        // const y = d3.scalePoint()
        //     .range([0, height])
        //     .domain(domain)
        //     .padding(1); // Add padding to separate circles from axis


        //           // Add X axis
        // svg.append("g")
        // .attr("transform", `translate(0,${height})`) // Move x-axis to the bottom
        // .call(d3.axisBottom(x)).style("font-size", "18px");
        
        // // Add Y axis, with a translation to move it slightly to the right
        // svg.append("g").call(d3.axisLeft(y))
        //     .attr("transform", "translate(-30,0)") // Adjust 10 as needed
        //     .call(d3.axisLeft(y)).style("font-size", "18px");
    
        // // Add X axis label
        // const xAxisLabel = svg.append("text")
        //     .attr("text-anchor", "middle")
        //     .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
        //     .text("Split")
        //     .style("font-size", "20px"); // Increased font size

        // // svg.append("text")
        // //     .attr("text-anchor", "middle")            
        // //     .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
        // //     .text("Split")
        // //     .style("font-size", "14px");

        // // Add Y axis label
        // const yAxisLabel = svg.append("text")
        //     .attr("text-anchor", "middle")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", -margin.left + 20)
        //     .attr("x", -height / 2)
        //     .text("Expression")
        //     .style("font-size", "20px"); // Increased font size

        // // Create one 'g' element for each cell of the correlogram
        // const cor = svg.selectAll(".cor")
        //     .data(data)
        //     .join("g")
        //     .attr("class", "cor")
        //     .attr("transform", function(d) {
        //         return `translate(${x(d.x)}, ${y(d.y)})`
        //     });

        // // Add alternating row background colors
        // svg.selectAll(".cor")
        //     .each(function(d, i) {
        //         if (i % 2 === 1) {
        //             d3.select(this).style("background-color", "#f0f0f0"); // Light gray
        //         }
        //     });

        //         // // Create a color scale
        //         // const colorScale = d3.scaleSequential(d3.interpolateSpectral)
        //         // .domain([0, 1])
        //         // .interpolator(d3.interpolateSpectral); 
        // // Up right part: add circles
        // cor.append("circle")
        //     .attr("r", function(d) {
        //         return size(scaling * d.value) 
        //     })
        //     .style("fill", function(d){
        //         // console.log(d.value,'---',colorScale(colorfix*d.value))
        //         return colorScaler!(d.value);
        //     })
        //     .style("opacity", 0.8)


        // // Add legend using separate component
        
    
      }, [data]);
    
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <div className="col-span-full"><ExpressionPlotLegend max_count={max_count} width={700} height={20} margin={{ top: 10, right: 30, bottom: 30, left: 10 }} /></div>
        {expressionsChunks.map((chunk, index) => (
            <div key={index} className="w-full"> {/* Each chart takes full width of its grid cell */}
                {/* <ExpressionBarGraph data={data.filter(item => chunk.includes(item.y))} /> */}
                <ExpressionGraph chartId={`my_dataviz-${index}`} data={data.filter(item => chunk.includes(item.y))} max_count={max_count} />
            </div>
        ))}
        </div>);
}

export default ExpressionsPlot
