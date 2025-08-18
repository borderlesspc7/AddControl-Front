"use client";

import React, { useState } from "react";
import "./Form.css";
import InputField from "../../../components/ui/InputField/InputField";
import FileUpload from "../../../components/FileUpload/FileUpload";
import Button from "../../../components/ui/Button/Button";
import type { Contract, ContractFormData } from "../../../types/contracts";

interface FormProps {
  onContractSaved: (contract: Contract) => void;
}

export const Form: React.FC<FormProps> = ({ onContractSaved }) => {
  const [formData, setFormData] = useState<ContractFormData>({
    id: "",
    cliente: "",
    obra: "",
    numeroContrato: "",
    vigenciaInicio: "",
    vigenciaFim: "",
    valor: "",
    pdfFile: null as File | null,
    createdAt: new Date(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (value: string): string => {
    const numbers = value.replace(/\D/g, "");

    if (!numbers) return "";

    const numberValue = Number.parseInt(numbers) / 100;
    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const parseCurrencyToNumber = (value: string): number => {
    const numbers = value.replace(/\D/g, "");
    return numbers ? Number.parseInt(numbers) / 100 : 0;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "valor") {
      setFormData((prev) => ({
        ...prev,
        [field]: formatCurrency(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      pdfFile: file,
    }));

    if (errors.pdfFile) {
      setErrors((prev) => ({
        ...prev,
        pdfFile: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.cliente.trim()) {
      newErrors.cliente = "Cliente é obrigatório";
    }

    if (!formData.obra.trim()) {
      newErrors.obra = "Obra é obrigatória";
    }

    if (!formData.numeroContrato.trim()) {
      newErrors.numeroContrato = "Número do contrato é obrigatório";
    }

    if (!formData.vigenciaInicio) {
      newErrors.vigenciaInicio = "Data de início é obrigatória";
    }

    if (!formData.vigenciaFim) {
      newErrors.vigenciaFim = "Data de fim é obrigatória";
    }

    if (formData.vigenciaInicio && formData.vigenciaFim) {
      const inicio = new Date(formData.vigenciaInicio);
      const fim = new Date(formData.vigenciaFim);

      if (fim <= inicio) {
        newErrors.vigenciaFim =
          "Data de fim deve ser posterior à data de início";
      }
    }

    if (!formData.valor.trim()) {
      newErrors.valor = "Valor é obrigatório";
    } else {
      const valorNumerico = parseCurrencyToNumber(formData.valor);
      if (valorNumerico <= 0) {
        newErrors.valor = "Valor deve ser maior que zero";
      }
    }

    if (!formData.pdfFile) {
      newErrors.pdfFile = "Upload do PDF é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular delay de salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newContract: Contract = {
        id: Date.now().toString(),
        cliente: formData.cliente.trim(),
        obra: formData.obra.trim(),
        numeroContrato: formData.numeroContrato.trim(),
        vigenciaInicio: formData.vigenciaInicio,
        vigenciaFim: formData.vigenciaFim,
        valor: parseCurrencyToNumber(formData.valor), // Converte para número
        pdfFile: formData.pdfFile,
        createdAt: new Date(),
      };

      onContractSaved(newContract);

      // Limpar formulário
      setFormData({
        cliente: "",
        obra: "",
        numeroContrato: "",
        vigenciaInicio: "",
        vigenciaFim: "",
        valor: "",
        pdfFile: null,
        id: "",
        createdAt: new Date(),
      } as ContractFormData);

      console.log("Contrato salvo com sucesso:", newContract);
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contract-form">
      <div className="contract-form__header">
        <h2 className="contract-form__title">
          Cadastro de Contratos Principais
        </h2>
        <p className="contract-form__subtitle">
          Preencha as informações do contrato principal
        </p>
      </div>

      <form onSubmit={handleSubmit} className="contract-form__form">
        <div className="contract-form__row">
          <InputField
            label="Cliente"
            type="text"
            value={formData.cliente}
            onChange={(value) => handleInputChange("cliente", value)}
            error={errors.cliente}
            placeholder="Nome do cliente"
            required
          />

          <InputField
            label="Obra"
            type="text"
            value={formData.obra}
            onChange={(value) => handleInputChange("obra", value)}
            error={errors.obra}
            placeholder="Nome da obra"
            required
          />
        </div>

        <div className="contract-form__row">
          <InputField
            label="Número do Contrato"
            type="text"
            value={formData.numeroContrato}
            onChange={(value) => handleInputChange("numeroContrato", value)}
            error={errors.numeroContrato}
            placeholder="Ex: CT-2024-001"
            required
          />

          <InputField
            label="Valor do Contrato"
            type="text"
            value={formData.valor}
            onChange={(value) => handleInputChange("valor", value)}
            error={errors.valor}
            placeholder="R$ 0,00"
            required
          />
        </div>

        <div className="contract-form__row">
          <InputField
            label="Vigência - Início"
            type="date"
            value={formData.vigenciaInicio}
            onChange={(value) => handleInputChange("vigenciaInicio", value)}
            error={errors.vigenciaInicio}
            required
          />

          <InputField
            label="Vigência - Fim"
            type="date"
            value={formData.vigenciaFim}
            onChange={(value) => handleInputChange("vigenciaFim", value)}
            error={errors.vigenciaFim}
            required
          />
        </div>

        <div className="contract-form__file-section">
          <FileUpload
            label="Contrato em PDF"
            accept=".pdf"
            onChange={handleFileChange}
            error={errors.pdfFile}
            required
          />
        </div>

        <div className="contract-form__actions">
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Salvar Contrato"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
