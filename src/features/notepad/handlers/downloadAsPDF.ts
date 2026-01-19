import { jsPDF } from "jspdf";
import { useFileStore } from "../lib/fileStore";
export function downloadPDF(font: string) {
    const { fileText } = useFileStore.getState();

    const pdf = new jsPDF();
    pdf.setFont(font);

    const marginX = 10;
    const marginY = 10;
    const lineHeight = 8;

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const wrappedText = pdf.splitTextToSize(
        fileText,
        pageWidth - marginX * 2
    );

    let y = marginY;

    wrappedText.forEach((line: string) => {
        if (y + lineHeight > pageHeight - marginY) {
            pdf.addPage();
            pdf.setFont(font);
            y = marginY;
        }

        pdf.text(line, marginX, y);
        y += lineHeight;
    });

    const blobUrl = pdf.output("bloburl");
    window.open(blobUrl, "_blank");
}
