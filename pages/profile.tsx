import { NextAuthPage } from '@/shared/types/auth.types'

import Profile from '../app/components/screens/Profile/Profile'

const ProfilePage: NextAuthPage = () => {
	return <Profile />
}

ProfilePage.isOnlyUser = true
export default ProfilePage
