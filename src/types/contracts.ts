export interface Contract {
  id: string;
  cliente: string;
  obra: string;
  numeroContrato: string;
  vigenciaInicio: string;
  vigenciaFim: string;
  valor: number; // Valor como número para armazenamento
  pdfFile: File | null;
  createdAt: Date;
}

// Tipo para o formulário onde valor é string (formatado)
export interface ContractFormData {
  id: string;
  cliente: string;
  obra: string;
  numeroContrato: string;
  vigenciaInicio: string;
  vigenciaFim: string;
  valor: string; // Valor como string formatado
  pdfFile: File | null;
  createdAt: Date;
}
