import { useState } from "react";
function InputSection({ onChangeInput, checkAll }) {
  const [val, setVal] = useState("");
  const senderFunction = async (e) => {
    e.preventDefault();
    val && onChangeInput(val);
    setVal("");
  };

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form
            onSubmit={(e) => {
              senderFunction(e);
            }}
          >
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={val}
              autoFocus
              onChange={(e) => setVal(e.target.value)}
            />
          </form>
        </header>
        <section className="main" onClick={() => checkAll()}>
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </section>
      </section>
    </div>
  );
}

export default InputSection;
