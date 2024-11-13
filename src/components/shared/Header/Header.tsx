import React from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'
import { Button } from '../Button/Button'
import dynamic from 'next/dynamic'
import { validateAccessToken } from 'app/utils/auth/validateAccessToken'

const NoSSRShoppingCart = dynamic(() => import('../ShoppingCart'), { ssr: false })
const UserDropdown = dynamic(() => import('../UserDropDown/UserDropdown'), { ssr: false })
const MobileMenu = dynamic(() => import('../MobileMenu/MobileMenu'), { ssr: false })

export const Header: React.FC = async () => {
  const customer = await validateAccessToken()

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Image
          loading="lazy"
          src="/images/Icon.jpg"
          alt="Company Logo"
          className={styles.logo}
          width={55}
          height={55}
        />
        <nav className={`${styles.navigation} ${styles.desktopNav}`}>
          <div className={styles.navLinks}>
            <Button variant="link" href="/#top">
              Home
            </Button>
            <Button variant="link" href="/store" className={styles.navLinkWhite}>
              Store
            </Button>
            <div className={styles.signInWrapper}>
              {customer?.firstName ? (
                <>
                  <p>{customer.firstName}</p>
                  <div className={styles.userMenuWrapper}>
                    <Image
                      loading="lazy"
                      src="/images/UserDefault.png"
                      alt=""
                      className={styles.signInIcon}
                      width={24}
                      height={24}
                    />
                    <UserDropdown />
                  </div>
                </>
              ) : (
                <Button variant="link" href="/login" className={styles.signInText}>
                  Sign in
                </Button>
              )}
              <NoSSRShoppingCart />
            </div>
          </div>
          <div className={styles.sellProductWrapper}>
            <Button>Sell a product</Button>
          </div>
        </nav>

        <nav className={`${styles.navigation} ${styles.mobileNav}`}>
          <div className={styles.mobileActions}>
            <NoSSRShoppingCart />
            <MobileMenu customer={customer} />
          </div>
        </nav>
      </div>
      <div className={styles.divider} role="separator" />
    </header>
  )
}
