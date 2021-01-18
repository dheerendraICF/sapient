import React from 'react';
import CardList from './CardList';
import axios from 'axios';


export default class Templates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      launchProgram: [],
      launchYear: [],
    }
  }
  componentDidMount() {
    const API = "https://api.spacexdata.com/v3/launches?limit=100";
    axios.get(API)
      .then(res => {
        const programs = res.data;
        let tempLaunchYear = programs.map(list => list.launch_year)
        this.setState({ launchProgram: programs, launchYear: [... new Set(tempLaunchYear)] });
      })
  }

  render() {
    return (
      <main className="space-mission">
        <h1>SpaceX Launch Programs</h1>
        <section className="space-mission--wp">
          <CardList launchYear={this.state.launchYear} cardItems={this.state.launchProgram} />
        </section>
      </main>
    )
  }
}