import React, { useMemo, useState, useRef, useCallback, useEffect, useContext } from 'react'
import { cardActionAreaClasses, Grid } from '@mui/material'

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Input, Label, Form, Card, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Button from '@mui/material/Button';
import axios, { Axios } from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { SetPopupContext } from '../App';
import { useHistory } from 'react-router-dom';



export default function Stocks() {
    const setPopup = useContext(SetPopupContext);
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
    const [catName, setCatName] = useState('')
    const [catActive, setCatActive] = useState(1)
    const [modal, setModal] = useState(false);
    const [updateFlag, setUpdateFlag] = useState();
    const toggle = () => setModal(!modal);

    const [NcatName, setNCatName] = useState('')
    const [NcatActive, setNCatActive] = useState(1)

    const addNewCategory = () => {
        if (catName.length == 0) {
            setPopup({
                open: true,
                severity: "error",
                message: "Enter a Category First",
            });
            return
        }
        let payload = {
            "catName": catName,
            "catActive": catActive,
        }

        console.log("post payload", payload)
        axios.post('https://localhost:7190/api/Categories', payload)
            .then(res => {
                if (res.status == 201) {
                    setPopup({
                        open: true,
                        severity: "success",
                        message: "Category Added!",
                    })
                    console.log("resobject", res);
                    getCategories()
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

    const getCategories = () => {
        axios.get('https://localhost:7190/api/Stocks')
            .then(result => {
                if (result.status === 200) {
                    let temp = result.data
                    temp.map(item => {
                        item.catActive === 1 ? item.catActive = "Yes" : item.catActive = "No"
                    })
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
        axios.delete(`https://localhost:7190/api/Categories/${index}`)
            .then(res => {
                if (res.status == 204) {
                    setPopup({
                        open: true,
                        severity: "success",
                        message: "Category Deleted!",
                    })
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
            "catId": updateFlag,
            "catName": NcatName,
            "catActive": NcatActive == "yes" ? 1 : 0,
        }
        axios.put(`https://localhost:7190/api/Categories/${updateFlag}`, payload)
            .then(res => {
                if (res.status) {

                    setPopup({
                        open: true,
                        severity: "success",
                        message: "Category Updated!",
                    })
                    getCategories()
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
        setNCatName(val.catName);
        setNCatActive(val.catActive);
        setUpdateFlag(index)
        toggle()
    }
    let history = useHistory();


    useEffect(() => {
        getCategories()
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid style={{ marginTop: '40px' }} item xs={12} md={12}>
                <h2 className='pull-top'>Stock</h2>
            </Grid>

            {/* <Grid className='pull-left' item xs={12} md={6}>
                <Label for="category">
                    Category Name
                </Label>
                <Input
                    id="category"
                    name="category"
                    placeholder=""
                    type="text"
                    required={true}
                    value={catName}
                    onChange={(e) => { setCatName(e.target.value) }}
                />
            </Grid> */}
            {/* <Grid item xs={12} md={6}>
                <Label for="exampleSelect">
                    Active
                </Label>
                <Input
                    required
                    id="exampleSelect"
                    name="select"
                    type="select"
                    value={catActive}
                    onChange={(e) => { setCatActive(e.target.value) }}
                >
                    <option value={1}>
                        Yes
                    </option>
                    <option value={0}>
                        No
                    </option>
                </Input>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={addNewCategory} className='pull-right' variant="contained">Add</Button>
            </Grid> */}


            <Grid item xs={12}>
                <Table responsive>
                    <thead>
                        <tr>
                            
                            <th>
                                Product ID
                            </th>
                            <th>
                             Product
                            </th>
                            <th>
                            Barcode
                            </th>
                            <th>
                            Expiry Date
                            </th>
                            <th>
                            Buying Date
                            </th>
                            <th>
                            Unit Price
                            </th>
                            <th>
                            Category
                            </th>
                            <th>
                            Available Stock
                            </th>
                            <th>
                           Total Amount
                            </th>
                            {/* <th>
                           Operations
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rowData.map((item) => {
                                return (
                                    <tr key={item.catId}>
                                        <th scope="row">
                                            {item.productID}
                                        </th>
                                        <td>
                                            {item.product}
                                        </td>
                                        <td >
                                            {item.barcode}
                                        </td>
                                        <td >
                                            {item.expiryDate}
                                        </td>
                                        <td >
                                            {item.buyingDate}
                                        </td>
                                        <td >
                                            {item.perUnitPrice}  &nbsp; Rs.
                                        </td>
                                        <td >
                                            {item.category}
                                        </td>
                                        <td >
                                            {item.availableStock}
                                        </td>
                                        <td >
                                            {item.totalAmount} &nbsp; Rs.
                                        </td>

                                        {/* <td>
                                            <Button className='pull-right' //onClick={() => { assignVal(item.catId) }} 
                                            variant="outlined">Update</Button> |&nbsp;
                                            <Button className='pull-right' //onClick={() => deleteCategories(item.catId)} 
                                            variant="outlined">Delete</Button>

                                        </td> */}
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
                        <Grid item xs={12} md={12}>
                            <Label for="category">
                                Category Name
                            </Label>
                            <Input
                                style={{ width: '100%' }}
                                id="category"
                                name="category"
                                placeholder=""
                                type="text"
                                required={true}
                                value={NcatName}
                                onChange={(e) => { setNCatName(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Label for="exampleSelect">
                                Active
                            </Label>
                            <Input
                                required
                                id="exampleSelect"
                                name="select"
                                type="select"
                                value={NcatActive}
                                onChange={(e) => { setNCatActive(e.target.value) }}
                            >
                                <option value={1}>
                                    Yes
                                </option>
                                <option value={0}>
                                    No
                                </option>
                            </Input>
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
