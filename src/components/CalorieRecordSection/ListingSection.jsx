import { RecordList } from "./RecordList";
import styles from "./ListingSection.module.css";
import { useEffect, useState } from "react";

export function ListingSection(props) {
  const { allRecords } = props;
  const [filteredRecords, setFilteredRecords] = useState([]);

  /* Initializing the filter date state to today's date */
  const [curruntDate, setCurruntDate] = useState(new Date()); //inisial value date of day
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setFilteredRecords(allRecords.filter(dateFilter));
    }, 5000);
    console.log("data loaded");
    return () => {
      clearTimeout(timeOutId);
      console.log("data cleared");
    };
  }, [curruntDate]);
  /* Handler that updates the filter date when the user picks a date */
  const dateHandller = (event) => {
    setCurruntDate(new Date(event.target.value));
  };

  /* Filter function to check if the record date matches the selected filter date */
  const dateFilter = (record) => {
    return (
      record.date.getDate() === curruntDate.getDate() &&
      record.date.getMonth() === curruntDate.getMonth() &&
      record.date.getFullYear() === curruntDate.getFullYear()
    );
  };

  return (
    <>
      <label className={styles["listing-picker-label"]} htmlFor="listingDate">
        Select DATE:
      </label>
      <input
        id="listingDate"
        type="date"
        className={styles["listing-picker-input"]}
        value={curruntDate.toISOString().split(`T`)[0]} //value date of day
        onChange={dateHandller}
      />
      <RecordList records={filteredRecords} />
    </>
  );
}
