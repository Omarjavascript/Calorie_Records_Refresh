import { CalorieRecord } from "./CalorieRecord";
import styles from "./RecordList.module.css";

export function RecordList(props) {
  return (
    <ul className={styles.list}>
      {props.records.map((record) =>
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
        )
      )}
    </ul>
  );
}
