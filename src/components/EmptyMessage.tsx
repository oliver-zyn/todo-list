import { ClipboardText } from "phosphor-react";

import styles from "./EmptyMessage.module.css";

export function EmptyMessage() {
  return (
    <div className={styles.message}>
      <div>
        <ClipboardText size={56} />
      </div>
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  );
}
