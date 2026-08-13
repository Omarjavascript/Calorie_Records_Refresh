import { RecordList } from "./RecordList";
import styles from "./ListingSection.module.css";
import { useState } from "react";

export function ListingSection(props) {
  const { allRecords } = props;

  /* Initializing the filter date state to today's date */
  const [curruntDate, setCurruntDate] = useState(new Date());

  /* Handler that updates the filter date when the user picks a date */
  const dateHandller = (event) => {
    setCurruntDate(new Date(event.target.value));
  };

  /* Filter function to check if the record date matches the selected filter date */
  const dateFilter = (record) => {
    if (!curruntDate || isNaN(curruntDate.getTime())) return true;
    const recordDate =
      record.date instanceof Date ? record.date : new Date(record.date);

    return (
      recordDate.getDate() === curruntDate.getDate() &&
      recordDate.getMonth() === curruntDate.getMonth() &&
      recordDate.getFullYear() === curruntDate.getFullYear()
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
        value={
          curruntDate && !isNaN(curruntDate.getTime())
            ? curruntDate.toISOString().split("T")[0]
            : ""
        }
        onChange={dateHandller}
      />
      <RecordList records={allRecords.filter(dateFilter)} />
    </>
  );
}
