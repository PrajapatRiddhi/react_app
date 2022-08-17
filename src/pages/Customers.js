import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import { AppProvider, Card, OptionList, Page, Grid} from "@shopify/polaris";
import "../../src/polarisCustom.css"

export default function Customers() {

  const [customers,getCustomers] = useState([])

  const [selected, setSelected] = useState([]);

  const [stores, getStores] = useState([]);

  useEffect(()=>{
    fetchStores()
  },[])

  const fetchCustomers=(store)=>{
    axios.post("http://localhost:8081/shopifyBackend/readCustomers", {"shop":store})
    .then(res=>{
      getCustomers(res.data.data.body.customers)
    })
  }

  const fetchStores=()=>{
    axios.get("http://localhost:8081/shopifyBackend/readShops")
    .then(res=>{
      getStores(res.data.data.map(e=>{
        return {"value":e.ShopName.split(".myshopify.com")[0],"label":e.ShopName.split(".myshopify.com")[0]}
      }))
    })
  }

  const handleChange = useCallback((value) => {
    setSelected(value) 
    fetchCustomers(value[0]+".myshopify.com")
  }, []);

  const columns = [
    {
      formatter: "rowSelection",
      titleFormatter: "rowSelection",
      align: "center",
      headerSort: false,
      cellClick: function(e, cell) {
        cell.getRow().toggleSelect();
      },
      width: 20
    },
    { title: "Name", field: "name"},
    { title: "Email", field: "email"},
    { title: "County", field: "country_name"},
    { title: "City", field: "city"},
    { title: "Orders Count", field: "orders_count"},
    { title: "Total Spent", field: "total_spent"}
  ];

  let data = customers.map(e=>{
    return {"name":e.first_name+" "+e.last_name,"email":e.email,
            "country_name":e.default_address.country_name,
            "city":e.default_address.city,"orders_count":e.orders_count,
            "total_spent":e.total_spent}
  })

  let options = {
    layout: "fitColumns",
  };

  return (
    <>
    <AppProvider>
    <Page fullWidth>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
        <Card sectioned>
          {/* <ChoiceList
            title="Stores Installed"
            choices={stores}
            selected={selected}
            onChange={handleChange}
          /> */}
          <OptionList
            title="Stores Installed"
            onChange={handleChange}
            options={stores}
            selected={selected}
          />
        </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 9, xl: 9 }}>
          <Card title={selected} sectioned>
            <ReactTabulator
              data={data}
              columns={columns}
              tooltips={true}
              options={options}
            />
          </Card>
        </Grid.Cell>
      </Grid>
    </Page>
    </AppProvider>
    </>
  );
}
