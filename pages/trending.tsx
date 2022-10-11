import { GetStaticProps, NextPage } from 'next'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import Catalog from '../app/components/ui/catalog-movies/Catalog'

const TrendPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Fresh movies"
			description="Trending movies and series in excellent: legal, safe, without ads"
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const movies = await MovieService.getMostPopularMovies()

		return {
			props: {
				movies,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			props: {},
			//notFound: true,
		}
	}
}
export default TrendPage
