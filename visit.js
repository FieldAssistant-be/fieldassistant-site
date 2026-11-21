// Mesure d'audience du site, sans cookie ni donnée personnelle : la page vue,
// le site de provenance et le type d'appareil (voir la politique de
// confidentialité). Rien n'est envoyé pour les robots ni en local.
(function () {
  if (navigator.webdriver) return;
  var host = location.hostname;
  if (host !== "fieldassistant.be" && host !== "www.fieldassistant.be") return;
  var params = new URLSearchParams(location.search);
  var source = params.get("utm_source") || "";
  if (!source && document.referrer) {
    try {
      var ref = new URL(document.referrer).hostname;
      if (ref !== host) source = ref;
    } catch (e) {}
  }
  var mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  var body = JSON.stringify({
    path: location.pathname,
    source: source,
    device: mobile ? "mobile" : "desktop",
  });
  var url = "https://whixhqtehwgndpahqfsc.supabase.co/functions/v1/site-visit";
  try {
    if (!(navigator.sendBeacon && navigator.sendBeacon(url, body))) {
      fetch(url, { method: "POST", body: body, keepalive: true, mode: "no-cors" });
    }
  } catch (e) {}
})();
