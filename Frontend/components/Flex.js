import React from 'react';

const Flex = (props) => {
  let style = { display: "flex" }
  if (props.center) {
    style = { ...style, alignContent: "center", justifyContent: "center" }
  }
  return <div style={{ ...style }}>{props.children}</div>
}
export default Flex;