"use client";

import React, { useState } from "react";
import "./ContractsPage.css";
import type { Contract } from "../../types/contracts";
import Form from "./Form/Form";
import List from "./List/List";

export const ContractsPage: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const handleContractSaved = (newContract: Contract) => {
    setContracts((prevContracts) => [newContract, ...prevContracts]);
  };

  return (
    <div className="contracts-page">
      <div className="contracts-page__main">
        <main className="contracts-page__content">
          <div className="contracts-page__container">
            <Form onContractSaved={handleContractSaved} />
            <List contracts={contracts} />
          </div>
        </main>
      </div>
    </div>
  );
};
