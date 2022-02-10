import logo from './logo.svg';
import TextField from '@material-ui/core/TextField'
import { Form, Field } from 'react-final-form'
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
// import Image from 'material-ui-image';
import axios from 'axios';
import React , { useState , useEffect} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [weight, setWeight] = useState("");
  useEffect(() => {
    axios.get('http://localhost:8080/' ,{headers : {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }})
  .then(function (response) {
    // handle success
    // setData(response.data.book);
    console.log(response.data.book);
    setTitle(response.data.book.title);
    setIsbn(response.data.book.isbn13);
    setImage(response.data.book.image)
    setBinding(response.data.book.binding);
    setAuthors(response.data.book.authors);
    const myArray = response.data.book.dimensions.split(",");
    const word = myArray[2].split(":")
    const final = (word[1].substring(0 , 6 ) / 2.2046);
    console.log(final)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    console.log("this will be always displayed");
  });
  
    return () => {
      ;
    };
  }, []);
  
  const [isbn, setIsbn] = useState("9787878");
  const [authors, setAuthors] = useState([]);
  const [binding, setBinding] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("")
  

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
  const onConditionChange = (e) => {
    setCondition(e.target.value);
    console.log(condition)
  }
  return (
    <div className="App">
     <Form
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Simple Default Input</h2>
        <img
        src={image}
        height="200"
        width="200"
        loading="lazy"
      />
      
        <div>
        <label>Covertype </label>
        <TextField value={binding} />
        <br></br>
        <label>Authors </label>
        <TextField value={authors} />
        <br></br>
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
    <Select
          value={condition}
          label="Age"
          onChange={onConditionChange}
        >
          <MenuItem value="Good" >Good</MenuItem>
          <MenuItem value="New" >New</MenuItem>
          <MenuItem value="Like" >Like New </MenuItem>
        </Select>
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
