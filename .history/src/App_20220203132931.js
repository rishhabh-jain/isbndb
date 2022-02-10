import logo from './logo.svg';
import TextField from '@material-ui/core/TextField'
import { Form, Field } from 'react-final-form'
// import Image from 'material-ui-image';
import axios from 'axios';
import React , { useState , useEffect} from 'react';
import './App.css';

function App() {
  const [isbn, setIsbn] = useState("9787878");
  const [authors, setAuthors] = useState([]);
  const [binding, setBinding] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");
  axios.get('http://localhost:8080/' ,{headers : {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }})
  .then(function (response) {
    // handle success
    console.log(response.data.book);
    setTitle(response.data.book.title);
    setIsbn(response.data.book.isbn13);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    console.log("this will be always displayed");
  });
  const onTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(title)
  }
  const onIsbnChange = (e) => {
    setIsbn(e.target.value);
  }
  const onPriceChange = (e) => {
    setPrice(e.target.value);
  }
  const onLocationChange = (e) => {
    setLocation(e.target.value);
  }
  return (
    <div className="App">
     <Form
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Simple Default Input</h2>
        {/* <Image
        src={image}/> */}
        <div>
          <label>Isbn</label>
          <TextField
          onChange={onIsbnChange}
          name={isbn}
          value={isbn}
        />
        </div>
        <div>
          <label>Name</label>
          <TextField
          onChange={onTitleChange}
        name={title}
        value={title}
      />
        </div>
        <div>
          <label>Price</label>
          <TextField
          onChange={onPriceChange}
        name={price}
        value={price}
      />
        </div>
        <div>
          <label>Inventory</label>
          <Field name="inventory" component="input" placeholder="inventory" />
        </div>
        <div>
          <label>Location</label>
          <TextField
          onChange={onLocationChange}
        name={location}
        value={location}
      />
        </div>
        {/* <div>
          <label>Condition</label>
          <Field name="condition" component="select">
              <option />
              <option value={condition} onSelect={onCondition}> Good </option>
              <option value={condition}> Like new </option>
              <option value={condition}> New </option>
              <option value={condition}> Readable</option>
            </Field>
        </div> */}

        <button type="submit">Submit</button>
      </form>
      
    )}
  />
  
    </div>
  );
}
const onSubmit = () => {
  window.alert("onsubmit working");
}


export default App;
