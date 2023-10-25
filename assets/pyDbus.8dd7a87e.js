import{B as n}from"./BackToTopButton.a5a2f696.js";import{d as u,o as a,c as e,a as s,b as t,F as o,e as p}from"./index.8f841a57.js";const c=s("title",null,"Python Dbus usage",-1),l={class:"container"},r={class:"content"},i=p(`<h1 id="let-python-use-dbus">Let python use Dbus</h1><blockquote><p>\u4E0A\u63A5 tello_hack.md</p></blockquote><p> \u65E0\u4EBA\u673A\u7834\u89E3\u5B8C\u6210\u540E, \u9700\u8981\u8BA9\u5730\u9762\u7AD9\u8FDE\u63A5\u4E0A\u65E0\u4EBA\u673A, \u8003\u8651\u5230\u5730\u9762\u7AD9\u8FD0\u884C\u7684 ubuntu \u7CFB\u7EDF\u81EA\u5E26 network-manager \u8FD9\u4E48\u4E00\u4E2A\u8F6F\u4EF6, \u7528\u8FDB\u7A0B\u95F4\u901A\u4FE1\u7684\u65B9\u5F0F\u53BB\u63A7\u5236 wifi \u521B\u5EFA, \u8FDE\u63A5\u548C\u65AD\u5F00\u518D\u597D\u4E0D\u8FC7\u4E86; </p><p> \u9009\u62E9 <a href="https://dbus.freedesktop.org/doc/dbus-tutorial.html">D-bus</a> \u4F5C\u4E3A ipc \u7CFB\u7EDF, \u5F00\u53D1\u8D77\u6765\u8FD8\u662F\u86EE\u7B80\u5355\u7684, \u5C31\u662F\u7EF4\u62A4\u706B\u846C\u573A. </p><p><code>D-bus</code> \u7528\u8D77\u6765\u751A\u81F3\u6709\u70B9\u50CF\u64CD\u4F5C json, \u6BD4\u5982\u83B7\u5F97\u4E00\u4E2A dbus API \u662F\u8FD9\u6837\u5B50\u7684:</p><pre class="hljs"><code><div><span class="hljs-comment"># get api obj eg:</span>
dbus.SystemBus().get_object(
            <span class="hljs-string">&quot;org.freedesktop.NetworkManager&quot;</span>,
            <span class="hljs-string">&quot;/org/freedesktop/NetworkManager/Settings&quot;</span>
            )
</div></code></pre><p> \u8FD9\u4E2A\u73A9\u610F\u513F\u7406\u89E3\u8D77\u6765\u5C31\u662F, \u4ECE <code>dbus</code> \u8DEF\u5F84 <code>org.freedesktop.NetworkManager</code> \u4E0B\u83B7\u5F97 <code>/org/freedesktop/NetworkManager/Settings</code> \u5BF9\u8C61, \u{1F611}\u6CA1\u9519\u8FD9\u662F\u4E2A\u5BF9\u8C61, \u5305\u542B\u4E86\u5404\u79CD\u63A5\u4E0B\u6765\u6240\u9700\u7684\u65B9\u6CD5\u7684\u5BF9\u8C61; \u81F3\u4E8E\u8FD9\u4E2A\u5BF9\u8C61\u7684\u5B9A\u4E49, \u8FD8\u8981\u4ECE<a href="https://people.freedesktop.org/~lkundrak/nm-docs/gdbus-org.freedesktop.NetworkManager.Settings.html">\u6587\u6863</a>\u91CC\u770B\u8D77; </p><p>\u{1F602} \u4F5C\u4E3A\u4E00\u4E2A\u6389\u5305\u4FA0, \u4E60\u60EF\u76F4\u63A5\u770B\u6E90\u7801\u731C\u7528\u6CD5, \u4F46\u8FD9\u6B21\u8001\u8001\u5B9E\u5B9E\u4E0A\u7F51\u627E\u6587\u6863\u624D\u770B\u660E\u767D\u600E\u4E48\u7528.</p><p>ps: \u7528 <code>D-Feet</code> \u8FD9\u4E2A\u8F6F\u4EF6\u53EF\u4EE5\u76F4\u63A5\u8C03\u8BD5 dbus, \u597D\u7528\u7684\u5F88, \u7528\u8D77\u6765\u8DDF\u4E0A\u9762\u4E00\u6837\u7167\u7740\u6587\u6863\u5199\u53C2\u6570 \u{1F972}.</p><h2 id="example">Example</h2><p> \u57FA\u672C\u4E0A\u662F\u4ECE<a href="https://github.com/NetworkManager/NetworkManager/blob/main/examples/python/dbus/vpn.py">\u8FD9\u91CC</a>\u548C<a href="https://github.com/NetworkManager/NetworkManager/blob/main/examples/python/dbus/add-connection.py">\u8FD9\u91CC</a>\u6284\u8FC7\u6765\u6539\u5427\u6539\u5427\u505A\u51FA\u6765\u7684\u4E1C\u897F. </p><pre class="hljs"><code><div><span class="hljs-keyword">import</span> logging
<span class="hljs-keyword">import</span> uuid
<span class="hljs-keyword">import</span> dbus


<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ConnectionConfig</span><span class="hljs-params">()</span>:</span>
    CONNECT_PROFILE_NAME = <span class="hljs-string">&quot;tmp_connection&quot;</span>
    CONNECTOR_INTERFACE = <span class="hljs-string">&quot;wlp1s0&quot;</span>


<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DbusManager</span>:</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">__init__</span><span class="hljs-params">(self)</span>:</span>
        self.connectivity_states = {
            <span class="hljs-number">0</span>: <span class="hljs-string">&quot;Unknown&quot;</span>,
            <span class="hljs-number">1</span>: <span class="hljs-string">&quot;Activating&quot;</span>,
            <span class="hljs-number">2</span>: <span class="hljs-string">&quot;Activated&quot;</span>,
            <span class="hljs-number">3</span>: <span class="hljs-string">&quot;Deactivating&quot;</span>,
            <span class="hljs-number">4</span>: <span class="hljs-string">&quot;Deactivated&quot;</span>,
        }
        self._interface = ConnectionConfig.CONNECTOR_INTERFACE

        <span class="hljs-comment"># \u8FEB\u4E8E\u4E0D\u77E5\u9053 python \u662F\u600E\u4E48\u5783\u573E\u56DE\u6536\u7684, \u5728\u5D4C\u5165\u5F0F\u7CFB\u7EDF\u91CC\u8DD1\u957F\u671F\u4EFB\u52A1\u8F6F\u4EF6,</span>
        <span class="hljs-comment"># \u9009\u62E9\u53EA\u5B9E\u4F8B\u5316\u4E00\u4E2A \`dbus.SystemBus()\`, \u514D\u5F97\u641E\u592A\u591A\u5BF9\u8C61\u7ED9 oom \u4E86.</span>
        self._bus = dbus.SystemBus()
        self._connection_proxy = self._bus.get_object(
            <span class="hljs-string">&quot;org.freedesktop.NetworkManager&quot;</span>,
            <span class="hljs-string">&quot;/org/freedesktop/NetworkManager/Settings&quot;</span>
        )
        self._device_proxy = self._bus.get_object(
            <span class="hljs-string">&quot;org.freedesktop.NetworkManager&quot;</span>,
            <span class="hljs-string">&quot;/org/freedesktop/NetworkManager&quot;</span>
        )
        self._connection_manager = dbus.Interface(
            self._connection_proxy, <span class="hljs-string">&quot;org.freedesktop.NetworkManager&quot;</span>)
        self._device_manager = dbus.Interface(
            self._device_proxy, <span class="hljs-string">&quot;org.freedesktop.NetworkManager&quot;</span>)
        self._connection_settings = dbus.Interface(
            self._connection_proxy, <span class="hljs-string">&quot;org.freedesktop.NetworkManager.Settings&quot;</span>)
        self._dbus_iface = dbus.Interface(
            self._connection_proxy, dbus_interface=<span class="hljs-string">&quot;org.freedesktop.NetworkManager.Settings&quot;</span>
        )
        self._device_path = self.get_device_path()
        <span class="hljs-comment"># \u{1F60E} \u4E0A\u9762\u8FD9\u4E00\u5927\u4E32\u4EE5\u53CA\u63A5\u4E0B\u6765\u7684\u4E00\u5927\u4E32\u90FD\u4E25\u683C\u6309\u7167</span>
        <span class="hljs-comment"># https://coderlmn.github.io/frontEndCourse/unmaintainable.html</span>
        <span class="hljs-comment"># \u548C</span>
        <span class="hljs-comment"># https://testing.googleblog.com/2008/07/how-to-write-3v1l-untestable-code.html</span>
        <span class="hljs-comment"># \u7F16\u5199.</span>
        <span class="hljs-comment"># \u4E0D\u8981\u558A\u6211\u6765\u7EF4\u62A4, \u4E00\u6B21\u6027\u7684\u7A0B\u5E8F\u7EDD\u5BF9\u6CA1\u6709\u66F4\u65B0\u8FED\u4EE3. (\u9003</span>

    <span class="hljs-comment"># true = activated</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_connection_statue</span><span class="hljs-params">(self)</span>:</span>
        manager_prop_iface = dbus.Interface(
            self._device_proxy, <span class="hljs-string">&quot;org.freedesktop.DBus.Properties&quot;</span>)
        activated_connections = manager_prop_iface.Get(
            <span class="hljs-string">&quot;org.freedesktop.NetworkManager&quot;</span>, <span class="hljs-string">&quot;ActiveConnections&quot;</span>)
        <span class="hljs-comment"># \u6CA1\u770B\u61C2? \u8FD9\u4E9B\u5176\u5B9E\u5168\u90FD\u662F\u4ECE\u5BF9\u8C61\u91CC\u53D6\u5BF9\u8C61, Get(&quot;\u5BF9\u8C61A&quot;, &quot;\u5BF9\u8C61A\u7684balabala\u65B9\u6CD5&quot;)</span>
        <span class="hljs-comment"># \u81F3\u4E8E\u4E3A\u5565\u90FD\u662F\u5B57\u7B26\u4E32, \u5C0F\u7F16\u4E5F\u4E0D\u77E5\u9053.</span>

        <span class="hljs-keyword">for</span> a <span class="hljs-keyword">in</span> activated_connections:
            ac_proxy = self._bus.get_object(
                <span class="hljs-string">&quot;org.freedesktop.NetworkManager&quot;</span>, a)
            prop_iface = dbus.Interface(
                ac_proxy, <span class="hljs-string">&quot;org.freedesktop.DBus.Properties&quot;</span>)
            state = prop_iface.Get(
                <span class="hljs-string">&quot;org.freedesktop.NetworkManager.Connection.Active&quot;</span>, <span class="hljs-string">&quot;State&quot;</span>)
            con_path = prop_iface.Get(
                <span class="hljs-string">&quot;org.freedesktop.NetworkManager.Connection.Active&quot;</span>, <span class="hljs-string">&quot;Connection&quot;</span>
            )
            con_proxy = self._bus.get_object(
                <span class="hljs-string">&quot;org.freedesktop.NetworkManager&quot;</span>, con_path)
            settings_connection = dbus.Interface(
                con_proxy, <span class="hljs-string">&quot;org.freedesktop.NetworkManager.Settings.Connection&quot;</span>
            )
            connection = settings_connection.GetSettings()
            <span class="hljs-comment"># \u5176\u5B9E\u8FD9\u4E2A\u72B6\u6001\u7801\u6709 ao \u591A, \u66F4\u590D\u6742\u7684\u4E1A\u52A1\u53EF\u4EE5\u76F4\u63A5\u628A\u72B6\u6001\u8FD4\u56DE\u51FA\u53BB\u5728\u5916\u90E8\u5904\u7406,</span>
            <span class="hljs-comment"># \u8FD9\u6837\u66F4\u52A0\u7B26\u5408\u5355\u4E00\u804C\u8D23\u89C4\u8303, \u4F46\u6211\u5C31\u4E0D\u{1F63E}</span>
            <span class="hljs-keyword">if</span> (connection[<span class="hljs-string">&quot;connection&quot;</span>][<span class="hljs-string">&quot;id&quot;</span>] == ConnectionConfig.CONNECT_PROFILE_NAME <span class="hljs-keyword">and</span>
            <span>state == <span class="hljs-number">2</span>):</span>
                <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">create_connection</span><span class="hljs-params">(self, ssid: str)</span>:</span>
        <span class="hljs-comment"># \u5B8C\u6574\u7684\u914D\u7F6E\u9879\u53EF\u4EE5\u5728\u8FD9\u91CC\u627E\u5230:</span>
        <span class="hljs-comment"># https://networkmanager.dev/docs/api/latest/ref-settings.html</span>
        connection_meta = dbus.Dictionary(
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;802-11-wireless&quot;</span>,
                <span class="hljs-string">&quot;uuid&quot;</span>: str(uuid.uuid4()), <span class="hljs-string">&quot;id&quot;</span>: ConnectionConfig.CONNECT_PROFILE_NAME,<br>
                <span class="hljs-string">&quot;interface-name&quot;</span>: self._interface}
        )
        wifi_meta = dbus.Dictionary(
            {<span class="hljs-string">&quot;ssid&quot;</span>: dbus.ByteArray(ssid.encode(<span class="hljs-string">&quot;utf-8&quot;</span>)),
             <span class="hljs-string">&quot;mode&quot;</span>: <span class="hljs-string">&quot;infrastructure&quot;</span>}
        )
        ipv4_meta = dbus.Dictionary({<span class="hljs-string">&quot;method&quot;</span>: <span class="hljs-string">&quot;auto&quot;</span>})
        ipv6_meta = dbus.Dictionary({<span class="hljs-string">&quot;method&quot;</span>: <span class="hljs-string">&quot;ignore&quot;</span>})
        connection_profile = dbus.Dictionary(
            {
                <span class="hljs-string">&quot;connection&quot;</span>: connection_meta,
                <span class="hljs-string">&quot;802-11-wireless&quot;</span>: wifi_meta,
                <span class="hljs-string">&quot;ipv4&quot;</span>: ipv4_meta,
                <span class="hljs-string">&quot;ipv6&quot;</span>: ipv6_meta,
            }
        )
        profile_path = (
            self._connection_settings.AddConnectionUnsaved(connection_profile))

        <span class="hljs-comment"># \u8FDE\u63A5\u4E00\u4E2A wifi \u53EA\u9700\u8981\u8FD9\u6837, \u7136\u540E\u8FD9\u6837, \u8FD9\u6837\u5B8C\u4E86\u5C31\u8FDE\u4E0A\u8FA3.</span>
        self.activate_connection(profile_path)

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">activate_connection</span><span class="hljs-params">(self, profile_path)</span>:</span>
        <span class="hljs-keyword">try</span>:
            self._device_manager.ActivateConnection(
                profile_path,
                self._device_path,
                <span class="hljs-string">&quot;/&quot;</span>)
        <span class="hljs-keyword">except</span>:
            <span class="hljs-comment"># \u6709\u9519\u8BEF\u5904\u7406, \u4F46\u4E0D\u5B8C\u5168\u5904\u7406.jpg</span>
            logging.error(<span class="hljs-string">&quot;Failed to connect wifi, possible already connected&quot;</span>)

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">disconnect</span><span class="hljs-params">(self)</span>:</span>
        device_proxy = self._bus.get_object(
            <span class="hljs-string">&quot;org.freedesktop.NetworkManager&quot;</span>, self._device_path)
        dev_iface = dbus.Interface(
            device_proxy, <span class="hljs-string">&quot;org.freedesktop.NetworkManager.Device&quot;</span>)
        dev_iface.Disconnect()
        <span class="hljs-comment"># \u8FD9\u4E2A\u5199\u6CD5\u4E0D\u5B58\u5728 \`\u65AD\u5F00\u4E00\u4E2A\u4E0D\u5B58\u5728\u7684\u8FDE\u63A5\u914D\u7F6E\`, \u4E0D\u7528\u5904\u7406\u9519\u8BEF.</span>

    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">remove_connection</span><span class="hljs-params">(self)</span>:</span>
        connection_paths = self._connection_settings.ListConnections()
        <span class="hljs-keyword">for</span> path <span class="hljs-keyword">in</span> connection_paths:
            con_proxy = self._bus.get_object(
                <span class="hljs-string">&quot;org.freedesktop.NetworkManager&quot;</span>, path)
            settings_connection = dbus.Interface(
                con_proxy, <span class="hljs-string">&quot;org.freedesktop.NetworkManager.Settings.Connection&quot;</span>)
            connection = settings_connection.GetSettings()
            <span class="hljs-keyword">if</span> (connection[<span class="hljs-string">&quot;connection&quot;</span>][<span class="hljs-string">&quot;id&quot;</span>] == ConnectionConfig.CONNECT_PROFILE_NAME):
                settings_connection.Delete()
            <span class="hljs-comment"># \u5982\u679C\u8FD9\u4E2A\u65B9\u6CD5\u88AB\u5F02\u6B65\u7684\u4E1C\u897F\u540C\u65F6\u8C03\u7528\u4E86\u4E24\u6B21, \u4F1A\u6709\u4E00\u6B21\u662F\u5C1D\u8BD5\u5220\u9664\u865A\u7A7A\u914D\u7F6E, \u7136\u540E\u62A5\u9519.</span>
            <span class="hljs-comment"># <span class="hljs-doctag">TODO:</span> \u9519\u8BEF\u5904\u7406</span>
            <span class="hljs-comment"># <span class="hljs-doctag">FIXME:</span> \u5173\u6211\u5C41\u4E8B, \u{1F638}\u5B9E\u8DF5\u8BC1\u660E\u4E0D\u5B58\u5728\u8FD9\u79CD\u60C5\u51B5\u5566.</span>

    <span class="hljs-comment"># \u8FD9\u4E2A\u65B9\u6CD5\u7528\u6765\u83B7\u5F97\u7F51\u5361\u5728 dbus \u91CC\u4F5C\u4E3A\u5BF9\u8C61\u65F6\u5019\u7684\u5BF9\u8C61.</span>
    <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">get_device_path</span><span class="hljs-params">(self)</span>:</span>
        devices = self._device_manager.GetDevices()
        <span class="hljs-keyword">for</span> device_path <span class="hljs-keyword">in</span> devices:
            device_proxy = self._bus.get_object(
                <span class="hljs-string">&quot;org.freedesktop.NetworkManager&quot;</span>, device_path)
            prop_iface = dbus.Interface(
                device_proxy, <span class="hljs-string">&quot;org.freedesktop.DBus.Properties&quot;</span>)
            iface = prop_iface.Get(
                <span class="hljs-string">&quot;org.freedesktop.NetworkManager.Device&quot;</span>, <span class="hljs-string">&quot;Interface&quot;</span>)
            <span class="hljs-keyword">if</span> (iface == self._interface):
                <span class="hljs-keyword">return</span> device_path

</div></code></pre><h2 id="%E5%8F%82%E8%80%83">\u53C2\u8003</h2><p><a href="https://people.freedesktop.org/~lkundrak/nm-docs/spec.html">NetworkManager D-Bus API Reference</a></p><p><a href="https://github.com/NetworkManager/NetworkManager/tree/main/examples/python/dbus">NetworkManager Python Dbus Example</a></p><h2 id="%E5%90%8E%E8%AE%B0">\u540E\u8BB0</h2><p>\u5267\u7EC8.</p>`,17),j=u({__name:"pyDbus",setup(h){return(E,d)=>(a(),e(o,null,[c,s("div",l,[s("div",r,[i,t(n)])])],64))}});export{j as default};
