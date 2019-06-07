import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

export default class Deck extends Component {
	state = {
		deck: null,
		drawn: []
	};

	async componentDidMount() {
		let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
		this.setState({
			deck: deck.data
		});
	}

	// async getCard() {
	// 	let id = this.state.deck.deck_id;
	// 	try {
	// 		let cardUrl = `${API_BASE_URL}/${id}/draw/`;
	// 		//make request using deck id
	// 		let cardRes = await axios.get(cardUrl);
	// 		if (!cardRes.data.success) {
	// 			throw new Error('No Cards remaining');
	// 		}

	// 		//set state using new card info
	// 		let card = cardRes.data.card[0];
	// 		this.setState((st) => ({
	// 			drawn: [
	// 				...st.drawn,
	// 				{
	// 					id: card.code,
	// 					image: card.image,
	// 					name: `${card.value} of ${card.suit}`
	// 				}
	// 			]
	// 		}));
	// 	} catch (err) {
	// 		alert(err);
	// 	}
	// }

	async getCard() {
		let deck_id = this.state.deck.deck_id;
		try {
			let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
			let cardRes = await axios.get(cardUrl);
			if (!cardRes.data.success) {
				throw new Error('No card remaining!');
			}
			let card = cardRes.data.cards[0];
			console.log(cardRes.data);
			this.setState((st) => ({
				drawn: [
					...st.drawn,
					{
						id: card.code,
						image: card.image,
						name: `${card.value} of ${card.suit}`
					}
				]
			}));
		} catch (err) {
			alert(err);
		}
	}

	render() {
		const cards = this.state.drawn.map((c) => (
			<Card name={c.name} image={c.image} key={c.id} />
		));
		return (
			<div>
				<h1 className='Deck-title'>&#9670; Card Dealer &#9670;</h1>
				<h2 className='Deck-title subtitle'>
					&#9670; A little demo made with React &#9670;
				</h2>
				<button onClick={this.getCard}>Get Card!</button>
				<div className='Deck-cardarea'>{cards}</div>
			</div>
		);
	}
}
