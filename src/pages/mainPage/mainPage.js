import { useState, useEffect, useRef } from "react";
import InputSection from "../../components/inputSection";
import ListFilter from "../../components/listFilter";
import "./styles.css";

function MainPage() {
  const [ttt, setTtt] = useState(0);
  const btn1 = useRef(null);
  const btn2 = useRef(null);
  const btn3 = useRef(null);
  const [getLocalItems, setLocalItems] = useState(
    JSON.parse(localStorage.getItem("items"))
  );

  const onChangeInput = async (e) => {
    console.log(e);
    var items = [];
    if (e) {
      getLocalItems &&
        getLocalItems.map((item) => {
          items.push(item);
        });
      items.push({ value: e, isChecked: false, id: "0" });
      localStorage.setItem("items", JSON.stringify(items));
      setLocalItems(JSON.parse(localStorage.getItem("items")));
      setTtt(ttt + 1);
    }
  };
  const itemChecked = (e, idInf) => {
    if (e.target.checked === false) {
      getLocalItems.filter((item) => item.id === idInf)[0].isChecked = false;
      localStorage.setItem("items", JSON.stringify(getLocalItems));
    } else if (e.target.checked === true) {
      getLocalItems.filter((item) => item.id === idInf)[0].isChecked = true;
      localStorage.setItem("items", JSON.stringify(getLocalItems));
    }
    setLocalItems(JSON.parse(localStorage.getItem("items")));
  };
  const deleteItem = (idInfo) => {
    let a;
    a = getLocalItems.filter((item) => item.id !== idInfo);
    localStorage.setItem("items", JSON.stringify(a));
    setLocalItems(JSON.parse(localStorage.getItem("items")));
    setTtt(ttt + 1);
  };
  const [at, setAt] = useState(0);
  const [whichList, setWhichList] = useState("all");
  const selectedBtn = (e) => {
    if (e.target.value === "1") {
      btn1.current.className = "selected";
      btn2.current.className = "";
      btn3.current.className = "";
      setWhichList("all");
    } else if (e.target.value === "2") {
      btn2.current.className = "selected";
      btn1.current.className = "";
      btn3.current.className = "";
      setWhichList("active");
    } else if (e.target.value === "3") {
      btn3.current.className = "selected";
      btn2.current.className = "";
      btn1.current.className = "";
      setWhichList("completed");
    }
    listFilter();
    setAt(at + 1);
  };
  let filterList = [];
  const [getFilterList, setFilterList] = useState([]);
  const listFilter = () => {
    filterList = [];
    if (whichList === "all") {
      getLocalItems &&
        getLocalItems.map((item) => {
          filterList.push(item);
        });
    } else if (whichList === "active") {
      getLocalItems &&
        getLocalItems
          .filter((item) => item.isChecked === false)
          .map((item) => {
            filterList.push(item);
          });
    } else if (whichList === "completed") {
      getLocalItems &&
        getLocalItems
          .filter((item) => item.isChecked === true)
          .map((item) => {
            filterList.push(item);
          });
    }
    setFilterList(filterList);
  };
  const clearCompletedItems = async () => {
    let a = JSON.parse(localStorage.getItem("items")).filter(
      (item) => item.isChecked === false
    );
    localStorage.setItem("items", JSON.stringify(a));
    setLocalItems(JSON.parse(localStorage.getItem("items")));
    console.log(whichList);
  };
  let allCheckedArray = [];
  const checkAll = () => {
    if (getLocalItems.every((item) => item.isChecked === true)) {
      getLocalItems.map((item) => {
        item.isChecked = false;
        allCheckedArray.push(item);
      });
      localStorage.setItem("items", JSON.stringify(allCheckedArray));
      setLocalItems(JSON.parse(localStorage.getItem("items")));
    } else if (getLocalItems.every((item) => item.isChecked === false)) {
      getLocalItems.map((item) => {
        item.isChecked = true;
        allCheckedArray.push(item);
      });
      localStorage.setItem("items", JSON.stringify(allCheckedArray));
      setLocalItems(JSON.parse(localStorage.getItem("items")));
    } else {
      getLocalItems.map((item) => {
        if (item.isChecked === false) {
          item.isChecked = true;
          allCheckedArray.push(item);
        } else allCheckedArray.push(item);
      });
      localStorage.setItem("items", JSON.stringify(allCheckedArray));
      setLocalItems(JSON.parse(localStorage.getItem("items")));
      setTtt(ttt + 1);
    }
  };
  useEffect(() => {
    listFilter();
  }, [getLocalItems, whichList, ttt]);

  const idGenerator = () => {
    let newArray = [];
    getLocalItems.map((item) => {
      newArray.push(item);
    });
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].id = i;
    }
    localStorage.setItem("items", JSON.stringify(newArray));
    setLocalItems(JSON.parse(localStorage.getItem("items")));
  };
  useEffect(() => {
    getLocalItems && idGenerator();
  }, [ttt]);

  return (
    <div>
      <InputSection onChangeInput={onChangeInput} checkAll={checkAll} />
      <ListFilter
        getLocalItems={getLocalItems}
        itemChecked={itemChecked}
        deleteItem={deleteItem}
        selectedBtn={selectedBtn}
        btn1={btn1}
        btn2={btn2}
        btn3={btn3}
        clearCompletedItems={clearCompletedItems}
        getFilterList={getFilterList}
        idGenerator={idGenerator}
      />
    </div>
  );
}

export default MainPage;
