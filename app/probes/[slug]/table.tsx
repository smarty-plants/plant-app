import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue
} from '@nextui-org/react';
import { useAsyncList } from '@react-stately/data';

type Reading = {
  id: string;
  time: string;
  Temperature: number;
  Humidity: number;
  'Light level': number;
  'Mouisture of soil': number;
};

type Item = {
  [key: string]: string | number | Date;
};

export default function ReadingsTable({
  data,
  api_url
}: {
  data: Reading[];
  api_url: string;
}) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6;

  const [isLoading, setIsLoading] = React.useState(true);

  const converded_data = data.map((item) => {
    return {
      time: item.time,
      temperature: item.Temperature.toFixed(2),
      humidity: item.Humidity.toFixed(2),
      light_level: item['Light level'].toFixed(2),
      soil_mouisture: item['Mouisture of soil'].toFixed(2)
    };
  });

  const pages = Math.ceil(data.length / rowsPerPage);

  let list = useAsyncList<Item>({
    async load({ signal }) {
      let res = await fetch(api_url);
      let json = await res.json();
      setIsLoading(false);
      return {
        items: json.data.data
      };
    },
    async sort({ items, sortDescriptor }) {
      if (sortDescriptor.column === 'time') {
        return {
          items: items.sort((a, b) => {
            if (sortDescriptor && sortDescriptor.column) {
              let first = new Date(a[sortDescriptor.column]);
              let second = new Date(b[sortDescriptor.column]);
              let cmp = first < second ? -1 : 1;

              if (sortDescriptor.direction === 'descending') {
                cmp *= -1;
              }

              return cmp;
            }
            return 0;
          })
        };
      }
      return {
        items: items.sort((a, b) => {
          if (!sortDescriptor || !sortDescriptor.column) {
            return 0;
          }
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (String(first) || first) < (String(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === 'descending') {
            cmp *= -1;
          }

          return cmp;
        })
      };
    }
  });

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return list.items.slice(start, end);
  }, [page, list.items]);

  return (
    <Table
      removeWrapper
      aria-label="Example table with client side pagination"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={Math.ceil(list.items.length / rowsPerPage)}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]'
      }}
    >
      <TableHeader>
        <TableColumn key="time" allowsSorting>
          Time
        </TableColumn>
        <TableColumn key="Temperature" allowsSorting>
          Temperature (°C)
        </TableColumn>
        <TableColumn key="Humidity" allowsSorting>
          Humidity (%)
        </TableColumn>
        <TableColumn key="Light level" allowsSorting>
          Light level (%)
        </TableColumn>
        <TableColumn key="Mouisture of soil" allowsSorting>
          Mouisture of soil (%)
        </TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={(item as { time: string }).time}>
            {(columnKey) => (
              <TableCell>
                {columnKey != 'time'
                  ? getKeyValue(item, columnKey).toFixed(2)
                  : getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
