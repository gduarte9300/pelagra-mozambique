# PELAGRA Moçambique — v2.0

Landing page completa da PELAGRA Moçambique com todas as melhorias implementadas.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- motion/react (Framer Motion)
- lucide-react
- Google Fonts: Sora + DM Sans

## Secções

1. **Navbar** — Responsivo, com scroll shadow e menu mobile animado
2. **Hero** — Animação de entrada, stats, floating cards
3. **Sobre** — Missão/Visão/Valores, timeline de experiência
4. **Serviços** — 6 cards com hover animation
5. **Portfólio** — 6 projectos reais com modal de detalhe
6. **Impacto** — Contadores animados ao scroll
7. **Comunidade** — Secção dark com pilares sociais
8. **Contacto** — Formulário funcional (Web3Forms) + WhatsApp
9. **Footer** — Links, redes sociais, localização
10. **WhatsApp Flutuante** — Aparece após 2.5s com animação pulse

## Melhorias vs v1

- ✅ Secção "Sobre" implementada (estava no menu mas não existia)
- ✅ Portfólio com 6 projectos reais e modal de detalhe
- ✅ Formulário de contacto funcional via Web3Forms
- ✅ Botão WhatsApp flutuante com link directo
- ✅ Animações scroll-triggered (IntersectionObserver) — não disparam antes de ver
- ✅ Contadores animados na secção de Impacto
- ✅ SEO completo: Open Graph, Twitter Card, meta tags, canonical
- ✅ Fonts premium: Sora (display) + DM Sans (body)
- ✅ Dependências limpas: removido @google/genai, express, dotenv
- ✅ Navbar com shadow progressivo ao scroll
- ✅ Links de redes sociais (actualizar com URLs reais)
- ✅ Modal de portfólio com detalhes do projecto

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Formulário de Contacto (Web3Forms)
1. Registar em https://web3forms.com (gratuito)
2. Obter a access key
3. Substituir em `src/App.tsx`:
   ```
   value="YOUR_WEB3FORMS_KEY"
   ```
   pelo seu access key real.

### 3. Desenvolvimento local
```bash
npm run dev
```

### 4. Build para produção
```bash
npm run build
```
Os ficheiros de produção ficam em `dist/`.

### 5. Deploy no CyberPanel (pelagramz.com)
```bash
npm run build
# Copiar conteúdo de dist/ para o webroot do domínio
```

## Personalização

- **Cores**: Editar variáveis CSS em `src/index.css` (--navy, --green)
- **Conteúdo do Portfólio**: Editar array `portfolioItems` em `App.tsx`
- **Estatísticas**: Editar array `stats` no componente `Impact`
- **Links Sociais**: Actualizar `href` no `Footer`
- **Imagens**: Substituir URLs Unsplash por fotos reais de campo

## Estrutura do Projecto

```
pelagra-mozambique/
├── index.html          # HTML base com meta tags SEO
├── package.json        # Dependências (limpas)
├── vite.config.ts      # Configuração Vite
├── tsconfig.json       # TypeScript config
└── src/
    ├── main.tsx        # Entry point
    ├── index.css       # Estilos globais + animações
    └── App.tsx         # Todos os componentes
```

---

*PELAGRA Moçambique — Moatize, Tete*
