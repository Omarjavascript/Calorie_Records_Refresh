import styles from "./CalorieRecord.module.css";
import { StyledRecordCell } from "../common/StyledRecordCell";
import { CalorieRecordDate } from "./CalorieRecordDate";

export function CalorieRecord(props) {
  /* Defensive extraction to prevent object-as-child render crashes */
  const meal =
    typeof props.meal === "object" && props.meal !== null
      ? props.meal.value || "Meal"
      : props.meal;
  const content =
    typeof props.content === "object" && props.content !== null
      ? props.content.value || ""
      : props.content;
  const calories =
    typeof props.calories === "object" && props.calories !== null
      ? props.calories.value || 0
      : props.calories;

  return (
    <ul className={styles.record}>
      <li>
        <StyledRecordCell>
          <CalorieRecordDate date={props.date} />
        </StyledRecordCell>
      </li>
      <li>{meal}</li>
      <li>{content}</li>
      <li className={styles["record-calories"]}>
        <StyledRecordCell>{calories}</StyledRecordCell>
      </li>
    </ul>
  );
}
