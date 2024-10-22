import styles from '../ChatMessage.module.css';

export default function MessageItem({ message, isCurrentUser, senderAvatar }) {
  return (
    <div className={`${styles.message} ${isCurrentUser ? styles.sent : styles.received}`}>
      <div className={styles.messageContent}>
        <p>{message.content}</p>
        <span className={styles.messageTime}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
        </span>
      </div>
      {!isCurrentUser && (
        <img
          src={senderAvatar || '/default-avatar.png'}
          alt="Sender Avatar"
          width={30}
          height={30}
          className={styles.senderAvatar}
        />
      )}
    </div>
  );
}