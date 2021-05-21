import React, {
	useState,
	useEffect,
	createRef,
	Children,
	cloneElement,
	useRef,
	forwardRef,
} from 'react';
import { nearbyElements } from 'cursor-nearby-elements';
import { stringify } from 'react-ref-compare';
import { getUniqueId, join } from '../utils';
import '../styles.css';

export const WinGrid = forwardRef((props, gridRef) => {
	gridRef = gridRef ?? createRef();
	const gridId = useRef(getUniqueId(3));

	const gridChildrenArray = Children.toArray(props.children);
	const refsArray = useRef(
		Array(gridChildrenArray.length)
			.fill()
			.map(() => createRef())
	);
	const gridChildrenRefMap = useRef({});

	useEffect(() => {
		refsArray.current.forEach((r) => {
			gridChildrenRefMap.current[stringify(r)] = r;
		});
	}, [refsArray]);

	const elementsNearCursorSet = useRef(new Set());
	const [gridStyle] = useState({ ...props.style });
	const [offset] = useState(props.offset ?? 69);
	const [directions] = useState(props.directions ?? 8);
	const [getElementsNearCursor] = useState(() =>
		nearbyElements(directions, offset)
	);

	const [highlightRadius] = useState(props.highlightRadius ?? 1.69);
	const [borderWidth] = useState(props.borderWidth ?? 1);
	const [borderColors] = useState(() =>
		join(props.borderColors, [
			'rgba(255,255,255,0.75)',
			'rgba(255,255,255,0.1)',
		])
	);
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

	function clearNearBy() {
		if (
			elementsNearCursorSet.current &&
			elementsNearCursorSet.current.size > 0
		) {
			elementsNearCursorSet.current.forEach(
				(e) =>
					(gridChildrenRefMap.current[
						e
					].current.style.borderImage = null)
			);
			elementsNearCursorSet.current.clear();
		}
	}

	function handlePointerMove(e) {
		clearNearBy();

		const predicate = (el) => {
			return (
				el.dataset.gridTag &&
				String(el.dataset.gridTag).startsWith(
					`grid#${gridId.current}child`
				) &&
				!el.disabled &&
				el.dataset.onlyBackground === 'false' &&
				stringify(el) in gridChildrenRefMap.current
			);
		};

		const modifier = (el, x, y) => {
			const elementDomString = stringify(el);
			const elementRef =
				gridChildrenRefMap.current[elementDomString].current;
			if (elementRef) {
				const brect = elementRef.getBoundingClientRect();
				const bx = x - brect.left;
				const by = y - brect.top;
				if (!elementRef.style.borderImage)
					elementRef.style.borderImage = `radial-gradient(${
						offset * highlightRadius
					}px ${
						offset * highlightRadius
					}px at ${bx}px ${by}px ,${borderColors},transparent ) 10 / ${borderWidth}px / 0px stretch `;
			}
			return elementDomString;
		};
		getElementsNearCursor(
			e,
			predicate,
			(el) => modifier(el, e.clientX, e.clientY),
			props.offsetPoints,
			props.shouldSkipAngle
		).forEach((e) => elementsNearCursorSet.current.add(e));
	}

	function handlePointerLeave(e) {
		clearNearBy();
	}

	if (gridChildrenArray.length === 0) return <></>;
	return (
		<main
			ref={gridRef}
			className='win-grid'
			id={`wingrid#${gridId.current}`}
			{...eventHandlers}
			style={gridStyle}>
			{refsArray.current.map((r, i) => {
				const gridTag = `grid#${gridId.current}child${i}`;
				const identifier = gridChildrenArray[i].id ?? gridTag;
				const gridChildProps = {
					...gridChildrenArray[i].props,
				};
				gridChildProps.style = {
					...gridChildrenArray[i].props.style,
				};
				if (
					!gridChildrenArray[i].props.borderColors &&
					typeof gridChildrenArray[i].type === 'object'
				)
					gridChildProps.borderColors = borderColors;
				gridChildProps.id = identifier;
				gridChildProps.ref = r;
				gridChildProps.key = gridTag;
				gridChildProps.gridTag = gridTag;

				return cloneElement(gridChildrenArray[i], gridChildProps);
			})}
		</main>
	);
});
