import React, { createRef } from 'react';
import { storiesOf } from '@storybook/react';
import { WinGrid } from '../components/WinGrid/WinGrid';
import { WinItem } from '../components/WinItem/WinItem';
import { getUniqueId } from '../components/utils';
import './styles.css';

const stories = storiesOf('Appx', module);
stories.add('App', () => {
	return (
		<>
			{/* <WinGrid
				className='text-white'
				style={{
					gridTemplateColumns: `repeat(auto-fit,minmax(360px,1fr))`,
					justifyContent: 'start',
					alignContent: 'center',
					padding: '5rem',
					gridAutoFlow: 'dense',
				}}
				borderWidth='2'
				directions={16}
				offsetPoints={[0, 0.1, 0.25, 0.5, 0.69, 1, 1.3, 1.15, 1.5]}>
				<h1 style={{ gridColumn: '1/-1' }}>
					This is a <strong> WinGrid</strong> Component
				</h1> */}
			<WinGrid
				style={{
					margin: 'auto',
					gridTemplateColumns: `1fr`,
					justifyContent: 'flex-start',
					alignItems: 'flex-start',
					alignContent: 'flex-start',
					textAlign: 'start',
					width: '80vw',
				}}
				directions={16}
				offsetPoints={[0, 0.1, 0.25, 0.5, 0.69, 1, 1.3, 1.15, 1.5]}>
				<h1 style={{ gridColumn: '1/-1' }}>react-win-grid Demo</h1>
				<h2>1. WinItem</h2>
				<WinItem className='normal'>
					<p>Simple Button</p>
				</WinItem>
				<WinItem disabled className='normal'>
					<input type='checkbox' name='' id='' />
					<input type='range' name='' id='' />
					<input type='number' name='' id='' />
				</WinItem>
			</WinGrid>
			<WinItem disabled>
				<input type='checkbox' name='' id='' />
				<input type='range' name='' id='' />
				<input type='number' name='' id='' />
			</WinItem>
			<WinItem
				style={{ padding: '5rem', backgroundColor: '#333' }}
				onlyBorders>
				Lorem ipsum dolor sit.
			</WinItem>

			<WinItem
				contentIsImage
				style={{
					gridColumn: '1/-1',
					margin: 'auto',
					maxWidth: '80%',
				}}>
				<img
					src='https://picsum.photos/1920/1080/'
					alt='imagesc'
					style={{ objectFit: 'cover', maxWidth: `100%` }}
				/>
			</WinItem>
		</>
	);
});
