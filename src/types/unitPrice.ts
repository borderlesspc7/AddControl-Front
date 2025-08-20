export interface UnitPrice {
  id?: string;
  codigo: string;
  tipo: string;
  espessura: string;
  estrutura: string;
  chapaFace1: string;
  chapaFace2: string;
  isolamento: string;
  quantidade: number;
  unidade: string;
  unitMaterial: number;
  unitMaoObra: number;
  totalMaterial?: number;
  totalMaoObra?: number;
}
