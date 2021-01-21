import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Fragment } from 'react';
import Image from './Image';
import MissionDetails from './MissionDetails';
import axios from 'axios';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: [],
      cardItems: [],
      filterLnd: [],
      filterLunc: [],
      isLoaded: true,
    };
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.cardItems !== this.props.cardItems) {
      this.setState({ cardItems: nextProps.cardItems });
    }
  }
  filterData(API) {
    console.log("API:", API);
    this.setState({ isLoaded: false });
    axios.get(API)
      .then(res => {
        const programs = res.data;
        this.setState({ cardItems: programs });
        console.log("programs:", programs);
        this.setState({ isLoaded: true });
      })
  }
  handleClick(list, type) {
    let API = "https://api.spaceXdata.com/v3/launches?limit=100",
      filterLunc = "",
      filterLnd = "",
      selectedList = "";

    if (type == "year") {
      selectedList = this.state.selectedList.includes(list) ? [] : list;
      this.setState({ selectedList: selectedList });
      API = "https://api.spaceXdata.com/v3/launches?limit=100&launch_year=" + selectedList;

    }
    if (type == "lnch") {
      filterLunc = this.state.filterLunc.includes(list) ? [] : list;
      let status = (filterLunc == "sucss_lnch_yes") ? "true" : "false";
      this.setState({ filterLunc: filterLunc });
      API = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=" + status;
    }
    if (type == "lnd") {
      filterLnd = this.state.filterLnd.includes(list) ? [] : list;
      let status = (filterLnd == "sucss_lnd_yes") ? "true" : "false";
      this.setState({ filterLnd: filterLnd });
      API = "https://api.spaceXdata.com/v3/launches?limit=100&land_success=" + status;

    }
    if ((this.state.selectedList.length > 0 || selectedList) && (filterLnd || this.state.filterLnd.length > 0) && (filterLunc || this.state.filterLunc.length > 0)) {
      let tempselectedList = (selectedList) ? selectedList : this.state.selectedList;
      let tempfilterLunc = (filterLunc) ? ((filterLunc == "sucss_lnch_yes") ? "true" : "false") : ((this.state.filterLunc == "sucss_lnch_yes") ? "true" : "false");
      let tempfilterLnd = (filterLnd) ? ((filterLnd == "sucss_lnd_yes") ? "true" : "false") : ((this.state.filterLnd == "sucss_lnd_yes") ? "true" : "false");

      API = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=" + tempfilterLunc + "&land_success=" + tempfilterLnd + "&launch_year=" + tempselectedList;
    }

    this.filterData(API)

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
                    <button className={this.state.selectedList.includes(list) ? 'space-mission--filterBtn selected' : 'space-mission--filterBtn'} onClick={(e) => this.handleClick(list, 'year')}>
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
                <button className={this.state.filterLunc.includes("sucss_lnch_yes") ? 'space-mission--filterBtn selected' : 'space-mission--filterBtn'} onClick={(e) => this.handleClick("sucss_lnch_yes", 'lnch')}>
                  Yes
                    </button>
              </li>
              <li className="space-mission--filterItem" key="sucss_lnch_no">
                <button className={this.state.filterLunc.includes("sucss_lnch_no") ? 'space-mission--filterBtn selected' : 'space-mission--filterBtn'} onClick={(e) => this.handleClick("sucss_lnch_no", 'lnch')}>
                  No
                    </button>
              </li>
            </ul>
          </section>
          <section className="space-mission--filterWp">
            <label className="space-mission--filterLabel">Successful Landing</label>
            <ul className="space-mission--filterList">
              <li className="space-mission--filterItem" key="sucss_lnd_yes">
                <button className={this.state.filterLnd.includes("sucss_lnd_yes") ? 'space-mission--filterBtn selected' : 'space-mission--filterBtn'} onClick={(e) => this.handleClick("sucss_lnd_yes", "lnd")}>
                  Yes
                    </button>
              </li>
              <li className="space-mission--filterItem" key="sucss_lnch_no">
                <button className={this.state.filterLnd.includes("sucss_lnd_no") ? 'space-mission--filterBtn selected' : 'space-mission--filterBtn'} onClick={(e) => this.handleClick("sucss_lnd_no", "lnd")}>
                  No
                    </button>
              </li>
            </ul>
          </section>
        </aside>
        <section>

          <h3 className={this.state.isLoaded ? 'hide' : 'show'}>Loading...</h3>
          <ul className="space-mission--list">
            {
              this.state.cardItems.map((list, idx) => {
                return (
                  <li className="space-mission--item" key={idx}>
                    <Image links={list.links} />
                    <MissionDetails list={list} />
                  </li>
                )
              })
            }
          </ul>
        </section>
      </Fragment>
    );
  };
}

export default CardList;

