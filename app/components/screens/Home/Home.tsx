import { FC } from 'react'
import { toastr } from 'react-redux-toastr'

import Heading from '@/components/ui/Heading/Heading'
import Gallery from '@/components/ui/gallery/Gallery'
import Slider from '@/components/ui/slilder/Slider'

import { Meta } from '@/utils/meta/Meta'

import SubHeading from '../../ui/Heading/SubHeading'

import { IHome } from './home.types'

export const Home: FC<IHome> = ({ slides, trendingMovies, actors }) => {
	return (
		<Meta title="Watch movies online" description="Watch MovieApp description">
			{slides.length && <Slider slides={slides} />}
			<div className="my-10">
				<SubHeading title="TrendingNow" />
				{trendingMovies.length && <Gallery items={trendingMovies} />}
			</div>

			<div className="my-10">
				<SubHeading title="Best actors" />
				{actors.length && <Gallery items={actors} />}
			</div>
		</Meta>
	)
}

export default Home
