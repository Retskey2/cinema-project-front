import { getAdminUrl } from './../../../../config/url.config';
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'
import { UsersService } from '@/services/user.service'
import { ITableItem } from '../../../ui/admin-table/admin-table.interface';
import { convertMongoDate } from '@/utils/data/convertMongoDate';
import { toastrError } from '../../../../utils/toastr-error';
import { toastr } from 'react-redux-toastr';

export const useUser = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['users list', debouncedSearch],
		() => UsersService.getAll(debouncedSearch),
		{
			select: ({ data }) => data.map((user): ITableItem => ({
                _id: user._id,
                editUrl: getAdminUrl(`user/edit/${user._id}`),
                items: [user.email, convertMongoDate(user.createdAt)]
            })),

            onError: (error) => {
                toastrError(error, 'User list')
            }
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}


    const {mutateAsync: deleteAsync} = useMutation(
		['delete user'],
		(userId: string) => UsersService.deleteUser(userId),
		{
            onError: (error) => {
                toastrError(error, 'Delete user')
            },

            onSuccess: () => {
                toastr.success('Delete user', 'delete was successful'),
                queryData.refetch()
            }
		}
	)

    return useMemo(()=> ({
        handleSearch,  ...queryData, searchTerm, deleteAsync
    }), [queryData, searchTerm, deleteAsync])
}


