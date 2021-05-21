# react-win-grid

A lightweight and customisable Windows 10 Grid Component for ReactJS.

## Changelog

-   @1.0.0 - First stable version

## Installation

```javascript
npm install react-win-grid
```

## Getting Started

```javascript
import { WinGrid, WinItem } from 'react-win-grid';
```

#### OR

```javascript
const { WinGrid, WinItem } = require('react-win-grid');
```

## WinItem

Use this component for individual clickable/hoverable items in your layout. This can be used inside of `WinGrid` or as a standalone component also. Below is a list of props you can pass to the component.

| **props**        | **description**                                                        | **type**         | **acceptable values**                                                                                                          |
| ---------------- | ---------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| borderColors     | Colors that will be applied as a gradient on borders on mouse hover    | Array of strings | All color values supported by CSS                                                                                              |
| backgroundColors | Colors that will be applied as a gradient on background on mouse hover | Array of strings | All color values supported by CSS                                                                                              |
| eventHandlers    | Event Handlers for the component                                       | Object           | `key` should be valid [React event](https://reactjs.org/docs/events.html) names and `value` will be the event handler function |
| contentIsImage   | This prop is recommended when the child is an image element.           | Boolean          | `true \| false`                                                                                                                |
| onlyBorders      | Don't apply hover effect on background                                 | Boolean          | `true \| false`                                                                                                                |

> **Note**: Adding the `contentIsImage` prop to `WinItem` will not allow events to pass down to its children elements as this adds a layer on top of the image for hover effect to be visible. However, you can still set event handlers on the component itself by adding the `eventHandlers` prop. You can instead put image and non image in seperate `WinItem`s

### An example of above mentioned note

```javascript
//The button will not receive click event
<WinItem contentIsImage>
	<img
		src='https://picsum.photos/1920/1080/'
		alt='imagesc'
		style={{ maxWidth: `100%` }}
	/>
	<button onClick={() => console.log('click')}> I am unclickable</button>
</WinItem>
```
