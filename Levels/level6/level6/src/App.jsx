// import React from 'react'
// import One from './One'
// import Two from './Two'
// import Three from './Three'
// import Four from './Four'
// import Five from './Five'
// import Mount from './Mount'
// import Theme from './Theme'


// function App() {
 

//   return (
//     <>
//     <ThemeProvider>
//       <Theme />
//     </ThemeProvider>
    
        
//         <One />
//         <Two isvisible={false}/>
//         <Three />
//         <Four />
//         <Five />
//         <Mount /> 
//     </>
//   )
// }

// export default App

import { ThemeProvider } from "./Theme"; // ✅ Add this line
import Theme from "./Theme";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";
import Five from "./Five";
import Mount from "./Mount";
import Eight from "./Eight";
import Nine from "./Nine";
import Ten from "./Ten";

function App() {
  return (
    <ThemeProvider>
      <Theme />
      <One />
      <Two isvisible={false} />
      <Three />
      <Four />
      <Five />
      <Mount />
      <Eight />
      <Nine />
      <Ten name="gowtham" />
    </ThemeProvider>
  );
}

export default App;

