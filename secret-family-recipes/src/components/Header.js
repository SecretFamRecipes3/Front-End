import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
  &:visited,
  &:link,
  /* &:active {
    text-decoration: none; */
  }
  color: black;
`;

function Header(props) {
  return (
    <>
      {!props.loggedIn && (
        <div className="navLinks">
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/signup">Sign Up</StyledLink>
          <StyledLink to="/userprofile">My Recipes</StyledLink>
        </div>
      )}
      {props.loggedIn && (
        <div className="navLinks">
          <Link to="/logout">Log Out</Link>
          <br />
          <Link to="/userprofile">My Recipes</Link>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, {})(Header);
