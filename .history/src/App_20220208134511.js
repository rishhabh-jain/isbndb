import logo from "./logo.svg";
import xlsx from "xlsx";
import fs from 'fs';
import ExcelJS from "exceljs";
import spreadSheet from "spread_sheet";
import TextField from "@material-ui/core/TextField";
import { useTheme } from "@mui/material/styles";
import { CSVLink, CSVDownload } from "react-csv";
import { Form, Field } from "react-final-form";
// import { Select } from "@material-ui/core";
//import { MenuItem } from "@material-ui/core";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
// import Image from 'material-ui-image';
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isbn13, setIsbn13] = useState("");
  const [isbn10, setIsbn10] = useState("");
  const [data, setData] = useState({});
  const [weight, setWeight] = useState("0.3");
  const [amazonData, setAmazonData] = useState({});
  useEffect(() => {
    {
      isbn13.length == 13
        ? axios
            .get(`http://localhost:8080/?isbn=${isbn13}`, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              },
            })
            .then(function (response) {
              // handle success
              // setData(response.data.book);
              console.log(response.data.book);
              setTitle(response.data.book.title);
              setIsbn13(response.data.book.isbn13);
              setIsbn10(response.data.book.isbn);
              console.log(isbn10);
              // setImage(response.data.book.image)
              setBinding(response.data.book.binding);
              setAuthors(response.data.book.authors);
              const myArray = response.data.book.dimensions.split(",");
              const word = myArray[2].split(":");
              const final = word[1].substring(0, 6) / 2.2046;
              console.log(final);
              setWeight(final);
              console.log(weight);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              console.log("this will be always displayed");
            })
        : console.log("isbn less then 13");
    }
    {
      isbn13 == 13 && convISBN13toISBN10(isbn13);
    }
    {
      isbn10.length == 10
        ? axios
            .get(`http://localhost:8080/amazondata/?isbn10=${isbn10}`, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              },
            })
            .then(function (response) {
              // handle success
              // setData(response.data.book);
              console.log(response.data);
              // setTitle(response.data.book.title);
              // setIsbn(response.data.book.isbn13);
              setImage(response.data.image);
              setPrice(response.data.offers[0].price);
              var xy = response.data.title.split(":");
              setTitle(xy[0]);
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
        : console.log("isbn less then 10");
    }
    return () => {};
  }, [isbn13, isbn10]);
  function convISBN13toISBN10(str) {
    var s;
    var c;
    var checkDigit = 0;
    var result = "";

    s = str.substring(3, str.length);
    for (var i = 10; i > 1; i--) {
      c = s.charAt(10 - i);
      checkDigit += (c - 0) * i;
      result += c;
    }
    checkDigit = (11 - (checkDigit % 11)) % 11;
    result += checkDigit == 10 ? "X" : checkDigit + "";

    return result;
  }
  const [authors, setAuthors] = useState([]);
  const [binding, setBinding] = useState("");
  const [image, setImage] = useState("");
  const [inventory, setInventory] = useState("");
  const [title, setTitle] = useState("");
  const [ratings, setRatings] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState([]);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState([]);
  const names = [
    "Self help",
    "Romance",
    "Historical",
    "Non Fiction",
    "Mystery",
    "Thriller",
    "Young Adult",
    "Cooking",
    "Chick lit",
    "Classics",
  ];
  const names2 = [
    "New",
    "Used - Like New",
    "Used - Very Good",
    "Used - Good",
    "Used - Readable",
    "Used - Collectible",
  ];
  const csvData = [
    {
      name: title,
      isbn13: isbn13,
      image: image,
      authors: authors,
      covertype: binding,
      weight: weight,
      price: price,
      inventory: inventory,
      location: location,
      rating: ratings,
      description,
      genres: genres,
      condition: condition,
    },
  ];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const onTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };
  const onIsbn13Change = (e) => {
    setIsbn13(e.target.value);
  };
  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };
  const onLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const onInventoryChange = (e) => {
    setInventory(e.target.value);
    console.log(condition);
  };
  const onRatingsChange = (e) => {
    setRatings(e.target.value);
    console.log(condition);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
    console.log(condition);
  };
  const onGenresChange = (event) => {
    const {
      target: { value },
    } = event;
    setGenres(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const onConditionChange = (event) => {
    const {
      target: { value },
    } = event;
    setCondition(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  async function onSubmit1() {
    var wb = xlsx.readFile("exportdata.xlsx");
    var ws = wb.Sheets["exportdata"];
    xlsx.utils.sheet_add_aoa(
      ws,
      [
        [
          title,
          isbn13,
          image,
          authors,
          binding,
          weight,
          price,
          inventory,
          location,
          ratings,
          description,
          genres,
          condition,
        ],
      ],
      { origin: -1 }
    );
    xlsx.writeFile(wb, "exportdata.xlsx");
    console.log('written')
  }
  const onSubmit = () => {};
  const theme = useTheme();
  return (
    <div className="App">
      <Form
        // onSubmit={onSubmit}
        render={({ onSubmit }) => (
          <form onSubmit={onSubmit}>
            <h2>Book Form</h2>
            <img src={image} height="200" width="200" loading="lazy" />
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
              <TextField onChange={onTitleChange} name={title} value={title} />
            </div>
            <div>
              <label>Price</label>
              <TextField onChange={onPriceChange} name={price} value={price} />
            </div>
            <div>
              <label>Inventory</label>
              <TextField
                onChange={onInventoryChange}
                name={inventory}
                value={inventory}
              />
            </div>
            <div>
              <label>Location</label>
              <TextField
                onChange={onLocationChange}
                name={location}
                value={location}
              />
            </div>
            <div>
              <label>Ratings</label>
              <TextField
                onChange={onRatingsChange}
                name={ratings}
                value={ratings}
              />
            </div>
            <div>
              <label>Description</label>
              <TextField
                onChange={onDescriptionChange}
                name={description}
                value={description}
              />
            </div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>Genres</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                value={genres}
                multiple
                onChange={onGenresChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                // MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    // style={getStyles(name, genres)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>Condition</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                value={condition}
                onChange={onConditionChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                // MenuProps={MenuProps}
              >
                {names2.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    // style={getStyles(name, genres)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <button  onSubmit={onSubmit}>
              Submit
            </button> */}
          </form>
        )}
      />
      <button onClick={onSubmit1}>Submit excel</button>
    </div>
  );
}

export default App;
