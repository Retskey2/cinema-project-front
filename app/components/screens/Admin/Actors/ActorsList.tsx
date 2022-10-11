import { FC } from 'react'

import Heading from '@/components/ui/Heading/Heading'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminTable from '@/ui/admin-table/AdminTable'

import { Meta } from '@/utils/meta/Meta'

import { useActors } from './useActors'

const ActorsList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useActors()
	return (
		<Meta title="Actors panel">
			<AdminNavigation />
			<Heading title="Actors" />

			<AdminHeader
				onClick={createAsync}
				handleSearch={handleSearch}
				searchTerm={searchTerm}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Name', 'Count movie']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default ActorsList
