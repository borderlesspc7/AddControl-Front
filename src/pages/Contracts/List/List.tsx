"use client";

import React from "react";
import "./List.css";
import type { Contract } from "../../../types/contracts";

interface ListProps {
  contracts: Contract[];
}

export const List: React.FC<ListProps> = ({ contracts }) => {
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatDateRange = (inicio: string, fim: string): string => {
    return `${formatDate(inicio)} - ${formatDate(fim)}`;
  };

  const handlePdfView = (contract: Contract) => {
    if (contract.pdfFile) {
      const url = URL.createObjectURL(contract.pdfFile);
      window.open(url, "_blank");
      // Cleanup URL after a delay to prevent memory leaks
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  const handlePdfDownload = (contract: Contract) => {
    if (contract.pdfFile) {
      const url = URL.createObjectURL(contract.pdfFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Contrato_${contract.numeroContrato}_${contract.cliente}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (contracts.length === 0) {
    return (
      <div className="contract-list">
        <div className="contract-list__header">
          <h3 className="contract-list__title">Contratos Cadastrados</h3>
          <p className="contract-list__subtitle">
            Lista de todos os contratos principais
          </p>
        </div>
        <div className="contract-list__empty">
          <svg
            className="contract-list__empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
          <h4 className="contract-list__empty-title">
            Nenhum contrato cadastrado
          </h4>
          <p className="contract-list__empty-text">
            Os contratos cadastrados aparecerão aqui após o primeiro registro.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="contract-list">
      <div className="contract-list__header">
        <h3 className="contract-list__title">Contratos Cadastrados</h3>
        <p className="contract-list__subtitle">
          {contracts.length} contrato{contracts.length !== 1 ? "s" : ""}{" "}
          registrado{contracts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="contract-list__table-container">
        <table className="contract-list__table">
          <thead className="contract-list__thead">
            <tr>
              <th>Cliente</th>
              <th>Obra</th>
              <th>Nº Contrato</th>
              <th>Vigência</th>
              <th>Valor</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody className="contract-list__tbody">
            {contracts.map((contract, index) => (
              <tr
                key={contract.id}
                className={
                  index % 2 === 0
                    ? "contract-list__row--even"
                    : "contract-list__row--odd"
                }
              >
                <td className="contract-list__cell contract-list__cell--cliente">
                  <div className="contract-list__cell-content">
                    <span className="contract-list__client-name">
                      {contract.cliente}
                    </span>
                  </div>
                </td>
                <td className="contract-list__cell">
                  <span className="contract-list__obra">{contract.obra}</span>
                </td>
                <td className="contract-list__cell">
                  <span className="contract-list__contract-number">
                    {contract.numeroContrato}
                  </span>
                </td>
                <td className="contract-list__cell">
                  <span className="contract-list__date-range">
                    {formatDateRange(
                      contract.vigenciaInicio,
                      contract.vigenciaFim
                    )}
                  </span>
                </td>
                <td className="contract-list__cell">
                  <span className="contract-list__value">
                    {formatCurrency(contract.valor)}
                  </span>
                </td>
                <td className="contract-list__cell">
                  <div className="contract-list__pdf-actions">
                    <button
                      type="button"
                      onClick={() => handlePdfView(contract)}
                      className="contract-list__pdf-btn contract-list__pdf-btn--view"
                      title="Visualizar PDF"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePdfDownload(contract)}
                      className="contract-list__pdf-btn contract-list__pdf-btn--download"
                      title="Baixar PDF"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7,10 12,15 17,10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="contract-list__cards">
        {contracts.map((contract) => (
          <div key={contract.id} className="contract-list__card">
            <div className="contract-list__card-header">
              <h4 className="contract-list__card-title">{contract.cliente}</h4>
              <span className="contract-list__card-number">
                {contract.numeroContrato}
              </span>
            </div>

            <div className="contract-list__card-body">
              <div className="contract-list__card-row">
                <span className="contract-list__card-label">Obra:</span>
                <span className="contract-list__card-value">
                  {contract.obra}
                </span>
              </div>

              <div className="contract-list__card-row">
                <span className="contract-list__card-label">Vigência:</span>
                <span className="contract-list__card-value">
                  {formatDateRange(
                    contract.vigenciaInicio,
                    contract.vigenciaFim
                  )}
                </span>
              </div>

              <div className="contract-list__card-row">
                <span className="contract-list__card-label">Valor:</span>
                <span className="contract-list__card-value contract-list__card-value--currency">
                  {formatCurrency(contract.valor)}
                </span>
              </div>
            </div>

            <div className="contract-list__card-actions">
              <button
                type="button"
                onClick={() => handlePdfView(contract)}
                className="contract-list__card-btn contract-list__card-btn--view"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Visualizar PDF
              </button>
              <button
                type="button"
                onClick={() => handlePdfDownload(contract)}
                className="contract-list__card-btn contract-list__card-btn--download"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Baixar PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
