import {
  Card,
  Text,
  Flex,
  Metric,
  List,
  ListItem,
  Bold,
  Badge,
  Button
} from '@tremor/react';
import {
  SignalIcon,
  SignalSlashIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/solid';
import ReadingBadge from './reading_badge';

type StatusType =
  | 'increase'
  | 'moderateIncrease'
  | 'normal'
  | 'moderateDecrease'
  | 'decrease';

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

export default function ProbeItem({ probe }: { probe: ProbeData }) {
  return (
    <Card key={probe.id}>
      <Flex justifyContent="between">
        <Text>{probe.name}</Text>
        <Badge
          icon={probe.is_active ? SignalIcon : SignalSlashIcon}
          color={probe.is_active ? 'emerald' : 'red'}
        >
          {probe.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </Flex>
      <Metric>{probe.plant}</Metric>
      <Flex className="mt-6">
        <Text>
          <Bold>Last readings - {probe.last_read_time}</Bold>
        </Text>
      </Flex>
      <List className="mt-1">
        <ListItem>
          <Flex justifyContent="between" className="truncate space-x-2.5">
            <Flex justifyContent="start" className="truncate space-x-2.5">
              <ReadingBadge status={probe.temperature_status} />
              <Text className="truncate">Temperature</Text>
            </Flex>
            <Text>{probe.temperature.toFixed(2)} °C</Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex justifyContent="between" className="truncate space-x-2.5">
            <Flex justifyContent="start" className="truncate space-x-2.5">
              <ReadingBadge status={probe.humidity_status} />
              <Text className="truncate">Humidity</Text>
            </Flex>
            <Text>{probe.humidity.toFixed(2)} %</Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex justifyContent="between" className="truncate space-x-2.5">
            <Flex justifyContent="start" className="truncate space-x-2.5">
              <ReadingBadge status={probe.soil_moisture_status} />
              <Text className="truncate">Soil moisture</Text>
            </Flex>
            <Text>{probe.soil_moisture.toFixed(2)} %</Text>
          </Flex>
        </ListItem>
        <ListItem>
          <Flex justifyContent="between" className="truncate space-x-2.5">
            <Flex justifyContent="start" className="truncate space-x-2.5">
              <ReadingBadge status={probe.sunlight_status} />
              <Text className="truncate">Sunlight level</Text>
            </Flex>
            <Text>{probe.sunlight_procent.toFixed(2)} %</Text>
          </Flex>
        </ListItem>
      </List>
      <Flex justifyContent="center">
        <a href={`/probes/${probe.id}/`}>
          <Button
            variant="light"
            color="blue"
            className="mt-4"
            icon={MagnifyingGlassIcon}
          >
            Details
          </Button>
        </a>
      </Flex>
    </Card>
  );
}
