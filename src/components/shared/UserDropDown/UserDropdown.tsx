'use client'
import { useRef, useState } from 'react'
import styles from './UserDropdown.module.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Button } from '../Button/Button'
import { logout } from 'app/actions'
import { useClickOutside } from 'app/hooks/useClickOutside'
import Link from 'next/link'

export const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, () => setIsOpen(false), isOpen)

  return (
    <div className={styles.UserDropdown}>
      <button className={styles.UserDropdown__button} onClick={() => setIsOpen(!isOpen)}>
        <MdKeyboardArrowDown className={isOpen ? styles.open : ''} />
      </button>

      {isOpen && (
        <div ref={modalRef} className={styles.UserDropdown__items}>
          <Button
            variant="link"
            href="/my-account"
            onClick={e => {
              e.stopPropagation()
              setIsOpen(false)
            }}
          >
            Profile
          </Button>
          <Button
            variant="link"
            href="/my-account/items"
            onClick={e => {
              e.stopPropagation()
              setIsOpen(false)
            }}
          >
            My Items
          </Button>
          <Button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              logout()
              setIsOpen(false)
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
