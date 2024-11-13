import React from 'react'
import styles from './Footer.module.scss'
import { Button } from '../Button/Button'

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <h3 className={styles.logo}>Nexus Tech</h3>
            <p className={styles.slogan}>Tomorrow&apos;s Tech, Today&apos;s Reality</p>
          </div>
          <div className={styles.column}>
            <h4>Links</h4>
            <ul>
              <li>
                <Button variant="link" href="/">
                  Home
                </Button>
              </li>
              <li>
                <Button variant="link" href="/store">
                  Store
                </Button>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Contact</h4>
            <p>Email: alesuarezaliano@gmail.com</p>
            <p>Mobile: +1 234 567 890</p>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} Nexus Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
