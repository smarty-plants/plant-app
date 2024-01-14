'use client';

import { Card, Title, Text, Grid, Col, LineChart, DateRangePicker,  Metric, Flex, CategoryBar, Divider, AreaChart, Icon, Badge, DateRangePickerValue } from '@tremor/react';
import ReadingsTable from './table';
import {  useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Radio } from 'react-loader-spinner';
import { SignalIcon, SignalSlashIcon } from '@heroicons/react/24/solid';
import { it } from 'node:test';



type Reading = {
  id: string;
  time: Date;
  "Temperature": number;
  "Humidity": number;
  "Light level": number;
  "Mouisture of soil": number;
};

type ProbeData = {
  id: number;
  name: string;
  is_active: boolean;
  plant: string;
  plant_species: string;
  last_read_time: string;
  temperature: number;
  sunlight_procent: number;
  humidity: number;
  soil_moisture: number;
  data: Reading[];
  temperature_ranges: number[];
  humidity_ranges: number[];
  sunlight_ranges: number[];
  soil_moisture_ranges: number[];
};

const temperatureValueFormatter = (number: number | bigint) => `${new Intl.NumberFormat("us").format(number).toString()}°C`;
const percentValueFormatter = (number: number | bigint) => `${new Intl.NumberFormat("us").format(number).toString()} %`;
  

export default function IndexPage({ params }: { params: { slug: string } }) {

  const [data, setData] = useState<ProbeData>();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [last_read_time, setLastReadTime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fullData, setFullData] = useState<ProbeData>();

  useEffect(() => {
    async function fetchData() {
      fetchNewData();
    }
    fetchData();
  }, []);

  const handleDateRangeChange: (value: DateRangePickerValue) => void = (value) => {
    const from = value.from;
    const to = value.to;
    if (!from || !to){
      setData(fullData);
      return;
    };
    const filtered_data = fullData?.data.filter((item) => {
      const item_time = new Date(item.time);
      item_time.setHours(0);
      item_time.setMinutes(0);
      item_time.setSeconds(0);
      return (item_time >= from && item_time <= to);
    });
    setData({...data, data: filtered_data});
  };

  const fetchNewData = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/probes/details/'+params.slug+"/").catch((error) => {
      toast.error('Error fetching data from API', {position: 'bottom-right'});
    });
    if (!response) return;
    const data = await response.json();
    console.log(data);
    setData(data.data);
    setFullData(data.data);
    setReadings(data.data.data);
    setLastReadTime(data.read_time);
    setIsLoading(false);
    toast.success('New data fetched successfully', {position: 'bottom-right'});
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNewData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {isLoading ? <div className="flex justify-center items-center">
          <>
          <Title className="mr-4">Loading...</Title>
          <Radio
              visible={true}
              height="30"
              width="30"
              colors={["#6366F1", "#6366F1", "#6366F1"]}
              ariaLabel="radio-loading"/>
            </>
          </div> : 
      <>
      <Flex>
      <Title >{data?.name}</Title>
      <Badge icon={data?.is_active ? SignalIcon : SignalSlashIcon} color={data?.is_active ? "emerald" : "red"}>{data?.is_active ? "Active" : "Inactive"}</Badge>
      </Flex>
      <Text>{data?.plant} - {data?.plant_species}</Text><Grid numItemsLg={6} className="gap-6 mt-6">
          <Col numColSpanLg={4}>
            <Card className="h-full overflow-hidden">
              <div className="h-60">
                <Text>Readings table</Text>
                <ReadingsTable data={readings} api_url={'http://127.0.0.1:8000/api/probes/details/' + params.slug + "/"} />
              </div>
            </Card>
          </Col>

          <Col numColSpanLg={2}>
            <div className="space-y-6">
            <Card>
                <div className="h-30">
                  
                  <Text>Last update time:</Text>
                  <Metric>{data?.last_read_time}</Metric>
                </div>
              </Card>
              <Card>
                <div className="h-58">
                  <Flex>
                    <Text>Temperature</Text>
                    <Text>{data?.temperature.toFixed(2)} °C</Text>
                  </Flex>
                  <CategoryBar
                    values={data?.temperature_ranges}
                    colors={["rose", "orange", "yellow", "emerald", "yellow", "orange", "rose"]}
                    markerValue={data?.temperature}
                    showLabels={false}
                    className="mt-1" />
                  <br />
                  <Flex>
                    <Text>Light level</Text>
                    <Text>{data?.sunlight_procent.toFixed(2)} %</Text>
                  </Flex>
                  <CategoryBar
                    values={data?.sunlight_ranges}
                    colors={["rose", "orange", "yellow", "emerald", "yellow", "orange", "rose"]}
                    markerValue={data?.sunlight_procent}
                    showLabels={false}
                    className="mt-1" />
                  <br />
                  <Flex>
                    <Text>Humidity</Text>
                    <Text>{data?.humidity.toFixed(2)} %</Text>
                  </Flex>
                  <CategoryBar
                    values={data?.humidity_ranges}
                    colors={["rose", "orange", "yellow", "emerald", "yellow", "orange", "rose"]}
                    markerValue={data?.humidity}
                    showLabels={false}
                    className="mt-1" />
                  <br />

                  <Flex>
                    <Text>Mouisture of soil</Text>
                    <Text>{data?.soil_moisture.toFixed(2)} %</Text>
                  </Flex>
                  <CategoryBar
                    values={data?.soil_moisture_ranges}
                    colors={["rose", "orange", "yellow", "emerald", "yellow", "orange", "rose"]}
                    markerValue={data?.soil_moisture}
                    showLabels={false}
                    className="mt-1" />
                </div>
              </Card>
            </div>
          </Col>
        </Grid>
        <Card className="mt-6">
          <Flex>
            <Text>Temperature chart</Text>
            <DateRangePicker
              className="ml-4"
              onValueChange={handleDateRangeChange}
              />
          </Flex>
          <AreaChart
                  data={data?.data}
                  index="time"
                  categories={["Temperature"]}
                  colors={["emerald", "gray"]}
                  valueFormatter={temperatureValueFormatter}
                  showXAxis={false}
                  
                  yAxisWidth={50}
                />
          <Divider/>
          <Text>Humidity chart</Text>
          <AreaChart
                data={data?.data}
                index="time"
                categories={["Humidity"]}
                colors={["sky"]}
                valueFormatter={percentValueFormatter}
                showXAxis={false}
                yAxisWidth={50}
              ></AreaChart>
          <Divider/>

          <Text>Light level chart</Text>
          <AreaChart
                data={data?.data}
                index="time"
                categories={["Light level"]}
                colors={["yellow"]}
                valueFormatter={percentValueFormatter}
                showXAxis={false}
                yAxisWidth={50}
              ></AreaChart>
          <Divider/>
          <Text>Mouisture of soil chart</Text>
          <AreaChart
                data={data?.data}
                index="time"
                categories={["Mouisture of soil"]}
                colors={["lime"]}
                valueFormatter={percentValueFormatter}
                showXAxis={false}
                yAxisWidth={50}
              ></AreaChart>
        </Card>
        </>
}
    </main>
  );
}
