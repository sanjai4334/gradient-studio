import html2canvas from 'html2canvas';

/**
 * Export a DOM element as a PNG image file
 */
export const exportAsPng = async (
  element: HTMLElement, 
  fileName: string = 'gradient'
): Promise<void> => {
  try {
    // Create a canvas from the element
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // Higher scale for better quality
    });
    
    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.download = `${fileName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error exporting as PNG:', error);
  }
};