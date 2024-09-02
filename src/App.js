import './App.css'

import React, { Component } from 'react'
import Board from 'react-trello'
import KanbanooLaneHeader from './KanbanooLaneHeader'
import KanbanooCard from './KanbanooCard'

const data = require('./data.json')

const handleDragStart = (cardId, laneId) => {
  console.log('drag started')
  console.log(`cardId: ${cardId}`)
  console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log('drag ended')
  console.log(`cardId: ${cardId}`)
  console.log(`sourceLaneId: ${sourceLaneId}`)
  console.log(`targetLaneId: ${targetLaneId}`)
}

const add100CardsToData = function(data, laneNo) {
	if (!data) return;
	var cards = data.lanes[laneNo].cards;
	for ( var n=0; n<100; n++) {
		cards.push(
		  {
        "id": "Milk L"+laneNo+"C"+n,
        "title": "Sales and Marketing Report 2024 L"+laneNo+"C"+n,
        "label": "15 mins",
        /* "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },*/
        "description": "2 Gallons of milk at the Deli store",
				"tags": [
                {title: 'Project', color: 'white', bgcolor: '#EB5A46'},
                {title: 'Tech Debt', color: 'white', bgcolor: '#0079BF'},
                {title: 'Very long tag that is', color: 'white', bgcolor: '#61BD4F'}
              ]
			}
		);
	}
};

/* overrides */
const components = {
  LaneHeader:       KanbanooLaneHeader,
	Card:							KanbanooCard
};

class App extends Component {
  state = { boardData: { lanes: [] } }

  setEventBus = (eventBus) => {
    this.setState({ eventBus })
  }

  async componentWillMount() {
    const response = await this.getBoard()
    this.setState({ boardData: response })
  }

  getBoard() {
    return new Promise((resolve) => {
			// add100CardsToData(data,0);
			// add100CardsToData(data,1);
			// add100CardsToData(data,2);
			// add100CardsToData(data,3);
			add100CardsToData(data,4);
      resolve(data)
    })
  }

  completeCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'COMPLETED',
      card: {
        id: 'Milk',
        title: 'Buy Milk',
        label: '15 mins',
        description: 'Use Headspace app',
      },
    })
    this.state.eventBus.publish({
      type: 'REMOVE_CARD',
      laneId: 'PLANNED',
      cardId: 'Milk',
    })
  }

  addCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'BLOCKED',
      card: {
        id: 'Ec2Error',
        title: 'EC2 Instance Down',
        label: '30 mins',
        description: 'Main EC2 instance down',
      },
    })
  }

	add500Cards = () => {
	  for ( var n=0; n<500; n++) {
			this.state.eventBus.publish({
				type: 'ADD_CARD',
				laneId: 'PLANNED',
				card: {
					id: 'Ec2Error'+n,
					title: 'EC2 Instance Down '+n,
					label: '30 mins',
					description: 'Main EC2 instance down',
				},
			});
		}
  }

  shouldReceiveNewData = (nextData) => {
    console.log('New card has been added')
    console.log(nextData)
  }

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.dir(card)
  }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>React Trello Demo</h3>
        </div>
        <div className="App-intro">
          <div className="App-top-panel">
            <button onClick={this.completeCard} style={{ margin: 5 }}>
              Complete Buy Milk
            </button>
            <button onClick={this.addCard} style={{ margin: 5 }}>
              Add Blocked
            </button>
				    <button onClick={this.add500Cards} style={{ margin: 5 }}>
              Add 500 Cards
            </button>
          </div>
          <Board
            // editable
						components={components}
            onCardAdd={this.handleCardAdd}
            data={this.state.boardData}
            draggable
            onDataChange={this.shouldReceiveNewData}
            eventBusHandle={this.setEventBus}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
          />
        </div>
      </div>
    )
  }
}

export default App
