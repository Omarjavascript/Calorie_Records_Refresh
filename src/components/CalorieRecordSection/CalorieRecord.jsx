import styles from "./CalorieRecord.module.css";
import { StyledRecordCell } from "../common/StyledRecordCell";
import { CalorieRecordDate } from "./CalorieRecordDate";

export function CalorieRecord(props) {
  return (
    <ul className={styles.record}>
      <li>
        <StyledRecordCell>
          <CalorieRecordDate date={props.date} />
        </StyledRecordCell>
      </li>
      <li>{props.meal}</li>
      <li>{props.content}</li>
      <li className={styles["record-calories"]}>
        <StyledRecordCell>{props.calories}</StyledRecordCell>
      </li>
    </ul>
  );
}
