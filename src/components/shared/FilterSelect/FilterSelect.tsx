'use client'
import { useRef, useState } from 'react'
import styles from './FilterSelect.module.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Link from 'next/link'
import { useClickOutside } from 'app/hooks/useClickOutside'

interface FilterSelectProps {
  collections: Array<{
    id: string
    handle: string
    title: string
  }>
}

export default function FilterSelect({ collections }: FilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, () => setIsOpen(false), isOpen)

  const handleSelect = (value: string) => {
    setSelectedOption(value)
    setIsOpen(false)
  }

  return (
    <div onBlur={() => setIsOpen(false)} tabIndex={0} className={styles.FilterSelect}>
      <button className={styles.FilterSelect__button} onClick={() => setIsOpen(!isOpen)}>
        <span>
          {collections.find(col => col.handle === selectedOption)?.title ||
            'Filter by Collection...'}
        </span>
        <MdKeyboardArrowDown className={`${styles.arrow} ${isOpen ? styles.open : ''}`} />
      </button>

      {isOpen && (
        <div ref={modalRef} className={styles.FilterSelect__items}>
          <Link onClick={() => handleSelect('')} key={'0'} href={'/store/'}>
            All
          </Link>
          {collections.map(collection => (
            <Link
              onClick={() => handleSelect(collection.title)}
              key={collection.id}
              href={'/store/' + collection.handle}
            >
              {collection.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
