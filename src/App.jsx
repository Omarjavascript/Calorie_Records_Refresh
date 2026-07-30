import { useState } from "react";
import "./App.css";

import { RecordList } from "./components/CalorieRecordSection/RecordList";
import { CalorieRecordEdit } from "./components/edit/CalorieRecordEdit";

export default function App() {
  const INISIAL_RECORDS = [
    {
      id: "r1",
      date: new Date(2023, 2, 1),
      meal: "breakFast",
      content: "eggs + been",
      calories: 340,
    },
    {
      id: "r2",
      date: new Date(2023, 2, 2),
      meal: "Lunch",
      content: "meet + rice",
      calories: 1050,
    },
    {
      id: "r3",
      date: new Date(2023, 2, 5),
      meal: "snack",
      content: "chocklet",
      calories: 562,
    },
    {
      id: "r4",
      date: new Date(2023, 2, 3),
      meal: "dinner",
      content: "burgers",
      calories: 2500,
    },
  ];
  const [records, setRecords] = useState(INISIAL_RECORDS);
  const onFormSubitHandller = (record) => {
    const newRecord = {
      ...record,
      id: "r" + Math.random().toString(36).substring(2, 9),
      date: record.date ? new Date(record.date) : new Date(),
      calories: Number(record.calories) || 0,
    };
    setRecords((prevRecords) => [newRecord, ...prevRecords]);
  };
  return (
    <div>
      <h1>Welcome to React with Almdrasa!</h1>
      <CalorieRecordEdit onFormSubmit={onFormSubitHandller} />
      <RecordList records={records} />
    </div>
  );
}
