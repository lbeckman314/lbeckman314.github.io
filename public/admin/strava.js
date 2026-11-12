// "Strava" button for the rich text editor.
//
// Notes embed Strava activities as raw HTML. The editor would otherwise drop
// or mangle that block, so this component recognises it, shows it as a small
// form, and writes back exactly the same HTML on save - the site's renderer
// doesn't need to change.
CMS.registerEditorComponent({
  id: "strava",
  label: "Strava",
  icon: "directions_run",
  fields: [
    { name: "embed_id", label: "Activity ID", widget: "string" },
    {
      name: "token",
      label: "Embed token (from Strava's Share → Embed code)",
      widget: "string",
    },
    { name: "embed_type", label: "Type", widget: "string", default: "activity" },
    { name: "style", label: "Style", widget: "string", default: "standard" },
  ],
  pattern:
    /^<div class="strava-embed-placeholder" data-embed-type="(?<embed_type>[^"]*)" data-embed-id="(?<embed_id>[^"]*)" data-style="(?<style>[^"]*)" data-from-embed="false" data-token="(?<token>[^"]*)"><\/div><script src="https:\/\/strava-embeds\.com\/embed\.js"><\/script>$/m,
  toBlock: ({
    embed_type = "activity",
    embed_id = "",
    style = "standard",
    token = "",
  } = {}) =>
    `<div class="strava-embed-placeholder" data-embed-type="${embed_type}" data-embed-id="${embed_id}" data-style="${style}" data-from-embed="false" data-token="${token}"></div><script src="https://strava-embeds.com/embed.js"></script>`,
  toPreview: ({ embed_id = "" } = {}) =>
    `Strava activity ${embed_id} (shown on the live site)`,
});
