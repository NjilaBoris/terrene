import React from "react";
import "./MenuBtn.css";

const MenuBtn = ({ isOpen, toggleMenu }) => {
  return (
    <div
      className={`menu-toggle fixed -translate-x-2/4 w-[130px] h-[53px] backdrop-blur-[10px]
       transition-[width] duration-500 bg-[#f2ede6bf] ease-[cubic-bezier(0.075,0.82,0.165,1)] origin-right 
      cursor-pointer z-1000 rounded-[8rem] left-2/4 bottom-8 ${
        isOpen ? "opened" : "closed"
      }`}
      onClick={toggleMenu}
    >
      <div
        className="menu-toggle-icon absolute w-12 h-12 bg-base-450 transition-all duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)] z-10
       overflow-hidden rounded-[100%] left-[2.5px] top-[2.5px]"
      >
        <div
          className="hamburger absolute -translate-x-2/4 -translate-y-2/4 w-[30px] h-[30px]
         flex justify-center items-center transition-all duration-1000 ease-[cubic-bezier(0.075,0.82,0.165,1)] 
         left-2/4 top-2/4"
        >
          <div
            className="menu-bar absolute w-[15px] h-[1.5px] transition-all duration-250m ease-[ease-out]"
            data-position="top"
          ></div>
          <div
            className="menu-bar absolute w-[15px] h-[1.5px] transition-all duration-250m ease-[ease-out]"
            data-position="bottom"
          ></div>
        </div>
      </div>
      <div
        className="menu-copy absolute -translate-y-2/4 text-base-450 transition-[left] duration-500
       ease-[cubic-bezier(0.075,0.82,0.165,1)] z-1 right-6 top-2/4"
      >
        <p className="text-base-500 text-[0.9rem] font-semibold leading-[0.9]">
          Menu
        </p>
      </div>
    </div>
  );
};

export default MenuBtn;
