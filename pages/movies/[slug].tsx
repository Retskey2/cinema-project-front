import { errorCatch } from 'api/api.helpers'
import { getMoviesUrl } from 'config/api.config'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import Error404 from '../404'
import SingleMovie from '../../app/components/screens/single-movie/SingleMovie'
import { IGalleryItem } from '../../app/components/ui/gallery/gallery.interface'

export interface IMoviePage {
	movie: IMovie
	similarMovies: IGalleryItem[]
}

const moviePage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {
	const mov = async () => {
		await MovieService.getAll()
	}

	return <SingleMovie similarMovies={similarMovies || []} movie={movie} />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getAll()
		const paths = movies.map((movie) => ({
			params: { slug: movie.slug },
		}))

		return { paths, fallback: 'blocking' }
	} catch {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug))

		const responseSimilarMovies = await MovieService.getByGenres(
			movie.genres.map((g) => g._id)
		)

		const similarMovies: IGalleryItem[] = responseSimilarMovies.data
			.filter((m) => m._id !== movie._id)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getMoviesUrl(m.slug),
			}))

		return {
			props: { movie, similarMovies },
		}
	} catch (e) {
		console.log(errorCatch(e))

		return {
			notFound: true,
		}
	}
}
export default moviePage
