import UsersList from '@/components/screens/Admin/Users/UsersList'

import { NextAuthPage } from '@/shared/types/auth.types'

const UserListPage: NextAuthPage = () => {
	return <UsersList />
}

UserListPage.isOnlyAdmin = true
export default UserListPage
