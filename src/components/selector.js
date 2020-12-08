import React from "react";
import Select from "react-select";
import languageIndex from "./languageCodeMapping";

function LanguageSelector() {
  return (
    <div>
      <Select options={languageIndex} />
    </div>
  );
}

export default LanguageSelector;
