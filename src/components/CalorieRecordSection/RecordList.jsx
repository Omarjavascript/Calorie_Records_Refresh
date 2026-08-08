import { useState } from "react";
import { CalorieRecord } from "./CalorieRecord";
import styles from "./RecordList.module.css";

export function RecordList(props) {
  const [totalRecords, setTotalRecords] = useState(0);

  const resultElement = props.records?.length ? (
    <ul className={styles.list}>
      {props.records.map((record) =>
        record.calories > 0 ? (
          <li className={styles["list-Item"]} key={record.id}>
            <CalorieRecord
              date={record.date}
              meal={record.meal}
              content={record.content}
              calories={record.calories}
              addCalories={setTotalRecords}
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
    <div className={styles.placeholder}>NO RECORDS ON THIS DATE </div>
  );
  return (
    <>
      {resultElement}
      <label>total calories:</label>
      {totalRecords}
    </>
  );
}
