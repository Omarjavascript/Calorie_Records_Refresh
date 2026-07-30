import { useState } from "react";
import styles from "./CalorieRecordEdit.module.css";
export function CalorieRecordEdit(props) {
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
    setMealRecords(DEFUALT_VALUES); //لمن نسوي سبميت يفضي الانبوتس
    console.log({
      ...mealRecords,
    });

    props.onFormSubmit(mealRecords); //container come from parent
  };
  return (
    <form className={styles.form} onSubmit={onSubmitHandller}>
      <label htmlFor="date">DATE:</label>
      <input
        type="date"
        name="date"
        id="date"
        onChange={ondateHandller}
        value={mealRecords.date}
      />
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
      <label htmlFor="content">Content</label>
      <input
        type="text"
        id="content"
        name="content"
        onChange={onContentHandller}
        value={mealRecords.content}
      />
      <label htmlFor="calories">Calories</label>
      <input
        type="number"
        name="calorie"
        id="calories"
        onChange={onCaloriesHandller}
        value={mealRecords.calories}
        className={`${styles["calories-input"]} ${mealRecords.calories < 0 ? styles.error : ""}`}
      />
      <div className={styles.footer}>
        <button>Add Record</button>
      </div>
    </form>
  );
}
