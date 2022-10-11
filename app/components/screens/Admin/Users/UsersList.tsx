import { FC } from 'react'

import Heading from '@/components/ui/Heading/Heading'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminTable from '@/ui/admin-table/AdminTable'

import { Meta } from '@/utils/meta/Meta'

import { useUser } from './useUser'

const UsersList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUser()
	return (
		<Meta title="Users panel">
			<AdminNavigation />
			<Heading title="Users" />

			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Email', 'Date register']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default UsersList
