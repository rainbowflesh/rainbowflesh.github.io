/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    patterns: {
      opacities: {
        100: "1",
        80: ".80",
        60: ".60",
        40: ".40",
        20: ".20",
        10: ".10",
        5: ".05",
      },
      sizes: {
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
    },
    extend: {
      maxWidth: {
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "10/12": "83%",
        "11/12": "91%",
        "14/15": "94%",
      },
      maxHeight: {
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "10/12": "83%",
        "11/12": "91%",
        "14/15": "94%",
      },
      spacing: {
        128: "32rem",
        256: "64rem",
      },
    },
    fontFamily: {
      sans: ["Figtree"],
      serif: ["Figtree"],
      mono: ["Space Mono"],
      display: ["Figtree"],
      body: ["Figtree"],
      logo: ["RainbowFleshNBP", "sans-serif"],
    },
  },
  plugins: [require("tailwindcss-bg-patterns")],
};
