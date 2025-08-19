"use client";

import React, { useEffect, useState } from "react";
import "./ContractsPage.css";
import type { Contract } from "../../types/contracts";
import Form from "./Form/Form";
import List from "./List/List";
import { contractService } from "../../services/contractService";
import { useAuth } from "../../hooks/useAuth";

export const ContractsPage: React.FC = () => {
  const { user } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = contractService.observeContracts((contracts) => {
      setContracts(contracts);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, [user]);

  const handleContractSaved = (newContract: Contract) => {
    console.log("Contrato salvo:", newContract);
    // setContracts((prevContracts) => [newContract, ...prevContracts]);
  };

  const handleContractUpdated = async (updatedContract: Contract) => {
    try {
      await contractService.updateContract(updatedContract.id, {
        cliente: updatedContract.cliente,
        obra: updatedContract.obra,
        numeroContrato: updatedContract.numeroContrato,
        vigenciaInicio: updatedContract.vigenciaInicio,
        vigenciaFim: updatedContract.vigenciaFim,
        valor: updatedContract.valor,
        status: updatedContract.status,
      });
    } catch (error) {
      console.error("Erro ao atualizar contrato:", error);
      throw error;
    }
  };

  const handleContractDeleted = async (contractId: string) => {
    try {
      await contractService.deleteContract(contractId);
    } catch (error) {
      console.error("Erro ao deletar contrato:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="contracts-page">
        <div className="contracts-page__main">
          <main className="contracts-page__content">
            <div className="contracts-page__container">
              <div className="contracts-page__loading">
                <p>Carregando contratos...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contracts-page">
        <div className="contracts-page__main">
          <main className="contracts-page__content">
            <div className="contracts-page__container">
              <div className="contracts-page__error">
                <p>Erro: {error}</p>
                <button onClick={() => window.location.reload()}>
                  Tentar novamente
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="contracts-page">
      <div className="contracts-page__main">
        <main className="contracts-page__content">
          <div className="contracts-page__container">
            <Form onContractSaved={handleContractSaved} />
            <List
              contracts={contracts}
              onContractUpdated={handleContractUpdated}
              onContractDeleted={handleContractDeleted}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
