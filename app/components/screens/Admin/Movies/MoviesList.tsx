import { FC } from 'react'

import Heading from '@/components/ui/Heading/Heading'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminTable from '@/ui/admin-table/AdminTable'

import { Meta } from '@/utils/meta/Meta'

import { useMovies } from './useMovies'

const MoviesList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useMovies()
	return (
		<Meta title="Movies panel">
			<AdminNavigation />
			<Heading title="Movies" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Title', 'Genres', 'Rating']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default MoviesList
