import logo from "./logo.svg";
import xlsx from "xlsx";
import { GoogleSpreadsheet } from "google-spreadsheet";
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
  function onSubmit1() {
    const doc = new GoogleSpreadsheet(
      "15TZMDf_7uG84rUhnaZwFNOiqKGx8p4T45KtdpefCjeg"
    );

    // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      // env var values are copied from service account credentials generated by google
      // see "Authentication" section in docs for more info
      client_email: 'exportdata@sabki-grocery.iam.gserviceaccount.com',
      private_key: 'nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDgD+h4wi2wSYBQ\nHfId2L4dZ94+FWTZRIKs0puugohq8jcQbc2GZIsxfYfs7MuyQyDT+/S8sJfhwTaY\nGTUz/mvd6m3RLODQ9vEYh7UbPGSwYmL1gYktoX8kWa6faUbtLEl24khhCGUuPcOU\njMPMUsn9Ttg9xYR5+4Y6jrrzj5QGOKfZPz/zp1irm/akzd5H4/nrDQiEZx5LX67C\n1w4L2vNvQbaJYvjCdlI/Qxt8fu0ziuE4jDJrdyGxYYssZaE55j26ia+KdynszZpW\nxhuQN5RS/Rya/7utdzVRsXGatez38yMh0ZIcInMhB4jIhlQ/JaibLb2eFVs6UNyg\nSJ1nMxaNAgMBAAECgf9u+8ECuI6H7nKsOb4lEZdSLYP67FkC1+ISMELG98lVvKAd\negKMijFt1bWP5bKHCdPhBWGyYQ+qfB5OsBdIkS0knGiPRXxiSOEWmoysOAIsExbc\nTag1Zg1lD28p9hceX17MA5F91fSRZEiyambo+p1MUkOvedMGm8YTB0RyvoOYnm8x\nU3Q7GefKRjTQfXkOm29QA9+L7RoFK6w4YB8IhBxlVLR9LEDLGjGD2+Xr59axzHiC\n1A0rwQPBoJTns28Z+Q3NlVT6xSm9LgAldryd19EZeFNiG0lJznZcYXyxz8uNuC1x\nrm+QDPszIoJ5bLll11PncR+g5N5ykkuZ+imkG1ECgYEA/iMSueSWjg6XSib6v6aY\n6Ceb2/p4r9h+XDLoLZYOKmBTy09HM0d9Ra/mOadwR2aSUgq4Wa98GdhoGpfYTfET\ntyxYLb1qfGbTME3VoVwAPWyN25DZwPeN3L7DWBbMHXbKX98bylgvtyGMzN75va6L\nzrB19Uu8tUD2l0+C1A6SkNECgYEA4bRlFokpOC7wWSmeP86VXgJtTJgAnMefEiKY\nmkuXxXK2sjEytGerccDm4IitGH7RdQNTu/vfdP0fEjS1G0RAbu0DURaorcKPx7l/\n6x/7ptadRdm/3Nyl5t1KJ0BBaD/d3AQu53rdQOzIE2U8f4/rhQ0+Iq8T+U4gPNuS\nqmL4eP0CgYBvKvB6GKAzK/bKHRr60ul4RDtNktdQNKextSMTLdysdM6y1M8Ug2Ut\nIrDW74OR+DBxavcRZE4pEB0Z5OpdzeMN8XvxJjZ6jJA9RQ76MsB4HhA/x7E5VBDe\nSyQwWGiZSulj3rjNXp4gwbBRvggJDV1i4JX441R9BRnZPpLAKE+8wQKBgCAY72dN\nCjebNUL40DByyHseDT0fQLcLDGwfz2Ph7CuALMsahANz2sXKkQrNZRBeuJrTZk0N\nfLG+bXTBWiAOjLs5qYcWmdZcHOZiUva1DaykSKluVgKqvk0emzUJxkN1EbAASEtT\nBbP9+FYJx5i8dtntEDEOhOCnY55D+4+Pk5ZhAoGBAPRvwGmgWZWSClrumcjJxs8o\nKHf/kJieFOGDu1TOBYDPfcP49Ba7fyrfYt/AGqJkYf85lT4kIdv3PTK2oBMfsrCv\nVVM/obrGH3KOOkc6tdj/ydsIQ19LkWlwwXtBZayCKDgC3aLPpGhUDoVrrVs77/Qi\nFxesICC1MpcM8MHGhA8v',
    });

    // let nameFileExcel = "exportdata.xlsx";
    // var workbook = new ExcelJS.Workbook();
    // workbook.xlsx.readFile(nameFileExcel).then(function () {
    //   var worksheet = workbook.getWorksheet(0);
    //   var lastRow = worksheet.lastRow;
    //   var getRowInsert = worksheet.getRow(++lastRow.number);
    //   getRowInsert.getCell("A").value = "New Value";
    //   getRowInsert.commit();
    //   return workbook.xlsx.writeFile(nameFileExcel);
    // });
    // var wb = xlsx.readFile('exportdata.xlsx');
    // var sheet = workbook.Sheets["exportdata"];
    // var ws = wb.Sheets["exportdata"];
    // const sheet = workbook.addWorksheet("Sheet1");
    // sheet.columns = [
    //   { header: "Name", key: "title" },
    //   { header: "ISBN13", key: "isbn13" },
    //   { header: "Image", key: "image" },
    //   { header: "Authors", key: "authors" },
    //   { header: "covertype", key: "binding" },
    //   { header: "weight", key: "weight" },
    //   { header: "price", key: "price" },
    //   { header: "inventory", key: "inventory" },
    //   { header: "location", key: "location" },
    //   { header: "ratings", key: "ratings" },
    //   { header: "description", key: "description" },
    //   { header: "genres", key: "genres" },
    //   { condition: "conditon", key: "condition" },
    // ];
    // sheet.addRow({
    //   name: title,
    //   isbn13: isbn13,
    //   image: image,
    //   authors: authors,
    //   covertype: binding,
    //   weight: weight,
    //   price: price,
    //   inventory: inventory,
    //   location: location,
    //   rating: ratings,
    //   description,
    //   genres: genres,
    //   condition: condition,
    // });
    // workbook.xlsx.writeFile("exportdata.xlsx").then(function () {
    //   console.log("Array added and then file saved.");
    // });
  }
  const onSubmit = () => {};
  const theme = useTheme();
  return (
    <div className="App">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
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
            <button type="submit" onSubmit={onSubmit}>
              Submit
            </button>
            <CSVLink data={csvData}>Download me</CSVLink>;
          </form>
        )}
      />
      <button onClick={onSubmit1}>Submit excel</button>
    </div>
  );
}

export default App;
