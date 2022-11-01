import React, { useEffect, useState } from "react";
import SimpleForm from "../components/simpleForm";
import InputField from "../components/inputField";
import SelectField from "../components/selectField";
import SubmitButton from "../components/submitButton";
import CheckboxGroupField from "../components/checkboxGroupField";
import axios from "axios";
import {
  marketplaceOptions,
  countryOptions,
  violationsOptions,
} from "../lib/constants";
import { parseUrl } from "../lib/lib";
import {NEW, CLOSED} from '../lib/status'

/*
TODO:
  - submit form to n8n
  - validate item id
  - parse ebay links
  - parse walmart links
  - parse etsy links
  - parse mercari links
*/

export default function Home() {
  const [url, setUrl] = useState("");
  const [itemId, setItemId] = useState("");
  const [marketPlace, setMarketPlace] = useState("");
  const [countryName, setCountryName] = useState("");
  const [err, setErr] = useState(null)
  
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    const {market, item, country } = parseUrl(e.target.value);
    setMarketPlace(market);
    setItemId(item);
    setCountryName(country);
  };

  const handleItemIdChange = (e) => {
    setItemId(e.target.value);
    validateItemId(e.target.value);
  };
  
  const handleMarketPlaceChange = (e) => {
    setMarketPlace(e.target.value);
  };
  
  async function validateItemId(itemId) {
    // const itemId = e.target.value;
    console.info(`Validating item ID (${itemId})`);
    if (!itemId) {
      setErr(null)
      return
    }
    // reset error
    // errorItemId = "zzz";

    await axios
      .get("/api/checkItemId", {
        params: {
          itemId: itemId,
        },
      })
      .then(function (response) {
        // handle success
        const status = response.data.status.select.name;
        if (status === CLOSED) {
          setErr(null)
        } else {
          setErr(`Item ID "${itemId}" is already in the database, since ${response.data.created_time}`)
        }

      })
      .catch(function (error) {
        // handle error
        console.warn('error===>', error);
        if (error.status == 404) {
          // Item ID not found, this is good
        } else {
          // some other error
          setErr("Unknown error")
        }
      });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('/api/form', {
      params: {
        itemId: itemId,
      }
    }).then(res=> {
      console.log('res===>', res)
    })
  }

  return (
    <div className="p-2">
      <h1 className="p-4 mb-4 text-3xl font-bold">
        Report a copyright infringement
      </h1>
      {/* <SimpleForm action="/api/form" method="post"> */}
      <SimpleForm onSubmit={handleSubmit}>
        <InputField
          name="url"
          label="URL:"
          value={url}
          onChange={handleUrlChange}
        />
        <SelectField
          name="marketplace"
          label="Marketplace:"
          options={marketplaceOptions}
          value={marketPlace}
          onChange={handleMarketPlaceChange}
        />
        <SelectField
          name="country"
          label="Country:"
          options={countryOptions}
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        />
        <InputField
          name="itemId"
          label="Item ID:"
          value={itemId}
          onChange={handleItemIdChange}
          errorMessage={err}
        />
        <CheckboxGroupField
          name="violations"
          label="Violations:"
          options={violationsOptions}
        />
        <SubmitButton />
      </SimpleForm>
    </div>
  );
}