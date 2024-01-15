'use client';

import { Grid ,Flex, Title } from "@tremor/react";
import {  useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ProbeItem from "./probe_item";
import { Radio } from 'react-loader-spinner';

type StatusType = 'increase' | 'moderateIncrease' | 'normal' | 'moderateDecrease' | 'decrease';

type ProbeData = {
    id: number;
    name: string;
    is_active: boolean;
    plant: string;
    plant_species: string;
    last_read_time: string;
    temperature: number;
    temperature_status: StatusType;
    sunlight_procent: number;
    sunlight_status: StatusType;
    humidity: number;
    humidity_status: StatusType;
    soil_moisture: number;
    soil_moisture_status: StatusType;
  };

export default function IndexPage() {

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
    const response = await fetch(process.env.API_URL+'api/probes/current/').catch((error) => {
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
      {isLoading ? (
        <div className="flex justify-center items-center">
          <>
          <Title className="mr-4">Loading...</Title>
          <Radio
              visible={true}
              height="30"
              width="30"
              colors={["#6366F1", "#6366F1", "#6366F1"]}
              ariaLabel="radio-loading"/>
            </>
          </div>
          ) : null }
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
      {data.map((item) => (
        <ProbeItem key={item.id} probe={item} />
      ))}
    </Grid>

    </main>
  );
}
