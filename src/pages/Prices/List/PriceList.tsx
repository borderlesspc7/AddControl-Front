"use client";

import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { UnitPrice } from "../../../types/unitPrice";
import "./PriceList.css";
import Button from "../../../components/ui/Button/Button";

interface PriceListProps {
  prices: UnitPrice[];
  onEdit: (price: UnitPrice) => void;
  onDelete: (id: string) => void;
}

const PriceList: React.FC<PriceListProps> = ({ prices, onEdit, onDelete }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleDelete = (id: string, codigo: string) => {
    if (
      window.confirm(`Deseja realmente excluir o preço unitário "${codigo}"?`)
    ) {
      onDelete(id);
    }
  };

  if (prices.length === 0) {
    return (
      <div className="price-list__empty">
        <p className="price-list__empty-text">
          Nenhum preço unitário cadastrado ainda
        </p>
      </div>
    );
  }

  return (
    <div className="price-list">
      <div className="price-list__header">
        <h2 className="price-list__title">Preços Unitários cadastrados</h2>
        <span className="price-list__count">{prices.length} item(s)</span>
      </div>

      <div className="price-list__table-container">
        <table className="price-list__table">
          <thead className="price-list__thead">
            <tr>
              <th>Código</th>
              <th>Tipo</th>
              <th>Espessura</th>
              <th>Estrutura</th>
              <th>Chapa Face 1</th>
              <th>Chapa Face 2</th>
              <th>Isolamento</th>
              <th>Qtd</th>
              <th>Unidade</th>
              <th>Unit. Mat</th>
              <th>Unit. MDO</th>
              <th>Total Mat</th>
              <th>Total MDO</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="price-list__tbody">
            {prices.map((price) => (
              <tr key={price.id} className="price-list__row">
                <td className="price-list__cell price-list__cell--code">
                  {price.codigo}
                </td>
                <td className="price-list__cell">{price.tipo}</td>
                <td className="price-list__cell">{price.espessura || "-"}</td>
                <td className="price-list__cell">{price.estrutura || "-"}</td>
                <td className="price-list__cell">{price.chapaFace1 || "-"}</td>
                <td className="price-list__cell">{price.chapaFace2 || "-"}</td>
                <td className="price-list__cell">{price.isolamento || "-"}</td>
                <td className="price-list__cell price-list__cell--number">
                  {price.quantidade}
                </td>
                <td className="price-list__cell">{price.unidade}</td>
                <td className="price-list__cell price-list__cell--currency">
                  {formatCurrency(price.unitMaterial)}
                </td>
                <td className="price-list__cell price-list__cell--currency">
                  {formatCurrency(price.unitMaoObra)}
                </td>
                <td className="price-list__cell price-list__cell--currency price-list__cell--total">
                  {formatCurrency(price.totalMaterial ?? 0)}
                </td>
                <td className="price-list__cell price-list__cell--currency price-list__cell--total">
                  {formatCurrency(price.totalMaoObra ?? 0)}
                </td>
                <td className="price-list__cell price-list__cell--actions">
                  <div className="price-list__actions">
                    <Button
                      onClick={() => onEdit(price)}
                      className="price-list__action-btn price-list__action-btn--edit"
                      title="Editar"
                    >
                      <FiEdit2 />
                    </Button>
                    <Button
                      onClick={() => handleDelete(price.id ?? "", price.codigo)}
                      className="price-list__action-btn price-list__action-btn--delete"
                      title="Excluir"
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceList;
