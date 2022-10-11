import { getAdminUrl } from '../../../../config/url.config';
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { useDebounce } from '@/hooks/useDebounce'

import { GenreService } from '@/services/genre.service'
import { ITableItem } from '../../../ui/admin-table/admin-table.interface';
import { convertMongoDate } from '@/utils/data/convertMongoDate';
import { toastrError } from '../../../../utils/toastr-error';
import { toastr } from 'react-redux-toastr';
import { useRouter } from 'next/router';

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['Genres list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) => data.map((genre): ITableItem => ({
                _id: genre._id,
                editUrl: getAdminUrl(`genre/edit/${genre._id}`),
                items: [genre.name, genre.slug]
            })),

            onError: (error) => {
                toastrError(error, 'genre list')
            }
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}


    const {mutateAsync: deleteAsync} = useMutation(
		['delete genre'],
		(genreId: string) => GenreService.deleteGenre(genreId),
		{
            onError: (error) => {
                toastrError(error, 'Delete genre')
            },

            onSuccess: () => {
                toastr.success('Delete genre', 'delete was successful'),
                queryData.refetch()
            }
		}
	)

    const {push} = useRouter()

    const {mutateAsync: createAsync} = useMutation(
		['create genre'],
		() => GenreService.create(),
		{
            onError: (error) => {
                toastrError(error, 'Create genre')
            },

            onSuccess: ({data: _id}) => {
                toastr.success('Create genre', 'create was successful'),
                push(getAdminUrl(`genre/edit/${_id}`))
            }
		}
	)

    return useMemo(()=> ({
        handleSearch,  ...queryData, searchTerm, deleteAsync, createAsync
    }), [queryData, searchTerm, createAsync, deleteAsync])
}


