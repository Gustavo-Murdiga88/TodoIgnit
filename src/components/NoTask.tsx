import Styles from "./NoTask.module.css";
import notask from "../../images/noTask.svg";
export function NoTask() {
  return (
    <div className={Styles.NoItens}>
      <img src={notask} alt="img Task" />
      <div>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  );
}
