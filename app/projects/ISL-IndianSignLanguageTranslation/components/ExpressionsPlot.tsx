import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import ExpressionPlotLegend from './ExpressionPlotLegend';
import ExpressionGraph from './ExpressionGraphPlot';

const ExpressionsPlot = () => {
    const [data, setData] = useState<Array<{x:string;y:string;value:number;split:string}>>([]);
    const [expressionsChunks, setexpressionsChunks] = useState<Array<Array<string>>>([[]]);
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
        // setTotalCount(count);
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



    
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <div className="col-span-full">
          
          <ExpressionPlotLegend max_count={max_count} width={700} height={20} margin={{ top: 10, right: 30, bottom: 30, left: 10 }} /></div>
        {expressionsChunks.map((chunk, index) => (
            <div key={index} className="w-full"> {/* Each chart takes full width of its grid cell */}
                {/* <ExpressionBarGraph data={data.filter(item => chunk.includes(item.y))} /> */}
                <ExpressionGraph chartId={`my_dataviz-${index}`} data={data.filter(item => chunk.includes(item.y))} max_count={max_count} />
            </div>
        ))}
        </div>);
}

export default ExpressionsPlot
