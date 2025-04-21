import React from "react";

export default function MentorCard({ image, role, name }) {
  return (
    <div className="bg-gray-200 dark:bg-gray-600 rounded-[15px] text-center w-[349px] h-[450px] py-[34px] px-[30px] shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="relative mx-auto">
        <img
          src={image}
          alt={name}
          className="w-60 h-60 rounded-full mx-auto border-4 border-orange-400 object-cover"
        />
      </div>
      <h3 className="text-[#9796A1] mt-[30px] text-[16px] font-kh dark:text-[#d7d7db]">{role}</h3>
      <h2 className="text-[28px] font-bold font-kh mt-[10px] dark:text-gray-200">{name}</h2>
      
      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 mt-[10px] text-gray-600">
        {/* Facebook */}
        <a href="#" className="hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
            <path fill="#1877F2" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256z" />
          </svg>
        </a>

        {/* Telegram */}
        <a href="#" className="hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 496 512">
            <path fill="#0088CC" d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/>
          </svg>
        </a>

        {/* Email */}
        <a href="#" className="hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
            <path fill="#f5ac02" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176v208c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
