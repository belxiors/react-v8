import { useEffect, useState } from "react";
import Pet from "./Pet";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [breeds, setBreeds] = useState([]);
  const [animal, setAnimal] = useState("");
  const [pets, setPets] = useState([]);

  useEffect(() => {
    requestPets();
  }, [requestParams]);

  async function requestBreeds(animal) {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );
    const json = await res.json();
    setBreeds(json.breeds || []);
  }

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${requestParams.animal}&breed=${requestParams.breed}&location=${requestParams.location}`
    );
    const json = await res.json();
    setPets(json.pets || []);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          setRequestParams({
            location: formData.get("location") ?? "",
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
          });
        }}
      >
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              requestBreeds(e.target.value);
            }}
          >
            <option></option>
            {ANIMALS.map((animal) => (
              <option value={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed">
            <option></option>
            {breeds.map((breed) => (
              <option value={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
        {pets.map((pet) => (
          <Pet
            key={pet.id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
          />
        ))}
      </form>
    </div>
  );
};

export default SearchParams;
