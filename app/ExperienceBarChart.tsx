"use client";
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const experienceData = [
  { company: "Deutsche Bank", years: 8 }, // Calculate years based on July 2015 - Present
  { company: "Cognizant", years: 2 },     // Dec 2013 - July 2015 (approx.)
  { company: "HSBC GLT", years: 2 },      // Sept 2011 - Dec 2013 (approx.)
  { company: "High Mark", years: 2 }, // Mar 2010 - Sept 2011 (approx.)
];  experienceData.forEach(item => {
    const [startYearStr, startMonthStr] = item.company === "Deutsche Bank" ? ["2015", "7"] : item.company === "Cognizant" ? ["2013", "12"] : item.company === "HSBC GLT" ? ["2011", "9"] : ["2010", "3"];
    const endYear = item.company === "Deutsche Bank" ? String(new Date().getFullYear()) : item.company === "Cognizant" ? "2015" : item.company === "HSBC GLT" ? "2013" : "2011";
    const endMonth = item.company === "Deutsche Bank" ? String(new Date().getMonth() + 1) : item.company === "Cognizant" ? "7" : item.company === "HSBC GLT" ? "12" : "9";
    const startDate = new Date(parseInt(startYearStr), parseInt(startMonthStr) -1, 1);
    const endDate = new Date(parseInt(endYear), parseInt(endMonth) - 1, 1);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffYears =diffTime / (1000 * 60 * 60 * 24 * 365.25);
    item.years = diffYears;
  });


const ExperienceBarChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 400 - margin.left - margin.right; //Half the width
      const height = 300 - margin.top - margin.bottom; //Height of the chart

      const x = d3.scaleBand()
        .range([height, 0]) //Horizontal bar chart
        .domain(experienceData.map(d => d.company))
        .padding(0.1);

      const y = d3.scaleLinear()
        .range([0, width]) //Horizontal bar chart
        .domain([0, d3.max(experienceData, d => d.years)!]);  // Use d3.max for dynamic scaling


      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      g.append("g").call(d3.axisLeft(x)); //Horizontal bar chart

      g.append("g")
        .attr("transform", `translate(0,0)`) //Horizontal bar chart
        .call(d3.axisBottom(y)); //Horizontal bar chart


      g.selectAll(".bar")
        .data(experienceData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", d => x(d.company)!)
        .attr("x", 0) //Horizontal bar chart
        .attr("height", x.bandwidth()) //Horizontal bar chart
        .attr("width", d => y(d.years)) //Horizontal bar chart
        .attr("fill", "steelblue");


        // // Add labels on top of bars
        // g.selectAll(".label")
        //   .data(experienceData)
        //   .enter().append("text")
        //   .attr("class", "label")
        //   .text(d => d.years + (d.years <= 1 ? " year" : " years"))
        //   .attr("x", d => x(d.company)! + x.bandwidth() / 2)
        //   .attr("y", d => x.bandwidth()/2) // Position slightly above the bars
        //   .attr("text-anchor", "left") //Horizontal bar chart
        //   .attr("fill", "black");


    }
  }, []);


  return (
    <svg ref={svgRef} width={400} height={300}></svg> //Half the width
  );
}

export default ExperienceBarChart;
