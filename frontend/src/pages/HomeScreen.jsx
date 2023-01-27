import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import Card from "../components/Card";

export default function HomeScreen() {
  const [reptilesData, setReptilesData] = useState([]);
  const navigate = useNavigate();
  const query = useLocation();
  const { search } = query;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/reptiles${search}`).then((res) => {
      setReptilesData(res.data);
    });
  }, [query]);

  const onOptionChange = (e) => {
    let searchParams = queryString.parse(search);

    if (e.target.name === "animal") {
      searchParams.animal = e.target.value;
    }

    if (e.target.name === "sort") {
      searchParams.sort = e.target.value;
    }

    navigate({
      pathname: "/",
      search: queryString.stringify(searchParams),
    });
  };

  const renderReptiles = reptilesData?.map((item) => {
    const { id, specie, image, price, latin_name, life_span } = item;
    return (
      <Card
        id={id}
        specie={specie}
        image={image}
        price={price}
        latin_name={latin_name}
        life_span={life_span}
      />
    );
  });

  return (
    <div className="container">
      <h1 className="my-5">Reptile store</h1>
      <form className="mb-4">
        <div className="d-flex justify-content-between align-items-between">
          <div>
            <span className="form-group me-4">
              <label className="form-label me-2" htmlFor="all">
                All
              </label>
              <input
                type="radio"
                value="all"
                name="animal"
                id="all"
                onChange={onOptionChange}
              />
            </span>
            <span className="form-group me-4">
              <label className="form-label me-2" htmlFor="lizard">
                Lizards
              </label>
              <input
                type="radio"
                value="lizard"
                name="animal"
                id="lizard"
                onChange={onOptionChange}
              />
            </span>
            <span className="form-group me-4">
              <label className="form-label me-2" htmlFor="snake">
                Snakes
              </label>
              <input
                type="radio"
                value="snake"
                name="animal"
                id="snake"
                onChange={onOptionChange}
              />
            </span>
          </div>
          <div>
            <select
              className="form-select"
              name="sort"
              onChange={onOptionChange}
            >
              <option value={"name_asc"}>Name ↑</option>
              <option value={"name_desc"}>Name ↓</option>
              <option value={"price_asc"}>Price ↑</option>
              <option value={"price_desc"}>Price ↓</option>
            </select>
          </div>
        </div>
      </form>
      <div className="row">{renderReptiles}</div>
    </div>
  );
}
