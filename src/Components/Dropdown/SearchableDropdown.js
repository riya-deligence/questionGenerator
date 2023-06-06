



// // import React, { useState, useEffect, useRef } from 'react';
// // import './Dropdown.css';

// // const Dropdown = ({ options }) => {
// //   const [selectedOption, setSelectedOption] = useState('');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filteredOptions, setFilteredOptions] = useState([]);
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const dropdownRef = useRef(null);

// //   useEffect(() => {
// //     setFilteredOptions(options);
// //   }, [options]);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setIsDropdownOpen(false);
// //       }
// //     };

// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, []);

// //   const handleInputChange = (event) => {
// //     const value = event.target.value;
// //     setSearchTerm(value);
// //     filterOptions(value);
// //     setIsDropdownOpen(true);
// //   };

// //   const handleOptionSelect = (option) => {
// //     setSelectedOption(option);
// //     setSearchTerm('');
// //     setFilteredOptions(options);
// //     setIsDropdownOpen(false);
// //   };

// //   const filterOptions = (searchTerm) => {
// //     const filteredOptions = options.filter((option) =>
// //       option.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //     setFilteredOptions(filteredOptions);
// //   };

// //   const toggleDropdown = () => {
// //     setIsDropdownOpen(!isDropdownOpen);
// //   };

// //   return (
// //     <div className="DropDown" ref={dropdownRef}>
// //       <input
// //         type="text"
// //         className="dropdown-input"
// //         value={searchTerm}
// //         onChange={handleInputChange}
// //         onClick={toggleDropdown}
// //         placeholder="Search..."
// //       />
// //       {isDropdownOpen && (
// //         <ul className="dropdown-list" style={{ width: dropdownRef.current.offsetWidth }}>
// //           {searchTerm && filteredOptions.length === 0 ? (
// //             <li className="no-options">No options found</li>
// //           ) : (
// //             filteredOptions.map((option, index) => (
// //               <li
// //                 key={index}
// //                 className={`dropdown-item ${option === selectedOption ? 'selected' : ''}`}
// //                 onClick={() => handleOptionSelect(option)}
// //               >
// //                 {option}
// //               </li>
// //             ))
// //           )}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dropdown;


import React, { useState, useEffect, useRef } from 'react';
import styles1 from "./SearchableDropdown.module.css";
import styles2 from "./Dropdown.module.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const SearchableDropdown = ({ options,selectedOption,setSelectedOption,useStyle2 ,className}) => {
  
  // const [selectedOption, setSelectedOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const styles = useStyle2 ? styles2 : styles1;
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterOptions(value);
    setIsDropdownOpen(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm('');
    setFilteredOptions(options);
    setIsDropdownOpen(false);
  };
  

  const filterOptions = (searchTerm) => {
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const dropdownIconClass = isDropdownOpen ? styles['up'] : styles['down'];
  return (
    <div className={
      styles.DropDown} ref={dropdownRef}>
        <div className={styles["dropdown-input-container"]}>
        <input
          type="text"
          className={styles["dropdown-input"]}
          value={selectedOption || searchTerm} 
          onChange={handleInputChange}
          onClick={toggleDropdown}
          placeholder="Select a game
          "
        />
       <div className={styles["dropdown-icon"]} onClick={toggleDropdown}>
  <ExpandMoreIcon  className={`${styles['dropdown-icon']} ${dropdownIconClass}`} />
</div>

      </div>
      
      {isDropdownOpen && (
        <ul className={styles["dropdown-list"]} style={{ width: dropdownRef.current.offsetWidth }}>
          {searchTerm && filteredOptions.length === 0 ? (
            <li className={styles["no-options"]}>No options found</li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className = {`${styles['dropdown-item']} ${option === selectedOption ? styles['selected'] : ''}`}

                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))
          )}
        </ul>
        
      )}
    </div>
  );
};

export default SearchableDropdown;


// import React, { useState, useEffect, useRef } from 'react';
// import styles1 from "./SearchableDropdown.module.css";
// import styles2 from "./Dropdown.module.css"
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// const SearchableDropdown = ({ options, selectedOption, setSelectedOption, useStyle2, className }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredOptions, setFilteredOptions] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const styles = useStyle2 ? styles2 : styles1;
  
//   useEffect(() => {
//     setFilteredOptions(options);
//   }, [options]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     setSearchTerm(value);
//     filterOptions(value);
//     setIsDropdownOpen(true);
//   };

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//     setSearchTerm('');
//     setFilteredOptions(options);
//     setIsDropdownOpen(false);
//   };

//   const filterOptions = (searchTerm) => {
//     const filteredOptions = options.filter((option) =>
//       option.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredOptions(filteredOptions);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const dropdownIconClass = isDropdownOpen ? styles['up'] : styles['down'];

//   return (
//     <div className={`${styles.DropDown} ${className}`} ref={dropdownRef}>
//       <div className={styles["dropdown-input-container"]}>
//         <input
//           type="text"
//           className={styles["dropdown-input"]}
//           value={selectedOption || searchTerm} 
//           onChange={handleInputChange}
//           onClick={toggleDropdown}
//           placeholder="Select a game"




          
//         />
//         <div className={styles["dropdown-icon"]} onClick={toggleDropdown}>
//           <ExpandMoreIcon className={`${styles['dropdown-icon']} ${dropdownIconClass}`} />
//         </div>
//       </div>
      
//       {isDropdownOpen && (
//         <ul className={styles["dropdown-list"]} style={{ width: dropdownRef.current.offsetWidth }}>
//           {searchTerm && filteredOptions.length === 0 ? (
//             <li className={styles["no-options"]}>No options found</li>
//           ) : (
//             filteredOptions.map((option, index) => (
//               <li
//                 key={index}
//                 className={`${styles['dropdown-item']} ${option === selectedOption ? styles['selected'] : ''}`}
//                 onClick={() => handleOptionSelect(option)}
//               >
//                 {option}
//               </li>
//             ))
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchableDropdown;
