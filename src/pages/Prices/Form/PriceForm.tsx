"use client";

import React, { useState, useEffect } from "react";
import type { UnitPrice } from "../../../types/unitPrice";
import "./PriceForm.css";

interface PriceFormProps {
  price?: UnitPrice | null;
  onSubmit: (price: Omit<UnitPrice, "id">) => void;
  onCancel: () => void;
}

const UNIT_OPTION = [
  { value: "m2", label: "m2" },
  { value: "m1", label: "m1" },
  { value: "unid", label: "unid" },
  { value: "peça", label: "peça" },
];

const PriceForm: React.FC<PriceFormProps> = ({ price, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<UnitPrice>({
    codigo: "",
    tipo: "",
    espessura: "",
    estrutura: "",
    chapaFace1: "",
    chapaFace2: "",
    isolamento: "",
    quantidade: 0,
    unidade: "m2",
    unitMaterial: 0,
    unitMaoObra: 0,
  });

  useEffect(() => {
    if (price) {
      setFormData({
        codigo: price.codigo,
        tipo: price.tipo,
        espessura: price.espessura,
        estrutura: price.estrutura,
        chapaFace1: price.chapaFace1,
        chapaFace2: price.chapaFace2,
        isolamento: price.isolamento,
        quantidade: price.quantidade,
        unidade: price.unidade,
        unitMaterial: price.unitMaterial,
        unitMaoObra: price.unitMaoObra,
      });
    }
  }, [price]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantidade" ||
        name === "unitMaterial" ||
        name === "unitMaoObra"
          ? Number.parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const totalMaterial = formData.unitMaterial * formData.quantidade;
    const totalMaoObra = formData.unitMaoObra * formData.quantidade;

    onSubmit({
      ...formData,
      totalMaterial,
      totalMaoObra,
    });
  };

  return (
    <div className="price-form">
      <div className="price-form__header">
        <h2 className="price-form__title">
          {price ? "Editar Preço Unitário" : "Novo Preço Unitário"}
        </h2>
        <p className="price-form__subtitle">
          {price
            ? "Atualize as informações do preço unitário"
            : "Preencha as informações para cadastrar um novo preço unitário"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="price-form__form">
        <div className="price-form__grid">
          <div className="price-form__field">
            <label className="price-form__label">
              Codigo*
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleInputChange}
                className="price-form__input"
                required
              />
            </label>
          </div>
          <div className="price-form__field">
            <label className="price-form__label">
              Tipo*
              <input
                type="text"
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className="price-form__select"
                required
              />
            </label>
          </div>

          <div className="price-form__field">
            <label className="price-form__label">
              Espessura
              <input
                type="text"
                name="espessura"
                value={formData.espessura}
                onChange={handleInputChange}
                className="price-form__input"
              />
            </label>
          </div>

          <div className="price-form__field">
            <label className="price-form__label">
              Estrutura
              <input
                type="text"
                name="estrutura"
                value={formData.estrutura}
                onChange={handleInputChange}
                className="price-form__input"
              />
            </label>
          </div>

          <div className="price-form__field">
            <label className="price-form__label">
              Chapa Face 1
              <input
                type="text"
                name="chapaFace1"
                value={formData.chapaFace1}
                onChange={handleInputChange}
                className="price-form__input"
              />
            </label>
          </div>

          <div className="price-form__field">
            <label className="price-form__label">
              Chapa Face 2
              <input
                type="text"
                name="chapaFace2"
                value={formData.chapaFace2}
                onChange={handleInputChange}
                className="price-form__input"
              />
            </label>
          </div>

          <div className="price-form__field">
            <label className="price-form__label">
              Isolamento
              <input
                type="text"
                name="isolamento"
                value={formData.isolamento}
                onChange={handleInputChange}
                className="price-form__input"
              />
            </label>
          </div>

          <div className="price-form__field">
            <label className="price-form__label">
              Quantidade *
              <input
                type="number"
                name="quantidade"
                value={formData.quantidade}
                onChange={handleInputChange}
                className="price-form__input"
                min="0"
                step="0.01"
                required
              />
            </label>
          </div>

          <div className="price-form__field">
            <label className="price-form__label">
              Unidade*
              <select
                name="unidade"
                value={formData.unidade}
                onChange={handleInputChange}
                className="price-form__select"
                required
              >
                {UNIT_OPTION.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="price-form__field">
            <label className="price-form__label">
              Unit. Material (R$) *
              <input
                type="number"
                name="unitMaterial"
                value={formData.unitMaterial}
                onChange={handleInputChange}
                className="price-form__input"
                min="0"
                step="0.01"
                required
              />
            </label>
          </div>

          <div className="price-form__field">
            <label className="price-form__label">
              Unit. Mão de Obra (R$) *
              <input
                type="number"
                name="unitMaoObra"
                value={formData.unitMaoObra}
                onChange={handleInputChange}
                className="price-form__input"
                min="0"
                step="0.01"
                required
              />
            </label>
          </div>
        </div>

        <div className="price-form__totals">
          <div className="price-form__total-item">
            <span className="price-form__total-label">Total Material:</span>
            <span className="price-form__total-value">
              R$ {(formData.quantidade * formData.unitMaterial).toFixed(2)}
            </span>
          </div>
          <div className="price-form__total-item">
            <span className="price-form__total-label">Total Mão de Obra:</span>
            <span className="price-form__total-value">
              R$ {(formData.quantidade * formData.unitMaoObra).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="price-form__actions">
          <button
            type="button"
            onClick={onCancel}
            className="price-form__cancel-btn"
          >
            Cancelar
          </button>
          <button type="submit" className="price-form__submit-btn">
            {price ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PriceForm;
