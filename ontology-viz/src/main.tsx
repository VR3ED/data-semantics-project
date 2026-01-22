import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OntologyResultsViz from "./ontology-results-viz";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <OntologyResultsViz />
  </StrictMode>,
)
