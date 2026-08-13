import {
  useState,
  useEffect,
} from "react"; /* Imported useEffect to listen to state changes */
import "./App.css";
import * as Dialog from "@radix-ui/react-dialog"; /* Import Radix UI Dialog primitive */
import styles from "./components/edit/Modal.module.css"; /* Import the CSS module for the modal styles */

import { ListingSection } from "./components/CalorieRecordSection/ListingSection";
import { CalorieRecordEdit } from "./components/edit/CalorieRecordEdit";

export default function App() {
  /* Set default calorie records list to empty so the app starts blank */
  const INISIAL_RECORDS = [];

  /* 1. Initializing state and sanitizing any corrupted data stored in localStorage */
  const [records, setRecords] = useState(() => {
    const storedRecords = localStorage.getItem("calorie_records");
    if (storedRecords) {
      try {
        const parsed = JSON.parse(storedRecords);
        if (Array.isArray(parsed)) {
          return parsed.map((record) => ({
            id: record.id || "r" + Math.random().toString(36).substring(2, 9),
            date: record.date ? new Date(record.date) : new Date(),
            /* Defensive check: extract value string if record was saved as an object */
            meal:
              typeof record.meal === "object" && record.meal !== null
                ? record.meal.value || "BreakFast"
                : record.meal || "BreakFast",
            content:
              typeof record.content === "object" && record.content !== null
                ? record.content.value || ""
                : record.content || "",
            calories:
              typeof record.calories === "object" && record.calories !== null
                ? Number(record.calories.value) || 0
                : Number(record.calories) || 0,
          }));
        }
      } catch (error) {
        console.error("Error parsing localStorage records:", error);
      }
    }

    return INISIAL_RECORDS;
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
      id: "r" + Math.random().toString(36).substring(2, 9),
      date: record.date ? new Date(record.date) : new Date(),
      meal:
        typeof record.meal === "object" && record.meal !== null
          ? record.meal.value || "BreakFast"
          : record.meal || "BreakFast",
      content:
        typeof record.content === "object" && record.content !== null
          ? record.content.value || ""
          : record.content || "",
      calories:
        typeof record.calories === "object" && record.calories !== null
          ? Number(record.calories.value) || 0
          : Number(record.calories) || 0,
    };
    setRecords((prevRecords) => [newRecord, ...prevRecords]);
    setIsOpen(false);
  };

  return (
    <div>
      <h1>Calories Trackers!</h1>
      <p style="font-family: 'Arial', sans-serif; font-size: 20px; font-weight: bold;">
        Fix the bug
      </p>

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
            <Dialog.Title className={styles.title}>
              Track New Meal and{" "}
            </Dialog.Title>

            {/* Our custom form component, passing both submit and cancel handlers */}
            <CalorieRecordEdit
              onFormSubmit={onFormSubitHandller}
              onCancel={() => setIsOpen(false)}
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

      {/* 7. ListingSection for displaying the Date Filter input and RecordList */}
      <ListingSection allRecords={records} />
    </div>
  );
}
