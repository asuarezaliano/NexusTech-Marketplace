'use client'
import { useChat } from 'ai/react'
import styles from './Chat.module.scss'
import Title from '../shared/Title/Title'

export const Chat = (props: { agent: string }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: '1',
        role: 'system',
        content: props.agent,
      },
    ],
  })

  return (
    <main className={styles.Chat}>
      <Title variant="subtitle" className={styles.Chat__title}>
        Chatbot
      </Title>
      <form onSubmit={handleSubmit} className={styles.Chat__form}>
        <input
          className={styles.Chat__input}
          value={input}
          onChange={handleInputChange}
          placeholder="What would you like to buy?"
        />
        <button className={styles.Chat__button}>Send</button>
      </form>
      <section className={styles.Chat__messages}>
        {messages
          .filter(m => m.role !== 'system')
          .map(m => {
            return (
              <span key={m.id} className={styles.Chat__message}>
                {m.role === 'assistant' ? '🤖' : '👤'}
                {m.content}
              </span>
            )
          })}
      </section>
    </main>
  )
}
