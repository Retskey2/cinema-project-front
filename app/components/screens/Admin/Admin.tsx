import { FC } from 'react'

import { Meta } from '../../../utils/meta/Meta'
import Heading from '../../ui/Heading/Heading'
import AdminNavigation from '../../ui/admin-navigation/AdminNavigation'

import Statistics from './Statistics/Statistics'

const Admin: FC = () => {
	return (
		<Meta title="Admin panel">
			<AdminNavigation />
			<Heading title="Some statistics" />
			<Statistics />
		</Meta>
	)
}

export default Admin
