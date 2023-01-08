import React, { useMemo, useState, useRef, useCallback, useEffect, useContext } from 'react'
import { cardActionAreaClasses, Grid } from '@mui/material'

import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Input, Label, Form, Card, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Button from '@mui/material/Button';
import axios, { Axios } from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { SetPopupContext } from '../App';
import { useHistory } from 'react-router-dom';
import Select from 'react-select'



export default function Products() {
  const setPopup = useContext(SetPopupContext);
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
  const [prodName, setprodName] = useState('')
  const [categories, setCategories] = useState([])
  const [expdate, setExpDate] = useState('')
  const [prodBarcode, setprodBarcode] = useState('')
  const [modal, setModal] = useState(false);
  const [updateFlag, setUpdateFlag] = useState();
  const toggle = () => setModal(!modal);
  const [options, setOptions] = useState([])
  const [NcatName, setNCatName] = useState('')
  const [NprodBarcode, NsetprodBarcode] = useState('')
  const [Nexpdate, NsetExpDate] = useState('')
  const [NcatActive, setNCatActive] = useState(1)

  const [newval, setnewval] = useState(null)

  let categ = [];

  let Allcat;
  const addNewCategory = () => {
    console.log("first", newval)
    if (prodName.length == 0) {
      setPopup({
        open: true,
        severity: "error",
        message: "Enter a Product First",
      });
      return
    }
    let payload = {
      "prodName": prodName,
      "prodBarcode": prodBarcode,
      "prodExpiry": expdate,
      "catId": 7,
    }

    console.log("post payload", payload)
    axios.post('https://localhost:7190/api/Products', payload)
      .then(res => {
        if (res.status == 201) {
          setPopup({
            open: true,
            severity: "success",
            message: "Category Added!",
          })
          console.log("resobject", res);
          getData()
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  }

  const getData = () => {
    axios.get('https://localhost:7190/api/categories')
      .then(result => {
        if (result.status === 200) {
          let temp = result.data
          temp.map(item => {
            item.categories === 1 ? item.categories = "Yes" : item.categories = "No"
          })
          result.data.map(item => {
            categ.push({ value: item.catId, label: item.catName })
            setOptions(categ)
            Allcat=result.data
            setCategories(categ)
          })
          console.log("options", result.data)
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
    axios.get('https://localhost:7190/api/Products')
      .then(result => {
        if (result.status === 200) {
          let temp = result.data
          

          setRowData(temp)
          console.log("rows", result.data)
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  }

  const deleteCategories = (index) => {
    console.log("dlele", index);
    axios.delete(`https://localhost:7190/api/Products/${index}`)
      .then(res => {
        if (res.status == 204) {
          setPopup({
            open: true,
            severity: "success",
            message: "Product Deleted!",
          })
          getData()
        }

      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  }

  const updateCategory = () => {
    console.log("update", updateFlag);
    let payload = {
      "prodId": updateFlag,
      "prodName": NcatName,
      "prodBarcode": NprodBarcode,
      "prodExpiry": Nexpdate,
      "catId": 7,
    }

    axios.put(`https://localhost:7190/api/Products/${updateFlag}`, payload)
      .then(res => {
        if (res.status) {

          setPopup({
            open: true,
            severity: "success",
            message: "Category Updated!",
          })
          getData()
        }

      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  }

  const assignVal = (index) => {
    let val = rowData.find((item) => item.catId == index)
    setNCatName(val.prodName);
    NsetprodBarcode(val.prodBarcode)
    setNCatActive(val.categories);
    NsetExpDate(val.prodExpiry)
    setUpdateFlag(index)
    toggle()
  }
  let history = useHistory();

  const getcat=()=>{
    let val=Allcat.find((item)=>item.cadId==rowData.catID?item.catName:item.catId)
    console.log("object",val);
    return val;
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid style={{ marginTop: '40px' }} item xs={12} md={12}>
        <h2 className='pull-top'>Products</h2>
      </Grid>

      <Grid className='pull-left' item xs={12} md={6}>
        <Label for="category">
          Product Name
        </Label>
        <Input
          id="category"
          name="category"
          placeholder=""
          type="text"
          required={true}
          value={prodName}
          onChange={(e) => { setprodName(e.target.value) }}
        />
      </Grid>
      <Grid className='pull-left' item xs={12} md={6}>
        <Label for="category">
          Barcode
        </Label>
        <Input
          id="category"
          name="category"
          placeholder=""
          type="text"
          required={true}
          value={prodBarcode}
          onChange={(e) => { setprodBarcode(e.target.value) }}
        />
      </Grid>
      <Grid className='pull-left' item xs={12} md={6}>
        <Label for="category">
          Expiry Date
        </Label>
        <Input
          id="category"
          name="category"
          placeholder=""
          type='datetime-local'
          required={true}
          value={expdate}
          onChange={(e) => { setExpDate(e.target.value) }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Label for="exampleSelect">
          Category
        </Label>
        <Select //value={options} onChange={(e) => setOptions(e.target.value)} 
          options={options} />
      </Grid>
      <Grid item xs={12}>
        <Button style={{backgroundColor:'black'}} onClick={addNewCategory} className='pull-right' variant="contained">Add</Button>
      </Grid>


      <Grid item xs={12}>
        <Table responsive>
          <thead>
            <tr>
              
              <th>
                Product Name
              </th>
              <th>
                Barcode
              </th>
              <th>
                Expiry Date
              </th>
              <th>
                Caetgory
              </th>
              <th>
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {
              rowData.map((item) => {
                return (
                  <tr key={item.prodId}>
                    
                    <td>
                      {item.prodName}
                    </td>
                    <td >
                      {item.prodBarcode}
                    </td>
                    <td >
                      {item.prodExpiry}
                    </td>
                    <td >
                      {item.catId}
                    </td>
                    <td>
                      <Button style={{ backgroundColor: 'black' }} className='pull-right' onClick={() => { assignVal(item.catId) }} variant="contained">Update</Button> |&nbsp;
                      <Button style={{ backgroundColor: 'black' }} className='pull-right' onClick={() => deleteCategories(item.catId)} variant="contained">Delete</Button>

                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        <Modal style={{ marginTop: '10%', width: '70%' }} isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>
            Update Catgory
          </ModalHeader>
          <ModalBody>
            <Grid className='pull-left' item xs={12} md={6}>
              <Label for="category">
                Product Name
              </Label>
              <Input
                id="category"
                name="category"
                placeholder=""
                type="text"
                required={true}
                value={NcatName}
                onChange={(e) => { setNCatName(e.target.value) }}
              />
            </Grid>
            <Grid className='pull-left' item xs={12} md={6}>
              <Label for="category">
                Barcode
              </Label>
              <Input
                id="category"
                name="category"
                placeholder=""
                type="text"
                required={true}
                value={NprodBarcode}
                onChange={(e) => { NsetprodBarcode(e.target.value) }}
              />
            </Grid>
            <Grid className='pull-left' item xs={12} md={6}>
              <Label for="category">
                Expiry Date
              </Label>
              <Input
                id="category"
                name="category"
                placeholder=""
                type='datetime-local'
                required={true}
                value={Nexpdate}
                onChange={(e) => { NsetExpDate(e.target.value) }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Label for="exampleSelect">
                Category
              </Label>
              <Select options={options} />
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={updateCategory}>
              Update
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

      </Grid>
      
    </Grid>
  )
}
