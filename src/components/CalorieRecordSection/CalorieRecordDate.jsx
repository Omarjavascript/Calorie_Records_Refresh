import styles from "./CalorieRecordDate.module.css";

export function CalorieRecordDate(props) {
  let date = props.date;
  if (!date) {
    date = new Date();
  } else if (!(date instanceof Date)) {
    date = new Date(date);
  }

  // Fallback to today if date is invalid
  if (isNaN(date.getTime())) {
    date = new Date();
  }

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return (
    <div className={styles["record-date"]}>
      <div className={styles["record-date-month"]}>{month}</div>
      <div className={styles["record-date-day"]}>{day}</div>
      <div className={styles["record-date-year"]}>{year}</div>
    </div>
  );
}
