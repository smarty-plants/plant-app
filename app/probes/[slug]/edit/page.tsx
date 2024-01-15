'use client';

import { Card, Title, Dialog, DialogPanel, Text, NumberInput, TextInput, Grid, SearchSelect, SearchSelectItem, Col, LineChart, DateRangePicker,  Metric, Flex, CategoryBar, Divider, AreaChart, Icon, Badge, DateRangePickerValue, Button } from '@tremor/react';
import {  useState, useEffect, SetStateAction, Key } from 'react';
import toast from 'react-hot-toast';
import { Radio } from 'react-loader-spinner';


export default function IndexPage({ params }: { params: { slug: string } }) {

  type Plant = {
    plant_id: Key | null | undefined;
    id: number;
    name: string;
    species: string;
  };

  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [probeName, setProbeName] = useState('');

  useEffect(() => {
    fetchNewData();
  }, [])

  const fetchNewData = async () => {
    const response = await fetch(process.env.API_URL+'/api/plants/').catch((error) => {
      toast.error('Error fetching data from API', {position: 'bottom-right'});
    }
    );
    if (!response) return;
    const data = await response.json();
    console.log(data);
    var i = 0;
    const plants = data.map((plant: { plant_id: any; name: string; species: any; }) => {
      i++;
      return {
        id: plant.plant_id,
        name: i+ ". " +plant.name,
        species: plant.species,
      };
    });
    setPlants(plants);
    const response2 = await fetch(process.env.API_URL+'/api/probe/detail/'+params.slug+"/").catch((error) => {
      toast.error('Error fetching data from API', {position: 'bottom-right'});
    }
    );
    if (!response2) return;
    const data2 = await response2.json();
    if(data2.plant){
      console.log(data2.plant);
      console.log(plants);
      setSelectedPlant(plants.find((plant: { id: any; }) => plant.id === data2.plant).name);
      console.log(selectedPlant);
    }
    setProbeName(data2.name);
    setIsLoading(false);
  }

  const handleUpdateProbe = async () => {
    if (probeName === '') {
      toast.error('Probe name cannot be empty', {position: 'bottom-right'});
      return;
    }
    if (selectedPlant === '') {
      toast.error('Plant must be selected', {position: 'bottom-right'});
      return;
    }
    const foundPlant = plants.find((plant: {name: string}) => plant.name === selectedPlant);
    const plant_id = foundPlant ? foundPlant.id : undefined;
    const response = await fetch(process.env.API_URL+'/api/probe/detail/'+params.slug+"/", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: probeName,
        plant: plant_id,
      }),
    });
    if (response.status === 200) {
      toast.success('Probe updated', {position: 'bottom-right'});
    } else {
      toast.error('Error while updating probe', {position: 'bottom-right'});
    }
  
  }

  const handleProbeNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setProbeName(event.target.value);
  }

  const  handleSelectChange = (event: SetStateAction<string>) => {
		setSelectedPlant(event);
	};


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
        <Grid className="mt-6 gap-6">
        <Card>
          <Title className='mb-4'>Update probe</Title>
          <Text className='mb-2'>Probe name</Text>
          <TextInput onChange={handleProbeNameChange} placeholder='Probe name...' value={probeName} />
          <Text className='mt-2 mb-2'>Plant</Text>
          <SearchSelect onValueChange={handleSelectChange} placeholder={isLoading?"Loading...":"Select plant..."} disabled={isLoading ? true: false} value={selectedPlant}>
            {plants.map((plant) => (
              <SearchSelectItem key={plant.plant_id} value={plant.name} />
            ))}
          </SearchSelect>
          <Flex>
            <Button className='mt-4' onClick={handleUpdateProbe} disabled={isLoading || selectedPlant=="" || probeName=="" ? true:false}>Update</Button>
            <a href={"/probes/"+params.slug}><Button className='mt-4 ml-4' variant='secondary' color='slate'>Back</Button></a>
          </Flex>
        </Card>
      </Grid>
      }
    </main>
  );
}
