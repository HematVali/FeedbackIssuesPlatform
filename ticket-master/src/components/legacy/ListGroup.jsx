import React from "react";

const ListGroup = (props) => {
  const { categories, onCategoryChange, selectedCategory } = props;
  console.log("In Listgroup ", props);

  return (
    <div className="mt-2">
      <ul className="list-group">
        {categories.map((category) => (
          <li
            key={category._id}
            onClick={() => onCategoryChange(category)}
            className={
              category === selectedCategory
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroup;
