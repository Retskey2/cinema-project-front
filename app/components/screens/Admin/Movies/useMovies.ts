import { getAdminUrl } from '../../../../config/url.config';
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'
import { ITableItem } from '@/ui/admin-table/admin-table.interface';

import { toastrError } from '@/utils/toastr-error';
import { toastr } from 'react-redux-toastr';
import { getGenresList } from '@/utils/movie/getGenres';
import { useRouter } from 'next/router';

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['Movies list', debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }) => data.map((movie): ITableItem => ({
                _id: movie._id,
                editUrl: getAdminUrl(`movie/edit/${movie._id}`),
                items: [movie.title, getGenresList(movie.genres), String(movie.rating)]
            })),

            onError: (error) => {
                toastrError(error, 'movie list')
            }
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}


    const {mutateAsync: deleteAsync} = useMutation(
		['delete movie'],
		(movieId: string) => MovieService.deleteMovie(movieId),
		{
            onError: (error) => {
                toastrError(error, 'Delete movie')
            },

            onSuccess: () => {
                toastr.success('Delete movie', 'delete was successful'),
                queryData.refetch()
            }
		}
	)

    const {push} = useRouter()

    const {mutateAsync: createAsync} = useMutation(
		['create movie'],
		() => MovieService.create(),
		{
            onError: (error) => {
                toastrError(error, 'Create movie')
            },

            onSuccess: ({data: _id}) => {
                toastr.success('Create movie', 'create was successful'),
                push(getAdminUrl(`movie/edit/${_id}`))
            }
		}
	)

    return useMemo(()=> ({
        handleSearch,  ...queryData, searchTerm, deleteAsync, createAsync
    }), [queryData, searchTerm, deleteAsync, createAsync])
}


