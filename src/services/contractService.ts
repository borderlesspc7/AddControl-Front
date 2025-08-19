import type {
  Contract,
  ContractFormData,
  UpdateContractData,
} from "../types/contracts";
import { db } from "../lib/firebaseconfig";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore";

export const contractService = {
  async createContract(
    contractData: Omit<ContractFormData, "id" | "createdAt" | "updatedAt">
  ): Promise<Contract> {
    try {
      // NUNCA envie File/Blob diretamente ao Firestore. Excluímos pdfFile do payload.
      const { pdfFile, valor, ...rest } = contractData;
      const payload = {
        ...rest,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        valor: parseFloat(valor.replace(/\D/g, "")) / 100,
      };

      const contractRef = await addDoc(collection(db, "contracts"), payload);

      const newContract: Contract = {
        id: contractRef.id,
        cliente: contractData.cliente,
        obra: contractData.obra,
        numeroContrato: contractData.numeroContrato,
        vigenciaInicio: contractData.vigenciaInicio,
        vigenciaFim: contractData.vigenciaFim,
        valor: parseFloat(contractData.valor.replace(/\D/g, "")) / 100,
        pdfFile: contractData.pdfFile,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: contractData.createdBy || "",
        status: contractData.status,
      };

      return newContract;
    } catch (error) {
      throw new Error("Erro ao criar contrato" + error);
    }
  },

  async getContracts(): Promise<Contract[]> {
    try {
      const contractsRef = collection(db, "contracts");
      const q = query(contractsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const contracts: Contract[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        contracts.push({
          id: doc.id,
          cliente: data.cliente,
          obra: data.obra,
          numeroContrato: data.numeroContrato,
          vigenciaInicio: data.vigenciaInicio,
          vigenciaFim: data.vigenciaFim,
          valor: Number(data.valor) || 0,
          pdfFile: null,
          createdAt: data?.createdAt?.toDate?.() || new Date(),
          updatedAt: data?.updatedAt?.toDate?.() || new Date(),
          createdBy: data.createdBy || "",
          status: data.status || "pendente",
        });
      });

      return contracts;
    } catch (error) {
      throw new Error("Erro ao buscar contratos" + error);
    }
  },

  async getContractById(id: string): Promise<Contract | null> {
    try {
      const contractRef = await getDoc(doc(db, "contracts", id));
      if (!contractRef.exists()) return null;

      const data = contractRef.data() as any;
      return {
        id: contractRef.id,
        cliente: data.cliente,
        obra: data.obra,
        numeroContrato: data.numeroContrato,
        vigenciaInicio: data.vigenciaInicio,
        vigenciaFim: data.vigenciaFim,
        valor: Number(data.valor) || 0,
        pdfFile: null,
        createdAt: data?.createdAt?.toDate?.() || new Date(),
        updatedAt: data?.updatedAt?.toDate?.() || new Date(),
        createdBy: data.createdBy || "",
        status: data.status || "pendente",
      } as Contract;
    } catch (error) {
      throw new Error("Erro ao buscar contrato" + error);
    }
  },

  async updateContract(
    id: string,
    updateData: UpdateContractData
  ): Promise<void> {
    try {
      const contractRef = doc(db, "contracts", id);
      await updateDoc(contractRef, {
        ...updateData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error("Erro ao atualizar contrato" + error);
    }
  },

  async deleteContract(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, "contracts", id));
    } catch (error) {
      throw new Error("Erro ao deletar contrato" + error);
    }
  },

  observeContracts(callback: (contracts: Contract[]) => void): Unsubscribe {
    try {
      const contractsRef = collection(db, "contracts");
      const q = query(contractsRef, orderBy("createdAt", "desc"));

      return onSnapshot(q, (querySnapshot) => {
        const contracts: Contract[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as any;
          contracts.push({
            id: doc.id,
            cliente: data.cliente,
            obra: data.obra,
            numeroContrato: data.numeroContrato,
            vigenciaInicio: data.vigenciaInicio,
            vigenciaFim: data.vigenciaFim,
            valor: Number(data.valor) || 0,
            pdfFile: null,
            createdAt: data?.createdAt?.toDate?.() || new Date(),
            updatedAt: data?.updatedAt?.toDate?.() || new Date(),
            createdBy: data.createdBy || "",
            status: data.status || "pendente",
          });
        });

        callback(contracts);
      });
    } catch (error) {
      throw new Error("Erro ao observar contratos: " + error);
    }
  },
};
