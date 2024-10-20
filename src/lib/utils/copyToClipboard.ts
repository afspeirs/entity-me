import { toast } from '$lib/components/Toaster.svelte';

export function copyToClipBoard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.add({
        title: `"${text}" was copied to your clipboard`,
      });
      console.log(`"${text}" was copied to your clipboard`);
    })
    .catch((error) => {
      toast.add({
        title: `An error occurred: "${error}"`,
      });
      console.error(error);
    });
}
