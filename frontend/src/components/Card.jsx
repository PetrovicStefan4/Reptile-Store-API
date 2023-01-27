import React from "react";

export default function Card(props) {
  const { id, specie, image, price, latin_name, life_span } = props;

  return (
    <div className="col-3 mb-4" key={id}>
      <div className="border">
        <div>
          <img className="w-100" src={`/assets/images/${image}`} />
        </div>
        <div className="p-3">
          <h3>{specie}</h3>
          <div>Latin: {latin_name}</div>
          <div>Lifespan: {life_span}</div>
          <div>Price: {price} $</div>
        </div>
      </div>
    </div>
  );
}
