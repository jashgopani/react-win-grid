import React, { createRef } from 'react';
import { storiesOf } from '@storybook/react';
import { WinGrid } from '../components/WinGrid/WinGrid';
import { WinItem } from '../components/WinItem/WinItem';
import {
	MdBluetooth,
	MdBrightnessAuto,
	MdBatteryChargingFull,
	MdLocationOn,
	MdBrightnessLow,
	MdSettings,
	MdWifiTethering,
	MdVpnKey,
	MdScreenShare,
	MdTablet,
	MdAirplanemodeInactive,
	MdFolderShared,
} from 'react-icons/all';
import './styles.css';

const stories = storiesOf('Appx', module);
stories.add('App', () => {
	return (
		<>
			<WinGrid className='grid-style'>
				<h2 className='fullspan'>WinGrid &amp; WinItem Demo</h2>
				<WinItem className='action-btn'>
					<MdTablet />
					<>Tablet</>
				</WinItem>
				<WinItem disabled className='action-btn'>
					<MdBatteryChargingFull />
					Bluetooth
				</WinItem>
				<WinItem disabled className='action-btn'>
					<MdLocationOn />
					<>Location</>
				</WinItem>
				<WinItem className='action-btn'>
					<MdBluetooth />
					Bluetooth
				</WinItem>
				<WinItem className='action-btn'>
					<MdBrightnessLow />
					Night Light
				</WinItem>
				<WinItem className='action-btn'>
					<MdAirplanemodeInactive />
					Airplane Mode
				</WinItem>
				<WinItem className='action-btn'>
					<MdWifiTethering />
					Hotspot
				</WinItem>
				<WinItem className='action-btn'>
					<MdScreenShare />
					Project
				</WinItem>
				<WinItem className='action-btn'>
					<MdFolderShared />
					Nearby Sharing
				</WinItem>
				<WinItem className='action-btn'>
					<MdSettings />
					All Settings
				</WinItem>
				<WinItem className='action-btn'>
					<MdVpnKey />
					VPN
				</WinItem>
				<WinItem className='fullspan flex-row'>
					<MdBrightnessAuto style={{ flex: '0 1 auto' }} />
					<input
						type='range'
						name='brightness'
						id='brightness'
						style={{ flex: '2 1 auto' }}
					/>
				</WinItem>

				<h2 className='fullspan'>Images</h2>
				<WinItem contentIsImage>
					<img
						src='https://picsum.photos/360'
						alt='imagesc'
						style={{
							objectFit: 'cover',
							maxWidth: `100%`,
						}}
					/>
				</WinItem>
				<WinItem disabled contentIsImage>
					<img
						src='https://picsum.photos/360'
						alt='imagesc'
						style={{
							objectFit: 'cover',
							maxWidth: `100%`,
						}}
					/>
				</WinItem>
				<WinItem contentIsImage>
					<img
						src='https://picsum.photos/360'
						alt='imagesc'
						style={{
							objectFit: 'cover',
							maxWidth: `100%`,
						}}
					/>
				</WinItem>
				<WinItem contentIsImage>
					<img
						src='https://picsum.photos/360'
						alt='imagesc'
						style={{
							objectFit: 'cover',
							maxWidth: `100%`,
						}}
					/>
				</WinItem>
			</WinGrid>
		</>
	);
});
