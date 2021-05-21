import React, { useState, forwardRef, createRef } from 'react';
import { getUniqueId, getXY, join } from '../utils';
import '../styles.css';

export const WinItem = forwardRef((props, ref) => {
	ref = ref ?? createRef();

	const [borderColors] = useState(
		join(props.borderColors, [
			'rgba(255,255,255,0.75)',
			'rgba(255,255,255,0.1)',
		])
	);
	const [backgroundColors] = useState(
		join(props.backgroundColors, [
			'rgba(255,255,255,0.075)',
			'rgba(255,255,255,0)',
		])
	);

	const [borderWidth] = useState(props.borderWidth ?? 1);

	const [eventHandlers] = useState({
		...props.eventHandlers,
		onPointerMoveCapture: (e) => {
			handlePointerMove(e);
			if (
				props.eventHandlers &&
				props.eventHandlers.onPointerMoveCapture
			) {
				props.eventHandlers.onPointerMoveCapture(e);
			}
		},
		onPointerLeave: (e) => {
			handlePointerLeave(e);
			if (props.eventHandlers && props.eventHandlers.onPointerLeave) {
				props.eventHandlers.onPointerLeave(e);
			}
		},
	});

	function handlePointerMove(e) {
		const [x, y] = getXY(ref.current, e);
		if (!props.onlyBorders)
			ref.current.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px , ${backgroundColors} )`;
		ref.current.style.borderImage = `radial-gradient(50% 110% at ${x}px ${y}px ,${borderColors},transparent ) 10 / ${borderWidth}px / 0px stretch `;
	}

	function handlePointerLeave(e) {
		ref.current.style.backgroundImage = null;
		ref.current.style.borderImage = null;
		ref.current.style.border = '1px solid transparent';
	}

	const identifier = props.id ?? `wb#${getUniqueId(3)}`;

	const nonImageContent = (
		<button
			id={identifier}
			style={{ ...props.style }}
			ref={ref}
			className={`win-btn ${props.extraClasses ?? ''} `}
			data-grid-tag={props.gridTag ?? null}
			{...eventHandlers}>
			{props.children}
		</button>
	);
	const imageContent = (
		<button
			id={identifier}
			style={{ ...props.style }}
			className={`win-btn ${props.extraClasses ?? ''} `}>
			{props.children}
			<section
				ref={ref}
				className='hoverlay'
				data-grid-tag={props.gridTag ?? null}
				{...eventHandlers}
			/>
		</button>
	);

	return props.contentIsImage ? imageContent : nonImageContent;
});
