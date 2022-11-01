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
  TAROT_STATUS,
} from "../lib/constants";
import { parseUrl } from "../lib/lib";

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
  const [status, setStatus] = useState(null);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    const { market, item, country } = parseUrl(e.target.value);
    setMarketPlace(market);
    setItemId(item);
    setCountryName(country);
  };

  const handleItemIdChange = (e) => {
    setItemId(e.target.value);
    // validateItemId(e.target.value);
  };

  const handleMarketPlaceChange = (e) => {
    setMarketPlace(e.target.value);
  };

  async function validateItemId(itemId) {
    // const itemId = e.target.value;
    console.info(`Validating item ID (${itemId})`);
    if (!itemId) {
      setErr(null);
      return;
    }
    
    setIsLoading(true);
    await axios
      .get("/api/checkItemId", {
        params: {
          itemId: itemId,
        },
      })
      .then(function (response) {
        // handle success
        const reportStatus = response.data.status.select.name;
        setIsLoading(false);
        // setStatus(reportStatus);
        // console.log('reportStatus, status ===>', reportStatus, status)
        if (
          reportStatus === TAROT_STATUS.ARCHIEVED ||
          reportStatus === TAROT_STATUS.CLOSED
        ) {
          setErr(null);
          return
        } else {
          setErr(
            `Item ID "${itemId}" is already in the database, since ${response.data.created_time}`
          );
          return
        }
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          // Item ID not found, this is good
          setErr(null);
        } else {
          // some other error
          setErr("Unknown error");
        }
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (err !== null) {
      axios
        .post("/api/form", {
          params: {
            itemId: itemId,
          },
        })
        .then((res) => {
          console.log("res===>", res);
        });
    }
  };

  useEffect(() => {
    validateItemId(itemId);
  }, [itemId]);
  
  return (
    <div className="p-2 h-screen">
      <h1 className="p-4 mb-4 text-3xl font-bold">
        Report a copyright infringement
      </h1>

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
        <SubmitButton loading={isLoading} error={err}/>
      </SimpleForm>
    </div>
  );
}
