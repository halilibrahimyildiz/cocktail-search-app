import {useEffect, useState} from "react"

function useLocalStorage(key, initialValue) {
  // Local storage'dan değeri alır
  const getLocalStorageItem = () => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  }

  // Local storage'a değeri kaydeder
  const setLocalStorageItem = (value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const [storedValue, setStoredValue] = useState(getLocalStorageItem)

  useEffect(() => {
    // Local storage'dan değeri alır
    const data = getLocalStorageItem()
    // State'i günceller
    setStoredValue(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [storedValue, setLocalStorageItem]
}

export default useLocalStorage
