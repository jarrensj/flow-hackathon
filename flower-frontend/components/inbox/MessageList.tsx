import styles from '@/styles/Inbox.module.css'

type messageType = {
  sender: string;
  recipient: string;
  updatedAt: string;
  text: string;
}
type Props = {
  messages: messageType[];
  messageType: "Sent" | "Received";
}
export const MessageList = ({ messages, messageType }: Props) => {
  return (
    <div className={styles.messages}>
      <p>Your {messageType} Messages</p>
      <ul>
        {messages.map((msg, i) => {
          return (
            <li key={i} className={`bg-slate-300 p-4 ${styles.message}`}>
              <div className={styles.sender}>FROM: {msg.sender}</div>
              <div className={styles.receiver}>TO: {msg.recipient}</div>
              <div className={styles.timeStamp}>TIME: {msg.updatedAt}</div>
              <div className={styles.text}>MESSAGE: {msg.text}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}