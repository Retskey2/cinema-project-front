import { FC } from 'react'

import Heading from '@/components/ui/Heading/Heading'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminTable from '@/ui/admin-table/AdminTable'

import { Meta } from '@/utils/meta/Meta'

import { useGenres } from './useGenres'

const GenresList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useGenres()
	return (
		<Meta title="Genre panel">
			<AdminNavigation />
			<Heading title="Genre" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['name', 'Slug']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default GenresList
