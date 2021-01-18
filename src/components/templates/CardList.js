import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Fragment } from 'react';
import Image from './Image';
import MissionDetails from './MissionDetails';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: [],
      cardItemsIds: [],
      cardItems: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.cardItems !== this.props.cardItems) {
      this.setState({ cardItems: nextProps.cardItems });
    }
  }
  filterCardList() {
    let selectedList = this.state.cardItems.map(list => {
      if (list.includes(this.state.selectedList) ||
        (this.state.selectedList == "sucss_lnch_yes" && list.launch_success == true) ||
        (this.state.selectedList == "sucss_lnch_no" && list.launch_success == false) ||
        (this.state.selectedList == "sucss_lnd_yes" && list.launch_success == true) ||
        (this.state.selectedList == "sucss_lnd_no" && list.launch_success == false)) {

        return (
          list.flight_number
        )
      }
    });
    console.log("selectedList:",selectedList)
  }
  handleClick(list) {
    let selectedList = this.state.selectedList;
    if (selectedList.includes(list)) {
      selectedList.splice(selectedList.indexOf(list), 1);
      this.setState({ selectedList: selectedList });
      console.log("delete selectedList: ", this.state.selectedList);
    } else {
      selectedList.push(list);
      this.setState({ selectedList: selectedList });
      console.log("selectedList: ", this.state.selectedList);
    }
  }
  render() {
    return (
      <Fragment>
        <aside className="space-mission--filterSection">
          <h3>Filter</h3>
          <section className="space-mission--filterWp">
            <label className="space-mission--filterLabel">Launch Year</label>
            <ul className="space-mission--filterList">
              {
                this.props.launchYear.map((list, idx) =>
                  <li className="space-mission--filterItem" key={idx}>
                    <button className={this.state.selectedList.includes(list) ? 'space-mission--filterBtn selected' : 'space-mission--filterBtn'} onClick={(e) => this.handleClick(list)}>
                      {list}
                    </button>
                  </li>
                )
              }
            </ul>
          </section>
          <section className="space-mission--filterWp">
            <label className="space-mission--filterLabel">Successful Launch</label>
            <ul className="space-mission--filterList">
              <li className="space-mission--filterItem" key="sucss_lnch_yes">
                <button className={this.state.selectedList.includes("sucss_lnch_yes") ? 'space-mission--filterBtn selected' : 'space-mission--filterBtn'} onClick={(e) => this.handleClick("sucss_lnch_yes")}>
                  Yes
                    </button>
              </li>
              <li className="space-mission--filterItem" key="sucss_lnch_no">
                <button className={this.state.selectedList.includes("sucss_lnch_no") ? 'space-mission--filterBtn selected' : 'space-mission--filterBtn'} onClick={(e) => this.handleClick("sucss_lnch_no")}>
                  No
                    </button>
              </li>
            </ul>
          </section>
          <section className="space-mission--filterWp">
            <label className="space-mission--filterLabel">Successful Landing</label>
            <ul className="space-mission--filterList">
              <li className="space-mission--filterItem" key="sucss_lnch_yes">
                <button className={this.state.selectedList.includes("sucss_lnd_yes") ? 'space-mission--filterBtn selected' : 'space-mission--filterBtn'} onClick={(e) => this.handleClick("sucss_lnd_yes")}>
                  Yes
                    </button>
              </li>
              <li className="space-mission--filterItem" key="sucss_lnch_no">
                <button className={this.state.selectedList.includes("sucss_lnd_no") ? 'space-mission--filterBtn selected' : 'space-mission--filterBtn'} onClick={(e) => this.handleClick("sucss_lnd_no")}>
                  No
                    </button>
              </li>
            </ul>
          </section>
        </aside>
        <section>
          <ul className="space-mission--list">
            {
              this.props.cardItems.map(list => {
                if (this.state.selectedList.includes(list.launch_year) ||
                (this.state.selectedList.includes("sucss_lnch_yes") && list.launch_success == true) ||
                (this.state.selectedList.includes("sucss_lnch_no") && list.launch_success == false) ||
                (this.state.selectedList.includes("sucss_lnd_yes") && list.launch_success == true) ||
                (this.state.selectedList.includes("sucss_lnd_no") && list.launch_success == false) || this.state.selectedList.length == 0) {
                  return (
                    <li className="space-mission--item" key={list.flight_number}>
                      <Image links={list.links} />
                      <MissionDetails list={list} />
                    </li>
                  )
                }
              })
            }
          </ul>
        </section>
      </Fragment>
    );
  };
}

export default CardList;

