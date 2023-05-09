import React from 'react'
import Header from '../components/header'
import JumbotronSmall from '../components/jumbotronSmall'
import DrinkCard from '../components/drink-card'
import { useDB } from '../context/db.context'
import Footer from '../components/footer'

function Drinks() {
  /* `const db = useDB()` is using the `useDB` hook from the `db.context` to get access to the
  database. */
  const db = useDB();

  /* `const drinks = db?.drink.all()` is assigning the result of calling the `all()` method on the
  `drink` object in the `db` object to the `drinks` variable. The `?.` operator is used to check if
  the `db` object exists before accessing the `drink` object and calling its `all()` method. If the
  `db` object is `null` or `undefined`, then `drinks` will be assigned `undefined`. */
  const drinks = db?.drink.all()
  return (
    <div>
      <Header />
      <JumbotronSmall />
      <div className='container-fluid'>
        <div className="row">
          {drinks.map(drink => {
            return <DrinkCard key={drink.id} {...drink} />
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Drinks
