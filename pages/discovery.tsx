import { errorCatch } from 'api/api.helpers'
import { GetStaticProps, NextPage } from 'next'

import Collections from '@/components/screens/Collections/Collections'
import { ICollection } from '@/components/screens/Collections/collections.interface'

import { GenreService } from '../app/services/genre.service'

const DiscoveryPage: NextPage<{ collections: ICollection[] }> = ({
	collections,
}) => {
	console.log(`${collections} - collections`)
	return <Collections collections={collections || []} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await GenreService.getCollections()
		return {
			props: { collections },
			revalidate: 60,
		}
	} catch (e) {
		console.log(errorCatch(e))

		return {
			props: {},
			// notFound: true,
		}
	}
}

export default DiscoveryPage
