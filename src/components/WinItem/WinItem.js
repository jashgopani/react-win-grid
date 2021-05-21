import React, {
	useState,
	forwardRef,
	createRef,
	Children,
	cloneElement,
} from 'react';
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
		if (!props.disabled) {
			if (!props.onlyBorders)
				ref.current.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px , ${backgroundColors} )`;
			if (!props.onlyBackground)
				ref.current.style.borderImage = `radial-gradient(50% 110% at ${x}px ${y}px ,${borderColors},transparent ) 10 / ${borderWidth}px / 0px stretch `;
		}
	}

	function handlePointerLeave(e) {
		ref.current.style.backgroundImage = null;
		ref.current.style.borderImage = null;
		ref.current.style.border = '1px solid transparent';
	}

	const identifier = props.id ?? `wb#${getUniqueId(3)}`;

	const commonAttrs = {
		id: identifier,
		style: { ...props.style },
		disabled: Boolean(props.disabled),
		'data-disabled': Boolean(props.disabled),
		'data-grid-tag': props.gridTag ?? null,
		'data-only-borders': Boolean(props.onlyBorders),
		'data-only-background': Boolean(props.onlyBackground),
	};

	const children = props.disabled
		? Children.toArray(props.children).map((e) =>
				cloneElement(e, { ...e.props, disabled: true })
		  )
		: props.children;
	const nonImageContent = (
		<button
			ref={ref}
			className={`win-btn ${props.className ?? ''} `}
			{...commonAttrs}
			{...eventHandlers}>
			{children}
		</button>
	);
	const imageContent = (
		<button
			className={`win-btn ${props.className ?? ''} `}
			{...commonAttrs}>
			{children}
			<section
				ref={ref}
				className='hoverlay'
				{...{
					...commonAttrs,
					id: 'WinItemImage-' + commonAttrs.id,
					style: null,
				}}
				{...eventHandlers}
			/>
		</button>
	);

	return props.contentIsImage ? imageContent : nonImageContent;
});
