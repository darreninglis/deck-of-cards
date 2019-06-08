import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
const API_BASE_URL = 'https://www.deckofcardsapi.com/api/deck';

class Deck extends Component {
	constructor(props) {
		super(props);
		this.state = { deck: null, drawn: [], count: 0 };
		this.getCard = this.getCard.bind(this);
		this.updateCount = this.updateCount.bind(this);
	}

	async componentDidMount() {
		let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
		this.setState({ deck: deck.data });
		this.getCard();
	}

	updateCount = () => {
		this.setState({
			count: this.state.count + 1
		});
	};

	async getCard() {
		let deck_id = this.state.deck.deck_id;
		try {
			let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
			let cardRes = await axios.get(cardUrl);
			if (this.state.count >= 52) {
				throw new Error('End of Deck!');
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
			this.updateCount();
		} catch (err) {
			window.location.reload();
		}
	}

	render() {
		const cards = this.state.drawn.map((c) => (
			<Card key={c.id} name={c.name} image={c.image} />
		));
		return (
			<div className='Deck'>
				<h1 className='Deck-title'>♦ Card Dealer ♦</h1>
				<h2 className='Deck-title subtitle'>
					♦ A 52 card deck made with React ♦
				</h2>
				<button className='Deck-btn' onClick={this.getCard}>
					Get Card!
				</button>
				<p>{`${this.state.count} / 52`}</p>
				<div className='Deck-cardarea'>{cards}</div>
			</div>
		);
	}
}
export default Deck;
