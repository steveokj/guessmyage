const { useState } = React;

// InputForm component to get the name entered by the user
const InputForm = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    console.log(name);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Enter your name
        </label>

        <div class="flex items-center justify-between">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            class="bg-indigo-400 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

// AgeDetails component to display the content using the response from agify's API
const AgeDetails = ({ data }) => {
  let myAge = data.age;

  // Return a random integer from 1 to 100 if no age data given
  if (!myAge) myAge = Math.floor(Math.random() * 100) + 1;

  // images for age group
  let myImage = "images/child.png";

  if (myAge >= 16 && myAge < 35) {
    myImage = "images/young.png";
  } else if (myAge >= 35 && myAge < 55) {
    myImage = "images/adult.png";
  } else if (myAge >= 55) {
    myImage = "images/elder.png";
  }

  return (
    <div>
      <div class="mt-4 mb-4 text-center">
        <span class="text-xl font-bold mb-4 capitalize">{data.name}</span> is{" "}
        <span class="text-xl font-bold mb-4">{myAge}</span> years old!
      </div>
      <div>
        <img src={myImage} class="rounded" />
      </div>
    </div>
  );
};

// Main app component to display both the InputForm and AgeDetails components
const App = () => {
  const [ageDetails, setAgeDetails] = useState(null);

  // PROMISE => use the name submitted from InputForm to fetch a response from agify's API with axios
  const handleSubmit = (name) => {
    // make the http request here
    axios
      .get("https://api.agify.io/?name=" + name)
      .then((response) => {
        // update the age data with the API response
        setAgeDetails(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
  // ASYNC AWAIT PATTERN =>  => use the name submitted from InputForm to fetch a response from agify's API with axios
  const handleSubmit = async (name) => {
    try {

      // make the http request here
      let response = await axios.get("https://api.agify.io/?name=" + name);

      // update the age data with the API response
      setAgeDetails(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  */

  // render the component
  return (
    <div className="App">
      <InputForm onSubmit={handleSubmit} />
      {ageDetails && <AgeDetails data={ageDetails} />}
    </div>
  );
};

// Attach the App component content to the div with the id called root in index.html
ReactDOM.render(<App />, document.querySelector("#root"));
