import React from "react";
import "./sidebar.scss";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/">
        <div className={location.pathname === "/" ? "active" : undefined}>
          {location.pathname === "/" ? (
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.20898 37.8472V16.2202L21.627 5.40675L36.045 16.2202V37.8472H25.2315V25.2315H18.0225V37.8472H7.20898Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.8125 34.2396H16.2188V23.4271H27.0313V34.2396H32.4375V18.0208L21.625 9.91146L10.8125 18.0208V34.2396ZM7.20834 37.8438V16.2188L21.625 5.40625L36.0417 16.2188V37.8438H23.4271V27.0313H19.8229V37.8438H7.20834Z" />
            </svg>
          )}

          <span>Home</span>
        </div>
      </Link>
      <Link to="/search">
        <div className={location.pathname === "/search" ? "active" : undefined}>
          {location.pathname === "/search" ? (
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.3208 37.8438L23.9677 26.4906C23.0667 27.2115 22.0305 27.7821 20.8591 28.2026C19.6878 28.6231 18.4413 28.8333 17.1198 28.8333C13.846 28.8333 11.0756 27.6998 8.80858 25.4328C6.54036 23.1646 5.40625 20.3936 5.40625 17.1198C5.40625 13.846 6.54036 11.075 8.80858 8.80678C11.0756 6.53976 13.846 5.40625 17.1198 5.40625C20.3936 5.40625 23.1646 6.53976 25.4328 8.80678C27.6998 11.075 28.8333 13.846 28.8333 17.1198C28.8333 18.4413 28.6231 19.6878 28.2026 20.8591C27.7821 22.0305 27.2115 23.0667 26.4906 23.9677L37.8438 35.3208L35.3208 37.8438ZM17.1198 25.2292C19.3724 25.2292 21.2874 24.4411 22.8648 22.8648C24.4411 21.2874 25.2292 19.3724 25.2292 17.1198C25.2292 14.8672 24.4411 12.9522 22.8648 11.3747C21.2874 9.79853 19.3724 9.01042 17.1198 9.01042C14.8672 9.01042 12.9522 9.79853 11.3747 11.3747C9.79853 12.9522 9.01042 14.8672 9.01042 17.1198C9.01042 19.3724 9.79853 21.2874 11.3747 22.8648C12.9522 24.4411 14.8672 25.2292 17.1198 25.2292Z"
                fill="white"
              />
              <circle cx="17" cy="17" r="6" fill="white" />
            </svg>
          ) : (
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M35.3208 37.8438L23.9677 26.4906C23.0667 27.2115 22.0305 27.7821 20.8591 28.2026C19.6878 28.6231 18.4413 28.8333 17.1198 28.8333C13.846 28.8333 11.0756 27.6998 8.80858 25.4328C6.54036 23.1646 5.40625 20.3936 5.40625 17.1198C5.40625 13.846 6.54036 11.075 8.80858 8.80678C11.0756 6.53976 13.846 5.40625 17.1198 5.40625C20.3936 5.40625 23.1646 6.53976 25.4328 8.80678C27.6998 11.075 28.8333 13.846 28.8333 17.1198C28.8333 18.4413 28.6231 19.6878 28.2026 20.8591C27.7821 22.0305 27.2115 23.0667 26.4906 23.9677L37.8438 35.3208L35.3208 37.8438ZM17.1198 25.2292C19.3724 25.2292 21.2874 24.4411 22.8648 22.8648C24.4411 21.2874 25.2292 19.3724 25.2292 17.1198C25.2292 14.8672 24.4411 12.9522 22.8648 11.3747C21.2874 9.79853 19.3724 9.01042 17.1198 9.01042C14.8672 9.01042 12.9522 9.79853 11.3747 11.3747C9.79853 12.9522 9.01042 14.8672 9.01042 17.1198C9.01042 19.3724 9.79853 21.2874 11.3747 22.8648C12.9522 24.4411 14.8672 25.2292 17.1198 25.2292Z" />
            </svg>
          )}

          <span>Search</span>
        </div>
      </Link>
      <Link to="/library">
        <div
          className={location.pathname === "/library" ? "active" : undefined}
        >
          {location.pathname === "/library" ? (
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.56876 4.325C5.77389 4.325 4.32501 5.77388 4.32501 7.56443V35.6358C4.32501 37.4264 5.77605 38.8753 7.56876 38.8753H9.73126C11.5196 38.8753 12.9728 37.4264 12.9728 35.6358V7.56443C12.9728 5.77388 11.5196 4.325 9.7291 4.325H7.56876ZM18.3769 4.325C16.5864 4.325 15.1332 5.77388 15.1332 7.56443V35.6358C15.1332 37.4264 16.5864 38.8753 18.3769 38.8753H20.5394C22.33 38.8753 23.781 37.4264 23.781 35.6358V7.56443C23.781 5.77604 22.33 4.325 20.5373 4.325H18.3748H18.3769ZM33.9902 13.3145C33.8914 12.8864 33.7067 12.4829 33.4472 12.1283C33.1877 11.7738 32.859 11.4757 32.4808 11.252C32.1027 11.0284 31.683 10.8838 31.2474 10.8273C30.8117 10.7707 30.369 10.8032 29.9463 10.9228L28.3352 11.3769C27.5482 11.5994 26.8744 12.1115 26.4492 12.8102C26.024 13.509 25.8789 14.3427 26.043 15.144L30.3745 36.3343C30.463 36.7638 30.6376 37.1709 30.8879 37.531C31.1382 37.8911 31.4589 38.1967 31.8306 38.4294C32.2023 38.662 32.6173 38.8169 33.0506 38.8846C33.4838 38.9523 33.9263 38.9315 34.3513 38.8234L36.4814 38.2827C38.1898 37.8502 39.2364 36.1332 38.8428 34.4184L33.9902 13.3145Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="44"
              height="41"
              viewBox="0 0 44 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.32501 7.10795C4.32501 5.42545 5.77605 4.06401 7.56876 4.06401H9.73126C11.5196 4.06401 12.9728 5.42545 12.9728 7.10795V33.4874C12.9728 35.1679 11.5196 36.5293 9.7291 36.5293H7.5666C5.77605 36.5293 4.32501 35.1679 4.32501 33.4874V7.10795ZM7.56876 6.09195C7.282 6.09195 7.00698 6.19899 6.8042 6.38953C6.60143 6.58007 6.48751 6.83849 6.48751 7.10795V33.4874C6.48808 33.7565 6.60226 34.0144 6.80497 34.2045C7.00768 34.3946 7.28237 34.5014 7.56876 34.5014H9.73126C10.0177 34.5009 10.2921 34.3936 10.4944 34.2031C10.6967 34.0126 10.8104 33.7545 10.8103 33.4854V7.10998C10.8103 6.84052 10.6964 6.5821 10.4937 6.39156C10.2909 6.20102 10.0159 6.09398 9.7291 6.09398H7.5666L7.56876 6.09195ZM15.1332 7.10795C15.1332 5.42545 16.5864 4.06401 18.3769 4.06401H20.5394C22.33 4.06401 23.781 5.42545 23.781 7.10795V33.4874C23.781 35.1679 22.33 36.5293 20.5373 36.5293H18.3748C16.5864 36.5293 15.1332 35.1679 15.1332 33.4874V7.10795ZM18.3769 6.09195C18.0902 6.09195 17.8152 6.19899 17.6124 6.38953C17.4096 6.58007 17.2957 6.83849 17.2957 7.10795V33.4874C17.2963 33.7565 17.4104 34.0144 17.6131 34.2045C17.8159 34.3946 18.0905 34.5014 18.3769 34.5014H20.5394C20.8262 34.5014 21.1012 34.3944 21.304 34.2038C21.5068 34.0133 21.6207 33.7549 21.6207 33.4854V7.10998C21.6207 6.84052 21.5068 6.5821 21.304 6.39156C21.1012 6.20102 20.8262 6.09398 20.5394 6.09398H18.3769V6.09195ZM33.9902 12.5111C33.8914 12.1088 33.7067 11.7296 33.4472 11.3965C33.1877 11.0633 32.859 10.7832 32.4808 10.573C32.1027 10.3628 31.683 10.2271 31.2474 10.1739C30.8117 10.1207 30.369 10.1512 29.9463 10.2637L28.3352 10.6904C27.5486 10.8995 26.8752 11.3803 26.4501 12.0364C26.0249 12.6925 25.8795 13.4754 26.043 14.2281L30.3745 34.1417C30.463 34.5453 30.6376 34.9279 30.8879 35.2662C31.1382 35.6046 31.4589 35.8917 31.8306 36.1104C32.2023 36.329 32.6173 36.4745 33.0506 36.5381C33.4838 36.6018 33.9263 36.5822 34.3513 36.4806L36.4814 35.9726C38.1898 35.5662 39.2364 33.9528 38.8428 32.3414L33.9902 12.5111ZM30.5345 12.2164C30.6754 12.1787 30.823 12.1683 30.9683 12.1859C31.1136 12.2034 31.2536 12.2485 31.3798 12.3184C31.506 12.3884 31.6158 12.4817 31.7024 12.5927C31.7891 12.7037 31.8508 12.8301 31.8839 12.9642L36.7344 32.7965C36.7967 33.0547 36.7493 33.3255 36.6022 33.5513C36.4552 33.7772 36.2202 33.9401 35.9472 34.0056L33.8172 34.5136C33.6756 34.5475 33.5282 34.5541 33.3839 34.5329C33.2395 34.5118 33.1013 34.4634 32.9774 34.3907C32.8535 34.3179 32.7466 34.2224 32.6631 34.1097C32.5796 33.9971 32.5212 33.8697 32.4916 33.7353L28.1601 13.8217C28.1061 13.571 28.1547 13.3105 28.2962 13.092C28.4377 12.8735 28.6617 12.7132 28.9234 12.6431L30.5345 12.2164Z" />
            </svg>
          )}

          <span>Your Library</span>
        </div>
      </Link>
      <Link to="/library/songs">
        <div
          className={
            location.pathname === "/library/songs" ? "active" : undefined
          }
        >
          <div className="liked-songs">
            <svg height="12" width="12" viewBox="0 0 16 16">
              <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path>
            </svg>
          </div>
          <span>Liked Songs</span>
        </div>
      </Link>
    </div>
  );
}

export default SideBar;