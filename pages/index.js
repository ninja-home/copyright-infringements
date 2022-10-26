import SimpleForm from '../components/simpleForm'
import InputField from '../components/inputField'
import SelectField from '../components/selectField'
import SubmitButton from '../components/submitButton'
import CheckboxGroupField from '../components/checkboxGroupField'
import axios from "axios";
import { marketplaceOptions, countryOptions, violationsOptions } from '../lib/constants'
import { parseUrl } from '../lib/lib'

/*
TODO:
  - submit form to n8n
  - validate item id
  - parse ebay links
  - parse walmart links
  - parse etsy links
  - parse mercari links
*/
var errorItemId = '';

export default function Home() {

  return (
    <div className="p-2">
      <h1 className="p-4 mb-4 text-3xl font-bold">Report a copyright infringement</h1>
      <SimpleForm action="/api/form" method="post">
        <InputField name="url" label="URL:" onChange={parseUrl} />
        <SelectField name="marketplace" label="Marketplace:" options={marketplaceOptions} />
        <SelectField name="country" label="Country:" options={countryOptions} />
        <InputField name="itemId" label="Item ID:" onChange={validateItemId} errorMessage={errorItemId} />
        <CheckboxGroupField name="violations" label="Violations:" options={violationsOptions} />
        <SubmitButton />
      </SimpleForm>
    </div>
  )

  async function validateItemId(e) {
    const itemId = e.target.value;
    console.log(`Validating item ID (${itemId})`);

    // reset error
    errorItemId = 'zzz';

    await axios.get('/api/checkItemId', {
      params: {
        itemId: itemId,
      }
    })
      .then(function (response) {
        // handle success
        console.log(response);
        errorItemId = `Item ID "${itemId}" is already in the database, since ${response.data.created_time}`;
        console.log(errorItemId)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        if (error.status == 404) {
          // Item ID not found, this is good
        } else {
          // some other error
          errorItemId = 'Unknown error';
        }
      })
  }

}
