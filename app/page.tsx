import { Card, Title, Text } from '@tremor/react';
import Search from './search';

export default function IndexPage() {

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        
      </Card>
    </main>
  );
}
