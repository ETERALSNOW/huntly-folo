import * as React from "react";

const MainContainer = (props) =>{
  return (
    <div className="flex-auto px-3 md:px-6">
      {props.children}
    </div>
  )
}

export default MainContainer;
