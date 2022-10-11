import { axiosClassic } from '../api/interceptors'
import axios from '../api/interceptors'
import { getMoviesUrl } from '../config/api.config'
import { IMovie } from '../shared/types/movie.types'
import { IMovieEditInput } from '@/components/screens/Admin/Movies/edit/movie-edit.interface'

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(``), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('most-popular')
		)
		return movies
	},

	async getByGenres(genresIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl(`by-genres`), {
			genresIds,
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`by-slug/${slug}`))
	},

	async getByActors(actorId: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`by-actor/${actorId}`))
	},

	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`${_id}`)) 
	},

	async create() {
		return axios.post<string>(getMoviesUrl(''))
	},

	async deleteMovie(_id: string) {
		return axios.delete<string>(getMoviesUrl(`${_id}`))
	},

	async updateMovie(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`${_id}`), data)
	},

	async updateCountOpened(slug: string) {
		return axiosClassic.put<string>(getMoviesUrl('update-count-opened'), {slug})
	}
}
