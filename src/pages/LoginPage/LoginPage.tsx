"use client";

import LoginForm from "./Form/LoginForm";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__form-section">
          <LoginForm />
        </div>

        <div className="login-page__brand-section">
          <div className="login-page__brand-content">
            <div className="login-page__logo">
              <div className="login-page__logo-icon">
                <svg viewBox="0 0 100 100" className="logo-svg">
                  <defs>
                    <linearGradient
                      id="logoGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="10"
                    y="20"
                    width="80"
                    height="60"
                    rx="8"
                    fill="url(#logoGradient)"
                  />
                  <rect
                    x="20"
                    y="30"
                    width="60"
                    height="8"
                    rx="4"
                    fill="white"
                    opacity="0.9"
                  />
                  <rect
                    x="20"
                    y="45"
                    width="40"
                    height="6"
                    rx="3"
                    fill="white"
                    opacity="0.7"
                  />
                  <rect
                    x="20"
                    y="58"
                    width="50"
                    height="6"
                    rx="3"
                    fill="white"
                    opacity="0.7"
                  />
                  <circle cx="75" cy="35" r="8" fill="#10b981" />
                  <text
                    x="75"
                    y="40"
                    textAnchor="middle"
                    fill="white"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    +
                  </text>
                </svg>
              </div>
              <h2 className="login-page__brand-name">AddControl</h2>
            </div>

            <div className="login-page__brand-description">
              <h3 className="login-page__tagline">
                Gestão Inteligente de contratos{" "}
              </h3>
              <p className="login-page__description">
                Plataforma completa para gerenciamento de aditivos contratuais e
                ordens de serviço extra contrato na construção civil
              </p>
              <div className="login-page__features">
                <div className="feature-item">
                  <div className="feature-icon">📋</div>
                  <span>Controle de Aditivos</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🏗️</div>
                  <span>Gestão de OSAs</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📊</div>
                  <span>Relatórios Detalhados</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
