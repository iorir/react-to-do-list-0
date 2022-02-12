function ListFilter({
  getLocalItems,
  itemChecked,
  deleteItem,
  selectedBtn,
  btn1,
  btn2,
  btn3,
  clearCompletedItems,
  getFilterList,
  idGenerator,
}) {
  return (
    <div>
      <section className="main">
        <ul className="todo-list">
          {getFilterList &&
            getFilterList.map((e, index) => (
              <li
                className={e.isChecked === true ? "completed" : "false"}
                key={index}
              >
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    onChange={(t) => itemChecked(t, e.id)}
                    checked={e.isChecked ? true : false}
                  />
                  <label>{e.value}</label>
                  <button
                    type="button"
                    onClick={() => deleteItem(e.id)}
                    className="destroy"
                  ></button>
                </div>
              </li>
            ))}
        </ul>
        <button onClick={() => idGenerator()}>dene</button>
        <footer className="footer">
          <span className="todo-count">
            <strong>
              {getLocalItems &&
                getLocalItems.filter((item) => !item.isChecked).length}{" "}
            </strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <button
                ref={btn1}
                className="selected"
                onClick={(e) => selectedBtn(e)}
                value="1"
              >
                All
              </button>
            </li>
            <li>
              <button
                ref={btn2}
                value="2"
                className=""
                onClick={(e) => selectedBtn(e)}
              >
                Active
              </button>
            </li>
            <li>
              <button ref={btn3} value="3" onClick={(e) => selectedBtn(e)}>
                Completed
              </button>
            </li>
          </ul>
          <button className="clear-completed" onClick={clearCompletedItems}>
            Clear completed
          </button>
        </footer>{" "}
      </section>
    </div>
  );
}

export default ListFilter;
