import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { randomID } from '../db/repository';
import { useDB } from '../context/db.context';

function AuthRegister() {
  /* These lines of code are using React hooks to declare state variables `email` and `password` and
  their corresponding setter functions `setEmail` and `setPassword`. The `useState` hook is used to
  manage state in functional components in React. */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const db = useDB();

  /**
   * This function handles form submission for user registration and creates a new user in the
   * database.
   * @param event - The event parameter is an object that represents an event that occurred in the
   * browser, such as a form submission or a button click. It has a preventDefault method that can be
   * called to prevent the default behavior of the event, such as preventing a form from submitting or
   * a link from navigating to a new
   */
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const user = db.user.create({ id: randomID(), email, password });

    if (!user) alert('Registration failed');

    alert('Registration Successful')
    navigate('/login')

  }
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="column-md-6 vh-md-100 vh-sm-25 background__main auth-side"></div>
        <div className="column-md-6 vh-md-100">
          <div className="jumbotron display-flex align-items-center min-vh-md-100 min-vh-sm-75">
            <div className="container">
              <h2>Welcome 👋,</h2>
              <p className="text-muted">Create an account</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password" className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="display-flex">
                  <button className="mx-auto btn btn-main w-75 mb-3">REGISTER</button>
                </div>

                <div className="text-center">Don't have an account <Link className="text-main" to="/login">Login</Link></div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AuthRegister;
