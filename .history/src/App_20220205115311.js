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
  const [isbn13, setIsbn13] = useState("");
  const [isbn10, setIsbn10] = useState("");
  const [data, setData] = useState({});
  const [weight, setWeight] = useState("");
  const [amazonData, setAmazonData] = useState({});
  useEffect(() => {
    { isbn13.length == 13 ? 
      axios.get(`http://localhost:8080/?isbn=${isbn13}` ,{headers : {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }})
      .then(function (response) {
        // handle success
        // setData(response.data.book);
        console.log(response.data.book);
        setTitle(response.data.book.title);
        setIsbn13(response.data.book.isbn13);
        // setImage(response.data.book.image)
        setBinding(response.data.book.binding);
        setAuthors(response.data.book.authors);
        const myArray = response.data.book.dimensions.split(",");
        const word = myArray[2].split(":")
        const final = (word[1].substring(0 , 6 ) / 2.2046);
        console.log(final)
        setWeight(final);
        console.log(weight)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        console.log("this will be always displayed");
      })
       : 
    console.log("isbn less then 13")}
    //{isbn13 == 13 && convISBN13toISBN10(isbn13)}
    { isbn10.length == 10 ? 
      axios.get(`http://localhost:8080/amazondata/?isbn10=${isbn10}` ,{headers : {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }})
      .then(function (response) {
        // handle success
        // setData(response.data.book);
        console.log(response.data);
        // setTitle(response.data.book.title);
        // setIsbn(response.data.book.isbn13);
        setImage(response.data.image);
        setPrice(response.data.offers[0].price);
        // setBinding(response.data.book.binding);
        // setAuthors(response.data.book.authors);
        // const myArray = response.data.book.dimensions.split(",");
        // const word = myArray[2].split(":")
        // const final = (word[1].substring(0 , 6 ) / 2.2046);
        // console.log(final)
        // setWeight(final);
        // console.log(weight)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        console.log("this will be always displayed");
      })
       : 
    console.log("isbn less then 10")}
    return () => {
      ;
    };
  }, [isbn13]);
  isbn13 == 13 && function convISBN13toISBN10(isbn13) {
    var s;
    var c;
    var checkDigit = 0;
    var result = "";

    s = isbn13.substring(3,isbn13.length);
    for ( var i = 10; i > 1; i-- ) {
        c = s.charAt(10 - i);
        checkDigit += (c - 0) * i;
        result += c;
    }
    checkDigit = (11 - (checkDigit % 11)) % 11;
    result += checkDigit == 10 ? 'X' : (checkDigit + "");
    console.log(result);
    return ( result );
}
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
  const onIsbn13Change = (e) => {
    setIsbn13(e.target.value);
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
        <h2>Book Form</h2>
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
        <label>Weight </label>
        <TextField value={weight} />
        <br></br>
          <label>Isbn13</label>
          <TextField
          onChange={onIsbn13Change}
          name={isbn13}
          value={isbn13}
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
