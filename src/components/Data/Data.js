// import React from "react";
// import "./data.css";
// import { dataBookSelector } from "../../store/selectors";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteData } from "../../store/interactions";

// const Data = () => {
//   const orderData = useSelector(dataBookSelector);
//   const account = useSelector((state) => state.provider.account);
//   const provider = useSelector((state) => state.provider.connection);
//   const medical = useSelector((state) => state.medical.contract);
//   const dispatch = useDispatch();
//   const deleteHandler = (e, data) => {
//     if (window.confirm("Do you want to delete the record?")) {
//       deleteData(medical, data.recordId, dispatch, provider);
//     } else {
//       console.log("Data not delete");
//     }
//   };
//   return (
//     <div>
//       {account ? (
//         <div>
//           <table>
//             <thead>
//               <tr>
//                 <th>Record ID</th>
//                 <th>Data and Time</th>
//                 <th>Name</th>
//                 <th>Age</th>
//                 <th>Gender</th>
//                 <th>Blood Type</th>
//                 <th>Allergies</th>
//                 <th>Diagnosis</th>
//                 <th>Treatment</th>

//                 <th>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderData &&
//                 orderData.map((data, index) => {
//                   return (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       {/* <td>{data.recordIdNew}</td> */}
//                       <td>{data.formattedTimestamp}</td>
//                       <td>{data.name}</td>
//                       <td>{data.ageNew} </td>
//                       <td>{data.gender}</td>
//                       <td>{data.bloodType}</td>
//                       <td>{data.allergies}</td>
//                       <td>{data.diagnosis}</td>
//                       <td>{data.treatment}</td>

//                       <td>
//                         <button
//                           className="delete-button"
//                           onClick={(e) => deleteHandler(e, data)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <h1>Connect the account</h1>
//       )}
//     </div>
//   );
// };

// export default Data;


import React ,{ useState } from "react";
import "./data.css";
import { dataBookSelector } from "../../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../store/interactions";
import { FaSearch } from 'react-icons/fa'

const Data = () => {
  const orderData = useSelector(dataBookSelector);
  const account = useSelector((state) => state.provider.account);
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const dispatch = useDispatch();
  const deleteHandler = (e, data) => {
    if (window.confirm("Do you want to delete the record?")) {
      deleteData(medical, data.recordId, dispatch, provider);
    } else {
      console.log("Data not delete");
    }
  };

  window.onload = function () {
    const searchInput = document.querySelector("[data-search]");
    const sName = document.querySelectorAll("[data-name]");
    const sCard = document.querySelectorAll("[data-sCard]");
    const sContainer = document.querySelector("[data-sContainer]");

    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      for (let i = 0; i < orderData.length; i++) {
        let isVisible = sName[i].innerHTML.toLowerCase().includes(value);
        if (!isVisible) {
          sCard[i].style.display = "none";
        } else {
          sCard[i].style.display = "";
          // sContainer.style = "gap: 0;"
        }
      }
    });
  };

  const [name, setName] = useState("");
  const stuName = document.querySelectorAll("[data-name]");
  const stuCard = document.querySelectorAll("[data-sCard]");

  function handleSubmit(e) {
    e.preventDefault();
    for (let i = 0; i < orderData.length; i++) {
      let isVisible = stuName[i].innerHTML.toLowerCase().includes(name);
      if (!isVisible) {
        stuCard[i].style.display = "none";
      } else {
        stuCard[i].style.display = "";
      }
    }
  }

  function handleInput(e) {
    setName(e.target.value.toLowerCase());
  }

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="mt-4 flex justify-center mb-2"
        >
          <input
            onChange={handleInput}
            id="studentSearch"
            className=" selection:bg-blue-500 py-2 pl-3 outline-none text-white caret-white bg-blue-400 placeholder:text-white rounded-tl-[10px] rounded-bl-[10px]"
            type="text"
            placeholder="Search by name"
            value={name}
            data-search
          ></input>
          <div className="bg-blue-400 rounded-tr-[10px] rounded-br-[10px]">
            <button type="submit">
              <FaSearch className="text-white w-6 h-6 mt-2 pr-2 " />
            </button>
          </div>
        </form>
      </div>
      {account ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Data and Time</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Type</th>
                <th>Allergies</th>
                <th>Diagnosis</th>
                <th>Treatment</th>

                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orderData &&
                orderData.map((data, index) => {
                  return (
                    <tr key={index} data-sCard>
                      <td>{index + 1}</td>
                      {/* <td>{data.recordIdNew}</td> */}
                      <td>{data.formattedTimestamp}</td>
                      <td data-name>{data.name}</td>
                      <td>{data.ageNew} </td>
                      <td>{data.gender}</td>
                      <td>{data.bloodType}</td>
                      <td>{data.allergies}</td>
                      <td>{data.diagnosis}</td>
                      <td>{data.treatment}</td>

                      <td>
                        <button
                          className="delete-button"
                          onClick={(e) => deleteHandler(e, data)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Connect the account</h1>
      )}
    </div>
  );
};

export default Data;
