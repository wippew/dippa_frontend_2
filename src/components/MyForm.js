import { useState } from 'react';
 
 const MyForm = () => {
    const [name, setName] = useState("");
    return (
     <form className="sidebar">
      <fieldset>
         <label>
           <p>VehicleCount</p>
           <input name="name" value={name} onChange={(e) => setName(e.target.value)}/>
         </label>
       </fieldset>
       <button type="submit">Submit</button>
      </form>
    )
  }


  export default MyForm;