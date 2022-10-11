import { GenreService } from '@/services/genre.service';

import { useQuery } from 'react-query';

import { IOption } from '../../../../ui/select/select.interface';
import { toastrError } from '../../../../../utils/toastr-error';


export const useAdminGenre = () => {
    const queryData = useQuery(
        'List of genre',
        () => GenreService.getAll(), {
            select: ({data}) => 
            data.map(
                (genre): IOption => ({
                   label: genre.name,
                   value: genre._id
                })
            ),
            onError: (error) => {
                toastrError(error, 'Genre list')
            }
        }) 
   

        return queryData
}

