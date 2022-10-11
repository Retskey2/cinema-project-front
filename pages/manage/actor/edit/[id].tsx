import ActorEdit from '@/components/screens/Admin/Actors/edit/ActorEdit'

import { NextAuthPage } from '@/shared/types/auth.types'

const ActorEditPage: NextAuthPage = () => {
	return <ActorEdit />
}
ActorEditPage.isOnlyAdmin = true
export default ActorEditPage
