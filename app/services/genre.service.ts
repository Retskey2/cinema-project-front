import { IGenre } from '@/shared/types/movie.types'

import axios, { axiosClassic } from '../api/interceptors'

import { getGenresUrl } from '../config/api.config'
import { IGenreEditInput } from '../components/screens/Admin/Genres/edit/genre-edit.inetrface';
import { ICollection } from '@/components/screens/Collections/collections.interface';

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(``), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`by-slug/${slug}`))
	},

	async getById(_id: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`${_id}`)) 
	},

	async create() {
		return axios.post<string>(getGenresUrl(''))
	},

	async deleteGenre(_id: string) {
		return axios.delete<string>(getGenresUrl(`${_id}`))
	},


	async updateGenre(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`${_id}`), data)
	},

	async getCollections() {
		return axiosClassic.get<ICollection[]>(getGenresUrl('collections'))
	}
}
