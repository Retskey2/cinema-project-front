import { IActorEditInput } from '@/components/screens/Admin/Actors/edit/actor-edit-interface'
import { IActor } from '@/shared/types/movie.types'

import axios from '../api/interceptors'
import { axiosClassic } from '../api/interceptors'
import { getActorsUrl } from '../config/api.config'

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(``), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorsUrl(`by-slug/${slug}`))
	},

	async getById(_id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`${_id}`)) 
	},

	async create() {
		return axios.post<string>(getActorsUrl(''))
	},

	async deleteActor(_id: string) {
		return axios.delete<string>(getActorsUrl(`${_id}`))
	},

	async updateActor(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`${_id}`), data)
	},
}
