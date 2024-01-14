import {
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
  } from "@tremor/react";
  
    type Reading = {
        id: string;
        time: Date;
        "Temperature": number;
        "Humidity": number;
        "Light level": number;
        "Mouisture of soil": number;
    };
  
  export default function ReadingsTable({ readings }: { readings: Reading[] }) {
    return (
    <Table className="mt-6">
        <TableHead>
        <TableRow>
            <TableHeaderCell>Date and Time</TableHeaderCell>
            <TableHeaderCell>Temperature</TableHeaderCell>
            <TableHeaderCell>Humidity</TableHeaderCell>
            <TableHeaderCell>Sunlight Level</TableHeaderCell>
            <TableHeaderCell>Soil Moisture</TableHeaderCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {readings.map((item) => (
            <TableRow key={item.id}>
            <TableCell>{item.time.toLocaleString()}</TableCell>
            <TableCell>{item["Temperature"].toFixed(2)} °C</TableCell>
            <TableCell>{item["Humidity"].toFixed(2)} %</TableCell>
            <TableCell>{item["Light level"].toFixed(2)} %</TableCell>
            <TableCell>{item["Mouisture of soil"].toFixed(2)} %</TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    );
  }