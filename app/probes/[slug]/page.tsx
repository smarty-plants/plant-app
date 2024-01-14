'use client';

import { Card, Title, Text, Grid, Col } from '@tremor/react';
import ReadingsTable from './table';
import {  useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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


export default function IndexPage({ params }: { params: { slug: string } }) {

  const [data, setData] = useState<ProbeData>();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [last_read_time, setLastReadTime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      fetchNewData();
    }
    fetchData();
  }, []);

  const fetchNewData = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/probes/details/'+params.slug+"/").catch((error) => {
      toast.error('Error fetching data from API', {position: 'bottom-right'});
    });
    if (!response) return;
    const data = await response.json();
    console.log(data);
    setData(data.data);
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
      <Title>Probe 1</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <Grid numItemsLg={6} className="gap-6 mt-6">
        <Col numColSpanLg={4}>
          <Card className="h-full">
            <div className="h-60">
              <Text>Readings table</Text>
              <ReadingsTable readings={readings} />
            </div>
          </Card>
        </Col>

        <Col numColSpanLg={2}>
          <div className="space-y-6">
            <Card>
              <div className="h-24" />
            </Card>
            <Card>
              <div className="h-24" />
            </Card>
            <Card>
              <div className="h-24" />
            </Card>
            <Card>
              <div className="h-24" />
            </Card>
          </div>
        </Col>
      </Grid>
    </main>
  );
}
