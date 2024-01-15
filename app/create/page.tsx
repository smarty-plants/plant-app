'use client';

import { Card, Title, Dialog, DialogPanel, Text, NumberInput, TextInput, Grid, SearchSelect, SearchSelectItem, Col, LineChart, DateRangePicker,  Metric, Flex, CategoryBar, Divider, AreaChart, Icon, Badge, DateRangePickerValue, Button } from '@tremor/react';
import {  useState, useEffect } from 'react';
import toast from 'react-hot-toast';




export default function IndexPage() {

  type Plant = {
    id: number;
    name: string;
    species: string;
  };

  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [probeName, setProbeName] = useState('');
  const [plantName, setPlantName] = useState('');
  const [plantSpecies, setPlantSpecies] = useState('');
  const [temperatureMin, setTemperatureMin] = useState(0);
  const [temperatureMax, setTemperatureMax] = useState(0);
  const [humidityMin, setHumidityMin] = useState(0);
  const [humidityMax, setHumidityMax] = useState(0);
  const [sunlightMin, setSunlightMin] = useState(0);
  const [sunlightMax, setSunlightMax] = useState(0);
  const [soilMoistureMin, setSoilMoistureMin] = useState(0);
  const [soilMoistureMax, setSoilMoistureMax] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlantOpen, setIsPlantOpen] = useState(false);
  const [createdProbeId, setCreatedProbeId] = useState('');

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
    setIsLoading(false);
  }

  const handleCreateProbe = async () => {
    if (probeName === '') {
      toast.error('Probe name cannot be empty', {position: 'bottom-right'});
      return;
    }
    if (selectedPlant === '') {
      toast.error('Plant must be selected', {position: 'bottom-right'});
      return;
    }
    const plant_id = plants.find((plant) => plant.name === selectedPlant).id;
    const response = await fetch(process.env.API_URL+'/api/probes/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        probe: probeName,
        plant: plant_id,
      }),
    });
    if (response.status === 201) {
      const data = await response.json();
      setCreatedProbeId(data.probe_id);
      setIsOpen(true);
    } else {
      toast.error('Error creating probe', {position: 'bottom-right'});
    }
  
  }

  const handleProbeNameChange = (event) => {
    setProbeName(event.target.value);
  }

  const  handleSelectChange = (event) => {
		setSelectedPlant(event);
	};

  const handlePlantNameChange = (event) => {
    setPlantName(event.target.value);
  }

  const handlePlantSpeciesChange = (event) => {
    setPlantSpecies(event.target.value);
  }

  const handlePlantCreate = async () => {
    if (plantName === '') {
      toast.error('Plant name cannot be empty', {position: 'bottom-right'});
      return;
    }
    if (plantSpecies === '') {
      toast.error('Plant species cannot be empty', {position: 'bottom-right'});
      return;
    }
    if (temperatureMin === 0 && temperatureMax === 0) {
      toast.error('Temperature ranges cannot be empty', {position: 'bottom-right'});
      return;
    }
    if (humidityMin === 0 && humidityMax === 0) {
      toast.error('Humidity ranges cannot be empty', {position: 'bottom-right'});
      return;
    }
    if (sunlightMin === 0 && sunlightMax === 0) {
      toast.error('Sunlight ranges cannot be empty', {position: 'bottom-right'});
      return;
    }
    if (soilMoistureMin === 0 && soilMoistureMax === 0) {
      toast.error('Soil moisture ranges cannot be empty', {position: 'bottom-right'});
      return;
    }
    if (temperatureMin > temperatureMax) {
      toast.error('Min temperature cannot be greater than max temperature', {position: 'bottom-right'});
      return;
    }
    if (humidityMin > humidityMax) {
      toast.error('Min humidity cannot be greater than max humidity', {position: 'bottom-right'});
      return;
    }
    if (sunlightMin > sunlightMax) {
      toast.error('Min sunlight cannot be greater than max sunlight', {position: 'bottom-right'});
      return;
    }
    if (soilMoistureMin > soilMoistureMax) {
      toast.error('Min soil moisture cannot be greater than max soil moisture', {position: 'bottom-right'});
      return;
    }
    if (temperatureMin < -100 || temperatureMin > 100) {
      toast.error('Min temperature must be between -100 and 100', {position: 'bottom-right'});
      return;
    }
    if (temperatureMax < -100 || temperatureMax > 100) {
      toast.error('Max temperature must be between -100 and 100', {position: 'bottom-right'});
      return;
    }
    if (humidityMin < 0 || humidityMin > 100) {
      toast.error('Min humidity must be between 0 and 100', {position: 'bottom-right'});
      return;
    }
    if (humidityMax < 0 || humidityMax > 100) {
      toast.error('Max humidity must be between 0 and 100', {position: 'bottom-right'});
      return;
    }
    if (sunlightMin < 0 || sunlightMin > 100) {
      toast.error('Min sunlight must be between 0 and 100', {position: 'bottom-right'});
      return;
    }
    if (sunlightMax < 0 || sunlightMax > 100) {
      toast.error('Max sunlight must be between 0 and 100', {position: 'bottom-right'});
      return;
    }
    if (soilMoistureMin < 0 || soilMoistureMin > 100) {
      toast.error('Min soil moisture must be between 0 and 100', {position: 'bottom-right'});
      return;
    }
    if (soilMoistureMax < 0 || soilMoistureMax > 100) {
      toast.error('Max soil moisture must be between 0 and 100', {position: 'bottom-right'});
      return;
    }
    const response = await fetch(process.env.API_URL+'/api/plants/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: plantName,
        plant_species: plantSpecies,
        temperature_min: temperatureMin,
        temperature_max: temperatureMax,
        humidity_min: humidityMin,
        humidity_max: humidityMax,
        in_sunlight_procent_min: sunlightMin,
        in_sunlight_procent_max: sunlightMax,
        soil_moisture_min: soilMoistureMin,
        soil_moisture_max: soilMoistureMax,
      }),
    });
    if (response.status === 201) {
      setIsPlantOpen(true);
      fetchNewData();
    } else {
      toast.error('Error creating plant', {position: 'bottom-right'});
    }
  }

 return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <Title className="mb-3">Probe Created Successfully</Title>
          Your probe has been created successfully. You can now set id of your probe. Your probe id is:
          <Text className="mt-2">{createdProbeId}</Text>
          <div className="mt-3">
            <Button variant="light" onClick={() => setIsOpen(false)}>
              Got it!
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
      <Dialog open={isPlantOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <Title className="mb-3">Plant Created Successfully</Title>
          Your plant "{plantName}" has been created successfully.
          <div className="mt-3">
            <Button variant="light" onClick={() => setIsPlantOpen(false)}>
              Got it!
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
        <Grid className="mt-6 gap-6">
        <Card>
          <Title className='mb-4'>Create new probe</Title>
          <Text className='mb-2'>Probe name</Text>
          <TextInput onChange={handleProbeNameChange} placeholder='Probe name...' />
          <Text className='mt-2 mb-2'>Plant</Text>
          <SearchSelect onValueChange={handleSelectChange} placeholder={isLoading?"Loading...":"Select plant..."} disabled={isLoading ? true: false}>
            {plants.map((plant) => (
              <SearchSelectItem key={plant.plant_id} value={plant.name} />
            ))}
          </SearchSelect>
          <Button className='mt-4' onClick={handleCreateProbe} disabled={isLoading || selectedPlant=="" || probeName=="" ? true:false}>Create</Button>
        </Card>
        <Card>
          <Title className='mb-4'>Create new plant</Title>
          <Text className='mb-2'>Plant name</Text>
          <TextInput onChange={handlePlantNameChange} placeholder='Plant name...' />
          <Text className='mb-2 mt-2'>Plant specie</Text>
          <TextInput onChange={handlePlantSpeciesChange} placeholder='Plant specie...' />
          <Text className='mb-2 mt-2'>Temperature ranges</Text>
          <Flex>
            <NumberInput min={-100} max={100}  onChange={(event) => setTemperatureMin(parseInt(event.target.value))} placeholder='Min temperature...' />
            <Text className='mx-2'>-</Text>
            <NumberInput onChange={(event) => setTemperatureMax(parseInt(event.target.value))} placeholder='Max temperature...' />
          </Flex>
          <Text className='mb-2 mt-2'>Humidity ranges</Text>
          <Flex>
            <NumberInput min={0} max={100} onChange={(event) => setHumidityMin(parseInt(event.target.value))} placeholder='Min humidity...' />
            <Text className='mx-2'>-</Text>
            <NumberInput onChange={(event) => setHumidityMax(parseInt(event.target.value))} placeholder='Max humidity...' />
          </Flex>
          <Text className='mb-2 mt-2'>Sunlight ranges</Text>
          <Flex>
            <NumberInput min={0} max={100} onChange={(event) => setSunlightMin(parseInt(event.target.value))} placeholder='Min sunlight...' />
            <Text className='mx-2'>-</Text>
            <NumberInput onChange={(event) => setSunlightMax(parseInt(event.target.value))} placeholder='Max sunlight...' />
          </Flex>
          <Text className='mb-2 mt-2'>Soil moisture ranges</Text>
          <Flex>
            <NumberInput min={0} max={100} onChange={(event) => setSoilMoistureMin(parseInt(event.target.value))} placeholder='Min soil moisture...' />
            <Text className='mx-2'>-</Text>
            <NumberInput onChange={(event) => setSoilMoistureMax(parseInt(event.target.value))} placeholder='Max soil moisture...' />
          </Flex>
          <Button className='mt-4' onClick={handlePlantCreate} disabled={plantName=="" || plantSpecies=="" ? true:false}>Create</Button>
        </Card>
      </Grid>
    </main>
  );
}
