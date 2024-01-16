import {
  Card,
  Text,
  Title,
  LineChart,
  Flex,
  CategoryBar,
  Divider,
  AreaChart,
  Icon,
  Badge
} from '@tremor/react';
import {
  MagnifyingGlassIcon,
  SignalIcon,
  SignalSlashIcon
} from '@heroicons/react/24/solid';

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

const temperatureValueFormatter = (number: number | bigint) =>
  `${new Intl.NumberFormat('us').format(number).toString()}°C`;
const percentValueFormatter = (number: number | bigint) =>
  `${new Intl.NumberFormat('us').format(number).toString()} %`;

export default function ProbeCard({ probe }: { probe: ProbeData }) {
  return (
    <Card key={probe.id}>
      <Flex justifyContent="center" alignItems="center">
        <Badge
          icon={probe.is_active ? SignalIcon : SignalSlashIcon}
          color={probe.is_active ? 'emerald' : 'red'}
        >
          {probe.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </Flex>
      <Flex>
        <Title>{probe.name}</Title>
        <a href={`/probes/${probe.id}/`}>
          <Icon
            icon={MagnifyingGlassIcon}
            variant="outlined"
            tooltip="Details"
          />
        </a>
      </Flex>
      <Flex
        justifyContent="start"
        flexDirection="col"
        alignItems="baseline"
        className="space-x-2"
      >
        <Text>Plant: {probe.plant}</Text>
        <Text>Species: {probe.plant_species}</Text>
        <Text>Last reading: {probe.last_read_time}</Text>
      </Flex>
      <Divider>Current sensors data</Divider>
      <Flex>
        <Text>Temperature</Text>
        <Text>{probe.temperature.toFixed(2)} °C</Text>
      </Flex>
      <CategoryBar
        values={probe.temperature_ranges}
        colors={[
          'rose',
          'orange',
          'yellow',
          'emerald',
          'yellow',
          'orange',
          'rose'
        ]}
        markerValue={probe.temperature}
        showLabels={false}
        className="mt-1"
      />
      <br />
      <Flex>
        <Text>Light level</Text>
        <Text>{probe.sunlight_procent.toFixed(2)} %</Text>
      </Flex>
      <CategoryBar
        values={probe.sunlight_ranges}
        colors={[
          'rose',
          'orange',
          'yellow',
          'emerald',
          'yellow',
          'orange',
          'rose'
        ]}
        markerValue={probe.sunlight_procent}
        showLabels={false}
        className="mt-1"
      />
      <br />
      <Flex>
        <Text>Humidity</Text>
        <Text>{probe.humidity.toFixed(2)} %</Text>
      </Flex>
      <CategoryBar
        values={probe.humidity_ranges}
        colors={[
          'rose',
          'orange',
          'yellow',
          'emerald',
          'yellow',
          'orange',
          'rose'
        ]}
        markerValue={probe.humidity}
        showLabels={false}
        className="mt-1"
      />
      <br />

      <Flex>
        <Text>Mouisture of soil</Text>
        <Text>{probe.soil_moisture.toFixed(2)} %</Text>
      </Flex>
      <CategoryBar
        values={probe.soil_moisture_ranges}
        colors={[
          'rose',
          'orange',
          'yellow',
          'emerald',
          'yellow',
          'orange',
          'rose'
        ]}
        markerValue={probe.soil_moisture}
        showLabels={false}
        className="mt-1"
      />
      <Divider>Temperature chart</Divider>
      <LineChart
        className="mt-4 h-40"
        data={probe.data}
        index="time"
        categories={['Temperature']}
        colors={['emerald', 'gray']}
        valueFormatter={temperatureValueFormatter}
        showXAxis={false}
        yAxisWidth={50}
      />
      <Divider>Other readings chart</Divider>
      <AreaChart
        className="mt-4 h-40"
        data={probe.data}
        index="time"
        categories={['Humidity', 'Light level', 'Mouisture of soil']}
        colors={['sky', 'yellow', 'lime']}
        valueFormatter={percentValueFormatter}
        showXAxis={false}
        yAxisWidth={50}
      ></AreaChart>
    </Card>
  );
}
