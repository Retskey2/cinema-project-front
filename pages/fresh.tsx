import { GetStaticProps, NextPage } from 'next'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import Catalog from '../app/components/ui/catalog-movies/Catalog'

const FreshPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	console.log(`${movies} - movies`)
	return (
		<Catalog
			movies={movies || []}
			title="Fresh movies"
			description="New movies and series in excellent: legal, safe, without ads"
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll()

		return {
			props: {
				movies,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			props: {},
			notFound: true,
		}
	}
}
export default FreshPage
