import React, { useState } from 'react'
import { IUser } from '../db/users';
import { useNavigate } from 'react-router-dom';
import { useDB } from '../context/db.context';

function AuthLogin() {
  /* These lines of code are using the `useState` and `useNavigate` hooks from React and the `useDB`
  hook from a custom context to declare and initialize state variables for `email` and `password`,
  and to get the `navigate` and `db` objects respectively. The `useState` hook is used to manage
  state in functional components, while the `useNavigate` hook is used to navigate to different
  pages in the application. The `useDB` hook is a custom hook that provides access to a database
  context. */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const db = useDB()

 
  /**
   * This function handles form submission for user login and checks if the login credentials are
   * valid.
   * @param event - The event parameter is an object that represents an event that occurred in the
   * browser, such as a form submission or a button click. It has a preventDefault method that can be
   * called to prevent the default behavior of the event, such as preventing a form from submitting or
   * a link from navigating to a new
   */
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const user = db.user.findFirst(((user: IUser) => user.email === email && user.password === password));

    if (!user) alert('Invalid Login');

    alert('Login Successful')
    navigate('/')

  }

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="column-md-6 vh-md-100 vh-sm-25 background__main auth-side"></div>
        <div className="column-md-6 vh-md-100">
          <div className="jumbotron display-flex align-items-center min-vh-md-100 min-vh-sm-75">
            <div className="container">
              <h2>Hello 👋,</h2>
              <p className="text-muted">Welcome back</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
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
                  <button className="mx-auto btn btn-main w-75 mb-3">LOGIN</button>
                </div>

                <div className="text-center">Don't have an account <a className="text-main" href="./register">Register</a></div>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default AuthLogin
