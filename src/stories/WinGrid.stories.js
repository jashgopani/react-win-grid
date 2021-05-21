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
			<WinGrid
				style={{
					gridTemplateColumns: `repeat(5,1fr)`,
					padding: '5rem',
				}}
				directions={16}
				offsetPoints={[0, 0.1, 0.25, 0.5, 0.69, 1, 1.3, 1.15, 1.5]}>
				{Array(15)
					.fill()
					.map((e, i) => {
						return (
							<WinItem
								key={'winbtn' + getUniqueId()}
								disabled={i > 8}>
								<p>From loop {i}</p>
							</WinItem>
						);
					})}
				<WinItem>
					<input type='checkbox' name='' id='' />
					<input type='range' name='' id='' />
					<input type='number' name='' id='' />
				</WinItem>
			</WinGrid>

			<WinItem
				style={{ padding: '5rem', backgroundColor: '#333' }}
				onlyBackground
				disabled>
				Lorem ipsum dolor sit.
			</WinItem>

			<WinItem
				onlyBorders
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
