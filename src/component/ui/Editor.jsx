import React from "react";
const Editor = () => {
    return (
      <div
        id="editor"
        contentEditable={true}
        style={{
          padding: "16px 24px",
          border: "1px solid #D6D6D6",
          borderRadius: "4px",
        }}
      ></div>
    );
  };
  export default Editor;