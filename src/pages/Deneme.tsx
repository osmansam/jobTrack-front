import React, { useEffect } from "react";

type Props = {};

const Deneme = (props: Props) => {
  useEffect(() => {
    console.log("deneme");
  }, []);
  return <div>Deneme</div>;
};

export default Deneme;
