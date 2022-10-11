import { ChangeEvent, FC } from "react"
import styles from './SearchField.module.scss'
import { MaterialIcon } from '../MaterialIcon';

interface ISearchField {
    searchTerm: string
    handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

export const SearchField: FC<ISearchField> = ({searchTerm, handleSearch}) => {
  return (
    <div className={styles.search}>
      <MaterialIcon name="MdSearch"/>
      <input placeholder="Search.." value={searchTerm} onChange={handleSearch}/>
    </div>
  )
}
