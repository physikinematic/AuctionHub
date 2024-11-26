import { Route, Routes } from "react-router-dom";

const Separate = ({ items }) => {
  return (
    <Routes>
      {items.map((item) => {
        return <Route path={item.path} element={item.element} />;
      })}
    </Routes>
  );
};

export default Separate;
