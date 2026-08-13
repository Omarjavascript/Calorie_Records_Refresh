import { CalorieRecord } from "./CalorieRecord";
import styles from "./RecordList.module.css";

export function RecordList(props) {
  const records = props.records || [];

  const totalCalories = records.reduce(
    (sum, record) => sum + (Number(record.calories) || 0),
    0,
  );

  const resultElement = records.length ? (
    <ul className={styles.list}>
      {records.map((record) =>
        record.calories > 0 ? (
          <li className={styles.listItem} key={record.id}>
            <CalorieRecord
              date={record.date}
              meal={record.meal}
              content={record.content}
              calories={record.calories}
            />
          </li>
        ) : (
          <li className={styles.listItem} key={record.id}>
            Invalid value
          </li>
        ),
      )}
    </ul>
  ) : (
    <div className={styles.placeholder}>NO RECORDS ON THIS DATE</div>
  );

  return (
    <>
      {resultElement}
      <div style={{ marginTop: "15px", fontWeight: "bold" }}>
        <label>Total calories: </label>
        <span>{totalCalories}</span>
      </div>
    </>
  );
}
