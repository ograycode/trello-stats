import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";
import trelloState from "trello-state";
import moment from "moment";
/**/


class Dashboard extends React.Component {

  getStartDate(days) {
    const date = moment();
    const pacificOffset = 7;
    date.utcOffset(0).set("hour", pacificOffset).subtract(days, "days");
    return date;
  }

  calcCfdData({lists, cards}) {
    const cfdData = [];
    const days = 60;
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
      cfdData.push(node);
    }
    return cfdData;
  }

  createCfdChart({boards, lists, cards, cfd}) {
    if (!cfd.board || !boards.length || !lists.length || !cards.length) {
      return (<span>chart not ready</span>);
    }
    const cfdData = this.calcCfdData({lists, cards});
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
      <AreaChart width={1000} height={800} data={cfdData}>
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
    const cfd = this.props.cfd;
    const cards = this.props.cards;
    return (
      <div className="ui container">
        {this.createCfdChart({boards, lists, cards, cfd})}
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  cfd: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    boards: state.trello.boards,
    lists: state.trello.lists,
    cards: state.trello.cards,
    cfd: state.trello.cfd
  };
};

export default connect(mapStateToProps)(Dashboard);
