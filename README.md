# Show Your Work C2PA UI
*An embeddable component created by Show Your Work Lab to display an image's C2PA data in a user-friendly interface*

## Packages

### React
The `react` package exports a React component for the Show Your Work C2PA UI. Run `npm run react:dev` to develop locally.

### Svelte
The `svelte` package exports a Svelte component for the Show Your Work C2PA UI.  Run `npm run svelte:dev` to develop locally.

### Common
The `common` package contains shared assets to be used by the `react` and `svelte` packages to remain continuity between them and improve the ease of updating each. These assets include constant variables, i18n strings, helper functions, and CSS styles.

### Docs
The `docs` package builds a simple landing page displaying install instructions for both the `react` and `svelte` packages and links to the demo subpages from the `react` and `svelte` packages, displaying examples of the components. The `docs` package also builds a demo article page deployed to `/article`. Run `npm run docs:dev` to develop locally.
> Note: When the `syw-react` and `syw-svelte` libraries are importable outside this environment `docs` should be spun off into it's own repository/webpage. 

## Usage

```js
<Syw
	locale="en-US"
	src="https://example.com/image.jpg"
	caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut fermentum augue."
	byline="Nulla Dignissim"
	onEvent={handleEvent}
/>
```

### Properties
- `locale`: Locale code for language of UI-text [en_US | no_NO | sv_SE]
- `src`: URL to C2PA-compliant image file
- `caption`: Image's caption to appear under the image
- `byline`: Credit and/or copyright text to appear under the image
- `onEvent`: Event handler to listen for interaction events (see below)

### Analytics
The `onEvent` property takes a callback function to be executed on interaction events. The function returns a `type` value (see below), the interaction's native `event` object, and a `manifest` object if the event is on a manifest entry.

```js
function handleEvent(type, event, [manifest]) {
	// your code
}
```
#### Available `type` values:
- `image.hover`: On mouse over of image or provenange toggle button
- `image.unhover`: On mouse leave of image or provenange toggle button
- `provenance.open`: On opening of provenance
- `provenance.close`: On closing of provenance
- `explainer.open`: On opening of explainer
- `explainer.close`: On closing of explainer
- `manifest.open`: On opening of single manifest entry (includes `manifest` value)
- `manifest.close` On closing of single manifest entry (includes `manifest` value)