import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="aside l-sidebar window">
      <div className="title-bar">
        <button aria-label="Close" className="close" />
        <h1 className="title">Index</h1>
        <button aria-label="Resize" className="resize" />
      </div>
      <div className="details-bar">
        <span>Have a</span>
        <span>nice day :)</span>
      </div>
      <div className="window-pane h-min">
        <ul className="menu-items">
          <li>
            <nav>
              <a href="/">Intro</a>
            </nav>
          </li>
          <li>
            Blogs
            <ul className="menu-items">
              <details>
                <summary>2022</summary>
                <li>
                  <nav>
                    <Link to="/2022/kismet">Kismet</Link>
                  </nav>
                </li>
                <li>
                  <nav>
                    <Link to="/2022/hadoop">Hadoop</Link>
                  </nav>
                </li>
                <li>
                  <nav>
                    <Link to="/2022/hive">Hive</Link>
                  </nav>
                </li>
                <li>
                  <nav>
                    <Link to="/2022/spark">Spark</Link>
                  </nav>
                </li>
                <li>
                  <nav>
                    <Link to="/2022/kafka">Kafka</Link>
                  </nav>
                </li>
                <li>
                  <nav>
                    <Link to="/2022/tello">Tello Hack</Link>
                  </nav>
                </li>
                <br />
              </details>
              <details>
                <summary>2023</summary>
                <li>
                  <nav>
                    <Link to="/2023/marp">Marp for Markdown</Link>
                  </nav>
                </li>
                <li>
                  <nav>
                    <Link to="/2023/z13">Rog Flow z13 2023</Link>
                  </nav>
                </li>
                <li>
                  <nav>
                    <Link to="/2023/drone-sim">无人机集群仿真</Link>
                  </nav>
                </li>
                <li>
                  <nav>
                    <Link to="/2023/py-dbus">Python Dbus</Link>
                  </nav>
                </li>
                <li>
                  <nav>
                    <Link to="/2023/starfield">Starfield Visual</Link>
                  </nav>
                </li>
              </details>
              <details>
                <summary>2024</summary>
                <li>
                  <nav>
                    <a href="/2024/hAPpYneWyEAr">hAPpYneWyEAr </a>
                  </nav>
                </li>
                <li>
                  <nav>
                    <Link to="/2024/enterprise">Enterprise experience</Link>
                  </nav>
                </li>
                <li>
                  <nav>
                    <Link to="/2024/ai-guidance">AI Guidance Module</Link>
                  </nav>
                </li>
              </details>
            </ul>
          </li>
          <li>
            <nav>
              <a href="/stuff">面白いもの</a>
            </nav>
          </li>
          <li>
            <nav>
              <a href="/about">About I</a>
            </nav>
          </li>
        </ul>
      </div>
      <div className="separator" />
      <div className="windows">
        <div className="title-bar" />
        <div className="p-8">
          友链:
          <ul>
            <li>
              <a className="font-effect-anaglyph" href="/404">
                naidesu
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
