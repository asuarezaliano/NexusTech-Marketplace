'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './SortSelect.module.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useClickOutside } from 'app/hooks/useClickOutside'

interface SortSelectProps {
  sortType?: string
}

export default function SortSelect({ sortType }: SortSelectProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(sortType ?? '')
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, () => setIsOpen(false), isOpen)

  const options = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'title-asc', label: 'Name: A-Z' },
    { value: 'title-desc', label: 'Name: Z-A' },
  ]

  const handleSelect = (value: string) => {
    setSelectedOption(value)
    setIsOpen(false)

    const url = new URL(window.location.href)
    url.searchParams.set('sort', value)
    router.push(url.toString())
  }

  return (
    <div className={styles.SortSelect}>
      <button className={styles.SortSelect__button} onClick={() => setIsOpen(!isOpen)}>
        <span>{options.find(opt => opt.value === selectedOption)?.label || 'Sort by...'}</span>
        <MdKeyboardArrowDown className={`${styles.arrow} ${isOpen ? styles.open : ''}`} />
      </button>

      {isOpen && (
        <div ref={modalRef} className={styles.SortSelect__items}>
          {options.map(option => (
            <div key={option.value} onClick={() => handleSelect(option.value)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
