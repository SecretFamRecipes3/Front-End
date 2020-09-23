import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Header(props) {
    return (
    <>
        {!props.loggedIn && (
            <div className="navLinks">
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">SignUp</Link>
                    </li>
                    <li>
                        <Link to="/userprofile">My Recipes</Link>
                    </li>
                </ul>
            </div>
        )}
        {props.loggedIn && (
            <div className="navLinks">
                <Link to="/logout">Log Out</Link><br/>
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