import { toast } from '@zerodevx/svelte-toast';

export function copyToClipBoard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      toast.push(`"${text}" was copied to your clipboard`);
      console.log(`"${text}" was copied to your clipboard`);
    })
    .catch((error) => {
      toast.push(`An error occurred: "${error}"`)
      console.error(error)
    });
}
