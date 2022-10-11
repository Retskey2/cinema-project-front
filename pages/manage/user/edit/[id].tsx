import { NextAuthPage } from '@/shared/types/auth.types'

import UserEdit from '../../../../app/components/screens/Admin/Users/edit/UserEdit'

const UserEditPage: NextAuthPage = () => {
	return <UserEdit />
}
UserEditPage.isOnlyAdmin = true
export default UserEditPage
