"use client";

import React, { useState } from "react";
import PriceForm from "./Form/PriceForm";
import PriceList from "./List/PriceList";
import type { UnitPrice } from "../../types/unitPrice";
import "./PricePage.css";

const PricesPage: React.FC = () => {
  const [prices, setPrices] = useState<UnitPrice[]>([]);
  const [editingPrice, setEditingPrice] = useState<UnitPrice | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddPrice = (price: Omit<UnitPrice, "id">) => {
    const newPrice: UnitPrice = {
      ...price,
      id: Date.now().toString(),
    };
    setPrices((prev) => [...prev, newPrice]);
    setShowForm(false);
  };

  const handleEditPrice = (price: UnitPrice) => {
    setEditingPrice(price);
    setShowForm(true);
  };

  const handleUpdatePrice = (updatedPrice: Omit<UnitPrice, "id">) => {
    if (editingPrice) {
      setPrices((prev) =>
        prev.map((p) =>
          p.id === editingPrice.id
            ? { ...updatedPrice, id: editingPrice.id }
            : p
        )
      );
      setEditingPrice(null);
      setShowForm(false);
    }
  };

  const handleDeletePrice = (id: string) => {
    setPrices((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCancelForm = () => {
    setEditingPrice(null);
    setShowForm(false);
  };

  return (
    <div className="prices-page">
      <div className="prices-page__header">
        <h1 className="prices-page__title">Cadastro de Preços Unitários</h1>
        <button
          className="prices-page__add-btn"
          onClick={() => setShowForm(true)}
          type="button"
        >
          Novo Preço Unitário
        </button>
      </div>

      {showForm && (
        <div className="prices-page__form-section">
          <PriceForm
            price={editingPrice}
            onSubmit={editingPrice ? handleUpdatePrice : handleAddPrice}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      <div className="prices-page__list-section">
        <PriceList
          prices={prices}
          onEdit={handleEditPrice}
          onDelete={handleDeletePrice}
        />
      </div>
    </div>
  );
};

export default PricesPage;
