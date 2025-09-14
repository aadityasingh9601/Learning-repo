import { useState } from "react";

function Form() {
  let [formData, setFormData] = useState({ firstname: "", lastname: "" });

  let handleInputsAll = (event) => {
    // let fieldname = event.target.name;
    // let newvalue = event.target.value;
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted");
    setFormData({ firstname: "", lastname: "" });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Firstname</label>
        &nbsp;
        <input
          placeholder="firstname"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputsAll}
        />
        <br></br>
        <label htmlFor="lastname">Lastname</label>
        &nbsp;
        <input
          placeholder="lastname"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputsAll}
        />
        <br></br>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Form;
