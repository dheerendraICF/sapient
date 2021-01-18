import React from 'react';

function MissionDetails(mission) {
    let list = mission.list;
    return (
        <section className="space-mission--details">
            <h3>{list.mission_name} #{list.flight_number}</h3>
            <ul className="space-mission--missionIds space-mission--info">
                {(list.mission_id.length > 0 ? <label>Mission Ids</label> : '')}
                {list.mission_id.map(id => <li key={id}>{id}</li>)}
            </ul>
            <p className="space-mission--info">
                <label>Launch Year</label>
                <span>{list.launch_year}</span>
            </p>
            <p className="space-mission--info">
                <label>Successfully Launch</label>
                <span>{list.launch_success ? "Yes" : "No"}</span>
            </p>
            <p className="space-mission--info">
                <label>Successfully Lannding</label>
                <span>{list.is_tentative ? "Yes" : "No"}</span>
            </p>
        </section>
    );
}

export default MissionDetails;

