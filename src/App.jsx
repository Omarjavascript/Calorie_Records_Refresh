import {
  useState,
  useEffect,
} from "react"; /* Imported useEffect to listen to state changes */
import "./App.css";
import * as Dialog from "@radix-ui/react-dialog"; /* Import Radix UI Dialog primitive */
import styles from "./components/edit/Modal.module.css"; /* Import the CSS module for the modal styles */

import { ListingSection } from "./components/CalorieRecordSection/ListingSection"; /* Changed from RecordList to ListingSection to restore date filtering */
import { CalorieRecordEdit } from "./components/edit/CalorieRecordEdit";

export default function App() {
  /* Set default calorie records list to empty so the app starts blank */
  const INISIAL_RECORDS = [];

  /* 1. Initializing state using a lazy function to load data from LocalStorage on mount */
  const [records, setRecords] = useState(() => {
    const storedRecords = localStorage.getItem("calorie_records");
    if (storedRecords) {
      try {
        console.log({ storedRecords });
        const parsed = JSON.parse(storedRecords);
        /* Critical: JSON parses dates as Strings. We must convert them back to Date objects! */
        return parsed.map((record) => ({
          ...record,
          date: new Date(record.date),
        }));
      } catch (error) {
        console.error("Error parsing localStorage records:", error);
      }
    }

    return INISIAL_RECORDS; /* Fallback to default records list if empty */
  });

  /* State to control if the Dialog Modal is open or closed */
  const [isOpen, setIsOpen] = useState(false);

  /* 2. Effect hook to save records to LocalStorage automatically whenever the state changes */
  useEffect(() => {
    localStorage.setItem("calorie_records", JSON.stringify(records));
  }, [records]);

  /* Handler called when the form in CalorieRecordEdit is submitted */
  const onFormSubitHandller = (record) => {
    const newRecord = {
      ...record,
      id:
        "r" +
        Math.random()
          .toString(36)
          .substring(2, 9) /* Generates a unique key for the map list */,
      date: record.date
        ? new Date(record.date)
        : new Date() /* Parses the date correctly */,
      calories:
        Number(record.calories) || 0 /* Ensures calories is a numeric value */,
    };
    setRecords((prevRecords) => [
      newRecord,
      ...prevRecords,
    ]); /* Adds the new record to the top of the state array */
    setIsOpen(false); /* Closes the Dialog modal automatically */
  };
  console.log({ localStorage });
  return (
    <div>
      <h1>Welcome to React with Almdrasa!</h1>

      {/* 1. Dialog Root: Connects the open state and change handler */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        {/* 2. Dialog Trigger: Renders the "Track food" button on the screen */}
        <Dialog.Trigger asChild>
          <button className={styles.trackButton}>Track food</button>
        </Dialog.Trigger>

        {/* 3. Dialog Portal: Mounts the overlay/modal elements at the root level of the DOM */}
        <Dialog.Portal>
          {/* 4. Dialog Overlay: The semi-transparent dark backdrop screen */}
          <Dialog.Overlay className={styles.overlay} />

          {/* 5. Dialog Content: The modal popup box containing the form */}
          <Dialog.Content className={styles.content}>
            {/* Title representing accessibility header for screen readers */}
            <Dialog.Title className={styles.title}>Track New Meal</Dialog.Title>

            {/* Our custom form component, passing both submit and cancel handlers */}
            <CalorieRecordEdit
              onFormSubmit={onFormSubitHandller}
              onCancel={() =>
                setIsOpen(false)
              } /* Closes the modal on Cancel click */
            />

            {/* 6. Dialog Close: Renders an 'X' button to close the modal manually */}
            <Dialog.Close asChild>
              <button className={styles.closeButton} aria-label="Close">
                ×
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* 7. Restored: We now render ListingSection (which includes the Date Filter input) instead of RecordList directly */}
      <ListingSection allRecords={records} />
    </div>
  );
}
