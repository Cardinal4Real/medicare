import React, { useContext, useEffect, useState } from 'react'
import { MediCareContext } from '../contexts/MediCareContext';
import Display from '../components/Display';

export default function Search() {
  const [toFind, setToFind] = useState("");
  const { stock, setsearchMatch } = useContext(MediCareContext);


  const searchItem = (event) => {
    let { name, value } = event.target;
    setToFind(value);

  }
  useEffect((() => {
    const filteredMedicines = stock?.filter((item) => {
      let medicine = item.name.toLowerCase();
      let find = toFind.toLowerCase();
      return medicine.includes(find);
    });
    setsearchMatch(filteredMedicines);
  }), [toFind]);
  const sortItems = () => {
    const sortedStock=stock.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setsearchMatch(sortedStock);
  }
  return (
    <div className="searchMain">


      <div class="form-group has-search">
        <span class="fa fa-search form-control-feedback"></span>
        <div class="input-group">
          <input name='searchfield' onChange={searchItem} type="text" class="form-control" placeholder="Search medicine" />
          <span class="input-group-addon" onClick={sortItems}>
            <i class="fa-sharp fa-solid fa-arrow-down-short-wide fa-2x"></i>
          </span>
        </div>
      </div>

    </div>
  )
}
