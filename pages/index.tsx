import { GetStaticProps, NextPage } from 'next'

import Home from '@/components/screens/Home/Home'

import { ActorService } from '@/services/actor.service'

import { IHome } from '../app/components/screens/Home/home.types'
import { IGalleryItem } from '../app/components/ui/gallery/gallery.interface'
import { ISlide } from '../app/components/ui/slilder/slider.interface'
import { getActorsUrl, getMoviesUrl } from '../app/config/api.config'
import { MovieService } from '../app/services/movie.service'
import { getGenresList } from '../app/utils/movie/getGenres'

const HomePage: NextPage<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<Home slides={slides} actors={actors} trendingMovies={trendingMovies} />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll()

		const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
			_id: m._id,
			link: getMoviesUrl(m.slug),
			bigPoster: m.bigPoster,
			subTitle: getGenresList(m.genres),
			title: m.title,
		}))

		const { data: dataActors } = await ActorService.getAll()

		const actors: IGalleryItem[] = dataActors.slice(0, 7).map((a) => ({
			name: a.name,
			posterPath: a.photo,
			link: getActorsUrl(a.slug),
			content: {
				title: a.name,
				subtitle: `+${a.countMovies} movies`,
			},
		}))

		const dataTrendingMovies = await MovieService.getMostPopularMovies()

		const trendingMovies: IGalleryItem[] = dataTrendingMovies
			.slice(0, 7)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getMoviesUrl(m.slug),
			}))

		return {
			props: {
				slides,
				actors,
				trendingMovies,
			} as IHome,
			revalidate: 60,
		}
	} catch (error) {
		return {
			props: {
				slides: [],
				actors: [],
				trendingMovies: [],
			},
		}
	}
}

export default HomePage
