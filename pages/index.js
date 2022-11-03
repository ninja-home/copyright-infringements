import React, { useEffect, useState } from "react";
import axios from "axios";

import SimpleForm from "../components/simpleForm";
import InputField from "../components/inputField";
import SelectField from "../components/selectField";
import SubmitButton from "../components/submitButton";
import CheckboxGroupField from "../components/checkboxGroupField";
import {
  marketplaceOptions,
  countryOptions,
  violationsOptions,
  TAROT_STATUS,
} from "../lib/constants";
import { parseUrl, useDebounce } from "../lib/lib";

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
  const [urlErr, setUrlErr] = useState("");
  const [itemId, setItemId] = useState("");
  const debouncedValue = useDebounce(itemId, 1500);
  const [marketPlace, setMarketPlace] = useState("");
  const [countryName, setCountryName] = useState("");
  const [violations, setViolations] = useState([]);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [reset, setReset] = useState(false);

  const handleUrlChange = (e) => {
    setUrl(e.target.value.trim());
    const { market, item, country } = parseUrl(e.target.value);
    setMarketPlace(market);
    if (item.error) {
      setItemId("");
      if (url !== "") {
        setUrlErr("Invalid URL");
      }
    } else {
      setUrlErr("");
      setItemId(item.data);
    }
    setCountryName(country);
  };

  const handleItemIdChange = (e) => {
    setItemId(e.target.value.trim());
  };

  const handleMarketPlaceChange = (e) => {
    setMarketPlace(e.target.value);
  };

  const validateItemId = async (itemId) => {
    if (!itemId) {
      setErr(null);
      return;
    }
    console.info(`Validating item ID (${itemId})`);
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
        console.log("item status===> ", reportStatus);
        setIsLoading(false);
        if (
          reportStatus === TAROT_STATUS.ARCHIEVED ||
          reportStatus === TAROT_STATUS.CLOSED ||
          reportStatus === TAROT_STATUS.BRAND_NEW
        ) {
          setErr(null);
          return;
        } else {
          setErr(
            `Item ID "${itemId}" is already in the database, since ${response.data.created_time}`
          );
          return;
        }
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          // Item ID not found, this is good
          setErr(null);
          setIsLoading(false);
        } else {
          // some other error
          setErr("Unknown error");
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (urlErr) {
      alert("invalid Url");
      return;
    }

    if (!itemId) {
      setErr("itemID is required");
      return;
    }

    if (err === null) {
      setSubmitLoading(true);
      axios
        .post("/api/form", {
          params: {
            itemId: itemId,
            url: url,
            marketPlace: marketPlace,
            countryName: countryName,
            violations: violations,
          },
        })
        .then((res) => {
          setSubmitLoading(false);
          if (res.data.submit_status) {
            alert("successfully submitted");
            setReset(true);
          } else {
            alert("something wrong");
          }
        })
        .catch(function (error) {
          setSubmitLoading(false);
          alert(error.response.data.message);
        });
    }
  };

  const handleContinue = () => {
    setReset(false);
    setUrl("");
    setUrlErr("");
    setItemId("");
    setMarketPlace("");
    setCountryName("");
    setViolations([]);
    setErr(null);
    setIsLoading(false);
    setSubmitLoading(false);
  };

  useEffect(() => {
    validateItemId(itemId);
  }, [debouncedValue]);

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
          errorMessage={urlErr}
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
          setViolations={setViolations}
          violations={violations}
        />
        <SubmitButton loading={isLoading || submitLoading} error={err} />
        <button
          className={`shadow bg-indigo-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-4 rounded ${
            reset ? "show" : "hidden"
          }`}
          onClick={handleContinue}
          type="button"
        >
          Reset
        </button>
      </SimpleForm>
    </div>
  );
}
