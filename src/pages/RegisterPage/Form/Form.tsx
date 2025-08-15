"use client";

import React from "react";
import { useState } from "react";
import InputField from "../../../components/ui/InputField/InputField";
import { SelectField } from "../../../components/ui/SelectField/SelectField";
import { Button } from "../../../components/ui/Button/Button";
import type { RegisterCredentials, UserRole } from "../../../types/auth";
import { useAuth } from "../../../hooks/useAuth";

type FormData = {
  displayName: string;
  email: string;
  password: string;
  role: string;
  cpf: string;
  phone: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const userRoleOptions = [
  { value: "admin", label: "Administrador" },
  { value: "solicitante", label: "Solicitante de OSAs" },
  { value: "engenheiro", label: "Engenheiro Aprovador" },
  { value: "suprimento", label: "Suprimentos" },
  { value: "diretor", label: "Diretor/Financeiro" },
];

export const UserRegisterForm: React.FC = () => {
  const { registerForAdmin } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    displayName: "",
    email: "",
    password: "",
    role: "",
    cpf: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCPF = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "");

    // Apply CPF mask: XXX.XXX.XXX-XX
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2");
    }

    return numbers
      .slice(0, 11)
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.displayName.trim()) {
      newErrors.displayName = "Nome é obrigatório";
    } else if (formData.displayName.trim().length < 2) {
      newErrors.displayName = "Nome deve ter pelo menos 2 caracteres";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    // CPF validation
    const cpfNumbers = formData.cpf.replace(/\D/g, "");
    if (!formData.cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório";
    } else if (cpfNumbers.length !== 11) {
      newErrors.cpf = "CPF deve ter 11 dígitos";
    }

    // User type validation
    if (!formData.role) {
      newErrors.role = "Tipo de usuário é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    if (field === "cpf") {
      value = formatCPF(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload: RegisterCredentials = {
        displayName: formData.displayName,
        email: formData.email,
        password: formData.password,
        cpf: formData.cpf,
        phone: formData.phone,
        role: formData.role as UserRole,
      };

      await registerForAdmin(payload);

      setFormData({
        displayName: "",
        email: "",
        password: "",
        role: "",
        cpf: "",
        phone: "",
      });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-register-form">
      <div className="user-register-form__header">
        <h1 className="user-register-form__title">
          Cadastro de Usuário - AddControl
        </h1>
        <p className="user-register-form__subtitle">
          Preencha os dados abaixo para cadastrar um novo usuário no sistema
        </p>
      </div>

      <form className="user-register-form__form" onSubmit={handleSubmit}>
        <div className="user-register-form__fields">
          <InputField
            label="Nome completo"
            type="text"
            value={formData.displayName}
            onChange={handleInputChange("displayName")}
            placeholder="Digite o nome completo"
            error={errors.displayName}
            required
          />

          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            placeholder="Digite o email"
            error={errors.email}
            required
          />

          <InputField
            label="Senha"
            type="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            placeholder="Digite a senha"
            error={errors.password}
            required
          />

          <InputField
            label="CPF"
            type="text"
            value={formData.cpf}
            onChange={handleInputChange("cpf")}
            placeholder="000.000.000-00"
            error={errors.cpf}
            required
          />

          <SelectField
            label="Tipo de usuário"
            value={formData.role}
            onChange={handleInputChange("role")}
            options={userRoleOptions}
            placeholder="Selecione o tipo de usuário"
            error={errors.role}
            required
          />

          <InputField
            label="Telefone"
            type="text"
            value={formData.phone}
            onChange={handleInputChange("phone")}
            placeholder="(00) 00000-0000"
          />
        </div>

        <div className="user-register-form__actions">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="user-register-form__submit-btn"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar Usuário"}
          </Button>
        </div>
      </form>
    </div>
  );
};
