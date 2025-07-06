import React, { useState, useEffect } from "react";

export default function pagination() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
         .then((data) => setTodos(data))
        .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  const total = Math.ceil(todos.length / perPage);
  const change = (pageNum) => {
    setPage(pageNum);
  };
  const next = () => {
    if (page < total) {
      setPage((prev) => prev + 1);
    }
  };
  const previ = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const st = (page - 1) * perPage;
   const curr = todos.slice(st, st + perPage);
  return (
    <div style={{ padding: "21px", fontFamily: "Arial" }}>
      <h2>Todos</h2>
      <ul>
        {curr.map((t) => (
          <li key={t.id}>
            {t.title}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 21 }}>
        <button onClick={previ} disabled={page === 1}>
          Previous
        </button>

        {Array.from({ length: total }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => change(pageNum)}
            style={{
              margin: "0 5px",
                border: "1px solid #ccc",
               padding: "5px 10px",
               backgroundColor: page === pageNum ? "green" : "white",
              cursor: "pointer",
            }}
          >
            {pageNum}
          </button>
        ))}

        <button onClick={next} disabled={page === total}>
          Next
        </button>
      </div>
    </div>
  );
}
