// import React from "react";

// const Title = ({ text1, text2 }) => {
//   return (
//     <div className="inline-flex gap-2 items-center mb-3">
//       <p className="text-gray-500">
//         {text1} <span className="text-gray-700 font-medium">{text2}</span>
//       </p>
//       <p className="w-8 sm:w-1/2 h-[1px] sm:h-[2px] bg-gray-700"></p>
//     </div>
//   );
// };

// export default Title;

import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <p className="uppercase tracking-wide text-xl sm:text-2xl lg:text-3xl text-indigo-500">
        {text1}
        <span className="ml-2 text-indigo-800 font-semibold">{text2}</span>
      </p>
      <span className="w-12 sm:w-20 h-[2px] bg-indigo-800"></span>
    </div>
  );
};

export default Title;
