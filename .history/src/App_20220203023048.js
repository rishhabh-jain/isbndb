import logo from './logo.svg';
import { Form, Field } from 'react-final-form'
import axios from 'axios';
import React , { useState , useEffect} from 'react';
import './App.css';

function App() {
  axios.get('https://api2.isbndb.com' ,{headers : {
    "Authorization": '47369_cd90802bf9dbec8df88fd727ef18a7c0' , 
    "Content-Type": 'application/json',
    "User-Agent" : "insomnia/5.12.4",
    "Accept" : "*/*"
  }})
  .then(function (response) {
    // handle success
    console.log("login success");
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    console.log("this will be always displayed");
  });
  const [isbn, setIsbn] = useState("9787878");
  return (
    <div className="App">
     <Form
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Simple Default Input</h2>
        <div>
          <label>Isbn</label>
          <Field name="Isbn" component="input" placeholder="isbn" value={isbn}/>
        </div>
        <div>
          <label>Price</label>
          <Field name="price" component="input" placeholder="price" />
        </div>
        <div>
          <label>Inventory</label>
          <Field name="inventory" component="input" placeholder="inventory" />
        </div>
        <div>
          <label>Location</label>
          <Field name="location" component="input" placeholder="location" />
        </div>
        <div>
          <label>Condition</label>
          <Field name="condition" component="select">
              <option />
              <option value=" Good "> Good </option>
              <option value=" Like new "> Like new </option>
              <option value=" New"> New </option>
              <option value="Readable"> Readable</option>
            </Field>
        </div>

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
