import { jsPDF } from "jspdf";
import { useFileStore } from "../lib/fileStore";

export function downloadPDF() {
    const { currentFileName, fileText } =
        useFileStore.getState();
    const pdf = new jsPDF();
    pdf.setFont("Times", "Normal");
    pdf.text(fileText, 10, 10);
    pdf.save(currentFileName);
}
