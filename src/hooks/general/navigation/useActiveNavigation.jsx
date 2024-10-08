import { createContext, useContext, useEffect, useState } from "react";

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const [currentActive, setActive] = useState(
    JSON.parse(localStorage.getItem("currentActive")) || {
      modal: { modalName: null, type: null },
    }
  );

  const setCurrentActive = (type, value) => {
    if (type === "modal") {
      setActive((prev) => ({ ...prev, [type]: value }));
      return;
    }
    setActive((prev) => ({ ...prev, [type]: value }));
  };

  const handleCloseModal = () => {
    setCurrentActive("modal", {
      modalName: null,
      type: null,
    });
  };

  useEffect(() => {
    localStorage.setItem("currentActive", JSON.stringify(currentActive));
  }, [currentActive]);

  return (
    <NavigationContext.Provider
      value={{ currentActive, setCurrentActive, handleCloseModal }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

const useNavigateContext = () => {
  return useContext(NavigationContext);
};

export default NavigationProvider;

export { useNavigateContext };
