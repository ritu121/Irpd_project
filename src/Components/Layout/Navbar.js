import { useEffect, useState } from "react";
import { useRef } from "react";
// import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { IoHome } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { FaAddressCard } from "react-icons/fa";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import logo from '../../assets/logo.jpg'

const Navbar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const [selectedLink, setSelectedLink] = useState(null);
  //   const  pathname  = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);

  }, []);

  useEffect(() => {
    getGradientColors()
  }, [selectedLink]);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const getGradientColors = (link) => {
    if (selectedLink === link) {
      return 'from-sky-600 to-cyan-400';
    } else {
      return 'from-gray-300 to-gray-200'; // You can set a default gradient for non-selected tabs
    }
  }

  const Nav_animation = isTabletMid
    ? {
      open: {
        x: 0,
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        x: -250,
        width: 0,
        transition: {
          damping: 40,
          delay: 0.15,
        },
      },
    }
    : {
      open: {
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        width: "1.5rem",
        transition: {
          damping: 40,
        },
      },
    };

  //   const subMenusList = [
  //     {
  //       name: "build",
  //       icon: RiBuilding3Line,
  //       menus: ["auth", "app settings", "stroage", "hosting"],
  //     },
  //     {
  //       name: "analytics",
  //       icon: TbReportAnalytics,
  //       menus: ["dashboard", "realtime", "events"],
  //     },
  //   ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${open ? "block" : "hidden"
          } `}
      ></div>

      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[13rem]  w-[13rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                x: -2,
                y: -3,
                rotate: 0,
              }
              : {
                x: 0,
                y: 0,
                rotate: 180,
              }
          }
          transition={{ duration: 0 }}
          className="w-fit h-fit md:block z-50 hidden right-0.5 top-2 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>

        {
          open === true &&
          <div className="flex items-center gap-2.5 border-b py-3 border-slate-300  mx-3">
            <img
              src={logo}
              width={45}
              alt=""
            />
            <span className="text-xl whitespace-pre font-black">IRPD</span>
          </div>
        }


        <div className="flex flex-col  h-full">
          {
            open === true &&

            <div className="p-4 space-y-4">
              <NavLink to={"/dashboard"} className="link">
                <div
                  className={`relative px-4 py-3 space-x-4 flex  rounded-lg text-black ${window.location.pathname === '/dashboard' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}>

                  <IoHome size={23} />
                  <span>Home</span>

                </div>
              </NavLink>
              <NavLink to={"/newRequest"} className="link ">
                <div className={`px-4 py-3 space-x-4 flex rounded-md text-black-500 group ${window.location.pathname === '/newRequest' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}>

                  <FaAddressCard size={23} className="min-w-max" />
                  <span>New Request</span>

                </div>
              </NavLink>
              <NavLink to={"/candidates"} className="link ">
                <div className={`px-4 py-3 space-x-4 flex rounded-md text-black-500 group ${window.location.pathname === '/candidates' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}>

                  <BsPerson size={23} className="min-w-max" />
                  <span>Candidates</span>

                </div>
              </NavLink>
              {/* <NavLink to={"/storage"} className="link">
              <div className={`px-4 py-3 space-x-4 flex rounded-md text-black-500 group ${window.location.pathname === '/storage' ? 'bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}>
                <HiOutlineDatabase size={23} className="min-w-max" />
                <span>Storage</span>
              </div>
            </NavLink> */}
            </div>

          }


        </div>

      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Navbar;
