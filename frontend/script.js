const API_BASE = 'https://api.apiperu.dev';
const API_TOKEN = '7447e78ccf296bcaa9da821e640755a44e01b3c268589920e9ff3fd12417735d';

const dniInput = document.getElementById('dniInput');
const searchForm = document.getElementById('searchForm');
const statusElement = document.getElementById('status');
const resultContainer = document.getElementById('resultContainer');

function setStatus(message, type = 'info') {
  statusElement.textContent = message;
  statusElement.className = `status ${type}`;
}

function renderEmptyState(message = 'Sin resultados aún.') {
  resultContainer.innerHTML = `<div class="empty-state">${message}</div>`;
}

function extractPersonData(data) {
  if (!data) return null;

  if (data.data) return extractPersonData(data.data);
  if (data.result) return extractPersonData(data.result);

  const person = {
    dni: data.dni || data.numeroDocumento || data.documento || '-',
    nombres: data.nombres || data.name || data.nombre || '-',
    apellidoPaterno: data.apellido_paterno || data.apellidoPaterno || data.paterno || '-',
    apellidoMaterno: data.apellido_materno || data.apellidoMaterno || data.materno || '-',
    genero: data.genero || data.sexo || '-',
    ubigeo: data.ubigeo || data.departamento || '-',
  };

  return person;
}

function renderPerson(person) {
  const fields = [
    { label: 'DNI', value: person.dni },
    { label: 'Nombres', value: person.nombres },
    { label: 'Apellido paterno', value: person.apellidoPaterno },
    { label: 'Apellido materno', value: person.apellidoMaterno },
    { label: 'Género', value: person.genero },
    { label: 'Ubigeo', value: person.ubigeo },
  ];

  const rows = fields
    .map(
      (field) => `
        <div class="info-row">
          <span>${field.label}</span>
          <strong>${field.value}</strong>
        </div>
      `
    )
    .join('');

  resultContainer.innerHTML = `
    <div class="person-card">
      <div class="person-header">
        <span class="badge">Persona encontrada</span>
      </div>
      ${rows}
    </div>
  `;
}

async function consultarDni(dni) {
  const response = await fetch(`${API_BASE}/dni`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ dni }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'No se pudo consultar el DNI.');
  }

  const person = extractPersonData(result);

  if (!person || person.dni === '-' || person.nombres === '-') {
    throw new Error('No se encontraron resultados para este DNI.');
  }

  return person;
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const dni = dniInput.value.trim();

  if (!/^\d{8}$/.test(dni)) {
    setStatus('Ingrese un DNI válido de 8 dígitos.', 'error');
    renderEmptyState('Debe ingresar 8 dígitos.');
    dniInput.focus();
    return;
  }

  try {
    setStatus('Consultando DNI...', 'info');
    resultContainer.innerHTML = '<div class="loading">Buscando información...</div>';

    const person = await consultarDni(dni);
    renderPerson(person);
    setStatus('Consulta exitosa.', 'success');
  } catch (error) {
    renderEmptyState(error.message || 'No se pudo completar la consulta.');
    setStatus(error.message || 'Ocurrió un error al consultar el DNI.', 'error');
  }
});

renderEmptyState();
