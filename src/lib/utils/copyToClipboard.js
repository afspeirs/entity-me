export function copyToClipBoard(text) {
  navigator.clipboard.writeText(text);
  console.log(`"${text}" was copied to your clipboard"`);
}
