'use client'
import React, { useState } from 'react'
import { Button } from '../Button/Button'
import styles from './MobileMenu.module.scss'
import { IoMdMenu } from 'react-icons/io'
import Image from 'next/image'
import { logout } from 'app/actions'

interface MobileMenuProps {
  customer: any // Ajusta el tipo según tu implementación
}

const MobileMenu: React.FC<MobileMenuProps> = ({ customer }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleOnClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    logout()
    handleOnClick()
  }

  const handleNavigation = (path: string) => {
    handleOnClick()
    window.location.href = path
  }

  return (
    <div className={styles.mobileMenu}>
      <IoMdMenu onClick={handleOnClick} className={styles.mobileIcon} />
      <div className={`${styles.drawer} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <Image
            loading="lazy"
            src="/images/Icon.jpg"
            alt="Company Logo"
            className={styles.mobileIcon}
            width={55}
            height={55}
          />
          <button className={styles.closeButton} onClick={handleOnClick}>
            ✕
          </button>
        </div>
        <nav className={styles.menu}>
          <Button onClick={() => handleNavigation('/')} variant="link">
            Home
          </Button>
          <Button onClick={() => handleNavigation('/store')} variant="link">
            Store
          </Button>
          {!customer?.firstName ? (
            <Button onClick={() => handleNavigation('/login')}>Sign in</Button>
          ) : (
            <>
              <Button onClick={() => handleNavigation('/my-account/profile')} variant="link">
                Profile
              </Button>
              <Button onClick={() => handleNavigation('/my-account/purchases')} variant="link">
                Purchases
              </Button>
              <Button onClick={() => handleNavigation('/my-account/items')} variant="link">
                My Items
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          )}
        </nav>
      </div>
    </div>
  )
}

export default MobileMenu
