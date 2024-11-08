import React from 'react'
import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <h3 className={styles.logo}>Future World</h3>
            <p className={styles.slogan}>Construyendo el mañana, hoy.</p>
          </div>
          <div className={styles.column}>
            <h4>Enlaces</h4>
            <ul>
              <li>
                <a href="/">Inicio</a>
              </li>
              <li>
                <a href="/store">Store</a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Contacto</h4>
            <p>Email: info@futureworld.com</p>
            <p>Teléfono: +1 234 567 890</p>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} Future World. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
