import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Client } from '../types/Client';

export const generatePDF = (clients: Client[]) => {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [['Nome', 'Email', 'Telefone', 'Endereço']],
    body: clients.map((c) => [c.name, c.email, c.phone, c.address]),
  });

  doc.save('clientes.pdf');
};