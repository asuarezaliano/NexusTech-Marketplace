'use client'
import { useState } from 'react'
import styles from './UserDropdown.module.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Button } from '../Button/Button'
import { logout } from 'app/actions'

export const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.UserDropdown}>
      <button className={styles.UserDropdown__button} onClick={() => setIsOpen(!isOpen)}>
        <MdKeyboardArrowDown className={isOpen ? styles.open : ''} />
      </button>

      {isOpen && (
        <div className={styles.UserDropdown__items}>
          <Button variant="link" href="/my-account/profile">
            Profile
          </Button>
          <Button variant="link" href="/my-account/purchases">
            Purchases
          </Button>
          <Button variant="link" href="/my-account/items">
            My Items
          </Button>
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
