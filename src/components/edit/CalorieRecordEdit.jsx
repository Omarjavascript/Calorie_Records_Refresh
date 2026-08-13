import { useState } from "react";
import styles from "./CalorieRecordEdit.module.css";

export function CalorieRecordEdit(props) {
  /* Restored default values to simple primitive types to avoid React object-as-child runtime crash */
  const DEFUALT_VALUES = {
    date: "",
    meal: "BreakFast",
    content: "",
    calories: 0,
  };
  const [mealRecords, setMealRecords] = useState(DEFUALT_VALUES);

  const ondateHandller = (event) => {
    setMealRecords({
      ...mealRecords,
      date: event.target.value,
    });
  };

  const onMealHandller = (event) => {
    setMealRecords({
      ...mealRecords,
      meal: event.target.value,
    });
  };
  const onContentHandller = (event) => {
    setMealRecords({
      ...mealRecords,
      content: event.target.value,
    });
  };

  const onCaloriesHandller = (event) => {
    setMealRecords({
      ...mealRecords,
      calories: event.target.value,
    });
  };
  const onSubmitHandller = (event) => {
    event.preventDefault();
    setMealRecords(DEFUALT_VALUES); // لمن نسوي سبميت يفضي الانبوتس
    props.onFormSubmit(mealRecords); // container come from parent
  };

  const onCancelHandller = () => {
    setMealRecords(DEFUALT_VALUES); /* Resets form inputs back to default */
    props.onCancel(); /* Closes the modal through App.jsx state trigger */
  };

  /* Helper condition to check if the form is valid (date has value, calories is not empty and is positive) */
  const isFormInvalid =
    !mealRecords.date ||
    mealRecords.calories === "" ||
    Number(mealRecords.calories) < 0;

  return (
    <form className={styles.form} onSubmit={onSubmitHandller}>
      {/* Row 1: Date & Meal */}
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={ondateHandller}
            value={mealRecords.date}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="meal">Meal:</label>
          <select
            name="meal"
            id="meal"
            onChange={onMealHandller}
            value={mealRecords.meal}
          >
            <option value={"BreakFast"}>BreakFast</option>
            <option value={"Lunch"}>Lunch</option>
            <option value={"Snack"}>Snack</option>
            <option value={"Dinner"}>Dinner</option>
          </select>
        </div>
      </div>

      {/* Row 2: Content & Calories */}
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label htmlFor="content">Content:</label>
          <input
            type="text"
            id="content"
            name="content"
            onChange={onContentHandller}
            value={mealRecords.content}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            name="calorie"
            id="calories"
            onChange={onCaloriesHandller}
            value={mealRecords.calories}
            className={`${styles["calories-input"]} ${mealRecords.calories < 0 ? styles.error : ""}`}
          />
        </div>
      </div>

      {/* Row 3: Save and Cancel buttons side by side */}
      <div className={styles.formRow}>
        <button
          type="submit"
          className={styles.primary}
          disabled={isFormInvalid}
        >
          Add Record
        </button>
        <button
          type="button"
          className={styles.secondry}
          onClick={onCancelHandller}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
