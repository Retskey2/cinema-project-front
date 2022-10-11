import ActorsList from '@/components/screens/Admin/Actors/ActorsList'

import { NextAuthPage } from '@/shared/types/auth.types'

const ActorListPage: NextAuthPage = () => {
	return <ActorsList />
}
ActorListPage.isOnlyAdmin = true
export default ActorListPage
