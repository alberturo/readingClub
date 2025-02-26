import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { selectBooksByLanguage, thunkGetBooksByLanguage } from "../../redux/books";
import BookCard from "../BookCard";
import "./BookList.css"

const allowedLang = {'eng':'English', 'jp':'Japanese', 'sp':'Spanish'}

function BookList(){
  const dispatch = useDispatch()
  const { lang } = useParams();
  const navigate = useNavigate();
  const books = Object.values(useSelector(selectBooksByLanguage))

  useEffect(()=>{
    if (!(lang in allowedLang)){
      navigate("/")
    }else {
      dispatch(thunkGetBooksByLanguage(lang))
    }
  },[dispatch, lang, navigate])

  return(
    <div className='book-list-page'>
      <div className="book-list-column">
        <h1>{`${allowedLang[lang]}`}</h1>
        {books.length > 0 &&
          books.map(book =>
            <BookCard key={book.id} book={book}/>
          )
        }

      </div>
      <div className="genre-selection">
        <h3>Genre</h3>
        <ul className="genre-list">
          <li className="genre-item">Novel</li>
          <li className="genre-item">Fiction</li>
          <li className="genre-item">Science Fiction</li>
          <li className="genre-item">Romance</li>
          <li className="genre-item">Satire</li>
        </ul>
      </div>
    </div>
  )
}

export default BookList
