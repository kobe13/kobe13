import React from 'react';
import PropTypes from 'prop-types';

const Astronaut = ({ name, craft }) => <li>{name} - {craft} </li>;

const AstronautCrew = props => (
  <div>
    <p>There are {props.number} people in Space:</p>
    <ul>
      {props.people.map((astronaut, index) => <Astronaut key={index} {...astronaut}/>)}
    </ul>
  </div>
);

Astronaut.propTypes = {
  name: PropTypes.string,
  craft: PropTypes.string,
};

AstronautCrew.propTypes = {
  people: PropTypes.object,
  number: PropTypes.number,
};

export default AstronautCrew;
