import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";
import trelloState from "trello-state";
import moment from "moment";
/**/

class Dashboard extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      velocityStart: 1,
      velocityEnd: this.days(),
      velocityDoneList: null,
      dailyData: []
    };
  }
  
  setVelocityStart(e) {
    this.setState({velocityStart: e.target.value});
  }
  
  setVelocityEnd(e) {
    this.setState({velocityEnd: e.target.value});
  }
  
  setVelocityDoneList(e) {
    this.setState({velocityDoneList: e.target.value});
  }
  
  days() {
    return 60;
  }
  
  calcVelocity(doneListId, {lists, cards}) {
    if (!doneListId || !lists.length || !cards.length) {
      return "Not enough data";
    }
    const data = this.calcCfdData({lists, cards});
    const start = this.state.velocityStart;
    const end = this.state.velocityEnd;
    const firstDayCount = data[start - 1][doneListId];
    const lastDayCount = data[end - 1][doneListId];
    const weeks = (end - start) / 7.0;
    return `${((lastDayCount - firstDayCount) / weeks).toFixed(2)} per week`;
  }

  getStartDate(days) {
    const date = moment();
    const pacificOffset = 7;
    date.utcOffset(0).set("hour", pacificOffset).subtract(days, "days");
    return date;
  }

  calcCfdData({lists, cards}) {
    // quick hack to "cache" the data
    if (this.state.dailyData.length > 0) {
      return this.state.dailyData;
    }
    const dashData = [];
    const days = this.days();
    const date = this.getStartDate(days);
    for (let num = 0; num <= days; num++) {
      date.add(1, "days");
      const node = { name: date.format("l") };
      lists.forEach((list) => {
        node[list.id] = 0;
      });
      const cardsOn = trelloState.on(cards, date.toDate());
      cardsOn.forEach((card) => {
        node[card.idList] += 1;
      });
      dashData.push(node);
    }
    this.setState({dailyData: dashData});
    return dashData;
  }

  createCfdChart({boards, lists, cards, dash}) {
    if (!dash.board || !boards.length || !lists.length || !cards.length) {
      return (<span>chart not ready</span>);
    }
    const dashData = this.calcCfdData({lists, cards});
    const areas = [];
    const colors = ["#ff6600", "#fed039", "#8da0af", "#a2bc55",
      "#4f5052", "#fdc68d", "#331f4d", "#e11212", "#f2ea30"];
    lists.forEach((list, idx) => {
      areas.push(<Area type="linear"
        stackId="1"
        dataKey={list.id}
        name={list.name}
        stroke={colors[idx]}
        fill={colors[idx]} />);
    });
    return (
      <AreaChart width={1000} height={800} data={dashData}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        {areas}
      </AreaChart>
    );
  }

  render() {
    const boards = this.props.boards;
    const lists = this.props.lists;
    const dash = this.props.dash;
    const cards = this.props.cards;
    const listOptions = lists.map((list) => {
      return (<option value={list.id}>{list.name}</option>);
    });
    return (
      <div className="ui container">
        <div className="ui two column stackable grid">
          <div className="column">
            <div className="ui cards">
              <div className="card">
                <div className="content">
                  <div className="header">
                    Velocity
                  </div>
                  <div className="description">
                    <div className="ui form">
                      <div className="two fields">
                        <div className="field">
                          <label>Day Start</label>
                          <input type="number"
                            value={this.state.velocityStart}
                            onChange={this.setVelocityStart.bind(this)}/>
                        </div>
                        <div className="field">
                          <label>Day End</label>
                          <input type="number"
                            value={this.state.velocityEnd}
                            onChange={this.setVelocityEnd.bind(this)}/>
                        </div>
                        <div className="field">
                          <label>List</label>
                          <select value={this.state.velocityDoneList} 
                            onChange={this.setVelocityDoneList.bind(this)}>
                            {listOptions}
                          </select>
                        </div>
                      </div>
                    </div>
                    {this.calcVelocity(this.state.velocityDoneList, {lists, cards})}
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div className="sixteen wide column">
            {this.createCfdChart({boards, lists, cards, dash})}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  dash: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    boards: state.trello.boards,
    lists: state.trello.lists,
    cards: state.trello.cards,
    dash: state.trello.dash
  };
};

export default connect(mapStateToProps)(Dashboard);
