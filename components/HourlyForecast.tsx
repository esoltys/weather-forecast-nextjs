import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function dataForecast({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      console.log('Initializing chart with data:', data);
      try {
        const temperatures = data.map((h) => h.temp);
        const minTemp = Math.floor(Math.min(...temperatures));
        const maxTemp = Math.ceil(Math.max(...temperatures));
        const tempRange = maxTemp - minTemp;
        const yAxisMin = Math.max(0, minTemp - Math.round(tempRange * 0.1));
        const yAxisMax = maxTemp + Math.round(tempRange * 0.1);

        const chart = echarts.init(chartRef.current);

        const options = {
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const timeStr = new Date(
          data[params[0].dataIndex].time
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const temp = params[0].value.toFixed(1);
        const precip = params[1].value.toFixed(0);
        const icon = data[params[0].dataIndex].icon;
        return `
                    <div style="text-align: center;">
                        <strong>${timeStr}</strong><br>
                        <img src="https://openweathermap.org/img/wn/${icon}.png" style="width:50px;height:50px;"><br>
                        Temperature: ${temp}°C<br>
                        Precipitation: ${precip}%
                    </div>
                `;
      },
    },
    xAxis: {
      type: "category",
      data: data.map((h) =>
        new Date(h.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      ),
      axisLabel: {
        formatter: (value, index) => (index % 2 === 0 ? value : ""),
      },
    },
    yAxis: [
      {
        type: "value",
        name: "Temperature (°C)",
        min: yAxisMin,
        max: yAxisMax,
        axisLabel: {
          formatter: "{value}°C",
        },
      },
      {
        type: "value",
        name: "Precipitation (%)",
        min: 0,
        max: 100,
        axisLabel: {
          formatter: "{value}%",
        },
      },
    ],
    series: [
      {
        name: "Temperature",
        type: "line",
        data: temperatures,
        smooth: true,
        itemStyle: {
          color: "#ff9933",
        },
        symbol: "circle",
        symbolSize: 8,
      },
      {
        name: "Precipitation",
        type: "bar",
        yAxisIndex: 1,
        data: data.map((h) => h.pop * 100),
        itemStyle: {
          color: "#4da6ff",
        },
      },
    ],
  };

        console.log('Setting chart options:', options);
        chart.setOption(options);

        // Resize chart on window resize
        const handleResize = () => {
          chart.resize();
        };
        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
          chart.dispose();
        };
      } catch (error) {
        console.error('Error initializing chart:', error);
      }
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
}

export default dataForecast;