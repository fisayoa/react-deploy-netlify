import Header from '../components/header'
import Jumbotron from '../components/jumbotron'
import DrinkCard from '../components/drink-card'
import { useDB } from '../context/db.context'
import { useSearchParams } from 'react-router-dom'
import { IDrinks } from '../db/drinks'
import Footer from '../components/footer'

function Index() {
  const [searchParams,] = useSearchParams();
  const searchQuery = searchParams.get('search')
  /* `const db = useDB()` is using the `useDB` hook from the `db.context` to get access to the
database. */
  const db = useDB();
  const _queryFilter = (drink: IDrinks) => {
    if (searchQuery)
      return !!drink.name.match(new RegExp(searchQuery, 'g')) || !!drink.price.toString().match(new RegExp(searchQuery, 'g'));
  };

  const drinks = searchQuery ? db.drink.all().filter(_queryFilter) : db.drink.all();

  return (
    <>
      <Header />
      <Jumbotron />
      <div className='container-fluid'>
        <div className="row">
          {drinks.map(drink => {
            return <DrinkCard key={drink.id} {...drink} />
          })}
          {drinks.length < 1 && <div className='flex justify-content-center align-content-center align-items-center'>
            <h3 className='my-5'>No drink Was found</h3>
          </div>}
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Index
