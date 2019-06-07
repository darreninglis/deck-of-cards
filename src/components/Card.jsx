import React from 'react';

export default function Card({ image, name, key }) {
	// may need to make this a class to stop re render
	let angle = Math.random() * 90 - 45;
	let xPos = Math.random() * 40 - 20;
	let yPos = Math.random() * 40 - 20;
	let transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

	return (
		<img className='Card' src={image} alt={name} style={{ transform }} />
	);
}
