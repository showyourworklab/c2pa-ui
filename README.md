# Show Your Work
*An embeddable component created by Show Your Work Lab to display an image's C2PA data in a user-friendly interface*

## Packages

### React
The `react` package exports a React component for the Show Your Work C2PA UI.

### Svelte
The `svelte` package exports a Svelte component for the Show Your Work C2PA UI.

### Common
The `common` package contains shared assets to be used by the `react` and `svelte` packages to remain continuity between them and improve the ease of updating each. These assets include constant variables and i18n strings, helper functions, and CSS styles.

### Docs
The `docs` package is currently just a landing page displaying simple install instructions for both the `react` and `svelte` packages. The `docs` package also contains demo subpages from the `react` and `svelte` packages, displaying examples of the components.

## Usage

```js
	<SywReact
		locale="en-US"
		src="https://example.com/image.jpg"
		caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut fermentum augue."
		byline="Nulla Dignissim"
		onEvent={handleEvent}
	/>
```

### Properties
- `locale`
- `src`
- `caption`
- `byline`
- `onEvent`

### Analytics
The `onEvent` property takes a callback function to be executed on key events. The function returns a `type` key (see below), the interaction's native `event`, and a `manifest` object if the event is on a manifest entry.

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