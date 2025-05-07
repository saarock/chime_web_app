// Import all the necessary dependencies here 

import { Variant } from "../../types";
import Input from "../input/Input"



/**
 * This component is the search component
 * @returns JSX Element or React Node [Search input]
 */
const SearchComponent = () => {

    const handleSearchChange = (e:any) => {

    }


  return (
    <>
    <Input 
    placeHolder="Search by userName..."
    variant={Variant.secondary}
    type="search"
    disabled={false}
    onChange={handleSearchChange}
/>
    </>
  )
}

export default SearchComponent