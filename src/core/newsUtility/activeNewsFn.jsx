import React from "react";
import toast from "react-hot-toast";
import { onFormData } from "../../utility/hooks/form-data-helper.utils";

export const activeNewsFn = (
  item,
  activeDeActive,
  activeDeActiveDone,
  activeDeActiveErr
) => {

  const data = {
    active: true,
    id: item.id,
  };

  const formData = onFormData(data);

  activeDeActive(formData);
  activeDeActiveDone(
    toast("دوره با موفقیت فعال شد", {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <linearGradient
            id="ONeHyQPNLkwGmj04dE6Soa_2Tv2g4T4Wtu0_gr1"
            x1="16"
            x2="16"
            y1="2.888"
            y2="29.012"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#36eb69"></stop>
            <stop offset="1" stop-color="#1bbd49"></stop>
          </linearGradient>
          <circle
            cx="16"
            cy="16"
            r="13"
            fill="url(#ONeHyQPNLkwGmj04dE6Soa_2Tv2g4T4Wtu0_gr1)"
          ></circle>
          <linearGradient
            id="ONeHyQPNLkwGmj04dE6Sob_2Tv2g4T4Wtu0_gr2"
            x1="16"
            x2="16"
            y1="3"
            y2="29"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-opacity=".02"></stop>
            <stop offset="1" stop-opacity=".15"></stop>
          </linearGradient>
          <path
            fill="url(#ONeHyQPNLkwGmj04dE6Sob_2Tv2g4T4Wtu0_gr2)"
            d="M16,3.25c7.03,0,12.75,5.72,12.75,12.75 S23.03,28.75,16,28.75S3.25,23.03,3.25,16S8.97,3.25,16,3.25 M16,3C8.82,3,3,8.82,3,16s5.82,13,13,13s13-5.82,13-13S23.18,3,16,3 L16,3z"
          ></path>
          <g opacity=".2">
            <linearGradient
              id="ONeHyQPNLkwGmj04dE6Soc_2Tv2g4T4Wtu0_gr3"
              x1="16.502"
              x2="16.502"
              y1="11.26"
              y2="20.743"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-opacity=".1"></stop>
              <stop offset="1" stop-opacity=".7"></stop>
            </linearGradient>
            <path
              fill="url(#ONeHyQPNLkwGmj04dE6Soc_2Tv2g4T4Wtu0_gr3)"
              d="M21.929,11.26 c-0.35,0-0.679,0.136-0.927,0.384L15,17.646l-2.998-2.998c-0.248-0.248-0.577-0.384-0.927-0.384c-0.35,0-0.679,0.136-0.927,0.384 c-0.248,0.248-0.384,0.577-0.384,0.927c0,0.35,0.136,0.679,0.384,0.927l3.809,3.809c0.279,0.279,0.649,0.432,1.043,0.432 c0.394,0,0.764-0.153,1.043-0.432l6.813-6.813c0.248-0.248,0.384-0.577,0.384-0.927c0-0.35-0.136-0.679-0.384-0.927 C22.608,11.396,22.279,11.26,21.929,11.26L21.929,11.26z"
            ></path>
          </g>
          <path
            fill="#fff"
            d="M10.325,14.825L10.325,14.825c0.414-0.414,1.086-0.414,1.5,0L15,18l6.179-6.179	c0.414-0.414,1.086-0.414,1.5,0l0,0c0.414,0.414,0.414,1.086,0,1.5l-6.813,6.813c-0.478,0.478-1.254,0.478-1.732,0l-3.809-3.809	C9.911,15.911,9.911,15.239,10.325,14.825z"
          ></path>
        </svg>
      ),
    })
  );
  activeDeActiveErr(
    toast("فعال کردن دوره دچار مشکل است", {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          <linearGradient
            id="wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1"
            x1="9.858"
            x2="38.142"
            y1="9.858"
            y2="38.142"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#f44f5a"></stop>
            <stop offset=".443" stop-color="#ee3d4a"></stop>
            <stop offset="1" stop-color="#e52030"></stop>
          </linearGradient>
          <path
            fill="url(#wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1)"
            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
          ></path>
          <path
            d="M33.192,28.95L28.243,24l4.95-4.95c0.781-0.781,0.781-2.047,0-2.828l-1.414-1.414	c-0.781-0.781-2.047-0.781-2.828,0L24,19.757l-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l4.95,4.95l-4.95,4.95c-0.781,0.781-0.781,2.047,0,2.828l1.414,1.414	c0.781,0.781,2.047,0.781,2.828,0l4.95-4.95l4.95,4.95c0.781,0.781,2.047,0.781,2.828,0l1.414-1.414	C33.973,30.997,33.973,29.731,33.192,28.95z"
            opacity=".05"
          ></path>
          <path
            d="M32.839,29.303L27.536,24l5.303-5.303c0.586-0.586,0.586-1.536,0-2.121l-1.414-1.414	c-0.586-0.586-1.536-0.586-2.121,0L24,20.464l-5.303-5.303c-0.586-0.586-1.536-0.586-2.121,0l-1.414,1.414	c-0.586,0.586-0.586,1.536,0,2.121L20.464,24l-5.303,5.303c-0.586,0.586-0.586,1.536,0,2.121l1.414,1.414	c0.586,0.586,1.536,0.586,2.121,0L24,27.536l5.303,5.303c0.586,0.586,1.536,0.586,2.121,0l1.414-1.414	C33.425,30.839,33.425,29.889,32.839,29.303z"
            opacity=".07"
          ></path>
          <path
            fill="#fff"
            d="M31.071,15.515l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414L18.343,32.485	c-0.391,0.391-1.024,0.391-1.414,0l-1.414-1.414c-0.391-0.391-0.391-1.024,0-1.414l14.142-14.142	C30.047,15.124,30.681,15.124,31.071,15.515z"
          ></path>
          <path
            fill="#fff"
            d="M32.485,31.071l-1.414,1.414c-0.391,0.391-1.024,0.391-1.414,0L15.515,18.343	c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0l14.142,14.142	C32.876,30.047,32.876,30.681,32.485,31.071z"
          ></path>
        </svg>
      ),
    })
  );
};
