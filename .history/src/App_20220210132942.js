import logo from "./logo.svg";
import xlsx from "xlsx";
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
  const [publisher, setPublisher] = useState("publisher");
  const [isbn10, setIsbn10] = useState("");
  const [authors, setAuthors] = useState([]);
  const [pages, setPages] = useState('pages');
  const [edition, setEdition] = useState('edition');
  const [title, setTitle] = useState("title");
  const [genres, setGenres] = useState([]);
  const [data, setData] = useState({});
  const [description, setDescription] = useState("description");
  const [weight, setWeight] = useState("0.3");
  useEffect(() => {
    // 1
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
              setPublisher(response.data?.book?.publisher);
              setPages(response.data?.book?.pages);
              setEdition(response.data?.book?.edition);
              setIsbn13(response.data.book.isbn13);
              // setIsbn10(response.data.book.isbn);
              console.log(isbn10);
              // setImage(response.data.book.image)
              setBinding(response.data.book.binding);
              setAuthors(response.data.book.authors);
              const myArray = response.data.book.dimensions.split(",");
              const word = myArray[2].split(":");
              const final = word[1].substring(0, 6) / 2.2046;
              console.log(final);
              setWeight(final.substring(0 , 4));
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
        : console.log("isbn less then 10");
    }
    {
      isbn13.length == 13 && setIsbn10(convISBN13toISBN10(isbn13));
    }
    return () => {};
  }, [isbn13.length==13, isbn10.length==10]);
  function convISBN13toISBN10(isbn13) {
    var s;
    var c;
    var checkDigit = 0;
    var result = "";

    s = isbn13.substring(3, isbn13.length);
    for (let i = 10; i > 1; i--) {
      c = s.charAt(10 - i);
      checkDigit += (c - 0) * i;
      result += c;
    }
    checkDigit = (11 - (checkDigit % 11)) % 11;
    result += checkDigit == 10 ? "X" : checkDigit + "";
    setIsbn10(result);
    console.log(isbn10);
    return result;
  }
  const [binding, setBinding] = useState("Paperback");
  const [image, setImage] = useState("");
  const [inventory, setInventory] = useState("1");
  const [ratings, setRatings] = useState("ratings");
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
      price: price.substring(1),
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
  };
  const onRatingsChange = (e) => {
    setRatings(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const onWeightChange = (e) => {
    setWeight(e.target.value);
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
  function onSubmit1() {
    const data = {
      title: title,
      isbn13: isbn13,
      image: image,
      authors: authors,
      binding: binding,
      weight: weight,
      publisher : publisher,
      edition : edition ,
      pages : pages , 
      price: price,
      inventory: inventory,
      location: location,
      ratings: ratings,
      description: description,
      genres: genres,
      condition: condition,
    };
    axios({
      method: "post",
      url: "http://localhost:8080/postdata",
      data: data,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    console.log(data);
    document.location.reload() 
    // var wb = xlsx.readFile("exportdata.xlsx");
    // var ws = wb.Sheets["exportdata"];
    // xlsx.utils.sheet_add_aoa(
    //   ws,
    //   [
    //     [
    //       title,
    //       isbn13,
    //       image,
    //       authors,
    //       binding,
    //       weight,
    //       price,
    //       inventory,
    //       location,
    //       ratings,
    //       description,
    //       genres,
    //       condition,
    //     ],
    //   ],
    //   { origin: -1 }
    // );
    // xlsx.writeFile(wb, "exportdata.xlsx");
    // console.log('written')
  }
  const onSubmit = () => {
    window.alert("submit working");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const theme = useTheme();
  return (
    <div className="App">
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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
              <TextField onChange={onWeightChange}
                name={weight}
                value={weight} />
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
            <button onSubmit={handleSubmit}>Submit</button>
          </form>
        )}
      />
      <button onClick={onSubmit1}>Submit excel</button>
    </div>
  );
}

export default App;
