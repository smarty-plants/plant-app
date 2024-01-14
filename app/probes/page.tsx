'use client';

import { Radio } from 'react-loader-spinner';
import { Card, Text, Title, Grid, Flex } from '@tremor/react';
import {  useState, useEffect, use } from 'react';
import ProbeCard from './probe_card';
import toast from 'react-hot-toast';

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
  data: {
    time: string;
    temperature: number;
    humidity: number;
    sunlight_procent: number;
    soil_moisture: number;
  }[];
  temperature_ranges: number[];
  humidity_ranges: number[];
  sunlight_ranges: number[];
  soil_moisture_ranges: number[];
};

export default function ProbesPage() {

  const [data, setData] = useState<ProbeData[]>([]);
  const [last_read_time, setLastReadTime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      fetchNewData();
    }
    fetchData();
  }, []);

  const fetchNewData = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/probes/daily/').catch((error) => {
      toast.error('Error fetching data from API', {position: 'bottom-right'});
    });
    if (!response) return;
    const data = await response.json();
    console.log(data);
    setData(data.data);
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
      
      <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
      {isLoading ? (
        <>
        <Flex>
        <Title>Loading...</Title>
        <Radio
            visible={true}
            height="30"
            width="30"
            colors={["#6366F1", "#6366F1", "#6366F1"]}
            ariaLabel="radio-loading"/>
          </Flex>
          </>
      ) : (
        <>
        <Title>Last readings</Title>
        <Text>{last_read_time}</Text>
        </>
      )}
      </Card>
      <br/>
      {!isLoading ? (
      <Text className='mb-3'>Probes:</Text>
      ) : null}
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {data.map((item) => (
          <ProbeCard probe={item} />
        ))}
      </Grid>
    </main>
  );
};
