'use client';

import { Card, Text, Title, LineChart, Flex, Grid, CategoryBar, Divider, AreaChart, Icon } from '@tremor/react';


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
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Text>Probe description</Text>
            </Flex>
            <Divider>Current sensors data</Divider>
            <Flex>
                <Text>Light level</Text>
                <Text>62%</Text>
              </Flex>
              <CategoryBar
                values={[10, 20, 5, 30, 5, 20, 10]}
                colors={["rose", "orange", "yellow", "emerald", "yellow", "orange", "rose"]}
                markerValue={62}
                className="mt-1"
              />
              <br/>
              <Flex>
                <Text>Humidity</Text>
                <Text>62%</Text>
              </Flex>
              <CategoryBar
                values={[10, 20, 5, 30, 5, 20, 10]}
                colors={["rose", "orange", "yellow", "emerald", "yellow", "orange", "rose"]}
                markerValue={62}
                className="mt-1"
              />
              <br/>
              <Flex>
                <Text>Temperature</Text>
                <Text>22°C</Text>
              </Flex>
              <CategoryBar
                values={[10, 20, 5, 30, 5, 20, 10]}
                colors={["rose", "orange", "yellow", "emerald", "yellow", "orange", "rose"]}
                markerValue={62}
                className="mt-1"
              />
              <br/>
              <Flex>
                <Text>Mouisture of soil</Text>
                <Text>62%</Text>
              </Flex>
              <CategoryBar
                values={[10, 20, 5, 30, 5, 20, 10]}
                colors={["rose", "orange", "yellow", "emerald", "yellow", "orange", "rose"]}
                markerValue={62}
                className="mt-1"
              />
              <Divider>Temperature chart</Divider>
              <LineChart
                className="mt-4 h-40"
                data={chartdata}
                index="datetime"
                categories={["Temperature"]}
                colors={["emerald", "gray"]}
                valueFormatter={temperatureValueFormatter}
                yAxisWidth={50}
              />
              <Divider>Other readings chart</Divider>
              <AreaChart
                className="mt-4 h-40"
                data={chartdata}
                index="datetime"
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
}
