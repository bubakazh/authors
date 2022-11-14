import './App.css';
import Main from './pages/Main';
import AddAuthor from './pages/AddAuthor';
import EditAuthor from './pages/EditAuthor';
import { Route, Routes } from 'react-router-dom';

function App() {

    return (
      <fieldset>
        <legend>App.jsx</legend>
        <Routes>
          <Route path = "/" element = {<Main />}/>
          <Route path = "/new" element = {<AddAuthor />} />
          <Route path = "/edit/:author_id" element = {<EditAuthor />} />
        </Routes>
      </fieldset>
    );
}

export default App;
