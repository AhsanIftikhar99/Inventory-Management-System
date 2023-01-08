import { useState,createContext } from 'react'
import './App.css'
import MiniDrawer from './components/sidebar'
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Category from './pages/category';
import Products from './pages/products';
import MessagePopup from './components/MessagePopup';
import Stocks from './pages/stock';
import Supplier from './pages/supplier';
import PurchaseInvoiceDetails from './pages/purchaseInvoiceDetails';
export const SetPopupContext = createContext();

function App() {
  const [count, setCount] = useState(0)
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  return (
    <div className="App">
      <SetPopupContext.Provider value={setPopup}>
      <MiniDrawer />
      <Router>
      <Switch>
        <Route exact path="/">
            <Category />
          </Route>
          <Route exact path="/Products">
            <Products />
          </Route>
          <Route exact path="/Stocks">
            <Stocks />
          </Route>
          
          <Route exact path="/Supplier">
            <Supplier />
          </Route>
          <Route exact path="/PID">
            <PurchaseInvoiceDetails />
          </Route>
        </Switch>
      </Router>
      <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </div>
    
  )
}

export default App
