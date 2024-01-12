'use client';

import { Card, Text, Title, LineChart, Flex, Grid, CategoryBar, Divider, AreaChart, Icon } from '@tremor/react';
import {  useState, useEffect } from 'react';


const chartdata = [
  {
    time: "00:00",
    "Temperature": 22.2,
    "Humidity": 63,
    "Light level": 65,
    "Mouisture of soil": 66,
  },
  {
    time: "00:01",
    "Temperature": 22.4,
    "Humidity": 62,
    "Light level": 64,
    "Mouisture of soil": 70,
  },
  {
    time: "00:02",
    "Temperature": 22.6,
    "Humidity": 22,
    "Light level": 44,
    "Mouisture of soil": 77,
  },
  {
    time: "00:03",
    "Temperature": 23,
    "Humidity": 34,
    "Light level": 54,
    "Mouisture of soil": 62,
  },
  {
    time: "00:04",
    "Temperature": 26,
    "Humidity": 45,
    "Light level": 72,
    "Mouisture of soil": 88,
  },
];

const temperatureValueFormatter = (number: number | bigint) => `${new Intl.NumberFormat("us").format(number).toString()}°C`;
const percentValueFormatter = (number: number | bigint) => `${new Intl.NumberFormat("us").format(number).toString()} %`;

const data = [
  {
    category: 'Probe1',
    stat: '10,234',
  },
  {
    category: 'Probe2',
    stat: '12,543',
  },
  {
    category: 'Probe3',
    stat: '2,543',
  }
];

export default function ProbesPage() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://127.0.0.1:8000/api/probes/daily/');
      const data = await response.json();
      console.log(data);
      setData(data);
    }
    fetchData();
  }, []);
  

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      
      <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
        <Title>Last readings</Title>
        <Text>11:30 11.01.2024</Text>
      </Card>
      <br/>
      <Text>Probes</Text>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {data.map((item) => (
          <Card key={item.id}>
            <Title>{item.name}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Text>Plant: {item.plant}</Text>
            </Flex>
            <Divider>Current sensors data</Divider>
            <Flex>
                <Text>Temperature</Text>
                <Text>{item.temperature.toFixed(2)} °C</Text>
              </Flex>
              <CategoryBar
                values={[10, 20, 5, 30, 5, 20, 10]}
                colors={["rose", "orange", "yellow", "emerald", "yellow", "orange", "rose"]}
                markerValue={item.temperature}
                className="mt-1"
              />
              <br/>
            <Flex>
                <Text>Light level</Text>
                <Text>{item.sunlight_procent.toFixed(2)} %</Text>
              </Flex>
              <CategoryBar
                values={[10, 20, 5, 30, 5, 20, 10]}
                colors={["rose", "orange", "yellow", "emerald", "yellow", "orange", "rose"]}
                markerValue={item.sunlight_procent}
                className="mt-1"
              />
              <br/>
              <Flex>
                <Text>Humidity</Text>
                <Text>{item.humidity.toFixed(2)} %</Text>
              </Flex>
              <CategoryBar
                values={[10, 20, 5, 30, 5, 20, 10]}
                colors={["rose", "orange", "yellow", "emerald", "yellow", "orange", "rose"]}
                markerValue={item.humidity}
                className="mt-1"
              />
              <br/>
              
              <Flex>
                <Text>Mouisture of soil</Text>
                <Text>{item.soil_moisture.toFixed(2)} %</Text>
              </Flex>
              <CategoryBar
                values={[10, 20, 5, 30, 5, 20, 10]}
                colors={["rose", "orange", "yellow", "emerald", "yellow", "orange", "rose"]}
                markerValue={item.soil_moisture}
                className="mt-1"
              />
              <Divider>Temperature chart</Divider>
              <LineChart
                className="mt-4 h-40"
                data={item.data}
                index="time"
                categories={["Temperature"]}
                colors={["emerald", "gray"]}
                valueFormatter={temperatureValueFormatter}
                yAxisWidth={50}
              />
              <Divider>Other readings chart</Divider>
              <AreaChart
                className="mt-4 h-40"
                data={item.data}
                index="time"
                categories={["Humidity", "Light level", "Mouisture of soil"]}
                colors={["violet", "sky", "rose"]}
                valueFormatter={percentValueFormatter}
                yAxisWidth={50}
              ></AreaChart>
          </Card>
        ))}
      </Grid>
    </main>
  );
};
