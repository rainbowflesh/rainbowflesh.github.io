import { RainbowText } from "../components/RainbowText";

export const Home = () => {
  console.log("Wanna try something big? y/n");
  console.log("%c >> n", "color:red");
  return (
    <div className="container standard-dialog p-4">
      <div className="header">
        <div className="text-5xl heading text-center mt-2">RAINBOW`s Blog</div>
        <p className="desc text-3xl Geneva_9 text-center mt-2">
          A blog designed with <a href="https://sakofchit.github.io/system.css">system.css</a> for retro{" "}
          <span role="img" className="apple" aria-label="Apple"></span>-looking style.
        </p>
      </div>
      <div className="content mt-8">
        <div className="text">
          <h1 className="text-xl p-4">Greeting!</h1>
          <blockquote className="text-center">
            Quidquid latine dictum sit, altum sonatur.
            <footer>— I forgot where i find this quote but I use it, R. flesh</footer>
          </blockquote>
        </div>
        <div className="content px-4">
          <span>Welcome to my </span>
          <span className="text-2xl RainbowFleshNBP">blog</span>
          <p>I create this blog for record my work and life,</p>
          <p>And sharding interesting stuff for ya.</p>
          <p className="mt-4 mb-8">
            <a href="https://github.com/rainbowflesh/rainbowflesh.github.io">Blog repo</a>
          </p>
        </div>
        <RainbowText />
      </div>
      <div className="footer m-auto justify-center flex">
        <a className="icp italic" href="https://icp.gov.moe/?keyword=20230429" target="_blank">
          萌ICP备20230429号
        </a>
      </div>
    </div>
  );
};
